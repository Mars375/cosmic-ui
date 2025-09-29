import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { DashboardLayout } from '../src/components/dashboard-layout';

test('renders dashboard main content', () => {
  render(
    <DashboardLayout topbar={<div>Top</div>} sidebar={<div>Side</div>}>
      <div>Main</div>
    </DashboardLayout>,
  );
  expect(screen.getByText('Main')).toBeInTheDocument();
});
