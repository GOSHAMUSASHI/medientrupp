"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, CheckCircle2, Users, Star } from "lucide-react";
import Link from "next/link";

export const CtaBanner = () => {
  return (
    <section className="relative bg-slate-950 section-y overflow-hidden">

      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Glow blob top right */}
      <div
        aria-hidden="true"
        className="absolute -top-32 -right-32 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16"
        >
          {/* Left — copy */}
          <div className="flex-1">
            {/* Social proof pill */}
            <div className="inline-flex items-center gap-3 bg-white/10 border border-white/15 rounded-lg px-4 py-2 mb-6">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-indigo-500/30 border border-indigo-400/30 text-indigo-300">
                <Users size={14} strokeWidth={1.75} />
              </div>
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={11} fill="currentColor" className="text-indigo-400" />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-white/70 leading-none">
                50+ Unternehmen vertrauen uns
              </span>
            </div>

            <h2
              className="font-semibold tracking-[-0.03em] text-white mb-5 leading-[0.95]"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              Bereit für Ihr{" "}
              <span className="text-indigo-400">nächstes Level?</span>
            </h2>
            <p className="text-base text-white/60 leading-relaxed max-w-lg mb-8">
              Wir analysieren Ihre aktuelle Situation und zeigen konkret, wo der größte Hebel liegt. Kein Pitch, kein Druck.
            </p>

            {/* Trust bullets */}
            <div className="flex flex-col sm:flex-row gap-4">
              {[
                { icon: <CheckCircle2 size={14} />, text: "Kostenlos & unverbindlich" },
                { icon: <Clock size={14} />, text: "Antwort in 24 h" },
                { icon: <CheckCircle2 size={14} />, text: "Festpreis-Garantie" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/60">
                  <span className="text-indigo-400">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Right — CTAs */}
          <div className="flex-shrink-0 w-full lg:w-auto flex flex-col gap-3">
            <Link
              href="/projekt-anfragen"
              className="inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200 shadow-lg shadow-indigo-900/40 hover:shadow-indigo-900/60"
            >
              Jetzt Projekt starten
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/leistungen"
              className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/80 hover:text-white hover:border-white/30 px-8 py-4 rounded-xl font-semibold text-base transition-all duration-200"
            >
              Alle Leistungen ansehen
            </Link>
            <p className="text-center text-[11px] text-white/30 mt-1">
              Kostenlos · Unverbindlich · In 24 h
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
