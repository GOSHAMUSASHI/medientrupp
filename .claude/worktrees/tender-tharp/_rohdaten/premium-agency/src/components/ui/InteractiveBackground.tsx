import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export const InteractiveBackground: React.FC = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
  const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - windowSize.width / 2);
      mouseY.set(e.clientY - windowSize.height / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, windowSize]);

  const spotlightX = useTransform(smoothMouseX, v => v + windowSize.width / 2);
  const spotlightY = useTransform(smoothMouseY, v => v + windowSize.height / 2);

  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden', background: 'var(--bg-primary)', zIndex: 0
    }}>
      {/* 1. Underlying Dot Grid (Engineer look) */}
      <div className="bg-grid" />

      {/* 2. Horizontal Tech Scanner line (slowly sweeping down) */}
      <motion.div
        animate={{ y: ['-10%', '110%'] }}
        transition={{ duration: 10, ease: "linear", repeat: Infinity }}
        style={{
          position: 'absolute', left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--lilac-500), transparent)',
          boxShadow: '0 0 20px rgba(111, 78, 124, 0.7)',
          opacity: 0.3,
          zIndex: 1
        }}
      />

      {/* 3. Mouse Interactive Scanner Spotlight */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0, top: 0,
          width: '800px', height: '800px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(111, 78, 124, 0.1) 0%, transparent 60%)',
          border: '1px solid rgba(111, 78, 124, 0.06)',
          x: useTransform(spotlightX, v => v - 400),
          y: useTransform(spotlightY, v => v - 400),
          pointerEvents: 'none',
          willChange: 'transform',
          zIndex: 2
        }}
      >
        {/* Crosshair at center of spotlight */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 40, height: 1, background: 'rgba(111,78,124,0.35)', transform: 'translate(-50%, -50%)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 1, height: 40, background: 'rgba(111,78,124,0.35)', transform: 'translate(-50%, -50%)' }} />
      </motion.div>

      {/* 4. Deep Vignette to fade everything smoothly out to black around corners */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(circle at center, transparent 30%, var(--bg-primary) 100%)',
        pointerEvents: 'none',
        zIndex: 3
      }} />
    </div>
  );
};
