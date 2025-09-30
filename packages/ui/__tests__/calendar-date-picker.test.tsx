import * as React from 'react';
import { render, screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { CalendarDatePicker } from '../src/components/calendar-date-picker';

test('navigates months and selects a date', async () => {
  const onChange = jest.fn();
  render(<CalendarDatePicker onChange={onChange} />);
  await user.click(screen.getByRole('button', { name: /next month/i }));
  const dayBtn = screen.getAllByRole('button').find((b) => /^\d+$/.test(b.textContent || ''))!;
  await user.click(dayBtn);
  expect(onChange).toHaveBeenCalled();
});

