var React = require('react');
var path = require('path');

var WpContentLoader = require('react-wp-content-loader');

var config = require('../config/config');


var WpPage = React.createClass({
  statics: {
    pageTitle: '',
    pageClassName: 'wp-page'
  },
  render: function () {
    console.log("\n\n\n Current Path =", this.props.currentPath.replace(config.ORIGIN,'').replace(/\//g, ''));
    console.log("path.relative(from, to) = ", path.relative(config.ORIGIN, this.props.currentPath));

    var slug = path.relative(config.ORIGIN, this.props.currentPath);

    return (
      <div className="inner-container">
        <WpContentLoader wpUrl="teachmozillaorg.wordpress.com" wpPostSlug={slug} />
      </div>
    );
  }
});

module.exports = WpPage;
