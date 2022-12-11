/* beautiful-react-diagrams version: 0.6.0 */
import { objectWithoutProperties as _objectWithoutProperties, slicedToArray as _slicedToArray, extends as _extends } from '../../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useState, useRef, useEffect } from 'react';
import { useWindowScroll, useWindowResize } from 'beautiful-react-hooks';
import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import DiagramContext from '../../../Context/DiagramContext.js';

var _excluded = ["children", "portRefs", "nodeRefs", "pan", "scale", "className"];
var DiagramCanvas = function DiagramCanvas(props) {
  var children = props.children,
    portRefs = props.portRefs,
    nodeRefs = props.nodeRefs,
    pan = props.pan,
    scale = props.scale,
    className = props.className,
    rest = _objectWithoutProperties(props, _excluded);
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    bbox = _useState2[0],
    setBoundingBox = _useState2[1];
  var canvasRef = useRef();
  var classList = classNames('bi bi-diagram', className);
  var calculateBBox = function calculateBBox() {
    if (canvasRef.current) {
      var nextBBox = canvasRef.current.getBoundingClientRect();
      if (!isEqual(nextBBox, bbox)) {
        setBoundingBox(nextBBox);
      }
    }
  };
  useEffect(calculateBBox, [canvasRef.current]);
  useWindowScroll(calculateBBox);
  useWindowResize(calculateBBox);
  return React.createElement("div", _extends({
    className: classList,
    ref: canvasRef
  }, rest), React.createElement("div", {
    className: "bi-diagram-inners"
  }, React.createElement(DiagramContext.Provider, {
    value: {
      canvas: bbox,
      ports: portRefs,
      nodes: nodeRefs,
      panVal: pan,
      scaleVal: scale
    }
  }, children)));
};
DiagramCanvas.propTypes = {
  portRefs: PropTypes.shape({}),
  nodeRefs: PropTypes.shape({}),
  className: PropTypes.string,
  pan: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  }),
  scale: PropTypes.number
};
DiagramCanvas.defaultProps = {
  portRefs: {},
  nodeRefs: {},
  className: '',
  pan: {
    x: 0,
    y: 0
  },
  scale: 1
};
var DiagramCanvas$1 = React.memo(DiagramCanvas);

export { DiagramCanvas$1 as default };
