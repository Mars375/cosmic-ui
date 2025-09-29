import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0..100
  ariaLabel?: string;
}

export const ProgressBar = ({
  className,
  value,
  ariaLabel = 'Progress',
  ...props
}: ProgressBarProps) => {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div
      className={twMerge('h-2 w-full rounded-full bg-muted', className)}
      role="progressbar"
      aria-label={ariaLabel}
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      {...props}
    >
      <div className="h-full rounded-full bg-primary" style={{ width: `${clamped}%` }} />
    </div>
  );
};

ProgressBar.displayName = 'ProgressBar';
