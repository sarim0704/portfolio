import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  ExternalLink,
  X,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const categoryTabs = [
  { label: 'All', value: 'all', dot: '' },
  { label: 'MERN', value: 'mern', dot: '#3b82f6' },
  { label: 'AI / ML', value: 'ai-ml', dot: '#10b981' },
  { label: 'SaaS', value: 'saas', dot: '#7c6ee6' },
  { label: 'Client', value: 'client', dot: '#d95f2d' },
  { label: 'ML Model', value: 'ml-model', dot: '#c17a16' },
  { label: 'Tools / DB', value: 'tools-db', dot: '#7d7b72' },
];

function inferCategory(project) {
  const text = `${project.category || ''} ${project.title || ''} ${
    project.subtitle || ''
  } ${project.description || ''}`.toLowerCase();

  if (
    text.includes('client') ||
    text.includes('bungjack') ||
    text.includes('creator')
  ) {
    return 'client';
  }

  if (
    text.includes('loan') ||
    text.includes('prediction') ||
    text.includes('machine learning') ||
    text.includes('ml model')
  ) {
    return 'ml-model';
  }

  if (
    text.includes('humantrace') ||
    text.includes('ai') ||
    text.includes('ml') ||
    text.includes('fastapi')
  ) {
    return 'ai-ml';
  }

  if (text.includes('saas') || text.includes('careerforge')) {
    return 'saas';
  }

  if (
    text.includes('hospital') ||
    text.includes('database') ||
    text.includes('dbms')
  ) {
    return 'tools-db';
  }

  return 'mern';
}

function getStatusLine(project) {
  if (project.liveUrl) return 'Live experience available';

  const category = inferCategory(project);

  if (category === 'client') return 'Private client build';
  if (category === 'ai-ml') return 'Deployment in progress';
  if (category === 'saas') return 'Architecture ready for rollout';
  if (category === 'ml-model') return 'Model showcase available';
  if (category === 'tools-db') return 'Case study available';

  return 'Product preview available';
}

function getCardAccent(project) {
  const category = inferCategory(project);

  const map = {
    mern: '#dff1eb',
    'ai-ml': '#dff1e8',
    saas: '#e8e5fb',
    client: '#f4e5df',
    'ml-model': '#f5ecd7',
    'tools-db': '#ecebe4',
  };

  return map[category] || '#e8eceb';
}

