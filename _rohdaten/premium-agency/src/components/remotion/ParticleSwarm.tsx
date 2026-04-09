import React from 'react';
import { AbsoluteFill, useVideoConfig, useCurrentFrame } from 'remotion';

export const ParticleSwarm: React.FC = () => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();

  const slowFrame = frame * 0.2;

  const orbs = [
    { xPhase: 0, yPhase: 1, size: 800, color: 'rgba(147, 51, 234, 0.4)' },
    { xPhase: 2, yPhase: 3, size: 600, color: 'rgba(107, 33, 168, 0.3)' },
    { xPhase: 4, yPhase: 5, size: 1000, color: 'rgba(59, 7, 100, 0.5)' }
  ].map((orb, i) => {
    const x = (Math.sin(slowFrame * 0.02 + orb.xPhase) * 0.3 + 0.5) * width;
    const y = (Math.cos(slowFrame * 0.015 + orb.yPhase) * 0.3 + 0.5) * height;
    
    // Normal Math instead of interpolate
    const scale = (Math.sin(slowFrame * 0.05 + i) * 0.15) + 0.95; 

    return (
      <div
        key={`orb-${i}`}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: orb.size,
          height: orb.size,
          borderRadius: '50%',
          backgroundColor: orb.color,
          transform: `translate(-50%, -50%) scale(${scale})`,
          filter: 'blur(120px)'
        }}
      />
    );
  });

  const floaters = Array.from({ length: 12 }).map((_, i) => {
    const isCircle = i % 2 === 0;
    
    // Calculate position
    const baseY = height + 100 - ((frame * (0.5 + i * 0.1)) % (height + 200));
    const baseX = (i * width) / 12 + Math.sin(frame * 0.01 + i) * 50;

    const rotation = frame * (0.2 + i * 0.05);
    
    // Calculate opacity manually
    let opacity = 0;
    if (baseY > height * 0.5) {
      opacity = ((height - baseY) / (height * 0.5)) * 0.8;
    } else {
      opacity = (baseY / (height * 0.5)) * 0.8;
    }
    // Prevent negative opacity
    opacity = Math.max(0, opacity);

    return isCircle ? (
      <div key={`floater-${i}`} style={{
        position: 'absolute',
        left: baseX,
        top: baseY,
        width: 180 + i * 20,
        height: 180 + i * 20,
        borderRadius: '50%',
        border: '2px solid rgba(168, 85, 247, 0.7)',
        opacity,
        transform: 'translate(-50%, -50%)',
      }}>
        <div style={{
          position: 'absolute',
          inset: '30px',
          borderRadius: '50%',
          border: '2px dashed rgba(168, 85, 247, 0.5)',
          transform: `rotate(${rotation}deg)`
        }} />
      </div>
    ) : (
      <div key={`floater-${i}`} style={{
        position: 'absolute',
        left: baseX,
        top: baseY,
        width: 80,
        height: 80,
        opacity,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}>
        <div style={{ position: 'absolute', width: '100%', height: '4px', top: '38px', background: 'rgba(216, 180, 254, 0.8)' }} />
        <div style={{ position: 'absolute', height: '100%', width: '4px', left: '38px', background: 'rgba(216, 180, 254, 0.8)' }} />
      </div>
    );
  });

  return (
    <AbsoluteFill style={{
      backgroundColor: '#0A0512', // Hardcoded hex to ensure it renders inside Remotion iframe player
      overflow: 'hidden'
    }}>
      {orbs}
      {floaters}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, transparent 30%, rgba(10, 5, 18, 0.8) 100%)',
      }} />
    </AbsoluteFill>
  );
};
