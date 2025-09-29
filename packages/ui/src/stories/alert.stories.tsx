import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from '../components/alert';

const meta: Meta<typeof Alert> = {
  title: 'FeedbackDisplay/Alert',
  component: Alert,
  args: { title: 'Heads up', children: 'This is an informational alert.' },
  tags: ['autodocs'],
};
export default meta;

export const Info: StoryObj<typeof Alert> = {};
export const Success: StoryObj<typeof Alert> = {
  args: { variant: 'success', title: 'Success', children: 'Operation completed.' },
};
export const Warning: StoryObj<typeof Alert> = {
  args: { variant: 'warning', title: 'Warning', children: 'Please check your input.' },
};
export const Error: StoryObj<typeof Alert> = {
  args: { variant: 'error', title: 'Error', children: 'Something went wrong.' },
};
