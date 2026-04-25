"use client";

import { motion } from "framer-motion";

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const chatMessages = [
  { role: "user", widths: [0.85, 0.6] },
  { role: "ai", widths: [0.9, 0.72, 0.55] },
  { role: "user", widths: [0.7] },
  { role: "ai", widths: [0.88, 0.65] },
];

const metrics = [
  { label: "Response Rate", pct: 94 },
  { label: "Automation", pct: 78 },
];

export const IndividualKIGraphic = () => {
  return (
    <div className="relative mx-auto aspect-[1.08] w-full max-w-[34rem]">
      <motion.div
        {...reveal(0.05)}
        className="absolute inset-x-10 top-10 bottom-4 rounded-[1.75rem] bg-[#d8d4f2]"
      />
      <motion.div
        {...reveal(0.1)}
        className="absolute inset-x-6 top-6 bottom-2 rounded-[1.75rem] bg-[#eeecf9]"
      />

      <div className="relative grid h-full gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          {...reveal(0.14)}
          className="flex flex-col gap-4 rounded-[1.75rem] border border-white/70 bg-white/88 p-4 shadow-[0_26px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-sm"
        >
          <div className="flex flex-1 flex-col rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                KI-Assistent
              </p>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-slate-400">Live</span>
              </span>
            </div>
            <div className="space-y-3">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex max-w-[80%] flex-col gap-1.5 ${
                      msg.role === "user" ? "items-end" : "items-start"
                    }`}
                  >
                    {msg.widths.map((w, j) => (
                      <div
                        key={j}
                        className={`h-2 rounded-full ${
                          msg.role === "user" ? "bg-indigo-500/25" : "bg-slate-200"
                        }`}
                        style={{ width: `${w * 100}%`, minWidth: "3rem" }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-[1.35rem] border border-slate-200 bg-white p-3">
            <div className="h-1.5 flex-1 rounded-full bg-slate-200" />
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-600">
              <div className="h-1.5 w-3 rounded-full bg-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal(0.22)}
          className="flex flex-col gap-4 rounded-[1.75rem] border border-white/70 bg-white/84 p-4 shadow-[0_26px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-sm"
        >
          <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Konfiguration
            </p>
            <div className="space-y-2">
              {(
                [
                  ["Modell", "Custom GPT-4"],
                  ["Sprache", "DE / EN"],
                  ["Kanal", "Web + API"],
                ] as [string, string][]
              ).map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-center justify-between rounded-[0.85rem] border border-slate-100 bg-slate-50 px-3 py-2.5"
                >
                  <span className="text-[10px] font-medium text-slate-400">{label}</span>
                  <span className="text-[10px] font-semibold text-slate-700">{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Performance
            </p>
            <div className="space-y-3">
              {metrics.map(({ label, pct }) => (
                <div key={label}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">{label}</span>
                    <span className="text-[10px] font-semibold text-indigo-600">{pct}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-indigo-600/70"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
