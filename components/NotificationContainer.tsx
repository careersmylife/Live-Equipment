
import React from 'react';
import { Notification as NotificationType } from '../types';
import Notification from './Notification';

interface NotificationContainerProps {
  notifications: NotificationType[];
  onDismiss: (id: string) => void;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({ notifications, onDismiss }) => {
  return (
    <div aria-live="polite" aria-atomic="true" className="fixed top-4 right-4 w-full max-w-sm z-50 space-y-3">
      {notifications.map(notification => (
        <Notification key={notification.id} notification={notification} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

export default NotificationContainer;
