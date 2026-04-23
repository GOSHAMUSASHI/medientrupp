"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, MessageSquare, Code2, Rocket } from "lucide-react";
import Link from "next/link";
import { useRef, type ReactNode } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    label: "Briefing",
    title: "Kick-off & Strategie",
    description:
      "30 Minuten. Wir klären Ziel, Umfang und Termin. Den Rest übernehmen wir.",
    icon: <MessageSquare size={20} strokeWidth={1.5} />,
    accent: "from-indigo-500/10 to-violet-500/5",
    detail: "Kein Zutun Ihrerseits danach nötig",
  },
  {
    number: "02",
    label: "Umsetzung",
    title: "Entwicklung im Hintergrund",
    description:
      "Ihr Team arbeitet weiter. Wir liefern Zwischenstände zur Freigabe.",
    icon: <Code2 size={20} strokeWidth={1.5} />,
    accent: "from-violet-500/10 to-purple-500/5",
    detail: "Volle Transparenz, wöchentliche Updates",
  },
  {
    number: "03",
    label: "Go-Live",
    title: "Launch & Ergebnisse",
    description:
      "Getestet, dokumentiert, live. Messbare Ergebnisse ab Tag 1.",
    icon: <Rocket size={20} strokeWidth={1.5} />,
    accent: "from-purple-500/10 to-indigo-500/5",
    detail: "Festpreis-Garantie inklusive",
  },
];

// ── Animated connector line ───────────────────────────────────────────────────

const ConnectorLine = ({ delay, inView }: { delay: number; inView: boolean }) => (
  <div className="hidden lg:flex flex-1 items-center mx-2 mt-8">
    <div className="relative w-full h-px">
      {/* Background line */}
      <div className="absolute inset-0 bg-slate-200" />
      {/* Animated foreground */}
      <motion.div
        className="absolute inset-0 origin-left"
        style={{ background: "linear-gradient(to right, #7c3aed, #a78bfa)" }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Traveling dot */}
      <motion.div
        className="absolute top-0 rounded-full"
        style={{
          width: 8,
          height: 8,
          marginTop: -3.5,
          marginLeft: -4,
          background: "#7c3aed",
          boxShadow: "0 0 0 3px rgba(124,58,237,0.2), 0 0 12px 4px rgba(124,58,237,0.4)",
        }}
        initial={{ left: "0%", opacity: 0 }}
        animate={inView ? { left: ["0%", "100%"], opacity: [0, 1, 1, 0] } : {}}
        transition={{ delay: delay + 0.6, duration: 0.5, ease: "easeInOut" }}
      />
    </div>
  </div>
);

// ── Step Card ─────────────────────────────────────────────────────────────────

