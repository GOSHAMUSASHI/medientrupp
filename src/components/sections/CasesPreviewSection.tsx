"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cases } from "@/data/cases";

// Show the first 3 cases on the homepage
const previewCases = cases.slice(0, 3);

// ── Section ───────────────────────────────────────────────────────────────────

export const CasesPreviewSection = () => {
  return (
    <section className="bg-white border-t border-slate-200" aria-labelledby="cases-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="section-y-compact border-b border-slate-200 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
              Ausgewählte Projekte
            </p>
            <h2
              id="cases-heading"
              className="font-semibold tracking-[-0.03em] text-slate-900"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
            >
              Systeme,{" "}
              <span className="text-indigo-600">die gewinnen.</span>
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors duration-200 shrink-0"
          >
            Alle Projekte ansehen
            <ArrowRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </motion.div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-b border-slate-200">
          {previewCases.map((c, i) => (
            <motion.div
              key={c.index}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className={`group flex flex-col hover:bg-slate-50 transition-colors duration-300 ${
                i < previewCases.length - 1 ? "border-b md:border-b-0 md:border-r border-slate-200" : ""
              }`}
            >
              {/* Visual — project screenshot / mockup */}
              <Link
                href="/portfolio"
                aria-label={`${c.title} im Portfolio ansehen`}
                className="relative block w-full overflow-hidden bg-slate-100"
                style={{ aspectRatio: "16 / 9" }}
              >
                <Image
                  src={c.image}
                  alt={`${c.title} – ${c.category}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* Subtle overlay + Branche pill */}
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/5 transition-colors duration-500" />
                <span className="absolute top-3 left-3 text-[10px] font-bold tracking-[0.12em] uppercase bg-white/90 text-slate-700 px-2.5 py-1 rounded-md backdrop-blur-sm">
                  {c.branche}
                </span>
              </Link>

              {/* Content */}
              <div className="flex flex-col flex-1 p-7 lg:p-8 relative">
                {/* Ghost index */}
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-6 font-black text-slate-100 leading-none select-none group-hover:text-indigo-50 transition-colors duration-300"
                  style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}
                >
                  {c.index}
                </span>

                {/* Category tag */}
                <span className="relative z-10 inline-block text-[10px] font-bold tracking-[0.15em] uppercase text-indigo-600 border border-indigo-100 bg-indigo-50 px-2.5 py-1 rounded-md mb-4 self-start">
                  {c.leistungLabel}
                </span>

                {/* Title + description */}
                <h3
                  className="relative z-10 font-semibold tracking-tight text-slate-900 mb-2"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", lineHeight: 1.1 }}
                >
                  {c.title}
                </h3>
                <p className="relative z-10 text-sm text-slate-500 leading-relaxed flex-1">
                  {c.description}
                </p>

                {/* Bottom: metric + link */}
                <div className="relative z-10 mt-6 pt-5 border-t border-slate-100 flex items-center justify-between gap-4">
                  <span className="text-[13px] font-semibold text-indigo-600 border border-indigo-100 bg-indigo-50 px-3 py-1.5 rounded-md">
                    {c.metrics[0]}
                  </span>
                  <Link
                    href="/portfolio"
                    className="group/link flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-indigo-600 transition-colors duration-200 shrink-0"
                    aria-label={`${c.title} im Portfolio ansehen`}
                  >
                    Details
                    <ArrowUpRight
                      size={13}
                      className="transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </div>

                {/* Bottom accent line on hover */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-indigo-600 group-hover:w-full transition-all duration-500 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
