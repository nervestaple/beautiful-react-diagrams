/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var PropTypes = require('prop-types');
var classNames = require('classnames');
var IconPlus = require('./IconPlus.js');
var IconMinus = require('./IconMinus.js');
var IconCenter = require('./IconCenter.js');
var Constants = require('../../shared/Constants.js');

var CanvasControls = function CanvasControls(props) {
  var placement = props.placement,
    alignment = props.alignment,
    onPanChange = props.onPanChange,
    onZoomChange = props.onZoomChange,
    className = props.className,
    ElementRender = props.ElementRender,
    ButtonRender = props.ButtonRender,
    ZoomInBtnRender = props.ZoomInBtnRender,
    ZoomOutBtnRender = props.ZoomOutBtnRender,
    CenterBtnRender = props.CenterBtnRender;
  var classList = React.useMemo(function () {
    return classNames('bi bi-diagram-ctrls', "bi-diagram-ctrls-".concat(placement), "bi-diagram-ctrls-".concat(alignment), className);
  }, [placement, className, alignment]);
  var zoomInHandler = React.useCallback(function () {
    onZoomChange(function (currentZoom) {
      return currentZoom + 0.25;
    });
  }, [onZoomChange]);
  var zoomOutHandler = React.useCallback(function () {
    onZoomChange(function (currentZoom) {
      return currentZoom - 0.25;
    });
  }, [onZoomChange]);
  var resetHandler = React.useCallback(function () {
    onPanChange({
      x: 0,
      y: 0
    });
    onZoomChange(1);
  }, [onZoomChange, onPanChange]);
  return React.createElement(ElementRender, {
    className: classList
  }, React.createElement(ButtonRender, {
    onClick: zoomInHandler,
    className: "bid-ctrls-btn"
  }, React.createElement(ZoomInBtnRender, null)), React.createElement(ButtonRender, {
    onClick: resetHandler,
    className: "bid-ctrls-btn"
  }, React.createElement(CenterBtnRender, null)), React.createElement(ButtonRender, {
    onClick: zoomOutHandler,
    className: "bid-ctrls-btn"
  }, React.createElement(ZoomOutBtnRender, null)));
};
CanvasControls.propTypes = {
  placement: PropTypes.oneOf(['top-left', 'top-right', 'top-center', 'bottom-right', 'bottom-center', 'bottom-left', 'left', 'right']),
  alignment: PropTypes.oneOf(['vertical', 'horizontal']),
  onPanChange: PropTypes.func,
  onZoomChange: PropTypes.func,
  ButtonRender: PropTypes.elementType,
  ZoomInBtnRender: PropTypes.elementType,
  CenterBtnRender: PropTypes.elementType,
  ZoomOutBtnRender: PropTypes.elementType,
  ElementRender: PropTypes.elementType
};
CanvasControls.defaultProps = {
  placement: 'bottom-left',
  alignment: 'vertical',
  onPanChange: Constants.noop,
  onZoomChange: Constants.noop,
  ButtonRender: 'button',
  ZoomInBtnRender: IconPlus.default,
  CenterBtnRender: IconCenter.default,
  ZoomOutBtnRender: IconMinus.default,
  ElementRender: 'nav'
};
var CanvasControls$1 = React.memo(CanvasControls);

exports.default = CanvasControls$1;
