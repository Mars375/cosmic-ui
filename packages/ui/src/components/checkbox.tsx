import * as React from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { twMerge } from 'tailwind-merge';

export interface CheckboxProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>, 'asChild'> {
  label?: string;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, id, label, description, disabled, ...props }, ref) => {
    const labelId = id ? `${id}-label` : undefined;
    const descriptionId = id ? `${id}-description` : undefined;
    return (
      <div
        className={twMerge(
          'inline-flex items-start gap-3 text-white',
          disabled ? 'opacity-60' : undefined,
        )}
      >
        <RadixCheckbox.Root
          ref={ref}
          id={id}
          disabled={disabled}
          aria-labelledby={label ? labelId : undefined}
          aria-describedby={description ? descriptionId : undefined}
          className={twMerge(
            'peer flex h-5 w-5 items-center justify-center rounded-md border border-cosmic-border bg-cosmic-surface outline-none transition-colors focus-visible:ring-2 focus-visible:ring-cosmic-primary data-[state=checked]:bg-cosmic-primary data-[state=checked]:border-cosmic-primary',
            className,
          )}
          {...props}
        >
          <RadixCheckbox.Indicator className="text-cosmic-primaryForeground">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M20 6L9 17L4 12"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {(label || description) && (
          <div>
            {label && (
              <label id={labelId} htmlFor={id} className="cursor-pointer select-none text-sm">
                {label}
              </label>
            )}
            {description && (
              <p id={descriptionId} className="mt-0.5 text-xs text-white/70">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';

