import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/GlassCard';
import { Check, ArrowRight } from 'lucide-react';

const Feature = ({ text }: { text: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
    <Check size={16} color="var(--lilac-300)" />
    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{text}</span>
  </div>
);

const plans = [
  {
    name: 'Laufende Betreuung',
    sub: 'Rundum-Sorglos',
    price: '100€',
    unit: '/ Monat',
    note: 'oder 150€+ für Extraleistungen',
    desc: 'Sicheres Hosting, Wartung und fortlaufende Google Local SEO. Du machst dein Tagesgeschäft — wir halten die Technik am Laufen.',
    features: ['Backup & Security Updates', 'High-Speed Premium Hosting', 'Google Unternehmensprofil SEO', 'Schutz vor Hackerangriffen', 'Monatliche Performance-Reports'],
    cta: 'Jetzt absichern',
    accent: 'var(--lilac-500)',
  },
  {
    name: 'High-Performance Website',
    sub: 'Custom Coded',
    price: '500–2.500€',
    unit: 'einmalig',
    note: 'Je nach Umfang & Komplexität',
    desc: 'Kein Template, kein Baukasten. Jede Zeile Code handgeschrieben in React + Vite. Lighthouse 100/100.',
    features: ['React 19 + TypeScript + Vite', 'AAA Animationen (Framer Motion)', 'Lighthouse 100/100 Score', 'Responsive auf allen Geräten', 'SSL, Hosting & Deployment inkl.'],
    cta: 'Projekt anfragen',
    accent: 'var(--lilac-300)',
    highlighted: true,
  },
  {
    name: 'KI & Automatisierung',
    sub: 'Autonome Systeme',
    price: 'ab 500€',
    unit: 'Setup',
    note: 'Laufende Kosten nach Verbrauch',
    desc: 'KI-Lead-Qualifizierung, autonome Mail-Sequenzen, CRM-Integration und intelligente Chatbots.',
    features: ['KI-Lead-Qualifizierung', 'Automatische Pitch-Sequenzen', 'CRM & Kalender-Integration', 'Custom API Workflows', 'Make.com / n8n / Custom'],
    cta: 'System planen',
    accent: '#10B981',
  },
  {
    name: 'Video & Social Media',
    sub: 'Datengetrieben',
    price: '250–1.000€+',
    unit: 'pro Projekt',
    note: 'Retention-optimierter Schnitt',
    desc: 'Keine Imagefilme die niemand guckt. Datengetriebener Schnitt für maximale Retention & Engagement.',
    features: ['Hook-Optimierte Editing', 'Color Grading & Sound Design', 'TikTok / Reels / Shorts Format', 'Thumbnail & Caption Design', 'Content-Strategie inklusive'],
    cta: 'Content planen',
    accent: 'var(--lilac-100)',
  },
  {
    name: '1-on-1 Workshop',
    sub: 'Strategische Tiefe',
    price: '1.000€',
    unit: 'einmalig',
    note: 'Maßgeschneiderter Fahrplan inklusive',
    desc: 'Intensiver Deep-Dive in dein Business. Wir finden jede Skalierungslücke und bauen den gnadenlosen Masterplan.',
    features: ['3–4h Strategischer Deep-Dive', '360° Business-Analyse', 'Skalierungslücken aufdecken', 'Konkreter Action-Plan', 'Follow-Up Session inklusive'],
    cta: 'Termin buchen',
    accent: 'var(--lilac-500)',
  },
];

export const PricingDeck: React.FC = () => {
  return (
    <section id="pricing" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ color: 'var(--lilac-500)', fontSize: '0.8rem', letterSpacing: '0.15em' }}>TRANSPARENTE PREISE</span>
          <h2 className="heading-lg" style={{ marginTop: '0.5rem' }}>Das <span className="text-gradient">Investment.</span></h2>
          <p className="text-body" style={{ maxWidth: '650px', margin: '1rem auto 0' }}>Radikale Transparenz. Keine versteckten Kosten. Jeder Euro ist ein Investment in Infrastruktur, die sich zurückzahlt.</p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
          {plans.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}>
              <div className="glass-panel" style={{
                padding: '2.5rem', height: '100%', display: 'flex', flexDirection: 'column',
                borderTop: `2px solid ${p.accent}`,
                background: p.highlighted ? 'rgba(179, 168, 201, 0.06)' : undefined,
              }}>
                {p.highlighted && (
                  <div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '0.3rem 0.8rem', background: p.accent, color: '#12101B', fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em' }}>BELIEBT</div>
                )}
                <div style={{ fontSize: '0.7rem', color: p.accent, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{p.sub}</div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.8rem' }}>{p.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 0 }}>{p.desc}</p>

                <div style={{ marginBottom: '0.3rem' }}>
                  <span style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff' }}>{p.price}</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginLeft: '0.5rem' }}>{p.unit}</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: p.accent, marginBottom: '1.5rem' }}>{p.note}</div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem', flex: 1 }}>
                  {p.features.map((f, fi) => <Feature key={fi} text={f} />)}
                </div>

                <button style={{
                  width: '100%', padding: '1rem', border: `1px solid ${p.accent}`,
                  background: p.highlighted ? p.accent : 'transparent',
                  color: p.highlighted ? '#12101B' : '#fff',
                  fontWeight: 800, cursor: 'pointer', textTransform: 'uppercase',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  fontSize: '0.85rem', letterSpacing: '0.05em', fontFamily: 'inherit',
                  transition: 'all 0.3s',
                }}>
                  {p.cta} <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
