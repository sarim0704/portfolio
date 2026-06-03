import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Preloader() {
  const ref = useRef(null);
  const count = useRef(null);
  useEffect(() => {
    const obj = { value: 0 };
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.to(obj, {
      value: 100,
      duration: 1.2,
      onUpdate: () => { if (count.current) count.current.textContent = `${Math.round(obj.value)}%`; }
    }).to(ref.current, { opacity: 0, duration: 0.45, pointerEvents: 'none' });
    return () => tl.kill();
  }, []);
  return <div className="preloader" ref={ref}><span ref={count}>0%</span></div>;
}
