/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var DiagramContext = require('../../Context/DiagramContext.js');

var useCanvas = function useCanvas() {
  var _useContext = React.useContext(DiagramContext.default),
    canvas = _useContext.canvas,
    panVal = _useContext.panVal,
    scaleVal = _useContext.scaleVal;
  return {
    canvas: canvas,
    panVal: panVal,
    scaleVal: scaleVal
  };
};

exports.default = useCanvas;
