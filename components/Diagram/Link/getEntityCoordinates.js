/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var getRelativePoint = require('../../../shared/functions/getRelativePoint.js');

var getEntityCoordinates = function getEntityCoordinates(entity, portRefs, nodeRefs) {
  var canvas = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
    x: 0,
    y: 0
  };
  var pan = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
    x: 0,
    y: 0
  };
  if (entity && entity.type === 'node' && nodeRefs[entity.entity.id]) {
    var nodeEl = nodeRefs[entity.entity.id];
    var bbox = nodeEl.getBoundingClientRect();
    return [entity.entity.coordinates[0] + bbox.width / 2, entity.entity.coordinates[1] + bbox.height / 2];
  }
  if (portRefs && portRefs[entity.entity.id]) {
    var nextX = canvas.x + pan.x;
    var nextY = canvas.y + pan.y;
    var nextCanvas = [nextX, nextY];
    var portEl = portRefs[entity.entity.id];
    var _bbox = portEl.getBoundingClientRect();
    return getRelativePoint.default([_bbox.x + _bbox.width / 2, _bbox.y + _bbox.height / 2], [nextCanvas[0], nextCanvas[1]]);
  }
  return undefined;
};

exports.default = getEntityCoordinates;
