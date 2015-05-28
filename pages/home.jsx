var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var moment = require('moment');

var HeroUnit = require('../components/hero-unit.jsx');
var Blockquote = require('../components/blockquote.jsx');
var Illustration = require('../components/illustration.jsx');
var IconLinks = require('../components/icon-links.jsx');
var IconLink = require('../components/icon-link.jsx');
var IconButtons = require('../components/icon-buttons.jsx');
var IconButton = require('../components/icon-button.jsx');

var config = require('../lib/config');
var loadBlogPosts = require('../lib/blog-feed-loader');

var CaseStudies = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-sm-offset-2 col-sm-8 col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
          <div>
            <Blockquote author="Maurya C. New York, United States"
                imgSrc="/img/pages/home/maurya-nyc.png" imgSrc2x="/img/pages/home/maurya-nyc@2x.png">
              <p>"Web literacy is about more than coding - it's about how you can be a better web citizen."</p>
            </Blockquote>
          </div>
        </div>
      </div>
    );
  }
});

var FeaturedPost = React.createClass({
  propTypes: {
    data: React.PropTypes.object.isRequired
  },
  render: function() {
    var parsedDate = moment(new Date(this.props.data.publishedDate));
    return(
      <div className="featured-post">
        <div className="entry-posted-container">
          <p className="entry-posted">
            <time className="published" dateTime={this.props.data.publishedDate} >
              <span className="posted-month">{parsedDate.format("MMM")}</span>
              <span className="posted-date">{parsedDate.format("D")}</span>
              <span className="posted-year">{parsedDate.format("YYYY")}</span>
            </time>
          </p>
        </div>
        <div className="entry-header-container">
          <h3 className="entry-title"><a href={this.props.data.link}>{this.props.data.title}</a></h3>
          <cite className="author">{this.props.data.author}</cite>
        </div>
        <p className="excerpt">
          {this.props.data.contentSnippet}
        </p>
        <a className="more" href={this.props.data.link}>Continue reading</a>
      </div>
    );
  },
});

var LatestPosts = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  render: function() {
    return (
      <ul className="recent-posts">
        {
          this.props.data.map(function(post, i) {
            return (
              <li key={i}>
                <a className="post-title" href={post.link}>{post.title}</a>
                <time className="published" dateTime={post.publishedDate}>
                  <span>{moment(new Date(post.publishedDate)).format("MMM D, YYYY")}</span>
                </time>
              </li>
            )
          })
        }
      </ul>
    );
  }
});

var BlogSection = React.createClass({
  getDefaultProps: function() {
    return {
      loadBlogPosts: loadBlogPosts
    };
  },
  getInitialState: function() {
    return {
      featuredPost: {
        title: "",
        author: "",
        publishedDate: new Date(),
        contentSnippet: "",
        link: "https://blog.webmaker.org"
      },
      latestPosts: [{
        title: "",
        publishedDate: new Date(),
        link: "https://blog.webmaker.org"
      }]
    }
  },
  componentDidMount: function() {
    this.props.loadBlogPosts(function(data) {
      if (!this.isMounted()) {
        return;
      }
      this.setState({
        featuredPost: data.featuredPost,
        latestPosts: data.latestPosts
      });
    }.bind(this));
  },
  render: function() {
    return (
      <div className="blog-section">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <h2>On the Blog</h2>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-8 col-md-8 col-lg-8">
            <FeaturedPost data={this.state.featuredPost} />
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            <LatestPosts data={this.state.latestPosts} />
            <a className="more" href="https://blog.webmaker.org/tag/teachtheweb/">See all blog posts</a>
          </div>
        </div>
      </div>
    );
  }
});

var HomePage = React.createClass({
  statics: {
    BlogSection: BlogSection
  },
  render: function() {
    return (
      <div>
        <HeroUnit image="/img/pages/home/hero-unit.png"
                  image2x="/img/pages/home/hero-unit@2x.png">
          <h1>The Mozilla Learning Network</h1>
          <IconButtons>
            <IconButton
              linkTo="activities"
              imgSrc="/img/pages/home/svg/icon-teachanactivity.svg"
              head="Teach an Activity"
            />
            <IconButton
              linkTo="events"
              imgSrc="/img/pages/home/svg/icon-hostanevent.svg"
              head="Host an Event"
            />
            <IconButton
              linkTo="mozilla-clubs"
              imgSrc="/img/pages/home/svg/icon-startamozillaclub.svg"
              head="Start A Mozilla Club"
            />
          </IconButtons>
        </HeroUnit>
        <div className="inner-container">
          <section>
            <div className="about-us">
              <Illustration
                height={200} width={200}
                src1x="/img/pages/about/about-illustration.svg" src2x="/img/pages/about/about-illustration.svg"
                alt="">
                  <h2>About Us</h2>
                  <p>We want more people to see themselves as citizens of the web. Mozilla Learning Networks offers programs and a global community dedicated to helping people learn the most important skills of our age: <em>the ability to read, write and participate in the digital world.</em> <Link to="about" className="more">Learn more</Link></p>
              </Illustration>
            </div>
          </section>
          <section>
            <BlogSection/>
          </section>
        </div>
        <div className="quote">
          <div className="inner-container">
            <section>
              <CaseStudies/>
            </section>
          </div>
        </div>
        <div className="inner-container">
          <IconLinks>
            <IconLink
              href={config.TWITTER_LINK}
              imgSrc="/img/pages/about/svg/icon-twitter-blue.svg"
              imgAlt=""
              head="Follow Us"
              subhead="Start a conversation on Twitter"
            />
            <IconLink
              href="mailto:teachtheweb@mozillafoundation.org"
              imgSrc="/img/pages/about/svg/icon-get-help-blue.svg"
              imgAlt=""
              head="Get Help"
              subhead="Email us anytime"
            />
            <IconLink
              href="http://discourse.webmaker.org/category/meet"
              imgSrc="/img/pages/about/svg/icon-connect-blue.svg"
              imgAlt=""
              head="Say Hello"
              subhead="Connect on the Discourse forum"
            />
          </IconLinks>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
