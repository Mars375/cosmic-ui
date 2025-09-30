import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from '../components/progress-bar';

const meta: Meta<typeof ProgressBar> = {
  title: 'FeedbackDisplay/ProgressBar',
  component: ProgressBar,
  args: { value: 45 },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof ProgressBar> = {};
export const Full: StoryObj<typeof ProgressBar> = { args: { value: 100 } };
export const Empty: StoryObj<typeof ProgressBar> = { args: { value: 0 } };

