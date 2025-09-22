import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import ProjectList from '../components/ProjectList';
import { useProjects } from '../contexts/ProjectContext';

const Projects: React.FC = () => {
  const navigate = useNavigate();
  // Get projects and notification state from the context
  const { projects, notification, hideNotification } = useProjects();

  // Filter out any projects that have been archived
  const activeProjects = projects.filter(p => !p.isArchived);

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <>
      {/* Conditionally render the notification toast at the bottom */}
      {notification && (
        <div className="notification-toast">
          <span>{notification.message}</span>
          {notification.action && (
            <button 
              onClick={notification.action.callback} 
              className="notification-toast__undo"
            >
              {notification.action.label}
            </button>
          )}
          <button 
            onClick={hideNotification} 
            className="notification-toast__close" 
            aria-label="Close notification"
          >
            <X size={18} />
          </button>
        </div>
      )}
      
      {/* Pass only the active (non-archived) projects to the list */}
      <ProjectList projects={activeProjects} onProjectClick={handleProjectClick} />
    </>
  );
};

export default Projects;
