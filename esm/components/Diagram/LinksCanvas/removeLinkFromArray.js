/* beautiful-react-diagrams version: 0.6.0 */
import isEqual from 'lodash.isequal';

var removeLinkFromArray = function removeLinkFromArray(link, links) {
  return links.filter(function (item) {
    return !isEqual(item, link);
  });
};

export { removeLinkFromArray as default };
