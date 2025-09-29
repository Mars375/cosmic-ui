import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from '../src/components/breadcrumbs';

test('renders breadcrumb with current page', () => {
  render(<Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'Current' }]} />);
  expect(screen.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  expect(screen.getByText('Current')).toHaveAttribute('aria-current', 'page');
});
