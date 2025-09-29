import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../components/button';

const meta: Meta<typeof Button> = {
  title: 'Core/Button',
  component: Button,
  args: { children: 'Button' },
  tags: ['autodocs'],
};
export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: { variant: 'primary' },
};

export const Secondary: StoryObj<typeof Button> = {
  args: { variant: 'secondary' },
};

export const Outline: StoryObj<typeof Button> = {
  args: { variant: 'outline' },
};

export const Ghost: StoryObj<typeof Button> = {
  args: { variant: 'ghost' },
};

export const Sizes: StoryObj<typeof Button> = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

export const Destructive: StoryObj<typeof Button> = {
  args: { variant: 'destructive', children: 'Delete' },
};

export const Subtle: StoryObj<typeof Button> = {
  args: { variant: 'subtle', children: 'Subtle' },
};

export const LinkVariant: StoryObj<typeof Button> = {
  args: { variant: 'link', children: 'Link' },
};

export const Loading: StoryObj<typeof Button> = {
  args: { children: 'Loading...', loading: true, disabled: true },
};
