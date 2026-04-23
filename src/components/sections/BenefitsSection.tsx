"use client";

import { motion } from "framer-motion";
import { Euro, Shield, User, Code2, Handshake } from "lucide-react";
import type { ReactNode } from "react";

// ── Data ──────────────────────────────────────────────────────────────────────

interface TrustPoint {
  icon: ReactNode;
  title: string;
  body: string;
}

const trustPoints: TrustPoint[] = [
  {
    icon: <Euro size={20} strokeWidth={1.75} />,
    title: "Festpreise statt Stundenlotto",
    body: "Ihr Preis steht vor Projektbeginn fest. Schriftlich fixiert, ohne Nachverhandlung.",
  },
  {
    icon: <Shield size={20} strokeWidth={1.75} />,
    title: "Hosting in Deutschland",
    body: "Server stehen in Deutschland, DSGVO-konform. Keine US-Cloud, keine rechtliche Grauzone.",
  },
  {
    icon: <User size={20} strokeWidth={1.75} />,
    title: "Ein fester Ansprechpartner",
    body: "Sie sprechen vom ersten Gespräch bis zum Go-Live mit derselben Person. Kein Ticket-System.",
  },
  {
    icon: <Code2 size={20} strokeWidth={1.75} />,
    title: "Kein Outsourcing",
    body: "Konzeption, Code und Design entstehen im eigenen Team. Keine Weitergabe an Subunternehmer.",
  },
  {
    icon: <Handshake size={20} strokeWidth={1.75} />,
    title: "Kein Abo-Lock-in",
    body: "Nach dem Launch bleiben wir an Bord, wenn Sie das wollen. Kein Zwang, keine Mindestlaufzeit.",
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

export const BenefitsSection = () => {
  return (
    <section
      className="bg-white border-t border-slate-200 overflow-hidden relative"
      aria-labelledby="benefits-heading"
    >
      {/* Dot-grid background */}
      <div
        aria-hidden="true"
        className="dot-grid absolute inset-0 opacity-[0.25] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top: headline */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="py-12 md:py-16 border-b border-slate-200 text-center"
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
            Warum Medientrupp
          </p>
          <h2
            id="benefits-heading"
            className="font-semibold tracking-[-0.03em] text-slate-900 mb-4"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
          >
            Der Medientrupp{" "}
            <span className="text-indigo-600">Unterschied.</span>
          </h2>
          <p className="text-base text-slate-500 leading-relaxed max-w-xl mx-auto">
            Warum Geschäftsführer im Mittelstand uns weiterempfehlen.
          </p>
        </motion.div>

        {/* Trust points — 5-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 py-12 md:py-16">
          {trustPoints.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className={`px-4 sm:px-6 py-5 md:py-8 lg:py-4 ${
                i < trustPoints.length - 1
                  ? "border-b sm:border-b-0 sm:[&:nth-child(odd)]:border-r lg:[&:nth-child(odd)]:border-r lg:border-r lg:[&:last-child]:border-r-0 border-slate-200"
                  : ""
              }`}
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-indigo-50 text-indigo-600 mb-4">
                {point.icon}
              </span>
              <h3 className="font-semibold tracking-tight text-slate-900 text-base leading-snug mb-2">
                {point.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {point.body}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
