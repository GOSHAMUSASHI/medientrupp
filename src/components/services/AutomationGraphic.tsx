"use client";

import { motion } from "framer-motion";

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const workflowSteps = [
  { step: "Anfrage geht ein", sub: "Formular, E-Mail oder Telefon", color: "bg-indigo-600" },
  { step: "KI prüft & sortiert", sub: "Priorität und Kategorie", color: "bg-slate-700" },
  { step: "Antwort + CRM-Eintrag", sub: "Automatisch gespeichert", color: "bg-emerald-500" },
];

const weeklyStats = [
  { task: "Anfragen sortiert", count: "247" },
  { task: "Antworten gesendet", count: "189" },
  { task: "CRM-Einträge", count: "56" },
];

export const AutomationGraphic = () => {
  return (
    <div className="relative mx-auto aspect-[1.08] w-full max-w-[34rem]">
      <motion.div
        {...reveal(0.05)}
        className="absolute inset-x-10 top-10 bottom-4 rounded-[1.75rem] bg-[#ccdfc7]"
      />
      <motion.div
        {...reveal(0.1)}
        className="absolute inset-x-6 top-6 bottom-2 rounded-[1.75rem] bg-[#e3ede1]"
      />

      <div className="relative grid h-full gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          {...reveal(0.14)}
          className="flex flex-col gap-4 rounded-[1.75rem] border border-white/70 bg-white/88 p-4 shadow-[0_26px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-sm"
        >
          <div className="flex flex-1 flex-col rounded-[1.35rem] border border-slate-200 bg-white p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Automatischer Ablauf
              </p>
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-slate-400">Aktiv</span>
              </span>
            </div>

            <div className="relative flex-1 space-y-2">
              {/* Connecting line */}
              <div className="absolute left-[1.1rem] top-3 bottom-3 w-px bg-slate-200" />

              {workflowSteps.map(({ step, sub, color }) => (
                <div
                  key={step}
                  className="relative flex items-start gap-3 rounded-[0.85rem] bg-slate-50 p-3"
                >
                  <div
                    className={`z-10 mt-0.5 h-3 w-3 shrink-0 rounded-full ${color} ring-2 ring-white`}
                  />
                  <div>
                    <p className="text-[10px] font-semibold text-slate-700">{step}</p>
                    <p className="mt-0.5 text-[9px] text-slate-400">{sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-3">
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-slate-200">
                <div className="h-full w-4/5 rounded-full bg-emerald-500/50" />
              </div>
              <span className="text-[10px] font-semibold text-emerald-600">Alle Schritte aktiv</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal(0.22)}
          className="flex flex-col gap-4 rounded-[1.75rem] border border-white/70 bg-white/84 p-4 shadow-[0_26px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-sm"
        >
          {/* Time saved */}
          <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-[0_20px_40px_-34px_rgba(15,23,42,0.35)]">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Zeit gespart
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight text-slate-900">14</span>
              <span className="text-base font-medium text-slate-400">h/Woche</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-slate-100">
              <div className="h-full w-4/5 rounded-full bg-emerald-500/55" />
            </div>
            <p className="mt-1.5 text-[9px] text-slate-400">Pro Mitarbeiter automatisiert</p>
          </div>

          {/* Weekly stats */}
          <div className="flex-1 rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Diese Woche
            </p>
            <div className="space-y-2">
              {weeklyStats.map(({ task, count }) => (
                <div
                  key={task}
                  className="flex items-center justify-between rounded-[0.85rem] border border-white bg-white px-3 py-2.5"
                >
                  <span className="text-[10px] text-slate-500">{task}</span>
                  <span className="text-[10px] font-bold text-slate-700">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
