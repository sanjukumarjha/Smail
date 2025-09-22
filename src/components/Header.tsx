import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, Search, HelpCircle, Settings, Grid3X3, Sun, Moon, X, Mail, ArrowLeft } from 'lucide-react';
import { useSidebar } from '../contexts/SidebarContext';
import { useTheme } from '../contexts/ThemeContext';
import { useClickOutside } from '../hooks/useClickOutside';
import { useProjects } from '../contexts/ProjectContext';
import { Project } from '../data/projects';

const Header: React.FC = () => {
  const { toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const { projects } = useProjects();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Project[]>([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  // --- NEW STATE FOR MOBILE SEARCH ---
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const appsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useClickOutside(searchRef, () => setIsSearchActive(false));
  useClickOutside(settingsRef, () => activeMenu === 'settings' && setActiveMenu(null));
  useClickOutside(appsRef, () => activeMenu === 'apps' && setActiveMenu(null));
  useClickOutside(profileRef, () => activeMenu === 'profile' && setActiveMenu(null));

  useEffect(() => {
    if (searchQuery.trim() !== '') {
      const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredProjects);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery, projects]);

  const handleMenuToggle = (menuName: string) => {
    setActiveMenu(activeMenu === menuName ? null : menuName);
  };

  const handleThemeChange = (selectedTheme: 'light' | 'dark') => {
    if (theme !== selectedTheme) {
      toggleTheme();
    }
  };

  const handleSupportClick = () => {
    navigate('/contact');
  };

  const handleNavigateToAbout = () => {
    navigate('/about');
    setActiveMenu(null);
  };
  
  const handleResultClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
    setSearchQuery('');
    setIsSearchActive(false);
    setIsMobileSearchOpen(false); // Close mobile search as well
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // --- RENDER MOBILE SEARCH OVERLAY ---
  const renderMobileSearch = () => (
    <div className="mobile-search-overlay">
      <div className="mobile-search__header">
        <button className="header__icon-btn" onClick={() => setIsMobileSearchOpen(false)}>
          <ArrowLeft size={24} />
        </button>
        <input
          type="text"
          placeholder="Search projects..."
          className="mobile-search__input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoFocus
        />
        {searchQuery && (
          <button className="header__icon-btn" onClick={clearSearch}>
            <X size={24} />
          </button>
        )}
      </div>
      <div className="mobile-search-results">
        {searchQuery && searchResults.length > 0 && (
          searchResults.map(project => (
            <button key={project.id} className="search-result-item" onClick={() => handleResultClick(project.id)}>
              <Mail size={18} className="search-result-icon" />
              <span className="search-result-text">{project.title}</span>
            </button>
          ))
        )}
        {searchQuery && searchResults.length === 0 && (
          <div className="search-result-item no-results">
            No projects found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <header className="header">
        <div className="header__left">
          <button className="header__icon-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
            <Menu size={24} />
          </button>
          <Link to="/" className="header__logo">
            <img src="/logo.png" alt="Logo" className="header__logo-img" />
            <span className="header__logo-text">Smail</span>
          </Link>
        </div>

        <div className="header__center">
          <div className="header__search-wrapper" ref={searchRef}>
            <div className={`header__search ${isSearchActive ? 'active' : ''}`}>
              <Search className="header__search-icon" size={20} />
              <input 
                type="text" 
                placeholder="Search Projects" 
                className="header__search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchActive(true)}
              />
              {searchQuery && (
                <button type="button" className="header__search-clear-btn" onClick={clearSearch}>
                  <X size={20} />
                </button>
              )}
            </div>

            {isSearchActive && searchQuery && (
              <div className="search-results-dropdown">
                {searchResults.length > 0 && (
                  searchResults.map(project => (
                    <button key={project.id} className="search-result-item" onClick={() => handleResultClick(project.id)}>
                      <Mail size={18} className="search-result-icon" />
                      <span className="search-result-text">{project.title}</span>
                    </button>
                  ))
                )}
                {searchResults.length === 0 && (
                  <div className="search-result-item no-results">
                    No projects found for "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="header__right">
          {/* --- UPDATED MOBILE SEARCH BUTTON --- */}
          
          <button className="header__icon-btn" aria-label="Support" onClick={handleSupportClick}>
            <HelpCircle size={24} />
          </button>
          
          <div className="header__dropdown-container" ref={settingsRef}>
            <button className="header__icon-btn" onClick={() => handleMenuToggle('settings')} aria-label="Settings">
              <Settings size={24} />
            </button>
            {activeMenu === 'settings' && (
              <div className="header__dropdown header__dropdown--settings">
                <div className="settings-header">Quick Settings</div>
                <div className="settings-section">
                  <span className="settings-section-title">THEME</span>
                  <div className="theme-options-card">
                    <div className="theme-options-card__header">
                      <h4 className="theme-options-card__title">Appearance</h4>
                      <p className="theme-options-card__subtitle">Customize how it looks</p>
                    </div>
                    <div className="theme-options-buttons">
                      <button className={`theme-option ${theme === 'light' ? 'active' : ''}`} onClick={() => handleThemeChange('light')}>
                        <Sun size={18} /> Light
                      </button>
                      <button className={`theme-option ${theme === 'dark' ? 'active' : ''}`} onClick={() => handleThemeChange('dark')}>
                        <Moon size={18} /> Dark
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="header__dropdown-container" ref={appsRef}>
            <button className="header__icon-btn" onClick={() => handleMenuToggle('apps')} aria-label="Apps">
              <Grid3X3 size={24} />
            </button>
            {activeMenu === 'apps' && (
              <div className="header__dropdown header__dropdown--apps">
                <div className="header__apps-grid">
                  <a href="https://github.com/sanjukumarjha" target="_blank" rel="noopener noreferrer" className="app-grid-item">
                    <img src="/github-6980894.svg" alt="GitHub" className="app-grid-icon" />
                    <span className="app-grid-label">GitHub</span>
                  </a>
                  <a href="https://linkedin.com/in/sanjukumarjha" target="_blank" rel="noopener noreferrer" className="app-grid-item">
                    <img src="/linked-in-2674741.svg" alt="LinkedIn" className="app-grid-icon" />
                    <span className="app-grid-label">LinkedIn</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          <div className="header__dropdown-container" ref={profileRef}>
            <button className="header__profile-btn" onClick={() => handleMenuToggle('profile')} aria-label="Profile">
              <img src="/DP.jpg" alt="Profile" className="header__avatar-img" />
            </button>
            {activeMenu === 'profile' && (
              <div className="header__dropdown header__dropdown--profile">
                <div className="header__profile-info" onClick={handleNavigateToAbout}>
                  <img src="/DP.jpg" alt="Profile" className="header__profile-dropdown-img" />
                  <strong>Sanju Kumar Jha</strong>
                  <span>rjriva00@gmail.com</span>
                </div>
                <div className="header__dropdown-divider"></div>
                <button className="header__dropdown-item">Sign out</button>
              </div>
            )}
          </div>
        </div>
      </header>
      
      {/* --- RENDER THE OVERLAY IF OPEN --- */}
      {isMobileSearchOpen && renderMobileSearch()}
    </>
  );
};

export default Header;