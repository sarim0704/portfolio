import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api, endpoints } from '../api/client';
import { fallbackContent } from '../data/fallbackContent';

const ContentContext = createContext(null);

export function ContentProvider({ children }) {
  const [content, setContent] = useState(fallbackContent);
  const [loading, setLoading] = useState(true);

  async function loadContent() {
    setLoading(true);
    try {
      const [profile, projects, skills, experience, testimonials] = await Promise.all([
        api.get(endpoints.profile),
        api.get(endpoints.projects),
        api.get(endpoints.skills),
        api.get(endpoints.experience),
        api.get(endpoints.testimonials)
      ]);
      setContent({
        profile: profile.data || fallbackContent.profile,
        projects: projects.data?.length ? projects.data : fallbackContent.projects,
        skills: skills.data?.length ? skills.data : fallbackContent.skills,
        experience: experience.data?.length ? experience.data : fallbackContent.experience,
        testimonials: testimonials.data || []
      });
    } catch (error) {
      setContent(fallbackContent);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadContent(); }, []);

  const value = useMemo(() => ({ content, loading, reload: loadContent, setContent }), [content, loading]);
  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useContent() {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used inside ContentProvider');
  return ctx;
}
