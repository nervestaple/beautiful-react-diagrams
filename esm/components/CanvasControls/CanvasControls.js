/* beautiful-react-diagrams version: 0.6.0 */
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PlusIcon from './IconPlus.js';
import MinusIcon from './IconMinus.js';
import CenterIcon from './IconCenter.js';
import { noop } from '../../shared/Constants.js';

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
  var classList = useMemo(function () {
    return classNames('bi bi-diagram-ctrls', "bi-diagram-ctrls-".concat(placement), "bi-diagram-ctrls-".concat(alignment), className);
  }, [placement, className, alignment]);
  var zoomInHandler = useCallback(function () {
    onZoomChange(function (currentZoom) {
      return currentZoom + 0.25;
    });
  }, [onZoomChange]);
  var zoomOutHandler = useCallback(function () {
    onZoomChange(function (currentZoom) {
      return currentZoom - 0.25;
    });
  }, [onZoomChange]);
  var resetHandler = useCallback(function () {
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
  onPanChange: noop,
  onZoomChange: noop,
  ButtonRender: 'button',
  ZoomInBtnRender: PlusIcon,
  CenterBtnRender: CenterIcon,
  ZoomOutBtnRender: MinusIcon,
  ElementRender: 'nav'
};
var CanvasControls$1 = React.memo(CanvasControls);

export { CanvasControls$1 as default };
