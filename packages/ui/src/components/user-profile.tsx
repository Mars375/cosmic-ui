'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';
import { Input } from './input';
import { Avatar } from './avatar';
import { Card, CardContent, CardHeader, CardTitle } from './card';

export interface UserProfileData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  company?: string;
  role?: string;
  phone?: string;
  timezone?: string;
  language?: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
    security: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
  };
}

export interface UserProfileProps {
  user: UserProfileData;
  onSave: (user: UserProfileData) => void;
  onAvatarChange?: (file: File) => void;
  className?: string;
  readOnly?: boolean;
}

export function UserProfile({
  user,
  onSave,
  onAvatarChange,
  className,
  readOnly = false,
}: UserProfileProps) {
  const [formData, setFormData] = React.useState<UserProfileData>(user);
  const [isEditing, setIsEditing] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'profile' | 'settings' | 'privacy' | 'security'>(
    'profile',
  );

  const handleInputChange = (field: keyof UserProfileData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleNestedChange = (section: keyof UserProfileData, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    onSave(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onAvatarChange) {
      onAvatarChange(file);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profil', icon: '👤' },
    { id: 'settings', label: 'Paramètres', icon: '⚙️' },
    { id: 'privacy', label: 'Confidentialité', icon: '🔒' },
    { id: 'security', label: 'Sécurité', icon: '🛡️' },
  ] as const;

  return (
    <div className={twMerge('max-w-4xl mx-auto p-6', className)}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Mon Profil</h1>
            <p className="text-white/70">Gérez vos informations personnelles et paramètres</p>
          </div>
          {!readOnly && (
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={handleCancel}>
                    Annuler
                  </Button>
                  <Button onClick={handleSave}>Sauvegarder</Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>Modifier le profil</Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <nav className="flex space-x-1 border-b border-cosmic-border">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={twMerge(
                'flex items-center space-x-2 px-4 py-2 text-sm font-medium rounded-t-lg transition-colors',
                activeTab === tab.id
                  ? 'text-white border-b-2 border-cosmic-primary bg-cosmic-surface/50'
                  : 'text-white/70 hover:text-white hover:bg-cosmic-surface/30',
              )}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Avatar Section */}
            <Card>
              <CardHeader>
                <CardTitle>Photo de profil</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="relative inline-block">
                  <Avatar src={formData.avatar} alt={formData.name} size="xl" className="mb-4" />
                  {isEditing && !readOnly && (
                    <label className="absolute bottom-0 right-0 bg-cosmic-primary text-white p-2 rounded-full cursor-pointer hover:bg-cosmic-primary/80">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-sm text-white/70">JPG, PNG ou GIF. Max 2MB.</p>
              </CardContent>
            </Card>

            {/* Basic Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informations de base</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Nom complet
                      </label>
                      <Input
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!isEditing || readOnly}
                        placeholder="Votre nom complet"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing || readOnly}
                        placeholder="votre@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Biographie</label>
                    <textarea
                      value={formData.bio || ''}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      disabled={!isEditing || readOnly}
                      placeholder="Parlez-nous de vous..."
                      className="w-full px-3 py-2 bg-cosmic-surface border border-cosmic-border rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cosmic-primary"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Informations professionnelles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">
                        Entreprise
                      </label>
                      <Input
                        value={formData.company || ''}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        disabled={!isEditing || readOnly}
                        placeholder="Nom de l'entreprise"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Rôle</label>
                      <Input
                        value={formData.role || ''}
                        onChange={(e) => handleInputChange('role', e.target.value)}
                        disabled={!isEditing || readOnly}
                        placeholder="Votre rôle"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Site web</label>
                      <Input
                        value={formData.website || ''}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        disabled={!isEditing || readOnly}
                        placeholder="https://votre-site.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2">Téléphone</label>
                      <Input
                        value={formData.phone || ''}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing || readOnly}
                        placeholder="+33 1 23 45 67 89"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Préférences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">
                      Fuseau horaire
                    </label>
                    <select
                      value={formData.timezone || 'Europe/Paris'}
                      onChange={(e) => handleInputChange('timezone', e.target.value)}
                      disabled={!isEditing || readOnly}
                      className="w-full px-3 py-2 bg-cosmic-surface border border-cosmic-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-primary"
                    >
                      <option value="Europe/Paris">Europe/Paris</option>
                      <option value="America/New_York">America/New_York</option>
                      <option value="America/Los_Angeles">America/Los_Angeles</option>
                      <option value="Asia/Tokyo">Asia/Tokyo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Langue</label>
                    <select
                      value={formData.language || 'fr'}
                      onChange={(e) => handleInputChange('language', e.target.value)}
                      disabled={!isEditing || readOnly}
                      className="w-full px-3 py-2 bg-cosmic-surface border border-cosmic-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-primary"
                    >
                      <option value="fr">Français</option>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {Object.entries(formData.notifications).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-white">
                          {key === 'email' && 'Notifications par email'}
                          {key === 'push' && 'Notifications push'}
                          {key === 'marketing' && 'Emails marketing'}
                          {key === 'security' && 'Alertes de sécurité'}
                        </div>
                        <div className="text-sm text-white/70">
                          {key === 'email' && 'Recevez des notifications par email'}
                          {key === 'push' && 'Recevez des notifications push'}
                          {key === 'marketing' && 'Recevez nos offres et actualités'}
                          {key === 'security' && 'Alertes importantes de sécurité'}
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => handleNestedChange('notifications', key, e.target.checked)}
                        disabled={!isEditing || readOnly}
                        className="rounded border-cosmic-border"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Privacy Tab */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visibilité du profil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Qui peut voir votre profil
                  </label>
                  <select
                    value={formData.privacy.profileVisibility}
                    onChange={(e) =>
                      handleNestedChange('privacy', 'profileVisibility', e.target.value)
                    }
                    disabled={!isEditing || readOnly}
                    className="w-full px-3 py-2 bg-cosmic-surface border border-cosmic-border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cosmic-primary"
                  >
                    <option value="public">Public</option>
                    <option value="friends">Amis uniquement</option>
                    <option value="private">Privé</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations visibles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {Object.entries(formData.privacy)
                    .filter(([key]) => key !== 'profileVisibility')
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-white">
                            {key === 'showEmail' && "Afficher l'email"}
                            {key === 'showPhone' && 'Afficher le téléphone'}
                            {key === 'showLocation' && 'Afficher la localisation'}
                          </div>
                          <div className="text-sm text-white/70">
                            {key === 'showEmail' && 'Rendre votre email visible sur votre profil'}
                            {key === 'showPhone' &&
                              'Rendre votre téléphone visible sur votre profil'}
                            {key === 'showLocation' &&
                              'Rendre votre localisation visible sur votre profil'}
                          </div>
                        </div>
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={(e) => handleNestedChange('privacy', key, e.target.checked)}
                          disabled={!isEditing || readOnly}
                          className="rounded border-cosmic-border"
                        />
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Changer le mot de passe</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Mot de passe actuel
                  </label>
                  <Input
                    type="password"
                    placeholder="Votre mot de passe actuel"
                    disabled={readOnly}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Nouveau mot de passe
                  </label>
                  <Input type="password" placeholder="Nouveau mot de passe" disabled={readOnly} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    Confirmer le nouveau mot de passe
                  </label>
                  <Input
                    type="password"
                    placeholder="Confirmer le nouveau mot de passe"
                    disabled={readOnly}
                  />
                </div>
                <Button disabled={readOnly}>Changer le mot de passe</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authentification à deux facteurs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">2FA activé</div>
                    <div className="text-sm text-white/70">
                      Ajoutez une couche de sécurité supplémentaire
                    </div>
                  </div>
                  <Button variant="outline" disabled={readOnly}>
                    Configurer
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sessions actives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-cosmic-surface/50 rounded-lg">
                    <div>
                      <div className="font-medium text-white">Chrome sur Windows</div>
                      <div className="text-sm text-white/70">Paris, France • Actif maintenant</div>
                    </div>
                    <Button variant="outline" size="sm" disabled={readOnly}>
                      Déconnecter
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-cosmic-surface/50 rounded-lg">
                    <div>
                      <div className="font-medium text-white">Safari sur iPhone</div>
                      <div className="text-sm text-white/70">Paris, France • Il y a 2 heures</div>
                    </div>
                    <Button variant="outline" size="sm" disabled={readOnly}>
                      Déconnecter
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
