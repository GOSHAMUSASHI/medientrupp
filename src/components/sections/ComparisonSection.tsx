"use client";

import { Check, X } from "lucide-react";
import { motion } from "framer-motion";

export const ComparisonSection = () => {
  return (
    <section className="bg-slate-50 py-16 md:py-24" aria-labelledby="comparison-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="py-12 border-b border-slate-200 mb-12">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
            Die Entscheidung
          </p>
          <h2
            id="comparison-heading"
            className="font-black tracking-[-0.03em] text-slate-900"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
          >
            Der Unterschied
            <br />
            <span className="text-violet-600">im Detail.</span>
          </h2>
          <p className="text-base text-slate-500 mt-4 max-w-md leading-relaxed">
            Warum Marktführer auf unsere Infrastruktur wechseln.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">

          {/* Card 1: Klassische Agentur */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white border border-slate-200 shadow-lg shadow-slate-200/60 p-8 sm:p-10"
          >
            <h3 className="text-xl font-bold text-slate-900 mb-2">Klassische Agentur</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
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
                  <X size={18} className="text-slate-300 shrink-0 mt-0.5" />
                  <span className="text-slate-500 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Card 2: Medientrupp — hervorgehoben mit Indigo-Rahmen */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-white border-2 border-violet-600 shadow-xl shadow-violet-600/8 p-8 sm:p-10"
          >
            {/* Empfohlen-Badge */}
            <div className="absolute top-0 right-8 -translate-y-1/2 bg-violet-600 text-white text-xs font-bold tracking-wider uppercase py-1.5 px-4">
              Empfohlen
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-2">Medientrupp Variante</h3>
            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
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
                  <div className="bg-violet-50 border border-violet-100 p-1 shrink-0 mt-0.5">
                    <Check size={12} className="text-violet-600" strokeWidth={3} />
                  </div>
                  <span className="text-slate-900 text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
