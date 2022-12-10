/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var PropTypes = require('prop-types');
var classNames = require('classnames');
var getDiagramNodeStyle = require('./getDiagramNodeStyle.js');
var useContextRegistration = require('../../../shared/internal_hooks/useContextRegistration.js');
var Types = require('../../../shared/Types.js');
var portGenerator = require('./portGenerator.js');
var useDrag = require('../../../shared/internal_hooks/useDrag.js');
var useNodeUnregistration = require('../../../shared/internal_hooks/useNodeUnregistration.js');

var DiagramNode = function DiagramNode(props) {
  var id = props.id,
    content = props.content,
    coordinates = props.coordinates,
    type = props.type,
    inputs = props.inputs,
    outputs = props.outputs,
    data = props.data,
    onPositionChange = props.onPositionChange,
    onPortRegister = props.onPortRegister,
    onNodeRemove = props.onNodeRemove,
    onDragNewSegment = props.onDragNewSegment,
    onMount = props.onMount,
    onSegmentFail = props.onSegmentFail,
    onSegmentConnect = props.onSegmentConnect,
    render = props.render,
    className = props.className,
    disableDrag = props.disableDrag;
  var registerPort = useContextRegistration.usePortRegistration(inputs, outputs, onPortRegister);
  var _useDrag = useDrag.default({
      throttleBy: 14
    }),
    ref = _useDrag.ref,
    onDragStart = _useDrag.onDragStart,
    onDrag = _useDrag.onDrag;
  var dragStartPoint = React.useRef(coordinates);
  if (!disableDrag) {
    onDragStart(function (event) {
      dragStartPoint.current = coordinates;
      event.stopPropagation();
    });
    onDrag(function (event, info) {
      if (onPositionChange) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        var nextCoords = [dragStartPoint.current[0] - info.offset[0], dragStartPoint.current[1] - info.offset[1]];
        onPositionChange(id, nextCoords);
      }
    });
  }
  useNodeUnregistration.default(onNodeRemove, inputs, outputs, id);
  useContextRegistration.useNodeRegistration(ref, onMount, id);
  var classList = React.useMemo(function () {
    return classNames('bi bi-diagram-node', _rollupPluginBabelHelpers.defineProperty({}, "bi-diagram-node-".concat(type), !!type && !render), className);
  }, [type, className]);
  var options = {
    registerPort: registerPort,
    onDragNewSegment: onDragNewSegment,
    onSegmentFail: onSegmentFail,
    onSegmentConnect: onSegmentConnect
  };
  var InputPorts = inputs.map(portGenerator.default(options, 'input'));
  var OutputPorts = outputs.map(portGenerator.default(options, 'output'));
  var customRenderProps = {
    id: id,
    render: render,
    content: content,
    type: type,
    inputs: InputPorts,
    outputs: OutputPorts,
    data: data,
    className: className
  };
  return React.createElement("div", {
    className: classList,
    ref: ref,
    style: getDiagramNodeStyle.default(coordinates, disableDrag)
  }, render && typeof render === 'function' && render(customRenderProps), !render && React.createElement(React.Fragment, null, content, React.createElement("div", {
    className: "bi-port-wrapper"
  }, React.createElement("div", {
    className: "bi-input-ports"
  }, InputPorts), React.createElement("div", {
    className: "bi-output-ports"
  }, OutputPorts))));
};
DiagramNode.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  coordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
  content: PropTypes.oneOfType([PropTypes.elementType, PropTypes.node]),
  inputs: PropTypes.arrayOf(Types.PortType),
  outputs: PropTypes.arrayOf(Types.PortType),
  type: PropTypes.oneOf(['default']),
  data: PropTypes.shape({}),
  render: PropTypes.func,
  onPositionChange: PropTypes.func,
  onMount: PropTypes.func,
  onPortRegister: PropTypes.func,
  onNodeRemove: PropTypes.func,
  onDragNewSegment: PropTypes.func,
  onSegmentFail: PropTypes.func,
  onSegmentConnect: PropTypes.func,
  className: PropTypes.string,
  disableDrag: PropTypes.bool
};
DiagramNode.defaultProps = {
  type: 'default',
  content: '',
  inputs: [],
  outputs: [],
  data: {},
  onPositionChange: undefined,
  render: undefined,
  onMount: undefined,
  onPortRegister: undefined,
  onNodeRemove: undefined,
  onDragNewSegment: undefined,
  onSegmentFail: undefined,
  onSegmentConnect: undefined,
  className: '',
  disableDrag: false
};
var DiagramNode$1 = React.memo(DiagramNode);

exports.default = DiagramNode$1;
