import * as React from 'react';

export interface TimelineItemData {
  id: string | number;
  title: React.ReactNode;
  description?: React.ReactNode;
  time?: React.ReactNode;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLUListElement> {
  items: TimelineItemData[];
}

export const Timeline = ({ items, ...props }: TimelineProps) => {
  return (
    <ul className="relative space-y-4 text-white" {...props}>
      {items.map((it, idx) => (
        <li key={it.id} className="relative pl-6">
          <span className="absolute left-2 top-2 h-2 w-2 -translate-x-1/2 rounded-full bg-cosmic-primary" />
          {idx < items.length - 1 && (
            <span
              className="absolute left-2 top-3 block h-full w-px -translate-x-1/2 bg-cosmic-border"
              aria-hidden
            />
          )}
          <div className="text-sm font-medium">{it.title}</div>
          {it.time ? <div className="text-xs text-white/60">{it.time}</div> : null}
          {it.description ? (
            <div className="mt-1 text-sm text-white/80">{it.description}</div>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

Timeline.displayName = 'Timeline';
