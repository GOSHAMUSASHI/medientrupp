import React, { useEffect, useRef } from 'react';

export const CursorEffect: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    let mouseX = -100, mouseY = -100;
    let trailX = -100, trailY = -100;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onDown = () => { if (dotRef.current) dotRef.current.style.transform = 'scale(0.6)'; };
    const onUp = () => { if (dotRef.current) dotRef.current.style.transform = 'scale(1)'; };

    const tick = () => {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX - 5}px`;
        dotRef.current.style.top = `${mouseY - 5}px`;
      }
      if (trailRef.current) {
        trailRef.current.style.left = `${trailX - 16}px`;
        trailRef.current.style.top = `${trailY - 16}px`;
      }
      animId = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Hide entirely on touch devices (initial render check)
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) return null;

  return (
    <>
      <div ref={trailRef} style={{
        position: 'fixed', left: -100, top: -100,
        width: 32, height: 32, borderRadius: '50%',
        background: 'rgba(111, 78, 124, 0.18)',
        pointerEvents: 'none', zIndex: 99990,
        filter: 'blur(8px)', willChange: 'left, top',
      }} />
      <div ref={dotRef} style={{
        position: 'fixed', left: -100, top: -100,
        width: 10, height: 10, borderRadius: '50%',
        background: 'var(--lilac-500)',
        boxShadow: '0 0 12px var(--lilac-500)',
        pointerEvents: 'none', zIndex: 99991,
        willChange: 'left, top, transform',
        transition: 'transform 0.1s ease',
      }} />
    </>
  );
};
