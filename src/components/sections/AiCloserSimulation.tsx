"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, CheckCircle2 } from "lucide-react";

export const AiCloserSimulation = () => {
  const [messages, setMessages] = useState<{ id: string; text: string; sender: 'ai' | 'user' }[]>([
    { id: '1', text: 'Hallo! Womit können wir Ihnen helfen, mehr Kunden zu gewinnen?', sender: 'ai' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState('IDLE');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const simulateLead = () => {
    setStatus('PROCESSING');
    
    const newMsg = { id: Date.now().toString(), text: 'Unser Shop stagniert bei 20.000 €/Monat. Wir verlieren Kunden im Checkout, obwohl wir in Werbung investieren.', sender: 'user' as const };
    setMessages(prev => [...prev, newMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now().toString(), text: 'Vielen Dank für die Einschätzung. Ich sehe zwei klare Hebel: eine hohe Warenkorbabbruch-Rate und fehlendes Retargeting im Backend.', sender: 'ai' }]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { id: Date.now().toString(), text: 'Unser Vorschlag: Performance-Optimierung des Checkout-Prozesses + automatisiertes KI-Follow-up für Warenkorbabbrecher.', sender: 'ai' }]);
        
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, { id: Date.now().toString(), text: 'Erfahrungswert aus ähnlichen Projekten: +150–200% Umsatz im ersten Quartal. Möchten Sie ein kostenloses Erstgespräch vereinbaren?', sender: 'ai' }]);
          
          setTimeout(() => {
             setStatus('AUTOMATION_MATCHED');
          }, 1500);
        }, 2500);
      }, 2500);
    }, 1500);
  };

  return (
    <section className="bg-white py-16 md:py-20 relative overflow-hidden" aria-labelledby="aismulator-heading">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-slate-100 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Left: Chatbot UI — order-1 on desktop */}
          <div className="lg:w-1/2 order-1">
            <div className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-md min-h-[400px] max-h-[600px] flex flex-col overflow-hidden shadow-2xl shadow-indigo-100">
              
              {/* Chat Header */}
              <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-4 h-4 rounded-full bg-indigo-500 shadow-[0_0_15px_#6366f1]" />
                    <motion.div 
                      animate={{ scale: [1, 2], opacity: [1, 0] }} 
                      transition={{ duration: 2, repeat: Infinity }} 
                      className="absolute inset-0 rounded-full border-2 border-indigo-500" 
                    />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 tracking-wide">MedienTrupp KI-Assistent</h4>
                    <span className="block text-xs text-slate-500">24⁄7 verfügbar</span>
                  </div>
                </div>
                <Bot className="text-indigo-500" size={28} />
              </div>
              
              {/* Chat Body */}
              <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 relative scroll-smooth">
                <AnimatePresence>
                  {messages.map((m) => (
                    <motion.div 
                      key={m.id}
                      initial={{ opacity: 0, scale: 0.95, y: 10, x: m.sender === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                      className={`max-w-[85%] p-4 rounded-md text-sm md:text-base leading-relaxed font-medium ${
                        m.sender === 'user' 
                          ? 'self-end bg-indigo-600 text-white rounded-br-sm shadow-lg shadow-indigo-900/20' 
                          : 'self-start bg-white border border-slate-200 shadow-sm text-slate-700 rounded-bl-sm'
                      }`}
                    >
                      {m.text}
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }} 
                      className="self-start bg-white border border-slate-200 shadow-sm rounded-md rounded-bl-sm p-4 flex gap-1.5"
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div 
                          key={i}
                          animate={{ y: [0, -6, 0] }} 
                          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }} 
                          className="w-2.5 h-2.5 rounded-full bg-indigo-400" 
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Automation Matched overlay inside chat body */}
                <AnimatePresence>
                  {status === 'AUTOMATION_MATCHED' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="mt-4 bg-indigo-50 border border-indigo-200 rounded-md p-4 flex items-center gap-4"
                    >
                      <CheckCircle2 className="text-indigo-600 flex-shrink-0" size={32} />
                      <div>
                        <div className="text-indigo-600 font-bold text-sm mb-1">Anfrage im CRM erfasst</div>
                        <div className="text-slate-600 text-xs">Wir melden uns innerhalb von 24 Stunden. NDA auf Wunsch vorab erhältlich.</div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

          {/* Right: Text Content — order-2 on desktop */}
          <div className="lg:w-1/2 order-2 w-full flex-shrink-0">
            <span className="text-indigo-600 text-xs font-bold tracking-[0.15em] uppercase block mb-3">
              KI-Assistent
            </span>
            <h2 id="aismulator-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Ihr digitaler Mitarbeiter —{" "}<span className="text-indigo-600">24⁄7 verfügbar.</span>
            </h2>
            <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-8">
              Kein simples Support-Widget. Wir integrieren intelligente KI-Assistenten direkt in Ihre Plattform. Sie qualifizieren Leads, beantworten Fragen und füllen Ihre Pipeline — vollautomatisch, rund um die Uhr.
            </p>

            {/* Processing indicator — only visible while running */}
            {status === 'PROCESSING' && (
              <div className="flex items-center gap-2 mb-8">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-indigo-500 inline-block"
                />
                <span className="text-sm text-indigo-600 font-medium">KI analysiert Ihre Situation …</span>
              </div>
            )}
            
            <button 
              onClick={simulateLead}
              disabled={status === 'PROCESSING'}
              className="w-full sm:w-auto px-8 py-4 bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold tracking-wide rounded-md transition-colors"
            >
              KI-Demo starten
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
