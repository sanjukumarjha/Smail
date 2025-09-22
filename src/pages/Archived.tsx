import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectList from '../components/ProjectList';
import { useProjects } from '../contexts/ProjectContext';

const Archived: React.FC = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();

  // Filter to get only the archived projects
  const archivedProjects = projects.filter(p => p.isArchived);

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <>
      {archivedProjects.length > 0 ? (
        <ProjectList projects={archivedProjects} onProjectClick={handleProjectClick} />
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
          No archived projects.
        </div>
      )}
    </>
  );
};

export default Archived;