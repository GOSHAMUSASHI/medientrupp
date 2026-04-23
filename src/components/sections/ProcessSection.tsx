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
    desc: "30 Minuten. Ziel, Umfang und Termin — den Rest übernehmen wir vollständig.",
    detail: "Kein weiterer Aufwand Ihrerseits",
    Icon: MessageSquare,
    iconGradient: "linear-gradient(135deg,#7c3aed,#6d28d9)",
    glow: "rgba(124,58,237,0.4)",
    shadowCard: "rgba(124,58,237,0.12)",
    shadowHover: "rgba(124,58,237,0.22)",
    pillBg: "bg-violet-50",
    pillText: "text-violet-700",
    pillBorder: "border-violet-100",
    iconAnim: { y: [0, -6, 0] },
    iconDuration: 2.8,
  },
  {
    number: "02",
    label: "Umsetzung",
    title: "Entwicklung im Hintergrund",
    desc: "Ihr Team arbeitet weiter. Wir liefern getaktete Zwischenstände zur Freigabe.",
    detail: "Volle Transparenz, kein Chaos",
    Icon: Code2,
    iconGradient: "linear-gradient(135deg,#7c3aed,#6d28d9)",
    glow: "rgba(124,58,237,0.4)",
    shadowCard: "rgba(124,58,237,0.12)",
    shadowHover: "rgba(124,58,237,0.22)",
    pillBg: "bg-violet-50",
    pillText: "text-violet-700",
    pillBorder: "border-violet-100",
    iconAnim: { scale: [1, 1.1, 1] },
    iconDuration: 2.4,
  },
  {
    number: "03",
    label: "Go-Live",
    title: "Launch & Ergebnisse",
    desc: "Getestet, dokumentiert, live. Festpreis — messbare Ergebnisse ab Tag 1.",
    detail: "Festpreis-Garantie inklusive",
    Icon: Rocket,
    iconGradient: "linear-gradient(135deg,#7c3aed,#6d28d9)",
    glow: "rgba(124,58,237,0.4)",
    shadowCard: "rgba(124,58,237,0.12)",
    shadowHover: "rgba(124,58,237,0.22)",
    pillBg: "bg-violet-50",
    pillText: "text-violet-700",
    pillBorder: "border-violet-100",
    iconAnim: { y: [0, -5, 0], x: [0, 4, 0] },
    iconDuration: 2.2,
  },
];

// ── Shared icon component ─────────────────────────────────────────────────────

const StepIcon = ({
  step,
  size,
  inView,
  delay,
  className = "",
}: {
  step: typeof steps[number];
  size: number;
  inView: boolean;
  delay: number;
  className?: string;
}) => (
  <motion.div
    className={`relative flex items-center justify-center text-white overflow-hidden rounded-full shrink-0 ${className}`}
    style={{
      background: step.iconGradient,
      boxShadow: `0 6px 20px -4px ${step.glow}, 0 0 0 4px ${step.glow.replace("0.4", "0.1")}`,
    }}
    animate={inView ? step.iconAnim : {}}
    transition={{
      delay,
      duration: step.iconDuration,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    }}
  >
    {/* Inner shine */}
    <div className="absolute inset-0 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
    <step.Icon size={size} strokeWidth={2} className="relative z-10" />
  </motion.div>
);

// ── Section ───────────────────────────────────────────────────────────────────

