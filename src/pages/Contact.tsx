import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Send, Linkedin, Github, Loader2 } from 'lucide-react';
import { useProjects } from '../contexts/ProjectContext';

const Contact: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { showNotification, hideNotification } = useProjects();
  
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  useEffect(() => {
    if (location.state?.projectTitle) {
      setFormData(prev => ({ ...prev, subject: `Re: ${location.state.projectTitle}` }));
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    abortControllerRef.current = new AbortController();
    
    showNotification({ 
      message: 'Sending...', 
      action: { label: 'Cancel', callback: handleCancel } 
    });

    const accessKey = '904c4181-e281-4710-b731-8f486bce74b2';
    
    // --- THIS SECTION IS UPDATED ---
    // We create an object that sends the subject twice.
    const submissionData = {
      access_key: accessKey,
      name: formData.name,
      email: formData.email,
      // This 'subject' sets the ACTUAL email subject line you see in your inbox
      subject: formData.subject,
      // This custom field name ensures the subject ALSO appears in the email body
      "Inquiry Subject": formData.subject,
      message: formData.message,
    };

    const jsonPayload = JSON.stringify(submissionData);

    try {
      const res = await fetch("https://api.web3forms.com/submit", { 
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: jsonPayload,
        signal: abortControllerRef.current.signal
      });
      
      const result = await res.json();
      hideNotification();

      if (result.success) {
        sessionStorage.setItem('pendingNotification', 'Message sent');
        navigate('/projects');
      } else {
        throw new Error(result.message);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Submission cancelled by user.');
        hideNotification();
        showNotification({ message: 'Send cancelled.' });
      } else {
        console.error("Submission Error:", error);
        hideNotification();
        showNotification({ message: 'Error: Message could not be sent.' });
        setIsSubmitting(false);
      }
    }
  };
  
  return (
    <div className="page">
      <div className="contact-view">
        <div className="compose-card">
          <div className="compose-header">New Message</div>
          <form className="compose-body" onSubmit={handleSubmit}>
            <div className="compose-field"><span>To:</span><input type="text" value="Sanju Kumar Jha" disabled /></div>
            <div className="compose-field"><span>Name:</span><input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required disabled={isSubmitting}/></div>
            <div className="compose-field"><span>Email:</span><input type="email" name="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} required disabled={isSubmitting}/></div>
            <div className="compose-field"><span>Subject:</span><input type="text" name="subject" placeholder="What's this about?" value={formData.subject} onChange={handleChange} required disabled={isSubmitting}/></div>
            <textarea name="message" className="compose-textarea" placeholder="Your message..." value={formData.message} onChange={handleChange} required disabled={isSubmitting}/>
            <div className="compose-footer">
              <button type="submit" className="compose-send-btn" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <>Send <Send size={18} /></>}
              </button>
              <div className="compose-social-links">
                <a href="https://linkedin.com/in/sanjukumarjha" title="LinkedIn" target="_blank" rel="noopener noreferrer"><Linkedin size={22} /></a>
                <a href="https://github.com/sanjukumarjha" title="GitHub" target="_blank" rel="noopener noreferrer"><Github size={22} /></a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;