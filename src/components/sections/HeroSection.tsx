"use client";

import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Tag, Zap } from "lucide-react";
import Link from "next/link";
import { HeroGraphic } from "@/components/HeroGraphic";

const StarIcon = () => (
  <svg className="w-4 h-4 fill-indigo-600" viewBox="0 0 20 20" aria-hidden="true">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const trustBadges = [
  { icon: <ShieldCheck size={13} />, text: "100% Made in Germany" },
  { icon: <Tag         size={13} />, text: "Festpreis ab 1.500 €" },
  { icon: <Zap         size={13} />, text: "Go-Live in 3–6 Wochen" },
];

export const HeroSection = () => (
  <section className="relative bg-white">

    <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-[0.3] pointer-events-none" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="grid grid-cols-1 lg:grid-cols-12 pt-20 sm:pt-24 lg:pt-20 lg:min-h-[calc(100svh-128px)]"
      >

        {/* ── LEFT TEXT COLUMN — col-span-8 (~65%) ────────────────────── */}
        <div className="flex flex-col justify-center py-10 lg:col-span-8 lg:pr-10 xl:pr-16">

          {/* Google stars eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-3 mb-5 md:mb-8 self-start"
            aria-label="Google Bewertung: 5 von 5 Sternen"
          >
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
            </div>
            <span className="w-px h-4 bg-slate-300" aria-hidden="true" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-slate-900 leading-none">5,0</span>
              <span className="text-sm text-slate-500 leading-none">auf Google</span>
            </div>
          </motion.div>

          {/* Headline — 3 Zeilen */}
          <h1
            className="font-bold tracking-[-0.03em] text-slate-900 mb-5 md:mb-8"
            style={{ fontSize: "clamp(2.2rem, 4.2vw, 4rem)", lineHeight: 1.05 }}
          >
            {[
              { text: "Wir digitalisieren",   accent: false },
              { text: "Ihr Unternehmen.",     accent: false },
              { text: "Schnell & komplett.",  accent: true  },
            ].map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className={`block ${line.accent ? "text-indigo-600" : ""}`}
              >
                {line.text}
              </motion.span>
            ))}
          </h1>

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-base lg:text-lg text-slate-500 leading-relaxed mb-6 md:mb-10 max-w-xl"
          >
            Von der hochkonvertierenden Website bis zum individuellen KI-System.
            Wir digitalisieren den Mittelstand mit System – ohne monatelange Wartezeiten.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap gap-3 mb-6 md:mb-10"
          >
            <Link
              href="/projekt-anfragen"
              id="hero-cta-primary"
              className="btn-glow inline-flex items-center gap-2 px-7 py-3.5 text-base font-semibold"
            >
              Jetzt Projekt starten
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link
              href="/leistungen"
              id="hero-cta-secondary"
              className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-slate-700 bg-white border border-slate-200 rounded-md hover:border-slate-300 hover:text-slate-900 transition-colors duration-200"
            >
              Systeme live ansehen
              <ArrowRight size={16} className="text-slate-400" aria-hidden="true" />
            </Link>
          </motion.div>

          {/* Trust strip — Breite = Inhalt, nicht volle Spalte */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            <div className="inline-flex flex-wrap items-center gap-6 border-t border-slate-200 pt-5 md:pt-6">
              {trustBadges.map((b, i) => (
                <div key={i} className="flex items-center gap-2 text-slate-500">
                  {b.icon}
                  <span className="text-xs font-medium">{b.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── RIGHT GRAPHIC COLUMN — col-span-4 (~35%) ────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex flex-col justify-center lg:col-span-4 pl-10 xl:pl-12"
        >
          <div className="pt-48">
            <HeroGraphic />
          </div>
        </motion.div>

      </div>
    </div>

    <div className="border-t border-slate-200" />
  </section>
);
