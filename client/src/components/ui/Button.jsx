import { motion } from 'framer-motion';

export function Button({ children, as = 'button', className = '', magnetic = false, ...props }) {
  const Component = motion[as] || motion.button;
  function handleMove(e) {
    if (!magnetic || window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    e.currentTarget.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
  }
  function handleLeave(e) {
    if (!magnetic) return;
    e.currentTarget.style.transform = 'translate(0,0)';
  }
  return (
    <Component
      className={`btn ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </Component>
  );
}
