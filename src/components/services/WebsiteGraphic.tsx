"use client";

import { motion } from "framer-motion";

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const featureTiles = ["Navigation", "Über uns", "Kontakt"];

const seoChecks = ["Google Seite 1", "Ladezeit < 1 Sek.", "Technisch optimiert"];

export const WebsiteGraphic = () => {
  return (
    <div className="relative mx-auto w-full max-w-[34rem] lg:aspect-[1.08]">
      <motion.div
        {...reveal(0.05)}
        className="absolute inset-x-10 top-10 bottom-4 rounded-[1.75rem] bg-[#d6e2ef]"
      />
      <motion.div
        {...reveal(0.1)}
        className="absolute inset-x-6 top-6 bottom-2 rounded-[1.75rem] bg-[#e8f0f9]"
      />

      <div className="relative grid gap-4 lg:h-full lg:grid-cols-[1.08fr_0.92fr]">
        {/* Left: Browser mockup – fills full height */}
        <motion.div
          {...reveal(0.14)}
          className="flex flex-col rounded-[1.75rem] border border-white/70 bg-white/88 p-4 shadow-[0_26px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-sm"
        >
          <div className="flex flex-1 flex-col overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white">
            {/* Browser chrome */}
            <div className="flex shrink-0 items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-2.5">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="h-2 w-2 rounded-full bg-slate-300" />
              </div>
              <div className="flex-1 rounded-full border border-slate-200 bg-white px-3 py-1">
                <div className="h-1.5 w-24 rounded-full bg-slate-200" />
              </div>
              <span className="rounded-full border border-indigo-100 bg-indigo-50 px-2 py-0.5 text-[9px] font-semibold text-indigo-600">
                Live
              </span>
            </div>

            {/* Page content – grows to fill remaining height */}
            <div className="flex flex-1 flex-col p-4">
              {/* Fake nav */}
              <div className="mb-4 flex shrink-0 items-center justify-between">
                <div className="h-2.5 w-14 rounded-full bg-slate-900" />
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-7 rounded-full bg-slate-200" />
                  <div className="h-1.5 w-7 rounded-full bg-slate-200" />
                  <div className="rounded-full bg-indigo-600 px-3 py-1.5">
                    <div className="h-1.5 w-9 rounded-full bg-white" />
                  </div>
                </div>
              </div>

              {/* Hero block */}
              <div className="mb-3 shrink-0 rounded-lg bg-slate-50 p-4">
                <div className="mb-2 h-3 w-4/5 rounded-full bg-slate-900" />
                <div className="mb-3 h-3 w-3/5 rounded-full bg-slate-800/70" />
                <div className="mb-1.5 h-1.5 w-full rounded-full bg-slate-200" />
                <div className="mb-4 h-1.5 w-5/6 rounded-full bg-slate-200" />
                <div className="flex gap-2">
                  <div className="rounded-full bg-slate-950 px-4 py-2">
                    <div className="h-1.5 w-12 rounded-full bg-white" />
                  </div>
                  <div className="rounded-full border border-slate-200 px-4 py-2">
                    <div className="h-1.5 w-8 rounded-full bg-slate-300" />
                  </div>
                </div>
              </div>

              {/* Feature tiles – flex-1 fills remaining height */}
              <div className="grid flex-1 grid-cols-3 gap-2">
                {featureTiles.map((tile) => (
                  <div
                    key={tile}
                    className="flex flex-col rounded-lg border border-slate-100 bg-slate-50 p-2.5"
                  >
                    <div className="mb-2 h-5 w-full rounded bg-slate-200" />
                    <div className="h-1.5 w-full rounded-full bg-slate-200" />
                    <div className="mt-1 h-1.5 w-3/4 rounded-full bg-slate-200/70" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Performance + SEO */}
        <motion.div
          {...reveal(0.22)}
          className="flex flex-col gap-4 rounded-[1.75rem] border border-white/70 bg-white/84 p-4 shadow-[0_26px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-sm"
        >
          {/* Speed score */}
          <div className="rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-[0_20px_40px_-34px_rgba(15,23,42,0.35)]">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Performance
            </p>
            <div className="flex items-center gap-3">
              <div className="relative h-14 w-14 shrink-0">
                <svg className="h-full w-full -rotate-90" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="3"
                  />
                  <circle
                    cx="18"
                    cy="18"
                    r="15.9155"
                    fill="none"
                    stroke="#4F46E5"
                    strokeWidth="3"
                    strokeDasharray="96 4"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-slate-900">96</span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-700">Speed Score</p>
                <p className="mt-0.5 text-[10px] text-slate-400">Sehr schnell</p>
              </div>
            </div>
          </div>

          {/* SEO checklist */}
          <div className="flex-1 rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Sichtbarkeit
            </p>
            <div className="space-y-2">
              {seoChecks.map((label) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 rounded-[0.85rem] border border-white bg-white px-3 py-2.5"
                >
                  <div className="h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-medium text-slate-600">{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-[0.85rem] border border-white bg-white p-3">
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[10px] text-slate-500">Monatliche Besucher</span>
                <span className="text-[10px] font-bold text-indigo-600">+34%</span>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100">
                <div className="h-full w-2/3 rounded-full bg-indigo-500/55" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
