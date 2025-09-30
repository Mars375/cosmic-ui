import * as React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { InputOTP } from '../src/components/input-otp';

test('enters digits and moves focus', async () => {
  render(<InputOTP length={4} />);
  const boxes = await screen.findAllByRole('textbox');
  await user.type(boxes[0], '1');
  expect(boxes[1]).toHaveFocus();
});

