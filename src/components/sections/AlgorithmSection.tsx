"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Eye, Users, Play, Camera, Briefcase, BarChart3 } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface PlatformData {
  stats: { icon: React.ReactNode; label: string; value: string; delta: string; color: string; spark: number[] }[];
  chartData: number[];
  topFormat: string;
  topFormatValue: string;
}

// ── Platform Data Sets ────────────────────────────────────────────────────────

const platformData: Record<string, PlatformData> = {
  Alle: {
    stats: [
      { icon: <Eye size={14} />,       label: "Ø Reichweite / Woche",  value: "84.000", delta: "+38 %", color: "#7c3aed", spark: [42, 51, 46, 62, 58, 74, 84] },
      { icon: <TrendingUp size={14} />, label: "Interaktionsrate",      value: "6,2 %",  delta: "+12 %", color: "#10B981", spark: [3.1, 4.0, 3.8, 5.2, 4.9, 5.7, 6.2] },
      { icon: <Users size={14} />,      label: "Neue Follower / Woche", value: "1.240",  delta: "+24 %", color: "#F59E0B", spark: [480, 610, 570, 820, 790, 1050, 1240] },
    ],
    chartData: [42, 58, 51, 72, 68, 84, 91],
    topFormat: "Reel / Kurzfilm",
    topFormatValue: "2,4 % CTR",
  },
  Instagram: {
    stats: [
      { icon: <Eye size={14} />,       label: "Ø Reichweite / Woche",  value: "51.000", delta: "+42 %", color: "#7c3aed", spark: [28, 33, 31, 40, 38, 46, 51] },
      { icon: <TrendingUp size={14} />, label: "Interaktionsrate",      value: "7,8 %",  delta: "+18 %", color: "#10B981", spark: [3.8, 4.5, 4.2, 5.9, 5.6, 7.1, 7.8] },
      { icon: <Users size={14} />,      label: "Neue Follower / Woche", value: "820",    delta: "+31 %", color: "#F59E0B", spark: [280, 350, 320, 520, 490, 710, 820] },
    ],
    chartData: [28, 40, 33, 52, 47, 63, 72],
    topFormat: "Reel (0–30 s)",
    topFormatValue: "3,1 % CTR",
  },
  LinkedIn: {
    stats: [
      { icon: <Eye size={14} />,       label: "Ø Reichweite / Woche",  value: "18.400", delta: "+29 %", color: "#7c3aed", spark: [8, 11, 10, 14, 13, 16, 18] },
      { icon: <TrendingUp size={14} />, label: "Engagement Rate",       value: "4,1 %",  delta: "+9 %",  color: "#10B981", spark: [2.1, 2.6, 2.4, 3.2, 3.0, 3.7, 4.1] },
      { icon: <Users size={14} />,      label: "Neue Kontakte / Woche", value: "290",    delta: "+17 %", color: "#F59E0B", spark: [120, 150, 140, 195, 185, 255, 290] },
    ],
    chartData: [18, 26, 22, 34, 30, 41, 48],
    topFormat: "Fachbeitrag (Text)",
    topFormatValue: "1,8 % CTR",
  },
  YouTube: {
    stats: [
      { icon: <Eye size={14} />,       label: "Ø Views / Woche",       value: "14.600", delta: "+51 %", color: "#7c3aed", spark: [5, 7, 6, 10, 9, 13, 15] },
      { icon: <TrendingUp size={14} />, label: "Ø Watch Time (Min.)",   value: "3:42",   delta: "+0:28", color: "#10B981", spark: [2.1, 2.4, 2.3, 2.8, 2.9, 3.4, 3.7] },
      { icon: <Users size={14} />,      label: "Neue Abonnenten / Wo.", value: "130",    delta: "+44 %", color: "#F59E0B", spark: [40, 55, 48, 78, 72, 108, 130] },
    ],
    chartData: [22, 31, 27, 44, 40, 58, 67],
    topFormat: "Tutorial (5–12 Min.)",
    topFormatValue: "4,2 % CTR",
  },
};

const platforms = [
  { id: "Alle",      icon: <BarChart3  size={12} /> },
  { id: "Instagram", icon: <Camera    size={12} /> },
  { id: "LinkedIn",  icon: <Briefcase size={12} /> },
  { id: "YouTube",   icon: <Play      size={12} /> },
];

const features = [
  { icon: <Play size={16} />,       label: "Contentstrategie mit System",  desc: "Datenbasierte Planung für maximale Reichweite und Konsistenz." },
  { icon: <TrendingUp size={16} />, label: "Plattform-Optimierung",        desc: "Native Formate für Instagram, LinkedIn, TikTok & YouTube." },
  { icon: <Users size={16} />,      label: "Reichweite & Conversion",      desc: "Inhalte, die nicht nur gesehen werden — sondern zum Handeln führen." },
];

// ── Sparkline ─────────────────────────────────────────────────────────────────

