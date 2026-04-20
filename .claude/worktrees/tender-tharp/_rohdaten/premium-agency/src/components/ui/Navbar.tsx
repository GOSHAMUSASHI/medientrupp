import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: 'Infrastruktur', href: '/#services' },
    { label: 'E-Commerce', to: '/ecommerce' },
    { label: 'Portfolio', to: '/portfolio', highlight: true },
    { label: 'Über Uns', to: '/about' },
    { label: 'Kontakt', to: '/kontakt' },
  ];

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      padding: '1.25rem 0',
      background: 'rgba(3, 3, 5, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      zIndex: 1000
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none' }} onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="header-nav">
          {links.map(l => l.to
            ? <Link key={l.label} to={l.to} className="header-link" style={{ color: l.highlight ? 'var(--purple-300)' : undefined }}>{l.label}</Link>
            : <a key={l.label} href={l.href} className="header-link">{l.label}</a>
          )}
        </nav>

        {/* Mobile Hamburger */}
        <button onClick={() => setMenuOpen(o => !o)}
          style={{ display: 'none', background: 'transparent', border: 'none', color: '#fff', cursor: 'pointer' }}
          className="hamburger-btn"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden', background: 'rgba(3,3,5,0.99)', borderTop: '1px solid rgba(255,255,255,0.05)' }}
          >
            <div style={{ padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {links.map(l => l.to
                ? <Link key={l.label} to={l.to} className="header-link" onClick={() => setMenuOpen(false)}
                    style={{ padding: '1rem 5%', display: 'block', color: l.highlight ? 'var(--lilac-300)' : undefined, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {l.label}
                  </Link>
                : <a key={l.label} href={l.href} className="header-link" onClick={() => setMenuOpen(false)}
                    style={{ padding: '1rem 5%', display: 'block', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    {l.label}
                  </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
