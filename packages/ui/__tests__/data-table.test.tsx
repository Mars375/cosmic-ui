import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DataTable, type DataTableColumn } from '../src/components/data-table';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

type Row = { id: number; name: string; score: number };
const columns: Array<DataTableColumn<Row>> = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'score', header: 'Score', sortable: true },
];
const data: Row[] = [
  { id: 1, name: 'B', score: 2 },
  { id: 2, name: 'A', score: 3 },
  { id: 3, name: 'C', score: 1 },
];

test('sorts by column when clicking header', async () => {
  const user = userEvent.setup();
  render(<DataTable columns={columns} data={data} defaultSortKey="name" />);
  // Default sort asc by name: A first
  const firstRowCell = screen.getAllByRole('row')[1].querySelector('td');
  expect(firstRowCell?.textContent).toMatch(/A/);
  // Click Name to toggle desc
  await user.click(screen.getByRole('button', { name: /sort by name/i }));
  const firstRowCellDesc = screen.getAllByRole('row')[1].querySelector('td');
  expect(firstRowCellDesc?.textContent).toMatch(/C/);
});

test('pagination next/previous works', async () => {
  const user = userEvent.setup();
  const long = Array.from({ length: 21 }).map((_, i) => ({
    id: i + 1,
    name: `N${i + 1}`,
    score: i,
  }));
  render(<DataTable columns={columns} data={long} pageSize={10} />);
  expect(screen.getByText(/page 1 \/ 3/i)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /next/i }));
  expect(screen.getByText(/page 2 \/ 3/i)).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /previous/i }));
  expect(screen.getByText(/page 1 \/ 3/i)).toBeInTheDocument();
});

test('select all on page toggles checkboxes', async () => {
  const user = userEvent.setup();
  const rows = Array.from({ length: 5 }).map((_, i) => ({
    id: i + 1,
    name: `N${i + 1}`,
    score: i,
  }));
  render(<DataTable columns={columns} data={rows} selectableRows />);
  const selectAll = screen.getByRole('checkbox', { name: /select all rows on page/i });
  await user.click(selectAll);
  const checks = screen.getAllByRole('checkbox');
  // first is select-all, others are rows
  expect(checks.slice(1).every((c) => (c as HTMLInputElement).checked)).toBe(true);
});

test('is accessible', async () => {
  const { container } = render(<DataTable columns={columns} data={data} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

