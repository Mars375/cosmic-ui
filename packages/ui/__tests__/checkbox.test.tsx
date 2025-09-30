import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '../src/components/checkbox';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('renders with label and toggles state', async () => {
  const user = userEvent.setup();
  render(<Checkbox id="cb" label="Accept" />);
  const box = screen.getByRole('checkbox');
  expect(box).toBeInTheDocument();
  await user.click(screen.getByLabelText(/accept/i));
  // Radix sets aria-checked on the button role
  expect(box).toHaveAttribute('data-state', 'checked');
});

test('is accessible', async () => {
  const { container } = render(<Checkbox id="cb2" label="Agree" description="Required" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('matches snapshot', () => {
  const { asFragment } = render(<Checkbox id="snap" label="Snap" />);
  expect(asFragment()).toMatchSnapshot();
});

