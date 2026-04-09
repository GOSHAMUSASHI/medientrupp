import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40 });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, var(--purple-500), #10B981)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 10001,
        boxShadow: '0 0 10px rgba(147, 51, 234, 0.8)',
      }}
    />
  );
};
