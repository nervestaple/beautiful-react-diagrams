/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var isEqual = require('lodash.isequal');

var removeLinkFromArray = function removeLinkFromArray(link, links) {
  return links.filter(function (item) {
    return !isEqual(item, link);
  });
};

exports.default = removeLinkFromArray;
