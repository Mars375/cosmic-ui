import type { Meta, StoryObj } from '@storybook/react';
import { LineChart } from '../components/line-chart';

type Row = { day: string; value: number; value2: number };
const data: Row[] = [
  { day: 'Mon', value: 12, value2: 4 },
  { day: 'Tue', value: 18, value2: 10 },
  { day: 'Wed', value: 9, value2: 14 },
  { day: 'Thu', value: 22, value2: 11 },
  { day: 'Fri', value: 30, value2: 20 },
];

const meta: Meta<typeof LineChart<Row>> = {
  title: 'DataViz/LineChart',
  component: LineChart<Row>,
  args: {
    data,
    xKey: 'day',
    series: [
      { dataKey: 'value', color: '#6C5CE7', name: 'Signups' },
      { dataKey: 'value2', color: '#00D1B2', name: 'Active' },
    ],
  },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof LineChart<Row>> = {};

