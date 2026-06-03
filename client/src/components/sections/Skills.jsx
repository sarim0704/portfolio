import { useEffect } from 'react';
import gsap from 'gsap';
import {
  BrainCircuit,
  Code2,
  Database,
  Server,
  Sparkles,
  TerminalSquare,
  Wrench,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const fallbackSkills = [
  {
    category: 'Frontend',
    items: [
      'React.js',
      'Next.js',
      'JavaScript ES6+',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Bootstrap',
      'React Router',
      'Axios',
      'Framer Motion',
    ],
  },
  {
    category: 'Backend',
    items: [
      'Node.js',
      'Express.js',
      'REST APIs',
      'JWT Auth',
      'Middleware',
      'MVC Architecture',
      'Bcrypt',
      'CORS',
      'Multer',
      'Dotenv',
    ],
  },
  {
    category: 'Database',
    items: [
      'MongoDB',
      'Mongoose',
      'MongoDB Atlas',
      'MySQL',
      'SQL Queries',
      'CRUD',
      'Data Modeling',
      'Schema Design',
    ],
  },
  {
    category: 'AI / ML',
    items: [
      'Python',
      'Scikit-learn',
      'Pandas',
      'NumPy',
      'Logistic Regression',
      'Random Forest',
      'SVM',
      'Text Classification',
      'FastAPI',
      'Gemini API',
    ],
  },
  {
    category: 'Tools',
    items: [
      'Git',
      'GitHub',
      'VS Code',
      'Postman',
      'Vercel',
      'Render',
      'Cloudinary',
      'MongoDB Compass',
      'Linux Basic',
    ],
  },
];

const iconMap = {
  Frontend: Code2,
  Backend: Server,
  Database: Database,
  'AI / ML': BrainCircuit,
  Tools: Wrench,
};

export function Skills() {
  const { content } = useContent();
  const skills = content.skills?.length ? content.skills : fallbackSkills;

  useEffect(() => {
    gsap.fromTo(
      '.skill-pro-card',
      { y: 46, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.78,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-pro-grid',
          start: 'top 82%',
          once: true,
        },
      }
    );

    gsap.to('.skill-card-gradient', {
      xPercent: 45,
      yPercent: -20,
      duration: 7,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.35,
    });
  }, []);

  return (
    <section id="skills" className="section skills-pro">
      <div className="skills-pro-bg" aria-hidden="true" />

      <div className="skills-pro-head reveal">
        <p className="section-kicker">Skills</p>

        <div className="skills-pro-title-row">
          <h2>Tools I use to build production-ready systems.</h2>

          <p>
            A focused stack for building responsive interfaces, secure backend
            APIs, databases, AI/ML workflows, and deployable web products.
          </p>
        </div>
      </div>

      <div className="skills-pro-grid">
        {skills.map((group) => {
          const Icon = iconMap[group.category] || TerminalSquare;

          return (
            <article className="skill-pro-card" key={group.category}>
              <span className="skill-card-gradient" aria-hidden="true" />

              <div className="skill-pro-card-head">
                <div className="skill-pro-icon">
                  <Icon size={20} />
                </div>

                <div>
                  <h3>{group.category}</h3>
                  <small>{group.items?.length || 0} capabilities</small>
                </div>

                <span className="skill-spark">
                  <Sparkles size={15} />
                </span>
              </div>

              <div className="skill-pro-tags">
                {(group.items || []).map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}