import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar, type SidebarItem } from '../src/components/sidebar';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const items: SidebarItem[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'reports', label: 'Reports' },
];

test('renders items and toggles collapsed', async () => {
  const user = userEvent.setup();
  render(<Sidebar items={items} activeKey="dashboard" />);
  expect(screen.getByRole('navigation', { name: /sidebar/i })).toBeInTheDocument();
  expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
  const toggle = screen.getByRole('button', { name: /collapse sidebar/i });
  await user.click(toggle);
  // After collapse, label hidden, title used
  expect(screen.queryByText(/dashboard/i)).not.toBeInTheDocument();
  expect(screen.getByTitle(/dashboard/i)).toBeInTheDocument();
});

test('is accessible', async () => {
  const { container } = render(<Sidebar items={items} activeKey="dashboard" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

