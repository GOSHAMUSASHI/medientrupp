"use client";

import { motion } from "framer-motion";
import { Activity, Users } from "lucide-react";

export const AlgorithmSection = () => {
  return (
    <section className="bg-slate-50 py-24 text-slate-900 relative overflow-hidden" aria-labelledby="algorithm-heading">
      {/* Background glow effects */}
      <div className="absolute -left-[20%] top-[10%] w-[600px] h-[600px] bg-slate-500/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute -right-[10%] bottom-[10%] w-[500px] h-[500px] bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20">
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
            Social Dominance
          </p>
          <h2 id="algorithm-heading" className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Aufmerksamkeit ist die{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-700">
              neue Währung.
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Hören Sie auf, Content für die Nische zu machen. Wir produzieren hoch konvertierende Short-Form Videos, die den Algorithmus zwingen, Sie zu belohnen. Datengetriebene Hooks. Aggressive Retention.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Text & Features */}
          <div className="flex-1 lg:pr-10">
            <div className="inline-flex items-center gap-2 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-6 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200">
              <motion.div 
                animate={{ opacity: [1, 0] }} 
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }} 
                className="w-2 h-2 rounded-full bg-indigo-600" 
              />
              Viral Status: Active
            </div>

            <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-6">
              Die Psychologie<br />hinter dem Algorithmus.
            </h3>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Komplexe Datenmodelle runtergebrochen auf das, was wirklich zählt: Aufmerksamkeit. Wir triggern die richtigen neurologischen Knöpfe.
            </p>

            <ul className="space-y-6 mb-10">
              {[
                { label: 'A/B Hook Testing', desc: 'Datengetriebene Skripte, die in Sekunde 1 catchen.' },
                { label: 'Aggressive Retention', desc: 'Visueller Schnitt, der Dopamin ausschüttet und süchtig macht.' },
                { label: 'Algorithm Hacking', desc: 'Plattform-native Distribution für organische Reichweite.' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                    <Activity size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{item.label}</h4>
                    <p className="text-sm text-slate-600">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Phone Mockup */}
          <div className="flex-1 flex justify-center lg:justify-end w-full">
            <div className="bg-white backdrop-blur-md border border-slate-200 p-8 rounded-[2rem] shadow-xl relative w-full max-w-[360px]">
              
              {/* Phone Frame */}
              <div className="relative w-full aspect-[9/16] bg-black rounded-[2.5rem] border-[6px] border-slate-900 overflow-hidden shadow-[0_30px_60px_rgba(79,70,229,0.2)]">
                
                {/* Screen Content */}
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-indigo-950 opacity-90" />
                
                {/* Floating Hearts */}
                {Array.from({length: 6}).map((_, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ y: [-20, -400], opacity: [0, 1, 0], x: Math.sin(i) * 20 }} 
                    transition={{ duration: 2.5 + Math.random(), repeat: Infinity, delay: Math.random() * 2 }} 
                    className="absolute bottom-[20%] right-[15%] text-indigo-400 text-2xl z-10"
                  >
                    ❤️
                  </motion.div>
                ))}

                {/* Safe Area Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-6 bg-slate-900 rounded-b-xl z-20" />
                
                {/* Video UI Bottom */}
                <div className="absolute bottom-6 left-4 right-4 z-20">
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden mb-3">
                    <motion.div 
                      animate={{ width: ["0%", "100%"] }} 
                      transition={{ duration: 5, repeat: Infinity, ease: "linear" }} 
                      className="h-full bg-white rounded-full" 
                    />
                  </div>
                  <div className="w-3/4 h-3 bg-white/90 rounded mb-2" />
                  <div className="w-1/2 h-2.5 bg-white/60 rounded" />
                </div>

                {/* Action Buttons Right */}
                <div className="absolute right-4 bottom-24 flex flex-col gap-4 z-20">
                   <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                     <Activity size={18} color="#fff" />
                   </div>
                   <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                     <Users size={18} color="#fff" />
                   </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
