"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Tag, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";

// ── Dashboard Data ──────────────────────────────────────────────────────────

const kpis = [
  { label: "Leads / Monat", value: "148",   delta: "+12,4 %", positive: true },
  { label: "Ø Conversion",  value: "8,4 %", delta: "+3,1 Pkt", positive: true },
  { label: "KI-Zeitersparnis", value: "38h", delta: "+23,0 %", positive: true },
];

// Area chart data points (normalized 0-100)
const chartData = [35, 42, 38, 55, 62, 58, 70, 78, 72, 85, 92, 88];
const chartMonths = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

// ── Star icon (indigo brand color) ──────────────────────────────────────────

const StarIcon = () => (
  <svg className="w-4 h-4 fill-indigo-600" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// ── Modern floating dashboard — 16:9 aspect, shadow, rounded-lg ─────────────

const ModernDashboard = () => {
  // Build SVG path for smooth area chart
  const width = 400;
  const height = 120;
  const pts = chartData.map((v, i) => ({
    x: (i / (chartData.length - 1)) * width,
    y: height - (v / 100) * height,
  }));

  // Smooth curve using cubic bezier
  const smoothPath = pts.reduce((path, p, i, arr) => {
    if (i === 0) return `M ${p.x},${p.y}`;
    const prev = arr[i - 1];
    const cpX = (prev.x + p.x) / 2;
    return `${path} C ${cpX},${prev.y} ${cpX},${p.y} ${p.x},${p.y}`;
  }, "");

  const areaPath = `${smoothPath} L ${width},${height} L 0,${height} Z`;

  return (
    <div className="w-full max-w-[720px]" style={{ perspective: "1600px" }}>
      {/* Outer floating card — modern shadow, rounded-lg, subtle 3D tilt + float */}
      <motion.div
        className="bg-white rounded-lg border border-slate-200/80 overflow-hidden"
        initial={{ rotateY: -6, rotateX: 3, y: 0 }}
        animate={{
          rotateY: -6,
          rotateX: 3,
          y: [0, -10, 0],
        }}
        transition={{
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          boxShadow:
            "0 40px 80px -20px rgba(15, 23, 42, 0.25), 0 20px 40px -12px rgba(79, 70, 229, 0.12), 0 8px 20px -8px rgba(15, 23, 42, 0.10)",
          aspectRatio: "16 / 9",
          transformStyle: "preserve-3d",
          transformOrigin: "center center",
        }}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
              <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
            </div>
            <span className="text-[11px] font-semibold text-slate-400 tracking-wide">
              medientrupp.de / analytics
            </span>
          </div>
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Live</span>
          </span>
        </div>

        {/* Body: chart left, KPIs right */}
        <div className="grid grid-cols-[1.6fr_1fr] h-[calc(100%-45px)]">

          {/* Chart area */}
          <div className="p-5 flex flex-col border-r border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Lead-Wachstum · 12 Monate
                </p>
                <p className="text-2xl font-bold text-slate-900 tracking-tight mt-0.5 leading-none">
                  +284 %
                </p>
              </div>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-1 rounded-md">
                <TrendingUp size={11} />
                Trend
              </span>
            </div>

            {/* SVG area chart */}
            <div className="flex-1 relative">
              <svg
                viewBox={`0 0 ${width} ${height}`}
                preserveAspectRatio="none"
                className="w-full h-full"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* Horizontal grid lines */}
                {[0.25, 0.5, 0.75].map((t) => (
                  <line
                    key={t}
                    x1="0"
                    x2={width}
                    y1={height * t}
                    y2={height * t}
                    stroke="#f1f5f9"
                    strokeWidth="1"
                  />
                ))}
                {/* Area fill */}
                <motion.path
                  d={areaPath}
                  fill="url(#areaFill)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />
                {/* Line */}
                <motion.path
                  d={smoothPath}
                  fill="none"
                  stroke="#7c3aed"
                  strokeWidth="2"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 1.2, ease: "easeOut" }}
                />
                {/* End dot */}
                <motion.circle
                  cx={pts[pts.length - 1].x}
                  cy={pts[pts.length - 1].y}
                  r="3.5"
                  fill="#7c3aed"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.3 }}
                />
                <motion.circle
                  cx={pts[pts.length - 1].x}
                  cy={pts[pts.length - 1].y}
                  r="7"
                  fill="#7c3aed"
                  fillOpacity="0.2"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.3 }}
                />
              </svg>
            </div>

            {/* Month labels */}
            <div className="flex justify-between mt-2">
              {[chartMonths[0], chartMonths[3], chartMonths[6], chartMonths[9], chartMonths[11]].map((m) => (
                <span key={m} className="text-[9px] text-slate-400 font-medium">{m}</span>
              ))}
            </div>
          </div>

          {/* KPI column */}
          <div className="flex flex-col divide-y divide-slate-100">
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 px-4 py-3 flex flex-col justify-center"
              >
                <p className="text-[9px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  {kpi.label}
                </p>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xl font-bold text-slate-900 tracking-tight leading-none">
                    {kpi.value}
                  </span>
                  <span className="text-[10px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                    {kpi.delta}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// ── Trust Badges ────────────────────────────────────────────────────────────

