import React from 'react';
import { render, screen } from '@testing-library/react';
import { Badge } from '../src/components/badge';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('renders badge content', () => {
  render(<Badge>New</Badge>);
  expect(screen.getByText(/new/i)).toBeInTheDocument();
});

test('is accessible', async () => {
  const { container } = render(<Badge variant="success">Live</Badge>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('matches snapshot', () => {
  const { asFragment } = render(<Badge variant="destructive">Removed</Badge>);
  expect(asFragment()).toMatchSnapshot();
});

