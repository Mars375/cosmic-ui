import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, type SidebarItem } from '../components/sidebar';

const items: SidebarItem[] = [
  { key: 'dashboard', label: 'Dashboard', icon: '🏠' },
  { key: 'reports', label: 'Reports', icon: '📊', badge: <span className="text-xs">12</span> },
  { key: 'billing', label: 'Billing', icon: '💳' },
  { key: 'settings', label: 'Settings', icon: '⚙️', disabled: true },
];

const meta: Meta<typeof Sidebar> = {
  title: 'SaaS/Sidebar',
  component: Sidebar,
  args: { items, activeKey: 'dashboard' },
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<typeof Sidebar> = {
  render: (args) => (
    <div style={{ display: 'flex', height: 400, border: '1px solid #1F2A44' }}>
      <Sidebar {...args} />
      <div style={{ flex: 1, padding: 16 }}>Content area</div>
    </div>
  ),
};

export const Collapsed: StoryObj<typeof Sidebar> = {
  args: { collapsed: true },
};

