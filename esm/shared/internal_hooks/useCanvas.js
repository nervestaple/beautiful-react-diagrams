/* beautiful-react-diagrams version: 0.6.0 */
import { useContext } from 'react';
import DiagramContext from '../../Context/DiagramContext.js';

var useCanvas = function useCanvas() {
  var _useContext = useContext(DiagramContext),
    canvas = _useContext.canvas,
    panVal = _useContext.panVal,
    scaleVal = _useContext.scaleVal;
  return {
    canvas: canvas,
    panVal: panVal,
    scaleVal: scaleVal
  };
};

export { useCanvas as default };
