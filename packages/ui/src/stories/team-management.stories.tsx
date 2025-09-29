import type { Meta, StoryObj } from '@storybook/react';
import { TeamManagement } from '../components/team-management';

const meta: Meta<typeof TeamManagement> = {
  title: 'Components/TeamManagement',
  component: TeamManagement,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleMembers = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@exemple.com',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'owner' as const,
    status: 'active' as const,
    joinedAt: new Date('2023-01-15'),
    lastActive: new Date(Date.now() - 2 * 3600000), // 2 hours ago
    permissions: ['read', 'write', 'admin'],
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie.martin@exemple.com',
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'admin' as const,
    status: 'active' as const,
    joinedAt: new Date('2023-02-20'),
    lastActive: new Date(Date.now() - 30 * 60000), // 30 minutes ago
    permissions: ['read', 'write', 'admin'],
  },
  {
    id: '3',
    name: 'Pierre Durand',
    email: 'pierre.durand@exemple.com',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'member' as const,
    status: 'active' as const,
    joinedAt: new Date('2023-03-10'),
    lastActive: new Date(Date.now() - 24 * 3600000), // 1 day ago
    permissions: ['read', 'write'],
  },
  {
    id: '4',
    name: 'Sophie Leroy',
    email: 'sophie.leroy@exemple.com',
    role: 'member' as const,
    status: 'pending' as const,
    joinedAt: new Date('2023-04-05'),
    permissions: ['read', 'write'],
  },
  {
    id: '5',
    name: 'Thomas Moreau',
    email: 'thomas.moreau@exemple.com',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    role: 'viewer' as const,
    status: 'active' as const,
    joinedAt: new Date('2023-05-12'),
    lastActive: new Date(Date.now() - 7 * 24 * 3600000), // 1 week ago
    permissions: ['read'],
  },
];

const sampleInvitations = [
  {
    id: '1',
    email: 'nouveau.membre@exemple.com',
    role: 'member' as const,
    invitedBy: 'Jean Dupont',
    invitedAt: new Date(Date.now() - 2 * 24 * 3600000), // 2 days ago
    expiresAt: new Date(Date.now() + 5 * 24 * 3600000), // 5 days from now
    status: 'pending' as const,
  },
  {
    id: '2',
    email: 'admin.temporaire@exemple.com',
    role: 'admin' as const,
    invitedBy: 'Marie Martin',
    invitedAt: new Date(Date.now() - 1 * 24 * 3600000), // 1 day ago
    expiresAt: new Date(Date.now() + 6 * 24 * 3600000), // 6 days from now
    status: 'pending' as const,
  },
];

