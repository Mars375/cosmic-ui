import type { Meta, StoryObj } from '@storybook/react';
import { DashboardLayout } from '../components/dashboard-layout';
import { Sidebar } from '../components/sidebar';
import { Topbar } from '../components/topbar';

const meta: Meta<typeof DashboardLayout> = {
  title: 'SaaSModules/DashboardLayout',
  component: DashboardLayout,
  tags: ['autodocs'],
};
export default meta;

export const Basic: StoryObj<typeof DashboardLayout> = {
  render: () => (
    <DashboardLayout
      topbar={<Topbar />}
      sidebar={
        <Sidebar
          items={[
            { id: 'home', label: 'Home' },
            { id: 'reports', label: 'Reports' },
          ]}
        />
      }
    >
      <div className="text-white">Content</div>
    </DashboardLayout>
  ),
};

