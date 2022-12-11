/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('../../_virtual/_rollupPluginBabelHelpers.js');
var React = require('react');
var Constants = require('../../shared/Constants.js');

var friction = 0.8;
var getMouseEventPoint = function getMouseEventPoint(e) {
  return {
    x: e.pageX,
    y: e.pageY
  };
};
var getTouchEventPoint = function getTouchEventPoint(e) {
  return getMouseEventPoint(e.changedTouches[0]);
};
var getEventPoint = Constants.isTouch ? getTouchEventPoint : getMouseEventPoint;
var calculateDelta = function calculateDelta(current, last) {
  return {
    x: last.x - current.x,
    y: last.y - current.y
  };
};
var applyInertia = function applyInertia(value) {
  return Math.abs(value) >= 0.5 ? Math.trunc(value * friction) : 0;
};
var useCanvasPanHandlers = function useCanvasPanHandlers(_ref) {
  var pan = _ref.pan,
    onPanChange = _ref.onPanChange,
    inertia = _ref.inertia;
  var lastPointRef = React.useRef(pan);
  var deltaRef = React.useRef({
    x: null,
    y: null
  });
  var performPan = React.useCallback(function (event) {
    if (onPanChange) {
      var lastPoint = _rollupPluginBabelHelpers.objectSpread2({}, lastPointRef.current);
      var point = getEventPoint(event);
      lastPointRef.current = point;
      onPanChange(function (_ref2) {
        var x = _ref2.x,
          y = _ref2.y;
        var delta = calculateDelta(lastPoint, point);
        deltaRef.current = _rollupPluginBabelHelpers.objectSpread2({}, delta);
        return {
          x: x + delta.x,
          y: y + delta.y
        };
      });
    }
  }, []);
  var performInertia = React.useCallback(function () {
    if (inertia) {
      onPanChange(function (_ref3) {
        var x = _ref3.x,
          y = _ref3.y;
        return {
          x: x + deltaRef.current.x,
          y: y + deltaRef.current.y
        };
      });
      deltaRef.current.x = applyInertia(deltaRef.current.x);
      deltaRef.current.y = applyInertia(deltaRef.current.y);
      if (Math.abs(deltaRef.current.x) > 0 || Math.abs(deltaRef.current.y) > 0) {
        requestAnimationFrame(performInertia);
      }
    }
  }, [inertia, deltaRef.current.x, deltaRef.current.y]);
  var endPan = React.useCallback(function () {
    if (onPanChange) {
      document.removeEventListener(Constants.Events.MOUSE_MOVE, performPan);
      document.removeEventListener(Constants.Events.MOUSE_END, endPan);
      if (inertia) {
        requestAnimationFrame(performInertia);
      }
    }
  }, [performPan, inertia, onPanChange]);
  var onPanStart = React.useCallback(function (event) {
    if (onPanChange) {
      document.addEventListener(Constants.Events.MOUSE_MOVE, performPan);
      document.addEventListener(Constants.Events.MOUSE_END, endPan);
      lastPointRef.current = getEventPoint(event);
    }
  }, [onPanChange, performPan, endPan]);
  return onPanStart;
};

exports.default = useCanvasPanHandlers;
