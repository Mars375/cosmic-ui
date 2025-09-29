import React from 'react';
import { render, screen } from '@testing-library/react';
import { KpiCard } from '../src/components/kpi-card';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('renders label and value', () => {
  render(<KpiCard label="Users" value={1234} />);
  expect(screen.getByText(/users/i)).toBeInTheDocument();
  expect(screen.getByText('1234')).toBeInTheDocument();
});

test('is accessible', async () => {
  const { container } = render(
    <KpiCard label="MRR" value="$12,340" delta={4.2} deltaDirection="up" />,
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
