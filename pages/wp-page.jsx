var React = require('react');
var Page = require('../components/page.jsx');
var WpContentLoader = require('react-wp-content-loader');

// [TODO] 404 needs to be handled properly. Now we just make all the 
//        non-component pages as wp-pages
var WpPage = React.createClass({
  render: function() {
    var props = { routes: [ { path: '', component: { pageClassName: '', pageTitle: ''} } ] };

    return (
            <Page {...props}>
              <WpContentLoader wpUrl="teachmozillaorg.wordpress.com" wpPostSlug={this.props.params.wpSlug} />
            </Page>
    );
  }

});

module.exports = WpPage;
