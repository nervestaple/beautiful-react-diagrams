/* beautiful-react-diagrams version: 0.6.0 */
import { objectWithoutProperties as _objectWithoutProperties, extends as _extends } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import useCanvasPanHandlers from './useCanvasPanHandlers.js';
import useCanvasZoomHandlers from './useCanvasZoomHandlers.js';
import BackgroundGrid from './BackgroundGrid.js';
import { noop } from '../../shared/Constants.js';
import { filterControlsOut, enrichControls } from './childrenUtils.js';

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
    rest = _objectWithoutProperties(props, _excluded);
  var elRef = useRef();
  var classList = useMemo(function () {
    return classNames('bi bi-diagram bi-diagram-canvas', className);
  }, [className]);
  var style = useMemo(function () {
    return calcTransformation(zoom, pan);
  }, [zoom, pan.x, pan.y]);
  var startPan = useCanvasPanHandlers({
    pan: pan,
    onPanChange: onPanChange,
    inertia: inertia
  });
  useCanvasZoomHandlers(elRef, {
    onZoomChange: onZoomChange,
    maxZoom: maxZoom,
    minZoom: minZoom,
    zoomOnWheel: zoomOnWheel,
    zoomResetOnDblClick: zoomResetOnDblClick
  });
  return React.createElement(ElementRenderer, _extends({
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
  }, filterControlsOut(children, pan, zoom)), debug && React.createElement("div", {
    className: "bi-canvas-debugger"
  }, React.createElement("p", null, "Pan: ".concat(pan.x, ", ").concat(pan.y)), React.createElement("p", null, "Scale: ".concat(zoom))), enrichControls(children, {
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
  onPanChange: noop,
  zoom: 1,
  onZoomChange: noop,
  zoomOnWheel: true,
  maxZoom: 2,
  minZoom: 0.5,
  zoomResetOnDblClick: true,
  inertia: true,
  debug: false,
  GridRenderer: BackgroundGrid,
  ElementRenderer: 'div'
};
var Canvas$1 = React.memo(Canvas);

export { Canvas$1 as default };
