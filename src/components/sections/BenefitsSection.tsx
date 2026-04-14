"use client";

import { motion } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const stats = [
  {
    value: "0,09s",
    label: "Ladezeit garantiert",
    sub: "38× schneller als Marktdurchschnitt. Jede Sekunde Ladezeit kostet 7 % Conversion Rate.",
  },
  {
    value: "100 %",
    label: "Festpreis-Garantie",
    sub: "Kein Stundensatz, kein Overrun. Preis fixiert vor Projektstart — schriftlich und verbindlich.",
  },
  {
    value: "3–6",
    label: "Wochen bis Go-Live",
    sub: "Strukturierte Sprints statt endloser Feedback-Schleifen. Ergebnisse, nicht Prozesse.",
  },
];

const checklist = [
  "Kein Fachchinesisch. Klare Kommunikation.",
  "Echter Business-Impact statt nur bunte Bilder.",
  "Ein Ansprechpartner für alles Digitale.",
];

// ── Section ───────────────────────────────────────────────────────────────────

export const BenefitsSection = () => {
  return (
    <section
      className="bg-white border-t border-slate-200 overflow-hidden relative"
      aria-labelledby="benefits-heading"
    >
      {/* Dot-grid background */}
      <div
        aria-hidden="true"
        className="dot-grid absolute inset-0 opacity-[0.25] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top: headline + sub-copy */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] border-b border-slate-200 py-12 gap-0"
        >
          <div className="lg:pr-12">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
              Der Medientrupp Unterschied
            </p>
            <h2
              id="benefits-heading"
              className="font-black tracking-[-0.03em] text-slate-900"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
            >
              Fokus auf Ihr Kerngeschäft
              <br />
              statt{" "}
              <span className="text-indigo-600">digitaler Baustellen.</span>
            </h2>
          </div>

          {/* Vertical rule */}
          <div className="hidden lg:block bg-slate-200 self-stretch" />

          {/* Right: copy + checklist */}
          <div className="lg:pl-12 flex flex-col justify-center mt-8 lg:mt-0">
            <p className="text-base text-slate-500 leading-relaxed mb-8">
              Sicher, Sie könnten einen Baukasten nutzen oder den Praktikanten ranlassen. Aber im
              Mittelstand zahlt sich Professionalität aus. Wir bauen Systeme, die Leads generieren,
              Zeit sparen und Ihre Marke stärken.
            </p>
            <div className="space-y-3">
              {checklist.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 bg-indigo-600 mt-2 shrink-0" aria-hidden="true" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom: KPI stat row */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`py-12 ${i < stats.length - 1 ? "md:border-r border-b md:border-b-0 border-slate-200" : "border-b md:border-b-0 border-slate-200"} ${i > 0 ? "md:pl-10" : ""}`}
            >
              <p
                className="font-black tracking-tight text-slate-900 mb-1"
                style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", lineHeight: 1 }}
              >
                {stat.value}
                <span
                  className="block text-[11px] font-semibold tracking-[0.2em] uppercase text-indigo-600 mt-2"
                >
                  {stat.label}
                </span>
              </p>
              <p className="text-sm text-slate-500 leading-relaxed mt-4 max-w-xs">
                {stat.sub}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
