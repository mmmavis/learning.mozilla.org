var path = require('path');
var fs = require('fs');
var express = require('express');

var React = require('react');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var match = ReactRouter.match;

var indexStaticWatcher = require('./lib/build/index-static-watcher').create();
var PORT = process.env.PORT || 8008;
var PRODUCTION = (process.env.NODE_ENV === 'production');
var DIST_DIR = path.join(__dirname, 'dist');

var habitat = require('habitat');
habitat.load('.env');

var indexStatic;
var router;
var app = express();

var wpPageChecker = require('./lib/wp-page-checker');

var notFoundHTML = [
  '<!doctype html>',
  '<html><head>',
  '<meta charset="utf-8">',
  '<title>404 - Page not found</title>',
  '</head><body>',
  '<p>404 - Page not found</p>',
  '</body></html>'
].join('');

var urlToRoutePath = function(loc) {
  if (loc !== '/') {
    loc = loc.replace(/^\//, '').replace(/\/$/, '');
  }
  return loc;
};

var startProdApp = function() {
  console.log([
    'Production mode enabled. Note that "npm install" is assumed to',
    'have recently been run with NODE_ENV="production". If this is not',
    'the case, some or all static assets may be out of date.'
  ].join('\n'));
  indexStaticWatcher.build(function(err, newIndexStatic) {
    if (err) {
      throw err;
    }

    console.log('Built server-side bundle.');
    updateIndexStatic(newIndexStatic);
    app.listen(PORT, function() {
      console.log('Listening on port', PORT);
    });
  });
};

var updateIndexStatic = function(newIndexStatic) {
  indexStatic = newIndexStatic;
  router = indexStatic ? React.createElement(Router, {routes: indexStatic.routes}) : null;
};

// make sure the dir we'll be using for static hosting exists.
if (!fs.existsSync(DIST_DIR)) {
  fs.mkdirSync(DIST_DIR);
}

/**
 * Wait for the router to come online.
 */
app.use(function(req, res, next) {
  if (router) {
    return next();
  }
  res.send('Please wait while the server-side bundle regenerates.');
});

/**
 * If we have a router, check if we're dealing with a redirect.
 */
app.use(function(req, res, next) {
  var url = urlToRoutePath(req.path);
  if (!indexStatic.REDIRECTS[url]) {
    return next();
  }
  res.redirect('/' + indexStatic.REDIRECTS[url] + '/');
});

/**
 * If it's not a redirect, is it a component page?
 */
app.use(function(req, res, next) {
  var routes = indexStatic.routes;
  var location = urlToRoutePath(req.url);

  match({ routes: routes, location: location}, function resolveRoute(err, redirect, props) {
    // this is a valid component: generat its associated page
    if (props) {
      console.log("\n\n\n location = ", location);
      indexStatic.generate(location, {}, function(err, location, title, html) {
        if (err) {
          return next(err);
        }
        return res.type('html').send(html);
      });
    }
    // this is not a specific component - although it might be if we massage the path:
    else {
      location = urlToRoutePath(req.path) + '/';
      match({ routes: routes, location: location}, function resolvePath(err, redirect, props) {
        if (redirect || props) {
          // this will work, as long as we rewrite the path
          return res.redirect(req.path + '/');
        } 
        // this is not a url that can be services by React. Try more middleware.
        return next();
      });
    }
  });
});

/**
 * Is this a static asset?
 */
app.use(express.static(DIST_DIR));


/**
 * Last chance: check if it's a WP page, otherwise send 404
 */
app.use(function(req, res, next) {
  require('babel-register')({
    extensions: [".jsx", ".js"],
    presets: ['react']
  });
  var ReactDOMServer = require('react-dom/server');
  var Page = require('./components/page.jsx');
  var HtmlWrapper = require('./components/HTML-wrapper.jsx');
  var WpContentLoader = require('react-wp-content-loader');

  wpPageChecker(req.path, function(err, wpContent) {
    console.log("\n\n\n\n Page", Page);

    if ( err ) {
      res.status(404).send(notFoundHTML);
    } else {
      var PageContent = React.createElement(Page, 
        {
          routes: [
            { path: '', component: { pageClassName: '', pageTitle: ''} }
          ] 
        }, 
        React.createElement('div', { dangerouslySetInnerHTML: { __html: wpContent }})
      );

      res.status(200).send("<!DOCTYPE html>" + ReactDOMServer.renderToStaticMarkup(PageContent));
    }
  });
});

app.DIST_DIR = DIST_DIR;
app.updateIndexStatic = updateIndexStatic;
module.exports = app;

if (!module.parent) {
  console.log('Initializing server.');

  if (PRODUCTION) {
    startProdApp();
  } else {
    console.log([
      'This server can only be run as a script when NODE_ENV="production".',
      'To run it in development mode, please use "npm run app".'
    ].join('\n'));
    process.exit(1);
  }
}
