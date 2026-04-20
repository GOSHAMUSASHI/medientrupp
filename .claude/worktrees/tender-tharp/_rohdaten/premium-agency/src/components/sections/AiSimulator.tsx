import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Send, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../ui/GlassCard';

export const AiSimulator: React.FC = () => {
  const [messages, setMessages] = useState<{ id: string; text: string; sender: 'ai' | 'user' }[]>([
    { id: '1', text: 'SYSTEM ONLINE. WIE KÖNNEN WIR DEIN SYSTEM SKALIEREN?', sender: 'ai' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState('IDLE');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Explicitly scroll only the container, not the whole window
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const simulateLead = () => {
    setStatus('PROCESSING');
    
    // User message
    const newMsg = { id: Date.now().toString(), text: 'Mein Shop stagniert bei 20k/Monat. Ich verbrenne Geld in Meta Ads und die Conversion Rate ist im Keller.', sender: 'user' as const };
    setMessages(prev => [...prev, newMsg]);
    setIsTyping(true);

    // AI Sequence
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString(), text: 'Analyse läuft. Bottlenecks identifiziert: Hohe Cart Abandonment Rate (48%) & fehlendes Backend-Retargeting.', sender: 'ai' }]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now().toString(), text: 'Lösungsprotokoll: Wir bauen ein AAA React Frontend für 0.1s Ladezeiten + implementieren einen autonomen KI-Agenten zur Warenkorbabbrecher-Rückgewinnung via WhatsApp.', sender: 'ai' }]);
        
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { id: Date.now().toString(), text: 'Erwarteter ROI: +180% Umsatz in Quartal 1. Pitch Deck wird generiert. Erstgespräch planen?', sender: 'ai' }]);
          
          setTimeout(() => {
             setStatus('AUTOMATION_MATCHED');
          }, 1500);
        }, 2000);
      }, 2000);
    }, 1500);
  };

  return (
    <section className="section-padding" style={{ position: 'relative' }}>
      <div className="container">
        
        <div className="hero-layout" style={{ display: 'flex', gap: '4rem', alignItems: 'center' }}>
          {/* Left Text */}
          <div className="hero-text" style={{ flex: '1 1 40%' }}>
            <span style={{ color: 'var(--purple-500)', fontSize: '0.8rem', letterSpacing: '0.1em' }}>01 // KI & HIGH-TICKET AUTOMATISIERUNG</span>
            <h2 className="heading-lg" style={{ marginTop: '1rem', marginBottom: '2rem' }}>
              Der <span className="text-gradient">Autonome Closer</span>, der nie schläft.
            </h2>
            <p className="text-body" style={{ marginBottom: '2rem' }}>
              Verwechsle das nicht mit billigen Support-Tools. Wir bauen autonome KI-Mitarbeiter tief in deine Infrastruktur ein. Sie analysieren Leads, pitchen auf Weltklasse-Niveau und füllen deine Pipeline qualifiziert auf Autopilot.
            </p>
            <div style={{ padding: '1.5rem', borderLeft: '2px solid var(--purple-500)', background: 'rgba(147,51,234,0.05)', marginBottom: '2rem' }}>
              <div style={{ fontSize: '0.9rem', color: 'var(--purple-300)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Engine Status: {status}</div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
                <motion.div animate={{ x: status === 'PROCESSING' ? ['-100%', '100%'] : '0%' }} transition={{ duration: 1, repeat: status === 'PROCESSING' ? Infinity : 0 }} style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, var(--purple-500), transparent)' }} />
              </div>
            </div>
            
            <button 
              onClick={simulateLead}
              disabled={status === 'PROCESSING'}
              style={{
                width: '100%',
                padding: '1.25rem', background: 'var(--purple-600)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: '1rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.05em',
                cursor: status === 'PROCESSING' ? 'not-allowed' : 'pointer', opacity: status === 'PROCESSING' ? 0.5 : 1, transition: 'all 0.3s'
              }}
            >
              Umsatz-Bot Simulieren
            </button>
          </div>

          {/* Right Chatbot UI */}
          <div className="hero-bento" style={{ flex: '1 1 60%' }}>
            <GlassCard style={{ height: '550px', display: 'flex', flexDirection: 'column', padding: 0 }}>
              {/* Header */}
              <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(0,0,0,0.4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 15px #10B981' }} />
                    <motion.div animate={{ scale: [1, 2], opacity: [1, 0] }} transition={{ duration: 2, repeat: Infinity }} style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid #10B981' }} />
                  </div>
                  <div>
                    <span style={{ fontWeight: 800, letterSpacing: '0.05em' }}>Medientrupp AI-Closer</span>
                    <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>v4.0.9 // Analytics Mode</span>
                  </div>
                </div>
                <Bot size={24} color="var(--purple-500)" />
              </div>
              
              {/* Chat Area */}
              <div 
                ref={chatContainerRef}
                style={{ flex: 1, overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
              >
                <AnimatePresence>
                  {messages.map((m) => (
                    <motion.div 
                      key={m.id}
                      initial={{ opacity: 0, x: m.sender === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{
                         alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                         maxWidth: '85%',
                         padding: '1.25rem',
                         background: m.sender === 'user' ? 'var(--purple-900)' : 'rgba(255,255,255,0.03)',
                         border: `1px solid ${m.sender === 'user' ? 'var(--purple-500)' : 'rgba(255,255,255,0.05)'}`,
                         borderRadius: 4,
                         fontSize: '1rem',
                         lineHeight: 1.6,
                         boxShadow: m.sender === 'user' ? '0 10px 30px rgba(147, 51, 234, 0.2)' : 'none'
                      }}
                    >
                      {m.text}
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '0.4rem', alignSelf: 'flex-start', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)' }}>
                      <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--purple-500)' }} />
                      <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--text-secondary)' }} />
                      <motion.div animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--purple-300)' }} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Automation Trigger overlay */}
              <AnimatePresence>
                {status === 'AUTOMATION_MATCHED' && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }}
                    style={{ position: 'absolute', bottom: '15%', left: '10%', right: '10%', background: 'rgba(5, 5, 10, 0.95)', border: '1px solid #10B981', padding: '2rem', zIndex: 10, display: 'flex', alignItems: 'center', gap: '1.5rem', boxShadow: '0 20px 50px rgba(16, 185, 129, 0.2)' }}
                  >
                    <CheckCircle2 color="#10B981" size={40} />
                    <div>
                      <div style={{ color: '#10B981', fontWeight: 800, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>High-Ticket Lead Nurture: Aktiviert</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Eingetragen in System. CRM Workflow gestartet. SMS & Mail Sequenz läuft.</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </div>
        </div>

      </div>
    </section>
  );
};
