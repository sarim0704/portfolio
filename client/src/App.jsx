import { AnimatePresence, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Portfolio from './pages/Portfolio.jsx';
import Admin from './pages/Admin.jsx';

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin/*" element={<Admin />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}
