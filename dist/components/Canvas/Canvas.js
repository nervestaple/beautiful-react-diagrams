/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var PropTypes = require('prop-types');
var classNames = require('classnames');
var useCanvasPanHandlers = require('./useCanvasPanHandlers.js');
var useCanvasZoomHandlers = require('./useCanvasZoomHandlers.js');
var BackgroundGrid = require('./BackgroundGrid.js');
var Constants = require('../../shared/Constants.js');
var childrenUtils = require('./childrenUtils.js');

var _excluded = ["pan", "onPanChange", "zoom", "onZoomChange", "maxZoom", "minZoom", "zoomOnWheel", "inertia", "zoomResetOnDblClick", "ElementRenderer", "GridRenderer", "debug", "className", "children"];
var calcTransformation = function calcTransformation() {
  var scale = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  var _ref = arguments.length > 1 ? arguments[1] : undefined,
    _ref$x = _ref.x,
    x = _ref$x === void 0 ? 0 : _ref$x,
    _ref$y = _ref.y,
    y = _ref$y === void 0 ? 0 : _ref$y;
  return {
    transform: "translate(".concat(x, "px, ").concat(y, "px) translateZ(0) scale(").concat(scale, ")")
  };
};
var Canvas = function Canvas(props) {
  var pan = props.pan,
    onPanChange = props.onPanChange,
    zoom = props.zoom,
    onZoomChange = props.onZoomChange,
    maxZoom = props.maxZoom,
    minZoom = props.minZoom,
    zoomOnWheel = props.zoomOnWheel,
    inertia = props.inertia,
    zoomResetOnDblClick = props.zoomResetOnDblClick,
    ElementRenderer = props.ElementRenderer,
    GridRenderer = props.GridRenderer,
    debug = props.debug,
    className = props.className,
    children = props.children,
    rest = _rollupPluginBabelHelpers.objectWithoutProperties(props, _excluded);
  var elRef = React.useRef();
  var classList = React.useMemo(function () {
    return classNames('bi bi-diagram bi-diagram-canvas', className);
  }, [className]);
  var style = React.useMemo(function () {
    return calcTransformation(zoom, pan);
  }, [zoom, pan.x, pan.y]);
  var startPan = useCanvasPanHandlers.default({
    pan: pan,
    onPanChange: onPanChange,
    inertia: inertia
  });
  useCanvasZoomHandlers.default(elRef, {
    onZoomChange: onZoomChange,
    maxZoom: maxZoom,
    minZoom: minZoom,
    zoomOnWheel: zoomOnWheel,
    zoomResetOnDblClick: zoomResetOnDblClick
  });
  return React.createElement(ElementRenderer, _rollupPluginBabelHelpers.extends({
    className: classList,
    onMouseDown: startPan,
    onTouchStart: startPan,
    ref: elRef
  }, rest), React.createElement(GridRenderer, {
    translateX: pan.x,
    translateY: pan.y,
    scale: zoom
  }), React.createElement("div", {
    className: "bi-canvas-content",
    style: style
  }, childrenUtils.filterControlsOut(children, pan, zoom)), debug && React.createElement("div", {
    className: "bi-canvas-debugger"
  }, React.createElement("p", null, "Pan: ".concat(pan.x, ", ").concat(pan.y)), React.createElement("p", null, "Scale: ".concat(zoom))), childrenUtils.enrichControls(children, {
    onPanChange: onPanChange,
    onZoomChange: onZoomChange,
    minZoom: minZoom,
    maxZoom: maxZoom
  }));
};
Canvas.propTypes = {
  pan: PropTypes.exact({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  onPanChange: PropTypes.func,
  zoom: PropTypes.number,
  onZoomChange: PropTypes.func,
  zoomOnWheel: PropTypes.bool,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  zoomResetOnDblClick: PropTypes.bool,
  inertia: PropTypes.bool,
  debug: PropTypes.bool,
  GridRenderer: PropTypes.elementType,
  ElementRenderer: PropTypes.elementType
};
Canvas.defaultProps = {
  pan: {
    x: 0,
    y: 0
  },
  onPanChange: Constants.noop,
  zoom: 1,
  onZoomChange: Constants.noop,
  zoomOnWheel: true,
  maxZoom: 2,
  minZoom: 0.5,
  zoomResetOnDblClick: true,
  inertia: true,
  debug: false,
  GridRenderer: BackgroundGrid.default,
  ElementRenderer: 'div'
};
var Canvas$1 = React.memo(Canvas);

exports.default = Canvas$1;