const trustBadges = [
  { icon: <ShieldCheck size={13} />, text: "100% Made in Germany" },
  { icon: <Tag         size={13} />, text: "Festpreis ab 1.500 €" },
  { icon: <Zap         size={13} />, text: "Go-Live in 3–6 Wochen" },
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
          className="grid grid-cols-1 lg:grid-cols-[0.9fr_1px_1.1fr] pt-20 sm:pt-24 lg:pt-20"
          style={{ minHeight: "88svh" }}
        >

          {/* ── LEFT: Typography column ── */}
          <div className="flex flex-col justify-center pt-3 pb-6 sm:py-8 lg:py-12 lg:pr-10 xl:pr-14">

            {/* Google-Sterne Eyebrow — premium Badge-Design mit Indigo-Branding */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="inline-flex items-center gap-3 mb-5 md:mb-9 self-start"
              aria-label="Google Bewertung: 5 von 5 Sternen"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
              </div>
              <span className="w-px h-4 bg-slate-300" aria-hidden="true" />
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-bold text-slate-900 leading-none">5,0</span>
                <span className="text-sm text-slate-500 leading-none">auf Google</span>
              </div>
            </motion.div>

            {/* Headline — schlanker: font-bold statt font-black */}
            <h1
              className="font-bold tracking-[-0.03em] text-slate-900 mb-5 md:mb-10"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5.25rem)", lineHeight: 0.95 }}
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
              className="text-base lg:text-lg text-slate-500 leading-relaxed mb-6 md:mb-12 max-w-md"
            >
              Medientrupp baut digitale Systeme für den deutschen Mittelstand. Von Website über KI bis Video. Alles aus einer Hand.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap gap-3 mb-6 md:mb-14"
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

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="border-t border-slate-200 pt-5 md:pt-8 flex flex-wrap items-center gap-6"
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

          {/* ── RIGHT: Modern floating Dashboard (Desktop) ── */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col justify-center pl-10 xl:pl-14"
          >
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-6">
              Echtzeit-Metriken · Beispiel-Dashboard
            </p>
            <ModernDashboard />

            {/* Floating notification cards */}
            <div className="mt-5 flex flex-col gap-2.5">
              {[
                { icon: "✓", label: "Neue Anfrage", sub: "Schmidt GmbH — vor 2 Min.", color: "text-emerald-600", bg: "bg-emerald-50 border-emerald-100" },
                { icon: "⚡", label: "Lead automatisch qualifiziert", sub: "KI-System — gerade eben", color: "text-indigo-600", bg: "bg-indigo-50 border-indigo-100" },
                { icon: "📈", label: "Lighthouse Score 100", sub: "baumann-gmbh.de — live", color: "text-violet-600", bg: "bg-violet-50 border-violet-100" },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.15, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border bg-white shadow-sm ${card.bg}`}
                >
                  <span className={`text-sm ${card.color} shrink-0`}>{card.icon}</span>
                  <div className="min-w-0">
                    <p className="text-[12px] font-semibold text-slate-900 leading-none mb-0.5">{card.label}</p>
                    <p className="text-[10px] text-slate-400 truncate">{card.sub}</p>
                  </div>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      {/* Untere Trennlinie */}
      <div className="border-t border-slate-200" />
    </section>
  );
};
