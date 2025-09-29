import * as React from 'react';
import * as RadixAccordion from '@radix-ui/react-accordion';
import { twMerge } from 'tailwind-merge';

export interface AccordionItem {
  value: string;
  header: React.ReactNode;
  content: React.ReactNode;
}

export interface AccordionProps {
  items: AccordionItem[];
  type?: 'single' | 'multiple';
  className?: string;
}

export const Accordion = ({ className, items, type = 'single' }: AccordionProps) => {
  return (
    <RadixAccordion.Root type={type as any} collapsible className="w-full">
      {items.map((it) => (
        <RadixAccordion.Item
          key={it.value}
          value={it.value}
          className="border-b border-gray-200 dark:border-gray-700"
        >
          <RadixAccordion.Header>
            <RadixAccordion.Trigger className="flex w-full items-center justify-between px-3 py-2 text-left text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-colors">
              <span>{it.header}</span>
              <span aria-hidden className="text-gray-500 dark:text-gray-400">
                ▾
              </span>
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="px-3 py-3 text-sm text-gray-700 dark:text-gray-300">
            {it.content}
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
};

Accordion.displayName = 'Accordion';
