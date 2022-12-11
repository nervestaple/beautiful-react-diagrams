/* beautiful-react-diagrams version: 0.6.0 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var findIndex = require('lodash.findindex');
var isEqual = require('lodash.isequal');
var actionTypes = require('./actionTypes.js');
var getNodePortsId = require('../../shared/functions/getNodePortsId.js');

var schemaReducer = function schemaReducer(state, action) {
  switch (action.type) {
    case actionTypes.ON_CHANGE:
      return {
        nodes: action.payload.nodes || state.nodes || [],
        links: action.payload.links || state.links || []
      };
    case actionTypes.ON_NODE_ADD:
      if (state.nodes) {
        state.nodes.push(action.payload.node);
      }
      return {
        nodes: state.nodes || [],
        links: state.links || []
      };
    case actionTypes.ON_NODE_REMOVE:
      {
        var nextLinks = state.links || [];
        if (state.nodes) {
          var index = findIndex(state.nodes, ['id', action.payload.nodeId]);
          var inputPorts = getNodePortsId.default(state.nodes[index], 'inputs');
          var outputPorts = getNodePortsId.default(state.nodes[index], 'outputs');
          nextLinks = nextLinks.filter(function (link) {
            return !inputPorts.includes(link.input) && !outputPorts.includes(link.output);
          });
          state.nodes.splice(index, 1);
        }
        return {
          nodes: state.nodes || [],
          links: nextLinks
        };
      }
    case actionTypes.ON_CONNECT:
      if (state.links) {
        state.links.push(action.payload.link);
      }
      return {
        nodes: state.nodes || [],
        links: state.links || []
      };
    case actionTypes.ON_DISCONNECT:
      return {
        nodes: state.nodes || [],
        links: state.links.filter(function (link) {
          return !isEqual(link, action.payload.link);
        }) || []
      };
    default:
      return state;
  }
};

exports.default = schemaReducer;
