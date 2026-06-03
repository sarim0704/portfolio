import { SectionHeader } from '../ui/SectionHeader';
import { useContent } from '../../context/ContentContext';

export function Experience() {
  const { content } = useContent();
  return (
    <section id="experience" className="section experience-section">
      <SectionHeader eyebrow="Experience" title="Academic and leadership timeline" />
      <div className="timeline">
        {content.experience.sort((a,b) => a.order-b.order).map((item) => <article className="timeline-item reveal" key={item._id || item.role}><div className="timeline-node"/><div><p className="eyebrow">{item.startDate} — {item.endDate}</p><h3>{item.role}</h3><strong>{item.organization}</strong><ul>{item.bullets?.map((b) => <li key={b}>{b}</li>)}</ul></div></article>)}
      </div>
    </section>
  );
}
