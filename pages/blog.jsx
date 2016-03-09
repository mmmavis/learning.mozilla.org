var React = require('react');
var Page = require('../components/page.jsx');
var WpContentLoader = require('react-wp-content-loader');

var Blog = React.createClass({
  render: function() {
    var props = { routes: [ { path: '', component: { pageClassName: '', pageTitle: 'lol'} } ] };
    return (<div><Page {...props}><WpContentLoader wpUrl="teachmozillaorg.wordpress.com"
                         wpPostSlug={this.props.params.wpslug} /></Page></div>);
  }

});

module.exports = Blog;