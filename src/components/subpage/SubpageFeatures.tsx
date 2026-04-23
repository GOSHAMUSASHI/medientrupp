"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

// â"?â"? Types â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?

export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface SubpageFeaturesProps {
  /** Eyebrow label above headline */
  eyebrow: string;
  /** Section headline */
  headline: string;
  /** Optional brand-coloured portion of headline */
  highlightedWord?: string;
  /** Array of feature items — renders in a 3-column grid */
  features: Feature[];
}

// â"?â"? Component â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?

export const SubpageFeatures = ({
  eyebrow,
  headline,
  highlightedWord,
  features,
}: SubpageFeaturesProps) => {
  const parts = highlightedWord ? headline.split(highlightedWord) : [headline];

  return (
    <section className="bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="section-y-compact border-b border-slate-200"
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
            {eyebrow}
          </p>
          <h2
            className="font-semibold tracking-[-0.03em] text-slate-900"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
          >
            {parts[0]}
            {highlightedWord && (
              <span className="text-indigo-600">{highlightedWord}</span>
            )}
            {parts[1]}
          </h2>
        </motion.div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-slate-200">
          {features.map((feat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`flex flex-col p-6 md:p-8 lg:p-10 hover:bg-slate-50 transition-colors duration-300 ${
                i < features.length - 1 ? "border-b md:border-b-0 md:border-r border-slate-200" : ""
              }`}
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white flex items-center justify-center text-indigo-600 mb-4 md:mb-6">
                {feat.icon}
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-slate-900 mb-2">
                {feat.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feat.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

