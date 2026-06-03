import { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useContent } from '../../context/ContentContext';

function SplitName({ name }) {
  return (
    <h1 className="hero-name split-name" aria-label={name}>
      {name.split('').map((ch, i) => (
        <span key={`${ch}-${i}`}>{ch === ' ' ? '\u00A0' : ch}</span>
      ))}
    </h1>
  );
}

export function Hero() {
  const { content } = useContent();
  const profile = content.profile;
  const heroRef = useRef(null);

  const roles = useMemo(
    () =>
      profile.heroRoles?.length
        ? profile.heroRoles
        : ['MERN Developer', 'AI Product Builder', 'CS Student'],
    [profile.heroRoles]
  );

  const [role, setRole] = useState(roles[0]);

  useEffect(() => {
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % roles.length;
      setRole(roles[index]);
    }, 2100);

    return () => clearInterval(interval);
  }, [roles]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-kinetic-line', {
        scaleX: 0,
        transformOrigin: 'left center',
      });

      gsap.fromTo(
        '.split-name span',
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 1.08,
          delay: 1.2,
          ease: 'power4.out',
        }
      );

      gsap.fromTo(
        '.hero-fade',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.12,
          delay: 1.45,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      gsap.to('.hero-kinetic-line', {
        scaleX: 1,
        duration: 1.1,
        delay: 1.75,
        ease: 'power3.out',
      });

      gsap.to('.orb-one', {
        x: 26,
        y: -18,
        duration: 8,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      gsap.to('.orb-two', {
        x: -18,
        y: 24,
        duration: 10,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });

      gsap.to('.tech-chip', {
        y: -8,
        duration: 2.6,
        stagger: 0.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="hero hero-polished" ref={heroRef}>
      <div className="hero-bg" aria-hidden="true">
        <span className="orb orb-one" />
        <span className="orb orb-two" />
        <span className="grid-fade" />

        <span className="code-line code-line-a">
          const product = build(MERN, AI);
        </span>

        <span className="code-line code-line-b">
          deploy.ready = true;
        </span>
      </div>

      <div className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow hero-fade">
            Full-stack systems, intelligent products
          </p>

          <SplitName name={profile.name || 'Sarim Azhar'} />

          <div className="hero-role-wrap hero-fade">
            <span className="role-label">Currently</span>
            <p className="hero-role">
              <span>{role}</span>
            </p>
          </div>

          <p className="hero-intro hero-fade">
            I build scalable MERN applications and AI-powered platforms with
            clean interfaces, secure backend architecture, and practical ML
            workflows.
          </p>

          <div className="hero-ctas hero-fade">
            <Button as="a" href="#projects" magnetic>
              Explore Projects
            </Button>

            <Button as="a" href="#contact" className="btn-secondary" magnetic>
              Contact Me
            </Button>
          </div>

          <div className="hero-kinetic hero-fade" aria-hidden="true">
            <span>React</span>
            <i className="hero-kinetic-line" />
            <span>Node</span>
            <i className="hero-kinetic-line" />
            <span>MongoDB</span>
            <i className="hero-kinetic-line" />
            <span>AI/ML</span>
          </div>
        </div>

        <div className="portrait-stage hero-fade">
          <div className="portrait-aura" aria-hidden="true" />
          <div className="portrait-grid" aria-hidden="true" />

          <img
            className="portrait-cutout"
            src={profile.portraitUrl || '/uploads/portrait.png'}
            alt="Sarim Azhar portrait"
          />

          <span className="tech-chip chip-react">React</span>
          <span className="tech-chip chip-ai">AI/ML</span>
          <span className="tech-chip chip-api">REST APIs</span>
        </div>
      </div>

      <div className="hero-bottom-strip hero-fade">
        {['SaaS Platforms', 'AI Apps', 'Dashboards', 'Client Sites'].map(
          (item) => (
            <a href="#projects" key={item}>
              {item}
              <ArrowUpRight size={14} />
            </a>
          )
        )}
      </div>

      <a className="mobile-scroll-cue" href="#about" aria-label="Scroll to about">
        <ArrowDown size={18} />
      </a>
    </section>
  );
}