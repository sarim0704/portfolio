import { useEffect } from 'react';
import gsap from 'gsap';
import {
  Bot,
  BrainCircuit,
  Code2,
  Globe,
  Laptop2,
  Layers3,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react';
import { useContent } from '../../context/ContentContext';

const stats = [
  { value: 7, suffix: '', label: 'Projects Built' },
  { value: 3, suffix: '+', label: 'Services Deployed' },
  { value: 98.76, suffix: '%', label: 'ML Model Accuracy' },
  { value: 3.0, suffix: '', label: 'CGPA / Air University' },
];

const specialtyCards = [
  {
    icon: Code2,
    title: 'Full-Stack MERN Engineering',
    text: 'Complete web apps with React, Node.js, Express, MongoDB, authentication, APIs, dashboards, and deployment-ready structure.',
  },
  {
    icon: BrainCircuit,
    title: 'AI/ML Model Training',
    text: 'Hands-on experience training ML models, preparing datasets, evaluating accuracy, and connecting models with real web products.',
  },
  {
    icon: Bot,
    title: 'AI Agent & Automation Setup',
    text: 'I integrate AI assistants, automation flows, and intelligent features into websites so products feel smarter and more useful.',
  },
  {
    icon: LayoutDashboard,
    title: 'SaaS Product Thinking',
    text: 'I think in terms of user journeys, protected routes, admin dashboards, pricing flows, content systems, and scalable product UX.',
  },
];

const roadmapItems = [
  {
    year: '2023',
    title: 'Started Web Development',
    text: 'Began with HTML, CSS, JavaScript, and the basic structure of responsive websites.',
    icon: Globe,
  },
  {
    year: '2024',
    title: '.NET & Visual Programming',
    text: 'Worked on application-based development, visual programming, and foundational software concepts.',
    icon: Laptop2,
  },
  {
    year: '2024',
    title: 'MERN Stack + Flutter',
    text: 'Moved into React, Node.js, Express, MongoDB, and also explored Flutter app development.',
    icon: Layers3,
  },
  {
    year: '2025',
    title: 'AI / ML Model Training',
    text: 'Started training models, preparing datasets, evaluating results, and connecting ML with web apps.',
    icon: BrainCircuit,
  },
  {
    year: 'Now',
    title: 'AI Automation + MERN Products',
    text: 'Focused on AI-integrated tools, automation flows, agents, dashboards, and production MERN products.',
    icon: Bot,
  },
];

export function About() {
  const { content } = useContent();
  const profile = content.profile || {};

  useEffect(() => {
    const counters = document.querySelectorAll('[data-about-count]');

    counters.forEach((el) => {
      const target = parseFloat(el.dataset.aboutCount);
      const start = target > 50 ? 90 : 0;
      const obj = { value: start };

      gsap.to(obj, {
        value: target,
        duration: 1.25,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
        onUpdate: () => {
          if (target === 3.0) {
            el.textContent = obj.value.toFixed(1);
          } else {
            el.textContent =
              target % 1 ? obj.value.toFixed(2) : Math.round(obj.value);
          }
        },
      });
    });

    gsap.fromTo(
      '.about-mini-card',
      { y: 34, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.68,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-specialty-grid',
          start: 'top 84%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '.about-roadmap-step',
      { y: 36, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 0.72,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-roadmap',
          start: 'top 82%',
          once: true,
        },
      }
    );

    gsap.fromTo(
      '.roadmap-line-progress',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.25,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-roadmap',
          start: 'top 82%',
          once: true,
        },
      }
    );
  }, []);

  return (
    <section id="about" className="section about-clean">
      <div className="about-clean-bg" aria-hidden="true" />

      <div className="about-clean-head reveal">
        <p className="section-kicker">About</p>
        <h2>Developer focused on MERN, AI products, and real deployment.</h2>
      </div>

      <div className="about-clean-core">
        <div className="about-clean-photo reveal">
          <img
            src={profile.portraitUrl || '/uploads/portrait.png'}
            alt="Sarim Azhar"
          />

          <div className="about-photo-line">
            <Sparkles size={14} />
            MERN Developer · AI/ML Product Builder
          </div>
        </div>

        <div className="about-clean-bio reveal">
          <h3>
            I’m a Computer Science student with advanced skills in MERN web
            development and hands-on experience in AI/ML model training.
          </h3>

          <p>
            I build AI-integrated tools, SaaS-style dashboards, client websites,
            and backend systems that connect clean interfaces with practical
            automation. My focus is not only writing code, but aligning AI,
            APIs, databases, and user flows into products people can actually
            use.
          </p>

          <p>
            Right now, I’m improving HumanTrace AI Pro, building production-ready
            MERN projects, and looking for internship or freelance opportunities
            where I can contribute to real web products.
          </p>

          <div className="about-current-line">
            Currently: Building HumanTrace AI Pro · Seeking MERN internship ·
            Based in Kharian, Pakistan
          </div>
        </div>
      </div>

      <div className="about-stats-grid reveal">
        {stats.map((item) => (
          <article className="about-stat-tile" key={item.label}>
            <strong>
              <span data-about-count={item.value}>0</span>
              {item.suffix}
            </strong>
            <p>{item.label}</p>
          </article>
        ))}
      </div>

      <div className="about-specialty-grid">
        {specialtyCards.map((card) => {
          const Icon = card.icon;

          return (
            <article className="about-mini-card" key={card.title}>
              <span className="about-mini-icon">
                <Icon size={18} />
              </span>
              <h4>{card.title}</h4>
              <p>{card.text}</p>
            </article>
          );
        })}
      </div>

      <div className="about-roadmap reveal">
        <div className="about-roadmap-head">
          <p className="section-kicker">Roadmap</p>
          <h3>How my development journey evolved.</h3>
        </div>

        <div className="about-roadmap-stage">
          <div className="about-roadmap-runner-bg" aria-hidden="true">
            <div className="journey-runner-icon">
              <Bot size={30} />
            </div>
          </div>

          <div className="about-roadmap-line">
            <span className="roadmap-line-progress" />
          </div>

          <div className="about-roadmap-grid">
            {roadmapItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  className="about-roadmap-step"
                  key={`${item.year}-${item.title}`}
                >
                  <div className="roadmap-step-top">
                    <span className="roadmap-icon">
                      <Icon size={18} />
                    </span>
                    <small>{item.year}</small>
                  </div>

                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}