import type { Meta, StoryObj } from '@storybook/react';
import { CalendarDatePicker } from '../components/calendar-date-picker';
import * as React from 'react';

const meta: Meta<typeof CalendarDatePicker> = {
  title: 'DataContent/CalendarDatePicker',
  component: CalendarDatePicker,
  tags: ['autodocs'],
};
export default meta;

export const Controlled: StoryObj<typeof CalendarDatePicker> = {
  render: () => {
    const [value, setValue] = React.useState<Date | null>(new Date());
    return (
      <div className="text-white">
        <CalendarDatePicker value={value as Date} onChange={setValue} />
        <div className="mt-2 text-sm">Selected: {value?.toDateString()}</div>
      </div>
    );
  },
};

