import type { Meta, StoryObj } from '@storybook/react';
import { Accordion } from '../components/accordion';

const meta: Meta<typeof Accordion> = {
  title: 'FeedbackDisplay/Accordion',
  component: Accordion,
  args: {
    type: 'single',
    collapsible: true,
    items: [
      { value: 'item-1', header: 'Section 1', content: 'Content of section 1' },
      { value: 'item-2', header: 'Section 2', content: 'Content of section 2' },
    ],
  },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Accordion> = {};
