import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      marginTop: '8rem',
      padding: '6rem 0 2rem',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      background: 'var(--bg-primary)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', right: '-15%', top: '-20%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(111,78,124,0.08) 0%, transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '4rem', marginBottom: '4rem' }}>
          
          <div style={{ flex: '1 1 300px' }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '0.1em', marginBottom: '1.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '40px', height: '40px', background: 'var(--lilac-500)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>M</div>
              MEDIENTRUPP
            </div>
            <p className="text-body" style={{ fontSize: '1rem', marginBottom: '2rem', maxWidth: '350px' }}>
              Handgemachte AAA-Digitalinfrastrukturen. Wir erzeugen Systeme, die konvertieren und dominieren. Keine Templates. Nur Custom-Code.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
               <a href="/kontakt" style={{ padding: '0.75rem 1.5rem', background: 'rgba(255,255,255,0.05)', color: '#fff', textDecoration: 'none', fontWeight: 600, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', transition: 'all 0.3s' }}>
                 Sprich mit uns
               </a>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap', flex: '2 1 auto', justifyContent: 'flex-end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ color: '#fff', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.1em' }}>Infrastruktur</span>
              <a href="/#services" className="header-link" style={{ textTransform: 'none', letterSpacing: 'normal' }}>KI & Automation</a>
              <a href="/ecommerce" className="header-link" style={{ textTransform: 'none', letterSpacing: 'normal' }}>E-Commerce Setup</a>
              <a href="/portfolio" className="header-link" style={{ textTransform: 'none', letterSpacing: 'normal' }}>Web Simulator</a>
              <a href="/#pricing" className="header-link" style={{ textTransform: 'none', letterSpacing: 'normal' }}>Laufende Betreuung</a>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ color: '#fff', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.1em' }}>Company</span>
              <a href="/portfolio" className="header-link" style={{ textTransform: 'none', letterSpacing: 'normal' }}>Portfolio</a>
              <a href="/about" className="header-link" style={{ textTransform: 'none', letterSpacing: 'normal' }}>Über Uns</a>
              <a href="/kontakt" className="header-link" style={{ textTransform: 'none', letterSpacing: 'normal' }}>Kontakt</a>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ color: '#fff', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.1em' }}>Legal</span>
              <a href="#" className="header-link" style={{ textTransform: 'none', letterSpacing: 'normal' }}>Impressum</a>
              <a href="#" className="header-link" style={{ textTransform: 'none', letterSpacing: 'normal' }}>Datenschutz</a>
              <a href="#" className="header-link" style={{ textTransform: 'none', letterSpacing: 'normal' }}>AGB</a>
            </div>
          </div>
          
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <p className="text-body" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            © {new Date().getFullYear()} <span style={{ color: '#fff', fontWeight: 600 }}>Medientrupp</span>. Engineered for Scale.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} /> SERVER ONLINE
          </div>
        </div>

      </div>
    </footer>
  );
};
