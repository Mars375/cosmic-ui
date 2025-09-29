import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup } from '../components/radio-group';

const items = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly', description: 'Recommended' },
];

const meta: Meta<typeof RadioGroup> = {
  title: 'BaseInputs/RadioGroup',
  component: RadioGroup,
  args: { items, ariaLabel: 'Frequency' },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof RadioGroup> = {};
