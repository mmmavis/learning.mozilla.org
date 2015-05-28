var should = require('should');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

var stubContext = require('./stub-context.jsx');
var stubBlogFeedLoader = require('./stub-blog-feed-loader.js');
var HomePage = require('../../pages/home.jsx');

describe("HomePage", function() {
  var homePage, blogSection;

  beforeEach(function() {
    homePage = stubContext.render(HomePage);
    blogSection = stubContext.render(HomePage.BlogSection);
  });

  describe("blogSection", function() {
    it("should display featured post", function() {
      blogSection.getDOMNode().querySelector(".featured-post .entry-title").textContent.should.not.eql("");
    });
    it("should display 3 other latest posts", function() {
      blogSection.getDOMNode().querySelectorAll(".recent-posts .post-title").length.should.equal(3);
    });
  });

  afterEach(function() {
    stubContext.unmount(homePage);
    stubContext.unmount(blogSection);
  });
});
