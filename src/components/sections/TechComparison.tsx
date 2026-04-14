"use client";

import { motion } from "framer-motion";
import { XCircle, CheckCircle2 } from "lucide-react";

// ── Custom Animations ─────────────────────────────────────────────────────────

const ProgressBar = ({ fast }: { fast: boolean }) => (
  <div className="w-full sm:w-24 h-1.5 bg-slate-200 overflow-hidden shrink-0">
    <motion.div
      className={`h-full ${fast ? "bg-emerald-500" : "bg-orange-500"}`}
      initial={{ width: "0%" }}
      whileInView={{ width: fast ? "100%" : "60%" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: fast ? 0.5 : 4,
        ease: fast ? "easeOut" : "linear",
        delay: 0.1,
      }}
    />
  </div>
);

const ScoreCircle = ({ score, color, duration }: { score: number; color: string; duration: number }) => {
  const radius = 16;
  const circum = 2 * Math.PI * radius;
  return (
    <div className="relative w-10 h-10 flex items-center justify-center shrink-0">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="3" />
        <motion.circle
          cx="20" cy="20" r={radius} fill="none" stroke={color} strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circum}
          initial={{ strokeDashoffset: circum }}
          whileInView={{ strokeDashoffset: circum - (score / 100) * circum }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <span className="absolute text-[9px] font-black" style={{ color }}>{score}</span>
    </div>
  );
};

// ── Data ──────────────────────────────────────────────────────────────────────

type RowId = "ladezeit" | "lighthouse" | "tech" | "vertrag";

interface RowData {
  id: RowId;
  label: string;
  bad: string;
  good: string;
}

const rows: RowData[] = [
  { id: "ladezeit",   label: "Ladezeit",           bad: "3–8 Sekunden",        good: "0,09–0,2 Sekunden" },
  { id: "lighthouse", label: "Google Lighthouse",  bad: "45 / 100 Score",      good: "100 / 100 Score" },
  { id: "tech",       label: "Technologie",        bad: "WordPress + Plugins", good: "Next.js / Edge Network" },
  { id: "vertrag",    label: "Vertragslaufzeit",   bad: "12–24 Monate",        good: "Monatlich kündbar" },
];

export const TechComparison = () => {
  return (
    <section
      className="bg-white border-t border-slate-200 pb-16 md:pb-20"
      aria-labelledby="techcomparison-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-6 py-12 border-b border-slate-200 mb-10"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
              C-Level Vergleich
            </p>
            <h2
              id="techcomparison-heading"
              className="font-black tracking-[-0.03em] text-slate-900"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
            >
              Dasselbe Budget.
              <br />
              <span className="text-violet-600">Dreifacher Output.</span>
            </h2>
          </div>
          <p className="text-sm text-slate-500 max-w-xs leading-relaxed lg:text-right">
            Die Metriken, die für Ihre Skalierung und Kosteneinsparung wirklich zählen.
          </p>
        </motion.div>

        {/* Table for Desktop, Cards for Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Mobile View: Cards */}
          <div className="md:hidden space-y-6">
            {rows.map((row, i) => (
              <div key={row.id} className="bg-white rounded-md border border-slate-200 overflow-hidden shadow-lg">
                <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
                  <h3 className="font-black text-slate-900">{row.label}</h3>
                </div>
                <div className="p-6 space-y-6">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Klassische Agentur</span>
                    <div className="flex items-center gap-3">
                      <XCircle size={20} strokeWidth={2.5} className="text-orange-500 shrink-0" />
                      <span className="font-semibold text-slate-600 flex-1">{row.bad}</span>
                      {row.id === "lighthouse" && <div className="scale-75 origin-right"><ScoreCircle score={45} color="#f97316" duration={2} /></div>}
                    </div>
                    {row.id === "ladezeit" && <div className="mt-3"><ProgressBar fast={false} /></div>}
                  </div>
                  <div className="pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold text-violet-600 uppercase tracking-widest block mb-2">Medientrupp</span>
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={20} strokeWidth={2.5} className="text-emerald-500 shrink-0" />
                      <span className="font-black text-slate-900 flex-1">{row.good}</span>
                      {row.id === "lighthouse" && <div className="scale-75 origin-right"><ScoreCircle score={100} color="#10b981" duration={0.8} /></div>}
                    </div>
                    {row.id === "ladezeit" && <div className="mt-3"><ProgressBar fast={true} /></div>}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop View: Table */}
          <div className="hidden md:block overflow-hidden rounded-md border border-slate-200 shadow-xl shadow-slate-100 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left px-8 py-6 text-slate-400 font-bold uppercase text-xs tracking-widest bg-white w-[28%]">
                    Geschäftskriterium
                  </th>
                  <th className="px-8 py-6 bg-slate-50/50 text-slate-500 font-bold text-xs uppercase tracking-widest text-left border-r border-slate-100 w-[36%]">
                    Klassische Agentur
                  </th>
                  <th className="px-8 py-6 bg-violet-50/50 text-violet-700 font-bold text-xs uppercase tracking-widest text-left w-[36%]">
                    Medientrupp
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className="group hover:bg-slate-50/40 transition-colors"
                  >
                    <td className="px-8 py-6 font-bold text-slate-800 border-r border-slate-50/50 bg-white">
                      {row.label}
                    </td>
                    <td className="px-8 py-6 bg-slate-50/30 border-r border-slate-100">
                      <div className="flex items-center justify-start gap-4">
                        <XCircle size={18} strokeWidth={2.5} className="text-orange-500 shrink-0" />
                        <span className="font-semibold text-slate-600 w-40 lg:w-44">{row.bad}</span>
                        {row.id === "ladezeit" && <ProgressBar fast={false} />}
                        {row.id === "lighthouse" && <ScoreCircle score={45} color="#f97316" duration={2} />}
                      </div>
                    </td>
                    <td className="px-8 py-6 bg-violet-50/20 group-hover:bg-violet-50/50 transition-colors">
                      <div className="flex items-center justify-start gap-4">
                        <CheckCircle2 size={18} strokeWidth={2.5} className="text-emerald-500 shrink-0" />
                        <span className="font-bold text-slate-900 w-40 lg:w-44">{row.good}</span>
                        {row.id === "ladezeit" && <ProgressBar fast={true} />}
                        {row.id === "lighthouse" && <ScoreCircle score={100} color="#10b981" duration={0.8} />}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
