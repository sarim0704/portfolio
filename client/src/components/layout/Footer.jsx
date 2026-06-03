import { Github, Linkedin, Mail } from 'lucide-react';
import { useContent } from '../../context/ContentContext';

export function Footer() {
  const { content } = useContent();
  const p = content.profile;
  return (
    <footer className="footer">
      <div><strong>Sarim Azhar</strong><span> © {new Date().getFullYear()} — Built with MERN + motion.</span></div>
      <div className="footer-social">
        <a href={`mailto:${p.email}`}><Mail size={18} /></a>
        <a href={p.github} target="_blank" rel="noreferrer"><Github size={18} /></a>
        <a href={p.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /></a>
      </div>
    </footer>
  );
}
