import type { Meta, StoryObj } from '@storybook/react';
import { Topbar } from '../components/topbar';

const meta: Meta<typeof Topbar> = {
  title: 'Navigation/Topbar',
  component: Topbar,
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Topbar> = {
  args: {
    logo: <span className="font-semibold">CosmicUI</span>,
    actions: (
      <div className="flex items-center gap-2">
        <button className="rounded border border-cosmic-border px-2 py-1 text-xs hover:bg-white/10">
          Action
        </button>
      </div>
    ),
  },
};
