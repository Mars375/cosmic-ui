import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Topbar } from '../src/components/topbar';

test('renders topbar with banner role', () => {
  render(<Topbar logo={<span>Logo</span>} actions={<button>Action</button>} />);
  expect(screen.getByRole('banner')).toBeInTheDocument();
  expect(screen.getByText('Logo')).toBeInTheDocument();
});

