'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';
import { Input } from './input';
import { Avatar } from './avatar';
import { Badge } from './badge';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Modal } from './modal';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'owner' | 'admin' | 'member' | 'viewer';
  status: 'active' | 'pending' | 'suspended';
  joinedAt: Date;
  lastActive?: Date;
  permissions: string[];
}

export interface TeamInvitation {
  id: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  invitedBy: string;
  invitedAt: Date;
  expiresAt: Date;
  status: 'pending' | 'accepted' | 'expired';
}

export interface TeamManagementProps {
  members: TeamMember[];
  invitations: TeamInvitation[];
  onInviteMember: (email: string, role: TeamMember['role']) => void;
  onUpdateMemberRole: (memberId: string, role: TeamMember['role']) => void;
  onRemoveMember: (memberId: string) => void;
  onResendInvitation: (invitationId: string) => void;
  onCancelInvitation: (invitationId: string) => void;
  className?: string;
  currentUserRole?: TeamMember['role'];
}

export function TeamManagement({
  members,
  invitations,
  onInviteMember,
  onUpdateMemberRole,
  onRemoveMember,
  onResendInvitation,
  onCancelInvitation,
  className,
  currentUserRole = 'member',
}: TeamManagementProps) {
  const [activeTab, setActiveTab] = React.useState<'members' | 'invitations'>('members');
  const [showInviteModal, setShowInviteModal] = React.useState(false);
  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteRole, setInviteRole] = React.useState<TeamMember['role']>('member');
  const [searchQuery, setSearchQuery] = React.useState('');

  const canInvite = currentUserRole === 'owner' || currentUserRole === 'admin';
  const canManageMembers = currentUserRole === 'owner' || currentUserRole === 'admin';

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const pendingInvitations = invitations.filter((inv) => inv.status === 'pending');

  const handleInvite = () => {
    if (inviteEmail && inviteRole) {
      onInviteMember(inviteEmail, inviteRole);
      setInviteEmail('');
      setInviteRole('member');
      setShowInviteModal(false);
    }
  };

  const getRoleColor = (role: TeamMember['role']) => {
    switch (role) {
      case 'owner':
        return 'bg-purple-500/20 text-purple-400';
      case 'admin':
        return 'bg-red-500/20 text-red-400';
      case 'member':
        return 'bg-blue-500/20 text-blue-400';
      case 'viewer':
        return 'bg-gray-500/20 text-gray-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getStatusColor = (status: TeamMember['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'suspended':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatLastActive = (date?: Date) => {
    if (!date) return 'Jamais';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Aujourd'hui";
    if (days === 1) return 'Hier';
    if (days < 7) return `Il y a ${days} jours`;
    return formatDate(date);
  };

  return (
    <div className={twMerge('max-w-6xl mx-auto p-6', className)}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Gestion d'équipe</h1>
            <p className="text-white/70">Gérez les membres de votre équipe et leurs permissions</p>
          </div>
          {canInvite && <Button onClick={() => setShowInviteModal(true)}>Inviter un membre</Button>}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">{members.length}</div>
            <div className="text-sm text-white/70">Membres actifs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">{pendingInvitations.length}</div>
            <div className="text-sm text-white/70">Invitations en attente</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">
              {members.filter((m) => m.role === 'admin' || m.role === 'owner').length}
            </div>
            <div className="text-sm text-white/70">Administrateurs</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-white">
              {members.filter((m) => m.status === 'active').length}
            </div>
            <div className="text-sm text-white/70">En ligne</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-1 border-b border-cosmic-border">
          <button
            onClick={() => setActiveTab('members')}
            className={twMerge(
              'px-4 py-2 text-sm font-medium rounded-t-lg transition-colors',
              activeTab === 'members'
                ? 'text-white border-b-2 border-cosmic-primary bg-cosmic-surface/50'
                : 'text-white/70 hover:text-white hover:bg-cosmic-surface/30',
            )}
          >
            Membres ({members.length})
          </button>
          <button
            onClick={() => setActiveTab('invitations')}
            className={twMerge(
              'px-4 py-2 text-sm font-medium rounded-t-lg transition-colors',
              activeTab === 'invitations'
                ? 'text-white border-b-2 border-cosmic-primary bg-cosmic-surface/50'
                : 'text-white/70 hover:text-white hover:bg-cosmic-surface/30',
            )}
          >
            Invitations ({pendingInvitations.length})
          </button>
        </nav>
      </div>

      {/* Content */}
      {activeTab === 'members' && (
        <div className="space-y-6">
          {/* Search */}
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Rechercher un membre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>

          {/* Members List */}
          <Card>
            <CardHeader>
              <CardTitle>Membres de l'équipe</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-cosmic-border">
                {filteredMembers.map((member) => (
                  <div key={member.id} className="p-4 hover:bg-cosmic-surface/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar src={member.avatar} alt={member.name} size="md" />
                        <div>
                          <div className="font-medium text-white">{member.name}</div>
                          <div className="text-sm text-white/70">{member.email}</div>
                          <div className="text-xs text-white/50">
                            Rejoint le {formatDate(member.joinedAt)} • Dernière activité:{' '}
                            {formatLastActive(member.lastActive)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <Badge className={getRoleColor(member.role)}>
                          {member.role === 'owner' && 'Propriétaire'}
                          {member.role === 'admin' && 'Administrateur'}
                          {member.role === 'member' && 'Membre'}
                          {member.role === 'viewer' && 'Observateur'}
                        </Badge>

                        <Badge className={getStatusColor(member.status)}>
                          {member.status === 'active' && 'Actif'}
                          {member.status === 'pending' && 'En attente'}
                          {member.status === 'suspended' && 'Suspendu'}
                        </Badge>

                        {canManageMembers && member.role !== 'owner' && (
                          <div className="flex items-center space-x-2">
                            <select
                              value={member.role}
                              onChange={(e) =>
                                onUpdateMemberRole(member.id, e.target.value as TeamMember['role'])
                              }
                              className="px-2 py-1 bg-cosmic-surface border border-cosmic-border rounded text-sm text-white"
                            >
                              <option value="admin">Administrateur</option>
                              <option value="member">Membre</option>
                              <option value="viewer">Observateur</option>
                            </select>

                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onRemoveMember(member.id)}
                              className="text-red-400 hover:text-red-300"
                            >
                              Supprimer
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'invitations' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invitations en attente</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {pendingInvitations.length === 0 ? (
                <div className="p-8 text-center text-white/50">
                  <p>Aucune invitation en attente</p>
                </div>
              ) : (
                <div className="divide-y divide-cosmic-border">
                  {pendingInvitations.map((invitation) => (
                    <div
                      key={invitation.id}
                      className="p-4 hover:bg-cosmic-surface/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">{invitation.email}</div>
                          <div className="text-sm text-white/70">
                            Invité par {invitation.invitedBy} le {formatDate(invitation.invitedAt)}
                          </div>
                          <div className="text-xs text-white/50">
                            Expire le {formatDate(invitation.expiresAt)}
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Badge className={getRoleColor(invitation.role)}>
                            {invitation.role === 'admin' && 'Administrateur'}
                            {invitation.role === 'member' && 'Membre'}
                            {invitation.role === 'viewer' && 'Observateur'}
                          </Badge>

                          {canManageMembers && (
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onResendInvitation(invitation.id)}
                              >
                                Renvoyer
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => onCancelInvitation(invitation.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                Annuler
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Invite Modal */}
      <Modal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Inviter un membre"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">Adresse email</label>
            <Input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="membre@exemple.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Rôle</label>
            <select
              value={inviteRole}
              onChange={(e) => setInviteRole(e.target.value as TeamMember['role'])}
              className="w-full px-3 py-2 bg-cosmic-surface border border-cosmic-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-primary"
            >
              <option value="admin">Administrateur</option>
              <option value="member">Membre</option>
              <option value="viewer">Observateur</option>
            </select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowInviteModal(false)}>
              Annuler
            </Button>
            <Button onClick={handleInvite} disabled={!inviteEmail}>
              Envoyer l'invitation
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
