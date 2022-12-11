/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var findIndex = require('lodash.findindex');

var updateNodeCoordinates = function updateNodeCoordinates(nodeId, coordinates, nodes) {
  var index = findIndex(nodes, ['id', nodeId]);
  if (index > -1 && !nodes[index].disableDrag) {
    nodes[index].coordinates = coordinates;
  }
  return nodes;
};

exports.default = updateNodeCoordinates;
