import type { Meta, StoryObj } from '@storybook/react';
import {
  DropdownMenu,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownLabel,
} from '../components/dropdown-menu';

const meta: Meta = {
  title: 'Navigation/DropdownMenu',
  tags: ['autodocs'],
};
export default meta;

export const Basic: StoryObj = {
  render: () => (
    <DropdownMenu>
      <DropdownTrigger asChild>
        <button className="rounded border border-cosmic-border px-2 py-1 text-sm text-white hover:bg-white/10">
          Open
        </button>
      </DropdownTrigger>
      <DropdownContent>
        <DropdownLabel>Options</DropdownLabel>
        <DropdownItem>Profile</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownSeparator />
        <DropdownItem>Logout</DropdownItem>
      </DropdownContent>
    </DropdownMenu>
  ),
};
