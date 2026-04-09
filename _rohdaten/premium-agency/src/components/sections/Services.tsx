import React from 'react';
import { GlassCard } from '../ui/GlassCard';
import { MonitorPlay, Sparkles, BrainCircuit, ShieldCheck, Presentation } from 'lucide-react';

export const Services: React.FC = () => {
  const services = [
    {
      title: "Perfekte Websites",
      desc: "Maßgeschneiderte Webpräsenzen mit extremen Animationen, Framer Motion und handgemachtem Design ohne KI-Look.",
      price: "500€ - 2500€",
      icon: <MonitorPlay size={32} color="var(--purple-500)" />
    },
    {
      title: "KI-Systeme & Automatisierung",
      desc: "Intelligente Lead-Erfassung, 24/7 KI-Assistenten und Automatisierungslösungen, die Ihnen massive Zeitvorteile verschaffen.",
      price: "ab 500€",
      icon: <BrainCircuit size={32} color="var(--purple-500)" />
    },
    {
      title: "Social Media & Videoproduktion",
      desc: "Vom Social-Media-Management über strategische Beratung bis hin zur hochprofessionellen Imagefilm-Produktion.",
      price: "250€ - 1000€+",
      icon: <Sparkles size={32} color="var(--purple-500)" />
    },
    {
      title: "1-on-1 Workshop",
      desc: "Individuelle, intensive Strategieausarbeitung und Hands-On Workshops für Ihr digitales Wachstum.",
      price: "1000€",
      icon: <Presentation size={32} color="var(--purple-500)" />
    },
    {
      title: "Rundum-Sorglos Betreuung",
      desc: "Sicheres Hosting, Wartung, Updates und kontinuierliches Local SEO für nachhaltigen Erfolg.",
      price: "100€ - 150€ / Monat",
      icon: <ShieldCheck size={32} color="var(--purple-500)" />
    }
  ];

  return (
    <section id="services" className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h2 className="heading-lg" style={{ marginBottom: '1rem' }}>Unsere <span className="text-gradient">Leistungen & Preise</span></h2>
          <p className="text-body" style={{ maxWidth: '600px', margin: '0 auto' }}>
            Transparente Preise für höchste Qualität. Jedes Projekt ist handgefertigt und auf maximale Conversion optimiert.
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '2rem' 
        }}>
          {services.map((svc, idx) => (
            <GlassCard key={idx} delay={idx * 0.1}>
              <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ 
                  padding: '1rem', 
                  borderRadius: '12px', 
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)'
                }}>
                  {svc.icon}
                </div>
                <h3 className="heading-md" style={{ margin: 0 }}>{svc.title}</h3>
              </div>
              <p className="text-body" style={{ marginBottom: '2rem', height: '80px' }}>{svc.desc}</p>
              
              <div style={{ 
                paddingTop: '1.5rem', 
                borderTop: '1px solid var(--glass-border)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{ color: 'var(--text-secondary)' }}>Investition</span>
                <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--purple-300)' }}>{svc.price}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
};