const StepCard = ({
  step,
  index,
  inView,
}: {
  step: typeof steps[number];
  index: number;
  inView: boolean;
}) => {
  const pulseDelay = index * 1.0 + 0.4;

  return (
    <motion.div
      className="flex-1 flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Number with glow pulse */}
      <div className="flex items-center gap-3 mb-6">
        <motion.span
          className="font-semibold text-indigo-600 leading-none select-none tabular-nums"
          style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
          animate={
            inView
              ? {
                  textShadow: [
                    "0 0 0px rgba(124,58,237,0)",
                    "0 0 28px rgba(124,58,237,0.65)",
                    "0 0 0px rgba(124,58,237,0)",
                  ],
                }
              : {}
          }
          transition={{ delay: pulseDelay, duration: 0.7, ease: "easeOut" }}
        >
          {step.number}
        </motion.span>
        <span className="text-[9px] font-semibold tracking-[0.25em] uppercase text-slate-400 mt-1">
          {step.label}
        </span>
      </div>

      {/* Card */}
      <motion.div
        className={`flex-1 rounded-2xl border border-slate-200 bg-gradient-to-br ${step.accent} p-6 md:p-7 flex flex-col gap-4 shadow-sm`}
        animate={
          inView
            ? {
                boxShadow: [
                  "0 0 0px rgba(124,58,237,0)",
                  "0 0 0 1px rgba(124,58,237,0.2), 0 4px 24px rgba(124,58,237,0.12)",
                  "0 1px 3px rgba(15,23,42,0.06), 0 4px 16px rgba(15,23,42,0.04)",
                ],
              }
            : {}
        }
        transition={{ delay: pulseDelay + 0.05, duration: 0.8 }}
      >
        {/* Icon */}
        <div className="w-10 h-10 rounded-xl bg-white border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
          {step.icon}
        </div>

        {/* Text */}
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900 mb-2 leading-snug">
            {step.title}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            {step.description}
          </p>
        </div>

        {/* Detail badge */}
        <div className="mt-auto pt-3 border-t border-white/60">
          <span className="text-[10px] font-semibold text-indigo-600 tracking-[0.1em] uppercase">
            {step.detail}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ── Mobile Step ───────────────────────────────────────────────────────────────

const MobileStep = ({
  step,
  index,
  isLast,
  inView,
}: {
  step: typeof steps[number];
  index: number;
  isLast: boolean;
  inView: boolean;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -12 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.45, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    className="relative flex gap-4"
  >
    {/* Left: number badge + vertical line */}
    <div className="flex flex-col items-center shrink-0">
      <motion.div
        className="w-10 h-10 rounded-xl bg-indigo-600 text-white text-sm font-semibold flex items-center justify-center z-10 relative shadow-md shadow-indigo-600/25"
        animate={
          inView
            ? {
                boxShadow: [
                  "0 0 0px rgba(124,58,237,0)",
                  "0 0 20px 4px rgba(124,58,237,0.45)",
                  "0 4px 14px rgba(124,58,237,0.25)",
                ],
              }
            : {}
        }
        transition={{ delay: 0.5 + index * 0.45, duration: 0.6, ease: "easeOut" }}
      >
        {step.number}
      </motion.div>
      {!isLast && (
        <motion.div
          className="w-px flex-1 mt-2 origin-top"
          style={{ background: "linear-gradient(to bottom, #7c3aed, #c4b5fd)" }}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 + index * 0.2, ease: [0.16, 1, 0.3, 1] }}
        />
      )}
    </div>

    {/* Right: content */}
    <div className={`flex-1 ${!isLast ? "pb-8" : ""}`}>
      <span className="text-[9px] font-semibold tracking-[0.22em] uppercase text-indigo-500 mb-1 block">
        {step.label}
      </span>
      <h3 className="text-base font-semibold tracking-tight text-slate-900 mb-1.5 leading-snug">
        {step.title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-2">
        {step.description}
      </p>
      <span className="text-[10px] font-semibold text-indigo-500 tracking-[0.1em] uppercase">
        {step.detail}
      </span>
    </div>
  </motion.div>
);

// ── Section ───────────────────────────────────────────────────────────────────

export const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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
          className="mb-14 md:mb-20"
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-indigo-600 mb-4">
            Einfacher Ablauf
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 md:gap-16">
            <h2
              id="process-heading"
              className="font-semibold tracking-[-0.03em] text-slate-900 leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
            >
              In 3 Schritten zu Ihrem{" "}
              <span className="text-indigo-600">neuen System.</span>
            </h2>
            <p className="text-base text-slate-500 leading-relaxed max-w-xs md:text-right shrink-0">
              Keine Abstimmungs-Loops. Wir übernehmen die Komplexität. Sie kümmern sich um Ihr Geschäft.
            </p>
          </div>
        </motion.div>

        {/* ── DESKTOP: Cards + Connectors ── */}
        <div className="hidden lg:block">
          <div className="flex items-start gap-0">
            {steps.map((step, i) => (
              <div key={step.number} className="contents">
                <StepCard step={step} index={i} inView={inView} />
                {i < steps.length - 1 && (
                  <ConnectorLine delay={0.3 + i * 0.7} inView={inView} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: Vertical timeline ── */}
        <div className="lg:hidden flex flex-col">
          {steps.map((step, i) => (
            <MobileStep
              key={step.number}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
              inView={inView}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.4 }}
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
