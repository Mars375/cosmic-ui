import * as React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import { twMerge } from 'tailwind-merge';

export interface DrawerProps extends React.ComponentPropsWithoutRef<typeof RadixDialog.Root> {}

export const Drawer = RadixDialog.Root;

export const DrawerTrigger = RadixDialog.Trigger;

export const DrawerOverlay = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixDialog.Overlay>) => (
  <RadixDialog.Overlay
    className={twMerge(
      'fixed inset-0 z-[59] bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out',
      className,
    )}
    {...props}
  />
);

export const DrawerContent = ({
  className,
  side = 'right',
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixDialog.Content> & {
  side?: 'left' | 'right' | 'top' | 'bottom';
}) => {
  const sideClasses: Record<string, string> = {
    right: 'right-0 top-0 h-full w-96 border-l',
    left: 'left-0 top-0 h-full w-96 border-r',
    top: 'top-0 left-0 w-full border-b',
    bottom: 'bottom-0 left-0 w-full border-t',
  };
  return (
    <RadixDialog.Portal>
      <DrawerOverlay />
      <RadixDialog.Content
        className={twMerge(
          'fixed z-[60] bg-background p-4 text-foreground shadow-2xl outline-none',
          'border border-border',
          sideClasses[side],
          className,
        )}
        {...props}
      />
    </RadixDialog.Portal>
  );
};

export const DrawerClose = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixDialog.Close>) => (
  <RadixDialog.Close
    className={twMerge('absolute right-3 top-3 rounded p-1 hover:bg-white/10', className)}
    {...props}
    aria-label="Close"
  >
    ✕
  </RadixDialog.Close>
);

export const DrawerTitle = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixDialog.Title>) => (
  <RadixDialog.Title className={twMerge('mb-2 text-base font-semibold', className)} {...props} />
);

export const DrawerDescription = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixDialog.Description>) => (
  <RadixDialog.Description className={twMerge('text-sm text-white/80', className)} {...props} />
);
