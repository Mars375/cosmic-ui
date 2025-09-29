'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  keywords?: string[];
  action: () => void;
  group?: string;
}

export interface CommandGroup {
  id: string;
  title: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  groups: CommandGroup[];
  placeholder?: string;
  className?: string;
}

export function CommandPalette({
  isOpen,
  onClose,
  groups,
  placeholder = 'Tapez une commande ou recherchez...',
  className,
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Filter items based on query
  const filteredGroups = React.useMemo(() => {
    if (!query) return groups;

    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const searchText =
            `${item.title} ${item.description || ''} ${item.keywords?.join(' ') || ''}`.toLowerCase();
          return searchText.includes(query.toLowerCase());
        }),
      }))
      .filter((group) => group.items.length > 0);
  }, [groups, query]);

  const allItems = React.useMemo(
    () => filteredGroups.flatMap((group) => group.items),
    [filteredGroups],
  );

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % allItems.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + allItems.length) % allItems.length);
          break;
        case 'Enter':
          e.preventDefault();
          if (allItems[selectedIndex]) {
            allItems[selectedIndex].action();
            onClose();
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, allItems, selectedIndex, onClose]);

  // Focus input when opened
  React.useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Close on outside click
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isOpen && !(e.target as Element).closest('[data-command-palette]')) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
      <div
        data-command-palette
        className={twMerge(
          'w-full max-w-2xl mx-4 bg-cosmic-surface border border-cosmic-border rounded-lg shadow-xl',
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-center border-b border-cosmic-border p-4">
          <svg
            className="w-4 h-4 text-white/50 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-white placeholder-white/50 outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs text-white/50 border border-cosmic-border rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {filteredGroups.length === 0 ? (
            <div className="p-8 text-center text-white/50">
              <svg
                className="w-8 h-8 mx-auto mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709"
                />
              </svg>
              Aucun résultat trouvé
            </div>
          ) : (
            filteredGroups.map((group, groupIndex) => (
              <div key={group.id} className="p-2">
                {group.title && (
                  <div className="px-3 py-2 text-xs font-medium text-white/50 uppercase tracking-wider">
                    {group.title}
                  </div>
                )}
                {group.items.map((item, itemIndex) => {
                  const globalIndex =
                    filteredGroups
                      .slice(0, groupIndex)
                      .reduce((acc, g) => acc + g.items.length, 0) + itemIndex;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.action();
                        onClose();
                      }}
                      className={twMerge(
                        'w-full flex items-center px-3 py-2 text-left rounded-md transition-colors',
                        globalIndex === selectedIndex
                          ? 'bg-cosmic-primary text-white'
                          : 'text-white/90 hover:bg-cosmic-border/50',
                      )}
                    >
                      {item.icon && <div className="mr-3 text-white/70">{item.icon}</div>}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{item.title}</div>
                        {item.description && (
                          <div className="text-sm text-white/60 truncate">{item.description}</div>
                        )}
                      </div>
                      {globalIndex === selectedIndex && (
                        <kbd className="hidden sm:inline-flex items-center px-2 py-1 text-xs border border-white/20 rounded">
                          ↵
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-cosmic-border text-xs text-white/50">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <kbd className="px-1 py-0.5 border border-cosmic-border rounded mr-1">↑↓</kbd>
              Naviguer
            </span>
            <span className="flex items-center">
              <kbd className="px-1 py-0.5 border border-cosmic-border rounded mr-1">↵</kbd>
              Sélectionner
            </span>
          </div>
          <span className="flex items-center">
            <kbd className="px-1 py-0.5 border border-cosmic-border rounded mr-1">ESC</kbd>
            Fermer
          </span>
        </div>
      </div>
    </div>
  );
}

// Hook for easy command palette usage
export function useCommandPalette() {
  const [isOpen, setIsOpen] = React.useState(false);

  const open = React.useCallback(() => setIsOpen(true), []);
  const close = React.useCallback(() => setIsOpen(false), []);

  // Global keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        open();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open]);

  return { isOpen, open, close };
}
