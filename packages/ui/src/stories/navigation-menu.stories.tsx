import type { Meta, StoryObj } from '@storybook/react';
import {
  NavigationMenu,
  HorizontalNavigationMenu,
  VerticalNavigationMenu,
} from '../components/navigation-menu';
import { useState } from 'react';

const meta: Meta<typeof NavigationMenu> = {
  title: 'Components/NavigationMenu',
  component: NavigationMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"
        />
      </svg>
    ),
    onClick: () => console.log('Dashboard clicked'),
  },
  {
    id: 'projects',
    label: 'Projets',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    ),
    badge: '3',
    children: [
      {
        id: 'active-projects',
        label: 'Projets actifs',
        onClick: () => console.log('Active projects clicked'),
      },
      {
        id: 'archived-projects',
        label: 'Projets archivés',
        onClick: () => console.log('Archived projects clicked'),
      },
    ],
  },
  {
    id: 'team',
    label: 'Équipe',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
        />
      </svg>
    ),
    children: [
      {
        id: 'members',
        label: 'Membres',
        onClick: () => console.log('Members clicked'),
      },
      {
        id: 'invitations',
        label: 'Invitations',
        badge: '2',
        onClick: () => console.log('Invitations clicked'),
      },
    ],
  },
  {
    id: 'settings',
    label: 'Paramètres',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    onClick: () => console.log('Settings clicked'),
  },
];

function NavigationMenuDemo() {
  const [activeItem, setActiveItem] = useState('dashboard');

  return (
    <div className="p-8 space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Horizontal Navigation</h3>
        <div className="bg-cosmic-surface p-4 rounded-lg">
          <NavigationMenu
            items={sampleItems}
            orientation="horizontal"
            variant="underline"
            activeItem={activeItem}
            onItemClick={(item) => setActiveItem(item.id)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Vertical Navigation</h3>
        <div className="bg-cosmic-surface p-4 rounded-lg w-64">
          <NavigationMenu
            items={sampleItems}
            orientation="vertical"
            variant="default"
            activeItem={activeItem}
            onItemClick={(item) => setActiveItem(item.id)}
          />
        </div>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <NavigationMenuDemo />,
};

export const HorizontalVariants: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('dashboard');

    return (
      <div className="p-8 space-y-8">
        {(['default', 'pills', 'underline', 'ghost'] as const).map((variant) => (
          <div key={variant}>
            <h3 className="text-lg font-semibold text-white mb-4 capitalize">{variant} Variant</h3>
            <div className="bg-cosmic-surface p-4 rounded-lg">
              <HorizontalNavigationMenu
                items={sampleItems}
                variant={variant}
                activeItem={activeItem}
                onItemClick={(item) => setActiveItem(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const VerticalVariants: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('dashboard');

    return (
      <div className="p-8 space-y-8">
        {(['default', 'pills', 'ghost'] as const).map((variant) => (
          <div key={variant}>
            <h3 className="text-lg font-semibold text-white mb-4 capitalize">{variant} Variant</h3>
            <div className="bg-cosmic-surface p-4 rounded-lg w-64">
              <VerticalNavigationMenu
                items={sampleItems}
                variant={variant}
                activeItem={activeItem}
                onItemClick={(item) => setActiveItem(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('dashboard');

    return (
      <div className="p-8 space-y-8">
        {(['sm', 'md', 'lg'] as const).map((size) => (
          <div key={size}>
            <h3 className="text-lg font-semibold text-white mb-4 capitalize">{size} Size</h3>
            <div className="bg-cosmic-surface p-4 rounded-lg">
              <HorizontalNavigationMenu
                items={sampleItems}
                size={size}
                activeItem={activeItem}
                onItemClick={(item) => setActiveItem(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    );
  },
};

export const WithBadges: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('dashboard');

    const itemsWithBadges = [
      ...sampleItems,
      {
        id: 'notifications',
        label: 'Notifications',
        badge: '5',
        icon: (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-5 5v-5zM4.5 5.5a3 3 0 116 0v6a3 3 0 11-6 0v-6zM4.5 5.5a3 3 0 116 0v6a3 3 0 11-6 0v-6z"
            />
          </svg>
        ),
        onClick: () => console.log('Notifications clicked'),
      },
    ];

    return (
      <div className="p-8">
        <div className="bg-cosmic-surface p-4 rounded-lg">
          <HorizontalNavigationMenu
            items={itemsWithBadges}
            activeItem={activeItem}
            onItemClick={(item) => setActiveItem(item.id)}
          />
        </div>
      </div>
    );
  },
};
