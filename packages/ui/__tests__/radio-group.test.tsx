import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroup } from '../src/components/radio-group';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const items = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

test('selects an option', async () => {
  const user = userEvent.setup();
  render(<RadioGroup ariaLabel="Choice" items={items} />);
  await user.click(screen.getByText(/option b/i));
  // Radix adds aria-checked on selected item via input role
  const radios = screen.getAllByRole('radio');
  expect(radios[1]).toHaveAttribute('data-state', 'checked');
});

test('is accessible', async () => {
  const { container } = render(<RadioGroup ariaLabel="Choice" items={items} />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('matches snapshot', () => {
  const { asFragment } = render(<RadioGroup ariaLabel="Choice" items={items} />);
  expect(asFragment()).toMatchSnapshot();
});