const Sparkline = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 48;
  const h = 20;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / range) * h;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  return (
    <svg width={w} height={h} className="flex-shrink-0 overflow-visible">
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      <circle
        cx={parseFloat(pts[pts.length - 1].split(",")[0])}
        cy={parseFloat(pts[pts.length - 1].split(",")[1])}
        r="2"
        fill={color}
      />
    </svg>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────

export const AlgorithmSection = () => {
  const [activePlatform, setActivePlatform] = useState("Alle");
  const data = platformData[activePlatform];

  return (
    <section className="bg-white border-t border-slate-200" aria-labelledby="algorithm-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="py-12 border-b border-slate-200"
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
            Video & Content
          </p>
          <h2
            id="algorithm-heading"
            className="font-semibold tracking-[-0.03em] text-slate-900"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
          >
            Sichtbarkeit ist kein Zufall —
            <br />
            <span className="text-indigo-600">sie ist Strategie.</span>
          </h2>
        </motion.div>

        {/* Split: copy | rule | data panel */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] py-12 gap-0">

          {/* LEFT — copy + feature list */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pr-12"
          >
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-indigo-600 border border-indigo-100 bg-indigo-50 px-3 py-1.5 rounded-md mb-8">
              <motion.span
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-indigo-600"
              />
              Content läuft — jetzt live
            </div>

            <p className="text-base text-slate-500 leading-relaxed mb-10 max-w-md">
              Kein Raten, kein Ausprobieren. Wir analysieren, was Ihre Zielgruppe stoppt, und
              produzieren Inhalte, die auf allen relevanten Plattformen performen.
            </p>

            {/* Feature rows */}
            <div>
              {features.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-start gap-4 py-5 ${idx < features.length - 1 ? "border-b border-slate-100" : ""}`}
                >
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-0.5">{item.label}</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CENTER — vertical rule */}
          <div className="hidden lg:block bg-slate-200 self-stretch" />

          {/* RIGHT — Interactive data panel */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pl-12 mt-10 lg:mt-0 flex flex-col justify-center"
          >
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
              Echtzeit-Metriken · Beispiel
            </p>

            {/* Panel */}
            <div
              className="border border-slate-200 bg-white"
              style={{ boxShadow: "4px 4px 0 #e2e8f0" }}
            >
              {/* Header row with platform filter */}
              <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className="pulse-ring">
                    <span className="w-1.5 h-1.5 bg-green-500 block" />
                  </span>
                  <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-slate-400">
                    Content Analytics
                  </p>
                </div>
                {/* Platform tabs */}
                <div className="flex items-center gap-1">
                  {platforms.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePlatform(p.id)}
                      className={`flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wide border transition-colors duration-150 ${
                        activePlatform === p.id
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700"
                      }`}
                    >
                      {p.icon}
                      <span className="hidden sm:inline">{p.id}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* KPI rows with sparklines */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePlatform + "-stats"}
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.25 }}
                >
                  {data.stats.map((stat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 border"
                          style={{ color: stat.color, background: `${stat.color}10`, borderColor: `${stat.color}25` }}
                        >
                          {stat.icon}
                        </div>
                        <div className="min-w-0">
                          <p className="text-[9px] text-slate-400 uppercase tracking-[0.12em] font-bold truncate">
                            {stat.label}
                          </p>
                          <p
                            className="font-semibold tracking-tight leading-none"
                            style={{ fontSize: "clamp(1.1rem, 2vw, 1.5rem)", color: stat.color }}
                          >
                            {stat.value}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <Sparkline data={stat.spark} color={stat.color} />
                        <span
                          className="text-[11px] font-semibold rounded-md border px-2 py-0.5 whitespace-nowrap"
                          style={{ color: stat.color, borderColor: `${stat.color}25`, background: `${stat.color}08` }}
                        >
                          {stat.delta}
                        </span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {/* Chart row */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePlatform + "-chart"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 py-4"
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.12em]">
                      Wöchentliche Reichweite — Letzte 7 Wochen
                    </p>
                    <span className="text-[9px] font-semibold rounded-md text-indigo-600 border border-indigo-100 bg-indigo-50 px-1.5 py-0.5">
                      {data.stats[0].delta}
                    </span>
                  </div>
                  <div className="flex items-end gap-1.5 h-[56px]">
                    {data.chartData.map((h, i) => (
                      <motion.div
                        key={i}
                        className="flex-1 relative group"
                        style={{ background: i === data.chartData.length - 1 ? "#7c3aed" : "#ede9fe" }}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.1 + i * 0.06, duration: 0.35, ease: "easeOut" }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1.5">
                    {["KW1", "KW2", "KW3", "KW4", "KW5", "KW6", "KW7"].map((l) => (
                      <span key={l} className="flex-1 text-center text-[8px] text-slate-300 font-medium">
                        {l}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Top-Format row + update note */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Top-Format:</span>
                  <span className="text-[10px] font-semibold text-slate-700">{data.topFormat}</span>
                  <span
                    className="text-[9px] font-semibold rounded-md border px-1.5 py-0.5"
                    style={{ color: "#7c3aed", borderColor: "#ede9fe", background: "#f5f3ff" }}
                  >
                    {data.topFormatValue}
                  </span>
                </div>
                <span className="text-[8px] text-slate-300 font-medium hidden sm:block">
                  Aktualisierung täglich 08:00 Uhr
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
