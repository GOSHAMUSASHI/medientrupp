"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, MessageSquare, Code2, Rocket } from "lucide-react";
import Link from "next/link";
import { AnimatedBeam } from "@/components/ui/animated-beam";

// ── Data ──────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    label: "Briefing",
    title: "Kick-off & Strategie",
    description:
      "30 Minuten. Wir klären Ziel, Umfang und Termin — den Rest übernehmen wir vollständig.",
    Icon: MessageSquare,
    iconBg: "bg-indigo-600",
    ringColor: "ring-indigo-200",
    detail: "Kein Zutun Ihrerseits danach nötig",
    iconAnim: { y: [0, -8, 0] },
    iconDuration: 2.8,
  },
  {
    number: "02",
    label: "Umsetzung",
    title: "Entwicklung im Hintergrund",
    description:
      "Ihr Team arbeitet weiter. Wir liefern getaktete Zwischenstände zur Freigabe.",
    Icon: Code2,
    iconBg: "bg-violet-600",
    ringColor: "ring-violet-200",
    detail: "Volle Transparenz, wöchentliche Updates",
    iconAnim: { scale: [1, 1.1, 1] },
    iconDuration: 2.4,
  },
  {
    number: "03",
    label: "Go-Live",
    title: "Launch & Ergebnisse",
    description:
      "Getestet, dokumentiert, live. Messbare Ergebnisse ab Tag 1 — zum Festpreis.",
    Icon: Rocket,
    iconBg: "bg-purple-600",
    ringColor: "ring-purple-200",
    detail: "Festpreis-Garantie inklusive",
    iconAnim: { y: [0, -6, 0], x: [0, 4, 0] },
    iconDuration: 2.2,
  },
];

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
    className="relative flex gap-5"
  >
    <div className="flex flex-col items-center shrink-0">
      <motion.div
        className={`w-14 h-14 rounded-2xl ${step.iconBg} ring-4 ${step.ringColor} flex items-center justify-center text-white shadow-lg z-10 relative`}
        animate={inView ? step.iconAnim : {}}
        transition={{
          delay: index * 0.3 + 1.0,
          duration: step.iconDuration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      >
        <step.Icon size={24} strokeWidth={1.5} />
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
    <div className={`flex-1 ${!isLast ? "pb-10" : ""}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl font-semibold text-indigo-600 tabular-nums leading-none">
          {step.number}
        </span>
        <span className="text-[9px] font-semibold tracking-[0.22em] uppercase text-slate-400">
          {step.label}
        </span>
      </div>
      <h3 className="text-base font-semibold tracking-tight text-slate-900 mb-2 leading-snug">
        {step.title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-3">{step.description}</p>
      <span className="text-[10px] font-semibold text-indigo-500 tracking-[0.1em] uppercase">
        {step.detail}
      </span>
    </div>
  </motion.div>
);

// ── Section ───────────────────────────────────────────────────────────────────

export const ProcessSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const icon1Ref = useRef<HTMLDivElement>(null);
  const icon2Ref = useRef<HTMLDivElement>(null);
  const icon3Ref = useRef<HTMLDivElement>(null);
  const iconRefs = [icon1Ref, icon2Ref, icon3Ref];

  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="bg-white border-t border-slate-200 section-y overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 md:mb-24"
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

        {/* ── DESKTOP ── */}
        <div className="hidden lg:block">
          {/* Beam container — position:relative so AnimatedBeam SVG overlays correctly */}
          <div ref={containerRef} className="relative grid grid-cols-3 gap-10 xl:gap-16">

            {/* AnimatedBeam: step 1 → step 2 */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={icon1Ref}
              toRef={icon2Ref}
              curvature={-40}
              gradientStartColor="#6366f1"
              gradientStopColor="#7c3aed"
              pathColor="#e2e8f0"
              pathWidth={2}
              pathOpacity={1}
              duration={4}
              delay={0.8}
            />

            {/* AnimatedBeam: step 2 → step 3 */}
            <AnimatedBeam
              containerRef={containerRef}
              fromRef={icon2Ref}
              toRef={icon3Ref}
              curvature={-40}
              gradientStartColor="#7c3aed"
              gradientStopColor="#9333ea"
              pathColor="#e2e8f0"
              pathWidth={2}
              pathOpacity={1}
              duration={4}
              delay={1.4}
            />

            {/* Step Cards */}
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center text-center"
              >
                {/* Step number + label */}
                <div className="flex items-center gap-2 mb-8">
                  <span
                    className="font-semibold text-slate-200 tabular-nums leading-none select-none"
                    style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)" }}
                  >
                    {step.number}
                  </span>
                  <span className="text-[9px] font-semibold tracking-[0.25em] uppercase text-slate-400 mt-1 text-left">
                    {step.label}
                  </span>
                </div>

                {/* Icon node — the AnimatedBeam anchor */}
                <motion.div
                  ref={iconRefs[i]}
                  className={`w-20 h-20 rounded-2xl ${step.iconBg} ring-8 ${step.ringColor} flex items-center justify-center text-white shadow-xl mb-8`}
                  animate={inView ? step.iconAnim : {}}
                  transition={{
                    delay: i * 0.3 + 1.2,
                    duration: step.iconDuration,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                >
                  <step.Icon size={36} strokeWidth={1.5} />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold tracking-tight text-slate-900 mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-6 max-w-xs">
                  {step.description}
                </p>

                {/* Detail pill */}
                <span className="inline-block text-[10px] font-semibold tracking-[0.12em] uppercase text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1.5 rounded-md">
                  {step.detail}
                </span>
              </motion.div>
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
          className="mt-16 md:mt-24 flex items-center gap-6"
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
