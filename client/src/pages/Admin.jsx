import { useEffect, useMemo, useState } from 'react';
import { Route, Routes, NavLink, Navigate, useNavigate } from 'react-router-dom';
import { api, endpoints } from '../api/client';
import { useContent } from '../context/ContentContext';
import { fallbackContent } from '../data/fallbackContent';

function tokenExists() { return Boolean(localStorage.getItem('sarim_admin_token')); }

export default function Admin() {
  const [authed, setAuthed] = useState(tokenExists());
  if (!authed) return <Login onLogin={() => setAuthed(true)} />;
  return <AdminShell onLogout={() => { localStorage.removeItem('sarim_admin_token'); setAuthed(false); }} />;
}

function Login({ onLogin }) {
  const [form, setForm] = useState({ email: 'sarimaz786@gmail.com', password: '' });
  const [error, setError] = useState('');
  async function submit(e) {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post(endpoints.login, form);
      localStorage.setItem('sarim_admin_token', data.token);
      onLogin();
    } catch (err) { setError(err.response?.data?.message || 'Login failed. Check backend and .env admin credentials.'); }
  }
  return (
    <main className="admin-login">
      <form onSubmit={submit}>
        <p className="eyebrow">Portfolio CMS</p>
        <h1>Admin Login</h1>
        <input placeholder="Email" value={form.email} onChange={(e)=>setForm({...form,email:e.target.value})} />
        <input placeholder="Password" type="password" value={form.password} onChange={(e)=>setForm({...form,password:e.target.value})} />
        <button>Login</button>
        {error && <p className="admin-error">{error}</p>}
      </form>
    </main>
  );
}

function AdminShell({ onLogout }) {
  const nav = ['profile','projects','skills','experience','testimonials','uploads'];
  return (
    <div className="admin-shell">
      <aside><h2>Sarim CMS</h2>{nav.map((n) => <NavLink key={n} to={`/admin/${n}`}>{n}</NavLink>)}<button onClick={onLogout}>Logout</button><a href="/">View Site</a></aside>
      <section className="admin-content">
        <Routes>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<ProfileEditor />} />
          <Route path="projects" element={<ProjectsEditor />} />
          <Route path="skills" element={<SkillsEditor />} />
          <Route path="experience" element={<ExperienceEditor />} />
          <Route path="testimonials" element={<TestimonialsEditor />} />
          <Route path="uploads" element={<UploadsEditor />} />
        </Routes>
      </section>
    </div>
  );
}

function Field({ label, children }) { return <label className="admin-field"><span>{label}</span>{children}</label>; }
function splitLines(v) { return String(v || '').split('\n').map((x) => x.trim()).filter(Boolean); }
function joinLines(v) { return Array.isArray(v) ? v.join('\n') : ''; }

function ProfileEditor() {
  const { content, reload } = useContent();
  const [form, setForm] = useState(content.profile);
  const [msg, setMsg] = useState('');
  useEffect(() => setForm(content.profile), [content.profile]);
  async function save(e) {
    e.preventDefault(); setMsg('Saving...');
    try { await api.put('/profile/admin', form); await reload(); setMsg('Profile saved.'); } catch (err) { setMsg(err.response?.data?.message || 'Save failed.'); }
  }
  return <form className="admin-panel" onSubmit={save}><h1>Profile</h1><Field label="Name"><input value={form.name||''} onChange={(e)=>setForm({...form,name:e.target.value})}/></Field><Field label="Title"><input value={form.title||''} onChange={(e)=>setForm({...form,title:e.target.value})}/></Field><Field label="Bio"><textarea rows="6" value={form.bio||''} onChange={(e)=>setForm({...form,bio:e.target.value})}/></Field><Field label="Email"><input value={form.email||''} onChange={(e)=>setForm({...form,email:e.target.value})}/></Field><Field label="Phone"><input value={form.phone||''} onChange={(e)=>setForm({...form,phone:e.target.value})}/></Field><Field label="GitHub URL"><input value={form.github||''} onChange={(e)=>setForm({...form,github:e.target.value})}/></Field><Field label="LinkedIn URL"><input value={form.linkedin||''} onChange={(e)=>setForm({...form,linkedin:e.target.value})}/></Field><Field label="Resume URL"><input value={form.resumeUrl||''} onChange={(e)=>setForm({...form,resumeUrl:e.target.value})}/></Field><button>Save Profile</button><p>{msg}</p></form>;
}

