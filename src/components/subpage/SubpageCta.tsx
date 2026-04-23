"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// â"?â"? Props â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?

interface SubpageCtaProps {
  /** Large headline */
  headline: string;
  /** Optional brand-coloured portion of headline */
  highlightedWord?: string;
  /** Sub-copy below headline */
  subCopy: string;
  /** Primary CTA label */
  primaryLabel: string;
  /** Primary CTA href */
  primaryHref: string;
  /** Optional secondary CTA label */
  secondaryLabel?: string;
  /** Optional secondary CTA href */
  secondaryHref?: string;
}

// â"?â"? Component â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?

export const SubpageCta = ({
  headline,
  highlightedWord,
  subCopy,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: SubpageCtaProps) => {
  const parts = highlightedWord ? headline.split(highlightedWord) : [headline];

  return (
    <section className="bg-white border-t border-slate-200 relative overflow-hidden">
      <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-[0.2] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 section-y">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <h2
            className="font-semibold tracking-[-0.03em] text-slate-900 mb-5"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
          >
            {parts[0]}
            {highlightedWord && (
              <span className="text-indigo-600">{highlightedWord}</span>
            )}
            {parts[1]}
          </h2>

          <p className="text-base lg:text-lg text-slate-500 leading-relaxed mb-7 md:mb-10">
            {subCopy}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={primaryHref}
              className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold"
            >
              {primaryLabel}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>

            {secondaryLabel && secondaryHref && (
              <Link
                href={secondaryHref}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:text-slate-900 transition-colors duration-200"
              >
                {secondaryLabel}
                <ArrowRight size={16} className="text-slate-400" aria-hidden="true" />
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

