'use client';

import * as React from 'react';
import { useState } from 'react';
import { CodeBlock } from '../../../components/code-block';
import { NotificationsCenter } from 'cosmic-ui-mars';
import { Button } from 'cosmic-ui-mars';
import { Bell, Check, X, Info, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

export default function NotificationsCenterPage() {
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
      title: 'Erreur système',
      message: 'Une erreur est survenue lors de la sauvegarde',
      type: 'error' as const,
      timestamp: new Date(Date.now() - 1200000),
      read: true,
      action: {
        label: 'Réessayer',
        onClick: () => console.log('Réessayer'),
      },
      dismissible: true,
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  const dismissAll = () => {
    setNotifications([]);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">NotificationsCenter</h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Centre de notifications pour afficher et gérer les notifications de l'application.
        </p>
      </div>

      {/* Installation */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Installation</h2>
        <CodeBlock filePath="package.json">pnpm add cosmic-ui-mars</CodeBlock>
      </div>

      {/* Usage basique */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Usage basique</h2>
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Exemple</h3>
            <div className="p-6 bg-muted/30 rounded-lg border">
              <div className="space-y-4">
                <Button onClick={() => setIsOpen(true)}>
                  <Bell className="w-4 h-4 mr-2" />
                  Ouvrir les notifications
                </Button>
                <p className="text-sm text-muted-foreground">
                  {notifications.filter(n => !n.read).length} notification(s) non lue(s)
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium mb-4 text-foreground">Code</h3>
            <CodeBlock language="typescript" filePath="components/NotificationsCenterExample.tsx" showPackageManager={false}>
{`import { NotificationsCenter } from 'cosmic-ui-mars';
import { useState } from 'react';

const [notifications, setNotifications] = useState([
  {
    id: '1',
    title: 'Nouveau message',
    message: 'Vous avez reçu un nouveau message',
    type: 'info',
    timestamp: new Date(),
    read: false,
    dismissible: true,
  },
]);

const [isOpen, setIsOpen] = useState(false);

<NotificationsCenter
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  notifications={notifications}
  onMarkAsRead={(id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }}
  onDismiss={(id) => {
    setNotifications(prev => 
      prev.filter(n => n.id !== id)
    );
  }}
/>`}
            </CodeBlock>
          </div>
        </div>
      </div>

      {/* Variants */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Variants</h2>
        <div className="space-y-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Centre avec filtres</h3>
              <p className="text-muted-foreground">Centre avec filtres par type de notification.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="space-y-4">
                  <Button onClick={() => setIsOpen(true)}>
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications avec filtres
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/FilteredNotificationsCenter.tsx" showPackageManager={false}>
{`export default function App\docs\components\notificationsCenter\page.tsxExample() {
  <NotificationsCenter
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  notifications={notifications}
  onMarkAsRead={markAsRead}
  onDismiss={dismissNotification}
  showFilters
  filterOptions={{
    types: ['info', 'success', 'warning', 'error'],
    readStatus: ['all', 'unread', 'read']
  }}
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Centre avec actions groupées</h3>
              <p className="text-muted-foreground">Centre avec actions pour marquer tout comme lu.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="space-y-4">
                  <Button onClick={() => setIsOpen(true)}>
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications avec actions
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/ActionableNotificationsCenter.tsx" showPackageManager={false}>
{`export default function App\docs\components\notificationsCenter\page.tsxExample() {
  <NotificationsCenter
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  notifications={notifications}
  onMarkAsRead={markAsRead}
  onDismiss={dismissNotification}
  onMarkAllAsRead={markAllAsRead}
  onDismissAll={dismissAll}
  showBulkActions
/>
}`}
              </CodeBlock>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Centre compact</h3>
              <p className="text-muted-foreground">Centre avec style compact.</p>
              <div className="p-6 bg-muted/30 rounded-lg border">
                <div className="space-y-4">
                  <Button onClick={() => setIsOpen(true)}>
                    <Bell className="w-4 h-4 mr-2" />
                    Notifications compactes
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <CodeBlock language="typescript" filePath="components/CompactNotificationsCenter.tsx" showPackageManager={false}>
{`export default function App\docs\components\notificationsCenter\page.tsxExample() {
  <NotificationsCenter
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  notifications={notifications}
  onMarkAsRead={markAsRead}
  onDismiss={dismissNotification}
  variant="compact"
/>
}`}
              </CodeBlock>
            </div>
          </div>
        </div>
      </div>

      {/* Référence API */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-foreground">Référence API</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-border rounded-lg">
            <thead>
              <tr className="bg-muted/50">
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Prop</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Type</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Défaut</th>
                <th className="border border-border px-4 py-3 text-left font-medium text-foreground">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">isOpen</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">État d'ouverture du centre</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onClose</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">() => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback lors de la fermeture</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">notifications</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Notification[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">[]</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Liste des notifications</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onMarkAsRead</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(id: string) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback pour marquer comme lu</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">onDismiss</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">(id: string) => void</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">-</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Callback pour supprimer</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showFilters</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher les filtres</td>
              </tr>
              <tr>
                <td className="border border-border px-4 py-3 font-mono text-sm">showBulkActions</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">boolean</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">false</td>
                <td className="border border-border px-4 py-3 text-sm text-muted-foreground">Afficher les actions groupées</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Conseils d'utilisation */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-blue-800 dark:text-blue-200 font-semibold mb-2">
          💡 Conseils d'utilisation
        </h3>
        <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-sm">
          <li>• Utilisez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">types de notification</code> appropriés</li>
          <li>• Ajoutez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">actions</code> pour l'interaction</li>
          <li>• Implémentez des <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">filtres</code> pour organiser</li>
          <li>• Permettez la <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">suppression</code> des notifications</li>
          <li>• Respectez les <code className="bg-blue-100 dark:bg-blue-800 px-1 rounded">guidelines d'accessibilité</code></li>
        </ul>
      </div>

      {/* NotificationsCenter Component */}
      <NotificationsCenter
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onDismiss={dismissNotification}
        onMarkAllAsRead={markAllAsRead}
        onDismissAll={dismissAll}
        showBulkActions
      />
    </div>
  );
}