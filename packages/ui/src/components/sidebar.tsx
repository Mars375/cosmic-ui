import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export type SidebarItem = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: React.ReactNode;
  disabled?: boolean;
};

export interface SidebarProps extends React.HTMLAttributes<HTMLElement> {
  items: SidebarItem[];
  activeKey?: string;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const Sidebar = React.forwardRef<HTMLElement, SidebarProps>(
  (
    {
      className,
      items,
      activeKey,
      collapsed: controlledCollapsed,
      defaultCollapsed = false,
      onCollapsedChange,
      header,
      footer,
      ...props
    },
    ref,
  ) => {
    const [uncontrolled, setUncontrolled] = React.useState<boolean>(defaultCollapsed);
    const isControlled = controlledCollapsed !== undefined;
    const collapsed = isControlled ? !!controlledCollapsed : uncontrolled;
    const setCollapsed = (v: boolean) => {
      if (!isControlled) setUncontrolled(v);
      onCollapsedChange?.(v);
    };

    const widthClass = collapsed ? 'w-16' : 'w-64';

    return (
      <nav
        ref={ref}
        aria-label="Sidebar"
        className={twMerge(
          'h-full shrink-0 border-r border-cosmic-border bg-cosmic-surface text-white transition-[width] duration-200',
          widthClass,
          className,
        )}
        {...props}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-3 py-3 border-b border-cosmic-border">
            <div className="truncate text-sm font-semibold">{header ?? <span>Cosmic</span>}</div>
            <button
              type="button"
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              aria-expanded={!collapsed}
              onClick={() => setCollapsed(!collapsed)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-md text-white/70 hover:text-white hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-cosmic-primary"
            >
              {collapsed ? '›' : '‹'}
            </button>
          </div>
          <ul className="flex-1 overflow-auto py-2">
            {items.map((item) => {
              const isActive = item.key === activeKey;
              const Comp = item.href ? 'a' : 'button';
              const baseClasses = twMerge(
                'group grid w-full grid-cols-[1fr_auto] items-center gap-2 px-3 py-2 text-left text-sm outline-none transition-colors',
                isActive ? 'bg-white/[0.06] text-white' : 'text-white/80 hover:bg-white/[0.06]',
                item.disabled ? 'opacity-50 cursor-not-allowed' : '',
              );
              return (
                <li key={item.key} className="px-2">
                  {React.createElement(
                    Comp as any,
                    {
                      className: baseClasses,
                      'aria-current': isActive ? 'page' : undefined,
                      tabIndex: item.disabled ? -1 : 0,
                      href: item.href,
                      disabled: Comp === 'button' ? item.disabled : undefined,
                      title: collapsed ? item.label : undefined,
                    },
                    <span className="flex items-center gap-2 truncate">
                      <span aria-hidden className="inline-flex h-5 w-5 items-center justify-center">
                        {item.icon ?? <span className="text-xs">•</span>}
                      </span>
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </span>,
                    !collapsed && item.badge ? (
                      <span className="justify-self-end">{item.badge}</span>
                    ) : null,
                  )}
                </li>
              );
            })}
          </ul>
          {footer && (
            <div className="border-t border-cosmic-border p-3 text-sm text-white/70">{footer}</div>
          )}
        </div>
      </nav>
    );
  },
);
Sidebar.displayName = 'Sidebar';
