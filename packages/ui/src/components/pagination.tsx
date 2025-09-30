import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  totalPages: number;
  page: number;
  onPageChange?: (page: number) => void;
}

export const Pagination = ({
  className,
  totalPages,
  page,
  onPageChange,
  ...props
}: PaginationProps) => {
  const safeTotal = Math.max(1, totalPages);
  const current = Math.min(Math.max(1, page), safeTotal);
  const canPrev = current > 1;
  const canNext = current < safeTotal;

  const go = (p: number) => {
    if (p < 1 || p > safeTotal) return;
    onPageChange?.(p);
  };

  const pages = [current - 1, current, current + 1].filter((p) => p >= 1 && p <= safeTotal);

  return (
    <nav
      className={twMerge('inline-flex items-center gap-2 text-white', className)}
      aria-label="Pagination"
      {...props}
    >
      <button
        type="button"
        className="rounded-md border border-cosmic-border px-3 py-1 text-sm hover:bg-white/10 disabled:opacity-50"
        aria-label="Previous page"
        onClick={() => go(current - 1)}
        disabled={!canPrev}
      >
        Previous
      </button>
      {pages[0] > 1 && (
        <button
          type="button"
          className="rounded-md border border-cosmic-border px-3 py-1 text-sm hover:bg-white/10"
          onClick={() => go(1)}
          aria-current={current === 1 ? 'page' : undefined}
        >
          1
        </button>
      )}
      {pages[0] > 2 && <span aria-hidden>…</span>}
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          className={twMerge(
            'rounded-md border px-3 py-1 text-sm',
            p === current
              ? 'border-cosmic-primary bg-white/10'
              : 'border-cosmic-border hover:bg-white/10',
          )}
          onClick={() => go(p)}
          aria-current={p === current ? 'page' : undefined}
        >
          {p}
        </button>
      ))}
      {pages[pages.length - 1] < safeTotal - 1 && <span aria-hidden>…</span>}
      {pages[pages.length - 1] < safeTotal && (
        <button
          type="button"
          className="rounded-md border border-cosmic-border px-3 py-1 text-sm hover:bg-white/10"
          onClick={() => go(safeTotal)}
          aria-current={current === safeTotal ? 'page' : undefined}
        >
          {safeTotal}
        </button>
      )}
      <button
        type="button"
        className="rounded-md border border-cosmic-border px-3 py-1 text-sm hover:bg-white/10 disabled:opacity-50"
        aria-label="Next page"
        onClick={() => go(current + 1)}
        disabled={!canNext}
      >
        Next
      </button>
    </nav>
  );
};

Pagination.displayName = 'Pagination';

