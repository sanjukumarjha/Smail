import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';

const Notification: React.FC = () => {
  const { notification, hideNotification } = useProjects();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear any existing timer when the notification changes
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Set a new timer to auto-hide the notification
    if (notification) {
      // Don't auto-hide if there's a persistent action like "Cancel" or "Undo"
      if (!notification.action) {
        timerRef.current = setTimeout(() => {
          hideNotification();
        }, 5000); // Hide after 5 seconds
      }
    }

    // Cleanup the timer if the component unmounts
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [notification, hideNotification]);
  
  if (!notification) {
    return null;
  }

  const handleActionClick = () => {
    if (notification?.action) {
      notification.action.callback();
    }
    // The hideNotification() is often called within the callback itself, but we can call it here too for safety.
    hideNotification();
  };

  return (
    <div className="notification-toast">
      <span>{notification.message}</span>
      {notification.action && (
        <button className="notification-toast__undo" onClick={handleActionClick}>
          {notification.action.label}
        </button>
      )}
      <button className="notification-toast__close" onClick={hideNotification}>
        <X size={18} />
      </button>
    </div>
  );
};

export default Notification;