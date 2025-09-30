import type { Meta, StoryObj } from '@storybook/react';
import { Popover, PopoverTrigger, PopoverContent } from '../components/popover';

const meta: Meta = {
  title: 'FeedbackDisplay/Popover',
  tags: ['autodocs'],
};
export default meta;

export const Basic: StoryObj = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <button className="rounded border border-cosmic-border px-3 py-2 text-sm text-white hover:bg-white/10">
          Open Popover
        </button>
      </PopoverTrigger>
      <PopoverContent>Some popover content</PopoverContent>
    </Popover>
  ),
};

