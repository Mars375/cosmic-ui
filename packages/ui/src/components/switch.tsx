import * as React from 'react';
import * as RadixSwitch from '@radix-ui/react-switch';
import { twMerge } from 'tailwind-merge';

export interface SwitchProps
  extends Omit<React.ComponentPropsWithoutRef<typeof RadixSwitch.Root>, 'asChild'> {
  label?: string;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, label, id, disabled, ...props }, ref) => {
    const labelId = id ? `${id}-label` : undefined;
    return (
      <div
        className={twMerge(
          'inline-flex items-center gap-3 text-foreground',
          disabled ? 'opacity-60' : undefined,
        )}
      >
        <RadixSwitch.Root
          ref={ref}
          id={id}
          disabled={disabled}
          aria-labelledby={label ? labelId : undefined}
          className={twMerge(
            'relative h-6 w-11 rounded-full outline-none bg-input data-[state=checked]:bg-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
            className,
          )}
          {...props}
        >
          <RadixSwitch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-background shadow-sm transition-transform data-[state=checked]:translate-x-[22px]" />
        </RadixSwitch.Root>
        {label ? (
          <label id={labelId} htmlFor={id} className="cursor-pointer select-none text-sm">
            {label}
          </label>
        ) : null}
      </div>
    );
  },
);

Switch.displayName = 'Switch';
