import type { Meta, StoryObj } from '@storybook/react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from '../components/drawer';

const meta: Meta = {
  title: 'FeedbackDisplay/Drawer',
  tags: ['autodocs'],
};
export default meta;

export const Right: StoryObj = {
  render: () => (
    <Drawer>
      <DrawerTrigger asChild>
        <button className="rounded border border-cosmic-border px-3 py-2 text-sm text-white hover:bg-white/10">
          Open Drawer
        </button>
      </DrawerTrigger>
      <DrawerContent side="right">
        <DrawerTitle>Panel</DrawerTitle>
        <DrawerDescription>Some content here</DrawerDescription>
      </DrawerContent>
    </Drawer>
  ),
};
