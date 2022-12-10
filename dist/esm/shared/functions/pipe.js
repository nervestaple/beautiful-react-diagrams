/* beautiful-react-diagrams version: 0.6.0 */
var pipe = function pipe() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }
  return function (x) {
    return fns.reduce(function (y, f) {
      return f(y);
    }, x);
  };
};

export { pipe as default };
