import * as React from 'react';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
}

export const Spinner = ({ size = 20, color = 'currentColor', ...props }: SpinnerProps) => {
  const border = Math.max(2, Math.round(size / 10));
  return (
    <div
      role="status"
      aria-label="Loading"
      style={{
        width: size,
        height: size,
        borderWidth: border,
        borderColor: `${color}33`,
        borderTopColor: color,
      }}
      className="inline-block animate-spin rounded-full border-solid border-t-current"
      {...props}
    />
  );
};
