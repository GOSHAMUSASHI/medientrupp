"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// â"?â"? Types â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?

export interface UpsellItem {
  index: string;
  title: string;
  description: string;
  href: string;
}

interface SubpageUpsellProps {
  /** Section headline */
  headline: string;
  /** Optional sub-copy */
  subCopy?: string;
  /** 2—3 related services to cross-sell */
  items: UpsellItem[];
}

// â"?â"? Component â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?

export const SubpageUpsell = ({ headline, subCopy, items }: SubpageUpsellProps) => {
  return (
    <section className="bg-slate-50 border-t border-slate-200">
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
            Das passt dazu
          </p>
          <h2
            className="font-semibold tracking-[-0.03em] text-slate-900"
            style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)", lineHeight: 0.95 }}
          >
            {headline}
          </h2>
          {subCopy && (
            <p className="mt-4 text-sm text-slate-500 leading-relaxed max-w-xl">
              {subCopy}
            </p>
          )}
        </motion.div>

        {/* Upsell items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-slate-200">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex flex-col justify-between p-6 md:p-8 lg:p-10 hover:bg-white transition-colors duration-300 ${
                i < items.length - 1 ? "border-b md:border-b-0 md:border-r border-slate-200" : ""
              }`}
            >
              <div>
                <span className="text-[11px] font-semibold tracking-[0.2em] text-slate-400 mb-3 block">
                  {item.index}
                </span>
                <h3 className="text-xl font-black tracking-tight text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <Link
                href={item.href}
                className="group/link mt-4 md:mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
              >
                Mehr erfahren
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

