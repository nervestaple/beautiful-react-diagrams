/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var beautifulReactHooks = require('beautiful-react-hooks');
var isEqual = require('lodash.isequal');
var PropTypes = require('prop-types');
var classNames = require('classnames');
var DiagramContext = require('../../../Context/DiagramContext.js');

var _excluded = ["children", "portRefs", "nodeRefs", "pan", "scale", "className"];
var DiagramCanvas = function DiagramCanvas(props) {
  var children = props.children,
    portRefs = props.portRefs,
    nodeRefs = props.nodeRefs,
    pan = props.pan,
    scale = props.scale,
    className = props.className,
    rest = _rollupPluginBabelHelpers.objectWithoutProperties(props, _excluded);
  var _useState = React.useState(),
    _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
    bbox = _useState2[0],
    setBoundingBox = _useState2[1];
  var canvasRef = React.useRef();
  var classList = classNames('bi bi-diagram', className);
  var calculateBBox = function calculateBBox() {
    if (canvasRef.current) {
      var nextBBox = canvasRef.current.getBoundingClientRect();
      if (!isEqual(nextBBox, bbox)) {
        setBoundingBox(nextBBox);
      }
    }
  };
  React.useEffect(calculateBBox, [canvasRef.current]);
  beautifulReactHooks.useWindowScroll(calculateBBox);
  beautifulReactHooks.useWindowResize(calculateBBox);
  return React.createElement("div", _rollupPluginBabelHelpers.extends({
    className: classList,
    ref: canvasRef
  }, rest), React.createElement("div", {
    className: "bi-diagram-inners"
  }, React.createElement(DiagramContext.default.Provider, {
    value: {
      canvas: bbox,
      ports: portRefs,
      nodes: nodeRefs,
      panVal: pan,
      scaleVal: scale
    }
  }, children)));
};
DiagramCanvas.propTypes = {
  portRefs: PropTypes.shape({}),
  nodeRefs: PropTypes.shape({}),
  className: PropTypes.string,
  pan: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  scale: PropTypes.number
};
DiagramCanvas.defaultProps = {
  portRefs: {},
  nodeRefs: {},
  className: '',
  pan: {
    x: 0,
    y: 0
  },
  scale: 1
};
var DiagramCanvas$1 = React.memo(DiagramCanvas);

exports.default = DiagramCanvas$1;
