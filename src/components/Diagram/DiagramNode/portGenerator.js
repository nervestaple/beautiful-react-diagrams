import React from 'react';
import Port from '../Port/Port';

const portGenerator = ({ registerPort, onDragNewSegment, onSegmentFail, onSegmentConnect }, type) => (port) => (
  <Port
    {...port}
    onMount={registerPort}
    onDragNewSegment={onDragNewSegment}
    onSegmentFail={onSegmentFail}
    onSegmentConnect={onSegmentConnect}
    type={type}
        // eslint-disable-next-line
        key={port.id}
  />
);

export default portGenerator;
