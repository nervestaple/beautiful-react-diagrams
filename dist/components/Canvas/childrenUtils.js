/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

var React = require('react');
var CanvasControls = require('../CanvasControls/CanvasControls.js');

var filterControlsOut = function filterControlsOut(children, pan, scale) {
  return React.Children.map(children, function (C) {
    return C.type !== CanvasControls.default ? React.cloneElement(C, {
      pan: pan,
      scale: scale
    }) : null;
  });
};
var enrichControls = function enrichControls(children, props) {
  return React.Children.map(children, function (C) {
    if (C.type === CanvasControls.default) {
      return React.cloneElement(C, {
        onPanChange: C.props.onPanChange || props.onPanChange,
        onZoomChange: C.props.onZoomChange || props.onZoomChange,
        minZoom: C.props.minZoom || props.minZoom,
        maxZoom: C.props.maxZoom || props.maxZoom
      });
    }
    return null;
  });
};

exports.enrichControls = enrichControls;
exports.filterControlsOut = filterControlsOut;
