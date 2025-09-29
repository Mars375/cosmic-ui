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
    <RadixAccordion.Root type={type as any} className={twMerge('w-full text-white', className)}>
      {items.map((it) => (
        <RadixAccordion.Item
          key={it.value}
          value={it.value}
          className="border-b border-cosmic-border"
        >
          <RadixAccordion.Header>
            <RadixAccordion.Trigger className="flex w-full items-center justify-between px-3 py-2 text-left text-sm hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-cosmic-primary">
              <span>{it.header}</span>
              <span aria-hidden>▾</span>
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className="px-3 py-3 text-sm text-white/80">
            {it.content}
          </RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
};

Accordion.displayName = 'Accordion';
