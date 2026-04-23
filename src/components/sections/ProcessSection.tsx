"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MessageSquare, Code2, Rocket, Check } from "lucide-react";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    label: "Briefing",
    title: "Kick-off & Strategie",
    desc: "30 Minuten. Ziel, Umfang und Termin. Den Rest übernehmen wir.",
    detail: "Kein weiterer Aufwand Ihrerseits",
    Icon: MessageSquare,
    color: "bg-indigo-600",
    colorLight: "bg-indigo-50",
    colorText: "text-indigo-600",
    ring: "ring-indigo-100",
    shadow: "shadow-indigo-500/20",
    iconAnim: { y: [0, -6, 0] },
    iconDuration: 2.8,
  },
  {
    number: "02",
    label: "Umsetzung",
    title: "Entwicklung im Hintergrund",
    desc: "Ihr Team arbeitet weiter. Wir liefern wöchentliche Updates.",
    detail: "Volle Transparenz, kein Chaos",
    Icon: Code2,
    color: "bg-violet-600",
    colorLight: "bg-violet-50",
    colorText: "text-violet-600",
    ring: "ring-violet-100",
    shadow: "shadow-violet-500/20",
    iconAnim: { scale: [1, 1.09, 1] },
    iconDuration: 2.4,
  },
  {
    number: "03",
    label: "Go-Live",
    title: "Launch & Ergebnisse",
    desc: "Getestet, live, messbar. Festpreis ab Tag 1 garantiert.",
    detail: "Festpreis-Garantie inklusive",
    Icon: Rocket,
    color: "bg-purple-600",
    colorLight: "bg-purple-50",
    colorText: "text-purple-600",
    ring: "ring-purple-100",
    shadow: "shadow-purple-500/20",
    iconAnim: { y: [0, -5, 0], x: [0, 3, 0] },
    iconDuration: 2.2,
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

export const ProcessSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  // Icon badge size: 56px mobile, 72px desktop → center at 28px / 36px
  const lineTopMobile = 28;
  const lineTopDesktop = 36;

  return (
    <section
      ref={ref}
      className="bg-white border-t border-slate-200 section-y overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-indigo-600 mb-3">
            Einfacher Ablauf
          </p>
          <h2
            id="process-heading"
            className="font-semibold tracking-[-0.03em] text-slate-900 leading-tight"
            style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
          >
            In 3 Schritten zu Ihrem{" "}
            <span className="text-indigo-600">neuen System.</span>
          </h2>
        </motion.div>

        {/* ── 3-Column Steps — always horizontal ── */}
        <div className="relative grid grid-cols-3">

          {/* ── Connector line — runs through badge centers ── */}
          {/* Mobile (top-[28px]) */}
          <div
            className="absolute left-[calc(100%/6)] right-[calc(100%/6)] sm:hidden"
            style={{ top: lineTopMobile }}
          >
            {/* Track */}
            <div className="w-full h-px bg-slate-200" />
            {/* Animated fill */}
            <motion.div
              className="absolute inset-0 h-px origin-left"
              style={{
                background: "linear-gradient(to right, #6366f1, #7c3aed, #9333ea)",
              }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* Traveling glow dot */}
            <motion.div
              className="absolute top-0 w-2 h-2 rounded-full -mt-[3px]"
              style={{
                background: "#7c3aed",
                boxShadow: "0 0 8px 3px rgba(124,58,237,0.5)",
              }}
              initial={{ left: "0%", opacity: 0 }}
              animate={inView ? { left: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
              transition={{ delay: 1.1, duration: 0.6, ease: "easeInOut" }}
            />
          </div>

          {/* Desktop (top-[36px]) */}
          <div
            className="absolute left-[calc(100%/6)] right-[calc(100%/6)] hidden sm:block"
            style={{ top: lineTopDesktop }}
          >
            <div className="w-full h-px bg-slate-200" />
            <motion.div
              className="absolute inset-0 h-px origin-left"
              style={{
                background: "linear-gradient(to right, #6366f1, #7c3aed, #9333ea)",
              }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="absolute top-0 w-2 h-2 rounded-full -mt-[3px]"
              style={{
                background: "#7c3aed",
                boxShadow: "0 0 8px 3px rgba(124,58,237,0.5)",
              }}
              initial={{ left: "0%", opacity: 0 }}
              animate={inView ? { left: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
              transition={{ delay: 1.1, duration: 0.6, ease: "easeInOut" }}
            />
          </div>

          {/* ── Step columns ── */}
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              className="flex flex-col items-center text-center px-2 sm:px-4 lg:px-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Badge */}
              <motion.div
                className={`
                  relative z-10 w-14 h-14 sm:w-18 sm:h-18 rounded-xl sm:rounded-2xl
                  ${step.color} ring-4 sm:ring-8 ${step.ring}
                  flex items-center justify-center text-white
                  shadow-lg ${step.shadow} mb-4 sm:mb-5
                `}
                style={{ width: undefined, height: undefined }}
                animate={inView ? step.iconAnim : {}}
                transition={{
                  delay: 0.8 + i * 0.2,
                  duration: step.iconDuration,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "easeInOut",
                }}
              >
                {/* Actual size via inline style for consistent mobile/desktop */}
                <div className="w-14 h-14 sm:w-[72px] sm:h-[72px] flex items-center justify-center">
                  <step.Icon size={20} strokeWidth={1.75} className="sm:hidden" />
                  <step.Icon size={26} strokeWidth={1.75} className="hidden sm:block" />
                </div>
              </motion.div>

              {/* Step number */}
              <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-1.5 sm:mb-2">
                {step.number} · {step.label}
              </span>

              {/* Title */}
              <h3 className="font-semibold tracking-tight text-slate-900 leading-snug mb-2 sm:mb-3"
                style={{ fontSize: "clamp(0.75rem, 1.8vw, 1.1rem)" }}
              >
                {step.title}
              </h3>

              {/* Description — hidden on very small screens */}
              <p className="hidden xs:block sm:block text-slate-500 leading-relaxed mb-3 sm:mb-4"
                style={{ fontSize: "clamp(0.65rem, 1.4vw, 0.875rem)" }}
              >
                {step.desc}
              </p>

              {/* Detail pill */}
              <div className={`inline-flex items-center gap-1 ${step.colorLight} ${step.colorText} rounded-md px-2 py-1`}>
                <Check size={10} strokeWidth={2.5} />
                <span className="font-semibold leading-none"
                  style={{ fontSize: "clamp(0.6rem, 1.2vw, 0.7rem)" }}
                >
                  {step.detail}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/projekt-anfragen"
            id="process-cta"
            className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold"
          >
            Jetzt Projekt starten
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <p className="text-sm text-slate-400">
            Kostenlos · Unverbindlich · In 24 h
          </p>
        </motion.div>

      </div>
    </section>
  );
};
