'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface NavigationItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavigationItem[];
  disabled?: boolean;
  onClick?: () => void;
}

export interface NavigationMenuProps {
  items: NavigationItem[];
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'pills' | 'underline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  activeItem?: string;
  onItemClick?: (item: NavigationItem) => void;
}

export function NavigationMenu({
  items,
  orientation = 'horizontal',
  variant = 'default',
  size = 'md',
  className,
  activeItem,
  onItemClick,
}: NavigationMenuProps) {
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(new Set());

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const handleItemClick = (item: NavigationItem) => {
    if (item.disabled) return;

    if (item.children && item.children.length > 0) {
      toggleExpanded(item.id);
    }

    if (item.onClick) {
      item.onClick();
    }

    if (onItemClick) {
      onItemClick(item);
    }
  };

  const renderItem = (item: NavigationItem, level = 0) => {
    const isActive = activeItem === item.id;
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    const baseClasses = twMerge(
      'flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors',
      size === 'sm' && 'px-2 py-1 text-xs',
      size === 'md' && 'px-3 py-2 text-sm',
      size === 'lg' && 'px-4 py-3 text-base',
      orientation === 'vertical' && 'w-full',
      item.disabled && 'opacity-50 cursor-not-allowed',
      !item.disabled && 'cursor-pointer',
    );

    const variantClasses = twMerge(
      // Default variant
      variant === 'default' &&
        !isActive &&
        'text-white/70 hover:text-white hover:bg-cosmic-border/50',
      variant === 'default' && isActive && 'text-white bg-cosmic-primary',

      // Pills variant
      variant === 'pills' &&
        !isActive &&
        'text-white/70 hover:text-white hover:bg-cosmic-border/50',
      variant === 'pills' && isActive && 'text-white bg-cosmic-primary',

      // Underline variant
      variant === 'underline' &&
        !isActive &&
        'text-white/70 hover:text-white border-b-2 border-transparent hover:border-cosmic-primary',
      variant === 'underline' && isActive && 'text-white border-b-2 border-cosmic-primary',

      // Ghost variant
      variant === 'ghost' &&
        !isActive &&
        'text-white/70 hover:text-white hover:bg-cosmic-border/30',
      variant === 'ghost' && isActive && 'text-white bg-cosmic-border/20',
    );

    return (
      <div key={item.id} className={twMerge('relative', level > 0 && 'ml-4')}>
        <div className={twMerge(baseClasses, variantClasses)} onClick={() => handleItemClick(item)}>
          <div className="flex items-center space-x-2">
            {item.icon && <div className="flex-shrink-0">{item.icon}</div>}
            <span>{item.label}</span>
            {item.badge && (
              <span
                className={twMerge(
                  'px-2 py-0.5 text-xs rounded-full',
                  isActive ? 'bg-white/20 text-white' : 'bg-cosmic-primary text-white',
                )}
              >
                {item.badge}
              </span>
            )}
          </div>

          {hasChildren && (
            <svg
              className={twMerge('w-4 h-4 transition-transform', isExpanded ? 'rotate-180' : '')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children!.map((child) => renderItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      className={twMerge(
        'flex',
        orientation === 'horizontal' && 'flex-row space-x-1',
        orientation === 'vertical' && 'flex-col space-y-1',
        className,
      )}
    >
      {items.map((item) => renderItem(item))}
    </nav>
  );
}

// Horizontal Navigation Menu (simplified for horizontal layouts)
export function HorizontalNavigationMenu({
  items,
  variant = 'underline',
  size = 'md',
  className,
  activeItem,
  onItemClick,
}: Omit<NavigationMenuProps, 'orientation'>) {
  return (
    <NavigationMenu
      items={items}
      orientation="horizontal"
      variant={variant}
      size={size}
      className={className}
      activeItem={activeItem}
      onItemClick={onItemClick}
    />
  );
}

// Vertical Navigation Menu (simplified for vertical layouts)
export function VerticalNavigationMenu({
  items,
  variant = 'default',
  size = 'md',
  className,
  activeItem,
  onItemClick,
}: Omit<NavigationMenuProps, 'orientation'>) {
  return (
    <NavigationMenu
      items={items}
      orientation="vertical"
      variant={variant}
      size={size}
      className={className}
      activeItem={activeItem}
      onItemClick={onItemClick}
    />
  );
}
