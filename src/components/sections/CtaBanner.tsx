"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

export const CtaBanner = () => {
  return (
    <section className="relative bg-white py-16 md:py-24 overflow-hidden">

      {/* Dot-grid als editoriales Hintergrund-Detail */}
      <div
        aria-hidden="true"
        className="dot-grid absolute inset-0 opacity-[0.3] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white border border-slate-200 shadow-xl shadow-slate-200/60 p-8 md:p-12 lg:p-16"
          style={{ borderLeft: "4px solid #7C3AED" }}
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10">

            {/* Copy */}
            <div className="flex-1">
              <p className="text-xs font-black tracking-[0.2em] uppercase text-violet-600 mb-3">
                Kostenlose Erstberatung
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4 leading-[1.1]">
                Jetzt beraten lassen.{" "}
                <span className="text-violet-600">Unverbindlich & in 24h.</span>
              </h2>
              <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-xl">
                Wir schauen uns Ihre aktuelle digitale Infrastruktur an und zeigen Ihnen
                konkret, wo der größte Hebel liegt. Kein Pitch, kein Druck.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex-shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <Link
                href="/projekt-anfragen"
                className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 font-bold text-base flex items-center justify-center gap-2 transition-colors duration-200"
              >
                Preis berechnen
                <ArrowRight size={18} />
              </Link>
              <a
                href="/leistungen"
                className="border border-slate-200 text-slate-700 hover:border-slate-300 hover:text-slate-900 px-8 py-4 font-semibold text-base flex items-center justify-center gap-2 transition-colors duration-200"
              >
                <FileText size={18} />
                Leistungen ansehen
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
