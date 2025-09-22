import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  // Function to check if the view is mobile (breakpoint at 1024px)
  const isMobileView = () => window.innerWidth <= 1024;

  // Set the initial state based on the current window width:
  // - true (collapsed) if on mobile
  // - false (open) if on desktop
  const [isCollapsed, setIsCollapsed] = useState(isMobileView());

  const toggleSidebar = () => {
    setIsCollapsed(prev => !prev);
  };

  // Add an effect to listen for window resize events
  useEffect(() => {
    // Keep track of the previous mobile state to detect when the breakpoint is crossed
    let wasMobile = isMobileView();

    const handleResize = () => {
      const isNowMobile = isMobileView();
      // If the mobile status changes (e.g., desktop -> mobile), reset the sidebar state
      if (isNowMobile !== wasMobile) {
        setIsCollapsed(isNowMobile); // Collapse on mobile, open on desktop
        wasMobile = isNowMobile;
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener('resize', handleResize);
    
    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <SidebarContext.Provider value={{ isCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};