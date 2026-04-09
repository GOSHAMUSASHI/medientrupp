import React from 'react';
import { Hero } from '../components/sections/Hero';
import { AiSimulator } from '../components/sections/AiSimulator';
import { WebSimulator } from '../components/sections/WebSimulator';
import { VideoSimulator } from '../components/sections/VideoSimulator';
import { SocialMedia } from '../components/sections/SocialMedia';
import { PricingDeck } from '../components/sections/PricingDeck';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingCart, Zap, BarChart3 } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <>
      <Hero />

      {/* E-Commerce Crossover */}
      <section style={{ padding: '8rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid rgba(179,168,201,0.06)', borderBottom: '1px solid rgba(179,168,201,0.06)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', right: '-15%', top: '-30%', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(111,78,124,0.1) 0%, transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
              style={{ flex: 1, minWidth: '320px' }}>
              <span style={{ color: 'var(--lilac-300)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Fullstack E-Commerce</span>
              <h2 className="heading-lg" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                Dein Shop.<br/><span className="text-gradient">Unser Code.</span>
              </h2>
              <p className="text-body" style={{ marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                Keine Baukasten-Limits. Wir coden vollständige E-Commerce Ökosysteme — Headless React Frontends, KI-gesteuerte Upsells und autonomes Cart Recovery. Alles von Hand.
              </p>
              <Link to="/ecommerce" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2rem', background: 'var(--lilac-500)', color: '#fff', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.3s' }}>
                Live Simulator <ArrowRight size={20} />
              </Link>
            </motion.div>

            {/* Mini KPI Cards right side */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }}
              style={{ flex: 1, minWidth: '300px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {[
                { icon: <ShoppingCart size={22}/>, label: 'Conversion Rate', value: '8.4%', sub: '+324% Uplift' },
                { icon: <Zap size={22}/>, label: 'Ladezeit', value: '0.09s', sub: 'Branche: 3.8s' },
                { icon: <BarChart3 size={22}/>, label: 'AOV Uplift', value: '+41%', sub: 'durch KI Upsells' },
                { icon: <ArrowRight size={22}/>, label: 'Cart Recovery', value: '62%', sub: 'Automatisiert' },
              ].map((kpi, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}
                  className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ color: 'var(--lilac-300)', marginBottom: '0.75rem' }}>{kpi.icon}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{kpi.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.4rem' }}>{kpi.label}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--lilac-500)', marginTop: '0.2rem' }}>{kpi.sub}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <AiSimulator />
      <WebSimulator />
      <SocialMedia />
      <VideoSimulator />

      {/* Portfolio Highlight Layer */}
      <section style={{ padding: '8rem 0', background: 'var(--bg-secondary)', borderTop: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(147,51,234,0.15) 0%, transparent 60%)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ color: 'var(--lilac-500)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700 }}>AAA Case Studies</span>
            <h2 className="heading-lg" style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
              Erlebe <span className="text-gradient">Next-Gen</span> Architektur.
            </h2>
            <p className="text-body" style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              Baukästen bringen dich auf 10k/Monat. Deep-Tech Frontend Engineering skaliert dich. Wir erschaffen digitale Marktführer.
            </p>
          </div>

          <div className="desktop-only" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', marginBottom: '4rem' }}>
            {[
              { title: 'Neon Forge', cat: 'High-Ticket E-Commerce', img: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=600&q=80', delay: 0 },
              { title: 'Aura Aesthetics', cat: 'Premium Lead-Funnel', img: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&w=600&q=80', delay: 0.2 },
              { title: 'Vortex Capital', cat: 'Fintech Dashboard', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80', delay: 0.4 }
            ].map((proj, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: proj.delay }}
                style={{ position: 'relative', height: '320px', borderRadius: '4px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(10,5,15,0.95) 100%)', zIndex: 1 }} />
                <motion.img whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} src={proj.img} alt={proj.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: '1.5rem', left: '1.5rem', right: '1.5rem', zIndex: 2 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--lilac-300)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.2rem', fontWeight: 600 }}>{proj.cat}</div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{proj.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1.2rem 2.5rem', background: 'var(--lilac-500)', border: '1px solid rgba(111,78,124,0.8)', color: '#fff', fontWeight: 800, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '0.05em', borderRadius: '2px', transition: 'all 0.3s' }}>
              Full Showcase ansehen
            </Link>
          </div>

        </div>
      </section>

      <PricingDeck />
    </>
  );
};
