"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck, Tag, Zap } from "lucide-react";

// ── Dashboard KPI data ──────────────────────────────────────────────────────

interface KpiCard {
  label: string;
  value: string;
  trend: string;
  color: string;
}

const kpiCards: KpiCard[] = [
  { label: "Website-Leads", value: "148", trend: "+12,4%", color: "#4F46E5" },
  { label: "Zeitersparnis KI", value: "38h", trend: "+23%", color: "#10B981" },
  { label: "Conversion Rate", value: "8,4%", trend: "+324%", color: "#F59E0B" },
  { label: "Launch-Bereitschaft", value: "72%", trend: "Aktiv", color: "#4F46E5" },
];

// ── Bar chart data points ───────────────────────────────────────────────────

const chartPoints = [35, 52, 41, 68, 74, 61, 88];
const chartLabels = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul"];

// ── Mini Dashboard Mockup (Server-renderable SVG/HTML, no state) ────────────

const DashboardMockup = () => (
  <div
    className="dashboard-mockup w-full max-w-[520px] mx-auto"
    style={{
      perspective: "1200px",
      transformStyle: "preserve-3d",
    }}
  >
    {/* Shell */}
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.99)",
        border: "1px solid rgba(15,23,43,0.08)",
        filter:
          "drop-shadow(0 4px 16px rgba(15,23,43,0.10)) drop-shadow(0 24px 64px rgba(79,70,229,0.15))",
      }}
    >
      {/* Header bar */}
      <div
        className="flex items-center gap-3 px-5 py-3 border-b"
        style={{ borderColor: "rgba(15,23,43,0.07)", background: "#F8FAFC" }}
      >
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <div
          className="flex-1 rounded-full py-1 px-3 text-xs text-slate-400"
          style={{ background: "rgba(15,23,43,0.04)", fontSize: "11px" }}
        >
          medientrupp.de/dashboard
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-2 h-2 rounded-full bg-green-500"
            style={{ boxShadow: "0 0 6px #10B981" }}
          />
          <span className="text-xs font-semibold text-green-600">
            LIVE
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 grid grid-cols-2 gap-3">
        {kpiCards.map((kpi, i) => (
          <div
            key={i}
            className="rounded-xl p-3"
            style={{
              background: "#fff",
              border: "1px solid rgba(15,23,43,0.07)",
              boxShadow: "0 2px 8px rgba(15,23,43,0.05)",
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <span
                className="text-xs font-bold uppercase tracking-wider"
                style={{ color: "#94A3B8", fontSize: "9px", letterSpacing: "0.1em" }}
              >
                {kpi.label}
              </span>
              <span
                className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                style={{
                  background: `${kpi.color}15`,
                  color: kpi.color,
                  fontSize: "9px",
                }}
              >
                {kpi.trend}
              </span>
            </div>
            <div
              className="text-2xl font-black tracking-tight"
              style={{ color: kpi.color, lineHeight: 1 }}
            >
              {kpi.value}
            </div>
          </div>
        ))}

        {/* Chart card — spans 2 columns */}
        <div
          className="col-span-2 rounded-xl p-3"
          style={{
            background: "#fff",
            border: "1px solid rgba(15,23,43,0.07)",
            boxShadow: "0 2px 8px rgba(15,23,43,0.05)",
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <span
              className="text-xs font-bold"
              style={{ color: "#0F172A", fontSize: "11px" }}
            >
              Website-Leads — last 7 months
            </span>
            <span
              className="text-xs font-bold px-1.5 py-0.5 rounded-full"
              style={{ background: "#EEF2FF", color: "#4F46E5", fontSize: "9px" }}
            >
              +28%
            </span>
          </div>
          {/* Bar chart */}
          <div className="flex items-end gap-1 h-14">
            {chartPoints.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div
                  className="w-full rounded-sm"
                  style={{
                    height: `${h}%`,
                    background:
                      i === chartPoints.length - 1
                        ? "#4F46E5"
                        : "rgba(79,70,229,0.2)",
                    transition: "height 0.3s ease",
                  }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            {chartLabels.map((l) => (
              <span
                key={l}
                className="flex-1 text-center"
                style={{ color: "#94A3B8", fontSize: "8px" }}
              >
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
  { icon: <ShieldCheck size={16} className="text-indigo-600" />, text: "Deutsche Qualität" },
  { icon: <Tag size={16} className="text-indigo-600" />, text: "Festpreise" },
  { icon: <Zap size={16} className="text-indigo-600" />, text: "Schnelle Umsetzung" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export const HeroSection = () => {
  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle indigo radial glow — top-right */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 80% 20%, rgba(79,70,229,0.07) 0%, transparent 65%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT — Copy */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-indigo-100 bg-indigo-50">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
              <span className="text-xs font-semibold text-indigo-700 tracking-wide uppercase">
                Digitalagentur · Made in Germany
              </span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-slate-900 leading-[1.1] tracking-tight mb-6">
              Digitale{" "}
              <span
                className="relative inline-block"
                style={{ color: "#4F46E5" }}
              >
                Systeme
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  height="4"
                  viewBox="0 0 200 4"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 2 Q100 0 198 2"
                    stroke="#4F46E5"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                </svg>
              </span>
              ,<br />
              die Kunden bringen.
            </h1>

            {/* Sub-copy */}
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-[480px]">
              MedienTrupp baut digitale Lösungen für den deutschen Mittelstand.
              Transparente Festpreise, keine Überraschungen — und Ihre
              Website läuft in Wochen, nicht Monaten.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href="#konfigurator"
                id="hero-cta-primary"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
              >
                Projekt anfragen
                <ArrowRight size={18} />
              </a>
              <a
                href="#leistungen"
                id="hero-cta-secondary"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
              >
                <Play size={16} className="text-indigo-600" />
                Demo ansehen
              </a>
            </div>

            {/* Trust micro-badges */}
            <div className="flex flex-wrap items-center gap-4">
              {trustBadges.map((b, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  {b.icon}
                  <span className="text-sm text-slate-500 font-medium">{b.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — Floating Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex justify-center items-center"
            style={{ perspective: "1200px" }}
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
