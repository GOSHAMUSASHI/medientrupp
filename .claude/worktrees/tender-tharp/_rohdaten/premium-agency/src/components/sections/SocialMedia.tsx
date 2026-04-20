import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, TrendingUp, Users, Activity, Play, Settings2, Sparkles } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export const SocialMedia: React.FC = () => {
  const [sliderVal, setSliderVal] = useState(25);
  const hooks = [
    { title: "Die krasse Story...", rating: 98 },
    { title: "Warum du xyz...", rating: 85 },
    { title: "3 Fehler bei...", rating: 92 }
  ];

  const views = Math.floor(sliderVal * 4200);
  const followers = Math.floor(sliderVal * 84);
  const retention = Math.min(100, Math.floor(30 + sliderVal * 0.5));

  return (
    <section style={{ padding: '8rem 0', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '-20%', top: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', right: '-10%', bottom: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: '#EC4899', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Social Dominance</span>
          <h2 className="heading-lg" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
            Aufmerksamkeit ist die <br/><span style={{ color: 'transparent', WebkitTextStroke: '1px #EC4899', backgroundImage: 'linear-gradient(90deg, #EC4899, #9333EA)', backgroundClip: 'text', WebkitBackgroundClip: 'text' }}>neue Währung.</span>
          </h2>
          <p className="text-body" style={{ maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem' }}>
            Hör auf, Content für die Nische zu machen. Wir produzieren hoch konvertierende Short-Form Videos, die den Algorithmus zwingen, dich zu belohnen. Datengetriebene Hooks. Aggressive Retention.
          </p>
        </div>

        <div className="simulator-layout simulator-reverse" style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
          
          <div style={{ flex: '1 1 50%', textAlign: 'left' }}>
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#EC4899', fontSize: '0.8rem', letterSpacing: '0.1em', fontWeight: 700, marginBottom: '1.5rem' }}>
              <motion.div animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#EC4899' }} />
              VIRAL STATUS: ACTIVE
            </div>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem' }}>Die Psychologie <br/> hinter dem Algorithmus.</h3>
            
            <p className="text-body" style={{ marginBottom: '1.5rem' }}>
              Komplexe Datenmodelle runtergebrochen auf das, was wirklich zählt: Aufmerksamkeit. Wir produzieren hoch konvertierende Short-Form Videos, die dich sichtbar machen.
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'A/B Hook Testing', desc: 'Datengetriebene Skripte' },
                { label: 'Aggressive Retention', desc: 'Schnitt, der süchtig macht' },
                { label: 'Algorithm Hacking', desc: 'Plattform-native Distribution' }
              ].map((item, idx) => (
                <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(236,72,153,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#EC4899', marginTop: 2 }}>
                    <Activity size={12} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{item.label}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>

            <button style={{ padding: '1rem 2rem', background: '#EC4899', border: 'none', color: '#fff', fontWeight: 800, textTransform: 'uppercase', fontSize: '0.85rem', cursor: 'pointer', letterSpacing: '0.05em' }}>
              Beispiele ansehen
            </button>
          </div>

          <div style={{ flex: '1 1 50%', display: 'flex', justifyContent: 'center' }}>
            <GlassCard style={{ padding: '2.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTop: '2px solid #EC4899', background: 'rgba(30, 26, 46, 0.4)' }}>
              
              <div style={{ position: 'relative', width: '220px', height: '440px', background: '#000', borderRadius: '32px', border: '6px solid #222', overflow: 'hidden', boxShadow: '0 30px 60px rgba(236, 72, 153, 0.25)' }}>
                {/* Phone Content Simulation */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.85 }}>
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #1E1A2E, #12101B)' }} />
                  {/* Floating Hearts/Likes */}
                  {Array.from({length: 8}).map((_, i) => (
                    <motion.div key={i} animate={{ y: [-20, -350], opacity: [0, 1, 0], x: Math.sin(i)*30 }} transition={{ duration: 2.5 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }} style={{ position: 'absolute', bottom: '20%', right: '15%', color: '#EC4899', fontSize: '1.2rem' }}>
                      ❤️
                    </motion.div>
                  ))}
                </div>
                {/* Safe Area Notch */}
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '40%', height: '24px', background: '#222', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px', zIndex: 10 }} />
                
                {/* Video UI Overlays */}
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1rem', right: '1rem', zIndex: 10 }}>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.2)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                    <motion.div animate={{ width: ['0%', '100%'] }} transition={{ duration: 6, repeat: Infinity, ease: 'linear' }} style={{ height: '100%', background: '#fff' }} />
                  </div>
                  <div style={{ width: '70%', height: '14px', background: 'rgba(255,255,255,0.9)', borderRadius: '4px', marginBottom: '0.4rem' }} />
                  <div style={{ width: '45%', height: '10px', background: 'rgba(255,255,255,0.6)', borderRadius: '4px' }} />
                </div>

                <div style={{ position: 'absolute', right: '1rem', bottom: '5rem', display: 'flex', flexDirection: 'column', gap: '1rem', zIndex: 10 }}>
                   <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Activity size={18} color="#fff"/></div>
                   <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={18} color="#fff"/></div>
                </div>

              </div>
            </GlassCard>
          </div>

        </div>

      </div>
    </section>
  );
};
