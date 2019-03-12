import Boundary from '../geo/Boundary';

interface Port {
  element: string;
  location: 'N' | 'E' | 'S' | 'W';
}

class Port {
  static position(
    bounds: Boundary,
    location: Port['location']
  ): { point: { x: number; y: number }; offset: { x: number; y: number } } {
    let { x, y, width, height } = bounds;
    const offset = 40;
    switch (location) {
      case 'N':
        return {
          point: { x: x + width / 2, y },
          offset: { x: x + width / 2, y: y - offset },
        };
      case 'E':
        return {
          point: { x: x + width, y: y + height / 2 },
          offset: { x: x + width + offset, y: y + height / 2 },
        };
      case 'S':
        return {
          point: { x: x + width / 2, y: y + height },
          offset: { x: x + width / 2, y: y + height + offset },
        };
      case 'W':
        return {
          point: { x, y: y + height / 2 },
          offset: { x: x - offset, y: y + height / 2 },
        };
    }
  }
}

export default Port;
