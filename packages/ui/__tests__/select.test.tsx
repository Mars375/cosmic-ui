import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from '../src/components/select';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

const items = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
];

test('opens and selects an item', async () => {
  const user = userEvent.setup();
  render(<Select items={items} ariaLabel="Plan" />);
  const trigger = screen.getByRole('combobox', { name: /plan/i });
  // Ouvrir via clavier (compatible jsdom)
  trigger.focus();
  await user.keyboard('{ArrowDown}');
  // Aller à l'option B puis valider
  await user.keyboard('{ArrowDown}{Enter}');
  expect(trigger).toHaveTextContent(/option b/i);
});

test('is accessible', async () => {
  const { container } = render(<Select items={items} ariaLabel="Plan" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('matches snapshot', () => {
  const { asFragment } = render(<Select items={items} ariaLabel="Plan" />);
  expect(asFragment()).toMatchSnapshot();
});
