"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Tag, UserCheck, Lock, FileCheck, Zap, Star, TrendingUp, Clock, Award } from "lucide-react";
import type { ReactNode } from "react";

// ── Proof Stats ───────────────────────────────────────────────────────────────

const stats = [
  { value: "47+", label: "Projekte umgesetzt" },
  { value: "4,9 ★", label: "Kundenbewertung" },
  { value: "< 6 Wo.", label: "Ø Go-Live Zeit" },
  { value: "100%", label: "Festpreis-Garantie" },
];

// ── Trust Badge Data ──────────────────────────────────────────────────────────

interface TrustBadge {
  icon: ReactNode;
  text: string;
}

const trustBadges: TrustBadge[] = [
  { icon: <ShieldCheck size={16} strokeWidth={1.75} />, text: "Deutsche Qualität" },
  { icon: <Tag size={16} strokeWidth={1.75} />, text: "Transparente Festpreise" },
  { icon: <UserCheck size={16} strokeWidth={1.75} />, text: "Persönlicher Ansprechpartner" },
  { icon: <Lock size={16} strokeWidth={1.75} />, text: "Höchste Datensicherheit" },
  { icon: <FileCheck size={16} strokeWidth={1.75} />, text: "100% DSGVO-konform" },
  { icon: <Zap size={16} strokeWidth={1.75} />, text: "Go-Live in 4–6 Wochen" },
  { icon: <Star size={16} strokeWidth={1.75} />, text: "4,9 Sterne Bewertung" },
  { icon: <TrendingUp size={16} strokeWidth={1.75} />, text: "Messbare Ergebnisse" },
  { icon: <Clock size={16} strokeWidth={1.75} />, text: "Schnelle Reaktionszeit" },
  { icon: <Award size={16} strokeWidth={1.75} />, text: "Made in Germany" },
];

const marqueeItems = [...trustBadges, ...trustBadges];

// ── Component ─────────────────────────────────────────────────────────────────

export const SocialProofSection = () => {
  return (
    <section className="bg-white border-b border-slate-100" aria-label="Vertrauenssignale">

      {/* Stats Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-black tracking-tight text-slate-900 mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100" />

      {/* Marquee Trust Badges */}
      <div className="py-6 bg-slate-50/60">
        <div
          className="marquee-outer overflow-hidden"
          style={{
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
            maskImage: "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          }}
          aria-hidden="true"
        >
          <div className="marquee-track flex items-center">
            {marqueeItems.map((badge, index) => (
              <div key={index} className="flex items-center gap-2 flex-shrink-0 pr-10">
                <div className="w-7 h-7 flex items-center justify-center rounded-md bg-white border border-slate-200 text-indigo-600 flex-shrink-0">
                  {badge.icon}
                </div>
                <span className="text-slate-600 font-medium text-sm whitespace-nowrap">
                  {badge.text}
                </span>
                <span className="w-1 h-1 rounded-full bg-indigo-200 ml-8 flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
