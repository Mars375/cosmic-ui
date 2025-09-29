'use client';

import { useState } from 'react';
import { UserProfile } from '@cosmic-ui/react';
import { Button } from '@cosmic-ui/react';
import { User, Mail, MapPin, Globe, Building, Phone, Clock, Globe2, Bell, Shield, Eye } from 'lucide-react';

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

export default function UserProfilePage() {
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

  const sampleUser = {
    id: '1',
    name: 'Alice Martin',
    email: 'alice.martin@example.com',
    avatar: '/avatars/alice.jpg',
    bio: 'Développeuse frontend passionnée par React et TypeScript. J\'aime créer des interfaces utilisateur intuitives et accessibles.',
    location: 'Paris, France',
    website: 'https://alice-martin.dev',
    company: 'TechCorp',
    role: 'Senior Frontend Developer',
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
      showEmail: true,
      showPhone: false,
      showLocation: true,
    },
  };

  const handleSave = (user: any) => {
    console.log('Save user:', user);
  };

  const handleAvatarChange = (file: File) => {
    console.log('Avatar changed:', file.name);
  };

  const simpleUser = {
    id: '1',
    name: 'Bob Dupont',
    email: 'bob@example.com',
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

  const complexUser = {
    id: '1',
    name: 'Charlie Bernard',
    email: 'charlie.bernard@company.com',
    avatar: '/avatars/charlie.jpg',
    bio: 'Full-stack developer with 5+ years of experience. Passionate about clean code, architecture, and team collaboration.',
    location: 'Lyon, France',
    website: 'https://charlie-bernard.com',
    company: 'InnovateTech',
    role: 'Lead Developer',
    phone: '+33 4 56 78 90 12',
    timezone: 'Europe/Paris',
    language: 'fr',
    notifications: {
      email: true,
      push: true,
      marketing: true,
      security: true,
    },
    privacy: {
      profileVisibility: 'friends' as const,
      showEmail: true,
      showPhone: true,
      showLocation: true,
    },
  };

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
          <h1 className="text-4xl font-bold">UserProfile</h1>
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
          Un composant de profil utilisateur avec informations personnelles,
          notifications et paramètres de confidentialité.
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
                <UserProfile
                  user={sampleUser}
                  onSave={handleSave}
                  onAvatarChange={handleAvatarChange}
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { UserProfile } from '@cosmic-ui/react';

export function MyUserProfile() {
  const user = {
    id: '1',
    name: 'Alice Martin',
    email: 'alice.martin@example.com',
    avatar: '/avatars/alice.jpg',
    bio: 'Développeuse frontend passionnée par React et TypeScript.',
    location: 'Paris, France',
    website: 'https://alice-martin.dev',
    company: 'TechCorp',
    role: 'Senior Frontend Developer',
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
      profileVisibility: 'public',
      showEmail: true,
      showPhone: false,
      showLocation: true,
    },
  };

  const handleSave = (user) => {
    console.log('Save user:', user);
  };

  const handleAvatarChange = (file) => {
    console.log('Avatar changed:', file.name);
  };

  return (
    <UserProfile
      user={user}
      onSave={handleSave}
      onAvatarChange={handleAvatarChange}
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { UserProfile } from '@cosmic-ui/react';

export function MyUserProfile() {
  const user = {
    id: '1',
    name: 'Alice Martin',
    email: 'alice.martin@example.com',
    avatar: '/avatars/alice.jpg',
    bio: 'Développeuse frontend passionnée par React et TypeScript.',
    location: 'Paris, France',
    website: 'https://alice-martin.dev',
    company: 'TechCorp',
    role: 'Senior Frontend Developer',
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
      profileVisibility: 'public',
      showEmail: true,
      showPhone: false,
      showLocation: true,
    },
  };

  const handleSave = (user) => {
    console.log('Save user:', user);
  };

  const handleAvatarChange = (file) => {
    console.log('Avatar changed:', file.name);
  };

  return (
    <UserProfile
      user={user}
      onSave={handleSave}
      onAvatarChange={handleAvatarChange}
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
              Le composant UserProfile est déjà inclus dans le package
              @cosmic-ui/react.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(`npm install @cosmic-ui/react`, 'install')
              }
            >
              {`npm install @cosmic-ui/react`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Utilisez le composant pour créer un profil utilisateur.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { UserProfile } from '@cosmic-ui/react';

const user = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  notifications: {
    email: true,
    push: false,
    marketing: false,
    security: true,
  },
  privacy: {
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
    showLocation: false,
  },
};

<UserProfile
  user={user}
  onSave={(user) => console.log('Save:', user)}
  onAvatarChange={(file) => console.log('Avatar:', file)}
/>`,
                  'usage'
                )
              }
            >
              {`import { UserProfile } from '@cosmic-ui/react';

const user = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  notifications: {
    email: true,
    push: false,
    marketing: false,
    security: true,
  },
  privacy: {
    profileVisibility: 'public',
    showEmail: true,
    showPhone: false,
    showLocation: false,
  },
};

<UserProfile
  user={user}
  onSave={(user) => console.log('Save:', user)}
  onAvatarChange={(file) => console.log('Avatar:', file)}
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
                      Profil simple
                    </h3>
                    <div className="max-h-[150px] overflow-y-auto">
                      <UserProfile
                        user={simpleUser}
                        onSave={handleSave}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Profil complet
                    </h3>
                    <div className="max-h-[150px] overflow-y-auto">
                      <UserProfile
                        user={complexUser}
                        onSave={handleSave}
                        onAvatarChange={handleAvatarChange}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Profil simple
<UserProfile
  user={{
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    notifications: {
      email: true,
      push: false,
      marketing: false,
      security: true,
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: true,
      showPhone: false,
      showLocation: false,
    },
  }}
  onSave={handleSave}
/>

// Profil complet
<UserProfile
  user={{
    id: '1',
    name: 'Alice Martin',
    email: 'alice@example.com',
    avatar: '/avatars/alice.jpg',
    bio: 'Développeuse frontend...',
    location: 'Paris, France',
    website: 'https://alice.dev',
    company: 'TechCorp',
    role: 'Senior Developer',
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
      profileVisibility: 'public',
      showEmail: true,
      showPhone: false,
      showLocation: true,
    },
  }}
  onSave={handleSave}
  onAvatarChange={handleAvatarChange}
/>

// Mode lecture seule
<UserProfile
  user={user}
  onSave={handleSave}
  readOnly={true}
/>

// Sans changement d'avatar
<UserProfile
  user={user}
  onSave={handleSave}
/>`,
                        'variants'
                      )
                    }
                  >
                    {`// Profil simple
<UserProfile
  user={{
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    notifications: {
      email: true,
      push: false,
      marketing: false,
      security: true,
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: true,
      showPhone: false,
      showLocation: false,
    },
  }}
  onSave={handleSave}
/>

// Profil complet
<UserProfile
  user={{
    id: '1',
    name: 'Alice Martin',
    email: 'alice@example.com',
    avatar: '/avatars/alice.jpg',
    bio: 'Développeuse frontend...',
    location: 'Paris, France',
    website: 'https://alice.dev',
    company: 'TechCorp',
    role: 'Senior Developer',
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
      profileVisibility: 'public',
      showEmail: true,
      showPhone: false,
      showLocation: true,
    },
  }}
  onSave={handleSave}
  onAvatarChange={handleAvatarChange}
/>

// Mode lecture seule
<UserProfile
  user={user}
  onSave={handleSave}
  readOnly={true}
/>

// Sans changement d'avatar
<UserProfile
  user={user}
  onSave={handleSave}
/>`}
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