function getCategoryMeta(project) {
  const category = inferCategory(project);

  const map = {
    mern: { label: 'MERN', color: '#3b82f6' },
    'ai-ml': { label: 'AI / ML', color: '#10b981' },
    saas: { label: 'SaaS', color: '#7c6ee6' },
    client: { label: 'Client', color: '#d95f2d' },
    'ml-model': { label: 'ML Model', color: '#c17a16' },
    'tools-db': { label: 'Tools / DB', color: '#7d7b72' },
  };

  return map[category] || { label: 'Project', color: '#10b981' };
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const tech = project.techStack || [];
  const features = project.features || [];
  const categoryMeta = getCategoryMeta(project);

  return createPortal(
    <div
      className="projects-modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="projects-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          className="projects-modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close preview"
        >
          <X size={18} />
        </button>

        <div className="projects-modal-head">
          <span
            className="projects-modal-badge"
            style={{
              color: categoryMeta.color,
              background: `${categoryMeta.color}18`,
            }}
          >
            {project.category || categoryMeta.label}
          </span>

          <h3>{project.title}</h3>
          <p>{project.subtitle || getStatusLine(project)}</p>
        </div>

        <div
          className="projects-modal-visual"
          style={{ background: getCardAccent(project) }}
        >
          <img
            src={project.thumbnailUrl || '/uploads/project-placeholder.jpg'}
            alt={project.title}
          />
        </div>

        <div className="projects-modal-body">
          <div className="projects-modal-section">
            <h4>Overview</h4>
            <p>
              {project.description ||
                'A structured product build focused on clean UI, reliable backend logic, and deployment-ready architecture.'}
            </p>
          </div>

          {features.length > 0 && (
            <div className="projects-modal-section">
              <h4>Key Features</h4>
              <ul>
                {features.slice(0, 7).map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {tech.length > 0 && (
            <div className="projects-modal-section">
              <h4>Tech Stack</h4>
              <div className="projects-modal-tech">
                {tech.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          )}

          <div className="projects-modal-actions">
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Open Live Preview <ExternalLink size={15} />
              </a>
            ) : (
              <span>{getStatusLine(project)}</span>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function Projects() {
  const { content } = useContent();
  const railRef = useRef(null);
  const kineticTitleRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const projects = useMemo(() => {
    const items = content.projects || [];
    return [...items].sort((a, b) => (a.order || 99) - (b.order || 99));
  }, [content.projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'all') return projects;

    return projects.filter(
      (project) => inferCategory(project) === activeCategory
    );
  }, [projects, activeCategory]);

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0];

  useEffect(() => {
    setActiveIndex(0);

    if (railRef.current) {
      railRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  }, [activeCategory]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const updateActiveProject = () => {
      const cards = Array.from(rail.querySelectorAll('.curated-project-card'));
      const railRect = rail.getBoundingClientRect();
      const railCenter = railRect.left + railRect.width / 2;

      let nearestIndex = 0;
      let nearestDistance = Infinity;

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(railCenter - cardCenter);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveIndex(nearestIndex);
    };

    updateActiveProject();

    rail.addEventListener('scroll', updateActiveProject, { passive: true });
    window.addEventListener('resize', updateActiveProject);

    return () => {
      rail.removeEventListener('scroll', updateActiveProject);
      window.removeEventListener('resize', updateActiveProject);
    };
  }, [filteredProjects]);

  useEffect(() => {
    if (!kineticTitleRef.current) return;

    const letters = kineticTitleRef.current.querySelectorAll('span');

    gsap.fromTo(
      letters,
      { y: 34, opacity: 0, filter: 'blur(8px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.55,
        stagger: 0.018,
        ease: 'power3.out',
      }
    );
  }, [activeProject?.title]);

  const scrollRail = (direction) => {
    if (!railRef.current) return;

    const amount = railRef.current.clientWidth * 0.88;

    railRef.current.scrollBy({
      left: direction === 'next' ? amount : -amount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="projects" className="section projects-curated">
      <div className="projects-curated-head reveal">
        <p className="projects-curated-kicker">Portfolio — Selected Works</p>

        <div className="projects-curated-tabs">
          {categoryTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              className={activeCategory === tab.value ? 'active' : ''}
              onClick={() => {
                setActiveCategory(tab.value);
                setActiveIndex(0);
              }}
            >
              {tab.dot ? (
                <span
                  className="tab-dot"
                  style={{ background: tab.dot }}
                  aria-hidden="true"
                />
              ) : null}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-kinetic-title" aria-live="polite">
        <span className="projects-kinetic-label">Selected project</span>

        <h3 ref={kineticTitleRef}>
          {(activeProject?.title || 'Projects').split('').map((char, index) => (
            <span key={`${char}-${index}`}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </h3>
      </div>

      <div className="projects-curated-rail-wrap">
        <div className="projects-curated-rail" ref={railRef}>
          {filteredProjects.map((project) => {
            const tech = project.techStack || [];
            const categoryMeta = getCategoryMeta(project);

            return (
              <article
                className="curated-project-card reveal"
                key={project._id || project.title}
                onClick={() => setSelectedProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setSelectedProject(project);
                }}
              >
                <div
                  className="curated-project-visual"
                  style={{ background: getCardAccent(project) }}
                >
                  <img
                    src={project.thumbnailUrl || '/uploads/project-placeholder.jpg'}
                    alt={project.title}
                  />
                </div>

                <div className="curated-project-body">
                  <p
                    className="curated-project-meta"
                    style={{ color: categoryMeta.color }}
                  >
                    <span
                      className="meta-dot"
                      style={{ background: categoryMeta.color }}
                    />
                    {project.category || categoryMeta.label}
                  </p>

                  <h3>{project.title}</h3>

                  <p className="curated-project-subtitle">
                    {project.subtitle || getStatusLine(project)}
                  </p>

                  <div className="curated-project-tech">
                    {tech.slice(0, 4).map((item) => (
                      <span key={item}>{item}</span>
                    ))}

                    {tech.length > 4 && <span>+{tech.length - 4}</span>}
                  </div>

                  <div className="curated-project-footer">
                    <button
                      type="button"
                      className="preview-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                    >
                      <Eye size={16} />
                      Preview
                    </button>

                    <span className="project-status-line">
                      {getStatusLine(project)}
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="projects-curated-controls">
          <button type="button" onClick={() => scrollRail('prev')}>
            <ArrowLeft size={18} />
          </button>

          <button type="button" onClick={() => scrollRail('next')}>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}