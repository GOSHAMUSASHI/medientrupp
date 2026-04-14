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

// ── Data ─────────────────────────────────────────────────────────────────────

interface TrustBadge {
  icon: ReactNode;
  text: string;
}

const trustBadges: TrustBadge[] = [
  { icon: <ShieldCheck size={16} strokeWidth={1.75} />, text: "Deutsche Qualität & Standards" },
  { icon: <Tag        size={16} strokeWidth={1.75} />, text: "Transparente Festpreise" },
  { icon: <UserCheck  size={16} strokeWidth={1.75} />, text: "Persönlicher Ansprechpartner" },
  { icon: <Lock       size={16} strokeWidth={1.75} />, text: "Höchste Datensicherheit" },
  { icon: <FileCheck  size={16} strokeWidth={1.75} />, text: "100% DSGVO-konform" },
  { icon: <Zap        size={16} strokeWidth={1.75} />, text: "Go-Live in 3–6 Wochen" },
];

// Double for seamless loop
const marqueeItems = [...trustBadges, ...trustBadges];

// ── Component ─────────────────────────────────────────────────────────────────

export const SocialProofSection = () => {
  return (
    <section
      className="bg-slate-50 border-y border-slate-200"
      aria-label="Vertrauenssignale"
    >
      {/* Single horizontal rule accent */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-5 border-b border-slate-200 mb-0">
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400">
            Vertraut von Mittelstandsunternehmen in Deutschland
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="overflow-hidden py-6"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%)",
        }}
        aria-hidden="true"
      >
        <div className="marquee-track flex items-center">
          {marqueeItems.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2.5 flex-shrink-0 pr-14"
            >
              {/* Icon */}
              <span className="text-indigo-600 flex-shrink-0">
                {badge.icon}
              </span>
              {/* Text */}
              <span className="text-slate-600 font-semibold text-sm whitespace-nowrap">
                {badge.text}
              </span>
              {/* Separator */}
              <span
                className="w-px h-4 bg-slate-300 ml-10 flex-shrink-0"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
