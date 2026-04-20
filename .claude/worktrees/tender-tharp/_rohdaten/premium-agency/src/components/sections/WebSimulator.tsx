import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gauge, Zap, LayoutTemplate } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export const WebSimulator: React.FC = () => {
  const [activeTier, setActiveTier] = useState<'STANDARD' | 'MEDIENTRUPP'>('MEDIENTRUPP');

  // Simulation numbers
  const scores = activeTier === 'MEDIENTRUPP' 
    ? { perf: 100, a11y: 100, seo: 100 }
    : { perf: 42, a11y: 65, seo: 58 };

  return (
    <section className="section-padding" style={{ position: 'relative', background: 'rgba(255,255,255,0.01)' }}>
      <div className="container">
        
        <div className="simulator-layout simulator-reverse" style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexDirection: 'row-reverse' }}>
          
          <div style={{ flex: '1 1 40%' }}>
            <span style={{ color: 'var(--purple-500)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>02 // WEB ENGINEERING</span>
            <h2 className="heading-lg" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
              Handgemacht vs. <br/><span className="text-gradient">Baukasten.</span>
            </h2>
            <p className="text-body" style={{ marginBottom: '2rem' }}>
              Wordpress und Baukästen ruinieren dein Ranking. Wir coden in React & Vite für maximale Geschwindigkeit, extreme Animationen und SEO Scores, die Google zwingen, dich auf Platz 1 zu packen.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button 
                onClick={() => setActiveTier('STANDARD')}
                style={{ flex: 1, padding: '1rem', background: activeTier === 'STANDARD' ? 'rgba(255,255,255,0.1)' : 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', cursor: 'pointer' }}
              >
                Standard Agentur
              </button>
              <button 
                onClick={() => setActiveTier('MEDIENTRUPP')}
                style={{ flex: 1, padding: '1rem', background: activeTier === 'MEDIENTRUPP' ? 'rgba(147,51,234,0.2)' : 'transparent', border: `1px solid ${activeTier === 'MEDIENTRUPP' ? 'var(--purple-500)' : 'rgba(255,255,255,0.1)'}`, color: '#fff', cursor: 'pointer' }}
              >
                Medientrupp AAA
              </button>
            </div>
          </div>

          <div style={{ flex: '1 1 60%' }}>
            <GlassCard style={{ padding: '3rem' }}>
              {/* Lighthouse Dashboard Mockup */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Gauge size={20} color="var(--text-secondary)"/> Performance Audit</div>
                <div style={{ fontSize: '0.8rem', color: activeTier === 'MEDIENTRUPP' ? '#10B981' : '#EF4444' }}>{activeTier === 'MEDIENTRUPP' ? 'OPTIMIZED' : 'CRITICAL WARNINGS'}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '2rem 0' }}>
                <ScoreCircle label="Performance" score={scores.perf} />
                <ScoreCircle label="Accessibility" score={scores.a11y} />
                <ScoreCircle label="SEO" score={scores.seo} />
              </div>
              
              <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(0,0,0,0.3)', border: '1px dashed rgba(255,255,255,0.1)', display: 'flex', gap: '2rem' }}>
                 <div style={{ flex: 1 }}>
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>TECH STACK</div>
                   <div style={{ fontWeight: 600 }}>{activeTier === 'MEDIENTRUPP' ? 'React / Framer Motion / Vite' : 'Wordpress / Elementor'}</div>
                 </div>
                 <div style={{ flex: 1 }}>
                   <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>LOAD TIME</div>
                   <div style={{ fontWeight: 600, color: activeTier === 'MEDIENTRUPP' ? '#10B981' : '#EF4444' }}>{activeTier === 'MEDIENTRUPP' ? '0.2s' : '3.8s'}</div>
                 </div>
              </div>
            </GlassCard>
          </div>
        </div>

      </div>
    </section>
  );
};

const ScoreCircle = ({ score, label }: { score: number, label: string }) => {
  const color = score > 89 ? '#10B981' : score > 49 ? '#F59E0B' : '#EF4444';
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <div style={{ position: 'relative', width: 100, height: 100, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `conic-gradient(${color} ${score}%, transparent 0)` }}>
        <div style={{ position: 'absolute', inset: '4px', background: 'var(--bg-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
           <motion.span 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={score} 
             style={{ fontSize: '1.8rem', fontWeight: 800, color }}
           >
             {score}
           </motion.span>
        </div>
      </div>
      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  )
}
