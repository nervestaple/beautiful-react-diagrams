/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');

var defaultInitialState = {
  pan: {
    x: 0,
    y: 0
  },
  zoom: 1
};
var useCanvasState = function useCanvasState() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultInitialState;
  var _useState = React.useState(initialState.pan),
    _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
    pan = _useState2[0],
    onPanChange = _useState2[1];
  var _useState3 = React.useState(initialState.zoom),
    _useState4 = _rollupPluginBabelHelpers.slicedToArray(_useState3, 2),
    zoom = _useState4[0],
    onZoomChange = _useState4[1];
  return [{
    pan: pan,
    zoom: zoom
  }, {
    onPanChange: onPanChange,
    onZoomChange: onZoomChange
  }];
};

exports.default = useCanvasState;
