import { useEffect, useState } from 'react';
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768 || 'ontouchstart' in window);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return isMobile;
}
