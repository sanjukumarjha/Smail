import React from 'react';
import { 
  Code, LayoutPanelLeft, Server, Database, Cloud, TerminalSquare, Languages 
} from 'lucide-react';

const Skills: React.FC = () => {
  const skillCategories = [
  {
    title: "Programming Languages",
    icon: Languages,
    skills: ["JavaScript (ES6+)", "TypeScript", "Python", "SQL", "C++", "Java",]
  },
  {
    title: "Frontend Technologies",
    icon: LayoutPanelLeft,
    skills: ["React", "Next.js", "HTML5", "CSS3", "Tailwind CSS","Saas", "Material-UI"]
  },
  {
    title: "Backend Technologies",
    icon: Server,
    skills: ["Node.js", "Express.js", "Python Flask", "REST APIs"]
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["MongoDB", "PostgreSQL","MySQL", "Firebase", "Supabase"]
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS", "Google Cloud", "Docker", "Git & GitHub", "Linux"]
  },
  {
    title: "Developer Tools",
    icon: TerminalSquare,
    skills: ["VS Code", "Git"]
  }
];

  return (
    <div className="page">
      <div className="skills-view">
        <div className="skills-view__header">
          <h1 className="skills-view__subject">Technical Skills & Expertise</h1>
          <div className="skills-view__meta">
            <span className="skills-view__from">Sanju Kumar Jha</span>
            <span className="skills-view__to">to: You</span>
          </div>
        </div>

        <div className="skills-view__content">
          <p className="skills-intro">
            Here's an overview of the technical skills and technologies I work with regularly. 
I'm a firm believer in continuous learning and am always expanding my toolkit.
          </p>

          <div className="skills-grid">
            {skillCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div key={category.title} className="skill-card">
                  <h3 className="skill-card__title">
                    <Icon className="skill-card__icon" size={22} />
                    {category.title}
                  </h3>
                  <div className="skill-tags">
                    {category.skills.map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="skills-note">
            <p>
              <strong>Always Learning:</strong> This list represents my current expertise, but I'm always excited to take on new challenges and master the tools required for a project's success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;