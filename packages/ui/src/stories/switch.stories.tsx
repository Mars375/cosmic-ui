import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../components/switch';

const meta: Meta<typeof Switch> = {
  title: 'BaseInputs/Switch',
  component: Switch,
  args: { label: 'Enable notifications', id: 'notif' },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Switch> = {};

