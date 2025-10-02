import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rounded?: 'sm' | 'md' | 'lg' | 'full';
}

const roundMap: Record<NonNullable<SkeletonProps['rounded']>, string> = {
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
};

export const Skeleton = ({ className, rounded = 'md', ...props }: SkeletonProps) => {
  return (
    <div
      aria-hidden
      className={twMerge('animate-pulse bg-muted', roundMap[rounded], className)}
      {...props}
    />
  );
};

Skeleton.displayName = 'Skeleton';
