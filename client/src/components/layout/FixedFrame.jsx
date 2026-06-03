import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Github, Linkedin, Moon, Sun, Download, Menu, X } from 'lucide-react';
import { useContent } from '../../context/ContentContext';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export function FixedFrame() {
  const { content } = useContent();
  const { theme, toggleTheme } = useTheme();

  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef = useRef(null);
  const actionsRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const lastScroll = useRef(0);

  const profile = content.profile || {};
  const resumeUrl = profile.resumeUrl || '#';

  const githubUrl = profile.github?.startsWith('http')
    ? profile.github
    : `https://github.com/${profile.github || 'sarim0704'}`;

  const linkedinUrl = profile.linkedin?.startsWith('http')
    ? profile.linkedin
    : `https://linkedin.com/in/${profile.linkedin || 'sarim-azhar-6333422a8'}`;

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      const goingDown = current > lastScroll.current;

      if (current < 80) {
        setHidden(false);
      } else if (goingDown && current > 130) {
        setHidden(true);
        setMobileOpen(false);
      } else {
        setHidden(false);
      }

      lastScroll.current = Math.max(current, 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    [navRef.current, actionsRef.current].forEach((el) => {
      if (!el) return;

      gsap.to(el, {
        y: hidden ? -88 : 0,
        opacity: hidden ? 0 : 1,
        duration: 0.42,
        ease: 'power3.out',
      });
    });
  }, [hidden]);

  useEffect(() => {
    if (!mobileMenuRef.current) return;

    if (mobileOpen) {
      gsap.fromTo(
        mobileMenuRef.current,
        { opacity: 0, y: -10, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.28,
          ease: 'power3.out',
          pointerEvents: 'auto',
        }
      );
    } else {
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -8,
        scale: 0.96,
        duration: 0.2,
        ease: 'power2.inOut',
        pointerEvents: 'none',
      });
    }
  }, [mobileOpen]);

  return (
    <>
      <div className="fixed-brand">
        <span />
        <a href="#home">SARIM AZHAR</a>
      </div>

      <header ref={navRef} className="center-nav-dock">
        <nav className="center-nav-tab" aria-label="Portfolio navigation">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <div ref={actionsRef} className="right-actions-dock">
        <a
          className="header-action-link"
          href={resumeUrl}
          target="_blank"
          rel="noreferrer"
        >
          Resume
          <Download size={14} />
        </a>

        <button
          className="header-action-icon"
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <button
          className="mobile-menu-button"
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Open mobile menu"
        >
          {mobileOpen ? <X size={17} /> : <Menu size={17} />}
          <span>Menu</span>
        </button>

        <div ref={mobileMenuRef} className="mobile-menu-card">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}

          <div className="mobile-menu-line" />

          <a href={resumeUrl} target="_blank" rel="noreferrer">
            Resume
          </a>
        </div>
      </div>

      <div className="fixed-social-strip">
        <a href={githubUrl} target="_blank" rel="noreferrer" aria-label="GitHub">
          <Github size={18} />
        </a>

        <a
          href={linkedinUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
        >
          <Linkedin size={18} />
        </a>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span>SCROLL</span>
        <i />
      </div>
    </>
  );
}