import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../components/tooltip';
import { Button } from '../components/button';

const meta: Meta<typeof Tooltip> = {
  title: 'FeedbackDisplay/Tooltip',
  component: Tooltip,
  args: { content: 'Hello Cosmic' },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Tooltip> = {
  render: (args) => (
    <Tooltip {...args}>
      <Button variant="subtle">Hover me</Button>
    </Tooltip>
  ),
};

