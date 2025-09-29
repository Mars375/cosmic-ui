import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const inputVariants = cva(
  'w-full appearance-none bg-background text-foreground placeholder:text-muted-foreground border border-input outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]',
  {
    variants: {
      size: {
        sm: 'h-9 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-sm rounded-lg',
        lg: 'h-11 px-4 text-base rounded-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
      invalid: {
        true: 'border-red-500 focus-visible:ring-red-500',
        false: '',
      },
    },
    defaultVariants: {
      size: 'md',
      fullWidth: true,
      invalid: false,
    },
  },
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, size, fullWidth, leading, trailing, invalid, ...props }, ref) => {
    const field = (
      <input
        ref={ref}
        aria-invalid={invalid || undefined}
        className={twMerge(
          inputVariants({ size, fullWidth, invalid }),
          className,
          leading || trailing ? 'pl-10 pr-10' : undefined,
        )}
        {...props}
      />
    );
    if (!leading && !trailing) return field;
    return (
      <div className="relative">
        {leading && (
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leading}
          </span>
        )}
        {field}
        {trailing && (
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {trailing}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';
