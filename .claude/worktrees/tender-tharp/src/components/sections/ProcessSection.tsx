"use client";

import { motion } from "framer-motion";
import { Phone, Settings, Rocket, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    number: "01",
    icon: <Phone size={26} />,
    title: "Kick-off & Strategie",
    description:
      "Ein kompaktes 45-Minuten-Gespräch. Kein Vorgespräch, kein Vertrieb. Sie schildern Ihr Ziel — wir entwickeln gemeinsam die richtige Strategie und legen Festpreis und Timeline fest.",
    badge: "Woche 1",
    detail: "Briefing · Angebot · Freigabe",
  },
  {
    number: "02",
    icon: <Settings size={26} />,
    title: "Umsetzung im Hintergrund",
    description:
      "Unser Team baut Ihr komplettes System — ohne dass Sie Ressourcen aus dem Tagesgeschäft abziehen müssen. Wöchentliches Update, transparentes Trello-Board, keine Überraschungen.",
    badge: "Woche 2–5",
    detail: "Design · Entwicklung · Review",
  },
  {
    number: "03",
    icon: <Rocket size={26} />,
    title: "Go-Live & Übergabe",
    description:
      "Ihr System wird live geschaltet, vollständig getestet und Ihnen in einer Übergabe-Session erklärt. Sie erhalten alle Zugänge, den Quellcode und eine Bedienungsanleitung.",
    badge: "Woche 6",
    detail: "Launch · Training · Support",
  },
];

export const ProcessSection = () => {
  return (
    <section className="bg-slate-50 py-20 md:py-24 border-y border-slate-100" aria-labelledby="process-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
            So arbeiten wir
          </p>
          <h2 id="process-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-5">
            Von der Idee zum fertigen System —{" "}
            <span className="text-indigo-600">in 6 Wochen.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Kein Agentur-Chaos, keine endlosen Abstimmungsschleifen. Wir liefern schlüsselfertig — Sie konzentrieren sich auf Ihr Kerngeschäft.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Desktop connector */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[60px] left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-indigo-200 via-indigo-400 to-indigo-200 z-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Icon + number */}
                <div className="relative mb-5">
                  <div className="w-[120px] h-[120px] rounded-2xl bg-white border border-indigo-100 shadow-lg shadow-indigo-100/50 flex items-center justify-center text-indigo-600">
                    {step.icon}
                  </div>
                  <span className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-indigo-600 text-white text-xs font-black flex items-center justify-center shadow-md shadow-indigo-600/30">
                    {step.number}
                  </span>
                </div>

                {/* Timeline badge */}
                <div className="flex items-center gap-1.5 mb-4">
                  <Calendar size={12} className="text-indigo-500" />
                  <span className="text-xs font-black text-indigo-600 uppercase tracking-widest">
                    {step.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {step.description}
                </p>

                {/* Detail pills */}
                <div className="flex flex-wrap justify-center gap-1.5">
                  {step.detail.split(" · ").map((d) => (
                    <span key={d} className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {d}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Guarantee Strip */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-14 bg-white rounded-2xl border border-indigo-100 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm"
        >
          <div className="text-center md:text-left">
            <p className="font-bold text-slate-900 text-lg">
              Festpreis-Garantie inklusive.
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Kein Stundensatz. Kein Overrun. Sie kennen das genaue Investment vor Tag 1 — schriftlich fixiert.
            </p>
          </div>
          <Link
            href="/projekt-anfragen"
            className="flex-shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all shadow-md shadow-indigo-600/20 hover:-translate-y-0.5"
          >
            Jetzt Projekt starten
            <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
