import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import MainContentLayout from './components/MainContentLayout';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Starred from './pages/Starred';
import Archived from './pages/Archived';
import LoadingScreen from './components/LoadingScreen';
import { ThemeProvider } from './contexts/ThemeContext';
import { SidebarProvider } from './contexts/SidebarContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { AppLoadingProvider, useAppLoading } from './contexts/AppLoadingContext';
import './styles/globals.css';

const AppContent: React.FC = () => {
  const { isLoading, setIsLoading } = useAppLoading();

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Show loading screen for 2.5 seconds
    
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          {/* Routes that HAVE the tab bar */}
          <Route path="/" element={<MainContentLayout />}>
            <Route index element={<Navigate to="/projects" replace />} />
            <Route path="projects" element={<Projects />} />
            <Route path="about" element={<About />} />
            <Route path="experience" element={<Experience />} />
            <Route path="skills" element={<Skills />} />
            <Route path="contact" element={<Contact />} />
            <Route path="starred" element={<Starred />} />
            <Route path="archived" element={<Archived />} />
          </Route>

          {/* Route that DOES NOT have the tab bar */}
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </Layout>
    </Router>
  );
}

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <ProjectProvider>
          <AppLoadingProvider>
            <AppContent />
          </AppLoadingProvider>
        </ProjectProvider>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default App;

