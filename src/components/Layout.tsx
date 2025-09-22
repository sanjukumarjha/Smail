import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Notification from './Notification';
import { usePendingNotification } from '../contexts/ProjectContext';
import { useSidebar } from '../contexts/SidebarContext'; // Import useSidebar

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  usePendingNotification();
  const { isCollapsed, toggleSidebar } = useSidebar(); // Get sidebar state
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Show overlay only on mobile view when sidebar is open
  const showOverlay = isMobileView && !isCollapsed;

  return (
    <div className="layout">
      <Header />
      <div className="layout__body">
        <Sidebar />
        {/* --- SIDEBAR OVERLAY --- */}
        <div 
          className={`sidebar-overlay ${showOverlay ? 'active' : ''}`}
          onClick={toggleSidebar} // Close sidebar when overlay is clicked
        ></div>
        <main className="layout__main">
          {children}
        </main>
      </div>
      <Notification />
    </div>
  );
};

export default Layout;