import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'destructive';

const styles: Record<BadgeVariant, string> = {
  default: 'bg-white/10 text-white',
  secondary: 'bg-cosmic-secondary text-black',
  success: 'bg-emerald-600 text-white',
  warning: 'bg-amber-600 text-black',
  destructive: 'bg-red-600 text-white',
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
  return (
    <span
      className={twMerge(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        styles[variant],
        className,
      )}
      {...props}
    />
  );
};
