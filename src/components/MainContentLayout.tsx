import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { 
  Inbox, Info, Briefcase, Mail, Code, Square, CheckSquare, RefreshCw, MoreVertical, Share2, MailOpen, Archive
} from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';

const MainContentLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    projects, selectedProjects, toggleSelectAll, isAllSelected, 
    markAllAsRead, archiveSelected  
  } = useProjects();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllReadClick = () => {
    markAllAsRead();
    setIsMenuOpen(false);
  };

  const handleArchiveSelectedClick = () => {
    archiveSelected();
    setIsMenuOpen(false);
  };
  
  const handleShareClick = () => {
    const selected = projects.filter(p => selectedProjects.includes(p.id));
    if (selected.length === 0) return;
    const shareText = selected.map(p => `${p.title}: ${window.location.origin}/project/${p.id}`).join('\n');
    if (navigator.share) {
      navigator.share({ title: 'Check out these projects', text: shareText });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Selected project links copied to clipboard!');
    }
  };

  // Function to handle page reload
  const handleRefreshClick = () => {
    window.location.reload();
  };

  const tabs = [
    { name: 'Projects', path: '/projects', icon: Inbox, subtitle: '' },
    { name: 'About', path: '/about', icon: Info, subtitle: 'Who I am?' },
    { name: 'Experience', path: '/experience', icon: Briefcase, subtitle: 'My career journey' },
    { name: 'Skills', path: '/skills', icon: Code, subtitle: 'My technical toolkit' },
    { name: 'Contact', path: '/contact', icon: Mail, subtitle: 'How to reach me?' },
  ];
  
  const getActiveTabPath = () => {
    if (location.pathname.startsWith('/project/')) return '/projects';
    if (location.pathname === '/') return '/projects';
    return location.pathname;
  };
  
  const activeTabPath = getActiveTabPath();

  return (
    <div className="page">
      <div className="inbox-toolbar">
        <div className="inbox-toolbar__left">
          <button className="header__icon-btn" onClick={toggleSelectAll} title="Select all">
            {isAllSelected ? <CheckSquare size={18} /> : <Square size={18} />}
          </button>
          {selectedProjects.length > 0 && (
            <button className="header__icon-btn" onClick={handleShareClick} title="Share">
              <Share2 size={18} />
            </button>
          )}
          {/* Added onClick handler to this button */}
          <button className="header__icon-btn" title="Refresh" onClick={handleRefreshClick}>
            <RefreshCw size={18} />
          </button>
          <div className="more-options-container" ref={menuRef}>
            <button className="header__icon-btn" onClick={() => setIsMenuOpen(prev => !prev)}><MoreVertical size={20} /></button>
            {isMenuOpen && (
              <div className="dropdown-menu">
                {selectedProjects.length === 0 ? (
                  <>
                    <button onClick={handleMarkAllReadClick} className="dropdown-item"><MailOpen size={18} /> Mark all as read</button>
                    <div className="dropdown-divider"></div>
                    <div className="dropdown-item-disabled">Select projects to see more actions</div>
                  </>
                ) : (
                  <>
                    <button onClick={handleArchiveSelectedClick} className="dropdown-item"><Archive size={18} /> Archive selected</button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="inbox-toolbar__right">
          <span className="pagination-text">1–{projects.filter(p => !p.isArchived).length} of {projects.filter(p => !p.isArchived).length}</span>
        </div>
      </div>
      <div className="page__header"><div className="tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTabPath === tab.path;
          return (
            <div key={tab.name} className={`tab ${isActive ? 'active' : ''}`} onClick={() => navigate(tab.path)}>
              <Icon size={18} className="tab__icon" />
              <div className="tab__content">
                <span className="tab__title">{tab.name}</span>
                <span className="tab__subtitle">{tab.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div></div>
      <Outlet />
    </div>
  );
};

export default MainContentLayout;