import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

type TabsOrientation = 'horizontal' | 'vertical';
type TabsActivationMode = 'automatic' | 'manual';

interface TabsContextValue {
  value: string | undefined;
  setValue: (v: string) => void;
  baseId: string;
  orientation: TabsOrientation;
  activationMode: TabsActivationMode;
}

const TabsContext = React.createContext<TabsContextValue | null>(null);

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: TabsOrientation;
  activationMode?: TabsActivationMode;
}

export const Tabs = ({
  value: controlledValue,
  defaultValue,
  onValueChange,
  orientation = 'horizontal',
  activationMode = 'automatic',
  className,
  children,
  ...props
}: TabsProps) => {
  const [uncontrolled, setUncontrolled] = React.useState<string | undefined>(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolled;
  const setValue = React.useCallback(
    (v: string) => {
      if (!isControlled) setUncontrolled(v);
      onValueChange?.(v);
    },
    [isControlled, onValueChange],
  );
  const baseId = React.useId().replaceAll(':', '');

  return (
    <TabsContext.Provider value={{ value, setValue, baseId, orientation, activationMode }}>
      <div className={twMerge('w-full', className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const listVariants = cva('inline-flex items-center gap-1 rounded-lg bg-muted p-1', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export interface TabsListProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof listVariants> {}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, orientation, ...props }, ref) => {
    const ctx = React.useContext(TabsContext);
    const actualOrientation = orientation ?? ctx?.orientation ?? 'horizontal';
    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={actualOrientation}
        className={twMerge(listVariants({ orientation: actualOrientation }), className)}
        {...props}
      />
    );
  },
);
TabsList.displayName = 'TabsList';

const triggerVariants = cva(
  'inline-flex select-none items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed',
  {
    variants: {
      size: {
        sm: 'text-xs px-2 py-1.5',
        md: 'text-sm px-3 py-2',
        lg: 'text-base px-4 py-2.5',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export interface TabsTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'>,
    VariantProps<typeof triggerVariants> {
  value: string;
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, size, disabled, ...props }, ref) => {
    const ctx = React.useContext(TabsContext);
    if (!ctx) throw new Error('TabsTrigger must be used within Tabs');
    const { value: active, setValue, baseId, orientation, activationMode } = ctx;

    const id = `${baseId}-tab-${value}`;
    const controls = `${baseId}-panel-${value}`;
    const selected = active === value;

    const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const list = (e.currentTarget.parentElement as HTMLElement | null) ?? undefined;
      if (!list) return;
      const tabs = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
      const currentIndex = tabs.indexOf(e.currentTarget);
      const prev = () => tabs[(currentIndex - 1 + tabs.length) % tabs.length]?.focus();
      const next = () => tabs[(currentIndex + 1) % tabs.length]?.focus();
      switch (e.key) {
        case 'ArrowLeft':
          if (orientation === 'horizontal') {
            e.preventDefault();
            prev();
          }
          break;
        case 'ArrowRight':
          if (orientation === 'horizontal') {
            e.preventDefault();
            next();
          }
          break;
        case 'ArrowUp':
          if (orientation === 'vertical') {
            e.preventDefault();
            prev();
          }
          break;
        case 'ArrowDown':
          if (orientation === 'vertical') {
            e.preventDefault();
            next();
          }
          break;
        case 'Home':
          e.preventDefault();
          tabs[0]?.focus();
          break;
        case 'End':
          e.preventDefault();
          tabs[tabs.length - 1]?.focus();
          break;
        case 'Enter':
        case ' ': // Space
          e.preventDefault();
          if (!disabled) setValue(e.currentTarget.getAttribute('data-value') || value);
          break;
      }
    };

    const onClick = () => {
      if (!disabled) setValue(value);
    };

    const onFocus = () => {
      if (!disabled && activationMode === 'automatic') setValue(value);
    };

    return (
      <button
        ref={ref}
        role="tab"
        type="button"
        id={id}
        data-value={value}
        aria-controls={controls}
        aria-selected={selected}
        tabIndex={selected ? 0 : -1}
        disabled={disabled}
        data-state={selected ? 'active' : 'inactive'}
        className={twMerge(triggerVariants({ size }), className)}
        onKeyDown={onKeyDown}
        onClick={onClick}
        onFocus={onFocus}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = 'TabsTrigger';

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const ctx = React.useContext(TabsContext);
    if (!ctx) throw new Error('TabsContent must be used within Tabs');
    const { value: active, baseId } = ctx;
    const id = `${baseId}-panel-${value}`;
    const labelledBy = `${baseId}-tab-${value}`;
    const hidden = active !== value;
    return (
      <div
        ref={ref}
        role="tabpanel"
        id={id}
        aria-labelledby={labelledBy}
        hidden={hidden}
        className={twMerge(hidden ? 'hidden' : 'block', className)}
        {...props}
      />
    );
  },
);
TabsContent.displayName = 'TabsContent';
