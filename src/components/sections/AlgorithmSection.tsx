"use client";

import { motion } from "framer-motion";
import { TrendingUp, Eye, Users, Play } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const STAT_DELAYS = [0, 0.12, 0.24];

const contentStats = [
  { icon: <Eye      size={16} />, label: "Ø Reichweite / Woche",  value: "84.000", delta: "+38 %", color: "#7C3AED" },
  { icon: <TrendingUp size={16} />, label: "Interaktionsrate",     value: "6,2 %",  delta: "+12 %", color: "#10B981" },
  { icon: <Users    size={16} />, label: "Neue Follower / Woche", value: "1.240",  delta: "+24 %", color: "#F59E0B" },
];

const features = [
  { icon: <Play       size={16} />, label: "Contentstrategie mit System", desc: "Datenbasierte Planung für maximale Reichweite und Konsistenz." },
  { icon: <TrendingUp size={16} />, label: "Plattform-Optimierung",       desc: "Native Formate für Instagram, LinkedIn, TikTok & YouTube." },
  { icon: <Users      size={16} />, label: "Reichweite & Conversion",     desc: "Inhalte, die nicht nur gesehen werden — sondern zum Handeln führen." },
];

const chartData  = [42, 58, 51, 72, 68, 84, 91];
const chartDays  = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

// ── Section ───────────────────────────────────────────────────────────────────

export const AlgorithmSection = () => {
  return (
    <section
      className="bg-white border-t border-slate-200"
      aria-labelledby="algorithm-heading"
    >
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
            className="font-black tracking-[-0.03em] text-slate-900"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
          >
            Sichtbarkeit ist kein Zufall —
            <br />
            <span className="text-violet-600">sie ist Strategie.</span>
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
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-violet-600 border border-violet-100 bg-violet-50 px-3 py-1.5 mb-8">
              <motion.span
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-violet-600"
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
                  <div className="w-9 h-9 bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 shrink-0">
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

          {/* RIGHT — Editorial data panel */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pl-12 mt-10 lg:mt-0 flex flex-col justify-center"
          >
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-6">
              Echtzeit-Metriken · Beispiel
            </p>

            {/* Panel with offset-print shadow */}
            <div
              className="border border-slate-200 bg-white"
              style={{ boxShadow: "4px 4px 0 #e2e8f0" }}
            >
              {/* Header row */}
              <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200">
                <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">
                  Content Analytics · Letzte 30 Tage
                </p>
                <span className="flex items-center gap-1.5">
                  <span className="pulse-ring">
                    <span className="w-1.5 h-1.5 bg-green-500 block" />
                  </span>
                  <span className="text-[9px] font-black text-green-600 uppercase tracking-[0.15em]">Live</span>
                </span>
              </div>

              {/* KPI rows */}
              {contentStats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + STAT_DELAYS[i], duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center justify-between px-5 py-4 border-b border-slate-100"
                >
                  <div>
                    <p className="text-[9px] text-slate-400 uppercase tracking-[0.12em] font-bold mb-1">
                      {stat.label}
                    </p>
                    <p
                      className="font-black tracking-tight leading-none"
                      style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", color: stat.color }}
                    >
                      {stat.value}
                    </p>
                  </div>
                  <span
                    className="text-[11px] font-black border px-2 py-1"
                    style={{ color: stat.color, borderColor: `${stat.color}25`, background: `${stat.color}08` }}
                  >
                    {stat.delta}
                  </span>
                </motion.div>
              ))}

              {/* Chart row */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.65 }}
                className="px-5 py-5"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.12em]">
                    Wöchentliche Reichweite
                  </p>
                  <span className="text-[9px] font-black text-violet-600 border border-violet-100 bg-violet-50 px-1.5 py-0.5">
                    +38 %
                  </span>
                </div>
                <div className="flex items-end gap-1.5 h-[48px]">
                  {chartData.map((h, i) => (
                    <motion.div
                      key={i}
                      className="flex-1"
                      style={{ background: i === chartData.length - 1 ? "#7C3AED" : "#EDE9FE" }}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${h}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.65 + i * 0.06, duration: 0.35, ease: "easeOut" }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {chartDays.map((d) => (
                    <span key={d} className="flex-1 text-center text-[8px] text-slate-300 font-medium">
                      {d}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
