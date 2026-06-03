import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const cursor = useRef(null);
  useEffect(() => {
    if (window.innerWidth < 768 || 'ontouchstart' in window) return;
    let x = 0, y = 0;
    const setX = gsap.quickTo(cursor.current, 'x', { duration: 0.08, ease: 'power3' });
    const setY = gsap.quickTo(cursor.current, 'y', { duration: 0.08, ease: 'power3' });
    const move = (e) => { x = e.clientX; y = e.clientY; setX(x - 6); setY(y - 6); };
    const enter = () => cursor.current?.classList.add('cursor-grow');
    const leave = () => cursor.current?.classList.remove('cursor-grow', 'cursor-view');
    window.addEventListener('mousemove', move);
    const nodes = document.querySelectorAll('a, button, .project-card');
    nodes.forEach((n) => { n.addEventListener('mouseenter', enter); n.addEventListener('mouseleave', leave); });
    document.querySelectorAll('.project-card').forEach((n) => n.addEventListener('mouseenter', () => cursor.current?.classList.add('cursor-view')));
    return () => {
      window.removeEventListener('mousemove', move);
      nodes.forEach((n) => { n.removeEventListener('mouseenter', enter); n.removeEventListener('mouseleave', leave); });
    };
  }, []);
  return <div ref={cursor} className="cursor" />;
}
