import * as React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { InputWithMask } from '../src/components/input-mask';

test('applies mask to input', async () => {
  render(<InputWithMask mask={(raw) => raw.replace(/(\d{4})(?=\d)/g, '$1 ').trim()} />);
  const input = screen.getByRole('textbox');
  await user.type(input, '12345678');
  expect((input as HTMLInputElement).value).toBe('1234 5678');
});
