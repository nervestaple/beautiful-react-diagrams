/* beautiful-react-diagrams version: 0.6.0 */
import React, { Children, cloneElement } from 'react';
import CanvasControls from '../CanvasControls/CanvasControls.js';

var filterControlsOut = function filterControlsOut(children, pan, scale) {
  return Children.map(children, function (C) {
    return C.type !== CanvasControls ? React.cloneElement(C, {
      pan: pan,
      scale: scale
    }) : null;
  });
};
var enrichControls = function enrichControls(children, props) {
  return Children.map(children, function (C) {
    if (C.type === CanvasControls) {
      return cloneElement(C, {
        onPanChange: C.props.onPanChange || props.onPanChange,
        onZoomChange: C.props.onZoomChange || props.onZoomChange,
        minZoom: C.props.minZoom || props.minZoom,
        maxZoom: C.props.maxZoom || props.maxZoom
      });
    }
    return null;
  });
};

export { enrichControls, filterControlsOut };
