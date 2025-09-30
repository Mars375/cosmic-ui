import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumbs } from '../components/breadcrumbs';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  args: {
    items: [{ label: 'Home', href: '#' }, { label: 'Library', href: '#' }, { label: 'Data' }],
  },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Breadcrumbs> = {};

