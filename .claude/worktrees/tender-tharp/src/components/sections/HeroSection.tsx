"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Tag, Zap } from "lucide-react";
import Link from "next/link";

// ── Dashboard KPI data ──────────────────────────────────────────────────────

interface KpiCard {
  label: string;
  value: string;
  trend: string;
  color: string;
  glowColor: string;
}

const kpiCards: KpiCard[] = [
  { label: "Website-Leads", value: "148", trend: "+12,4%", color: "#4F46E5", glowColor: "rgba(79,70,229,0.12)" },
  { label: "Zeitersparnis KI", value: "38h", trend: "+23%", color: "#10B981", glowColor: "rgba(16,185,129,0.12)" },
  { label: "Conversion Rate", value: "8,4%", trend: "+3,1 Pkt", color: "#F59E0B", glowColor: "rgba(245,158,11,0.12)" },
  { label: "Launch-Bereit", value: "72%", trend: "Aktiv", color: "#4F46E5", glowColor: "rgba(79,70,229,0.12)" },
];

// ── Bar chart data points ───────────────────────────────────────────────────

const chartPoints = [35, 52, 41, 68, 74, 61, 88];
const chartLabels = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul"];

// ── Mini Dashboard Mockup ───────────────────────────────────────────────────

const DashboardMockup = () => (
  <div
    className="dashboard-mockup w-full max-w-[520px] mx-auto"
    style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
  >
    {/* Shell */}
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl shadow-indigo-500/25 ring-1 ring-indigo-200/50 overflow-hidden">
      {/* Header bar */}
      <div className="flex items-center gap-3 px-5 py-3 border-b border-slate-900/[0.06] bg-slate-50/80">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 rounded-md py-1 px-3 bg-black/[0.04] text-xs text-slate-400" style={{ fontSize: "11px" }}>
          medientrupp.de/dashboard
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" style={{ boxShadow: "0 0 6px #10B981" }} />
          <span className="text-xs font-semibold text-emerald-600">LIVE</span>
        </div>
      </div>

      {/* KPI grid */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {kpiCards.map((kpi, i) => (
          <div
            key={i}
            className="rounded-lg p-3 border border-white/60 backdrop-blur-sm"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, ${kpi.glowColor} 100%)`,
              boxShadow: `0 2px 12px ${kpi.glowColor}, 0 1px 3px rgba(15,23,43,0.06)`,
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <span
                className="font-bold uppercase tracking-wider text-slate-400"
                style={{ fontSize: "9px", letterSpacing: "0.1em" }}
              >
                {kpi.label}
              </span>
              <span
                className="font-bold px-1.5 py-0.5 rounded-md"
                style={{ background: `${kpi.color}18`, color: kpi.color, fontSize: "9px" }}
              >
                {kpi.trend}
              </span>
            </div>
            <div className="text-2xl font-black tracking-tight" style={{ color: kpi.color, lineHeight: 1 }}>
              {kpi.value}
            </div>
          </div>
        ))}

        {/* Chart card — spans 2 columns */}
        <div
          className="col-span-2 rounded-lg p-3 border border-white/60 backdrop-blur-sm"
          style={{
            background: "rgba(255,255,255,0.9)",
            boxShadow: "0 2px 12px rgba(79,70,229,0.06), 0 1px 3px rgba(15,23,43,0.06)",
          }}
        >
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-700" style={{ fontSize: "11px" }}>
              Website-Leads — letzte 7 Monate
            </span>
            <span
              className="font-bold px-1.5 py-0.5 rounded-md"
              style={{ background: "#EEF2FF", color: "#4F46E5", fontSize: "9px" }}
            >
              +28%
            </span>
          </div>

          {/* Bar chart with gradient fills + grid lines */}
          <div className="relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none" style={{ paddingBottom: "4px" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="w-full border-t border-slate-100" />
              ))}
            </div>
            <div className="flex items-end gap-1 h-14 relative z-10">
              {chartPoints.map((h, i) => {
                const isLatest = i === chartPoints.length - 1;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-sm"
                      style={{
                        height: `${h}%`,
                        background: isLatest
                          ? "linear-gradient(to top, #4F46E5, #7C3AED)"
                          : "linear-gradient(to top, rgba(79,70,229,0.25), rgba(124,58,237,0.15))",
                        transition: "height 0.3s ease",
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex justify-between mt-1.5">
            {chartLabels.map((l) => (
              <span key={l} className="flex-1 text-center text-slate-400" style={{ fontSize: "8px" }}>
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ── Trust Badges ─────────────────────────────────────────────────────────────

const trustBadges = [
  { icon: <ShieldCheck size={14} className="text-indigo-500" />, text: "100% Made in Germany" },
  { icon: <Tag size={14} className="text-indigo-500" />, text: "Festpreis ab €1.500" },
  { icon: <Zap size={14} className="text-indigo-500" />, text: "Go-Live in 3–6 Wochen" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export const HeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background glows */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 -right-10 w-[600px] h-[600px] bg-indigo-500/15 blur-[120px] rounded-full pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute -top-20 -left-40 w-[500px] h-[500px] bg-violet-500/8 blur-[140px] rounded-full pointer-events-none -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pt-36 lg:pt-40 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-indigo-100 bg-indigo-50/80 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-semibold text-indigo-700 tracking-wide uppercase">
                Digitalagentur · Made in Germany
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 leading-[1.05] mb-6">
              Mehr Kunden.{" "}
              <span className="relative inline-block" style={{ color: "#4F46E5" }}>
                Mehr Umsatz.
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="4"
                  viewBox="0 0 200 4"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2 Q100 0 198 2"
                    stroke="url(#underlineGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                  <defs>
                    <linearGradient id="underlineGrad" x1="0" y1="0" x2="200" y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#4F46E5" />
                      <stop offset="100%" stopColor="#7C3AED" />
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <br />Vollautomatisch.
            </h1>

            {/* Sub-copy */}
            <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-8 max-w-[480px]">
              MedienTrupp baut digitale Systeme für den deutschen Mittelstand.
              Website, KI, Video — aus einer Hand. Transparente Festpreise,
              kein Agentur-Chaos.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <Link
                href="/projekt-anfragen"
                id="hero-cta-primary"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-200 shadow-md shadow-indigo-600/25 hover:shadow-lg hover:shadow-indigo-600/30 hover:-translate-y-0.5"
              >
                Projekt anfragen
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/leistungen"
                id="hero-cta-secondary"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200"
              >
                Leistungen ansehen
                <ArrowRight size={16} className="text-slate-400" />
              </Link>
            </div>

            {/* Trust micro-badges */}
            <div className="flex flex-wrap items-center gap-3">
              {trustBadges.map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 shadow-sm"
                >
                  {b.icon}
                  <span className="text-xs text-slate-600 font-medium">{b.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Floating Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center items-center w-full"
            style={{ perspective: "1200px" }}
          >
            <div className="w-full flex justify-center">
              <DashboardMockup />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
