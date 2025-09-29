import React from 'react';
import { render } from '@testing-library/react';
import { Skeleton } from '../src/components/skeleton';

test('matches snapshot', () => {
  const { asFragment } = render(<Skeleton className="h-6 w-40" />);
  expect(asFragment()).toMatchSnapshot();
});
