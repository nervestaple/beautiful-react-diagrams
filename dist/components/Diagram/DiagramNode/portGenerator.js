/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var Port = require('../Port/Port.js');

var portGenerator = function portGenerator(_ref, type) {
  var registerPort = _ref.registerPort,
    onDragNewSegment = _ref.onDragNewSegment,
    onSegmentFail = _ref.onSegmentFail,
    onSegmentConnect = _ref.onSegmentConnect;
  return function (port) {
    return React.createElement(Port.default, _rollupPluginBabelHelpers.extends({}, port, {
      onMount: registerPort,
      onDragNewSegment: onDragNewSegment,
      onSegmentFail: onSegmentFail,
      onSegmentConnect: onSegmentConnect,
      type: type,
      key: port.id
    }));
  };
};

exports.default = portGenerator;
