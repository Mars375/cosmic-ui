import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {}

export const Table = ({ className, ...props }: TableProps) => (
  <div className="overflow-auto rounded-md border border-border">
    <table
      className={twMerge('w-full border-collapse text-left text-sm text-foreground', className)}
      {...props}
    />
  </div>
);

export interface TheadProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
export const Thead = ({ className, ...props }: TheadProps) => (
  <thead
    className={twMerge('border-b border-border text-muted-foreground', className)}
    {...props}
  />
);

export interface TbodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}
export const Tbody = ({ className, ...props }: TbodyProps) => (
  <tbody className={className} {...props} />
);

export interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {}
export const Tr = ({ className, ...props }: TrProps) => (
  <tr className={twMerge('border-b border-border', className)} {...props} />
);

export interface ThProps extends React.ThHTMLAttributes<HTMLTableCellElement> {}
export const Th = ({ className, ...props }: ThProps) => (
  <th className={twMerge('px-3 py-2 font-medium', className)} {...props} />
);

export interface TdProps extends React.TdHTMLAttributes<HTMLTableCellElement> {}
export const Td = ({ className, ...props }: TdProps) => (
  <td className={twMerge('px-3 py-2', className)} {...props} />
);
