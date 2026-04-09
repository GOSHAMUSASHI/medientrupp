import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Code2, Cpu, Film, MapPin, ExternalLink } from 'lucide-react';
import { InteractiveBackground } from '../components/ui/InteractiveBackground';

const techStack = [
  { label: 'React 19', sub: 'Frontend Core', color: '#61DAFB' },
  { label: 'TypeScript', sub: 'Type Safety', color: '#3178C6' },
  { label: 'Framer Motion', sub: 'Animations', color: '#BB42FF' },
  { label: 'Node.js', sub: 'Backend Runtime', color: '#8CC84B' },
  { label: 'Supabase', sub: 'Realtime DB', color: '#3ECF8E' },
  { label: 'OpenAI GPT-4', sub: 'KI Core Layer', color: '#FFD700' },
  { label: 'Make.com / n8n', sub: 'Automations', color: '#EF4444' },
  { label: 'Vercel + Cloudflare', sub: 'Global CDN', color: '#6366F1' },
];

const manifesto = [
  "Wir glauben nicht an Templates.",
  "Wir glauben nicht an Agentur-Sprech.",
  "Wir glauben, dass jedes Unternehmen verdient, digital zu dominieren.",
  "Kein Standard. Kein Copy-Paste. Reines System-Denken.",
];

const values = [
  { icon: <Code2 size={28}/>, title: 'Kein Template', desc: 'Jede Zeile Code ist für dein Business geschrieben. Kein Baukasten, kein Theme, kein Copy-Paste.' },
  { icon: <Cpu size={28}/>, title: 'System-Denken', desc: 'Wir bauen keine Websites. Wir bauen Infrastrukturen – Revenue-generierend, 24/7, autonom.' },
  { icon: <Film size={28}/>, title: 'Content = Conversion', desc: 'Video-Content ohne Hook-Strategie ist Geldverschwendung. Wir coden und schneiden beide Seiten.' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] as any } }
};

export const About: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', paddingTop: '8rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}><InteractiveBackground /></div>

      <motion.div className="container" style={{ position: 'relative', zIndex: 10 }} variants={containerVariants} initial="hidden" animate="visible">

        {/* Manifesto Hero */}
        <motion.div variants={itemVariants} style={{ textAlign: 'center', marginBottom: '8rem' }}>
          <span style={{ color: 'var(--purple-500)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Das Manifest</span>
          <h1 className="heading-xl" style={{ marginTop: '1rem', marginBottom: '3rem' }}>
            Wir sind kein<br/><span style={{ color: 'transparent', WebkitTextStroke: '1px var(--purple-500)' }}>Dienstleister.</span>
          </h1>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            {manifesto.map((line, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.15, duration: 0.8 }}
                style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', fontWeight: 800, color: i % 2 === 0 ? '#fff' : 'var(--text-secondary)', letterSpacing: '-0.02em' }}>
                {line}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Values Grid */}
        <motion.div variants={itemVariants} style={{ marginBottom: '8rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {values.map((v, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} transition={{ duration: 0.3 }}>
                <GlassCard style={{ padding: '3rem', height: '100%', borderTop: '2px solid var(--purple-500)' }}>
                  <div style={{ color: 'var(--purple-500)', marginBottom: '1.5rem' }}>{v.icon}</div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '1rem', letterSpacing: '0.05em' }}>{v.title}</h3>
                  <p className="text-body" style={{ fontSize: '1rem' }}>{v.desc}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tech Stack */}
        <motion.div variants={itemVariants} style={{ marginBottom: '8rem' }}>
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <span style={{ color: 'var(--purple-500)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Arsenal</span>
            <h2 className="heading-lg" style={{ marginTop: '0.5rem' }}>Der <span className="text-gradient">Tech Stack.</span></h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {techStack.map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ scale: 1.05, y: -5 }}
                style={{ padding: '1rem 1.5rem', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '1rem', minWidth: '200px' }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: t.color, boxShadow: `0 0 10px ${t.color}` }} />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem' }}>{t.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{t.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} style={{ marginBottom: '8rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
            {[
              { num: '100%', label: 'Custom Code — kein Template hat uns je berührt' },
              { num: '0.1s', label: 'Ø Ladezeit un serer Systeme. Branchenstandard: 3.8s' },
              { num: '24/7', label: 'KI-Systeme, die für dich arbeiten, während du schläfst' },
              { num: '∞', label: 'Skalierbarkeit. Wir bauen auf Infrastrukturen, die wachsen.' },
            ].map((s, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} style={{ padding: '2.5rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--purple-500), transparent)' }} />
                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--purple-300)', lineHeight: 1, marginBottom: '1rem' }}>{s.num}</div>
                <p className="text-body" style={{ fontSize: '0.9rem', lineHeight: 1.4 }}>{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Location Block */}
        <motion.div variants={itemVariants} style={{ marginBottom: '8rem' }}>
          <GlassCard style={{ padding: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '3rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <MapPin size={24} color="var(--purple-500)" />
                <span style={{ color: 'var(--purple-500)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Hauptquartier</span>
              </div>
              <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>Gummersbach,<br/>Deutschland 🇩🇪</h2>
              <p className="text-body">51647 Gummersbach · Nordrhein-Westfalen<br/>Based in NRW — liefern weltweit.</p>
            </div>
            <div style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)', padding: '3rem 4rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📡</div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.5rem' }}>Remote-First</div>
              <p className="text-body" style={{ fontSize: '0.9rem' }}>Projekte weltweit.<br/>Physisch in der Metropolregion Köln/Bonn.</p>
            </div>
          </GlassCard>
        </motion.div>

      </motion.div>
    </div>
  );
};
