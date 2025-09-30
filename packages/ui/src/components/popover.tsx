import * as React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { twMerge } from 'tailwind-merge';

export const Popover = RadixPopover.Root;
export const PopoverTrigger = RadixPopover.Trigger;
export const PopoverAnchor = RadixPopover.Anchor;

export const PopoverContent = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixPopover.Content>) => (
  <RadixPopover.Portal>
    <RadixPopover.Content
      sideOffset={6}
      className={twMerge(
        'z-[60] max-w-sm rounded-md border border-cosmic-border bg-cosmic-surface p-3 text-sm text-white shadow-xl',
        className,
      )}
      {...props}
    />
  </RadixPopover.Portal>
);

