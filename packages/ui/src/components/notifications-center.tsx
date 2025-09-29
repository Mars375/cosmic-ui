'use client';

import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import { Button } from './button';
import { Badge } from './badge';
import { Avatar } from './avatar';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'system';
  timestamp: Date;
  read: boolean;
  avatar?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
}

export interface NotificationsCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDismiss: (id: string) => void;
  onDismissAll: () => void;
  className?: string;
  maxHeight?: number;
  showUnreadCount?: boolean;
}

export function NotificationsCenter({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDismiss,
  onDismissAll,
  className,
  maxHeight = 400,
  showUnreadCount = true,
}: NotificationsCenterProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  const getTypeIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return (
          <svg
            className="w-5 h-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'warning':
        return (
          <svg
            className="w-5 h-5 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        );
      case 'error':
        return (
          <svg
            className="w-5 h-5 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'system':
        return (
          <svg
            className="w-5 h-5 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
        );
      default:
        return (
          <svg
            className="w-5 h-5 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `Il y a ${minutes} min`;
    if (hours < 24) return `Il y a ${hours}h`;
    if (days < 7) return `Il y a ${days}j`;
    return timestamp.toLocaleDateString('fr-FR');
  };

  const sortedNotifications = [...notifications].sort((a, b) => {
    // Unread first, then by timestamp
    if (a.read !== b.read) return a.read ? 1 : -1;
    return b.timestamp.getTime() - a.timestamp.getTime();
  });

  return (
    <div className={twMerge('relative', className)}>
      {/* Bell Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/60"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-5 5v-5zM4.5 5.5a3 3 0 116 0v6a3 3 0 11-6 0v-6zM4.5 5.5a3 3 0 116 0v6a3 3 0 11-6 0v-6z"
          />
        </svg>

        {showUnreadCount && unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-1 -right-1 min-w-[20px] h-5 text-xs flex items-center justify-center"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </Badge>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />

          {/* Panel */}
          <div className="absolute right-0 top-full mt-2 w-96 bg-popover border border-input rounded-lg shadow-xl z-50 text-foreground">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <h3 className="font-semibold">Notifications</h3>
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    {unreadCount} non lues
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={onMarkAllAsRead} className="text-xs">
                    Tout marquer comme lu
                  </Button>
                )}
                {notifications.length > 0 && (
                  <Button variant="ghost" size="sm" onClick={onDismissAll} className="text-xs">
                    Tout supprimer
                  </Button>
                )}
              </div>
            </div>

            {/* Notifications List */}
            <div className="overflow-y-auto" style={{ maxHeight: `${maxHeight}px` }}>
              {sortedNotifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-white/30"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 17h5l-5 5v-5zM4.5 5.5a3 3 0 116 0v6a3 3 0 11-6 0v-6zM4.5 5.5a3 3 0 116 0v6a3 3 0 11-6 0v-6z"
                    />
                  </svg>
                  <p>Aucune notification</p>
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {sortedNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={twMerge(
                        'p-4 hover:bg-muted/60 transition-colors',
                        !notification.read && 'bg-primary/10',
                      )}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Avatar or Icon */}
                        <div className="flex-shrink-0">
                          {notification.avatar ? (
                            <Avatar src={notification.avatar} alt="" size="sm" />
                          ) : (
                            <div className="w-8 h-8 flex items-center justify-center">
                              {getTypeIcon(notification.type)}
                            </div>
                          )}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p
                                className={twMerge(
                                  'text-sm font-medium',
                                  !notification.read ? '' : 'text-muted-foreground',
                                )}
                              >
                                {notification.title}
                              </p>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-2">
                                {formatTimestamp(notification.timestamp)}
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-2 ml-2">
                              {!notification.read && (
                                <button
                                  onClick={() => onMarkAsRead(notification.id)}
                                  className="text-xs text-primary hover:underline"
                                >
                                  Marquer comme lu
                                </button>
                              )}
                              {notification.dismissible !== false && (
                                <button
                                  onClick={() => onDismiss(notification.id)}
                                  className="text-xs text-muted-foreground hover:text-foreground"
                                >
                                  ✕
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Action Button */}
                          {notification.action && (
                            <div className="mt-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={notification.action.onClick}
                                className="text-xs"
                              >
                                {notification.action.label}
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-xs"
                  onClick={() => setIsOpen(false)}
                >
                  Voir toutes les notifications
                </Button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// Hook for managing notifications
export function useNotifications() {
  const [notifications, setNotifications] = React.useState<Notification[]>([]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

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

  const clearRead = () => {
    setNotifications((prev) => prev.filter((n) => !n.read));
  };

  return {
    notifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    dismiss,
    dismissAll,
    clearRead,
  };
}
