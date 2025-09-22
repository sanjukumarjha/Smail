import React from 'react';
import { NavLink } from 'react-router-dom';
import { Download, Inbox, Star, Briefcase, Code, Mail, Archive, X } from 'lucide-react';
import { useSidebar } from '../contexts/SidebarContext';
import { useProjects } from '../contexts/ProjectContext';

const Sidebar: React.FC = () => {
  // Get isCollapsed and the toggleSidebar function from the context
  const { isCollapsed, toggleSidebar } = useSidebar();
  const { projects } = useProjects();

  const hasArchivedProjects = projects.some(project => project.isArchived);

  // This function will close the sidebar ONLY on mobile view when a link is clicked
  const handleMobileNavClick = () => {
    if (window.innerWidth <= 1024 && !isCollapsed) {
      toggleSidebar();
    }
  };

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/Sanju_Kumar_Jha_Resume (4).pdf';
    link.download = 'Sanju_Kumar_Jha_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Also close the sidebar on mobile after clicking
    handleMobileNavClick();
  };

  const navItems = [
    { icon: Inbox, label: 'Projects', path: '/projects' },
    { icon: Star, label: 'Starred', path: '/starred' },
    { icon: Briefcase, label: 'Experience', path: '/experience' },
    { icon: Code, label: 'Skills', path: '/skills' },
    { icon: Mail, label: 'Contact', path: '/contact' },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}>
      {/* --- ADDED: Close button for mobile view --- */}
      {!isCollapsed && (
        <div className="sidebar__header">
          <button className="sidebar__close-btn" onClick={toggleSidebar} aria-label="Close sidebar">
            <X size={24} />
          </button>
        </div>
      )}

      <div className="sidebar__compose">
        <button className="sidebar__compose-btn" onClick={handleResumeDownload}>
          <Download size={20} />
          {!isCollapsed && <span>Resume</span>}
        </button>
      </div>

      <nav className="sidebar__nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`}
              // ADDED: onClick handler to close sidebar on mobile
              onClick={handleMobileNavClick}
            >
              <Icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </NavLink>
          );
        })}

        {hasArchivedProjects && (
          <NavLink
            to="/archived"
            className={({ isActive }) => `sidebar__nav-item ${isActive ? 'sidebar__nav-item--active' : ''}`}
            // ADDED: onClick handler here as well
            onClick={handleMobileNavClick}
          >
            <Archive size={20} />
            {!isCollapsed && <span>Archived</span>}
          </NavLink>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;