"use client";

import { motion } from "framer-motion";
import { Phone, Settings, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    icon: <Phone size={28} />,
    title: "Kick-off & Strategie",
    description: "Wir telefonieren kurz. Wir holen uns alle Informationen, die wir benötigen. Sie lehnen sich zurück.",
    tag: "Kompaktes Briefing",
  },
  {
    number: "02",
    icon: <Settings size={28} />,
    title: "Umsetzung im Hintergrund",
    description: "Unser Team baut Ihr komplettes System — ohne dass Sie Ressourcen aus Ihrem Tagesgeschäft abziehen müssen.",
    tag: "Schlüsselfertige Umsetzung",
  },
  {
    number: "03",
    icon: <Rocket size={28} />,
    title: "Go-Live & Skalierung",
    description: "Ihr System ist fertig, getestet und wird live geschaltet. Es bringt Ergebnisse ab Tag 1.",
    tag: "Reibungsloser Go-Live",
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

export const ProcessSection = () => {
  return (
    <section className="bg-white border-t border-slate-200" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-violet-600 mb-4">
            Einfacher Ablauf
          </p>
          <h2
            id="process-heading"
            className="font-black tracking-[-0.03em] text-slate-900 mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", lineHeight: 0.95 }}
          >
            In 3 Schritten zu Ihrem{" "}
            <span className="text-violet-600">neuen System.</span>
          </h2>
          <p className="text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
            Keine endlosen Abstimmungs-Loops. Wir übernehmen die Komplexität und liefern — Sie kümmern sich um Ihr Geschäft.
          </p>
        </motion.div>

        {/* 3-column grid with connector line */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[52px] left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-slate-200 z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon box with step number badge */}
                <div className="relative mb-6">
                  <div className="w-[100px] h-[100px] bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
                    {step.icon}
                  </div>
                  {/* Step number badge */}
                  <span className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-violet-600 text-white text-[11px] font-black flex items-center justify-center">
                    {step.number}
                  </span>
                </div>

                {/* Tag */}
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-violet-600 border border-violet-100 bg-violet-50 px-3 py-1 mb-4">
                  {step.tag}
                </span>

                <h3 className="text-lg font-black tracking-tight text-slate-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
          className="text-center mt-12"
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
