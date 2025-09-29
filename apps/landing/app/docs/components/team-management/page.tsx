'use client';

import { useState } from 'react';
import { TeamManagement } from '@cosmic-ui/components';
import { Button } from '@cosmic-ui/components';
import { Users, UserPlus, Mail, Shield, Eye, UserX } from 'lucide-react';

const CodeBlock = ({
  children,
  onCopy,
}: {
  children: string;
  onCopy: () => void;
}) => {
  return (
    <div className="relative">
      <pre className="bg-white dark:bg-black p-4 rounded-lg overflow-x-auto text-sm">
        <code>{children}</code>
      </pre>
      <button
        onClick={onCopy}
        className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </button>
    </div>
  );
};

export default function TeamManagementPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const sampleMembers = [
    {
      id: '1',
      name: 'Alice Martin',
      email: 'alice@example.com',
      avatar: '/avatars/alice.jpg',
      role: 'owner' as const,
      status: 'active' as const,
      joinedAt: new Date('2023-01-15'),
      lastActive: new Date('2024-01-10'),
      permissions: ['read', 'write', 'admin', 'billing'],
    },
    {
      id: '2',
      name: 'Bob Dupont',
      email: 'bob@example.com',
      avatar: '/avatars/bob.jpg',
      role: 'admin' as const,
      status: 'active' as const,
      joinedAt: new Date('2023-03-20'),
      lastActive: new Date('2024-01-09'),
      permissions: ['read', 'write', 'admin'],
    },
    {
      id: '3',
      name: 'Charlie Bernard',
      email: 'charlie@example.com',
      avatar: '/avatars/charlie.jpg',
      role: 'member' as const,
      status: 'active' as const,
      joinedAt: new Date('2023-06-10'),
      lastActive: new Date('2024-01-08'),
      permissions: ['read', 'write'],
    },
    {
      id: '4',
      name: 'Diana Wilson',
      email: 'diana@example.com',
      avatar: '/avatars/diana.jpg',
      role: 'viewer' as const,
      status: 'pending' as const,
      joinedAt: new Date('2024-01-05'),
      permissions: ['read'],
    },
  ];

  const sampleInvitations = [
    {
      id: 'inv1',
      email: 'eve@example.com',
      role: 'member' as const,
      invitedBy: 'Alice Martin',
      invitedAt: new Date('2024-01-08'),
      expiresAt: new Date('2024-01-22'),
      status: 'pending' as const,
    },
    {
      id: 'inv2',
      email: 'frank@example.com',
      role: 'viewer' as const,
      invitedBy: 'Bob Dupont',
      invitedAt: new Date('2024-01-05'),
      expiresAt: new Date('2024-01-19'),
      status: 'pending' as const,
    },
  ];

  const handleInviteMember = (email: string, role: any) => {
    console.log('Invite member:', email, role);
  };

  const handleUpdateMemberRole = (memberId: string, role: any) => {
    console.log('Update member role:', memberId, role);
  };

  const handleRemoveMember = (memberId: string) => {
    console.log('Remove member:', memberId);
  };

  const handleResendInvitation = (invitationId: string) => {
    console.log('Resend invitation:', invitationId);
  };

  const handleCancelInvitation = (invitationId: string) => {
    console.log('Cancel invitation:', invitationId);
  };

  const simpleMembers = [
    {
      id: '1',
      name: 'Alice Martin',
      email: 'alice@example.com',
      role: 'admin' as const,
      status: 'active' as const,
      joinedAt: new Date('2023-01-15'),
      permissions: ['read', 'write'],
    },
    {
      id: '2',
      name: 'Bob Dupont',
      email: 'bob@example.com',
      role: 'member' as const,
      status: 'active' as const,
      joinedAt: new Date('2023-03-20'),
      permissions: ['read'],
    },
  ];

  const complexMembers = [
    {
      id: '1',
      name: 'Alice Martin',
      email: 'alice@example.com',
      avatar: '/avatars/alice.jpg',
      role: 'owner' as const,
      status: 'active' as const,
      joinedAt: new Date('2023-01-15'),
      lastActive: new Date('2024-01-10'),
      permissions: ['read', 'write', 'admin', 'billing'],
    },
    {
      id: '2',
      name: 'Bob Dupont',
      email: 'bob@example.com',
      avatar: '/avatars/bob.jpg',
      role: 'admin' as const,
      status: 'active' as const,
      joinedAt: new Date('2023-03-20'),
      lastActive: new Date('2024-01-09'),
      permissions: ['read', 'write', 'admin'],
    },
    {
      id: '3',
      name: 'Charlie Bernard',
      email: 'charlie@example.com',
      avatar: '/avatars/charlie.jpg',
      role: 'member' as const,
      status: 'suspended' as const,
      joinedAt: new Date('2023-06-10'),
      lastActive: new Date('2024-01-08'),
      permissions: ['read', 'write'],
    },
  ];

  return (
    <div className="min-h-screen bg-cosmic-background text-cosmic-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button className="p-2 hover:bg-cosmic-border rounded-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <h1 className="text-4xl font-bold">TeamManagement</h1>
          <button className="p-2 hover:bg-cosmic-border rounded-lg">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Summary */}
        <p className="text-lg text-cosmic-muted-foreground mb-8">
          Un composant de gestion d'équipe avec membres, invitations et
          permissions.
        </p>

        {/* Main Preview */}
        <div className="mb-12">
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setShowCode(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                !showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
              }`}
            >
              Preview
            </button>
            <button
              onClick={() => setShowCode(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                showCode
                  ? 'bg-cosmic-primary text-white'
                  : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
              }`}
            >
              Code
            </button>
          </div>

          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 h-[450px] w-[500px] flex justify-start">
            {!showCode ? (
              <div className="p-4 w-full overflow-y-auto">
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
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { TeamManagement } from '@cosmic-ui/components';

export function MyTeamManagement() {
  const members = [
    {
      id: '1',
      name: 'Alice Martin',
      email: 'alice@example.com',
      avatar: '/avatars/alice.jpg',
      role: 'owner',
      status: 'active',
      joinedAt: new Date('2023-01-15'),
      lastActive: new Date('2024-01-10'),
      permissions: ['read', 'write', 'admin', 'billing'],
    },
    {
      id: '2',
      name: 'Bob Dupont',
      email: 'bob@example.com',
      avatar: '/avatars/bob.jpg',
      role: 'admin',
      status: 'active',
      joinedAt: new Date('2023-03-20'),
      lastActive: new Date('2024-01-09'),
      permissions: ['read', 'write', 'admin'],
    },
    {
      id: '3',
      name: 'Charlie Bernard',
      email: 'charlie@example.com',
      avatar: '/avatars/charlie.jpg',
      role: 'member',
      status: 'active',
      joinedAt: new Date('2023-06-10'),
      lastActive: new Date('2024-01-08'),
      permissions: ['read', 'write'],
    },
  ];

  const invitations = [
    {
      id: 'inv1',
      email: 'eve@example.com',
      role: 'member',
      invitedBy: 'Alice Martin',
      invitedAt: new Date('2024-01-08'),
      expiresAt: new Date('2024-01-22'),
      status: 'pending',
    },
  ];

  const handleInviteMember = (email, role) => {
    console.log('Invite member:', email, role);
  };

  const handleUpdateMemberRole = (memberId, role) => {
    console.log('Update member role:', memberId, role);
  };

  const handleRemoveMember = (memberId) => {
    console.log('Remove member:', memberId);
  };

  const handleResendInvitation = (invitationId) => {
    console.log('Resend invitation:', invitationId);
  };

  const handleCancelInvitation = (invitationId) => {
    console.log('Cancel invitation:', invitationId);
  };

  return (
    <TeamManagement
      members={members}
      invitations={invitations}
      onInviteMember={handleInviteMember}
      onUpdateMemberRole={handleUpdateMemberRole}
      onRemoveMember={handleRemoveMember}
      onResendInvitation={handleResendInvitation}
      onCancelInvitation={handleCancelInvitation}
      currentUserRole="owner"
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { TeamManagement } from '@cosmic-ui/components';

export function MyTeamManagement() {
  const members = [
    {
      id: '1',
      name: 'Alice Martin',
      email: 'alice@example.com',
      avatar: '/avatars/alice.jpg',
      role: 'owner',
      status: 'active',
      joinedAt: new Date('2023-01-15'),
      lastActive: new Date('2024-01-10'),
      permissions: ['read', 'write', 'admin', 'billing'],
    },
    {
      id: '2',
      name: 'Bob Dupont',
      email: 'bob@example.com',
      avatar: '/avatars/bob.jpg',
      role: 'admin',
      status: 'active',
      joinedAt: new Date('2023-03-20'),
      lastActive: new Date('2024-01-09'),
      permissions: ['read', 'write', 'admin'],
    },
    {
      id: '3',
      name: 'Charlie Bernard',
      email: 'charlie@example.com',
      avatar: '/avatars/charlie.jpg',
      role: 'member',
      status: 'active',
      joinedAt: new Date('2023-06-10'),
      lastActive: new Date('2024-01-08'),
      permissions: ['read', 'write'],
    },
  ];

  const invitations = [
    {
      id: 'inv1',
      email: 'eve@example.com',
      role: 'member',
      invitedBy: 'Alice Martin',
      invitedAt: new Date('2024-01-08'),
      expiresAt: new Date('2024-01-22'),
      status: 'pending',
    },
  ];

  const handleInviteMember = (email, role) => {
    console.log('Invite member:', email, role);
  };

  const handleUpdateMemberRole = (memberId, role) => {
    console.log('Update member role:', memberId, role);
  };

  const handleRemoveMember = (memberId) => {
    console.log('Remove member:', memberId);
  };

  const handleResendInvitation = (invitationId) => {
    console.log('Resend invitation:', invitationId);
  };

  const handleCancelInvitation = (invitationId) => {
    console.log('Cancel invitation:', invitationId);
  };

  return (
    <TeamManagement
      members={members}
      invitations={invitations}
      onInviteMember={handleInviteMember}
      onUpdateMemberRole={handleUpdateMemberRole}
      onRemoveMember={handleRemoveMember}
      onResendInvitation={handleResendInvitation}
      onCancelInvitation={handleCancelInvitation}
      currentUserRole="owner"
    />
  );
}`}
                </CodeBlock>
              </div>
            )}
          </div>
        </div>

        {/* Installation */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Installation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Le composant TeamManagement est déjà inclus dans le package
              @cosmic-ui/components.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(`npm install @cosmic-ui/components`, 'install')
              }
            >
              {`npm install @cosmic-ui/components`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Utilisez le composant pour gérer les membres d'une équipe.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { TeamManagement } from '@cosmic-ui/components';

const members = [
  {
    id: '1',
    name: 'Alice Martin',
    email: 'alice@example.com',
    role: 'admin',
    status: 'active',
    joinedAt: new Date(),
    permissions: ['read', 'write'],
  },
];

const invitations = [];

<TeamManagement
  members={members}
  invitations={invitations}
  onInviteMember={(email, role) => console.log('Invite:', email, role)}
  onUpdateMemberRole={(id, role) => console.log('Update role:', id, role)}
  onRemoveMember={(id) => console.log('Remove:', id)}
  onResendInvitation={(id) => console.log('Resend:', id)}
  onCancelInvitation={(id) => console.log('Cancel:', id)}
  currentUserRole="admin"
/>`,
                  'usage'
                )
              }
            >
              {`import { TeamManagement } from '@cosmic-ui/components';

const members = [
  {
    id: '1',
    name: 'Alice Martin',
    email: 'alice@example.com',
    role: 'admin',
    status: 'active',
    joinedAt: new Date(),
    permissions: ['read', 'write'],
  },
];

const invitations = [];

<TeamManagement
  members={members}
  invitations={invitations}
  onInviteMember={(email, role) => console.log('Invite:', email, role)}
  onUpdateMemberRole={(id, role) => console.log('Update role:', id, role)}
  onRemoveMember={(id) => console.log('Remove:', id)}
  onResendInvitation={(id) => console.log('Resend:', id)}
  onCancelInvitation={(id) => console.log('Cancel:', id)}
  currentUserRole="admin"
/>`}
            </CodeBlock>
          </div>
        </div>

        {/* Variants */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Variantes</h2>

          {/* Variants Preview */}
          <div className="mb-8">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setShowCodeVariants(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  !showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
                }`}
              >
                Preview
              </button>
              <button
                onClick={() => setShowCodeVariants(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  showCodeVariants
                    ? 'bg-cosmic-primary text-white'
                    : 'bg-cosmic-border text-cosmic-foreground hover:bg-cosmic-border/80'
                }`}
              >
                Code
              </button>
            </div>

            <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-2 h-[450px] w-[500px] flex justify-start">
              {!showCodeVariants ? (
                <div className="p-4 w-full space-y-4 overflow-y-auto">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Équipe simple
                    </h3>
                    <div className="max-h-[150px] overflow-y-auto">
                      <TeamManagement
                        members={simpleMembers}
                        invitations={[]}
                        onInviteMember={handleInviteMember}
                        onUpdateMemberRole={handleUpdateMemberRole}
                        onRemoveMember={handleRemoveMember}
                        onResendInvitation={handleResendInvitation}
                        onCancelInvitation={handleCancelInvitation}
                        currentUserRole="admin"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Équipe avec statuts
                    </h3>
                    <div className="max-h-[150px] overflow-y-auto">
                      <TeamManagement
                        members={complexMembers}
                        invitations={sampleInvitations}
                        onInviteMember={handleInviteMember}
                        onUpdateMemberRole={handleUpdateMemberRole}
                        onRemoveMember={handleRemoveMember}
                        onResendInvitation={handleResendInvitation}
                        onCancelInvitation={handleCancelInvitation}
                        currentUserRole="owner"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Équipe simple
<TeamManagement
  members={[
    {
      id: '1',
      name: 'Alice Martin',
      email: 'alice@example.com',
      role: 'admin',
      status: 'active',
      joinedAt: new Date(),
      permissions: ['read', 'write'],
    },
  ]}
  invitations={[]}
  onInviteMember={handleInviteMember}
  onUpdateMemberRole={handleUpdateMemberRole}
  onRemoveMember={handleRemoveMember}
  onResendInvitation={handleResendInvitation}
  onCancelInvitation={handleCancelInvitation}
  currentUserRole="admin"
/>

// Équipe avec avatars
<TeamManagement
  members={membersWithAvatars}
  invitations={invitations}
  onInviteMember={handleInviteMember}
  onUpdateMemberRole={handleUpdateMemberRole}
  onRemoveMember={handleRemoveMember}
  onResendInvitation={handleResendInvitation}
  onCancelInvitation={handleCancelInvitation}
  currentUserRole="owner"
/>

// Rôles et permissions
const roles = [
  { value: 'owner', label: 'Propriétaire', permissions: ['read', 'write', 'admin', 'billing'] },
  { value: 'admin', label: 'Administrateur', permissions: ['read', 'write', 'admin'] },
  { value: 'member', label: 'Membre', permissions: ['read', 'write'] },
  { value: 'viewer', label: 'Observateur', permissions: ['read'] },
];

// Statuts des membres
const statuses = [
  { value: 'active', label: 'Actif', color: 'green' },
  { value: 'pending', label: 'En attente', color: 'yellow' },
  { value: 'suspended', label: 'Suspendu', color: 'red' },
];`,
                        'variants'
                      )
                    }
                  >
                    {`// Équipe simple
<TeamManagement
  members={[
    {
      id: '1',
      name: 'Alice Martin',
      email: 'alice@example.com',
      role: 'admin',
      status: 'active',
      joinedAt: new Date(),
      permissions: ['read', 'write'],
    },
  ]}
  invitations={[]}
  onInviteMember={handleInviteMember}
  onUpdateMemberRole={handleUpdateMemberRole}
  onRemoveMember={handleRemoveMember}
  onResendInvitation={handleResendInvitation}
  onCancelInvitation={handleCancelInvitation}
  currentUserRole="admin"
/>

// Équipe avec avatars
<TeamManagement
  members={membersWithAvatars}
  invitations={invitations}
  onInviteMember={handleInviteMember}
  onUpdateMemberRole={handleUpdateMemberRole}
  onRemoveMember={handleRemoveMember}
  onResendInvitation={handleResendInvitation}
  onCancelInvitation={handleCancelInvitation}
  currentUserRole="owner"
/>

// Rôles et permissions
const roles = [
  { value: 'owner', label: 'Propriétaire', permissions: ['read', 'write', 'admin', 'billing'] },
  { value: 'admin', label: 'Administrateur', permissions: ['read', 'write', 'admin'] },
  { value: 'member', label: 'Membre', permissions: ['read', 'write'] },
  { value: 'viewer', label: 'Observateur', permissions: ['read'] },
];

// Statuts des membres
const statuses = [
  { value: 'active', label: 'Actif', color: 'green' },
  { value: 'pending', label: 'En attente', color: 'yellow' },
  { value: 'suspended', label: 'Suspendu', color: 'red' },
];`}
                  </CodeBlock>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
