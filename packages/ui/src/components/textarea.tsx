import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        aria-invalid={invalid || undefined}
        className={twMerge(
          'min-h-[80px] w-full resize-y rounded-lg border border-cosmic-border bg-cosmic-surface px-4 py-3 text-sm text-white placeholder:text-cosmic-muted outline-none transition-colors focus-visible:ring-2 focus-visible:ring-cosmic-primary',
          invalid ? 'border-red-500 focus-visible:ring-red-500' : undefined,
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = 'Textarea';
