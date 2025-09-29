import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from '../components/divider';

const meta: Meta<typeof Divider> = {
  title: 'FeedbackDisplay/Divider',
  component: Divider,
  tags: ['autodocs'],
};
export default meta;

export const Horizontal: StoryObj<typeof Divider> = {};
export const Vertical: StoryObj<typeof Divider> = {
  render: () => (
    <div className="flex items-center text-white">
      <span>Left</span>
      <Divider orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};
