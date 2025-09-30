import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../src/components/progress-bar';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('renders with value', () => {
  render(<ProgressBar value={30} />);
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '30');
});

test('is accessible', async () => {
  const { container } = render(<ProgressBar value={70} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('matches snapshot', () => {
  const { asFragment } = render(<ProgressBar value={90} />);
  expect(asFragment()).toMatchSnapshot();
});

