import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '../components/textarea';

const meta: Meta<typeof Textarea> = {
  title: 'BaseInputs/Textarea',
  component: Textarea,
  args: { placeholder: 'Write your message...' },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Textarea> = {};
export const Invalid: StoryObj<typeof Textarea> = { args: { invalid: true } };

