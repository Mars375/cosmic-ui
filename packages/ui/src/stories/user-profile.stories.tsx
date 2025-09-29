import type { Meta, StoryObj } from '@storybook/react';
import { UserProfile } from '../components/user-profile';

const meta: Meta<typeof UserProfile> = {
  title: 'Components/UserProfile',
  component: UserProfile,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleUser = {
  id: '1',
  name: 'Jean Dupont',
  email: 'jean.dupont@exemple.com',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  bio: "Développeur full-stack passionné par les technologies modernes. J'aime créer des applications qui améliorent la vie des utilisateurs.",
  location: 'Paris, France',
  website: 'https://jeandupont.dev',
  company: 'TechCorp',
  role: 'Lead Developer',
  phone: '+33 1 23 45 67 89',
  timezone: 'Europe/Paris',
  language: 'fr',
  notifications: {
    email: true,
    push: true,
    marketing: false,
    security: true,
  },
  privacy: {
    profileVisibility: 'public' as const,
    showEmail: false,
    showPhone: false,
    showLocation: true,
  },
};

function UserProfileDemo() {
  const handleSave = (user: any) => {
    console.log('Saving user:', user);
    alert('Profil sauvegardé !');
  };

  const handleAvatarChange = (file: File) => {
    console.log('Avatar changed:', file);
    alert('Avatar mis à jour !');
  };

  return (
    <div className="w-full max-w-6xl p-8">
      <UserProfile user={sampleUser} onSave={handleSave} onAvatarChange={handleAvatarChange} />
    </div>
  );
}

export const Default: Story = {
  render: () => <UserProfileDemo />,
};

export const ReadOnly: Story = {
  render: () => (
    <div className="w-full max-w-6xl p-8">
      <UserProfile user={sampleUser} onSave={() => {}} readOnly={true} />
    </div>
  ),
};

export const MinimalUser: Story = {
  render: () => {
    const minimalUser = {
      id: '2',
      name: 'Marie Martin',
      email: 'marie.martin@exemple.com',
      notifications: {
        email: true,
        push: false,
        marketing: false,
        security: true,
      },
      privacy: {
        profileVisibility: 'private' as const,
        showEmail: false,
        showPhone: false,
        showLocation: false,
      },
    };

    return (
      <div className="w-full max-w-6xl p-8">
        <UserProfile user={minimalUser} onSave={(user) => console.log('Saving:', user)} />
      </div>
    );
  },
};

export const WithoutAvatar: Story = {
  render: () => {
    const userWithoutAvatar = {
      ...sampleUser,
      avatar: undefined,
    };

    return (
      <div className="w-full max-w-6xl p-8">
        <UserProfile user={userWithoutAvatar} onSave={(user) => console.log('Saving:', user)} />
      </div>
    );
  },
};
