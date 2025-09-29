import * as React from 'react';

export type PieDatum = {
  name: string;
  value: number;
  color?: string;
};

export interface PieChartProps extends React.SVGAttributes<SVGSVGElement> {
  data: PieDatum[];
  height?: number;
  innerRadius?: number;
  appearance?: 'dark' | 'light';
}

export function PieChart({
  data,
  height = 160,
  innerRadius = 40,
  appearance = 'dark',
  className,
  ...props
}: PieChartProps) {
  const total = Math.max(
    1,
    data.reduce((s, d) => s + d.value, 0),
  );
  const radius = Math.min(120, height / 2);
  const cx = radius + 4;
  const cy = radius + 4;
  let startAngle = -90; // start at top

  const segments = data.map((d, i) => {
    const angle = (d.value / total) * 360;
    const endAngle = startAngle + angle;
    const largeArc = angle > 180 ? 1 : 0;
    const x1 = cx + radius * Math.cos((Math.PI * startAngle) / 180);
    const y1 = cy + radius * Math.sin((Math.PI * startAngle) / 180);
    const x2 = cx + radius * Math.cos((Math.PI * endAngle) / 180);
    const y2 = cy + radius * Math.sin((Math.PI * endAngle) / 180);
    const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    startAngle = endAngle;
    return { path, color: d.color || ['#6366f1', '#22c55e', '#eab308', '#ef4444'][i % 4] };
  });

  const size = (radius + 4) * 2;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} {...props}>
      <g>
        {segments.map((s, i) => (
          <path key={i} d={s.path} fill={s.color} opacity={0.9} />
        ))}
        {innerRadius > 0 && (
          <circle
            cx={cx}
            cy={cy}
            r={innerRadius}
            fill={appearance === 'light' ? 'hsl(var(--background))' : 'hsl(var(--background))'}
          />
        )}
      </g>
    </svg>
  );
}
