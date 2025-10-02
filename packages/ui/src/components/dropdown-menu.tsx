import * as React from 'react';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';
import { twMerge } from 'tailwind-merge';

export const DropdownMenu = RadixDropdown.Root;
export const DropdownTrigger = RadixDropdown.Trigger;

export const DropdownContent = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixDropdown.Content>) => (
  <RadixDropdown.Portal>
    <RadixDropdown.Content
      className={twMerge(
        'z-[60] min-w-40 rounded-md border border-border bg-popover p-1 text-sm text-popover-foreground shadow-xl',
        className,
      )}
      align="start"
      sideOffset={6}
      {...props}
    />
  </RadixDropdown.Portal>
);

export const DropdownItem = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixDropdown.Item>) => (
  <RadixDropdown.Item
    className={twMerge(
      'flex cursor-pointer select-none items-center gap-2 rounded px-2 py-1 hover:bg-white/10 focus:bg-white/10',
      className,
    )}
    {...props}
  />
);

export const DropdownSeparator = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixDropdown.Separator>) => (
  <RadixDropdown.Separator className={twMerge('my-1 h-px bg-border', className)} {...props} />
);

export const DropdownLabel = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixDropdown.Label>) => (
  <RadixDropdown.Label
    className={twMerge('px-2 py-1 text-xs text-white/60', className)}
    {...props}
  />
);
