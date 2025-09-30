import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface TopbarProps extends React.HTMLAttributes<HTMLElement> {
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  search?: React.ReactNode;
}

export const Topbar = ({ className, logo, actions, search, ...props }: TopbarProps) => {
  return (
    <header
      className={twMerge(
        'flex h-14 items-center justify-between border-b border-border bg-background px-3 text-foreground',
        className,
      )}
      role="banner"
      {...props}
    >
      <div className="flex items-center gap-2">
        {logo ?? <span className="font-semibold">CosmicUI</span>}
      </div>
      <div className="flex flex-1 justify-center px-3">{search}</div>
      <div className="flex items-center gap-2">{actions}</div>
    </header>
  );
};

Topbar.displayName = 'Topbar';

