"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, Shield } from "lucide-react";

// ── Badge data ────────────────────────────────────────────────────────────────

const BADGES = [
  {
    id:        "iso",
    icon:      ShieldCheck,
    iconColor: "text-emerald-600",
    iconBg:    "bg-emerald-50",
    label:     "ISO 27001 Zertifiziertes RZ",
    className: "top-[5%] -left-[2%]",
    floatDur:  4.0,
    delay:     0.9,
    small:     false,
  },
  {
    id:        "dsgvo",
    icon:      Shield,
    iconColor: "text-blue-600",
    iconBg:    "bg-blue-50",
    label:     "100% DSGVO",
    className: "top-[5%] right-[6%]",
    floatDur:  3.6,
    delay:     1.1,
    small:     true,
  },
  {
    id:        "aes",
    icon:      Lock,
    iconColor: "text-violet-600",
    iconBg:    "bg-violet-50",
    label:     "AES-256 Encryption",
    className: "bottom-[12%] -right-[2%]",
    floatDur:  5.2,
    delay:     1.3,
    small:     false,
  },
] as const;

// Decorative dots on the outer ring (at 45°, 135°, 225°, 315°)
const OUTER_DOTS = [
  "top-[14.6%] left-[85.4%]",
  "top-[85.4%] left-[85.4%]",
  "top-[85.4%] left-[14.6%]",
  "top-[14.6%] left-[14.6%]",
] as const;

// Decorative dots on the middle ring (at 12, 3, 6, 9 o'clock)
const MID_DOTS = [
  "top-[15%] left-1/2 -translate-x-1/2",
  "top-1/2   left-[85%] -translate-y-1/2",
  "bottom-[15%] left-1/2 -translate-x-1/2",
  "top-1/2   left-[15%] -translate-y-1/2",
] as const;

// ── Component ─────────────────────────────────────────────────────────────────

export const GermanyMapGraphic = () => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className="relative w-full max-w-sm aspect-square mx-auto flex items-center justify-center"
  >

    {/* ── Ambient glow ──────────────────────────────────────────────────────── */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 flex items-center justify-center"
    >
      <div className="w-[65%] h-[65%] rounded-full bg-violet-500/10 blur-3xl" />
    </div>

    {/* ── Concentric rings ──────────────────────────────────────────────────── */}
    {/* Outer ring */}
    <motion.div
      className="absolute inset-0 rounded-full border border-violet-200/50"
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    />
    {/* Middle ring — dashed for tech feel */}
    <motion.div
      className="absolute w-[70%] h-[70%] rounded-full border border-dashed border-violet-300/55"
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    />
    {/* Inner ring */}
    <motion.div
      className="absolute w-[40%] h-[40%] rounded-full border border-violet-400/45"
      initial={{ opacity: 0, scale: 0.75 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
    />

    {/* ── Crosshair lines ───────────────────────────────────────────────────── */}
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center">
      <div className="w-full h-px bg-violet-200/25" />
    </div>
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex justify-center">
      <div className="w-px h-full bg-violet-200/25" />
    </div>

    {/* ── Outer ring decorative dots (45° intervals) ────────────────────────── */}
    {OUTER_DOTS.map((cls, i) => (
      <motion.div
        key={`od-${i}`}
        className={`absolute w-1.5 h-1.5 rounded-full bg-violet-400/60 -translate-x-1/2 -translate-y-1/2 ${cls}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 + i * 0.07, duration: 0.3 }}
      />
    ))}

    {/* ── Middle ring dots (cardinal points) ───────────────────────────────── */}
    {MID_DOTS.map((cls, i) => (
      <motion.div
        key={`md-${i}`}
        className={`absolute w-1 h-1 rounded-full bg-violet-300/70 ${cls}`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.62 + i * 0.06, duration: 0.3 }}
      />
    ))}

    {/* ── Central Frankfurt node ────────────────────────────────────────────── */}
    <motion.div
      className="relative z-10 flex flex-col items-center gap-2.5"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.42, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Node dot with dual pulse */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-4 h-4 rounded-full bg-violet-500/30 animate-ping" />
        <div className="w-4 h-4 rounded-full bg-violet-600 animate-pulse shadow-[0_0_16px_rgba(124,58,237,0.65)]" />
      </div>

      {/* Location label */}
      <div className="bg-slate-900 text-white text-[10px] font-mono tracking-wide px-2.5 py-1 rounded-md whitespace-nowrap">
        DE-FRA (Primary)
      </div>
    </motion.div>

    {/* ── Floating Security Badges ──────────────────────────────────────────── */}
    {BADGES.map((badge, i) => {
      const Icon = badge.icon;
      return (
        <motion.div
          key={badge.id}
          className={`absolute ${badge.className}`}
          initial={{ opacity: 0, scale: 0.88 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: badge.delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Inner wrapper handles continuous float */}
          <motion.div
            animate={{ y: [-4, 4, -4] }}
            transition={{
              duration: badge.floatDur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.85,
            }}
            className={`
              bg-white/90 backdrop-blur-sm shadow-xl border border-slate-100 rounded-xl
              flex items-center gap-2 whitespace-nowrap
              ${badge.small ? "p-2" : "p-3"}
            `}
          >
            <div
              className={`
                flex items-center justify-center shrink-0 rounded-lg
                ${badge.iconBg}
                ${badge.small ? "w-6 h-6" : "w-7 h-7"}
              `}
            >
              <Icon size={badge.small ? 12 : 14} className={badge.iconColor} aria-hidden="true" />
            </div>
            <span
              className={`font-semibold text-slate-700 leading-none ${badge.small ? "text-[10px]" : "text-[11px]"}`}
            >
              {badge.label}
            </span>
          </motion.div>
        </motion.div>
      );
    })}

  </motion.div>
);
