/* beautiful-react-diagrams version: 0.6.0 */
import { objectWithoutProperties as _objectWithoutProperties, slicedToArray as _slicedToArray, extends as _extends, toConsumableArray as _toConsumableArray } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import DiagramCanvas from './DiagramCanvas/DiagramCanvas.js';
import NodesCanvas from './NodesCanvas/NodesCanvas.js';
import LinksCanvas from './LinksCanvas/LinksCanvas.js';
import { SchemaType } from '../../shared/Types.js';

var _excluded = ["schema", "onChange", "pan", "scale"];
var Diagram = function Diagram(props) {
  var schema = props.schema,
    onChange = props.onChange,
    pan = props.pan,
    scale = props.scale,
    rest = _objectWithoutProperties(props, _excluded);
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    segment = _useState2[0],
    setSegment = _useState2[1];
  var _useRef = useRef({}),
    portRefs = _useRef.current;
  var _useRef2 = useRef({}),
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
  var onNodeRemove = useCallback(function (nodeId, inputsPorts, outputsPorts) {
    delete nodeRefs[nodeId];
    inputsPorts.forEach(function (input) {
      return delete portRefs[input];
    });
    outputsPorts.forEach(function (output) {
      return delete portRefs[output];
    });
  }, []);
  var onDragNewSegment = useCallback(function (portId, from, to, alignment) {
    setSegment({
      id: "segment-".concat(portId),
      from: from,
      to: to,
      alignment: alignment
    });
  }, []);
  var onSegmentFail = useCallback(function () {
    setSegment(undefined);
  }, []);
  var onSegmentConnect = function onSegmentConnect(input, output) {
    var nextLinks = [].concat(_toConsumableArray(schema.links || []), [{
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
  return React.createElement(DiagramCanvas, _extends({
    portRefs: portRefs,
    nodeRefs: nodeRefs,
    pan: pan,
    scale: scale
  }, rest), React.createElement(NodesCanvas, {
    nodes: schema.nodes,
    onChange: onNodesChange,
    onNodeRegister: onNodeRegister,
    onPortRegister: onPortRegister,
    onNodeRemove: onNodeRemove,
    onDragNewSegment: onDragNewSegment,
    onSegmentFail: onSegmentFail,
    onSegmentConnect: onSegmentConnect
  }), React.createElement(LinksCanvas, {
    nodes: schema.nodes,
    links: schema.links,
    segment: segment,
    onChange: onLinkDelete
  }));
};
Diagram.propTypes = {
  schema: SchemaType,
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

export { Diagram$1 as default };
