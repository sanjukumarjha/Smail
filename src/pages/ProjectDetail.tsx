import React, { useEffect, useState, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Archive, Mail, MoreVertical, Printer, ExternalLink, Star, CornerUpLeft, Github, 
  CheckSquare, Filter, Flag, ArchiveRestore, Paperclip, ChevronLeft, ChevronRight, X, Info, Download
} from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';
import { Project } from '../data/projects';
import { useClickOutside } from '../hooks/useClickOutside';

// Define a type for the thumbnail's bounding rectangle
interface ThumbnailRect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const { 
    projects, markAsRead, toggleReadStatus, archiveProject, unarchiveProject, toggleStar 
  } = useProjects();
  const [project, setProject] = useState<Project | undefined>(undefined);
  
  const [isToolbarMenuOpen, setIsToolbarMenuOpen] = useState(false);
  const [isSenderMenuOpen, setIsSenderMenuOpen] = useState(false);
  
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // --- NEW STATES FOR HERO ANIMATION ---
  const [initialThumbnailRect, setInitialThumbnailRect] = useState<ThumbnailRect | null>(null);
  const [isAnimating, setIsAnimating] = useState(false); // To control the animation phase
  
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]); // To get thumbnail positions
  const lightboxImageRef = useRef<HTMLImageElement>(null); // Ref for the image inside the lightbox
  const lightboxOverlayRef = useRef<HTMLDivElement>(null); // Ref for the overlay

  const toolbarMenuRef = useRef<HTMLDivElement>(null);
  const senderMenuRef = useRef<HTMLDivElement>(null);
  useClickOutside(toolbarMenuRef, () => setIsToolbarMenuOpen(false));
  useClickOutside(senderMenuRef, () => setIsSenderMenuOpen(false));

  useEffect(() => {
    const foundProject = projects.find(p => p.id === id);
    setProject(foundProject);
    thumbnailRefs.current = thumbnailRefs.current.slice(0, foundProject?.screenshots.length || 0); // Cleanup old refs
  }, [id, projects]);
  
  useEffect(() => {
    if (project && !project.isRead) {
      markAsRead(project.id);
    }
  }, [project, markAsRead]);

  // General handlers
  const handleArchiveClick = () => { if (project) { archiveProject(project.id); navigate('/projects'); } };
  const handleUnarchiveClick = () => {
    if (project) {
      const archivedCount = projects.filter(p => p.isArchived).length;
      unarchiveProject(project.id);
      if (archivedCount === 1) {
        navigate('/projects');
      } else {
        navigate('/archived');
      }
    }
  };
  const handleMarkUnreadClick = () => { if (project) toggleReadStatus(project.id) };
  const handleStarClick = () => { if (project) toggleStar(project.id) };
  const handleReplyClick = () => { if (project) navigate('/contact', { state: { projectTitle: project.title } }); };

  // --- UPDATED LIGHTBOX FUNCTIONS FOR HERO ANIMATION ---
  const openLightbox = useCallback((index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    if (!project || !project.screenshots || !thumbnailRefs.current[index]) return;

    const thumbnail = thumbnailRefs.current[index]!;
    const thumbnailRect = thumbnail.getBoundingClientRect();
    
    setInitialThumbnailRect({
      x: thumbnailRect.x,
      y: thumbnailRect.y,
      width: thumbnailRect.width,
      height: thumbnailRect.height,
    });
    
    setCurrentImageIndex(index);
    setIsLightboxOpen(true);
    // Give a very small delay for the DOM to update before starting animation
    setTimeout(() => {
      setIsAnimating(true);
    }, 10); 
  }, [project]);

  const closeLightbox = useCallback(() => {
    setIsAnimating(false); // Trigger reverse animation
    // Wait for the animation to complete before unmounting
    setTimeout(() => {
      setIsLightboxOpen(false);
      setInitialThumbnailRect(null); // Clear the stored thumbnail position
    }, 400); // This duration should match your CSS transition duration
  }, []);

  const showNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project && project.screenshots) {
      setCurrentImageIndex((prev) => (prev + 1) % project.screenshots.length);
    }
  };
  const showPrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project && project.screenshots) {
      setCurrentImageIndex((prev) => (prev - 1 + project.screenshots.length) % project.screenshots.length);
    }
  };

  // Calculate dynamic transform styles for the lightbox image
  const getLightboxImageTransform = useCallback(() => {
    if (!initialThumbnailRect || !lightboxImageRef.current || !lightboxOverlayRef.current || !isLightboxOpen) {
      return {};
    }

    const imgElement = lightboxImageRef.current;
    const overlayElement = lightboxOverlayRef.current;
    
    // Get the final position and size of the image within the lightbox
    // This assumes the lightbox image will be centered and respect aspect ratio
    const imgComputedStyle = window.getComputedStyle(imgElement);
    const imgWidth = parseFloat(imgComputedStyle.width);
    const imgHeight = parseFloat(imgComputedStyle.height);

    // Calculate the centered position of the image within the lightbox overlay
    const finalImageLeft = (overlayElement.offsetWidth - imgWidth) / 2;
    const finalImageTop = (overlayElement.offsetHeight - imgHeight) / 2;

    // Calculate translation and scale from thumbnail to final position
    const translateX = initialThumbnailRect.x - finalImageLeft;
    const translateY = initialThumbnailRect.y - finalImageTop;
    const scaleX = initialThumbnailRect.width / imgWidth;
    const scaleY = initialThumbnailRect.height / imgHeight;

    return {
      transform: `translate(${translateX}px, ${translateY}px) scaleX(${scaleX}) scaleY(${scaleY})`,
      transformOrigin: '0 0', // Ensure scaling and translation are from the top-left
      opacity: 0, // Start invisible, fade in
    };
  }, [initialThumbnailRect, isLightboxOpen]);


  if (!project) {
    return <div className="page" style={{ padding: '20px' }}>Loading project...</div>;
  }
  
  const lightboxJsx = isLightboxOpen ? (
    <div 
      className={`lightbox-overlay ${isAnimating ? 'is-animating' : ''}`}
      onClick={closeLightbox}
      ref={lightboxOverlayRef} // Attach ref here
    >
      <button className="lightbox-close" onClick={closeLightbox}><X size={32} /></button>
      <button className="lightbox-prev" onClick={showPrevImage}><ChevronLeft size={48} /></button>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img 
          src={project.screenshots[currentImageIndex]} 
          alt={`Screenshot ${currentImageIndex + 1}`} 
          className="lightbox-image" 
          ref={lightboxImageRef} // Attach ref here
          style={!isAnimating ? getLightboxImageTransform() : {}} // Apply initial transform only if not animating
          onLoad={() => {
            // Recalculate transform if image aspect ratio might change the final size
            if (!isAnimating) {
                // Force a re-render to apply the transform based on loaded image size
                // This is a bit of a hack, a better way would be to use state for the transform directly
                setInitialThumbnailRect(prev => ({...prev!})); 
            }
          }}
        />
      </div>
      <button className="lightbox-next" onClick={showNextImage}><ChevronRight size={48} /></button>
    </div>
  ) : null;

  return (
    <div className="page">
      <div className="project-detail-toolbar">
        <div className="project-detail-toolbar__left">
          <button onClick={() => navigate(-1)} className="header__icon-btn" aria-label="Back"><ArrowLeft size={20} /></button>
          <div className="toolbar-divider"></div>
          {project.isArchived ? (
            <button onClick={handleUnarchiveClick} className="header__icon-btn" title="Restore from Archive"><ArchiveRestore size={20} /></button>
          ) : (
            <button onClick={handleArchiveClick} className="header__icon-btn" title="Archive"><Archive size={20} /></button>
          )}
          <button onClick={handleMarkUnreadClick} className="header__icon-btn" aria-label="Mark as unread"><Mail size={20} /></button>
          <div className="more-options-container" ref={toolbarMenuRef}>
            <button onClick={() => setIsToolbarMenuOpen(p => !p)} className="header__icon-btn" aria-label="More options"><MoreVertical size={20} /></button>
            {isToolbarMenuOpen && (
              <div className="header__dropdown">
                <button className="header__dropdown-item"><CheckSquare size={18} /> Add to Tasks</button>
                <div className="header__dropdown-divider"></div>
                <button className="header__dropdown-item"><Filter size={18} /> Filter projects like this</button>
                <button className="header__dropdown-item"><Flag size={18} /> Report Project</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="project-detail">
        <div className="project-detail-subject-line">
          <h1 className="project-detail__title">{project.title}</h1>
          <div className="project-detail-subject-actions">
            <button className="header__icon-btn" title="Print" onClick={() => window.print()}><Printer size={20} /></button>
            {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="header__icon-btn" title="Open in new window"><ExternalLink size={20} /></a>}
          </div>
        </div>

        <div className="project-detail-sender-block">
          <div className="sender-avatar">
            <img src="/DP.jpg" alt="Sanju Kumar Jha" />
          </div>
          <div className="sender-info">
            <div className="sender-info__main">
              <span className="sender-name">Sanju Kumar Jha</span>
              <span className="sender-email">&lt;rjriva00@gmail.com&gt;</span>
            </div>
            <div className="sender-recipient">to me</div>
          </div>
          <div className="sender-actions">
            <span className="sender-date">{project.year}</span>
            <button onClick={handleStarClick} className="header__icon-btn" title="Star"><Star size={20} fill={project.isStarred ? 'currentColor' : 'none'} className={project.isStarred ? 'starred' : ''} /></button>
            <button onClick={handleReplyClick} className="header__icon-btn" title="Reply"><CornerUpLeft size={20} /></button>
            <div className="more-options-container" ref={senderMenuRef}>
              <button className="header__icon-btn" title="More" onClick={() => setIsSenderMenuOpen(p => !p)}>
                <MoreVertical size={20} />
              </button>
              {isSenderMenuOpen && (
                <div className="header__dropdown">
                  <button className="header__dropdown-item">
                    <Flag size={16} /> Report this project
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="project-detail-body-content">
          <p>{project.description}</p>
          <div className="project-detail__section"><h3>Key Features</h3><ul>{project.features.map((feature, index) => <li key={index}>{feature}</li>)}</ul></div>
          <div className="project-detail__section"><h3>Technologies Used</h3><div className="tech-tags">{project.technologies.map((tech, index) => <span key={index} className="tech-tag">{tech}</span>)}</div></div>
          <div className="project-detail__section"><h3>Challenges & Solutions</h3><p>{project.challenges}</p></div>
          
          {project.screenshots && project.screenshots.length > 0 && (
            <div className="project-detail__section project-detail__section--attachments">
              <div className="attachments-header">
                <h3><Paperclip size={16} /> {project.screenshots.length} Screenshots</h3>
                <span className="scanned-by-text">Scanned by Smail <Info size={14} /></span>
              </div>
              <div className="attachments-grid">
                {project.screenshots.map((screenshot, index) => (
                  <button 
                    key={index} 
                    className="attachment-thumbnail" 
                    onClick={(e) => openLightbox(index, e)}
                    ref={(el) => (thumbnailRefs.current[index] = el)} // Attach ref
                  >
                    <img src={screenshot} alt={`Screenshot ${index + 1} of ${project.title}`} />
                    <a href={screenshot} download className="attachment-download-btn" onClick={(e) => e.stopPropagation()} title="Download Screenshot">
                      <Download size={18} />
                    </a>
                  </button>
                ))}
              </div>
            </div>
          )}

          {(project.liveDemo || project.github) && (
            <div className="project-detail__section project-detail__section--links">
              <h3>Links</h3>
              <div className="attachment-buttons">
                {project.liveDemo && <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="btn"><ExternalLink size={16} /> Live Demo</a>}
                {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn"><Github size={16} /> View Code</a>}
              </div>
            </div>
          )}
        </div>
      </div>

      {ReactDOM.createPortal(
        lightboxJsx,
        document.getElementById('modal-root')!
      )}
    </div>
  );
};

export default ProjectDetail;