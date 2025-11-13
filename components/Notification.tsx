
import React, { useEffect, useState } from 'react';
import { Notification as NotificationType } from '../types';
import { WarningIcon } from './icons/WarningIcon';
import { ErrorIcon } from './icons/ErrorIcon';
import { CloseIcon } from './icons/CloseIcon';

interface NotificationProps {
  notification: NotificationType;
  onDismiss: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({ notification, onDismiss }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Animate in
    setShow(true);

    // Auto-dismiss after 10 seconds
    const timer = setTimeout(() => {
      handleDismiss();
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setShow(false);
    // Allow time for fade-out animation before removing from DOM
    setTimeout(() => onDismiss(notification.id), 300);
  };

  const config = {
    Warning: {
      icon: <WarningIcon className="w-6 h-6 text-yellow-400" />,
      borderColor: 'border-yellow-400/50',
      bgColor: 'bg-yellow-400/10',
    },
    Error: {
      icon: <ErrorIcon className="w-6 h-6 text-red-500" />,
      borderColor: 'border-red-500/50',
      bgColor: 'bg-red-500/10',
    },
  };

  const { icon, borderColor, bgColor } = config[notification.type];

  return (
    <div
      role="alert"
      className={`
        w-full p-4 rounded-lg shadow-lg border backdrop-blur-md
        transition-all duration-300 ease-in-out
        ${borderColor} ${bgColor}
        ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{icon}</div>
        <div className="ml-3 w-0 flex-1">
          <p className="text-sm font-medium text-gray-100">
            {notification.message}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {new Date(notification.timestamp).toLocaleTimeString()}
          </p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={handleDismiss}
            className="inline-flex rounded-md text-gray-400 hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-cyan-500"
            aria-label="Dismiss notification"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
