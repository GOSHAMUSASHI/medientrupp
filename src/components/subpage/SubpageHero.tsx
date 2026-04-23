"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// ── Props ─────────────────────────────────────────────────────────────────────

interface SubpageHeroProps {
  /** Small uppercase label above headline, e.g. "Leistung · Websites" */
  eyebrow: string;
  /** Main H1 — can contain \n for line breaks */
  headline: string;
  /** Highlighted portion of headline rendered in brand color */
  highlightedWord?: string;
  /** Short sub-copy below headline */
  subCopy: string;
  /** Primary CTA label */
  ctaLabel: string;
  /** Primary CTA href */
  ctaHref: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const SubpageHero = ({
  eyebrow,
  headline,
  highlightedWord,
  subCopy,
  ctaLabel,
  ctaHref,
}: SubpageHeroProps) => {
  // Split headline on highlightedWord for inline colour accent
  const parts = highlightedWord ? headline.split(highlightedWord) : [headline];

  return (
    <section className="bg-white border-b border-slate-200 relative overflow-hidden">
      <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-[0.25] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10 md:pt-32 md:pb-14">

        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5 md:mb-8"
        >
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors duration-200"
          >
            <ArrowLeft size={13} aria-hidden="true" />
            Alle Leistungen
          </Link>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-3 md:mb-5"
        >
          {eyebrow}
        </motion.p>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-semibold tracking-[-0.03em] text-slate-900 mb-4 md:mb-6 max-w-3xl"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", lineHeight: 0.93 }}
        >
          {parts[0]}
          {highlightedWord && (
            <span className="text-indigo-600">{highlightedWord}</span>
          )}
          {parts[1]}
        </motion.h1>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base lg:text-lg text-slate-500 leading-relaxed max-w-xl mb-6 md:mb-10"
        >
          {subCopy}
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href={ctaHref}
            className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold"
          >
            {ctaLabel}
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