export const ProcessSection = () => {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative bg-slate-50 border-t border-slate-200 section-y overflow-hidden"
      aria-labelledby="process-heading"
    >
      {/* ── Mesh gradient background ── */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-300 opacity-[0.07] blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-violet-400 opacity-[0.06] blur-[100px]" />
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-purple-300 opacity-[0.07] blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#6366f1 1px,transparent 1px),linear-gradient(to right,#6366f1 1px,transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 md:mb-16"
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
          <p className="mt-3 text-sm text-slate-500 max-w-sm mx-auto leading-relaxed">
            Keine Abstimmungs-Loops. Wir übernehmen die Komplexität.
          </p>
        </motion.div>

        {/* ════════════════════════════════════════════════
            MOBILE — vertical compact stack (< sm)
        ════════════════════════════════════════════════ */}
        <div className="sm:hidden flex flex-col">
          {steps.map((step, i) => (
            <div key={step.number}>
              <motion.div
                className="flex items-start gap-3 bg-white rounded-2xl p-4"
                style={{
                  boxShadow: `0 4px 20px -6px ${step.shadowCard}, 0 1px 6px -2px rgba(15,23,42,0.06)`,
                }}
                initial={{ opacity: 0, x: -16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Icon */}
                <StepIcon
                  step={step}
                  size={20}
                  inView={inView}
                  delay={0.7 + i * 0.15}
                  className="w-11 h-11 mt-0.5"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-semibold tracking-[0.22em] uppercase text-slate-400 block mb-0.5">
                    {step.number} · {step.label}
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-2">
                    {step.desc}
                  </p>
                  <span className={`inline-flex items-center gap-1 ${step.pillBg} ${step.pillText} border ${step.pillBorder} rounded-full px-2 py-0.5`}>
                    <Check size={9} strokeWidth={3} className="shrink-0" />
                    <span className="text-[10px] font-semibold leading-none">{step.detail}</span>
                  </span>
                </div>
              </motion.div>

              {/* Vertical connector */}
              {i < steps.length - 1 && (
                <motion.div
                  className="flex justify-center py-1.5"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4 + i * 0.12 }}
                >
                  <div className="h-5" style={{ width: 2, borderLeft: "2px dashed #7c3aed", opacity: 0.45 }} />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* ════════════════════════════════════════════════
            DESKTOP — 3-column horizontal grid (≥ sm)
        ════════════════════════════════════════════════ */}
        <div className="hidden sm:block">
          <div className="relative grid grid-cols-3 gap-5 lg:gap-7">

            {/* Horizontal dashed connector through icon centers */}
            <motion.div
              className="absolute z-0 overflow-hidden"
              style={{ top: 51, left: "calc(100%/6)", right: "calc(100%/6)", height: 2 }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: "repeating-linear-gradient(90deg, #7c3aed 0px, #7c3aed 6px, transparent 6px, transparent 12px)",
                  opacity: 0.35,
                }}
              />
            </motion.div>

            {/* Cards */}
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative z-10 flex flex-col items-center text-center bg-white rounded-2xl p-6 lg:p-8 transition-all duration-300 ease-out hover:-translate-y-1.5 cursor-default"
                style={{
                  boxShadow: `0 8px 32px -8px ${step.shadowCard}, 0 2px 8px -2px rgba(15,23,42,0.06)`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 24px 64px -12px ${step.shadowHover}, 0 8px 24px -6px rgba(15,23,42,0.08)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 8px 32px -8px ${step.shadowCard}, 0 2px 8px -2px rgba(15,23,42,0.06)`;
                }}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-6 w-full mb-4">
                  <StepIcon
                    step={step}
                    size={24}
                    inView={inView}
                    delay={0.8 + i * 0.2}
                    className="w-14 h-14 shrink-0"
                  />

                  <div className="text-left flex-1">
                    <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-1 block">
                      {step.number} · {step.label}
                    </span>

                    <h3 className="text-base lg:text-lg font-semibold tracking-tight text-slate-900 leading-snug">
                      {step.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-slate-500 leading-relaxed mb-5 text-left w-full">
                  {step.desc}
                </p>

                <div className={`inline-flex items-center gap-1.5 ${step.pillBg} ${step.pillText} border ${step.pillBorder} rounded-full px-3 py-1.5 mt-auto`}>
                  <Check size={11} strokeWidth={3} className="shrink-0" />
                  <span className="text-[11px] font-semibold leading-none">{step.detail}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.4 }}
          className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5"
        >
          <Link
            href="/projekt-anfragen"
            id="process-cta"
            className="group btn-glow inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold"
          >
            Jetzt Projekt starten
            <ArrowRight
              size={16}
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
          <p className="text-sm text-slate-400">Kostenlos · Unverbindlich · In 24 h</p>
        </motion.div>

      </div>
    </section>
  );
};
