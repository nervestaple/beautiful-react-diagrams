/* beautiful-react-diagrams version: 0.6.0 */
import { slicedToArray as _slicedToArray } from '../../_virtual/_rollupPluginBabelHelpers.js';
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

var parallaxRatio = 1.25;
var calcCoordinates = function calcCoordinates(x, y) {
  return [x * parallaxRatio, y * parallaxRatio];
};
var calcTransformation = function calcTransformation(x, y, scale) {
  return "scale(".concat(scale, ") translate(").concat(x, ", ").concat(y, ")");
};
var BackgroundGrid = function BackgroundGrid(_ref) {
  var translateX = _ref.translateX,
    translateY = _ref.translateY,
    scale = _ref.scale,
    svgPatternColor = _ref.svgPatternColor,
    svgPatternOpacity = _ref.svgPatternOpacity;
  var _useMemo = useMemo(function () {
      return calcCoordinates(translateX, translateY);
    }, [translateX, translateY]),
    _useMemo2 = _slicedToArray(_useMemo, 2),
    x = _useMemo2[0],
    y = _useMemo2[1];
  var transformation = useMemo(function () {
    return calcTransformation(x, y, scale);
  }, [x, y, scale]);
  return React.createElement("svg", {
    width: "100%",
    height: "100%",
    xmlns: "http://www.w3.org/2000/svg"
  }, React.createElement("defs", null, React.createElement("pattern", {
    id: "bg-grid",
    width: "30",
    height: "30",
    patternUnits: "userSpaceOnUse",
    patternTransform: transformation
  }, React.createElement("g", {
    opacity: svgPatternOpacity,
    fill: svgPatternColor
  }, React.createElement("polygon", {
    points: "29.6,0 27,0 27,0.4 29.6,0.4 29.6,3 30,3 30,0.4 30,0 "
  }), React.createElement("polygon", {
    points: "0,0 0,0.4 0,3 0.4,3 0.4,0.4 3,0.4 3,0 0.4,0 "
  }), React.createElement("polygon", {
    points: "30,30 30,29.6 30,27 29.6,27 29.6,29.6 27,29.6 27,30 29.6,30 "
  }), React.createElement("polygon", {
    points: "0.4,30 3,30 3,29.6 0.4,29.6 0.4,27 0,27 0,29.6 0,30 "
  })))), React.createElement("rect", {
    width: "100%",
    height: "100%",
    fill: "url(#bg-grid)"
  }));
};
BackgroundGrid.propTypes = {
  svgPatternColor: PropTypes.string,
  svgPatternOpacity: PropTypes.number,
  translateX: PropTypes.number,
  translateY: PropTypes.number,
  scale: PropTypes.number
};
BackgroundGrid.defaultProps = {
  svgPatternColor: 'black',
  svgPatternOpacity: 0.5,
  translateX: 0,
  translateY: 0,
  scale: 1
};
var BackgroundGrid$1 = React.memo(BackgroundGrid);

export { BackgroundGrid$1 as default };
