/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var PropTypes = require('prop-types');
var DiagramCanvas = require('./DiagramCanvas/DiagramCanvas.js');
var NodesCanvas = require('./NodesCanvas/NodesCanvas.js');
var LinksCanvas = require('./LinksCanvas/LinksCanvas.js');
var Types = require('../../shared/Types.js');

var _excluded = ["schema", "onChange", "pan", "scale"];
var Diagram = function Diagram(props) {
  var schema = props.schema,
    onChange = props.onChange,
    pan = props.pan,
    scale = props.scale,
    rest = _rollupPluginBabelHelpers.objectWithoutProperties(props, _excluded);
  var _useState = React.useState(),
    _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
    segment = _useState2[0],
    setSegment = _useState2[1];
  var _useRef = React.useRef({}),
    portRefs = _useRef.current;
  var _useRef2 = React.useRef({}),
    nodeRefs = _useRef2.current;
  var onNodesChange = function onNodesChange(nextNodes) {
    if (onChange) {
      onChange({
        nodes: nextNodes
      });
    }
  };
  var onPortRegister = function onPortRegister(portId, portEl) {
    portRefs[portId] = portEl;
  };
  var onNodeRegister = function onNodeRegister(nodeId, nodeEl) {
    nodeRefs[nodeId] = nodeEl;
  };
  var onNodeRemove = React.useCallback(function (nodeId, inputsPorts, outputsPorts) {
    delete nodeRefs[nodeId];
    inputsPorts.forEach(function (input) {
      return delete portRefs[input];
    });
    outputsPorts.forEach(function (output) {
      return delete portRefs[output];
    });
  }, []);
  var onDragNewSegment = React.useCallback(function (portId, from, to, alignment) {
    setSegment({
      id: "segment-".concat(portId),
      from: from,
      to: to,
      alignment: alignment
    });
  }, []);
  var onSegmentFail = React.useCallback(function () {
    setSegment(undefined);
  }, []);
  var onSegmentConnect = function onSegmentConnect(input, output) {
    var nextLinks = [].concat(_rollupPluginBabelHelpers.toConsumableArray(schema.links || []), [{
      input: input,
      output: output
    }]);
    if (onChange) {
      onChange({
        links: nextLinks
      });
    }
    setSegment(undefined);
  };
  var onLinkDelete = function onLinkDelete(nextLinks) {
    if (onChange) {
      onChange({
        links: nextLinks
      });
    }
  };
  return React.createElement(DiagramCanvas.default, _rollupPluginBabelHelpers.extends({
    portRefs: portRefs,
    nodeRefs: nodeRefs,
    pan: pan,
    scale: scale
  }, rest), React.createElement(NodesCanvas.default, {
    nodes: schema.nodes,
    onChange: onNodesChange,
    onNodeRegister: onNodeRegister,
    onPortRegister: onPortRegister,
    onNodeRemove: onNodeRemove,
    onDragNewSegment: onDragNewSegment,
    onSegmentFail: onSegmentFail,
    onSegmentConnect: onSegmentConnect
  }), React.createElement(LinksCanvas.default, {
    nodes: schema.nodes,
    links: schema.links,
    segment: segment,
    onChange: onLinkDelete
  }));
};
Diagram.propTypes = {
  schema: Types.SchemaType,
  onChange: PropTypes.func,
  pan: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  scale: PropTypes.number
};
Diagram.defaultProps = {
  schema: {
    nodes: [],
    links: []
  },
  pan: {
    x: 0,
    y: 0
  },
  scale: 1,
  onChange: undefined
};
var Diagram$1 = React.memo(Diagram);

exports.default = Diagram$1;
