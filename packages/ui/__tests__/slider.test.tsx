import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Slider } from '../src/components/slider';

test('renders slider and thumb', () => {
  render(<Slider defaultValue={[20]} />);
  expect(screen.getByRole('slider')).toBeInTheDocument();
});
