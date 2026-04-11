"use client";

import { motion } from "framer-motion";
import { Phone, Settings, Rocket, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: <Phone size={28} />,
    title: "Kick-off & Strategie",
    description: "Wir telefonieren kurz. Wir holen uns alle Informationen, die wir benötigen. Sie lehnen sich zurück.",
    duration: "Kompaktes Briefing",
    color: "#4F46E5",
    bg: "#E0E7FF",
  },
  {
    number: "02",
    icon: <Settings size={28} />,
    title: "Umsetzung im Hintergrund",
    description: "Unser Team baut Ihr komplettes System. Ohne dass Sie Ressourcen aus Ihrem Tagesgeschäft abziehen müssen.",
    duration: "Schlüsselfertige Umsetzung",
    color: "#4F46E5",
    bg: "#E0E7FF",
  },
  {
    number: "03",
    icon: <Rocket size={28} />,
    title: "Go-Live & Skalierung",
    description: "Ihr System ist fertig, getestet und wird live geschaltet. Es bringt Ergebnisse ab Tag 1.",
    duration: "Reibungsloser Go-Live",
    color: "#4F46E5",
    bg: "#E0E7FF",
  },
];

export const ProcessSection = () => {
  return (
    <section className="bg-white py-16 md:py-20" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
            Einfacher Ablauf
          </p>
          <h2 id="process-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            In 3 Schritten zu Ihrem{" "}
            <span className="text-indigo-600">neuen System.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Keine endlosen Abstimmungs-Loops. Wir übernehmen die Komplexität und liefern— Sie kümmern sich um Ihr Geschäft.
          </p>
        </motion.div>

        {/* 3-column grid with connector line */}
        <div className="relative">
          {/* Connector line (desktop only) */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[52px] left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-0.5 bg-slate-100 z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center text-center h-full"
              >
                {/* Icon circle */}
                <div
                  className="w-[104px] h-[104px] rounded-md flex items-center justify-center mb-6 relative"
                  style={{ background: step.bg, color: step.color }}
                >
                  {step.icon}
                  {/* Step number badge */}
                  <span
                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full text-xs font-black flex items-center justify-center text-white"
                    style={{ background: step.color }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Duration tag */}
                <span
                  className="inline-block text-xs font-bold px-3 py-1 rounded-md mb-4"
                  style={{ background: step.bg, color: step.color }}
                >
                  {step.duration}
                </span>

                <h3 className="text-xl font-semibold text-slate-900 tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-base leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-10"
        >
          <Link
            href="/projekt-anfragen"
            id="process-cta"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
          >
            Jetzt Projekt starten
            <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
