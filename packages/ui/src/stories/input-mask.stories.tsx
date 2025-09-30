import type { Meta, StoryObj } from '@storybook/react';
import { InputWithMask } from '../components/input-mask';

const meta: Meta<typeof InputWithMask> = {
  title: 'BaseInputs/InputWithMask',
  component: InputWithMask,
  args: {
    mask: (raw: string) => raw.replace(/(\d{4})(?=\d)/g, '$1 ').trim(),
    placeholder: '1234 5678 9012 3456',
  },
  tags: ['autodocs'],
};
export default meta;

export const CreditCard: StoryObj<typeof InputWithMask> = {};

