import React from 'react';
import { Briefcase, Calendar, CheckCircle, Building } from 'lucide-react';

const Experience: React.FC = () => {
  const experiences = [
    {
      company: "India Music Distribution",
      position: "Web Developer",
      period: "Mar 2025 - Present",
      responsibilities: [
        "Built a production-level platform for 500+ artists to distribute music to 150+ streaming platforms.",
        "Optimized backend queries, improving processing time by 30% and supporting 1,000+ daily uploads with high availability.",
        "Developed and maintained a full-stack music distribution platform, enabling releases to over 150 streaming services.",
        "Implemented a scalable Node.js backend with MongoDB, processing 1,000+ daily uploads with 99.9% uptime and reducing query response time by 25%.",
        "Created a responsive React frontend that improved user engagement by 40% and onboarded 500+ artists within six months."
      ]
    },
    {
      company: "Utsavbox",
      position: "Web Developer (Intern)",
      period: "Jul 2024 - Sep 2024",
      responsibilities: [
        "Increased campaign sales by 15% by designing enhanced Shopify layouts and customizing storefronts using Liquid.",
        "Enhanced site speed by 25% by building reusable Liquid components, improving user experience for 10,000+ monthly visitors",
        "Collaborated with marketing team to integrate video sliders and promotional features for 3 major festive campaigns"
      ]
    }
  ];

  return (
    <div className="page">
      <div className="experience-view">
        <div className="experience-view__header">
          <h1 className="experience-view__subject">Professional Experience</h1>
          <div className="experience-view__meta">
            <span className="experience-view__from">Sanju Kumar Jha</span>
            <span className="experience-view__to">to: You</span>
          </div>
        </div>

        <div className="experience-view__content">
          <div className="timeline">
            {experiences.map((exp, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <div className="timeline-header">
                    <h3 className="timeline-position"><Briefcase size={18} /> {exp.position}</h3>
                    <p className="timeline-company"><Building size={16} /> {exp.company}</p>
                    <p className="timeline-period"><Calendar size={16} /> {exp.period}</p>
                  </div>
                  <ul className="timeline-responsibilities">
                    {exp.responsibilities.map((task, idx) => (
                      <li key={idx}>
                        <CheckCircle size={16} className="timeline-check-icon" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;