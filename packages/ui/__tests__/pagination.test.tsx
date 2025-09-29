import * as React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { Pagination } from '../src/components/pagination';

test('renders and navigates pages', async () => {
  const onPageChange = jest.fn();
  render(<Pagination totalPages={5} page={3} onPageChange={onPageChange} />);
  expect(screen.getByRole('navigation', { name: /pagination/i })).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: /previous page/i }));
  expect(onPageChange).toHaveBeenCalledWith(2);
  await user.click(screen.getByRole('button', { name: /next page/i }));
  expect(onPageChange).toHaveBeenCalledWith(4);
});

test('marks current page with aria-current', () => {
  render(<Pagination totalPages={3} page={2} />);
  const current = screen.getByRole('button', { name: '2' });
  expect(current).toHaveAttribute('aria-current', 'page');
});
