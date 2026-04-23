"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cases } from "@/data/cases";
import { CtaBanner } from "@/components/sections/CtaBanner";

// ── Filter dimensions ─────────────────────────────────────────────────────────

const BRANCHEN = ["Alle", "Logistik", "Finanzen", "Gesundheit", "E-Commerce", "Industrie", "Handwerk"] as const;
const LEISTUNGEN = ["Alle", "Website", "KI & Automation", "Individuelle KI-Projekte", "Branding", "Social Media & Video", "Betreuung"] as const;

type BrancheFilter = typeof BRANCHEN[number];
type LeistungFilter = typeof LEISTUNGEN[number];

// ── Filter Pill ───────────────────────────────────────────────────────────────

const Pill = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={`text-[11px] font-semibold tracking-[0.1em] uppercase px-3.5 py-2 border transition-colors duration-150 whitespace-nowrap ${
      active
        ? "bg-indigo-600 border-indigo-600 text-white"
        : "bg-white border-slate-200 text-slate-500 hover:border-indigo-300 hover:text-indigo-600"
    }`}
  >
    {label}
  </button>
);

// ── Project Card ──────────────────────────────────────────────────────────────

const ProjectCard = ({ c, i }: { c: typeof cases[number]; i: number }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.97 }}
    transition={{ duration: 0.35, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
    className="group flex flex-col overflow-hidden rounded-lg border border-slate-200 bg-white hover:-translate-y-0.5 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
  >
    {/* Image */}
    <Link
      href={`/leistungen/${c.leistungSlug}`}
      className="relative block w-full overflow-hidden bg-slate-100"
      style={{ aspectRatio: "16 / 10" }}
      aria-label={`${c.title}: Mehr erfahren`}
    >
      <Image
        src={c.image}
        alt={`${c.title} – ${c.category}`}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        style={{ objectFit: "cover" }}
        className="transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-500" />

      {/* Branche badge */}
      <span className="absolute top-3 left-3 text-[10px] font-bold tracking-[0.12em] uppercase bg-white/90 backdrop-blur-sm text-slate-700 px-2.5 py-1">
        {c.branche}
      </span>

      {/* Arrow reveal */}
      <div className="absolute top-3 right-3 w-8 h-8 bg-white border border-slate-200 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <ArrowUpRight size={15} className="text-slate-800" />
      </div>
    </Link>

    {/* Body */}
    <div className="flex flex-col flex-1 p-6">
      {/* Leistung tag */}
      <span className="inline-block text-[10px] font-bold tracking-[0.15em] uppercase text-indigo-600 border border-indigo-100 bg-indigo-50 px-2.5 py-1 mb-3 self-start">
        {c.leistungLabel}
      </span>

      <h2
        className="font-semibold tracking-tight text-slate-900 mb-2 leading-snug"
        style={{ fontSize: "clamp(1rem, 1.8vw, 1.25rem)" }}
      >
        {c.title}
      </h2>
      <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-5">
        {c.description}
      </p>

      {/* Metrics */}
      <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-slate-100">
        {c.metrics.map((m, idx) => (
          <span
            key={idx}
            className="text-[10px] font-semibold uppercase tracking-wide text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1"
          >
            {m}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [branche, setBranche] = useState<BrancheFilter>("Alle");
  const [leistung, setLeistung] = useState<LeistungFilter>("Alle");

  const filtered = useMemo(() => {
    return cases.filter((c) => {
      const brancheOk = branche === "Alle" || c.branche === branche;
      const leistungOk = leistung === "Alle" || c.leistungLabel === leistung;
      return brancheOk && leistungOk;
    });
  }, [branche, leistung]);

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="pt-24 pb-8 md:pt-40 md:pb-16 border-b border-slate-200 relative overflow-hidden">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-[0.2] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
              Case Studies & Referenzen
            </p>
            <h1
              className="font-semibold tracking-[-0.03em] text-slate-900 mb-4"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", lineHeight: 0.93 }}
            >
              Systeme,{" "}
              <span className="text-indigo-600">die gewinnen.</span>
            </h1>
            <p className="text-base text-slate-500 max-w-xl leading-relaxed">
              Jedes System wird kompromisslos auf Performance und ROI optimiert.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[57px] z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4">

            {/* Dimension 1: Branche */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={11} className="text-slate-400" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">
                  Branche
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {BRANCHEN.map((b) => (
                  <Pill
                    key={b}
                    label={b}
                    active={branche === b}
                    onClick={() => setBranche(b)}
                  />
                ))}
              </div>
            </div>

            {/* Separator */}
            <div className="hidden sm:block w-px bg-slate-200 self-stretch mx-2" />

            {/* Dimension 2: Leistung */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <SlidersHorizontal size={11} className="text-slate-400" />
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">
                  Leistung
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {LEISTUNGEN.map((l) => (
                  <Pill
                    key={l}
                    label={l}
                    active={leistung === l}
                    onClick={() => setLeistung(l)}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="section-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Result count */}
          <div className="mb-8 flex items-center justify-between">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-400">
              {filtered.length} {filtered.length === 1 ? "Projekt" : "Projekte"}
            </p>
            {(branche !== "Alle" || leistung !== "Alle") && (
              <button
                onClick={() => { setBranche("Alle"); setLeistung("Alle"); }}
                className="text-[11px] font-semibold text-slate-400 hover:text-indigo-600 transition-colors underline underline-offset-2"
              >
                Filter zurücksetzen
              </button>
            )}
          </div>

          {/* Cards */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.length > 0 ? (
                filtered.map((c, i) => (
                  <ProjectCard key={c.index} c={c} i={i} />
                ))
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full py-12 md:py-24 text-center"
                >
                  <p className="text-slate-400 text-sm font-medium mb-3">
                    Keine Projekte für diese Kombination.
                  </p>
                  <button
                    onClick={() => { setBranche("Alle"); setLeistung("Alle"); }}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors"
                  >
                    Filter zurücksetzen
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
