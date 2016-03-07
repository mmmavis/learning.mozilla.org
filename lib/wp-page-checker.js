var request = require('superagent');

var WORDPRESS_COM_API_ENDPOINT_BASE = 'https://public-api.wordpress.com/rest/v1.1/sites/teachmozillaorg.wordpress.com/posts/slug:';

module.exports = function(path, callback) {
  var wpPostSlug = path.replace(/\//g, '');
  console.log("\n\n===== wpPostSlug = ", wpPostSlug);
  request
    .get(WORDPRESS_COM_API_ENDPOINT_BASE+wpPostSlug)
    .accept('json')
    .end(function(err, res) {
      // console.log(`res`, res);
      console.log('statusCode = ', res.statusCode);
      callback( err || res.statusCode !== 200, JSON.parse(res.text).content);
    });
};
