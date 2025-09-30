import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../components/checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'BaseInputs/Checkbox',
  component: Checkbox,
  args: { label: 'Accept terms', description: 'You agree to our terms and conditions' },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Checkbox> = {};
export const Disabled: StoryObj<typeof Checkbox> = {
  args: { disabled: true },
};

