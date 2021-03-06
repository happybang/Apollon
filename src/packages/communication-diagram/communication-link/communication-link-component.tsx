import React, { SFC } from 'react';
import { CommunicationMessage } from '..';
import { Point } from '../../../utils/geometry/point';
import { CommunicationLink } from './communication-link';

export const CommunicationLinkComponent: SFC<Props> = ({ element }) => {
  const sources: CommunicationMessage[] = element.messages.filter(message => message.direction === 'source');
  const targets: CommunicationMessage[] = element.messages.filter(message => message.direction === 'target');

  let position = { x: 0, y: 0 };
  let direction: 'v' | 'h' = 'v';
  const path = element.path.map(point => new Point(point.x, point.y));
  let distance =
    path.reduce((length, point, i, points) => (i + 1 < points.length ? length + points[i + 1].subtract(point).length : length), 0) / 2;

  for (let index = 0; index < path.length - 1; index++) {
    const vector = path[index + 1].subtract(path[index]);
    if (vector.length > distance) {
      const norm = vector.normalize();
      direction = Math.abs(norm.x) > Math.abs(norm.y) ? 'h' : 'v';
      position = path[index].add(norm.scale(distance));
      break;
    }
    distance -= vector.length;
  }

  return (
    <g>
      {direction === 'v' ? (
        <>
          <text x={position.x} y={position.y} dx={5} fontSize="85%" dominantBaseline="middle" textAnchor="start">
            <tspan fontWeight="bold" fontSize="120%">
              {targets.length ? '↓' : ''}
            </tspan>
            {targets.map((target, i) => (
              <tspan key={i} x={position.x + 20} dy={i === 0 ? undefined : '1.2em'}>
                {target.name}
              </tspan>
            ))}
          </text>
          <text x={position.x} y={position.y} dx={-5} fontSize="85%" dominantBaseline="middle" textAnchor="end">
            <tspan fontWeight="bold" fontSize="120%">
              {sources.length ? '↑' : ''}
            </tspan>
            {sources.map((source, i) => (
              <tspan key={i} x={position.x - 20} dy={i === 0 ? undefined : '1.2em'}>
                {source.name}
              </tspan>
            ))}
          </text>
        </>
      ) : (
        <>
          <text x={position.x} y={position.y} dy={-6} fontSize="85%" textAnchor="middle">
            <tspan fontWeight="bold" fontSize="120%">
              {targets.length ? '⟶' : ''}
            </tspan>
            {targets.map((target, i) => (
              <tspan key={i} x={position.x} dy="-1.2em">
                {target.name}
              </tspan>
            ))}
          </text>
          <text x={position.x} y={position.y} dy={18} fontSize="85%" textAnchor="middle">
            <tspan fontWeight="bold" fontSize="120%">
              {sources.length ? '⟵' : ''}
            </tspan>
            {sources.map((source, i) => (
              <tspan key={i} x={position.x} dy="1.2em">
                {source.name}
              </tspan>
            ))}
          </text>
        </>
      )}
      <polyline points={element.path.map(point => `${point.x} ${point.y}`).join(',')} stroke="black" fill="none" strokeWidth={1} />
    </g>
  );
};

interface Props {
  element: CommunicationLink;
}
