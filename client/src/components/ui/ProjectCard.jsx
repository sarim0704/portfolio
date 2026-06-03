import { ExternalLink, Github } from 'lucide-react';

export function ProjectCard({ project, compact = false }) {
  const tech = project.techStack?.slice(0, 4) || [];
  const extra = Math.max((project.techStack?.length || 0) - tech.length, 0);
  return (
    <article className={`project-card reveal ${compact ? 'compact' : ''}`}>
      <div className="project-image-wrap">
        <img src={project.thumbnailUrl || '/project-placeholders/servix.svg'} alt={project.title} loading="lazy" />
        <div className="project-overlay"><span>View Project →</span></div>
      </div>
      <div className="project-body">
        <p className="project-category">{project.category}</p>
        <h3>{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="tech-row">
          {tech.map((item) => <span key={item} className="tag">{item}</span>)}
          {extra > 0 && <span className="tag">+{extra}</span>}
        </div>
        <div className="project-links">
          {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer">Live <ExternalLink size={14} /></a> : <span>Live soon</span>}
          {project.githubUrl ? <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub <Github size={14} /></a> : <span>Private repo</span>}
        </div>
      </div>
    </article>
  );
}
