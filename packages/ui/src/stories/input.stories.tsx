import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../components/input';

const meta: Meta<typeof Input> = {
  title: 'Core/Input',
  component: Input,
  args: { placeholder: 'Type here' },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Input> = {};

export const Sizes: StoryObj<typeof Input> = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Input size="sm" placeholder="Small" />
      <Input size="md" placeholder="Medium" />
      <Input size="lg" placeholder="Large" />
    </div>
  ),
};

export const WithIcons: StoryObj<typeof Input> = {
  render: () => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Input leading={<span>🔎</span>} placeholder="Search" />
      <Input trailing={<span>⌘K</span>} placeholder="Command" />
      <Input leading={<span>@</span>} trailing={<span>.dev</span>} placeholder="Email" />
    </div>
  ),
};

export const Invalid: StoryObj<typeof Input> = {
  args: { placeholder: 'Invalid', invalid: true },
};
