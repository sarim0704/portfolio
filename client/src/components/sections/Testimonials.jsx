import { SectionHeader } from '../ui/SectionHeader';
import { useContent } from '../../context/ContentContext';

export function Testimonials() {
  const { content } = useContent();
  if (!content.testimonials?.length) return null;
  return (
    <section className="section testimonials-section">
      <SectionHeader eyebrow="Testimonials" title="What people say" />
      <div className="testimonial-grid">{content.testimonials.map((t) => <article className="testimonial-card reveal" key={t._id || t.name}><p>“{t.quote}”</p><strong>{t.name}</strong><span>{t.title}</span></article>)}</div>
    </section>
  );
}
