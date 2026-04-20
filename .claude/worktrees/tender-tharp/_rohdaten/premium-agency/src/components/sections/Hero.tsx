import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedButton } from '../ui/AnimatedButton';
import { InteractiveBackground } from '../ui/InteractiveBackground';

export const Hero: React.FC = () => {
  return (
    <section style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', paddingBottom: '4rem', paddingTop: '10rem' }}>
      <InteractiveBackground />

      <div className="container" style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="hero-layout" style={{ flex: 1, display: 'flex', gap: '4rem' }}>

          {/* Left: Pitch */}
          <div className="hero-text" style={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
            >
              <div style={{ display: 'inline-block', padding: '0.5rem 1rem', border: '1px solid var(--lilac-500)', background: 'rgba(111, 78, 124, 0.1)', color: 'var(--lilac-300)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '2rem' }}>
                AAA Web & Video Engineering
              </div>
              <h1 className="heading-xl" style={{ marginBottom: '2rem' }}>
                Wir coden <br/>
                digitale <br/>
                <span style={{ color: 'transparent', WebkitTextStroke: '1px var(--lilac-300)' }}>Überlegenheit.</span>
              </h1>
              <p className="text-body" style={{ marginBottom: '3rem', maxWidth: '500px', fontSize: '1.25rem' }}>
                Vergiss Templates. Wir bauen hochperformante Web-Infrastrukturen und konvertierende Videoproduktionen für Marken, die den Markt dominieren wollen.
              </p>
              <div className="hero-buttons">
                <AnimatedButton primary>System anfragen</AnimatedButton>
                <AnimatedButton primary={false}>Play Reel</AnimatedButton>
              </div>
            </motion.div>
          </div>

          {/* Right: Bento Grid */}
          <div className="hero-bento" style={{ flex: '1 1 50%', position: 'relative', perspective: '1200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
              initial={{ opacity: 0, rotateY: 30, z: -300 }}
              animate={{ opacity: 1, rotateY: -15, z: 0 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
            >
              {/* Main Panel */}
              <div className="glass-panel" style={{ position: 'absolute', top: '5%', right: '10%', width: '400px', height: '480px', padding: '2rem', border: '1px solid rgba(111,78,124,0.5)', background: 'rgba(18,16,27,0.9)', boxShadow: '0 30px 60px rgba(0,0,0,0.7), 0 0 40px rgba(111,78,124,0.15)' }}>

                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(179,168,201,0.1)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }} style={{ width: 12, height: 12, border: '2px solid var(--lilac-500)', borderTopColor: 'transparent', borderRadius: '50%' }} />
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 600 }}>CORE_ENGINE // RUNNING</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.3rem' }}>
                    <div style={{ width: 6, height: 6, background: '#10B981', borderRadius: '50%', boxShadow: '0 0 10px #10B981' }} />
                    <div style={{ width: 6, height: 6, background: 'var(--lilac-500)', borderRadius: '50%' }} />
                  </div>
                </div>

                {/* Data Stream */}
                <div style={{ height: 60, background: 'rgba(255,255,255,0.02)', borderRadius: 4, position: 'relative', overflow: 'hidden', marginBottom: '1.5rem', border: '1px solid rgba(179,168,201,0.06)' }}>
                  <motion.div animate={{ x: ['-100%', '100%'] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', top: 0, bottom: 0, width: '40%', background: 'linear-gradient(90deg, transparent, rgba(111,78,124,0.35), transparent)' }} />
                  <div style={{ position: 'absolute', inset: 0, padding: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ height: 4, width: '80%', background: 'rgba(179,168,201,0.1)', borderRadius: 2 }} />
                    <div style={{ height: 4, width: '60%', background: 'rgba(179,168,201,0.06)', borderRadius: 2 }} />
                    <div style={{ height: 4, width: '90%', background: 'rgba(111,78,124,0.4)', borderRadius: 2 }} />
                  </div>
                </div>

                {/* Core Graphic */}
                <div style={{ height: 180, background: 'radial-gradient(circle at center, rgba(111,78,124,0.12) 0%, transparent 70%)', border: '1px solid rgba(179,168,201,0.06)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: 'absolute', width: 100, height: 100, border: '1px solid var(--lilac-500)', borderRadius: '50%' }} />
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', width: 140, height: 140, border: '1px dashed rgba(111,78,124,0.4)', borderRadius: '50%' }} />
                  <motion.div animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }} style={{ position: 'absolute', width: 110, height: 110, border: '2px dotted var(--lilac-300)', borderRadius: '50%' }} />
                  <motion.div animate={{ rotateX: 360, rotateY: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }} style={{ width: 40, height: 40, background: 'rgba(214,197,220,0.9)', boxShadow: '0 0 30px rgba(214,197,220,0.8), 0 0 60px var(--lilac-500)' }} />
                </div>
              </div>

              {/* Floating Panel 1 */}
              <motion.div
                animate={{ y: [-15, 15] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
                className="glass-panel"
                style={{ position: 'absolute', top: '15%', left: '0%', width: '220px', padding: '1rem', background: 'rgba(30,26,46,0.95)', borderTop: '2px solid var(--lilac-500)', zIndex: 10, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.65rem', letterSpacing: '0.1em' }}>SERVER_PING</span>
                  <span style={{ color: '#10B981', fontSize: '0.65rem', fontWeight: 800 }}>8 MS</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '30px' }}>
                  {Array.from({length: 12}).map((_, i) => (
                    <motion.div key={i} animate={{ height: [`${20 + (i * 5) % 60}%`, `${40 + (i * 7) % 50}%`] }}
                      transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, repeatType: 'reverse' }}
                      style={{ flex: 1, background: 'var(--lilac-500)', opacity: 0.8 }} />
                  ))}
                </div>
              </motion.div>

              {/* Floating Panel 2 */}
              <motion.div
                animate={{ y: [10, -10] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut", delay: 1 }}
                className="glass-panel"
                style={{ position: 'absolute', bottom: '15%', left: '5%', width: '280px', padding: '1.5rem', background: 'rgba(30,26,46,0.9)', borderLeft: '3px solid #10B981', backdropFilter: 'blur(30px)' }}
              >
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.1em' }}>WORKFLOW_STATE</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  AWAITING_INPUT
                  <motion.div animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} style={{ width: 8, height: 16, background: '#10B981' }} />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
