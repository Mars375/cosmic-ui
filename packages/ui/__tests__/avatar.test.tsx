import React from 'react';
import { render, screen } from '@testing-library/react';
import { Avatar } from '../src/components/avatar';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('renders fallback', async () => {
  render(<Avatar fallback="CU" />);
  expect(await screen.findByText('CU')).toBeInTheDocument();
});

test('is accessible', async () => {
  const { container } = render(<Avatar src="https://i.pravatar.cc/80" alt="User" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('matches snapshot', () => {
  const { asFragment } = render(<Avatar fallback="CU" />);
  expect(asFragment()).toMatchSnapshot();
});
