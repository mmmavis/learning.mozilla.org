var React = require('react');
var ImageTag = require('./imagetag.jsx');

var Illustration = React.createClass({  propTypes: {
    width: React.PropTypes.number.isRequired,
    height: React.PropTypes.number.isRequired,
    verticalLayout: React.PropTypes.bool
  },
  render: function() {
    var classes = this.props.verticalLayout ? "illustration vertical-layout" : "illustration";
    var image = <ImageTag width={this.props.width}
                          height={this.props.height}
                          className={this.props.className}
                          src1x={this.props.src1x}
                          src2x={this.props.src2x}
                          alt={this.props.alt}/>;
    return (
      <div className={classes}>
        <div className="image-container">
          { this.props.link ?
            <a href={this.props.link}>
              {image}
            </a> :
            image
          }
        </div>
        <div className="content-container">{this.props.children}</div>
      </div>
    );
  }
});

module.exports = Illustration;
