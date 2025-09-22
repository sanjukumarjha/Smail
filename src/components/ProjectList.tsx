import React from 'react';
import { Star, Mail, Share2, Square, CheckSquare } from 'lucide-react';
import { Project } from '../data/projects';
import { useProjects } from '../contexts/ProjectContext';

interface ProjectListProps {
  projects: Project[];
  onProjectClick: (projectId: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onProjectClick }) => {
  const { toggleStar, toggleSelect, selectedProjects = [], toggleReadStatus } = useProjects();

  // Helper function to safely render content that might be an object
  const safeRender = (content: any): React.ReactNode => {
    if (typeof content === 'object' && content !== null) {
      if (content.message) {
        return content.message;
      }
      return JSON.stringify(content);
    }
    return content;
  };
  
  // Helper function to ensure content is a string, for APIs like navigator.share
  const safeStringify = (content: any): string => {
    if (typeof content === 'string') return content;
    if (typeof content === 'object' && content !== null) {
      return content.message ? String(content.message) : JSON.stringify(content);
    }
    return String(content);
  };


  const handleActionClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation(); // Prevent row click when an icon is clicked
    action();
  };
  
  const handleShareClick = (e: React.MouseEvent, project: Project) => {
      e.stopPropagation();
      if (navigator.share) {
          navigator.share({
              title: safeStringify(project.title),
              text: safeStringify(project.preview), // Share the short preview
              url: `${window.location.origin}/project/${project.id}`
          });
      } else {
          navigator.clipboard.writeText(`${window.location.origin}/project/${project.id}`);
          // Note: alert() might not work in all environments. A custom notification would be better.
          console.log('Project link copied to clipboard!');
      }
  }

  return (
    <div className="project-list">
      {projects.map((project) => {
        const isSelected = selectedProjects.includes(project.id);
        const rowClass = `project-list__item ${!project.isRead ? 'unread' : ''} ${isSelected ? 'selected' : ''}`;
        
        return (
          <div
            key={project.id}
            className={rowClass}
            onClick={() => onProjectClick(project.id)}
            role="button"
            tabIndex={0}
          >
            <div className="project-list__actions-left">
              <button className="action-btn" title="Select" onClick={(e) => handleActionClick(e, () => toggleSelect(project.id))}>
                {isSelected ? <CheckSquare size={18} className="selected-check" /> : <Square size={18} />}
              </button>
              <button className="action-btn" title="Star" onClick={(e) => handleActionClick(e, () => toggleStar(project.id))}>
                <Star size={18} fill={project.isStarred ? 'currentColor' : 'none'} className={project.isStarred ? 'starred' : ''} />
              </button>
            </div>

            <div className="project-list__sender">{safeRender(project.title)}</div>
            
            <div className="project-list__subject">
              {safeRender(project.preview)}
              <span className="project-list__subject-preview">
                - {Array.isArray(project.technologies) ? project.technologies.slice(0, 2).join(', ') + '...' : ''}
              </span>
            </div>

            <div className="project-list__hover-actions">
              <button 
                className="header__icon-btn" 
                title={project.isRead ? "Mark as unread" : "Mark as read"} 
                onClick={(e) => handleActionClick(e, () => toggleReadStatus(project.id))}
              >
                <Mail size={20} />
              </button>
              <button 
                className="header__icon-btn" 
                title="Share"
                onClick={(e) => handleShareClick(e, project)}
              >
                <Share2 size={20} />
              </button>
            </div>
            
            <div className="project-list__date">{safeRender(project.year)}</div>
          </div>
        );
      })}
    </div>
  );
};

export default ProjectList;

