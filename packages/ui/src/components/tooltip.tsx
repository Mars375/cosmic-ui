import * as React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { twMerge } from 'tailwind-merge';

export interface TooltipProps extends React.ComponentPropsWithoutRef<typeof RadixTooltip.Root> {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  delay?: number;
  className?: string;
}

export const Tooltip = ({
  content,
  children,
  side = 'top',
  delay = 150,
  className,
  ...props
}: TooltipProps) => {
  return (
    <RadixTooltip.Provider delayDuration={delay}>
      <RadixTooltip.Root {...props}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={8}
            className={twMerge(
              'z-50 rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs text-foreground shadow-xl will-change-[transform,opacity]',
              className,
            )}
          >
            <div className="text-foreground">{content}</div>
            <RadixTooltip.Arrow className="fill-[hsl(var(--popover))]" />
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};

Tooltip.displayName = 'Tooltip';
