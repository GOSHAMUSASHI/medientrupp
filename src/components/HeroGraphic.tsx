"use client";

import { motion } from "framer-motion";
import {
  Bot, BarChart2, Globe, Mail, Share2, Target, Building2, Layers,
} from "lucide-react";
import type { ElementType } from "react";

interface Module {
  label: string;
  sub: string;
  icon: ElementType;
  color: string;
  bg: string;
}

const modules: Module[] = [
  { label: "Website & SEO",   sub: "Hochkonvertierend",  icon: Globe,     color: "text-indigo-600", bg: "bg-indigo-50"  },
  { label: "KI-Assistent",    sub: "24/7 verfügbar",     icon: Bot,       color: "text-violet-600", bg: "bg-violet-50"  },
  { label: "Lead-Erfassung",  sub: "Vollautomatisch",    icon: Target,    color: "text-indigo-600", bg: "bg-indigo-50"  },
  { label: "Social Media",    sub: "Content & Ads",      icon: Share2,    color: "text-violet-600", bg: "bg-violet-50"  },
  { label: "E-Mail-Flows",    sub: "Nurturing-Strecken", icon: Mail,      color: "text-indigo-600", bg: "bg-indigo-50"  },
  { label: "Analytics & CRM", sub: "Echtzeit-Daten",     icon: BarChart2, color: "text-violet-600", bg: "bg-violet-50"  },
];

// Skeleton-Linien Layer 1
const barsL1 = [78, 55, 70, 42, 65, 50, 38, 60];
// Skeleton-Linien Layer 2 (andere Verteilung)
const barsL2 = [85, 48, 75, 38, 68, 55, 45, 72];

const ISO = "rotateX(60deg) rotateZ(-45deg)";

const isoShadow = (steps: number, color: string, glow: string): string =>
  [
    ...Array.from({ length: steps }, (_, i) => `-${i + 1}px ${i + 1}px 0 ${color}`),
    `0 20px 40px ${glow}`,
  ].join(", ");

const float = (amplitude: number, delay: number) => ({
  animate: { y: [0, -amplitude, 0] as [number, number, number] },
  transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" as const, delay },
});

const StatusDot = () => (
  <span className="relative flex h-2 w-2 shrink-0">
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
  </span>
);

export const HeroGraphic = () => (
  <div className="relative w-full aspect-square max-w-[380px] ml-auto select-none">

    {/* Background glow */}
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/4 w-3/4 h-1/2 bg-violet-500/15 rounded-full blur-3xl" />
    </div>

    {/* ── LAYER 1 — Ihr Unternehmen ──────────────────────────────── */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.65, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
      style={{ zIndex: 10 }}
    >
      <motion.div {...float(5, 1.1)} className="w-full h-full">
        <div
          className="relative w-full h-full rounded-lg border border-slate-200 bg-white"
          style={{
            transform: ISO,
            boxShadow: isoShadow(8, "#e2e8f0", "rgba(0,0,0,0.07)"),
          }}
        >
          {/* Titel */}
          <div className="absolute top-5 left-6 flex items-center gap-2">
            <Building2 size={13} className="text-slate-500" strokeWidth={1.5} />
            <span className="text-[11px] font-bold text-slate-700 tracking-wide">
              Ihr Unternehmen
            </span>
          </div>

          {/* Skeleton-Linien */}
          <div className="absolute top-14 left-6 right-8 space-y-2.5">
            {barsL1.map((w, i) => (
              <div
                key={i}
                className="rounded"
                style={{
                  height: i % 4 === 0 ? "5px" : "3px",
                  width: `${w}%`,
                  background: i % 3 === 0 ? "#94a3b8" : "#e2e8f0",
                }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>

    {/* ── LAYER 2 — Medientrupp Plattform ───────────────────────── */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
      style={{ zIndex: 20 }}
    >
      <motion.div {...float(7, 1.4)} className="w-full h-full">
        <div
          className="relative w-full h-full rounded-lg bg-gradient-to-br from-violet-600 via-indigo-700 to-indigo-900 overflow-hidden"
          style={{
            transform: `translateY(-5rem) ${ISO}`,
            boxShadow: isoShadow(10, "#4c1d95", "rgba(0,0,0,0.28)"),
          }}
        >
          {/* Titel */}
          <div className="absolute top-5 left-6 flex items-center gap-2">
            <Layers size={13} className="text-white/70" strokeWidth={1.5} />
            <span className="text-[11px] font-bold text-white tracking-wide">
              Medientrupp Plattform
            </span>
          </div>

          {/* Skeleton-Linien in Weiß */}
          <div className="absolute top-14 left-6 right-8 space-y-2.5">
            {barsL2.map((w, i) => (
              <div
                key={i}
                className="rounded"
                style={{
                  height: i % 4 === 0 ? "5px" : "3px",
                  width: `${w}%`,
                  background: i % 3 === 0 ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          {/* Aktiv-Badge unten */}
          <div className="absolute bottom-5 left-6 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            <span className="text-[9px] font-semibold text-white/70">6 Services aktiv</span>
          </div>
        </div>
      </motion.div>
    </motion.div>

    {/* ── LAYER 3 — Module card grid ─────────────────────────────── */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0"
      style={{ zIndex: 30 }}
    >
      <motion.div {...float(9, 1.7)} className="w-full h-full">
        <div
          className="w-full h-full grid grid-cols-2 gap-2.5 p-4"
          style={{ transform: `translateY(-10rem) ${ISO}` }}
        >
          {modules.map(({ label, sub, icon: Icon, color, bg }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55 + i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="bg-white rounded-lg shadow-xl border border-slate-100 flex flex-col justify-between px-3 py-2.5 gap-1.5"
            >
              <div className="flex items-center justify-between">
                <div className={`w-7 h-7 rounded-md ${bg} flex items-center justify-center ${color} shrink-0`}>
                  <Icon size={13} strokeWidth={1.75} />
                </div>
                <StatusDot />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-800 leading-tight whitespace-nowrap">{label}</p>
                <p className="text-[9px] text-slate-500 leading-none mt-0.5 whitespace-nowrap">{sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>

  </div>
);
