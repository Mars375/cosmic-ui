'use client';

import { useState } from 'react';
import { NotificationsCenter } from '@cosmic-ui/ui';
import { Button } from '@cosmic-ui/ui';
import { Bell, Check, X, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

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

export default function NotificationsCenterPage() {
  const [showCode, setShowCode] = useState(false);
  const [showCodeVariants, setShowCodeVariants] = useState(false);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Nouveau message',
      message: 'Vous avez reçu un nouveau message de Alice Martin',
      type: 'info' as const,
      timestamp: new Date(Date.now() - 300000),
      read: false,
      avatar: '/avatars/alice.jpg',
      action: {
        label: 'Voir',
        onClick: () => console.log('Voir message'),
      },
      dismissible: true,
    },
    {
      id: '2',
      title: 'Tâche terminée',
      message: 'La tâche "Concevoir l\'interface" a été marquée comme terminée',
      type: 'success' as const,
      timestamp: new Date(Date.now() - 600000),
      read: false,
      action: {
        label: 'Voir la tâche',
        onClick: () => console.log('Voir tâche'),
      },
      dismissible: true,
    },
    {
      id: '3',
      title: 'Attention requise',
      message: 'Votre abonnement expire dans 3 jours',
      type: 'warning' as const,
      timestamp: new Date(Date.now() - 900000),
      read: true,
      action: {
        label: 'Renouveler',
        onClick: () => console.log('Renouveler abonnement'),
      },
      dismissible: true,
    },
    {
      id: '4',
      title: 'Erreur de connexion',
      message: 'Impossible de se connecter au serveur. Vérifiez votre connexion.',
      type: 'error' as const,
      timestamp: new Date(Date.now() - 1200000),
      read: true,
      dismissible: true,
    },
    {
      id: '5',
      title: 'Mise à jour système',
      message: 'Une nouvelle version de l\'application est disponible',
      type: 'system' as const,
      timestamp: new Date(Date.now() - 1800000),
      read: true,
      action: {
        label: 'Mettre à jour',
        onClick: () => console.log('Mettre à jour'),
      },
      dismissible: false,
    },
  ]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedStates(prev => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleDismiss = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleDismissAll = () => {
    setNotifications(prev => prev.filter(notif => !notif.dismissible));
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
          <h1 className="text-4xl font-bold">NotificationsCenter</h1>
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
          Un composant de centre de notifications avec différents types et
          actions.
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
              <div className="p-4 w-full">
                <NotificationsCenter
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                  onDismiss={handleDismiss}
                  onDismissAll={handleDismissAll}
                  maxHeight={350}
                  showUnreadCount={true}
                />
              </div>
            ) : (
              <div className="w-full h-full">
                <CodeBlock
                  onCopy={() =>
                    handleCopy(
                      `import { NotificationsCenter } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyNotificationsCenter() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Nouveau message',
      message: 'Vous avez reçu un nouveau message de Alice Martin',
      type: 'info',
      timestamp: new Date(),
      read: false,
      avatar: '/avatars/alice.jpg',
      action: {
        label: 'Voir',
        onClick: () => console.log('Voir message'),
      },
      dismissible: true,
    },
    {
      id: '2',
      title: 'Tâche terminée',
      message: 'La tâche "Concevoir l\\'interface" a été marquée comme terminée',
      type: 'success',
      timestamp: new Date(),
      read: false,
      action: {
        label: 'Voir la tâche',
        onClick: () => console.log('Voir tâche'),
      },
      dismissible: true,
    },
    {
      id: '3',
      title: 'Attention requise',
      message: 'Votre abonnement expire dans 3 jours',
      type: 'warning',
      timestamp: new Date(),
      read: true,
      action: {
        label: 'Renouveler',
        onClick: () => console.log('Renouveler abonnement'),
      },
      dismissible: true,
    },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleDismiss = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleDismissAll = () => {
    setNotifications(prev => prev.filter(notif => !notif.dismissible));
  };

  return (
    <NotificationsCenter
      notifications={notifications}
      onMarkAsRead={handleMarkAsRead}
      onMarkAllAsRead={handleMarkAllAsRead}
      onDismiss={handleDismiss}
      onDismissAll={handleDismissAll}
      maxHeight={350}
      showUnreadCount={true}
    />
  );
}`,
                      'main'
                    )
                  }
                >
                  {`import { NotificationsCenter } from '@cosmic-ui/ui';
import { useState } from 'react';

export function MyNotificationsCenter() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      title: 'Nouveau message',
      message: 'Vous avez reçu un nouveau message de Alice Martin',
      type: 'info',
      timestamp: new Date(),
      read: false,
      avatar: '/avatars/alice.jpg',
      action: {
        label: 'Voir',
        onClick: () => console.log('Voir message'),
      },
      dismissible: true,
    },
    {
      id: '2',
      title: 'Tâche terminée',
      message: 'La tâche "Concevoir l\\'interface" a été marquée comme terminée',
      type: 'success',
      timestamp: new Date(),
      read: false,
      action: {
        label: 'Voir la tâche',
        onClick: () => console.log('Voir tâche'),
      },
      dismissible: true,
    },
    {
      id: '3',
      title: 'Attention requise',
      message: 'Votre abonnement expire dans 3 jours',
      type: 'warning',
      timestamp: new Date(),
      read: true,
      action: {
        label: 'Renouveler',
        onClick: () => console.log('Renouveler abonnement'),
      },
      dismissible: true,
    },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const handleDismiss = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleDismissAll = () => {
    setNotifications(prev => prev.filter(notif => !notif.dismissible));
  };

  return (
    <NotificationsCenter
      notifications={notifications}
      onMarkAsRead={handleMarkAsRead}
      onMarkAllAsRead={handleMarkAllAsRead}
      onDismiss={handleDismiss}
      onDismissAll={handleDismissAll}
      maxHeight={350}
      showUnreadCount={true}
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
              Le composant NotificationsCenter est déjà inclus dans le package
              @cosmic-ui/ui.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(`npm install @cosmic-ui/ui`, 'install')
              }
            >
              {`npm install @cosmic-ui/ui`}
            </CodeBlock>
          </div>
        </div>

        {/* Usage */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Utilisation</h2>
          <div className="bg-cosmic-card border border-cosmic-border rounded-lg p-4">
            <p className="text-cosmic-muted-foreground mb-4">
              Utilisez le composant pour créer un centre de notifications.
            </p>
            <CodeBlock
              onCopy={() =>
                handleCopy(
                  `import { NotificationsCenter } from '@cosmic-ui/ui';

const notifications = [
  {
    id: '1',
    title: 'Nouveau message',
    message: 'Vous avez reçu un nouveau message',
    type: 'info',
    timestamp: new Date(),
    read: false,
    dismissible: true,
  },
];

<NotificationsCenter
  notifications={notifications}
  onMarkAsRead={(id) => console.log('Mark as read:', id)}
  onMarkAllAsRead={() => console.log('Mark all as read')}
  onDismiss={(id) => console.log('Dismiss:', id)}
  onDismissAll={() => console.log('Dismiss all')}
/>`,
                  'usage'
                )
              }
            >
              {`import { NotificationsCenter } from '@cosmic-ui/ui';

const notifications = [
  {
    id: '1',
    title: 'Nouveau message',
    message: 'Vous avez reçu un nouveau message',
    type: 'info',
    timestamp: new Date(),
    read: false,
    dismissible: true,
  },
];

<NotificationsCenter
  notifications={notifications}
  onMarkAsRead={(id) => console.log('Mark as read:', id)}
  onMarkAllAsRead={() => console.log('Mark all as read')}
  onDismiss={(id) => console.log('Dismiss:', id)}
  onDismissAll={() => console.log('Dismiss all')}
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
                <div className="p-4 w-full space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Sans compteur
                    </h3>
                    <NotificationsCenter
                      notifications={notifications.slice(0, 3)}
                      onMarkAsRead={handleMarkAsRead}
                      onMarkAllAsRead={handleMarkAllAsRead}
                      onDismiss={handleDismiss}
                      onDismissAll={handleDismissAll}
                      maxHeight={200}
                      showUnreadCount={false}
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-2">
                      Notifications simples
                    </h3>
                    <NotificationsCenter
                      notifications={notifications.slice(0, 2).map(notif => ({
                        ...notif,
                        action: undefined,
                        avatar: undefined,
                      }))}
                      onMarkAsRead={handleMarkAsRead}
                      onMarkAllAsRead={handleMarkAllAsRead}
                      onDismiss={handleDismiss}
                      onDismissAll={handleDismissAll}
                      maxHeight={150}
                      showUnreadCount={true}
                    />
                  </div>
                </div>
              ) : (
                <div className="w-full h-full">
                  <CodeBlock
                    onCopy={() =>
                      handleCopy(
                        `// Sans compteur
<NotificationsCenter
  notifications={notifications}
  onMarkAsRead={handleMarkAsRead}
  onMarkAllAsRead={handleMarkAllAsRead}
  onDismiss={handleDismiss}
  onDismissAll={handleDismissAll}
  showUnreadCount={false}
/>

// Notifications simples
<NotificationsCenter
  notifications={notifications.map(notif => ({
    ...notif,
    action: undefined,
    avatar: undefined,
  }))}
  onMarkAsRead={handleMarkAsRead}
  onMarkAllAsRead={handleMarkAllAsRead}
  onDismiss={handleDismiss}
  onDismissAll={handleDismissAll}
/>

// Avec actions
<NotificationsCenter
  notifications={notifications}
  onMarkAsRead={handleMarkAsRead}
  onMarkAllAsRead={handleMarkAllAsRead}
  onDismiss={handleDismiss}
  onDismissAll={handleDismissAll}
/>

// Types de notifications
const notificationTypes = [
  { type: 'info', title: 'Information', message: 'Message informatif' },
  { type: 'success', title: 'Succès', message: 'Opération réussie' },
  { type: 'warning', title: 'Attention', message: 'Attention requise' },
  { type: 'error', title: 'Erreur', message: 'Une erreur est survenue' },
  { type: 'system', title: 'Système', message: 'Notification système' },
];`,
                        'variants'
                      )
                    }
                  >
                    {`// Sans compteur
<NotificationsCenter
  notifications={notifications}
  onMarkAsRead={handleMarkAsRead}
  onMarkAllAsRead={handleMarkAllAsRead}
  onDismiss={handleDismiss}
  onDismissAll={handleDismissAll}
  showUnreadCount={false}
/>

// Notifications simples
<NotificationsCenter
  notifications={notifications.map(notif => ({
    ...notif,
    action: undefined,
    avatar: undefined,
  }))}
  onMarkAsRead={handleMarkAsRead}
  onMarkAllAsRead={handleMarkAllAsRead}
  onDismiss={handleDismiss}
  onDismissAll={handleDismissAll}
/>

// Avec actions
<NotificationsCenter
  notifications={notifications}
  onMarkAsRead={handleMarkAsRead}
  onMarkAllAsRead={handleMarkAllAsRead}
  onDismiss={handleDismiss}
  onDismissAll={handleDismissAll}
/>

// Types de notifications
const notificationTypes = [
  { type: 'info', title: 'Information', message: 'Message informatif' },
  { type: 'success', title: 'Succès', message: 'Opération réussie' },
  { type: 'warning', title: 'Attention', message: 'Attention requise' },
  { type: 'error', title: 'Erreur', message: 'Une erreur est survenue' },
  { type: 'system', title: 'Système', message: 'Notification système' },
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
