import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../components/ui/GlassCard';
import { Send, CheckCircle } from 'lucide-react';

export const Kontakt: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', project: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', padding: '1rem 1.25rem', fontSize: '1rem', fontFamily: 'inherit',
    outline: 'none', transition: 'border-color 0.3s', boxSizing: 'border-box' as const
  };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '10rem', paddingBottom: '6rem', position: 'relative', overflow: 'hidden' }}>
      {/* BG effects */}
      <div style={{ position: 'absolute', left: '-10%', top: '20%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(147,51,234,0.1) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div className="bg-grid" style={{ opacity: 0.5 }} />

      <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '900px', margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}>
          <span style={{ color: 'var(--purple-500)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Kontakt</span>
          <h1 className="heading-xl" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>
            Lass uns <span className="text-gradient">starten.</span>
          </h1>
          <p className="text-body" style={{ marginBottom: '4rem', fontSize: '1.1rem', maxWidth: '600px' }}>
            Kein Verkaufs-Gespräch. Kein Bullshit. Sag uns, was du brauchst – wir analysieren und antworten mit dem direkten Weg zur Lösung.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'start' }}>
          
          {/* Left Info */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.8 }} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {[
              { label: 'E-Mail', val: 'impact@medientrupp.de', link: 'mailto:impact@medientrupp.de' },
              { label: 'WhatsApp', val: '+49 176 12345678', link: 'https://wa.me/4917612345678' },
              { label: 'Standort', val: 'Gummersbach, 51647 NRW', link: null },
              { label: 'Reaktionszeit', val: '< 4 Stunden', link: null },
            ].map((item, i) => (
              <div key={i}>
                <div style={{ fontSize: '0.7rem', color: 'var(--purple-500)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{item.label}</div>
                {item.link
                  ? <a href={item.link} style={{ color: '#fff', textDecoration: 'none', fontWeight: 600, borderBottom: '1px solid rgba(147,51,234,0.3)' }}>{item.val}</a>
                  : <div style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{item.val}</div>
                }
              </div>
            ))}
          </motion.div>

          {/* Right Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            <GlassCard style={{ padding: '3rem', borderTop: '2px solid var(--lilac-500)', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(111,78,124,0.15) 0%, transparent 60%)', filter: 'blur(30px)', pointerEvents: 'none' }} />
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '3rem 0' }}>
                  <CheckCircle size={60} color="#10B981" style={{ marginBottom: '1.5rem' }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>Nachricht erhalten!</h3>
                  <p className="text-body">Wir melden uns innerhalb von kürzester Zeit. Mach dich bereit.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', zIndex: 10 }}>
                  <div className="simulator-layout" style={{ display: 'flex', gap: '1.5rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 600 }}>NAME *</label>
                      <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Max Mustermann" style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--lilac-500)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}/>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 600 }}>E-MAIL *</label>
                      <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="max@unternehmen.de" style={inputStyle} onFocus={e => e.target.style.borderColor = 'var(--lilac-500)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}/>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 600 }}>INTENTION</label>
                    <select value={form.project} onChange={e => setForm(f => ({ ...f, project: e.target.value }))} style={{ ...inputStyle, cursor: 'pointer', appearance: 'none', background: 'rgba(255,255,255,0.04) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23B3A8C9\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 1rem center' }}>
                      <option value="" style={{ background: 'var(--bg-secondary)', color: '#fff' }}>Worüber möchtest du sprechen?</option>
                      <option value="website" style={{ background: 'var(--bg-secondary)', color: '#fff' }}>🌐 High-Performance Website</option>
                      <option value="ki" style={{ background: 'var(--bg-secondary)', color: '#fff' }}>🤖 KI Workflow & Chatbots</option>
                      <option value="ecommerce" style={{ background: 'var(--bg-secondary)', color: '#fff' }}>🛒 E-Commerce & Shop Skalierung</option>
                      <option value="video" style={{ background: 'var(--bg-secondary)', color: '#fff' }}>🎬 Video Hooks & UGC</option>
                      <option value="other" style={{ background: 'var(--bg-secondary)', color: '#fff' }}>⚡ Etwas anderes</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', marginBottom: '0.5rem', fontWeight: 600 }}>NACHRICHT *</label>
                    <textarea required value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Zeig uns dein Geschäftsmodell und was du optimieren willst..." rows={6} style={{ ...inputStyle, resize: 'vertical', minHeight: '150px' }} onFocus={e => e.target.style.borderColor = 'var(--lilac-500)'} onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'} />
                  </div>
                  <button type="submit" disabled={loading} style={{
                    padding: '1.2rem', background: loading ? 'rgba(111,78,124,0.5)' : 'var(--lilac-500)',
                    border: '1px solid rgba(111,78,124,0.8)', color: '#fff', fontSize: '1rem', fontWeight: 800,
                    textTransform: 'uppercase', letterSpacing: '0.06em', cursor: loading ? 'wait' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', transition: 'all 0.3s'
                  }}>
                    {loading ? 'Sende Transmission...' : <><Send size={18}/> Initialisieren</>}
                  </button>
                </form>
              )}
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
