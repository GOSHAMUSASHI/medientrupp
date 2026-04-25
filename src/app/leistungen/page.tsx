"use client";

import { motion } from "framer-motion";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { ServicesAlternating } from "@/components/sections/ServicesAlternating";

export default function LeistungenPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="pt-24 pb-10 md:pt-40 md:pb-20 bg-slate-50 relative overflow-hidden">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-[0.3] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-indigo-600 mb-6">
              Volles Spektrum
            </p>
            <h1
              className="font-semibold tracking-[-0.03em] text-slate-900 mb-8"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.75rem)", lineHeight: 0.95 }}
            >
              Unsere Systeme im{" "}
              <span className="text-indigo-600">Detail.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed">
              Wir bauen keine Standard-Websites, sondern Vertriebsmaschinen. Entdecken Sie die Bausteine, die Ihr Unternehmen messbar nach vorne bringen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services — same alternating layout as homepage */}
      <ServicesAlternating />

      <CtaBanner />
    </div>
  );
}
