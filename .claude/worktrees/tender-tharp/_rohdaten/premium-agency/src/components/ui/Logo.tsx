import React from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
      style={{ display: 'flex', alignItems: 'center', gap: '1rem', cursor: 'pointer' }}
    >
      <div style={{ position: 'relative', width: '36px', height: '36px' }}>
        {/* Geometric SVG Hexagon/Cube Base */}
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <motion.path
            d="M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z"
            stroke="var(--purple-500)"
            strokeWidth="4"
            fill="rgba(111, 78, 124, 0.15)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          <motion.path
            d="M50 0V50V100"
            stroke="var(--purple-600)"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          />
          <motion.path
            d="M6.69873 25L50 50L93.3013 25"
            stroke="var(--purple-600)"
            strokeWidth="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          />
          {/* M Lettermark inside */}
          <path d="M35 65V40L50 55L65 40V65" stroke="#fff" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter"/>
        </svg>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ 
          fontSize: '1.2rem', 
          fontWeight: 800, 
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--text-primary)',
          lineHeight: 1
        }}>
          Medientrupp
        </span>
        <span style={{ fontSize: '0.65rem', color: 'var(--purple-500)', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '2px' }}>
          Digital Agency
        </span>
      </div>
    </motion.div>
  );
};
