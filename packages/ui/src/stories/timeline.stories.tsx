import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from '../components/timeline';

const meta: Meta<typeof Timeline> = {
  title: 'DataContent/Timeline',
  component: Timeline,
  args: {
    items: [
      { id: 1, title: 'Project created', time: '09:12', description: 'Initial scaffolding' },
      { id: 2, title: 'First release', time: '11:30', description: 'Shipped v0.1.0' },
      { id: 3, title: 'Docs published', time: '14:20' },
    ],
  },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Timeline> = {};

