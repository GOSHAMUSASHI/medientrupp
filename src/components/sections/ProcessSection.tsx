"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MessageSquare, Code2, Rocket, ArrowUpRight } from "lucide-react";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    label: "Briefing",
    title: "Kick-off & Strategie",
    description:
      "In einem 30-minütigen Gespräch klären wir Ziel, Umfang und Zeitrahmen. Danach brauchen wir Sie kaum noch — wir übernehmen vollständig.",
    Icon: MessageSquare,
    iconBg: "bg-indigo-600",
    iconGlow: "shadow-indigo-500/30",
    ringColor: "ring-indigo-100",
    detail: "Kein Zutun Ihrerseits danach nötig",
    tag: "Schritt 1 von 3",
    iconAnim: { y: [0, -8, 0] },
    iconDuration: 2.8,
  },
  {
    number: "02",
    label: "Umsetzung",
    title: "Entwicklung im Hintergrund",
    description:
      "Ihr Team arbeitet weiter — ungestört. Wir liefern wöchentliche Updates und Zwischenstände zur Freigabe. Volle Transparenz, ohne Abstimmungs-Chaos.",
    Icon: Code2,
    iconBg: "bg-violet-600",
    iconGlow: "shadow-violet-500/30",
    ringColor: "ring-violet-100",
    detail: "Volle Transparenz, wöchentliche Updates",
    tag: "Schritt 2 von 3",
    iconAnim: { scale: [1, 1.1, 1] },
    iconDuration: 2.4,
  },
  {
    number: "03",
    label: "Go-Live",
    title: "Launch & messbare Ergebnisse",
    description:
      "Getestet, dokumentiert, live. Ab Tag 1 sehen Sie messbare Ergebnisse — zu einem Festpreis, der vor Projektstart schriftlich vereinbart wurde.",
    Icon: Rocket,
    iconBg: "bg-purple-600",
    iconGlow: "shadow-purple-500/30",
    ringColor: "ring-purple-100",
    detail: "Festpreis-Garantie inklusive",
    tag: "Schritt 3 von 3",
    iconAnim: { y: [0, -6, 0], x: [0, 4, 0] },
    iconDuration: 2.2,
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

export const ProcessSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-white border-t border-slate-200 section-y overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-16"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-indigo-600 mb-4">
              Einfacher Ablauf
            </p>
            <h2
              id="process-heading"
              className="font-semibold tracking-[-0.03em] text-slate-900 leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            >
              In 3 Schritten zu Ihrem{" "}
              <span className="text-indigo-600">neuen System.</span>
            </h2>
          </div>
          <p className="text-base text-slate-500 leading-relaxed max-w-xs md:text-right shrink-0">
            Keine Abstimmungs-Loops. Wir übernehmen die Komplexität.
          </p>
        </motion.div>

        {/* ── Step Rows ── */}
        <div className="border-t border-slate-100">
          {steps.map((step, i) => {
            const rowInViewRef = useRef<HTMLDivElement>(null);
            const rowInView = useInView(rowInViewRef, { once: true, margin: "-60px" });

            return (
              <motion.div
                key={step.number}
                ref={rowInViewRef}
                initial={{ opacity: 0, y: 32 }}
                animate={rowInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group relative border-b border-slate-100 hover:bg-slate-50/80 transition-colors duration-300"
              >
                {/* Indigo left accent — slides in on hover */}
                <div className="absolute left-0 top-0 h-full w-[3px] bg-indigo-600 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 ease-out" />

                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_auto] gap-8 lg:gap-16 items-center py-14 lg:py-16 pl-4 lg:pl-8">

                  {/* ── LEFT: Ghost number ── */}
                  <div className="hidden lg:flex flex-col gap-1">
                    <motion.span
                      className="font-semibold leading-none select-none tabular-nums text-slate-100 group-hover:text-indigo-50 transition-colors duration-300"
                      style={{ fontSize: "clamp(5rem, 9vw, 8rem)" }}
                      animate={rowInView ? {
                        textShadow: [
                          "0 0 0px rgba(99,102,241,0)",
                          "0 0 40px rgba(99,102,241,0.2)",
                          "0 0 0px rgba(99,102,241,0)",
                        ],
                      } : {}}
                      transition={{ delay: 0.3 + i * 0.2, duration: 1.0, ease: "easeOut" }}
                    >
                      {step.number}
                    </motion.span>
                    <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-slate-300 group-hover:text-indigo-400 transition-colors duration-300 ml-1">
                      {step.label}
                    </span>
                  </div>

                  {/* ── CENTER: Content ── */}
                  <div className="flex flex-col gap-4">
                    {/* Mobile: number + label */}
                    <div className="flex items-center gap-3 lg:hidden">
                      <span className="text-3xl font-semibold text-slate-200 tabular-nums leading-none">{step.number}</span>
                      <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400">{step.label}</span>
                    </div>

                    <h3
                      className="font-semibold tracking-tight text-slate-900 leading-snug group-hover:text-indigo-950 transition-colors duration-300"
                      style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-base text-slate-500 leading-relaxed max-w-xl">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-4 pt-1">
                      <span className="inline-block text-[10px] font-semibold tracking-[0.12em] uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-md">
                        {step.detail}
                      </span>
                      <span className="text-[10px] text-slate-300 font-medium hidden sm:block">
                        {step.tag}
                      </span>
                    </div>
                  </div>

                  {/* ── RIGHT: Animated icon ── */}
                  <div className="flex items-center justify-start lg:justify-end pr-0 lg:pr-4">
                    <motion.div
                      className={`w-20 h-20 lg:w-24 lg:h-24 rounded-2xl ${step.iconBg} ring-8 ${step.ringColor} flex items-center justify-center text-white shadow-2xl ${step.iconGlow}`}
                      animate={rowInView ? step.iconAnim : {}}
                      transition={{
                        delay: 0.8 + i * 0.2,
                        duration: step.iconDuration,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "easeInOut",
                      }}
                    >
                      <step.Icon size={36} strokeWidth={1.5} />
                    </motion.div>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="mt-12 md:mt-16 flex items-center gap-6"
        >
          <Link
            href="/projekt-anfragen"
            id="process-cta"
            className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold"
          >
            Jetzt Projekt starten
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <p className="text-sm text-slate-400 hidden sm:block">
            Kostenlos · Unverbindlich · In 24 h
          </p>
        </motion.div>

      </div>
    </section>
  );
};
