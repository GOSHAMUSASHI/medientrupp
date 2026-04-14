"use client";

import {
  ShieldCheck,
  Tag,
  UserCheck,
  Lock,
  FileCheck,
  Zap,
  Database,
  GitBranch,
  Webhook,
  Server,
  Bot,
  Globe,
} from "lucide-react";
import type { ReactNode } from "react";

// ── Trust Badges ──────────────────────────────────────────────────────────────

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

const marqueeItems = [...trustBadges, ...trustBadges];

// ── Tech Stack Capabilities ───────────────────────────────────────────────────

const techCaps: { icon: ReactNode; label: string; sub: string }[] = [
  { icon: <Globe    size={18} />, label: "Next.js",      sub: "Web & Landing Pages" },
  { icon: <Database size={18} />, label: "PostgreSQL",   sub: "Datenbanken" },
  { icon: <Server   size={18} />, label: "Node.js APIs", sub: "Backend-Systeme" },
  { icon: <Webhook  size={18} />, label: "Webhooks",     sub: "Echtzeit-Trigger" },
  { icon: <Bot      size={18} />, label: "KI-Modelle",   sub: "Automatisierung" },
  { icon: <GitBranch size={18} />, label: "CI/CD",       sub: "Deploy-Pipelines" },
];

// ── Component ─────────────────────────────────────────────────────────────────

export const SocialProofSection = () => {
  return (
    <>
      {/* ── Trust Marquee ── */}
      <section
        className="bg-slate-50 border-y border-slate-200"
        aria-label="Vertrauenssignale"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-5 border-b border-slate-200">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400">
              Vertraut von Mittelstandsunternehmen in Deutschland
            </p>
          </div>
        </div>

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
                <span className="text-violet-600 flex-shrink-0">
                  {badge.icon}
                </span>
                <span className="text-slate-600 font-semibold text-sm whitespace-nowrap">
                  {badge.text}
                </span>
                <span
                  className="w-px h-4 bg-slate-300 ml-10 flex-shrink-0"
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Capabilities Strip ── */}
      <section
        className="bg-white border-b border-slate-200 relative overflow-hidden"
        aria-label="Technologie-Stack"
      >
        {/* Subtle tech grid */}
        <div aria-hidden="true" className="tech-grid absolute inset-0 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {techCaps.map((cap, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center gap-2 py-7 ${
                  i < techCaps.length - 1 ? "border-r border-slate-100" : ""
                } ${i >= 3 ? "border-t border-slate-100 lg:border-t-0" : ""}`}
              >
                <div className="w-10 h-10 bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600">
                  {cap.icon}
                </div>
                <div className="text-center">
                  <p className="text-sm font-black text-slate-900 tracking-tight leading-none">
                    {cap.label}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5 tracking-wide">
                    {cap.sub}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
