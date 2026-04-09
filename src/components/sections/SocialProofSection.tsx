"use client";

import {
  ShieldCheck,
  Tag,
  UserCheck,
  Lock,
  FileCheck,
  Zap,
} from "lucide-react";
import type { ReactNode } from "react";

// ── Trust Badge Data (aus Webflow-Extraktion) ─────────────────────────────

interface TrustBadge {
  icon: ReactNode;
  text: string;
}

const trustBadges: TrustBadge[] = [
  {
    icon: <ShieldCheck size={18} strokeWidth={1.75} className="text-indigo-600" />,
    text: "Deutsche Qualität & Standards",
  },
  {
    icon: <Tag size={18} strokeWidth={1.75} className="text-indigo-600" />,
    text: "Transparente Festpreise",
  },
  {
    icon: <UserCheck size={18} strokeWidth={1.75} className="text-indigo-600" />,
    text: "Persönlicher Ansprechpartner",
  },
  {
    icon: <Lock size={18} strokeWidth={1.75} className="text-indigo-600" />,
    text: "Höchste Datensicherheit",
  },
  {
    icon: <FileCheck size={18} strokeWidth={1.75} className="text-indigo-600" />,
    text: "100% DSGVO-konform",
  },
  {
    icon: <Zap size={18} strokeWidth={1.75} className="text-indigo-600" />,
    text: "Schnelle Umsetzung",
  },
];

// Double the set for seamless infinite loop
const marqueeItems = [...trustBadges, ...trustBadges];

// ── Component ─────────────────────────────────────────────────────────────────

export const SocialProofSection = () => {
  return (
    <section className="bg-slate-50 border-y border-slate-100 py-14" aria-label="Vertrauenssignale">
      {/* Section label */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-sm font-semibold text-slate-400 tracking-widest uppercase">
          Vertraut von führenden Mittelstandsunternehmen in Deutschland
        </p>
      </div>

      {/* Marquee */}
      <div
        className="marquee-outer overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <div className="marquee-track flex items-center">
          {marqueeItems.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 flex-shrink-0 pr-16"
            >
              {/* Icon */}
              <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-slate-100 shadow-sm flex-shrink-0">
                {badge.icon}
              </div>
              {/* Text */}
              <span className="text-slate-700 font-semibold text-sm whitespace-nowrap">
                {badge.text}
              </span>
              {/* Separator dot */}
              <span
                className="w-1 h-1 rounded-full bg-indigo-300 ml-12 flex-shrink-0"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
