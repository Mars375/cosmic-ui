import * as React from 'react';
import * as RadixToast from '@radix-ui/react-toast';
import { twMerge } from 'tailwind-merge';

export interface ToastProviderProps
  extends React.ComponentPropsWithoutRef<typeof RadixToast.Provider> {}
export const ToastProvider = RadixToast.Provider;

export interface ToastRootProps extends React.ComponentPropsWithoutRef<typeof RadixToast.Root> {}
export const ToastRoot = ({ className, ...props }: ToastRootProps) => (
  <RadixToast.Root
    className={twMerge(
      'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 w-80 rounded-md border border-border bg-card p-3 text-sm text-card-foreground shadow-lg',
      className,
    )}
    {...props}
  />
);

export interface ToastTitleProps extends React.ComponentPropsWithoutRef<typeof RadixToast.Title> {}
export const ToastTitle = ({ className, ...props }: ToastTitleProps) => (
  <RadixToast.Title className={twMerge('mb-1 font-medium', className)} {...props} />
);

export interface ToastDescriptionProps
  extends React.ComponentPropsWithoutRef<typeof RadixToast.Description> {}
export const ToastDescription = ({ className, ...props }: ToastDescriptionProps) => (
  <RadixToast.Description className={twMerge('text-muted-foreground', className)} {...props} />
);

export interface ToastActionProps
  extends React.ComponentPropsWithoutRef<typeof RadixToast.Action> {}
export const ToastAction = ({ className, ...props }: ToastActionProps) => (
  <RadixToast.Action
    className={twMerge(
      'ml-3 inline-flex items-center rounded-md border border-border px-2 py-1 text-xs hover:bg-accent',
      className,
    )}
    {...props}
  />
);

export interface ToastCloseProps extends React.ComponentPropsWithoutRef<typeof RadixToast.Close> {}
export const ToastClose = ({ className, ...props }: ToastCloseProps) => (
  <RadixToast.Close
    className={twMerge(
      'absolute right-2 top-2 rounded p-1 text-muted-foreground hover:bg-accent hover:text-accent-foreground',
      className,
    )}
    aria-label="Close"
    {...props}
  >
    ✕
  </RadixToast.Close>
);

export const ToastViewport = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixToast.Viewport>) => (
  <RadixToast.Viewport
    className={twMerge(
      'fixed bottom-0 right-0 z-[60] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:w-96',
      className,
    )}
    {...props}
  />
);

// Alias pour compatibilité
export const Toast = ToastRoot;
