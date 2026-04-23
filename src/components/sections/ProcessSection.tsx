"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

const steps = [
  {
    number: "01",
    label: "Briefing",
    title: "Kick-off & Strategie",
    description:
      "30 Minuten. Wir klären Ziel, Umfang und Termin — und übernehmen alles weitere.",
  },
  {
    number: "02",
    label: "Umsetzung",
    title: "Entwicklung im Hintergrund",
    description:
      "Ihr Team arbeitet weiter. Wir liefern Zwischenstände — kein Zutun Ihrerseits nötig.",
  },
  {
    number: "03",
    label: "Go-Live",
    title: "Launch & Ergebnisse",
    description:
      "Getestet, dokumentiert, live. Messbare Ergebnisse ab Tag 1 garantiert.",
  },
];

// ── Connector: Linie zeichnet sich + leuchtender Dot rast entlang ─────────────

const Connector = ({ delay }: { delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div
      ref={ref}
      className="flex-1 relative mx-5 mt-[0.55rem]"
      style={{ height: "1px" }}
    >
      {/* Die Linie zeichnet sich von links nach rechts */}
      <motion.div
        className="absolute inset-0 origin-left"
        style={{
          background:
            "linear-gradient(to right, #a5b4fc, #818cf8, #a5b4fc)",
        }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Leuchtender Dot rast der Linie hinterher */}
      <motion.div
        className="absolute top-0 rounded-full"
        style={{
          width: 10,
          height: 10,
          marginTop: -4.5,
          marginLeft: -5,
          background: "#6366f1",
          boxShadow:
            "0 0 0 3px rgba(99,102,241,0.25), 0 0 14px 4px rgba(99,102,241,0.45)",
        }}
        initial={{ left: "0%", opacity: 0 }}
        animate={
          inView
            ? { left: ["0%", "100%"], opacity: [0, 1, 1, 0] }
            : {}
        }
        transition={{
          delay: delay + 0.55,
          duration: 0.5,
          ease: [0.4, 0, 0.6, 1],
        }}
      />
    </div>
  );
};

// ── Step number: erscheint + kurzer Glow-Pulse wenn Dot ankommt ──────────────

const StepNumber = ({
  number,
  label,
  index,
}: {
  number: string;
  label: string;
  index: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Dot kommt am nächsten Step an nach: delay_connector + 0.55 + 0.5 ≈ (index * 0.18) + 1.0
  const pulseDelay = index === 0 ? 0.1 : index * 0.85 + 0.2;

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-start gap-1 shrink-0"
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Große Nummer mit kurzen Glow-Pulse */}
      <motion.span
        className="font-black text-indigo-600 leading-none select-none"
        style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)" }}
        animate={
          inView
            ? {
                textShadow: [
                  "0 0 0px rgba(99,102,241,0)",
                  "0 0 24px rgba(99,102,241,0.7)",
                  "0 0 0px rgba(99,102,241,0)",
                ],
              }
            : {}
        }
        transition={{
          delay: pulseDelay,
          duration: 0.55,
          ease: "easeOut",
        }}
      >
        {number}
      </motion.span>
      <span className="text-[9px] font-black tracking-[0.22em] uppercase text-slate-400">
        {label}
      </span>
    </motion.div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

export const ProcessSection = () => {
  const mobileRef = useRef(null);
  const mobileInView = useInView(mobileRef, { once: true, margin: "-40px" });

  return (
    <section
      className="bg-white border-t border-slate-200 section-y overflow-hidden"
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 md:mb-20"
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
              Keine Abstimmungs-Loops. Wir übernehmen die Komplexität — Sie kümmern sich um Ihr Geschäft.
            </p>
          </div>
        </motion.div>

        {/* ── DESKTOP: Nummern + Connectors + Content ── */}
        <div className="hidden lg:block">

          {/* Reihe 1: Nummern + animierte Connectors */}
          <div className="flex items-start mb-10">
            {steps.map((step, i) => (
              <div key={step.number} className="contents">
                <StepNumber
                  number={step.number}
                  label={step.label}
                  index={i}
                />
                {i < steps.length - 1 && (
                  <Connector delay={0.18 + i * 0.72} />
                )}
              </div>
            ))}
          </div>

          {/* Reihe 2: Inhalte */}
          <div className="grid grid-cols-3 gap-8 border-t border-slate-100 pt-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.25 + i * 0.14,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── MOBILE: Vertikale Timeline mit wanderndem Dot ── */}
        <div ref={mobileRef} className="lg:hidden relative">

          {/* Vertikale Linie zeichnet sich */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[19px] top-3 bottom-3 w-px origin-top"
            style={{
              background:
                "linear-gradient(to bottom, #818cf8, #c7d2fe, #e0e7ff)",
            }}
            initial={{ scaleY: 0 }}
            animate={mobileInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Leuchtender Dot fährt die Vertikale runter */}
          <motion.div
            aria-hidden="true"
            className="absolute left-[19px] rounded-full"
            style={{
              width: 10,
              height: 10,
              marginLeft: -4.5,
              background: "#6366f1",
              boxShadow:
                "0 0 0 3px rgba(99,102,241,0.2), 0 0 12px 4px rgba(99,102,241,0.4)",
            }}
            initial={{ top: "0%", opacity: 0 }}
            animate={
              mobileInView ? { top: "100%", opacity: [0, 1, 1, 0] } : {}
            }
            transition={{
              delay: 1.0,
              duration: 1.4,
              ease: [0.4, 0, 0.2, 1],
            }}
          />

          {/* Steps */}
          <div className="flex flex-col gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={mobileInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: 0.2 + i * 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-start gap-5"
              >
                {/* Nummern-Badge */}
                <motion.div
                  className="flex-shrink-0 w-10 h-10 bg-indigo-600 text-white text-sm font-black flex items-center justify-center z-10 relative"
                  animate={
                    mobileInView
                      ? {
                          boxShadow: [
                            "0 0 0px rgba(99,102,241,0)",
                            "0 0 16px 4px rgba(99,102,241,0.5)",
                            "0 4px 12px rgba(99,102,241,0.2)",
                          ],
                        }
                      : {}
                  }
                  transition={{
                    delay: 1.0 + i * 0.45,
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                >
                  {step.number}
                </motion.div>

                {/* Inhalt */}
                <div className="flex-1 pt-1.5">
                  <span className="text-[9px] font-black tracking-[0.22em] uppercase text-indigo-500 mb-1 block">
                    {step.label}
                  </span>
                  <h3 className="text-base font-bold tracking-tight text-slate-900 mb-1.5 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-10 md:mt-16 flex items-center gap-6"
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
