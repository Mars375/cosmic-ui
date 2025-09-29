import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../src/components/input';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('renders input with placeholder', () => {
  render(<Input placeholder="Your name" />);
  expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument();
});

test('allows typing', async () => {
  const user = userEvent.setup();
  render(<Input placeholder="Email" />);
  const input = screen.getByPlaceholderText(/email/i);
  await user.type(input, 'hello@cosmicui.dev');
  expect(input).toHaveValue('hello@cosmicui.dev');
});

test('is accessible', async () => {
  const { container } = render(<Input aria-label="Cosmic Input" />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('invalid state adds aria-invalid and styles', () => {
  render(<Input placeholder="Phone" invalid />);
  const input = screen.getByPlaceholderText(/phone/i);
  expect(input).toHaveAttribute('aria-invalid', 'true');
});

test('renders leading and trailing elements without breaking input', async () => {
  const user = userEvent.setup();
  render(<Input leading={<span>@</span>} trailing={<span>.dev</span>} placeholder="Handle" />);
  const input = screen.getByPlaceholderText(/handle/i);
  await user.type(input, 'cosmic');
  expect(input).toHaveValue('cosmic');
});
