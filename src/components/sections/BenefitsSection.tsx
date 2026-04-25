"use client";

import { motion, useInView } from "framer-motion";
import { Euro, Shield, User, Code2, Handshake, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ── Animated Counter ──────────────────────────────────────────────────────────

const useCounter = (end: number, duration: number, started: boolean) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, started]);
  return count;
};

// ── KPI Strip ─────────────────────────────────────────────────────────────────

const kpis = [
  { value: 3, suffix: "×", label: "mehr Anfragen im Schnitt", prefix: "" },
  { value: 14, suffix: " Tage", label: "bis zum ersten Go-Live", prefix: "Ø" },
  { value: 100, suffix: "%", label: "Festpreis-Garantie", prefix: "" },
];

const KpiStrip = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const c0 = useCounter(kpis[0].value, 1400, inView);
  const c1 = useCounter(kpis[1].value, 1200, inView);
  const c2 = useCounter(kpis[2].value, 1600, inView);
  const counts = [c0, c1, c2];

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
      {kpis.map((kpi, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center px-6 py-8 text-center"
        >
          <span
            className="mb-1.5 font-semibold leading-none tracking-tight text-indigo-600"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)" }}
          >
            {kpi.prefix}{counts[i]}{kpi.suffix}
          </span>
          <span className="text-sm font-medium text-slate-500">{kpi.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

// ── Trust Grid ────────────────────────────────────────────────────────────────

const trustItems = [
  {
    icon: <Euro size={24} strokeWidth={1.5} />,
    title: "Festpreis-Garantie",
    body: "Ihr Preis steht schriftlich fest, bevor wir starten. Keine Überraschungen, keine Nachverhandlung.",
  },
  {
    icon: <Shield size={24} strokeWidth={1.5} />,
    title: "DSGVO-Hosting in Deutschland",
    body: "Server stehen ausschließlich in Deutschland. Keine US-Cloud, keine rechtliche Grauzone.",
  },
  {
    icon: <User size={24} strokeWidth={1.5} />,
    title: "Ein fester Ansprechpartner",
    body: "Vom ersten Gespräch bis zum Go-Live sprechen Sie immer mit derselben Person.",
  },
  {
    icon: <Code2 size={24} strokeWidth={1.5} />,
    title: "Kein Outsourcing",
    body: "Konzeption, Design und Code entstehen im eigenen Team. Keine Weitergabe an Dritte.",
  },
  {
    icon: <Handshake size={24} strokeWidth={1.5} />,
    title: "Kein Abo-Lock-in",
    body: "Nach dem Launch bleiben wir gerne an Bord. Kein Zwang, keine Mindestlaufzeit.",
  },
  {
    icon: <Lock size={24} strokeWidth={1.5} />,
    title: "Permanente Überwachung",
    body: "Ihre Systeme werden rund um die Uhr überwacht. Security-Updates automatisch eingespielt.",
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

export const BenefitsSection = () => {
  return (
    <section
      className="bg-white border-t border-slate-200 overflow-hidden"
      aria-labelledby="benefits-heading"
    >
      {/* KPI Counter Strip */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20">
        <KpiStrip />
      </div>

      {/* Trust Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="pt-12 pb-12 md:pt-16 md:pb-16 text-center"
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-indigo-600 mb-4">
            Warum Medientrupp
          </p>
          <h2
            id="benefits-heading"
            className="font-semibold tracking-[-0.03em] text-slate-900"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)", lineHeight: 0.95 }}
          >
            Smarte Systeme.{" "}
            <span className="text-indigo-600">Maximale Verlässlichkeit.</span>
          </h2>
        </motion.div>

        {/* 6-icon grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-200 border border-slate-200 rounded-2xl overflow-hidden mb-16 md:mb-20">
          {trustItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white px-8 py-8 md:py-10 flex flex-col gap-4"
            >
              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                {item.icon}
              </div>
              {/* Text */}
              <div>
                <h3 className="font-semibold text-slate-900 text-base leading-snug mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
