import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from '../components/avatar';

const meta: Meta<typeof Avatar> = {
  title: 'FeedbackDisplay/Avatar',
  component: Avatar,
  args: { fallback: 'CU', size: 40 },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Avatar> = {};
export const WithImage: StoryObj<typeof Avatar> = {
  args: { src: 'https://i.pravatar.cc/80', alt: 'User' },
};
