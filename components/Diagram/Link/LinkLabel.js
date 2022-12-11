/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');

var LinkLabel = function LinkLabel(_ref) {
  var label = _ref.label,
    position = _ref.position;
  return React.createElement("foreignObject", {
    x: position[0],
    y: position[1]
  }, React.createElement("div", {
    className: "bi-diagram-link-label"
  }, label));
};
LinkLabel.propTypes = {
  label: PropTypes.string.isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired
};
var LinkLabel$1 = React.memo(LinkLabel);

exports.default = LinkLabel$1;
