import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from '../components/spinner';

const meta: Meta<typeof Spinner> = {
  title: 'FeedbackDisplay/Spinner',
  component: Spinner,
  args: { size: 24 },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Spinner> = {};
export const Large: StoryObj<typeof Spinner> = { args: { size: 48 } };
