import type { Meta, StoryObj } from '@storybook/react';
import { NotificationsCenter, useNotifications } from '../components/notifications-center';
import { Button } from '../components/button';
import { useState } from 'react';

const meta: Meta<typeof NotificationsCenter> = {
  title: 'Components/NotificationsCenter',
  component: NotificationsCenter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const sampleNotifications = [
  {
    id: '1',
    title: 'Nouveau message',
    message: 'Vous avez reçu un nouveau message de Marie Martin',
    type: 'info' as const,
    timestamp: new Date(Date.now() - 5 * 60000), // 5 minutes ago
    read: false,
    avatar:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    action: {
      label: 'Voir le message',
      onClick: () => console.log('View message'),
    },
  },
  {
    id: '2',
    title: 'Tâche terminée',
    message: 'La tâche "Mise à jour du dashboard" a été terminée avec succès',
    type: 'success' as const,
    timestamp: new Date(Date.now() - 30 * 60000), // 30 minutes ago
    read: false,
  },
  {
    id: '3',
    title: 'Alerte système',
    message: 'Votre espace de stockage atteint 85% de sa capacité',
    type: 'warning' as const,
    timestamp: new Date(Date.now() - 2 * 3600000), // 2 hours ago
    read: true,
    action: {
      label: "Gérer l'espace",
      onClick: () => console.log('Manage storage'),
    },
  },
  {
    id: '4',
    title: 'Erreur de connexion',
    message: 'Impossible de se connecter au serveur de base de données',
    type: 'error' as const,
    timestamp: new Date(Date.now() - 4 * 3600000), // 4 hours ago
    read: true,
  },
  {
    id: '5',
    title: 'Mise à jour disponible',
    message: "Une nouvelle version de l'application est disponible",
    type: 'system' as const,
    timestamp: new Date(Date.now() - 24 * 3600000), // 1 day ago
    read: true,
    action: {
      label: 'Mettre à jour',
      onClick: () => console.log('Update app'),
    },
  },
];

function NotificationsCenterDemo() {
  const { notifications, addNotification, markAsRead, markAllAsRead, dismiss, dismissAll } =
    useNotifications();

  // Initialize with sample notifications
  React.useEffect(() => {
    if (notifications.length === 0) {
      sampleNotifications.forEach((notification) => {
        addNotification(notification);
      });
    }
  }, [notifications.length, addNotification]);

  const handleAddNotification = () => {
    const types = ['info', 'success', 'warning', 'error', 'system'] as const;
    const randomType = types[Math.floor(Math.random() * types.length)];

    addNotification({
      title: 'Nouvelle notification',
      message: 'Ceci est une notification de test ajoutée dynamiquement',
      type: randomType,
    });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Notifications Center</h2>
          <p className="text-white/70">Centre de notifications avec gestion des états et actions</p>
        </div>
        <Button onClick={handleAddNotification}>Ajouter une notification</Button>
      </div>

      <div className="flex justify-center">
        <NotificationsCenter
          notifications={notifications}
          onMarkAsRead={markAsRead}
          onMarkAllAsRead={markAllAsRead}
          onDismiss={dismiss}
          onDismissAll={dismissAll}
          maxHeight={500}
        />
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <NotificationsCenterDemo />,
};

export const WithUnreadCount: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(sampleNotifications);

    const markAsRead = (id: string) => {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    };

    const markAllAsRead = () => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const dismiss = (id: string) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const dismissAll = () => {
      setNotifications([]);
    };

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Avec compteur de non lues</h3>
          <p className="text-white/70 text-sm">
            Le badge rouge affiche le nombre de notifications non lues
          </p>
        </div>

        <div className="flex justify-center">
          <NotificationsCenter
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
            onDismiss={dismiss}
            onDismissAll={dismissAll}
            showUnreadCount={true}
          />
        </div>
      </div>
    );
  },
};

export const WithoutUnreadCount: Story = {
  render: () => {
    const [notifications, setNotifications] = useState(sampleNotifications);

    const markAsRead = (id: string) => {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    };

    const markAllAsRead = () => {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    const dismiss = (id: string) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    const dismissAll = () => {
      setNotifications([]);
    };

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Sans compteur de non lues</h3>
          <p className="text-white/70 text-sm">Le badge de comptage est désactivé</p>
        </div>

        <div className="flex justify-center">
          <NotificationsCenter
            notifications={notifications}
            onMarkAsRead={markAsRead}
            onMarkAllAsRead={markAllAsRead}
            onDismiss={dismiss}
            onDismissAll={dismissAll}
            showUnreadCount={false}
          />
        </div>
      </div>
    );
  },
};

export const EmptyState: Story = {
  render: () => {
    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">État vide</h3>
          <p className="text-white/70 text-sm">Affichage quand il n'y a aucune notification</p>
        </div>

        <div className="flex justify-center">
          <NotificationsCenter
            notifications={[]}
            onMarkAsRead={() => {}}
            onMarkAllAsRead={() => {}}
            onDismiss={() => {}}
            onDismissAll={() => {}}
          />
        </div>
      </div>
    );
  },
};

export const AllRead: Story = {
  render: () => {
    const allReadNotifications = sampleNotifications.map((n) => ({ ...n, read: true }));

    return (
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-white mb-2">Toutes lues</h3>
          <p className="text-white/70 text-sm">Toutes les notifications sont marquées comme lues</p>
        </div>

        <div className="flex justify-center">
          <NotificationsCenter
            notifications={allReadNotifications}
            onMarkAsRead={() => {}}
            onMarkAllAsRead={() => {}}
            onDismiss={() => {}}
            onDismissAll={() => {}}
          />
        </div>
      </div>
    );
  },
};
