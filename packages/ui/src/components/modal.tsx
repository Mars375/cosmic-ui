import * as React from 'react';
import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

export interface ModalProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  container?: Element | DocumentFragment | null;
  closeOnEsc?: boolean;
  closeOnOverlayClick?: boolean;
  lockScroll?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  showCloseButton?: boolean;
}

function useFocusTrap(enabled: boolean, trapRef: React.RefObject<HTMLElement>) {
  React.useEffect(() => {
    if (!enabled || !trapRef.current) return;

    const container = trapRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const focusableSelector = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const getFocusable = () =>
      Array.from(container.querySelectorAll<HTMLElement>(focusableSelector));

    const focusFirst = () => {
      const items = getFocusable();
      if (items.length > 0) {
        items[0].focus();
      } else {
        container.focus();
      }
    };

    // Delay to ensure content is mounted
    const id = window.setTimeout(focusFirst, 0);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const items = getFocusable();
      if (items.length === 0) {
        e.preventDefault();
        container.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first || document.activeElement === container) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    container.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(id);
      container.removeEventListener('keydown', onKeyDown);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [enabled, trapRef]);
}

export const Modal = ({ open, onOpenChange, children, container, ...options }: ModalProps) => {
  const portalTarget = container ?? (typeof document !== 'undefined' ? document.body : null);
  if (!portalTarget) return null;
  return createPortal(
    <ModalRoot open={open} onOpenChange={onOpenChange} options={options}>
      {children}
    </ModalRoot>,
    portalTarget,
  );
};

interface ModalRootProps extends Pick<ModalProps, 'open' | 'onOpenChange' | 'children'> {
  options: Omit<ModalProps, 'open' | 'onOpenChange' | 'children' | 'container'>;
}

const ModalRoot = ({ open, onOpenChange, children, options }: ModalRootProps) => {
  const contentRef = React.useRef<HTMLDivElement>(null);
  useFocusTrap(open, contentRef);
  const {
    closeOnEsc = true,
    closeOnOverlayClick = true,
    lockScroll = true,
    initialFocusRef,
    showCloseButton = true,
  } = options;

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closeOnEsc) onOpenChange?.(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onOpenChange]);

  React.useEffect(() => {
    if (!open || !lockScroll) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open, lockScroll]);

  React.useEffect(() => {
    if (!open || !initialFocusRef?.current) return;
    const id = window.setTimeout(() => initialFocusRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [open, initialFocusRef]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-black/70"
        onClick={() => closeOnOverlayClick && onOpenChange?.(false)}
      />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          role="dialog"
          aria-modal="true"
          ref={contentRef}
          tabIndex={-1}
          className={twMerge(
            'w-full max-w-lg rounded-lg border border-border bg-background text-foreground shadow-2xl outline-none',
          )}
        >
          {showCloseButton && (
            <button
              type="button"
              aria-label="Close"
              onClick={() => onOpenChange?.(false)}
              className="absolute right-3 top-3 h-8 w-8 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring"
            >
              ✕
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={twMerge('px-6 pt-6 pb-2', className)} {...props} />
  ),
);
ModalHeader.displayName = 'ModalHeader';

export interface ModalTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
export const ModalTitle = React.forwardRef<HTMLHeadingElement, ModalTitleProps>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={twMerge('text-lg font-semibold', className)} {...props} />
  ),
);
ModalTitle.displayName = 'ModalTitle';

export interface ModalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
export const ModalDescription = React.forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={twMerge('text-sm text-muted-foreground', className)} {...props} />
  ),
);
ModalDescription.displayName = 'ModalDescription';

export interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export const ModalContent = React.forwardRef<HTMLDivElement, ModalContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={twMerge('px-6 py-4', className)} {...props} />
  ),
);
ModalContent.displayName = 'ModalContent';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge('px-6 pt-2 pb-6 flex justify-end gap-3', className)}
      {...props}
    />
  ),
);
ModalFooter.displayName = 'ModalFooter';
