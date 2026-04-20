"use client";

import { motion } from "framer-motion";
import { ArrowRight, CalendarCheck, Clock } from "lucide-react";
import Link from "next/link";

export const CtaBanner = () => {
  return (
    <section className="bg-slate-50 py-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-slate-900 p-10 md:p-14 lg:p-16"
        >
          {/* Decorative glows */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[80px] pointer-events-none -mr-40 -mt-40" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[80px] pointer-events-none -ml-20 -mb-20" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">

            {/* Copy */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-600/20 border border-indigo-500/30 mb-6">
                <Clock size={12} className="text-indigo-400" />
                <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest">
                  Antwort in 24h · Kein Pitch · Kein Druck
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
                Bereit für ein System,{" "}
                <span className="text-indigo-400">das für Sie arbeitet?</span>
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Wir schauen uns Ihre aktuelle digitale Infrastruktur an und zeigen Ihnen konkret, wo der größte Hebel liegt. Ehrliche Analyse — keine Verkaufspräsentation.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex-shrink-0 w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[220px]">
              <Link
                href="/projekt-anfragen"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-900/40 hover:-translate-y-0.5 text-base"
              >
                <CalendarCheck size={18} />
                Projekt anfragen
              </Link>
              <Link
                href="/leistungen"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-slate-300 border border-white/20 hover:border-white/40 hover:text-white transition-all text-base"
              >
                Leistungen ansehen
                <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};
