import React from 'react';
import { render, screen } from '@testing-library/react';
import { Spinner } from '../src/components/spinner';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('renders with role status', () => {
  render(<Spinner />);
  expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
});

test('is accessible', async () => {
  const { container } = render(<Spinner size={32} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('matches snapshot', () => {
  const { asFragment } = render(<Spinner size={16} />);
  expect(asFragment()).toMatchSnapshot();
});
