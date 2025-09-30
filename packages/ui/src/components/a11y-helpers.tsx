import * as React from 'react';

export const VisuallyHidden = ({ children }: { children: React.ReactNode }) => (
  <span className="absolute -m-px h-px w-px overflow-hidden p-0 [clip:rect(0,0,0,0)]">
    {children}
  </span>
);

export const SkipLink = ({
  href = '#main',
  children = 'Skip to content',
}: {
  href?: string;
  children?: React.ReactNode;
}) => (
  <a
    href={href}
    className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:rounded-md focus:bg-cosmic-primary focus:px-3 focus:py-2 focus:text-cosmic-primaryForeground"
  >
    {children}
  </a>
);

VisuallyHidden.displayName = 'VisuallyHidden';
SkipLink.displayName = 'SkipLink';

