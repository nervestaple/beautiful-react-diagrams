/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

var DiagramContext = React.createContext({
  canvas: null,
  ports: null,
  nodes: null,
  panVal: {
    x: 0,
    y: 0
  },
  scaleVal: 1
});

exports.default = DiagramContext;
