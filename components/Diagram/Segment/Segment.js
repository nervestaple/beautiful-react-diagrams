/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var Types = require('../../../shared/Types.js');
var makeSvgPath = require('../../../shared/functions/makeSvgPath.js');
var useCanvas = require('../../../shared/internal_hooks/useCanvas.js');

var Segment = function Segment(props) {
  var from = props.from,
    to = props.to,
    alignment = props.alignment;
  var pathOptions = {
    type: 'bezier',
    inputAlignment: alignment
  };
  var path = React.useMemo(function () {
    return makeSvgPath.default(from, to, pathOptions);
  }, [from, to, alignment]);
  var _useCanvas = useCanvas.default(),
    scaleVal = _useCanvas.scaleVal;
  var nextScale = 1 / scaleVal;
  return React.createElement("g", {
    className: "bi-diagram-segment",
    style: {
      transform: "scale(".concat(nextScale, ")")
    }
  }, React.createElement("path", {
    d: path
  }), React.createElement("circle", {
    r: "6.5",
    cx: to[0],
    cy: to[1]
  }));
};
Segment.propTypes = {
  from: PropTypes.arrayOf(PropTypes.number).isRequired,
  to: PropTypes.arrayOf(PropTypes.number).isRequired,
  alignment: Types.PortAlignment
};
Segment.defaultProps = {
  alignment: undefined
};
var Segment$1 = React.memo(Segment);

exports.default = Segment$1;
