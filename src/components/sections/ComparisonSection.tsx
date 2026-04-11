"use client";

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

export const ComparisonSection = () => {
  return (
    <section className="bg-slate-900 py-24 lg:py-32" aria-labelledby="comparison-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-400 mb-3">
            Die Entscheidung
          </p>
          <h2 id="comparison-heading" className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Der Unterschied im Detail.
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Warum Marktführer auf unsere Infrastruktur wechseln.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {/* Card 1: Klassische Agentur */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-md p-8 sm:p-10 bg-slate-800 border border-slate-700 shadow-xl"
          >
            <h3 className="text-xl font-bold text-slate-300 mb-2">Klassische Agentur</h3>
            <p className="text-slate-400 text-sm mb-8">
              Fokus auf Design, oft mit technischen Kompromissen.
            </p>

            <ul className="space-y-4">
              {[
                "Baukasten-Systeme (Wordpress, Wix)",
                "Langsame Ladezeiten (>3 Sekunden)",
                "Standard Templates",
                "Versteckte Kosten & Wartungsverträge",
                "Keine eigenen technischen Systeme",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <X size={20} className="text-slate-500 shrink-0 mt-0.5" />
                  <span className="text-slate-400">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 2: Medientrupp */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-md p-8 sm:p-10 bg-slate-800/80 backdrop-blur-md border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20"
          >
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-indigo-600 text-white text-xs font-bold tracking-wider uppercase py-1.5 px-4 rounded-md">
              Empfohlen
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Medientrupp Variante</h3>
            <p className="text-slate-300 text-sm mb-8">
              State-of-the-Art Software Engineering kombiniert mit Premium Design.
            </p>

            <ul className="space-y-4">
              {[
                "Custom Code (React, Next.js)",
                "Blitzschnell (<0.5s Ladezeit)",
                "Maßgeschneiderte UX/UI Architekturen",
                "100% Transparente Festpreise",
                "Nahtlose KI-Integration & Workflows",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="bg-indigo-500/20 rounded-md p-1 shrink-0 mt-0.5">
                    <Check size={14} className="text-indigo-400 font-bold" />
                  </div>
                  <span className="text-indigo-50 font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