function TeamManagementDemo() {
  const handleInviteMember = (email: string, role: any) => {
    console.log('Inviting member:', { email, role });
    alert(`Invitation envoyée à ${email} avec le rôle ${role}`);
  };

  const handleUpdateMemberRole = (memberId: string, role: any) => {
    console.log('Updating member role:', { memberId, role });
    alert(`Rôle mis à jour pour le membre ${memberId} vers ${role}`);
  };

  const handleRemoveMember = (memberId: string) => {
    console.log('Removing member:', memberId);
    alert(`Membre ${memberId} supprimé`);
  };

  const handleResendInvitation = (invitationId: string) => {
    console.log('Resending invitation:', invitationId);
    alert(`Invitation ${invitationId} renvoyée`);
  };

  const handleCancelInvitation = (invitationId: string) => {
    console.log('Canceling invitation:', invitationId);
    alert(`Invitation ${invitationId} annulée`);
  };

  return (
    <div className="w-full max-w-6xl p-8">
      <TeamManagement
        members={sampleMembers}
        invitations={sampleInvitations}
        onInviteMember={handleInviteMember}
        onUpdateMemberRole={handleUpdateMemberRole}
        onRemoveMember={handleRemoveMember}
        onResendInvitation={handleResendInvitation}
        onCancelInvitation={handleCancelInvitation}
        currentUserRole="owner"
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <TeamManagementDemo />,
};

export const AsAdmin: Story = {
  render: () => {
    const handleInviteMember = (email: string, role: any) => {
      console.log('Inviting member:', { email, role });
      alert(`Invitation envoyée à ${email} avec le rôle ${role}`);
    };

    const handleUpdateMemberRole = (memberId: string, role: any) => {
      console.log('Updating member role:', { memberId, role });
      alert(`Rôle mis à jour pour le membre ${memberId} vers ${role}`);
    };

    const handleRemoveMember = (memberId: string) => {
      console.log('Removing member:', memberId);
      alert(`Membre ${memberId} supprimé`);
    };

    const handleResendInvitation = (invitationId: string) => {
      console.log('Resending invitation:', invitationId);
      alert(`Invitation ${invitationId} renvoyée`);
    };

    const handleCancelInvitation = (invitationId: string) => {
      console.log('Canceling invitation:', invitationId);
      alert(`Invitation ${invitationId} annulée`);
    };

    return (
      <div className="w-full max-w-6xl p-8">
        <TeamManagement
          members={sampleMembers}
          invitations={sampleInvitations}
          onInviteMember={handleInviteMember}
          onUpdateMemberRole={handleUpdateMemberRole}
          onRemoveMember={handleRemoveMember}
          onResendInvitation={handleResendInvitation}
          onCancelInvitation={handleCancelInvitation}
          currentUserRole="admin"
        />
      </div>
    );
  },
};

export const AsMember: Story = {
  render: () => {
    const handleInviteMember = (email: string, role: any) => {
      console.log('Inviting member:', { email, role });
      alert(`Invitation envoyée à ${email} avec le rôle ${role}`);
    };

    const handleUpdateMemberRole = (memberId: string, role: any) => {
      console.log('Updating member role:', { memberId, role });
      alert(`Rôle mis à jour pour le membre ${memberId} vers ${role}`);
    };

    const handleRemoveMember = (memberId: string) => {
      console.log('Removing member:', memberId);
      alert(`Membre ${memberId} supprimé`);
    };

    const handleResendInvitation = (invitationId: string) => {
      console.log('Resending invitation:', invitationId);
      alert(`Invitation ${invitationId} renvoyée`);
    };

    const handleCancelInvitation = (invitationId: string) => {
      console.log('Canceling invitation:', invitationId);
      alert(`Invitation ${invitationId} annulée`);
    };

    return (
      <div className="w-full max-w-6xl p-8">
        <TeamManagement
          members={sampleMembers}
          invitations={sampleInvitations}
          onInviteMember={handleInviteMember}
          onUpdateMemberRole={handleUpdateMemberRole}
          onRemoveMember={handleRemoveMember}
          onResendInvitation={handleResendInvitation}
          onCancelInvitation={handleCancelInvitation}
          currentUserRole="member"
        />
      </div>
    );
  },
};

export const EmptyTeam: Story = {
  render: () => {
    const handleInviteMember = (email: string, role: any) => {
      console.log('Inviting member:', { email, role });
      alert(`Invitation envoyée à ${email} avec le rôle ${role}`);
    };

    const handleUpdateMemberRole = (memberId: string, role: any) => {
      console.log('Updating member role:', { memberId, role });
      alert(`Rôle mis à jour pour le membre ${memberId} vers ${role}`);
    };

    const handleRemoveMember = (memberId: string) => {
      console.log('Removing member:', memberId);
      alert(`Membre ${memberId} supprimé`);
    };

    const handleResendInvitation = (invitationId: string) => {
      console.log('Resending invitation:', invitationId);
      alert(`Invitation ${invitationId} renvoyée`);
    };

    const handleCancelInvitation = (invitationId: string) => {
      console.log('Canceling invitation:', invitationId);
      alert(`Invitation ${invitationId} annulée`);
    };

    return (
      <div className="w-full max-w-6xl p-8">
        <TeamManagement
          members={[sampleMembers[0]]} // Only the owner
          invitations={[]}
          onInviteMember={handleInviteMember}
          onUpdateMemberRole={handleUpdateMemberRole}
          onRemoveMember={handleRemoveMember}
          onResendInvitation={handleResendInvitation}
          onCancelInvitation={handleCancelInvitation}
          currentUserRole="owner"
        />
      </div>
    );
  },
};
