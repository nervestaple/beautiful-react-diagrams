/* beautiful-react-diagrams version: 0.6.0 */
import React from 'react';

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

export { DiagramContext as default };
