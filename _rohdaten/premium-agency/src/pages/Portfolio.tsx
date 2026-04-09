import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Code2 } from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';

const projects = [
  {
    title: 'Neon Forge',
    category: 'High-Ticket E-Commerce',
    imgUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=800&q=80',
    stats: ['+124% CVR', '0.1s Ladezeit', 'Autonomes Upselling']
  },
  {
    title: 'Apex Dynamics',
    category: 'B2B SaaS Plattform',
    imgUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    stats: ['Client-Side Routing', 'React 19', 'Framer Motion']
  },
  {
    title: 'Aura Aesthetics',
    category: 'Premium Lead-Funnel',
    imgUrl: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=800&q=80',
    stats: ['KI Terminierung', 'AAA Design', 'Meta CAPI Integr.']
  },
  {
    title: 'Vortex Capital',
    category: 'Fintech Dashboard',
    imgUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    stats: ['Realtime Data', 'Dark Mode Only', 'Node.js Backend']
  }
];

export const Portfolio: React.FC = () => {
  return (
    <div style={{ paddingTop: '8rem', paddingBottom: '6rem', minHeight: '100vh', position: 'relative' }}>
      
      {/* Background Glows */}
      <div style={{ position: 'absolute', left: '-20%', top: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', right: '-10%', bottom: '10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 60%)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />

      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span style={{ padding: '0.4rem 1rem', borderRadius: '2px', background: 'rgba(111,78,124,0.1)', border: '1px solid rgba(111,78,124,0.3)', color: 'var(--lilac-500)', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
              <Sparkles size={14} /> AAA System Infrastruktur
            </span>
            <h1 className="heading-xl" style={{ marginBottom: '1.5rem' }}>Premium <span className="text-gradient">Showcase.</span></h1>
            <p className="text-body" style={{ maxWidth: '700px', margin: '0 auto', fontSize: '1.2rem' }}>
              Wir nutzen kompromisslos modernste Architekturen, um digitale Ökosysteme zu erschaffen, die der Konkurrenz in Performance und Design extrem überlegen sind.
            </p>
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
          {projects.map((proj, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -10 }}
            >
              <GlassCard style={{ padding: '1rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '100%', height: '220px', borderRadius: '4px', overflow: 'hidden', position: 'relative', marginBottom: '1.5rem' }}>
                  {/* Image overlay gradient */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(10,5,15,0.9) 100%)', zIndex: 1 }} />
                  <img src={proj.imgUrl} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                  
                  <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', zIndex: 2 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#fff', background: 'var(--purple-600)', padding: '0.2rem 0.6rem', borderRadius: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {proj.category}
                    </span>
                  </div>
                </div>

                <div style={{ padding: '0 0.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{proj.title}</h3>
                    <ExternalLink size={20} color="var(--purple-500)" style={{ cursor: 'pointer' }} />
                  </div>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: 'auto' }}>
                    {proj.stats.map((stat, idx) => (
                      <span key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.3rem 0.6rem', borderRadius: '2px' }}>
                        {stat}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Technical Callout */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          style={{ marginTop: '8rem', padding: '3rem', background: 'rgba(147,51,234,0.05)', border: '1px solid rgba(147,51,234,0.2)', borderRadius: '8px', textAlign: 'center' }}>
          <Code2 size={40} color="var(--purple-500)" style={{ margin: '0 auto 1.5rem' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Bist du bereit für das nächste Level?</h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            Baukästen bringen dich auf 10k/Monat. Custom Code und unsere KI-Pipelines skalieren dich von 100k auf 1 Mio. Wir übergeben dir nicht nur eine Website, sondern ein hochkonvertierendes Business-Asset.
          </p>
          <a href="/kontakt" style={{ display: 'inline-flex', padding: '1rem 2rem', background: 'var(--purple-600)', color: '#fff', textDecoration: 'none', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid rgba(255,255,255,0.1)' }}>
            System anfragen
          </a>
        </motion.div>

      </div>
    </div>
  );
};
