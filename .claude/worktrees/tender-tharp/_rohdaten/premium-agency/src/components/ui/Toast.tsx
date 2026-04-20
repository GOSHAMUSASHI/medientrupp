import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';
interface Toast { id: string; message: string; type: ToastType; }

const ToastContext = createContext<(msg: string, type?: ToastType) => void>(() => {});
export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);

  const icons = { success: <CheckCircle size={18} color="#10B981" />, error: <AlertCircle size={18} color="#EF4444" />, info: <Info size={18} color="var(--purple-300)" /> };
  const colors = { success: '#10B981', error: '#EF4444', info: 'var(--purple-500)' };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div style={{ position: 'fixed', top: '5rem', right: '1.5rem', zIndex: 99997, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <AnimatePresence>
          {toasts.map(t => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 80, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 80, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '1rem 1.5rem',
                background: 'rgba(10,5,15,0.97)',
                backdropFilter: 'blur(20px)',
                border: `1px solid ${colors[t.type]}40`,
                borderLeft: `3px solid ${colors[t.type]}`,
                minWidth: '280px', maxWidth: '380px',
                boxShadow: `0 10px 40px rgba(0,0,0,0.5), 0 0 20px ${colors[t.type]}20`,
              }}
            >
              {icons[t.type]}
              <span style={{ color: '#fff', fontSize: '0.9rem', flex: 1, lineHeight: 1.4 }}>{t.message}</span>
              <button onClick={() => setToasts(p => p.filter(x => x.id !== t.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', padding: 0 }}>
                <X size={16} />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
