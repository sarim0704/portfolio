import { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { api, endpoints } from '../../api/client';
import { useContent } from '../../context/ContentContext';
import { Button } from '../ui/Button';

export function Contact() {
  const { content } = useContent();
  const p = content.profile;
  const [form, setForm] = useState({ name: '', email: '', subject: 'Project Inquiry', message: '' });
  const [status, setStatus] = useState('');
  async function submit(e) {
    e.preventDefault();
    setStatus('Sending...');
    try {
      await api.post(endpoints.contact, form);
      setStatus('Message sent successfully.');
      setForm({ name: '', email: '', subject: 'Project Inquiry', message: '' });
    } catch (error) {
      setStatus(error.response?.data?.message || 'Contact backend is not configured yet.');
    }
  }
  return (
    <section id="contact" className="section contact-section">
      <div className="contact-grid">
        <div className="reveal"><p className="eyebrow">Contact</p><h2>Let’s Build Intelligent Web Products</h2><p>Have a project, internship opportunity, or product idea? Send a message directly from the portfolio.</p><div className="contact-links"><a href={`mailto:${p.email}`}><Mail size={18}/> {p.email}</a><a href={p.github} target="_blank" rel="noreferrer"><Github size={18}/> GitHub</a><a href={p.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/> LinkedIn</a>{p.resumeUrl && <a href={p.resumeUrl} target="_blank" rel="noreferrer">Download CV ↓</a>}</div></div>
        <form className="contact-form reveal" onSubmit={submit}>
          <input placeholder="Name" value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} required />
          <input placeholder="Email" type="email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} required />
          <select value={form.subject} onChange={(e)=>setForm({...form,subject:e.target.value})}><option>Project Inquiry</option><option>Internship Opportunity</option><option>Collaboration</option><option>General Message</option></select>
          <textarea placeholder="Message" value={form.message} onChange={(e)=>setForm({...form,message:e.target.value})} rows="6" required />
          <Button magnetic>Send Message →</Button>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
    </section>
  );
}
