import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Textarea } from '../src/components/textarea';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('types into textarea', async () => {
  const user = userEvent.setup();
  render(<Textarea placeholder="Write..." />);
  const ta = screen.getByPlaceholderText(/write/i);
  await user.type(ta, 'Hello');
  expect(ta).toHaveValue('Hello');
});

test('is accessible', async () => {
  const { container } = render(<Textarea aria-label="Message" invalid />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('matches snapshot', () => {
  const { asFragment } = render(<Textarea placeholder="Snapshot" />);
  expect(asFragment()).toMatchSnapshot();
});

