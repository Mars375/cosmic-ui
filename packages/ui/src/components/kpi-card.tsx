import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export type DeltaDirection = 'up' | 'down' | 'neutral';

export interface KpiCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  delta?: number; // signed percentage or absolute value
  deltaDirection?: DeltaDirection;
  icon?: React.ReactNode;
  helperText?: string;
}

export const KpiCard = React.forwardRef<HTMLDivElement, KpiCardProps>(
  (
    { className, label, value, delta, deltaDirection = 'neutral', icon, helperText, ...props },
    ref,
  ) => {
    const deltaColor =
      deltaDirection === 'up'
        ? 'text-emerald-400'
        : deltaDirection === 'down'
          ? 'text-red-400'
          : 'text-white/70';
    const deltaPrefix = deltaDirection === 'up' ? '▲' : deltaDirection === 'down' ? '▼' : '•';
    const ariaDelta =
      delta != null
        ? `${deltaPrefix} ${Math.abs(delta)}${typeof delta === 'number' ? '%' : ''}`
        : undefined;

    return (
      <div ref={ref} className={twMerge('rounded-lg p-4 bg-card', className)} {...props}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {label}
            </div>
            <div className="text-2xl font-semibold leading-none">{value}</div>
          </div>
          {icon ? (
            <div aria-hidden className="inline-flex h-9 w-9 items-center justify-center rounded-md">
              {icon}
            </div>
          ) : null}
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          {delta != null ? (
            <div
              className={twMerge('inline-flex items-center gap-1 rounded px-2 py-0.5', deltaColor)}
              aria-label={`Variation ${ariaDelta}`}
            >
              <span aria-hidden>{deltaPrefix}</span>
              <span>{Math.abs(delta)}%</span>
            </div>
          ) : (
            <span />
          )}
          {helperText ? <div className="text-muted-foreground">{helperText}</div> : null}
        </div>
      </div>
    );
  },
);
KpiCard.displayName = 'KpiCard';

