import * as React from 'react';
import { Sparkline } from './sparkline';

export interface LineSeries<T> {
  dataKey: keyof T | string;
  color?: string;
  name?: string;
}

export interface LineChartProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  data: T[];
  xKey: keyof T | string;
  series: Array<LineSeries<T>>;
  height?: number;
  showDots?: boolean;
  showXLabels?: boolean;
  xLabelFormatter?: (value: unknown, index: number) => string;
  showYLabels?: boolean;
  yLabelFormatter?: (value: number, index: number) => string;
  yTicks?: number;
}

export function LineChart<T extends Record<string, unknown>>({
  data,
  xKey, // kept for future axis/tooltip usage
  series,
  height = 180,
  showDots = true,
  showXLabels = false,
  xLabelFormatter,
  showYLabels = false,
  yLabelFormatter,
  yTicks = 4,
  className,
  ...props
}: LineChartProps<T>) {
  // Normalize each series to an array of numbers for Sparkline
  const numericSeries: Array<{ color: string; values: number[]; name?: string }> = React.useMemo(
    () =>
      series.map((s, idx) => ({
        color: s.color || ['#6366f1', '#22c55e', '#eab308', '#ef4444'][idx % 4],
        name: s.name,
        values: data.map((row) => {
          const raw = row[s.dataKey as keyof T] as unknown;
          const num = typeof raw === 'number' ? raw : Number(raw as unknown as number);
          return Number.isFinite(num) ? (num as number) : 0;
        }),
      })),
    [series, data],
  );

  // Domain Y pour les labels
  const [yMin, yMax] = React.useMemo(() => {
    const all = numericSeries.flatMap((s) => s.values);
    let min = Math.min(...all);
    let max = Math.max(...all);
    if (!isFinite(min) || !isFinite(max)) {
      min = 0;
      max = 1;
    }
    if (min === max) {
      max = min + 1;
    }
    return [min, max];
  }, [numericSeries]);

  // Mesure la largeur du conteneur pour un tracé responsive
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = React.useState<number>(0);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const box = entry.contentRect;
        setWidth(Math.max(1, Math.floor(box.width)));
      }
    });
    obs.observe(el);
    setWidth(el.clientWidth);
    return () => obs.disconnect();
  }, []);

  // Width is responsive; stack multiple sparklines absolutely
  const axisLeft = showYLabels ? 36 : 0; // espace pour les labels Y
  const plotWidth = Math.max(1, width - axisLeft);
  return (
    <div className={`relative ${className || ''}`} {...props}>
      <div className="relative" style={{ height }} ref={containerRef}>
        <div className="relative h-full" style={{ marginLeft: axisLeft }}>
          {numericSeries.map((s, i) => (
            <Sparkline
              key={i}
              data={s.values}
              stroke={s.color}
              strokeWidth={2}
              showDots={showDots}
              className="absolute inset-0"
              width={plotWidth}
              height={height}
            />
          ))}
          {showYLabels && (
            <div
              className="pointer-events-none absolute top-0 left-0 bottom-0"
              style={{ width: axisLeft }}
            >
              {Array.from({ length: Math.max(1, yTicks) + 1 }).map((_, i) => {
                const ratio = i / Math.max(1, yTicks);
                const value = yMin + (1 - ratio) * (yMax - yMin);
                const label = yLabelFormatter
                  ? yLabelFormatter(value, i)
                  : String(Math.round(value));
                const padding = 4;
                const y = padding + ratio * (height - 2 * padding);
                return (
                  <span
                    key={`yl-${i}`}
                    className="absolute left-0 -translate-y-1/2 text-[10px] text-muted-foreground"
                    style={{ top: y }}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {showXLabels && width > 0 && (
        <div className="mt-2 relative h-5 text-[10px] text-muted-foreground">
          {data.map((row, idx) => {
            const raw = row[xKey as keyof T];
            const label = xLabelFormatter ? xLabelFormatter(raw, idx) : String(raw);
            const count = Math.max(1, data.length - 1);
            const x = (count === 0 ? 0 : (idx / count) * plotWidth) + axisLeft;
            return (
              <span
                key={`xl-${idx}`}
                className="absolute top-0 -translate-x-1/2"
                style={{ left: x }}
              >
                {label}
              </span>
            );
          })}
        </div>
      )}
      {/* Simple legend */}
      {numericSeries.length > 1 && (
        <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
          {numericSeries.map((s, i) => (
            <div className="flex items-center gap-2" key={`leg-${i}`}>
              <span className="inline-block h-2 w-2 rounded-full" style={{ background: s.color }} />
              <span>{s.name || `Série ${i + 1}`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
