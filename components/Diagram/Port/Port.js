/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var PropTypes = require('prop-types');
var useDrag = require('../../../shared/internal_hooks/useDrag.js');
var useCanvas = require('../../../shared/internal_hooks/useCanvas.js');
var getRelativePoint = require('../../../shared/functions/getRelativePoint.js');

var _excluded = ["id", "canLink", "alignment", "onDragNewSegment", "onSegmentFail", "onSegmentConnect", "onMount", "type"];
var Port = function Port(props) {
  var id = props.id,
    canLink = props.canLink,
    alignment = props.alignment,
    onDragNewSegment = props.onDragNewSegment,
    onSegmentFail = props.onSegmentFail,
    onSegmentConnect = props.onSegmentConnect,
    onMount = props.onMount,
    type = props.type,
    rest = _rollupPluginBabelHelpers.objectWithoutProperties(props, _excluded);
  var _useCanvas = useCanvas.default(),
    canvas = _useCanvas.canvas,
    panVal = _useCanvas.panVal;
  var _useDrag = useDrag.default(),
    ref = _useDrag.ref,
    onDrag = _useDrag.onDrag,
    onDragEnd = _useDrag.onDragEnd;
  onDrag(function (event, info) {
    if (onDragNewSegment) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      var from = getRelativePoint.default(info.start, [canvas.x + panVal.x, canvas.y + panVal.y]);
      var to = getRelativePoint.default([event.clientX, event.clientY], [canvas.x + panVal.x, canvas.y + panVal.y]);
      onDragNewSegment(id, from, to, alignment);
    }
  });
  onDragEnd(function (event) {
    var targetPort = event.target.getAttribute('data-port-id');
    if (targetPort && event.target !== ref.current && canLink(id, targetPort, type) && onSegmentConnect) {
      var args = type === 'input' ? [id, targetPort, type] : [targetPort, id, type];
      onSegmentConnect.apply(void 0, args);
      return;
    }
    onSegmentFail && onSegmentFail(id, type);
  });
  React.useEffect(function () {
    if (ref.current && onMount) {
      onMount(id, ref.current);
    }
  }, [ref.current]);
  return React.createElement("div", _rollupPluginBabelHelpers.extends({
    className: "bi bi-diagram-port",
    "data-port-id": id,
    ref: ref
  }, rest));
};
Port.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.symbol]).isRequired,
  type: PropTypes.oneOf(['input', 'output']).isRequired,
  onDragNewSegment: PropTypes.func,
  onSegmentFail: PropTypes.func,
  onSegmentConnect: PropTypes.func,
  canLink: PropTypes.func,
  onMount: PropTypes.func,
  alignment: PropTypes.oneOf(['right', 'left', 'top', 'bottom'])
};
Port.defaultProps = {
  onDragNewSegment: undefined,
  onSegmentFail: undefined,
  onSegmentConnect: undefined,
  canLink: function canLink() {
    return true;
  },
  onMount: undefined,
  alignment: undefined
};
var Port$1 = React.memo(Port);

exports.default = Port$1;
