import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Timeline } from '../src/components/timeline';

test('renders timeline items', () => {
  render(
    <Timeline
      items={[
        { id: 1, title: 'A' },
        { id: 2, title: 'B' },
      ]}
    />,
  );
  expect(screen.getByText('A')).toBeInTheDocument();
  expect(screen.getByText('B')).toBeInTheDocument();
});
