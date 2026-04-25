"use client";

import { motion } from "framer-motion";

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const calendarDays = [
  { day: "Mo", active: false, type: "" },
  { day: "Di", active: true, type: "V" },
  { day: "Mi", active: false, type: "" },
  { day: "Do", active: true, type: "R" },
  { day: "Fr", active: true, type: "P" },
  { day: "Sa", active: false, type: "" },
  { day: "So", active: false, type: "" },
];

const platforms = [
  { name: "Instagram", bar: 82 },
  { name: "LinkedIn", bar: 64 },
  { name: "YouTube", bar: 71 },
];

const chartBars = [40, 60, 45, 75, 55, 80, 65];

export const SocialMediaGraphic = () => {
  return (
    <div className="relative mx-auto aspect-[1.08] w-full max-w-[34rem]">
      <motion.div
        {...reveal(0.05)}
        className="absolute inset-x-10 top-10 bottom-4 rounded-[1.75rem] bg-[#f0d9d2]"
      />
      <motion.div
        {...reveal(0.1)}
        className="absolute inset-x-6 top-6 bottom-2 rounded-[1.75rem] bg-[#faf3f0]"
      />

      <div className="relative grid h-full gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          {...reveal(0.14)}
          className="flex flex-col gap-4 rounded-[1.75rem] border border-white/70 bg-white/88 p-4 shadow-[0_26px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-sm"
        >
          <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Content-Kalender
              </p>
              <span className="text-[10px] text-slate-400">April</span>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map(({ day, active, type }) => (
                <div key={day} className="flex flex-col items-center gap-1.5">
                  <span className="text-[9px] font-medium text-slate-400">{day}</span>
                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${
                      active ? "bg-indigo-600" : "bg-slate-100"
                    }`}
                  >
                    {active && (
                      <span className="text-[8px] font-bold text-white">{type}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 rounded-[1.35rem] border border-slate-200 bg-slate-800 p-4 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.25),_transparent_60%)]" />
            <div className="relative">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Videoproduktion
              </p>
              <div className="flex aspect-video items-center justify-center rounded-lg border border-slate-600/50 bg-slate-700/40">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <div className="ml-0.5 h-0 w-0 border-b-[5px] border-t-[5px] border-l-[9px] border-b-transparent border-t-transparent border-l-white/70" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal(0.22)}
          className="flex flex-col gap-4 rounded-[1.75rem] border border-white/70 bg-white/84 p-4 shadow-[0_26px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-sm"
        >
          <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Reichweite
            </p>
            <div className="space-y-3">
              {platforms.map(({ name, bar }) => (
                <div key={name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">{name}</span>
                    <span className="text-[10px] font-semibold text-slate-600">{bar}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-indigo-500/55"
                      style={{ width: `${bar}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Posts / Monat
            </p>
            <div className="flex h-16 items-end gap-1.5">
              {chartBars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-indigo-500/20"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
