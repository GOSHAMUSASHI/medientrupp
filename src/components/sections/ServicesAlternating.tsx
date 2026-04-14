"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────

const services = [
  {
    index: "01",
    title: "Marke\n& Design",
    subtitle: "Ihr erster Eindruck",
    action: "Wir optimieren Ihre bestehende Marke oder entwickeln eine komplett neue Identität.",
    result: "Sie heben sich sofort ab und strahlen Autorität aus.",
    tags: ["Corporate Design", "Logo & Visual Identity", "Brand Guidelines"],
  },
  {
    index: "02",
    title: "Website &\nDigitaler Auftritt",
    subtitle: "Ihr 24/7 Schaufenster",
    action: "Schnelle, optimierte Website inklusive verkaufspsychologischer Texte und SEO.",
    result: "Interessenten konvertieren messbar besser in Leads.",
    tags: ["Next.js High-Performance", "Technical SEO", "Core Web Vitals"],
  },
  {
    index: "03",
    title: "KI-Systeme\n& Automation",
    subtitle: "Mehr Zeit, weniger Fehler",
    action: "Automatisierte Lead-Erfassung, 24/7 Chatbot und automatische Bewertungs-Maschine.",
    result: "Sie gewinnen Stunden in der Woche zurück.",
    tags: ["Lead Automation", "24/7 KI-Chatbot", "CRM-Integration"],
  },
  {
    index: "04",
    title: "Social Media\n& Video",
    subtitle: "Sichtbarkeit die bleibt",
    action: "Management, Strategie und Produktion von Short-Form Content und Imagefilmen.",
    result: "Artgerechte Präsentation auf allen digitalen Kanälen.",
    tags: ["Content-Strategie", "Videoproduktion", "Performance Marketing"],
  },
  {
    index: "05",
    title: "Laufende\nBetreuung",
    subtitle: "Rundum-Sorglos",
    action: "Sicheres Hosting, Wartung, laufende Optimierung und lokales Google SEO.",
    result: "Technik, die im Hintergrund einfach fehlerfrei läuft.",
    tags: ["Premium Hosting", "Security Updates", "Proaktiver Support"],
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

export const ServicesAlternating = () => {
  return (
    <section className="bg-slate-50 border-t border-slate-200" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="py-12 border-b border-slate-200"
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
            Unsere Kernleistungen
          </p>
          <h2
            id="services-heading"
            className="font-black tracking-[-0.03em] text-slate-900"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
          >
            Bausteine für echte
            <br />
            <span className="text-indigo-600">Skalierung.</span>
          </h2>
        </motion.div>

        {/* Service rows */}
        <div>
          {services.map((srv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] border-b border-slate-200"
            >
              {/* LEFT — service title block */}
              <div className="py-10 lg:pr-12">
                <div className="flex items-start gap-5">
                  <span
                    className="text-[11px] font-semibold tracking-[0.2em] text-slate-400 mt-1 shrink-0"
                  >
                    {srv.index}
                  </span>
                  <div>
                    <h3
                      className="font-black tracking-[-0.02em] text-slate-900 mb-3 whitespace-pre-line"
                      style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", lineHeight: 0.95 }}
                    >
                      {srv.title}
                    </h3>
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-indigo-600">
                      {srv.subtitle}
                    </p>
                  </div>
                </div>
              </div>

              {/* CENTER — vertical rule */}
              <div className="hidden lg:block bg-slate-200 self-stretch" />

              {/* RIGHT — detail content */}
              <div className="py-10 lg:pl-12 flex flex-col justify-center gap-6">
                {/* Was wir machen */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">
                    Was wir machen
                  </p>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {srv.action}
                  </p>
                </div>

                {/* Ihr Nutzen */}
                <div className="border-l-2 border-indigo-600 pl-4">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">
                    Ihr konkreter Nutzen
                  </p>
                  <p className="text-base font-semibold text-slate-900 leading-relaxed">
                    {srv.result}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {srv.tags.map((tag, t) => (
                    <span
                      key={t}
                      className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-500 border border-slate-200 bg-white px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="py-10"
        >
          <Link
            href="/leistungen"
            className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:text-slate-900 transition-colors duration-200"
          >
            Alle Leistungen im Detail
            <ArrowRight size={16} className="text-slate-400" aria-hidden="true" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
