import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from '../components/badge';

const meta: Meta<typeof Badge> = {
  title: 'FeedbackDisplay/Badge',
  component: Badge,
  args: { children: 'New' },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Badge> = {};
export const Secondary: StoryObj<typeof Badge> = {
  args: { variant: 'secondary', children: 'Beta' },
};
export const Success: StoryObj<typeof Badge> = { args: { variant: 'success', children: 'Live' } };
export const Warning: StoryObj<typeof Badge> = { args: { variant: 'warning', children: 'Soon' } };
export const Destructive: StoryObj<typeof Badge> = {
  args: { variant: 'destructive', children: 'Removed' },
};

