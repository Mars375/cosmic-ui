import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Divider } from '../src/components/divider';

test('renders horizontal separator', () => {
  render(<Divider />);
  expect(screen.getByRole('separator')).toBeInTheDocument();
});

test('renders vertical separator', () => {
  render(
    <div>
      <Divider orientation="vertical" />
    </div>,
  );
  expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
});

