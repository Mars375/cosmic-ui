import type { Meta, StoryObj } from '@storybook/react';
import { DataTable, type DataTableColumn } from '../components/data-table';

type Row = { id: number; name: string; email: string; signups: number };
const columns: Array<DataTableColumn<Row>> = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'signups', header: 'Signups', sortable: true },
];
const data: Row[] = Array.from({ length: 32 }).map((_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@cosmic.dev`,
  signups: Math.floor(Math.random() * 1000),
}));

const meta: Meta<typeof DataTable<Row>> = {
  title: 'SaaS/DataTable',
  component: DataTable<Row>,
  args: {
    columns,
    data,
    selectableRows: true,
    defaultSortKey: 'signups',
  },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof DataTable<Row>> = {};
