import type { Meta, StoryObj } from '@storybook/react';
import { KpiCard } from '../components/kpi-card';

const meta: Meta<typeof KpiCard> = {
  title: 'DataViz/KPI Card',
  component: KpiCard,
  args: {
    label: 'MRR',
    value: '$12,340',
    delta: 4.2,
    deltaDirection: 'up',
    helperText: 'vs last month',
    icon: '💸',
  },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof KpiCard> = {};
export const Negative: StoryObj<typeof KpiCard> = {
  args: { delta: -2.1, deltaDirection: 'down' },
};
export const Neutral: StoryObj<typeof KpiCard> = {
  args: { delta: 0, deltaDirection: 'neutral' },
};

