import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectList from '../components/ProjectList';
import { useProjects } from '../contexts/ProjectContext';

const Starred: React.FC = () => {
  const navigate = useNavigate();
  const { projects } = useProjects();
  const starredProjects = projects.filter(p => p.isStarred);

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <>
      {starredProjects.length > 0 ? (
        <ProjectList projects={starredProjects} onProjectClick={handleProjectClick} />
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', color: '#5f6368' }}>
          No starred projects.
        </div>
      )}
    </>
  );
};

export default Starred;