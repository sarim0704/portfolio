import { useEffect } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import TextPlugin from 'gsap/TextPlugin';
import { useLenis } from '../hooks/useLenis';
import { Preloader } from '../components/layout/Preloader';
import { CustomCursor } from '../components/layout/CustomCursor';
import { FixedFrame } from '../components/layout/FixedFrame';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Projects } from '../components/sections/Projects';
import { Skills } from '../components/sections/Skills';
import { Experience } from '../components/sections/Experience';
import { Testimonials } from '../components/sections/Testimonials';
import { Contact } from '../components/sections/Contact';
import { Footer } from '../components/layout/Footer';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export default function Portfolio() {
  useLenis(true);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 82%', once: true } });
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <>
      <Preloader />
      <CustomCursor />
      <FixedFrame />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
