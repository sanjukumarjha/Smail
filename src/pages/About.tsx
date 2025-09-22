import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Briefcase, Code, Star, Globe, Reply, Forward, MoreVertical, Printer } from 'lucide-react';

const About: React.FC = () => {
  // State for the photo modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State for the "more options" dropdown menu
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const navigate = useNavigate();
  const moreMenuRef = useRef<HTMLDivElement>(null);

  // --- Modal Handlers ---
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // --- Button Action Handlers ---

  // 1. Handle Reply: Navigate to contact page with a subject
  const handleReply = () => {
    const subject = encodeURIComponent('Enquiry about your About Page');
    navigate(`/contact?subject=${subject}`);
  };

  // 2. Handle Forward: Use the Web Share API
  const handleForward = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'About Sanju Kumar Jha',
          text: 'Check out this page from Sanju Kumar Jha\'s portfolio.',
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that do not support Web Share API
      alert('Sharing is not supported on your browser. You can copy the URL manually.');
    }
  };

  // 3. Handle Print: Trigger the browser's print function
  const handlePrint = () => {
    window.print();
  };
  
  // 4. Toggle the "More Options" menu
  const toggleMoreMenu = () => {
    setIsMoreMenuOpen(prev => !prev);
  };
  
  // Effect to close the "More Options" menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="page">
      {/* We add a 'printable-area' class to the content you want to print */}
      <div className="about-email-view printable-area">
        {/* --- HEADER (Gmail style) --- */}
        <div className="about-email-view__header">
          <h1 className="about-email-view__subject">A Little About Me</h1>
          <div className="about-email-view__actions">
            <button className="header__icon-btn" title="Reply" onClick={handleReply}><Reply size={20} /></button>
            <button className="header__icon-btn" title="Forward" onClick={handleForward}><Forward size={20} /></button>
            <button className="header__icon-btn" title="Print" onClick={handlePrint}><Printer size={20} /></button>
            
            {/* --- More Options Button and Dropdown --- */}
            <div className="more-menu-container" ref={moreMenuRef}>
              <button className="header__icon-btn" title="More options" onClick={toggleMoreMenu}>
                <MoreVertical size={20} />
              </button>
              {isMoreMenuOpen && (
                <div className="more-menu-card">
                  <Link to="#" className="more-menu-item">Report Page.</Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- SENDER DETAILS --- */}
        <div className="about-email-view__sender-details">
          <div className="about-profile-pic-container" onClick={openModal} style={{ cursor: 'pointer' }}>
            <img src="/DP.jpg" alt="Sanju Kumar Jha" className="about-profile-pic" />
          </div>
          <div className="about-email-view__meta">
            <div className="about-email-view__from-group">
              <span className="about-email-view__from">Sanju Kumar Jha</span>
              <span className="about-email-view__email">&lt;rjriva00@gmail.com&gt;</span>
            </div>
            <span className="about-email-view__to">to: You</span>
          </div>
          <div className="about-email-view__timestamp">
            <span>Sep 21, 2025, 12:00 PM</span>
          </div>
        </div>

        {/* --- MAIN CONTENT --- */}
        <div className="about-email-view__content">
            <div className="about-section">
                <p>
                    Hello! I’m <b>Sanju Kumar Jha</b>, a full-stack developer and BCA student passionate about
                    building scalable, efficient, and user-friendly web applications. My current focus lies
                    in crafting solutions that combine <b>clean code, cloud scalability, and intuitive design</b>.
                    I enjoy working across the stack — from architecting backend systems to delivering
                    seamless front-end experiences.
                </p>
                <p>
                    My journey into technology began with a curiosity about how websites worked, which quickly evolved into a lasting passion. I’ve come to value writing code that is clean, maintainable, and easy for others to build upon. For me, software development is not just about making things work—it’s about crafting solutions the right way, with scalability and long-term impact in mind.
                </p>
            </div>

            {/* --- HIGHLIGHTS GRID --- */}
            <div className="about-section about-highlights-grid">
                <div className="highlight-card">
                    <h3><Briefcase size={20} className="highlight-icon" /> What I Focus On</h3>
                    <ul>
                        <li>Developing scalable end-to-end web platforms</li>
                        <li>Designing reliable cloud-based infrastructures</li>
                        <li>Delivering simple and user-centric solutions</li>
                        <li>Optimizing apps for performance and growth</li>
                    </ul>
                </div>
                <div className="highlight-card">
                    <h3><Star size={20} className="highlight-icon" /> My Approach</h3>
                    <ul>
                        <li>Write clean, structured, and maintainable code</li>
                        <li>Always prioritize user experience and usability</li>
                        <li>Stay curious and keep learning every day</li>
                        <li>Collaboration that drives results</li>
                    </ul>
                </div>
                <div className="highlight-card">
                    <h3><Code size={20} className="highlight-icon" /> My Toolkit</h3>
                    <ul>
                        <li>Frontend: React, Next.js, TypeScript</li>
                        <li>Backend: Node.js, Express, Python</li>
                        <li>Databases: MongoDB, Supabase</li>
                        <li>DevOps: AWS, Docker, Git & GitHub</li>
                    </ul>
                </div>
                <div className="highlight-card">
                    <h3><Globe size={20} className="highlight-icon" /> Beyond Code</h3>
                    <ul>
                        <li>Building a music distribution platform for Indian artists</li>
                        <li>Experimenting with AI/ML for real-world applications</li>
                        <li>Exploring automation & CI/CD pipelines</li>
                        <li>Sharing insights and writing about tech</li>
                    </ul>
                </div>
            </div>

            {/* --- EXTRA ABOUT SECTION --- */}
            <div className="about-section">
                <p>
                    When I’m not working, you’ll probably find me brainstorming ideas for my music
                    distribution project, experimenting with new tech, or contributing to open-source
                    initiatives. I’m always excited about the next challenge and the opportunity to
                    build something meaningful.
                </p>
                <p className="about-signature">
                    Best regards, <br />
                    Sanju Kumar Jha
                </p>
            </div>
        </div>
      </div>

      {/* --- PHOTO MODAL --- */}
      {isModalOpen && (
        <div className="photo-modal-overlay" onClick={closeModal}>
          <div className="photo-modal-content" onClick={(e) => e.stopPropagation()}>
            <img src="/DP.jpg" alt="Sanju Kumar Jha - Enlarged" />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;