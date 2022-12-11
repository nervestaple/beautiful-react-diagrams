/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

var isTouch = ('ontouchstart' in window);
var noop = function noop() {
  return undefined;
};
var Events = Object.freeze({
  MOUSE_START: isTouch ? 'touchstart' : 'mousedown',
  MOUSE_MOVE: isTouch ? 'touchmove' : 'mousemove',
  MOUSE_END: isTouch ? 'touchend' : 'mouseup',
  DOUBLE_CLICK: 'dblclick',
  WHEEL: 'wheel'
});
var stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};

exports.Events = Events;
exports.isTouch = isTouch;
exports.noop = noop;
exports.stopPropagation = stopPropagation;
