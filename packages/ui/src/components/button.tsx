import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-transparent select-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary text-primary-foreground hover:brightness-110',
        secondary: 'bg-secondary text-secondary-foreground hover:brightness-110',
        outline: 'border border-input text-foreground hover:bg-muted/60 dark:hover:bg-muted/40',
        ghost: 'bg-transparent hover:bg-muted/60 dark:hover:bg-muted/40',
        destructive: 'bg-destructive text-destructive-foreground hover:brightness-110',
        subtle: 'bg-muted text-foreground hover:bg-muted/80 border border-border',
        link: 'bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto',
      },
      size: {
        sm: 'h-9 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-sm rounded-lg',
        lg: 'h-11 px-5 text-base rounded-lg',
        xl: 'h-12 px-6 text-base rounded-lg',
      },
      fullWidth: {
        true: 'w-full',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      loading,
      leadingIcon,
      trailingIcon,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    const Spinner = (
      <span
        className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-transparent"
        aria-hidden="true"
      />
    );
    return (
      <button
        ref={ref}
        className={twMerge(buttonVariants({ variant, size, fullWidth }), className)}
        aria-busy={loading || undefined}
        disabled={isDisabled}
        {...props}
      >
        {loading ? Spinner : leadingIcon}
        {children}
        {trailingIcon}
      </button>
    );
  },
);
Button.displayName = 'Button';
