"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Code2, ShieldCheck, Scale, Compass, MapPin, Server } from "lucide-react";
import { GermanyMapGraphic } from "@/components/GermanyMapGraphic";
import { CtaBanner } from "@/components/sections/CtaBanner";

const values = [
  {
    icon: <ShieldCheck size={24} />,
    title: "100% Festpreis-Garantie",
    description:
      "Wir arbeiten ohne versteckte Kosten und ohne Stundensätze. Sie kennen Ihr Investment auf den Cent genau, bevor wir starten.",
  },
  {
    icon: <Code2 size={24} />,
    title: "Schlüsselfertige Systeme",
    description:
      "Keine Baukästen, keine halben Sachen. Wir liefern High-Performance-Infrastrukturen, die sofort einsatzbereit sind.",
  },
  {
    icon: <Scale size={24} />,
    title: "Radikal Transparent",
    description:
      "Wir reden kein Agentur-Bingo. Klare Prozesse, ehrliches Feedback und Code, der Ihnen gehört.",
  },
  {
    icon: <Compass size={24} />,
    title: "Technologische Exzellenz",
    description:
      "Wir nutzen den gleichen Tech-Stack wie globale Tier-1 Player. Für maximale Geschwindigkeit, Sicherheit und Skalierbarkeit.",
  },
];

const comparison = [
  { category: "Fokus",        traditional: "Bunte Bilder und Likes",          medientrupp: "Messbare Conversion und Leads"    },
  { category: "Preismodell",  traditional: "Intransparente Stundensätze",      medientrupp: "Kalkulierbare Festpreise"          },
  { category: "Technologie",  traditional: "Wordpress Standard-Themes",        medientrupp: "Headless & Modern React-Stack"     },
  { category: "Prozess",      traditional: "Endlose Feedbackschleifen",         medientrupp: "Strukturierte Wochen-Sprints"      },
];


// ── Page ──────────────────────────────────────────────────────────────────────

export default function UeberUnsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden relative">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-[0.25] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-indigo-600 mb-6">
              Über Medientrupp
            </p>
            <h1
              className="font-extrabold tracking-[-0.03em] text-slate-900 mb-8"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", lineHeight: 1.0 }}
            >
              Wir bauen das digitale Fundament{" "}
              <span className="text-indigo-600">für den deutschen Mittelstand.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-2xl">
              Keine typische Werbeagentur. Wir sind technologische Handwerker, die Vertriebsmaschinen und Automatisierungen für B2B-Unternehmen entwickeln.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="pb-12 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-slate-200 p-8 flex flex-col hover:border-indigo-200 transition-colors duration-300"
              >
                <div className="w-11 h-11 bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
                  {v.icon}
                </div>
                <h3 className="text-lg font-bold tracking-tight text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 md:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-indigo-600 mb-4">
              Der Unterschied
            </p>
            <h2
              className="font-semibold tracking-[-0.03em] text-slate-900"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.05 }}
            >
              Warum wir anders arbeiten.
            </h2>
          </div>

          <div className="border border-slate-200 overflow-hidden text-sm">
            {/* Header row */}
            <div className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200 bg-white">
              <div className="p-6 font-semibold text-slate-400 uppercase tracking-widest text-[10px] hidden md:block">
                Kategorie
              </div>
              <div className="p-4 md:p-6 font-bold text-orange-500 bg-slate-50">
                Traditionelle Agentur
              </div>
              <div className="p-4 md:p-6 flex items-center gap-3 bg-indigo-50 border-t md:border-t-0 md:border-l border-indigo-100">
                <span className="font-black text-indigo-700 tracking-tight text-lg">Medientrupp</span>
              </div>
            </div>

            {comparison.map((row, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200 last:border-b-0 hover:bg-slate-50 transition-colors"
              >
                <div className="p-4 md:p-6 font-bold text-slate-900 flex items-center md:border-r border-slate-100">
                  {row.category}
                </div>
                <div className="p-4 md:p-6 flex items-center gap-3 text-slate-500">
                  <XCircle size={16} className="text-orange-500 shrink-0" />
                  <span>{row.traditional}</span>
                </div>
                <div className="p-4 md:p-6 flex items-center gap-3 text-slate-900 bg-indigo-50/40 md:border-l border-indigo-100">
                  <CheckCircle2 size={16} className="text-indigo-600 shrink-0" />
                  <span className="font-semibold">{row.medientrupp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Made in Germany / Hosting */}
      <section className="py-16 md:py-24 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left: copy */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-2 eyebrow-badge px-3 py-1.5 mb-8">
                <MapPin size={13} className="text-indigo-600" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-700">
                  Headquarters
                </span>
              </div>

              <h2
                className="font-semibold tracking-[-0.03em] text-slate-900 mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)", lineHeight: 1.05 }}
              >
                Made in Germany.<br />
                <span className="text-indigo-600">Hosted in Germany.</span>
              </h2>

              <p className="text-slate-500 leading-relaxed mb-10">
                In einer digitalisierten Welt ist der Standort des Servers genauso wichtig wie der Firmensitz. Alle unsere Projekte werden DSGVO-konform und mit höchsten Sicherheitsstandards in Deutschland gehostet und entwickelt.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                    <Server size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">100% DSGVO-konform</p>
                    <p className="text-xs text-slate-500">Premium EU-Server</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
                    <ShieldCheck size={20} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Zertifizierte Sicherheit</p>
                    <p className="text-xs text-slate-500">Regelmäßige Audits</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right: modern hosting graphic */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center md:justify-end"
            >
              <GermanyMapGraphic />
            </motion.div>

          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
