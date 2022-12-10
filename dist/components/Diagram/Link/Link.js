/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var PropTypes = require('prop-types');
var classNames = require('classnames');
var Types = require('../../../shared/Types.js');
var usePortRefs = require('../../../shared/internal_hooks/usePortRefs.js');
var useCanvas = require('../../../shared/internal_hooks/useCanvas.js');
var getEntityCoordinates = require('./getEntityCoordinates.js');
var makeSvgPath = require('../../../shared/functions/makeSvgPath.js');
var getPathMidpoint = require('../../../shared/functions/getPathMidpoint.js');
var useNodeRefs = require('../../../shared/internal_hooks/useNodeRefs.js');
var LinkLabel = require('./LinkLabel.js');

var useContextRefs = function useContextRefs() {
  var _useCanvas = useCanvas.default(),
    canvas = _useCanvas.canvas,
    panVal = _useCanvas.panVal,
    scaleVal = _useCanvas.scaleVal;
  var portRefs = usePortRefs.default();
  var nodeRefs = useNodeRefs.default();
  return {
    canvas: canvas,
    panVal: panVal,
    scaleVal: scaleVal,
    nodeRefs: nodeRefs,
    portRefs: portRefs
  };
};
var Link = function Link(props) {
  var input = props.input,
    output = props.output,
    link = props.link,
    onDelete = props.onDelete;
  var pathRef = React.useRef();
  var _useState = React.useState(),
    _useState2 = _rollupPluginBabelHelpers.slicedToArray(_useState, 2),
    labelPosition = _useState2[0],
    setLabelPosition = _useState2[1];
  var _useContextRefs = useContextRefs(),
    canvas = _useContextRefs.canvas,
    panVal = _useContextRefs.panVal,
    scaleVal = _useContextRefs.scaleVal,
    portRefs = _useContextRefs.portRefs,
    nodeRefs = _useContextRefs.nodeRefs;
  var inputPoint = React.useMemo(function () {
    return getEntityCoordinates.default(input, portRefs, nodeRefs, canvas, panVal);
  }, [input, portRefs, nodeRefs, canvas, panVal]);
  var classList = React.useMemo(function () {
    return classNames('bi-diagram-link', {
      'readonly-link': link.readonly
    }, link.className);
  }, [link.readonly, link.className]);
  var outputPoint = React.useMemo(function () {
    return getEntityCoordinates.default(output, portRefs, nodeRefs, canvas, panVal);
  }, [output, portRefs, nodeRefs, canvas, panVal]);
  var pathOptions = {
    type: input.type === 'port' || output.type === 'port' ? 'bezier' : 'curve',
    inputAlignment: input.entity.alignment || null,
    outputAlignment: output.entity.alignment || null
  };
  var path = React.useMemo(function () {
    return makeSvgPath.default(inputPoint, outputPoint, pathOptions);
  }, [inputPoint, outputPoint]);
  React.useEffect(function () {
    if (link.label && inputPoint && outputPoint && pathRef.current) {
      var pos = getPathMidpoint.default(pathRef.current);
      setLabelPosition(pos);
    }
  }, [pathRef.current, link.label, inputPoint, outputPoint]);
  var onDoubleClick = React.useCallback(function () {
    if (onDelete && !link.readonly) {
      onDelete(link);
    }
  }, [link.readonly, onDelete]);
  var nextScale = Object.keys(portRefs).length > 0 ? 1 / scaleVal : 1;
  return React.createElement("g", {
    className: classList,
    style: {
      transform: "scale(".concat(nextScale, ")")
    }
  }, !link.readonly && React.createElement("path", {
    d: path,
    className: "bi-link-ghost",
    onDoubleClick: onDoubleClick
  }), React.createElement("path", {
    d: path,
    ref: pathRef,
    className: "bi-link-path",
    onDoubleClick: onDoubleClick
  }), link.label && labelPosition && React.createElement(LinkLabel.default, {
    position: labelPosition,
    label: link.label
  }));
};
var InvolvedEntity = PropTypes.exact({
  type: PropTypes.oneOf(['node', 'port']),
  entity: PropTypes.oneOfType([Types.PortType, Types.NodeType])
});
Link.propTypes = {
  link: Types.LinkType.isRequired,
  input: InvolvedEntity.isRequired,
  output: InvolvedEntity.isRequired,
  onDelete: PropTypes.func
};
Link.defaultProps = {
  onDelete: undefined
};
var DiagramLink = React.memo(Link);

exports.default = DiagramLink;
