import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface Crumb {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps extends React.HTMLAttributes<HTMLElement> {
  items: Crumb[];
  separator?: React.ReactNode;
}

export const Breadcrumbs = ({ className, items, separator = '/', ...props }: BreadcrumbsProps) => {
  return (
    <nav className={twMerge('text-sm text-white/80', className)} aria-label="Breadcrumb" {...props}>
      <ol className="inline-flex items-center gap-2">
        {items.map((item, idx) => (
          <li key={`${item.label}-${idx}`} className="inline-flex items-center gap-2">
            {item.href ? (
              <a href={item.href} className="hover:underline">
                {item.label}
              </a>
            ) : (
              <span aria-current="page" className="text-white">
                {item.label}
              </span>
            )}
            {idx < items.length - 1 && <span aria-hidden>{separator}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';
