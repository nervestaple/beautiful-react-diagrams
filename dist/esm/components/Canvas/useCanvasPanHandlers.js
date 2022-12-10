/* beautiful-react-diagrams version: 0.6.0 */
import { objectSpread2 as _objectSpread2 } from '../../_virtual/_rollupPluginBabelHelpers.js';
import { useRef, useCallback } from 'react';
import { Events, isTouch } from '../../shared/Constants.js';

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
var getEventPoint = isTouch ? getTouchEventPoint : getMouseEventPoint;
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
  var lastPointRef = useRef(pan);
  var deltaRef = useRef({
    x: null,
    y: null
  });
  var performPan = useCallback(function (event) {
    if (onPanChange) {
      var lastPoint = _objectSpread2({}, lastPointRef.current);
      var point = getEventPoint(event);
      lastPointRef.current = point;
      onPanChange(function (_ref2) {
        var x = _ref2.x,
          y = _ref2.y;
        var delta = calculateDelta(lastPoint, point);
        deltaRef.current = _objectSpread2({}, delta);
        return {
          x: x + delta.x,
          y: y + delta.y
        };
      });
    }
  }, []);
  var performInertia = useCallback(function () {
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
  var endPan = useCallback(function () {
    if (onPanChange) {
      document.removeEventListener(Events.MOUSE_MOVE, performPan);
      document.removeEventListener(Events.MOUSE_END, endPan);
      if (inertia) {
        requestAnimationFrame(performInertia);
      }
    }
  }, [performPan, inertia, onPanChange]);
  var onPanStart = useCallback(function (event) {
    if (onPanChange) {
      document.addEventListener(Events.MOUSE_MOVE, performPan);
      document.addEventListener(Events.MOUSE_END, endPan);
      lastPointRef.current = getEventPoint(event);
    }
  }, [onPanChange, performPan, endPan]);
  return onPanStart;
};

export { useCanvasPanHandlers as default };
