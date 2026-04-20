import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  primary?: boolean;
}

export const AnimatedButton: React.FC<ButtonProps> = ({ children, onClick, primary = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 1.5rem',
        borderRadius: '2px', // Brutalist sharp edge
        border: `1px solid ${primary ? 'var(--purple-500)' : 'rgba(255,255,255,0.1)'}`,
        background: primary ? 'rgba(111, 78, 124, 0.12)' : 'transparent',
        color: '#fff',
        fontSize: '1rem',
        fontWeight: 600,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        overflow: 'hidden',
        minWidth: '220px',
        transition: 'border-color 0.3s ease',
      }}
    >
      {/* Background slide-in effect */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isHovered ? '0%' : '-100%' }}
        transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          background: primary ? 'var(--purple-600)' : 'rgba(255,255,255,0.05)',
          zIndex: -1
        }}
      />
      
      <span>{children}</span>
      
      {/* Sliding Arrow */}
      <motion.div
        animate={{ x: isHovered ? 5 : 0, opacity: isHovered ? 1 : 0.7 }}
        transition={{ duration: 0.2 }}
      >
        <ArrowRight size={18} />
      </motion.div>
      
      {/* Corner cut-out brutalist detail */}
      <div style={{ position: 'absolute', bottom: -1, right: -1, width: 8, height: 8, background: 'var(--bg-primary)', borderTop: `1px solid ${primary ? 'var(--purple-500)' : 'rgba(255,255,255,0.1)'}`, borderLeft: `1px solid ${primary ? 'var(--purple-500)' : 'rgba(255,255,255,0.1)'}` }} />
    </motion.button>
  );
};
