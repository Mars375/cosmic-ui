import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from '../src/components/switch';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('toggles switch', async () => {
  const user = userEvent.setup();
  render(<Switch id="sw" label="Toggle" />);
  const sw = screen.getByRole('switch');
  await user.click(screen.getByLabelText(/toggle/i));
  expect(sw).toHaveAttribute('data-state', 'checked');
});

test('is accessible', async () => {
  const { container } = render(<Switch id="swa" label="Notifications" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('matches snapshot', () => {
  const { asFragment } = render(<Switch id="snap" label="Snap" />);
  expect(asFragment()).toMatchSnapshot();
});
