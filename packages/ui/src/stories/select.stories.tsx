import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '../components/select';

const items = [
  { value: 'basic', label: 'Basic' },
  { value: 'pro', label: 'Pro' },
  { value: 'enterprise', label: 'Enterprise' },
];

const meta: Meta<typeof Select> = {
  title: 'BaseInputs/Select',
  component: Select,
  args: { items, placeholder: 'Choose plan' },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Select> = {};
export const DisabledItem: StoryObj<typeof Select> = {
  args: { items: [...items, { value: 'legacy', label: 'Legacy', disabled: true }] },
};

