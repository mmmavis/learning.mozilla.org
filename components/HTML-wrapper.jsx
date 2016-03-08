var React = require('react');

var CSS_FILENAME = "styles.css";

module.exports = React.createClass({
  render: function() {
    return (
      <html className="no-js" lang="en">
      <head>
        <meta charSet="utf-8"/>
        <title>Mozilla Learning</title>
        <link rel="icon" href="/img/favicon.ico" type="image/x-icon"/>
        <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,700,600italic,700italic,800,800italic"/>
        <link rel="stylesheet" href="/vendor/bootstrap/css/bootstrap.min.css"/>
        <link rel="stylesheet" href="/vendor/font-awesome/css/font-awesome.min.css"/>
        <link rel="stylesheet" href="/vendor/mozilla-tabzilla/css/tabzilla.css" />
        <link rel="stylesheet" href={'/' + CSS_FILENAME}/>
      </head>
      <body>
        <div id="page-holder">
          { this.props.children }
        </div>
        <script src="/commons.bundle.js"></script>
        <script src="/app.bundle.js"></script>
      </body>
    </html>
    );
  }
});
