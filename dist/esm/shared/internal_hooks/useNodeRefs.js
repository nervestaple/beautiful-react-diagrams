/* beautiful-react-diagrams version: 0.6.0 */
import { useContext } from 'react';
import DiagramContext from '../../Context/DiagramContext.js';

var useNodeRefs = function useNodeRefs() {
  var _useContext = useContext(DiagramContext),
    nodes = _useContext.nodes;
  return nodes;
};

export { useNodeRefs as default };
