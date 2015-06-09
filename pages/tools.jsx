var React = require('react');
var Illustration = require('../components/illustration.jsx');
var Router = require('react-router');
var Link = Router.Link;
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');

var ToolsIntro = React.createClass({
  render: function() {
    return (
      <div>
        <section className="intro">
          <Illustration
            height={204} width={204}
            src1x="/img/pages/tools/svg/icon-teach-like-mozilla-tools.svg"
            alt="icon toolkit"
            className="img-circle">
            <h1>Tools to Teach and Learn the Web</h1>
            <h2>These tools are free and open source, and can be used in a variety of ways to teach learners how to read, write, and participate on the Web.</h2>
          </Illustration>
        </section>
      </div>
    );
  }
});

var ToolsSection = React.createClass({
  render: function() {
    return (
      <section>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-6 tools-col">
            <Illustration
              height={204} width={204}
              src1x="/img/pages/tools/xray-goggles.png"
              src2x="/img/pages/tools/xray-goggles@2x.png"
              alt="icon toolkit"
              verticalLayout>
              <h2><a href="/fixme">X-Ray Goggles(broken link)</a></h2>
              <p>This code inspector lets you view and remix the code of your favorite web pages.</p>
            </Illustration>
            <ul>
              <li><a href="http://mozilla.github.io/webmaker-curriculum/WebLiteracyBasics-I/session02-hackthenews.html">Hack the News</a></li>
            </ul>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6 tools-col">
            <Illustration
              height={204} width={204}
              src1x="/img/pages/tools/thimble.png"
              src2x="/img/pages/tools/thimble@2x.png"
              alt="icon toolkit"
              verticalLayout>
              <h2><a href="/fixme">Thimble(broken link)</a></h2>
              <p>This code editor helps you learn HTML and CSS by creating and remixing Web projects.</p>
            </Illustration>
            <ul>
              <li><span className="label label-success"></span><a href="http://mozilla.github.io/webmaker-curriculum/WebLiteracyBasics-I/session02-hackthenews.html">Hack the News</a></li>
            </ul>
          </div>
        </div>
      </section>
    )
  }
});

var ToolsPage = React.createClass({
  statics: {
    pageTitle: 'Tools',
    pageClassName: 'tools-page',
  },
  render: function(){
    return (
      <div className="inner-container">
        <ToolsIntro/>
        <ToolsSection/>
        <section>
          <div className="row">
            <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
              <p className="callout-heading">Visit our <Link to="activities">Teaching Activities page</Link> for more examples of how to use these tools in your practice.</p>
            </div>
          </div>
        </section>
        <img src="/img/pages/tools/svg/icon-horizontal-divider.svg" width={292} alt="" className="center-block horizontal-divider"/>
        <section>
          <IconLinks>
            <IconLink
              href="http://mzl.la/TTWpodcasts"
              imgSrc="/img/pages/teach-like-mozilla/svg/icon-listen.svg"
              head="Listen"
              subhead="Subscribe to our podcast"
            />
            <IconLink
              linkTo="web-literacy"
              imgSrc="/img/pages/teach-like-mozilla/svg/icon-learn.svg"
              head="Understand"
              subhead="Learn more about the Web Literacy Map"
            />
            <IconLink
              href="http://discourse.webmaker.org/category/meet"
              imgSrc="/img/pages/teach-like-mozilla/svg/icon-connect.svg"
              head="Say Hello"
              subhead="Meet the teach community"
            />
          </IconLinks>
        </section>
      </div>
    );
  }
});

module.exports = ToolsPage;
