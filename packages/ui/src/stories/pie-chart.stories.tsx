import type { Meta, StoryObj } from '@storybook/react';
import { PieChart } from '../components/pie-chart';

const data = [
  { name: 'Chrome', value: 62, color: '#6C5CE7' },
  { name: 'Safari', value: 20, color: '#00D1B2' },
  { name: 'Firefox', value: 12, color: '#F59E0B' },
  { name: 'Other', value: 6, color: '#64748B' },
];

const meta: Meta<typeof PieChart> = {
  title: 'DataViz/PieChart',
  component: PieChart,
  args: { data },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof PieChart> = {};
