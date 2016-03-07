var request = require('superagent');

const WORDPRESS_COM_API_ENDPOINT = 'https://public-api.wordpress.com/rest/v1.1/sites/teachmozillaorg.wordpress.com/posts/';

module.exports = function(callback) {
  request
    .get(WORDPRESS_COM_API_ENDPOINT)
    .accept('json')
    .end((err, res) => {
      var posts;
      if ( err || res.statusCode !== 200 ) {
        console.log("\n errorrrrr");
      } else {
        posts = JSON.parse(res.text).posts.map(function(post) {
          return post.slug;
        });
      }

      // console.log(`res`, res);
      console.log('statusCode = ', res.statusCode);
      console.log(posts);
      callback( err || res.statusCode !== 200, posts);
    });
};
