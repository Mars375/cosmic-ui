import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../components/skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'FeedbackDisplay/Skeleton',
  component: Skeleton,
  args: { className: 'h-6 w-40' },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Skeleton> = {};
export const Circle: StoryObj<typeof Skeleton> = {
  args: { className: 'h-10 w-10', rounded: 'full' },
};