function ProjectsEditor() {
  const { content, reload } = useContent();
  const empty = { title:'', subtitle:'', category:'', description:'', features:[], techStack:[], liveUrl:'', githubUrl:'', thumbnailUrl:'', featured:false, order:99 };
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);
  const [msg, setMsg] = useState('');
  function start(p) { setEditing(p._id); setForm({...p, featuresText: joinLines(p.features), techText: (p.techStack||[]).join(', ')}); }
  function reset() { setEditing(null); setForm(empty); }
  async function save(e) {
    e.preventDefault(); setMsg('Saving...');
    const payload = {...form, features: splitLines(form.featuresText || joinLines(form.features)), techStack: String(form.techText || '').split(',').map(s=>s.trim()).filter(Boolean), order: Number(form.order||99)};
    try { editing ? await api.put(`/projects/admin/${editing}`, payload) : await api.post('/projects/admin', payload); await reload(); reset(); setMsg('Project saved.'); } catch(err){ setMsg(err.response?.data?.message || 'Save failed.'); }
  }
  async function remove(id) { if (!confirm('Delete project?')) return; await api.delete(`/projects/admin/${id}`); await reload(); }
  return <div className="admin-panel"><h1>Projects</h1><form onSubmit={save} className="admin-grid-form"><Field label="Title"><input value={form.title||''} onChange={(e)=>setForm({...form,title:e.target.value})}/></Field><Field label="Subtitle"><input value={form.subtitle||''} onChange={(e)=>setForm({...form,subtitle:e.target.value})}/></Field><Field label="Category"><input value={form.category||''} onChange={(e)=>setForm({...form,category:e.target.value})}/></Field><Field label="Order"><input type="number" value={form.order||0} onChange={(e)=>setForm({...form,order:e.target.value})}/></Field><Field label="Description"><textarea rows="4" value={form.description||''} onChange={(e)=>setForm({...form,description:e.target.value})}/></Field><Field label="Features one per line"><textarea rows="4" value={form.featuresText||joinLines(form.features)} onChange={(e)=>setForm({...form,featuresText:e.target.value})}/></Field><Field label="Tech comma separated"><input value={form.techText || (form.techStack||[]).join(', ')} onChange={(e)=>setForm({...form,techText:e.target.value})}/></Field><Field label="Live URL"><input value={form.liveUrl||''} onChange={(e)=>setForm({...form,liveUrl:e.target.value})}/></Field><Field label="GitHub URL"><input value={form.githubUrl||''} onChange={(e)=>setForm({...form,githubUrl:e.target.value})}/></Field><Field label="Thumbnail URL"><input value={form.thumbnailUrl||''} onChange={(e)=>setForm({...form,thumbnailUrl:e.target.value})}/></Field><label className="check"><input type="checkbox" checked={!!form.featured} onChange={(e)=>setForm({...form,featured:e.target.checked})}/> Featured</label><button>{editing?'Update':'Add'} Project</button><button type="button" onClick={reset}>Reset</button></form><p>{msg}</p><div className="admin-list">{content.projects.map((p)=><article key={p._id||p.title}><strong>{p.title}</strong><span>{p.category}</span><div><button onClick={()=>start(p)}>Edit</button>{p._id&&<button onClick={()=>remove(p._id)}>Delete</button>}</div></article>)}</div></div>;
}

function SkillsEditor() {
  const { content, reload } = useContent();
  const [text, setText] = useState('');
  const [msg, setMsg] = useState('');
  useEffect(() => setText(JSON.stringify(content.skills, null, 2)), [content.skills]);
  async function save() { try { await api.put('/skills/admin', { skills: JSON.parse(text) }); await reload(); setMsg('Skills saved.'); } catch(err){ setMsg('Invalid JSON or backend error.'); } }
  return <div className="admin-panel"><h1>Skills</h1><p>Edit JSON skill groups. Items appear as pills, no bars.</p><textarea className="code-area" value={text} onChange={(e)=>setText(e.target.value)} rows="22"/><button onClick={save}>Save Skills</button><p>{msg}</p></div>;
}

