/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var Link = require('../Link/Link.js');
var Segment = require('../Segment/Segment.js');
var Types = require('../../../shared/Types.js');
var findInvolvedEntity = require('./findInvolvedEntity.js');
var removeLinkFromArray = require('./removeLinkFromArray.js');

var LinksCanvas = function LinksCanvas(props) {
  var nodes = props.nodes,
    segment = props.segment,
    onChange = props.onChange,
    links = props.links;
  var removeFromLinksArray = React.useCallback(function (link) {
    if (links.length > 0 && onChange) {
      var nextLinks = removeLinkFromArray.default(link, links);
      onChange(nextLinks);
    }
  }, [links, onChange]);
  return React.createElement("svg", {
    className: "bi bi-link-canvas-layer"
  }, links && links.length > 0 && links.map(function (link) {
    return React.createElement(Link.default, {
      link: link,
      input: findInvolvedEntity.default(nodes, link.input),
      output: findInvolvedEntity.default(nodes, link.output),
      onDelete: removeFromLinksArray,
      key: "".concat(link.input, "-").concat(link.output)
    });
  }), segment && React.createElement(Segment.default, segment));
};
LinksCanvas.propTypes = {
  nodes: PropTypes.arrayOf(Types.NodeType),
  links: PropTypes.arrayOf(Types.LinkType),
  segment: PropTypes.exact({
    id: PropTypes.string,
    from: PropTypes.arrayOf(PropTypes.number),
    to: PropTypes.arrayOf(PropTypes.number),
    alignment: Types.PortAlignment
  }),
  onChange: PropTypes.func
};
LinksCanvas.defaultProps = {
  nodes: [],
  links: [],
  segment: undefined,
  onChange: undefined
};
var LinksCanvas$1 = React.memo(LinksCanvas);

exports.default = LinksCanvas$1;
