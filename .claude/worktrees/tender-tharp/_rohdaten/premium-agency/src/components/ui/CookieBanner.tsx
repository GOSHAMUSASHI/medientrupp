import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, X } from 'lucide-react';
import { useToast } from './Toast';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const addToast = useToast();

  useEffect(() => {
    // Check backend logical storage
    const consent = localStorage.getItem('medientrupp_cookie_consent');
    if (!consent) {
      // Small delay to let the page load its AAA aesthetic before interrupting
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (level: 'ALL' | 'NECESSARY') => {
    localStorage.setItem('medientrupp_cookie_consent', level);
    setIsVisible(false);
    if (level === 'ALL') {
      addToast('Danke 💜 Performance-Tracking aktiv.', 'info');
    } else {
      addToast('Nur notwendige Cookies aktiviert.', 'success');
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '2rem',
            maxWidth: '450px',
            background: 'rgba(10,5,15,0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--lilac-500)',
            borderRadius: '4px',
            padding: '1.5rem',
            zIndex: 9999,
            boxShadow: '0 20px 80px rgba(0, 0, 0, 0.8), 0 0 20px rgba(179,168,201,0.1)'
          }}
        >
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
             <div style={{ width: 40, height: 40, background: 'rgba(179, 168, 201, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <ShieldAlert size={20} color="var(--lilac-500)" />
             </div>
             <div>
               <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', marginBottom: '0.2rem' }}>Data Integrity & Tracking</h3>
               <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                 Um dir die beste Infrastruktur zu bieten, analysieren wir Daten. Keine Third-Party-Mülldaten, reines Performance-Tracking.
               </p>
             </div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => handleConsent('ALL')}
              style={{
                flex: 1, padding: '0.8rem', background: 'var(--purple-600)', color: '#fff', 
                border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s'
              }}
            >
              Akzeptieren
            </button>
            <button
              onClick={() => handleConsent('NECESSARY')}
              style={{
                flex: 1, padding: '0.8rem', background: 'transparent', color: 'var(--text-primary)', 
                border: '1px solid rgba(255,255,255,0.1)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Nur Notwendig
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