function ExperienceEditor() {
  const { content, reload } = useContent();
  const empty = { role:'', organization:'', type:'Experience', startDate:'', endDate:'present', bullets:[], order:99 };
  const [form,setForm]=useState(empty); const [editing,setEditing]=useState(null); const [msg,setMsg]=useState('');
  function start(x){ setEditing(x._id); setForm({...x, bulletsText: joinLines(x.bullets)}); }
  async function save(e){ e.preventDefault(); const payload={...form, bullets: splitLines(form.bulletsText || joinLines(form.bullets)), order:Number(form.order||99)}; try{ editing ? await api.put(`/experience/admin/${editing}`, payload) : await api.post('/experience/admin', payload); await reload(); setForm(empty); setEditing(null); setMsg('Saved.'); }catch(err){ setMsg('Save failed.'); }}
  async function remove(id){ if(!confirm('Delete?'))return; await api.delete(`/experience/admin/${id}`); await reload(); }
  return <div className="admin-panel"><h1>Experience</h1><form onSubmit={save} className="admin-grid-form"><Field label="Role"><input value={form.role||''} onChange={(e)=>setForm({...form,role:e.target.value})}/></Field><Field label="Organization"><input value={form.organization||''} onChange={(e)=>setForm({...form,organization:e.target.value})}/></Field><Field label="Start"><input value={form.startDate||''} onChange={(e)=>setForm({...form,startDate:e.target.value})}/></Field><Field label="End"><input value={form.endDate||''} onChange={(e)=>setForm({...form,endDate:e.target.value})}/></Field><Field label="Bullets"><textarea rows="5" value={form.bulletsText||joinLines(form.bullets)} onChange={(e)=>setForm({...form,bulletsText:e.target.value})}/></Field><button>{editing?'Update':'Add'} Experience</button></form><p>{msg}</p><div className="admin-list">{content.experience.map((x)=><article key={x._id||x.role}><strong>{x.role}</strong><span>{x.organization}</span><div><button onClick={()=>start(x)}>Edit</button>{x._id&&<button onClick={()=>remove(x._id)}>Delete</button>}</div></article>)}</div></div>;
}

function TestimonialsEditor() {
  const { content, reload } = useContent();
  const [form,setForm]=useState({name:'',title:'',quote:'',visible:true,order:1}); const [msg,setMsg]=useState('');
  async function save(e){ e.preventDefault(); try{ await api.post('/testimonials/admin', form); await reload(); setForm({name:'',title:'',quote:'',visible:true,order:1}); setMsg('Testimonial added.'); }catch(err){ setMsg('Save failed.'); }}
  async function remove(id){ if(!confirm('Delete?'))return; await api.delete(`/testimonials/admin/${id}`); await reload(); }
  return <div className="admin-panel"><h1>Testimonials</h1><form onSubmit={save} className="admin-grid-form"><Field label="Name"><input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})}/></Field><Field label="Title"><input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})}/></Field><Field label="Quote"><textarea value={form.quote} rows="4" onChange={(e)=>setForm({...form,quote:e.target.value})}/></Field><button>Add Testimonial</button></form><p>{msg}</p><div className="admin-list">{content.testimonials.map((x)=><article key={x._id}><strong>{x.name}</strong><span>{x.quote}</span><button onClick={()=>remove(x._id)}>Delete</button></article>)}</div></div>;
}

function UploadsEditor() {
  const { content, reload } = useContent();
  const [msg,setMsg]=useState('');
  async function upload(path, file) { if(!file) return; const data = new FormData(); data.append('file', file); setMsg('Uploading...'); try { await api.post(path, data, { headers: { 'Content-Type': 'multipart/form-data' }}); await reload(); setMsg('Uploaded successfully.'); } catch(err){ setMsg(err.response?.data?.message || 'Upload failed. Configure Cloudinary keys first.'); } }
  async function uploadThumb(id, file) { if(!id || !file) return; await upload(`/projects/admin/${id}/thumbnail`, file); }
  return <div className="admin-panel"><h1>Uploads</h1><div className="upload-grid"><Field label="Portrait / Headshot"><input type="file" accept="image/*" onChange={(e)=>upload('/profile/admin/upload/portrait', e.target.files[0])}/></Field><Field label="Resume PDF"><input type="file" accept="application/pdf" onChange={(e)=>upload('/profile/admin/upload/resume', e.target.files[0])}/></Field></div><h2>Project Thumbnails</h2><div className="admin-list">{content.projects.filter(p=>p._id).map(p=><article key={p._id}><strong>{p.title}</strong><input type="file" accept="image/*" onChange={(e)=>uploadThumb(p._id, e.target.files[0])}/></article>)}</div><p>{msg}</p><p>Current portrait: {content.profile.portraitUrl}</p><p>Current resume: {content.profile.resumeUrl || 'Not uploaded yet'}</p></div>;
}
