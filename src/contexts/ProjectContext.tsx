import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { projectsData as initialProjectsData, Project } from '../data/projects';

// A more flexible type for notifications
interface NotificationState {
  message: string;
  action?: {
    label: string;
    callback: () => void;
  };
}

// Define the full shape of the context
interface ProjectContextType {
  projects: Project[];
  selectedProjects: string[];
  notification: NotificationState | null;
  isAllSelected: boolean;
  toggleStar: (id: string) => void;
  markAsRead: (id: string) => void;
  toggleReadStatus: (id: string) => void;
  archiveProject: (id: string) => void;
  unarchiveProject: (id: string) => void;
  toggleSelect: (id: string) => void;
  toggleSelectAll: () => void;
  markAllAsRead: () => void;
  archiveSelected: () => void;
  showNotification: (notification: NotificationState) => void;
  hideNotification: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

/**
 * NEW HOOK for handling router-dependent logic.
 * This must be called from a component that is rendered inside your <BrowserRouter>.
 */
export const usePendingNotification = () => {
  const location = useLocation();
  const { showNotification } = useProjects();

  useEffect(() => {
    // Check for a pending notification message in session storage on every navigation.
    const pendingNotification = sessionStorage.getItem('pendingNotification');
    if (pendingNotification) {
      showNotification({ message: pendingNotification });
      sessionStorage.removeItem('pendingNotification');
    }
  }, [location, showNotification]);
};


export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>(initialProjectsData);
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [notification, setNotification] = useState<NotificationState | null>(null);

  const showNotification = useCallback((notification: NotificationState) => {
    setNotification(notification);
  }, []);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const toggleStar = (id: string) => setProjects(prev => prev.map(p => p.id === id ? { ...p, isStarred: !p.isStarred } : p));
  const markAsRead = (id: string) => setProjects(prev => prev.map(p => p.id === id ? { ...p, isRead: true } : p));
  const toggleReadStatus = (id: string) => setProjects(prev => prev.map(p => p.id === id ? { ...p, isRead: !p.isRead } : p));
  
  const archiveProject = (id: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, isArchived: true } : p));
    showNotification({ message: 'The project was archived.' });
  };
  
  const unarchiveProject = (id: string) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, isArchived: false } : p));
    showNotification({ message: 'The project was restored from archive.' });
  };

  const toggleSelect = (id: string) => {
    setSelectedProjects(prev => prev.includes(id) ? prev.filter(projId => projId !== id) : [...prev, id]);
  };
  
  const activeProjects = projects.filter(p => !p.isArchived);
  const isAllSelected = activeProjects.length > 0 && selectedProjects.length === activeProjects.length;

  const toggleSelectAll = () => {
    setSelectedProjects(isAllSelected ? [] : activeProjects.map(p => p.id));
  };
  
  const markAllAsRead = () => {
    setProjects(prev => prev.map(p => ({ ...p, isRead: true })));
    showNotification({ message: 'All projects marked as read.' });
  };

  const archiveSelected = () => {
    if (selectedProjects.length === 0) return;
    setProjects(prev => 
      prev.map(p => selectedProjects.includes(p.id) ? { ...p, isArchived: true } : p)
    );
    showNotification({ message: `${selectedProjects.length} project(s) archived.` });
    setSelectedProjects([]);
  };

  const value = {
    projects,
    selectedProjects,
    notification,
    isAllSelected,
    toggleStar,
    markAsRead,
    toggleReadStatus,
    archiveProject,
    unarchiveProject,
    toggleSelect,
    toggleSelectAll,
    markAllAsRead,
    archiveSelected,
    showNotification,
    hideNotification,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};

