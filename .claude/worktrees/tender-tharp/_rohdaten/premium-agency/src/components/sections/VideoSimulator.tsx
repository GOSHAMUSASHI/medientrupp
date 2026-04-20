import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Scissors, Video } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export const VideoSimulator: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<'RAW' | 'EDITED'>('EDITED');

  return (
    <section className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <div className="simulator-layout" style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
          
          <div style={{ flex: '1 1 40%' }}>
             <span style={{ color: 'var(--purple-500)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>03 // VIDEO & SOCIAL MEDIA</span>
            <h2 className="heading-lg" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
              Schnittführung, die <br/><span className="text-gradient">süchtig macht.</span>
            </h2>
            <p className="text-body" style={{ marginBottom: '2rem' }}>
              Langweilige Imagefilme schaut niemand. Wir nutzen datengetriebene Schnitt-Techniken, Mikro-Animationen und Sound-Design, um die Retention-Rate deines Contents zu verzehnfachen.
            </p>
            
            <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
               <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Retention Rate (Raw)</div>
                  <div style={{ color: '#EF4444', fontWeight: 600, fontSize: '1.5rem' }}>12%</div>
               </div>
               <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Retention Rate (Edited)</div>
                  <div style={{ color: '#10B981', fontWeight: 600, fontSize: '1.5rem' }}>87%</div>
               </div>
            </div>
            
             <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => setMode('RAW')}
                style={{ flex: 1, padding: '1rem', background: mode === 'RAW' ? 'rgba(255,255,255,0.1)' : 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}
              >
                Rohmaterial
              </button>
              <button 
                onClick={() => setMode('EDITED')}
                style={{ flex: 1, padding: '1rem', background: mode === 'EDITED' ? 'rgba(147,51,234,0.2)' : 'transparent', border: `1px solid ${mode === 'EDITED' ? 'var(--purple-500)' : 'rgba(255,255,255,0.1)'}`, color: '#fff', cursor: 'pointer' }}
              >
                Fertiger Schnitt
              </button>
            </div>
          </div>

          <div style={{ flex: '1 1 60%' }}>
            <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
              {/* Fake Video Player area */}
              <div style={{ height: '300px', background: '#000', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {mode === 'EDITED' && (
                   <motion.div animate={{ scale: [1, 1.05, 1], filter: ['hue-rotate(0deg)', 'hue-rotate(30deg)', 'hue-rotate(0deg)'] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', inset: 0, background: 'linear-gradient(45deg, rgba(147,51,234,0.3), rgba(0,0,0,0.8))' }} />
                )}
                {mode === 'RAW' && (
                  <div style={{ position: 'absolute', inset: 0, background: '#111' }} />
                )}
                <div onClick={() => setIsPlaying(!isPlaying)} style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>
                   {isPlaying ? <Pause size={30} color="#fff" /> : <Play size={30} color="#fff" style={{ marginLeft: 4 }}/>}
                </div>
              </div>
              
              {/* Fake Timeline */}
              <div style={{ padding: '2rem', background: 'var(--bg-secondary)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <Video size={16} color="var(--text-secondary)" />
                    <div style={{ flex: 1, height: 24, background: 'rgba(255,255,255,0.05)', borderRadius: 2, display: 'flex', overflow: 'hidden' }}>
                       {mode === 'EDITED' ? (
                         <>
                           <div style={{ width: '15%', height: '100%', background: '#4F46E5', borderRight: '1px solid #000' }} />
                           <div style={{ width: '25%', height: '100%', background: '#7C3AED', borderRight: '1px solid #000' }} />
                           <div style={{ width: '10%', height: '100%', background: '#C026D3', borderRight: '1px solid #000' }} />
                           <div style={{ width: '50%', height: '100%', background: '#DB2777' }} />
                         </>
                       ) : (
                         <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.1)' }} />
                       )}
                    </div>
                 </div>
                 
                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Scissors size={16} color="var(--text-secondary)" />
                    <div style={{ flex: 1, height: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 2, display: 'flex', overflow: 'hidden' }}>
                        {mode === 'EDITED' && (
                           <>
                             <div style={{ width: '5%', height: '100%', background: '#10B981' }} />
                             <div style={{ width: '95%', height: '100%', background: 'transparent' }} />
                           </>
                        )}
                    </div>
                 </div>
                 
                 {/* Playhead */}
                 <motion.div 
                   animate={{ x: isPlaying ? ['0%', '100%'] : '0%' }}
                   transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                   style={{ position: 'absolute', top: 300, bottom: 0, left: 60, width: 2, background: 'var(--purple-500)', zIndex: 20 }}
                 />
              </div>
            </GlassCard>
          </div>

        </div>
      </div>
    </section>
  );
};
