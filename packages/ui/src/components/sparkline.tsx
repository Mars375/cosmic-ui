import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface SparklineProps extends React.SVGAttributes<SVGSVGElement> {
  data: number[];
  width?: number; // px (optional, if provided we scale to this width)
  height?: number; // px
  stroke?: string;
  strokeWidth?: number;
  showDots?: boolean;
  dotRadius?: number;
  paddingX?: number; // inner horizontal padding
  paddingY?: number; // inner vertical padding
}

type Point = { x: number; y: number };

function normalizeData(
  values: number[],
  width: number,
  height: number,
  paddingX: number,
  paddingY: number,
): Point[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const count = values.length;
  const innerW = Math.max(1, width - paddingX * 2);
  const stepX = count > 1 ? innerW / (count - 1) : innerW;
  return values.map((v, i) => {
    const x = paddingX + i * stepX;
    // invert y for SVG (0 at top)
    const t = (v - min) / range;
    const y = paddingY + (1 - t) * (height - paddingY * 2);
    return { x, y };
  });
}

// Catmull-Rom to Bezier conversion for smooth path
function catmullRom2bezier(points: Point[]): string {
  if (points.length < 2) return '';
  if (points.length === 2) return `M ${points[0].x} ${points[0].y} L ${points[1].x} ${points[1].y}`;

  const d: string[] = [];
  d.push(`M ${points[0].x} ${points[0].y}`);
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d.push(`C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`);
  }
  return d.join(' ');
}

export const Sparkline = React.forwardRef<SVGSVGElement, SparklineProps>(
  (
    {
      data,
      width,
      height = 64,
      stroke = 'currentColor',
      strokeWidth = 2,
      showDots = false,
      dotRadius = 2,
      paddingX = 12,
      paddingY = 12,
      className,
      ...props
    },
    ref,
  ) => {
    const computedWidth = React.useMemo(() => {
      const fallback = (data.length - 1) * 50 || 50;
      return Math.max(1, Math.floor(width ?? fallback));
    }, [width, data.length]);
    const points = React.useMemo(
      () => normalizeData(data, computedWidth, height, paddingX, paddingY),
      [data, computedWidth, height, paddingX, paddingY],
    );
    const d = React.useMemo(() => catmullRom2bezier(points), [points]);

    return (
      <svg
        ref={ref}
        viewBox={`0 0 ${computedWidth} ${height}`}
        className={twMerge('w-full h-full', className)}
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        {...props}
      >
        <path
          d={d}
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        {showDots && (
          <g fill={stroke}>
            {points.map((p, idx) => (
              <circle cx={p.x} cy={p.y} r={dotRadius} key={idx} />
            ))}
          </g>
        )}
      </svg>
    );
  },
);

Sparkline.displayName = 'Sparkline';
