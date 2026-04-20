"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Code2, ShieldCheck, Scale, Compass, MapPin, Server } from "lucide-react";
import { CtaBanner } from "@/components/sections/CtaBanner";

const values = [
  {
    icon: <ShieldCheck size={28} />,
    title: "100% Festpreis-Garantie",
    description: "Wir arbeiten ohne versteckte Kosten und ohne Stundensätze. Sie kennen Ihr Investment auf den Cent genau, bevor wir starten."
  },
  {
    icon: <Code2 size={28} />,
    title: "Schlüsselfertige Systeme",
    description: "Keine Baukästen, keine halben Sachen. Wir liefern High-Performance-Infrastrukturen, die sofort einsatzbereit sind."
  },
  {
    icon: <Scale size={28} />,
    title: "Radikal Transparent",
    description: "Wir reden kein Agentur-Bingo. Klare Prozesse, ehrliches Feedback und Code, der Ihnen gehört."
  },
  {
    icon: <Compass size={28} />,
    title: "Technologische Exzellenz",
    description: "Wir nutzen den gleichen Tech-Stack wie globale Tier-1 Player. Für maximale Geschwindigkeit, Sicherheit und Skalierbarkeit."
  }
];

const comparison = [
  {
    category: "Fokus",
    traditional: "Bunte Bilder und Likes",
    medientrupp: "Messbare Conversion und Leads"
  },
  {
    category: "Preismodell",
    traditional: "Intransparente Stundensätze",
    medientrupp: "Kalkulierbare Festpreise"
  },
  {
    category: "Technologie",
    traditional: "Wordpress Standard-Themes",
    medientrupp: "Headless & Modern React-Stack"
  },
  {
    category: "Prozess",
    traditional: "Endlose Feedbackschleifen",
    medientrupp: "Strukturierte Wochen-Sprints"
  }
];

export default function UeberUnsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-slate-200/50 blur-[120px] rounded-[100%] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <p className="text-sm font-black tracking-[0.2em] uppercase text-indigo-600 mb-6">
              Über Medientrupp
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 mb-8 leading-[1.1]">
              Wir bauen das digitale Fundament für den <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">deutschen Mittelstand.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium max-w-2xl">
              Keine typische Werbeagentur. Wir sind technologische Handwerker, die Vertriebsmaschinen und Automatisierungen für B2B-Unternehmen entwickeln.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="pb-20 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                key={idx}
                className="bg-white border border-slate-200 p-8 rounded-md shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-shadow duration-300 h-full flex flex-col"
              >
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-md mb-6">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-500 leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Agency Standard / Comparison */}
      <section className="py-16 md:py-20 bg-white border-y border-slate-200 overflow-hidden relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
              Der Unterschied
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900">
              Warum wir anders arbeiten.
            </h2>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-md shadow-sm overflow-hidden text-sm md:text-base">
            {/* Header Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 items-center border-b border-slate-200 bg-white">
              <div className="p-6 font-semibold text-slate-500 uppercase tracking-widest text-xs hidden md:block">
                Kategorie
              </div>
              <div className="p-4 md:p-6 text-center font-bold text-slate-400 bg-slate-50/50">
                Traditionelle Agentur
              </div>
              <div className="p-4 md:p-6 text-center lg:text-left flex items-center justify-center lg:justify-start gap-3 bg-indigo-50 border-t md:border-t-0 border-indigo-100/50 md:border-l md:border-indigo-100">
                <span className="font-black text-indigo-700 tracking-tight text-lg">Medien<span className="text-slate-900">Trupp</span></span>
              </div>
            </div>

            {/* List Rows */}
            {comparison.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200 last:border-b-0 hover:bg-white transition-colors">
                <div className="p-4 md:p-6 font-bold text-slate-900 flex items-center justify-center md:justify-start md:border-r border-slate-100 text-center md:text-left">
                  {row.category}
                </div>
                <div className="p-4 md:p-6 flex flex-col md:flex-row items-center gap-3 text-slate-500 justify-center text-center">
                  <XCircle size={18} className="text-red-400 flex-shrink-0" />
                  <span className="font-medium">{row.traditional}</span>
                </div>
                <div className="p-4 md:p-6 flex flex-col md:flex-row items-center gap-3 text-slate-900 justify-center lg:justify-start text-center lg:text-left bg-indigo-50/30 border-t md:border-t-0 md:border-l border-indigo-100">
                  <CheckCircle2 size={18} className="text-indigo-600 flex-shrink-0" />
                  <span className="font-bold">{row.medientrupp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location / Headquarters */}
      <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract Dark Map/Tech pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900 to-slate-900"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-slate-800/50 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-800 border border-slate-700 mb-8">
              <MapPin size={16} className="text-indigo-400" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Headquarters</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Made in Germany.<br/>Hosted in Germany.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed mb-10">
              In einer digitalisierten Welt ist der Standort des Servers genauso wichtig wie der Firmensitz. Alle unsere Projekte werden DSGVO-konform und mit höchsten Sicherheitsstandards in Deutschland gehostet und entwickelt.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-center lg:justify-start">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-slate-800 rounded-md flex items-center justify-center flex-shrink-0">
                  <Server size={24} className="text-indigo-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">100% DSGVO-konform</span>
                  <span className="text-sm text-slate-500">Premium EU-Server</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-slate-800 rounded-md flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={24} className="text-indigo-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">Zertifizierte Sicherheit</span>
                  <span className="text-sm text-slate-500">Regelmäßige Audits</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-sm aspect-square border border-slate-800 rounded-md flex items-center justify-center relative p-8">
              {/* Subtle pulsing rings */}
              <div className="absolute inset-0 rounded-full border border-slate-700/50 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
              <div className="absolute inset-8 rounded-full border border-slate-700/50"></div>
              <div className="absolute inset-16 rounded-full border border-slate-700/50"></div>
              
              <div className="w-32 h-32 bg-slate-800 flex items-center justify-center rounded-full z-10 shadow-2xl shadow-indigo-900/50 border border-slate-700 relative">
                <MapPin size={40} className="text-indigo-500" />
                {/* Ping Dot */}
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <CtaBanner />
    </div>
  );
}
