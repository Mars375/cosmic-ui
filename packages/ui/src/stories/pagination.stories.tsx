import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../components/pagination';
import * as React from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  args: { totalPages: 10, page: 5 },
  tags: ['autodocs'],
};
export default meta;

export const Controlled: StoryObj<typeof Pagination> = {
  render: (args) => {
    const [page, setPage] = React.useState(args.page ?? 1);
    return <Pagination {...args} page={page} onPageChange={setPage} />;
  },
};

