"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle2, AlertTriangle, Zap } from "lucide-react";

export const TechComparison = () => {
  return (
    <section className="bg-white py-24 text-slate-900 relative overflow-hidden" aria-labelledby="techcomparison-heading">
      {/* Background glow effects */}
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
            Infrastruktur-Audit
          </p>
          <h2 id="techcomparison-heading" className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Der Unterschied ist <span className="text-indigo-600">messbar.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Wir kompilieren unseren Code, anstatt ihn durch rostige PHP-Server zu jagen. Ihre Konkurrenz wird sich wundern, warum Sie plötzlich den Markt dominieren.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Legacy Agency (Red) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-1 bg-slate-50 backdrop-blur-sm border border-slate-200 rounded-3xl p-8 lg:p-12"
          >
            <div className="flex items-center gap-4 mb-10">
              <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Klassische Agenturen</h3>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-sm font-bold text-slate-500 mb-2">
                  <span>Ø Ladezeit (TTFB)</span>
                  <span className="text-red-500">3.8s</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "85%" }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="bg-red-500 h-2 rounded-full"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold text-slate-500 mb-2">
                  <span>Google Lighthouse Score</span>
                  <span className="text-orange-500">45/100</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "45%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="bg-orange-500 h-2 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                {[
                  "Schwerfällige WordPress / PHP Themes",
                  "Zusammengesteckte Plugin-Architektur",
                  "Hohes Sicherheitsrisiko (SQL Injection)",
                  "Eingeschränkte Skalierbarkeit für Traffic"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <XCircle size={20} className="text-slate-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Medientrupp (Green/Indigo) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 bg-white shadow-xl shadow-indigo-100 border border-indigo-100 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
            
            <div className="flex items-center gap-4 mb-10 relative z-10">
              <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-600/30">
                <Zap size={24} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Medientrupp Systeme</h3>
            </div>

            <div className="space-y-8 relative z-10">
              <div>
                <div className="flex justify-between text-sm font-bold text-slate-600 mb-2">
                  <span>Ladezeit (Edge Network)</span>
                  <span className="text-green-600">0.2s</span>
                </div>
                <div className="w-full bg-indigo-100/50 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "5%" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="bg-green-500 h-2 rounded-full shadow-[0_0_10px_#22c55e]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm font-bold text-slate-600 mb-2">
                  <span>Google Lighthouse Score</span>
                  <span className="text-green-600">100/100</span>
                </div>
                <div className="w-full bg-indigo-100/50 rounded-full h-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="bg-green-500 h-2 rounded-full shadow-[0_0_10px_#22c55e]"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                {[
                  "Blitzschnelle Ladezeiten",
                  "Skalierbare Vertriebs-Maschine",
                  "Zero-Friction User Experience",
                  "Maximale Conversion-Rate"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
