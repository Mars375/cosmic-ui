import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'destructive';

const styles: Record<BadgeVariant, string> = {
  default: 'bg-muted text-muted-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  success: 'bg-green-500 text-white dark:bg-green-600 dark:text-white',
  warning: 'bg-yellow-500 text-black dark:bg-yellow-600 dark:text-black',
  destructive: 'bg-destructive text-destructive-foreground',
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
