import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../src/components/button';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('renders button with text', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
});

test('is accessible', async () => {
  const { container } = render(<Button>Accessible</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('handles click interactions', async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(<Button onClick={onClick}>Click</Button>);
  await user.click(screen.getByRole('button', { name: /click/i }));
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('supports variants and disabled state', () => {
  const { rerender } = render(<Button variant="destructive">Delete</Button>);
  expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  rerender(<Button variant="link">Link</Button>);
  expect(screen.getByRole('button', { name: /link/i })).toBeInTheDocument();
});

test('shows loading state and disables interactions', async () => {
  const user = userEvent.setup();
  const onClick = jest.fn();
  render(
    <Button loading disabled onClick={onClick}>
      Saving
    </Button>,
  );
  const btn = screen.getByRole('button', { name: /saving/i });
  expect(btn).toHaveAttribute('aria-busy', 'true');
  await user.click(btn);
  expect(onClick).not.toHaveBeenCalled();
});
