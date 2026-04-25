"use client";

import { motion } from "framer-motion";

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] as const },
});

const swatches = [
  { name: "Midnight", bg: "bg-slate-950", code: "#020617" },
  { name: "Signal", bg: "bg-indigo-600", code: "#4F46E5" },
  { name: "Mist", bg: "bg-slate-200", code: "#E2E8F0" },
  { name: "Cloud", bg: "bg-white border border-slate-200", code: "#FFFFFF" },
];

const designTokens = ["Abstände & Raster", "Ecken & Rahmen", "Schatten & Tiefe", "Icons & Symbole"];

export const BrandDesignGraphic = () => {
  return (
    <div className="relative mx-auto aspect-[1.08] w-full max-w-[34rem]">
      <motion.div
        {...reveal(0.05)}
        className="absolute inset-x-10 top-10 bottom-4 rounded-[1.75rem] bg-[#dde1f2]"
      />
      <motion.div
        {...reveal(0.1)}
        className="absolute inset-x-6 top-6 bottom-2 rounded-[1.75rem] bg-[#eef0f9]"
      />

      <div className="relative grid h-full gap-4 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          {...reveal(0.14)}
          className="flex flex-col gap-4 rounded-[1.75rem] border border-white/70 bg-white/88 p-4 shadow-[0_26px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-sm"
        >
          <div className="rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Farbwelt
              </p>
              <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[10px] font-semibold text-slate-500">
                4 Farben
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {swatches.map((s) => (
                <div key={s.code}>
                  <div className={`aspect-[1.6] rounded-lg ${s.bg}`} />
                  <div className="mt-1.5 flex items-center justify-between px-0.5">
                    <span className="text-[10px] font-semibold text-slate-600">{s.name}</span>
                    <span className="font-mono text-[9px] text-slate-400">{s.code}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-[0_20px_40px_-34px_rgba(15,23,42,0.35)]">
            <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Logo & Signatur
            </p>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-950 text-2xl font-semibold tracking-[-0.05em] text-white">
                M
              </div>
              <div className="flex-1 space-y-2">
                <div className="h-2.5 w-28 rounded-full bg-slate-900" />
                <div className="h-1.5 w-20 rounded-full bg-slate-300" />
                <div className="h-1.5 w-16 rounded-full bg-slate-200" />
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0.9, 0.65, 0.8].map((w, i) => (
                <div key={i} className="rounded-md border border-slate-100 bg-slate-50 p-2.5">
                  <div
                    className="h-1.5 rounded-full bg-slate-300"
                    style={{ width: `${w * 100}%` }}
                  />
                  <div className="mt-1.5 h-1 rounded-full bg-slate-200" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          {...reveal(0.22)}
          className="flex flex-col gap-4 rounded-[1.75rem] border border-white/70 bg-white/84 p-4 shadow-[0_26px_60px_-36px_rgba(15,23,42,0.28)] backdrop-blur-sm"
        >
          <div className="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-[0_20px_40px_-34px_rgba(15,23,42,0.35)]">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              Typografie
            </p>
            <div className="text-6xl font-semibold leading-none tracking-[-0.06em] text-slate-900">
              Aa
            </div>
            <div className="mt-4 space-y-2.5">
              {(["Display", "Body", "Caption"] as const).map((label, i) => (
                <div key={label} className="flex items-center gap-3">
                  <div
                    className="h-1.5 flex-1 rounded-full"
                    style={{
                      background: `rgba(15,23,42,${0.85 - i * 0.28})`,
                      maxWidth: `${[80, 65, 50][i]}%`,
                    }}
                  />
                  <span className="shrink-0 text-[9px] text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 rounded-[1.35rem] border border-slate-200 bg-slate-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                Design-Regeln
              </p>
              <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
            </div>
            <div className="space-y-2">
              {designTokens.map((token) => (
                <div
                  key={token}
                  className="flex items-center justify-between rounded-[0.85rem] border border-white bg-white px-3 py-2.5"
                >
                  <span className="text-[10px] font-medium text-slate-600">{token}</span>
                  <div className="h-1.5 w-8 rounded-full bg-indigo-200" />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
