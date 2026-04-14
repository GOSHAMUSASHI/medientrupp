"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    title: "Kick-off & Strategie",
    description:
      "Wir telefonieren kurz. Wir holen uns alle Informationen, die wir benötigen. Sie lehnen sich zurück.",
    tag: "Kompaktes Briefing",
  },
  {
    number: "02",
    title: "Umsetzung im Hintergrund",
    description:
      "Unser Team baut Ihr komplettes System — ohne dass Sie Ressourcen aus Ihrem Tagesgeschäft abziehen müssen.",
    tag: "Schlüsselfertige Umsetzung",
  },
  {
    number: "03",
    title: "Go-Live & Skalierung",
    description:
      "Ihr System ist fertig, getestet und wird live geschaltet. Es bringt Ergebnisse ab Tag 1.",
    tag: "Reibungsloser Go-Live",
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

export const ProcessSection = () => {
  return (
    <section className="bg-white border-t border-slate-200" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header — editorial, left-aligned with right-side label */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-6 py-12 border-b border-slate-200"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
              Einfacher Ablauf
            </p>
            <h2
              id="process-heading"
              className="font-black tracking-[-0.03em] text-slate-900"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
            >
              In 3 Schritten zu Ihrem
              <br />
              <span className="text-indigo-600">neuen System.</span>
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-xs leading-relaxed lg:text-right">
            Keine endlosen Abstimmungs-Loops. Wir übernehmen die Komplexität und liefern.
          </p>
        </motion.div>

        {/* Steps — editorial numbered rows */}
        <div>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-[auto_1fr] lg:grid-cols-[200px_1px_1fr_auto] items-start gap-8 py-12 border-b border-slate-100"
            >
              {/* Step number — massive editorial anchor */}
              <div
                className="font-black text-slate-100 leading-none select-none hidden lg:block"
                style={{ fontSize: "clamp(4rem, 7vw, 7rem)" }}
                aria-hidden="true"
              >
                {step.number}
              </div>

              {/* Vertical rule — desktop only */}
              <div className="hidden lg:block self-stretch bg-slate-100" />

              {/* Content */}
              <div className="col-span-2 lg:col-span-1 pl-0 lg:pl-10">
                {/* Step number — mobile */}
                <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-3 lg:hidden">
                  {step.number}
                </p>
                <h3
                  className="font-black tracking-tight text-slate-900 mb-4"
                  style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
                >
                  {step.title}
                </h3>
                <p className="text-base text-slate-500 leading-relaxed max-w-lg">
                  {step.description}
                </p>
              </div>

              {/* Tag — right column */}
              <div className="hidden lg:flex items-start pt-1">
                <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-indigo-600 border border-indigo-100 bg-indigo-50 px-3 py-1.5 whitespace-nowrap">
                  {step.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="py-10"
        >
          <Link
            href="/projekt-anfragen"
            id="process-cta"
            className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold"
          >
            Jetzt Projekt starten
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
