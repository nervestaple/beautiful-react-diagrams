/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var PropTypes = require('prop-types');
var Types = require('../../../shared/Types.js');
var DiagramNode = require('../DiagramNode/DiagramNode.js');
var updateNodeCoordinates = require('./updateNodeCoordinates.js');

var _excluded = ["data"];
var NodesCanvas = function NodesCanvas(props) {
  var nodes = props.nodes,
    onPortRegister = props.onPortRegister,
    onNodeRegister = props.onNodeRegister,
    onNodeRemove = props.onNodeRemove,
    onDragNewSegment = props.onDragNewSegment,
    onSegmentFail = props.onSegmentFail,
    onSegmentConnect = props.onSegmentConnect,
    onChange = props.onChange;
  var onNodePositionChange = function onNodePositionChange(nodeId, newCoordinates) {
    if (onChange) {
      var nextNodes = updateNodeCoordinates.default(nodeId, newCoordinates, nodes);
      onChange(nextNodes);
    }
  };
  return nodes && nodes.length > 0 && nodes.map(function (_ref) {
    var data = _ref.data,
      node = _rollupPluginBabelHelpers.objectWithoutProperties(_ref, _excluded);
    return React.createElement(DiagramNode.default, _rollupPluginBabelHelpers.extends({}, node, {
      data: data,
      onPositionChange: onNodePositionChange,
      onPortRegister: onPortRegister,
      onNodeRemove: onNodeRemove,
      onDragNewSegment: onDragNewSegment,
      onSegmentFail: onSegmentFail,
      onSegmentConnect: onSegmentConnect,
      onMount: onNodeRegister,
      key: node.id
    }));
  });
};
NodesCanvas.propTypes = {
  nodes: PropTypes.arrayOf(Types.NodeType),
  onChange: PropTypes.func,
  onNodeRegister: PropTypes.func,
  onPortRegister: PropTypes.func,
  onNodeRemove: PropTypes.func,
  onDragNewSegment: PropTypes.func,
  onSegmentFail: PropTypes.func,
  onSegmentConnect: PropTypes.func
};
NodesCanvas.defaultProps = {
  nodes: [],
  onChange: undefined,
  onNodeRegister: undefined,
  onPortRegister: undefined,
  onNodeRemove: undefined,
  onDragNewSegment: undefined,
  onSegmentFail: undefined,
  onSegmentConnect: undefined
};
var NodesCanvas$1 = React.memo(NodesCanvas);

exports.default = NodesCanvas$1;
