"use client";

import { motion } from "framer-motion";

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const tickets = [
  { title: "SEO-Optimierung", status: "done", time: "2h" },
  { title: "Plugin-Update", status: "done", time: "1h" },
  { title: "Performance-Check", status: "active", time: "laufend" },
];

const uptimeBars = Array.from({ length: 30 }, (_, i) => i === 7 || i === 22);

const reportItems: [string, string][] = [
  ["Updates", "12"],
  ["Backups", "30"],
  ["Antwortzeit", "<2h"],
];

const responseChart = [55, 70, 45, 80, 60, 75, 50];

export const BetreuungGraphic = () => {
  return (
    <div className="relative mx-auto aspect-[1.08] w-full max-w-[34rem]">
      <motion.div
        {...reveal(0.05)}
        className="absolute inset-x-10 top-10 bottom-4 rounded-[1.75rem] bg-[#bdd8e4]"
      />
      <motion.div
        {...reveal(0.1)}
        className="absolute inset-x-6 top-6 bottom-2 rounded-[1.75rem] bg-[#e4f2f7]"
      />

      <div className="relative grid h-full gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          {...reveal(0.14)}
          className="flex flex-col gap-4 rounded-[1.75rem] border border-white/70 bg-white/88 p-4 shadow-[0_26px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-sm"
        >
          <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Systemstatus
              </p>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] font-semibold text-emerald-600">99.9%</span>
              </span>
            </div>
            <div className="flex gap-0.5">
              {uptimeBars.map((warn, i) => (
                <div
                  key={i}
                  className={`h-6 flex-1 rounded-sm ${warn ? "bg-amber-300" : "bg-emerald-400/65"}`}
                />
              ))}
            </div>
            <p className="mt-2 text-[9px] text-slate-400">Letzte 30 Tage</p>
          </div>

          <div className="flex-1 rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Letzte Aufgaben
            </p>
            <div className="space-y-2">
              {tickets.map(({ title, status, time }) => (
                <div
                  key={title}
                  className="flex items-center justify-between rounded-[0.85rem] border border-white bg-white p-3"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 shrink-0 rounded-full ${
                        status === "done" ? "bg-emerald-400" : "bg-indigo-500"
                      }`}
                    />
                    <span className="text-[10px] font-medium text-slate-700">{title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal(0.22)}
          className="flex flex-col gap-4 rounded-[1.75rem] border border-white/70 bg-white/84 p-4 shadow-[0_26px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-sm"
        >
          <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Monatsbericht
            </p>
            <div className="space-y-2">
              {reportItems.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-[0.85rem] border border-slate-100 bg-slate-50 px-3 py-2.5"
                >
                  <span className="text-[10px] text-slate-400">{label}</span>
                  <span className="text-[10px] font-bold text-slate-700">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Reaktionszeit
            </p>
            <div className="flex h-16 items-end gap-1.5">
              {responseChart.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-sky-500/25"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[9px] text-slate-400">Ø Reaktionszeit</span>
              <span className="text-[9px] font-semibold text-sky-600">1.4h</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
