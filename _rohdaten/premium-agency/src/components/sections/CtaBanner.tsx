import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export const CtaBanner: React.FC = () => {
  return (
    <section style={{ padding: '5rem 0', background: 'var(--bg-primary)', borderTop: '1px solid rgba(255,255,255,0.04)', position: 'relative', overflow: 'hidden' }}>
      {/* Radial BG glow */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at center, rgba(147,51,234,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
        >
          <div style={{ display: 'inline-block', padding: '0.4rem 1rem', border: '1px solid rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.05)', color: '#EF4444', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem' }}>
            Limitierte Kapazität — Q2 2026 fast voll
          </div>
          <h2 className="heading-lg" style={{ marginBottom: '1.5rem' }}>
            Bereit, deinen<br /><span className="text-gradient">Markt zu dominieren?</span>
          </h2>
          <p className="text-body" style={{ maxWidth: '600px', margin: '0 auto 3rem', fontSize: '1.15rem' }}>
            Wir nehmen nur wenige ausgewählte Projekte pro Quartal an. Wenn du ernstgenommen werden willst, buche jetzt dein Erstgespräch.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://calendly.com/medientrupp"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                padding: '1.1rem 2.5rem', background: 'var(--purple-600)', color: '#fff',
                fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '1rem',
                border: '1px solid rgba(255,255,255,0.15)', transition: 'all 0.3s'
              }}
            >
              Erstgespräch buchen <ArrowRight size={20} />
            </a>
            <a
              href="mailto:impact@medientrupp.de"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.75rem',
                padding: '1.1rem 2.5rem', background: 'transparent', color: 'var(--text-secondary)',
                fontWeight: 600, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.9rem',
                border: '1px solid rgba(255,255,255,0.1)', transition: 'all 0.3s'
              }}
            >
              impact@medientrupp.de
            </a>
          </div>

          {/* Counters */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4rem', marginTop: '4rem', flexWrap: 'wrap' }}>
            {[
              { num: '47+', label: 'Systeme gebaut' },
              { num: '0', label: 'Templates verwendet' },
              { num: '100%', label: 'Custom Code' },
            ].map((c, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--purple-300)' }}>{c.num}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>{c.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
