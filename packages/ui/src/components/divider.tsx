import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: 'horizontal' | 'vertical';
}

export const Divider = ({ className, orientation = 'horizontal', ...props }: DividerProps) => {
  if (orientation === 'vertical') {
    return (
      <span
        role="separator"
        aria-orientation="vertical"
        className={twMerge('mx-2 inline-block h-5 w-px bg-cosmic-border', className)}
        {...(props as any)}
      />
    );
  }
  return (
    <hr
      role="separator"
      aria-orientation="horizontal"
      className={twMerge('my-3 h-px w-full border-0 bg-cosmic-border', className)}
      {...props}
    />
  );
};

Divider.displayName = 'Divider';
