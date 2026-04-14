"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Tag, Zap } from "lucide-react";
import Link from "next/link";

// ── Editorial data ──────────────────────────────────────────────────────────

const kpiRows = [
  { label: "Website-Leads · Dieses Quartal", value: "148",  delta: "+12,4 %", color: "#4F46E5" },
  { label: "Zeitersparnis durch KI",          value: "38h",  delta: "+23,0 %", color: "#10B981" },
  { label: "Ø Conversion Rate",               value: "8,4 %", delta: "+3,1 Pkt", color: "#F59E0B" },
];

const chartPoints = [35, 52, 41, 68, 74, 61, 88];
const chartLabels  = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul"];

// ── Editorial Data Panel ────────────────────────────────────────────────────
// Kein schwebendes SaaS-Interface. Flach, wie gedruckt.

const EditorialDataPanel = () => (
  <div className="w-full max-w-[460px]">
    {/* Outer frame — slight offset-shadow like offset printing */}
    <div
      className="border border-slate-200 bg-white"
      style={{ boxShadow: "4px 4px 0 #e2e8f0" }}
    >
      {/* Panel header row */}
      <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200">
        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">
          Medientrupp · Live Dashboard
        </p>
        <span className="flex items-center gap-1.5">
          <span className="pulse-ring">
            <span className="w-1.5 h-1.5 bg-green-500 block" />
          </span>
          <span className="text-[9px] font-black text-green-600 uppercase tracking-[0.15em]">Live</span>
        </span>
      </div>

      {/* KPI rows — each a clean data row like a table */}
      {kpiRows.map((kpi, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.12, ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
          className="flex items-center justify-between px-5 py-4 border-b border-slate-100"
        >
          <div>
            <p className="text-[9px] text-slate-400 uppercase tracking-[0.12em] font-bold mb-1">
              {kpi.label}
            </p>
            <p
              className="font-black tracking-tight leading-none"
              style={{ fontSize: "clamp(1.6rem, 3vw, 2rem)", color: kpi.color }}
            >
              {kpi.value}
            </p>
          </div>
          <span
            className="text-[11px] font-black border px-2 py-1"
            style={{ color: kpi.color, borderColor: `${kpi.color}25`, background: `${kpi.color}08` }}
          >
            {kpi.delta}
          </span>
        </motion.div>
      ))}

      {/* Chart row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.85 }}
        className="px-5 py-5"
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.12em]">
            Lead-Wachstum — Letzte 7 Monate
          </p>
          <span className="text-[9px] font-black text-indigo-600 border border-indigo-100 bg-indigo-50 px-1.5 py-0.5">
            +28 %
          </span>
        </div>
        <div className="flex items-end gap-1.5 h-[52px]">
          {chartPoints.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1"
              style={{ background: i === chartPoints.length - 1 ? "#4F46E5" : "#EEF2FF" }}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.85 + i * 0.06, duration: 0.35, ease: "easeOut" }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          {chartLabels.map((l) => (
            <span key={l} className="flex-1 text-center text-[8px] text-slate-300 font-medium">
              {l}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  </div>
);

// ── Trust Badges ────────────────────────────────────────────────────────────

const trustBadges = [
  { icon: <ShieldCheck size={13} />, text: "100% Made in Germany" },
  { icon: <Tag        size={13} />, text: "Festpreis ab 1.500 €" },
  { icon: <Zap        size={13} />, text: "Go-Live in 3–6 Wochen" },
];

// ── Section ─────────────────────────────────────────────────────────────────

export const HeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden">

      {/* Dot-grid — sehr subtil */}
      <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-[0.3] pointer-events-none" />

      {/* Grid: Text | Divider | Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] pt-20 lg:pt-0"
          style={{ minHeight: "100svh" }}
        >

          {/* ── LEFT: Typography column ── */}
          <div className="flex flex-col justify-center py-20 lg:py-0 lg:pr-16 xl:pr-24">

            {/* Eyebrow */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-10"
            >
              Digitalagentur · Made in Germany
            </motion.p>

            {/* Headline — jede Zeile einzeln animiert wie bei united-media */}
            <h1
              className="font-black tracking-[-0.03em] text-slate-900 mb-8"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5.25rem)", lineHeight: 0.92 }}
            >
              {["Mehr Kunden.", "Mehr Umsatz.", "Vollautomatisch."].map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.12, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className={`block ${i === 2 ? "text-indigo-600" : ""}`}
                >
                  {line}
                </motion.span>
              ))}
            </h1>

            {/* Sub-copy */}
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-base lg:text-lg text-slate-500 leading-relaxed mb-10 max-w-md"
            >
              MedienTrupp baut digitale Systeme für den deutschen Mittelstand.
              Website, KI, Video — aus einer Hand. Transparente Festpreise,
              kein Agentur-Chaos.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3 mb-12"
            >
              <Link
                href="/projekt-anfragen"
                id="hero-cta-primary"
                className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold"
              >
                Projekt anfragen
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
              <Link
                href="/leistungen"
                id="hero-cta-secondary"
                className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:text-slate-900 transition-colors duration-200"
              >
                Leistungen ansehen
                <ArrowRight size={16} className="text-slate-400" aria-hidden="true" />
              </Link>
            </motion.div>

            {/* Trust strip — border-top wie in einem Jahresbericht */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="border-t border-slate-200 pt-8 flex flex-wrap items-center gap-6"
            >
              {trustBadges.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-500">
                  {b.icon}
                  <span className="text-xs font-medium">{b.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── CENTER: Vertikale Trennlinie (Desktop) ── */}
          <div className="hidden lg:block self-stretch bg-slate-200" />

          {/* ── RIGHT: Editorial Data Panel (Desktop) ── */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col justify-center pl-16 xl:pl-24"
          >
            {/* Panel label above */}
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-6">
              Echtzeit-Metriken · Beispiel-Dashboard
            </p>
            <EditorialDataPanel />
          </motion.div>

        </div>
      </div>

      {/* Untere Trennlinie — sauber wie gedruckt */}
      <div className="border-t border-slate-200" />
    </section>
  );
};
