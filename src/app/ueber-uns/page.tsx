"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Code2, ShieldCheck, Scale, Compass, MapPin, Server, Shield } from "lucide-react";
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

// ── Germany Server Graphic — Premium Infrastruktur-Dashboard ─────────────────

const DE_PATH =
  "M93,14 L100,11 L110,13 L120,10 L131,16 L139,23 L144,32 L149,40 L146,50 L150,59 L145,68 L149,77 L145,86 L148,95 L142,102 L134,108 L127,116 L122,126 L115,135 L107,143 L101,153 L96,162 L89,170 L80,178 L70,182 L61,178 L55,170 L50,160 L46,150 L41,139 L39,128 L37,118 L39,108 L37,97 L40,87 L43,77 L47,67 L52,58 L57,49 L63,40 L70,32 L78,23 Z";

// Node positions in the SVG viewBox (200×195)
const nodes = [
  { id: "fra", city: "Frankfurt",  role: "Primary DC",    cx: 91,  cy: 122, primary: true  },
  { id: "ber", city: "Berlin",     role: "Backup",        cx: 122, cy: 65,  primary: false },
  { id: "ham", city: "Hamburg",    role: "Edge",          cx: 80,  cy: 42,  primary: false },
  { id: "muc", city: "München",    role: "CDN",           cx: 104, cy: 158, primary: false },
];

// Connections: from Frankfurt to all others
const connections = [
  { x1: 91, y1: 122, x2: 122, y2: 65  },
  { x1: 91, y1: 122, x2: 80,  y2: 42  },
  { x1: 91, y1: 122, x2: 104, y2: 158 },
];

const GermanyServerGraphic = () => (
  <div className="w-full max-w-[440px] shadow-2xl shadow-slate-300/40">

    {/* ── Browser chrome header ── */}
    <div className="bg-slate-900 px-4 py-3 flex items-center gap-3">
      <div className="flex gap-1.5 shrink-0">
        <span className="w-3 h-3 rounded-full bg-slate-700" />
        <span className="w-3 h-3 rounded-full bg-slate-700" />
        <span className="w-3 h-3 rounded-full bg-slate-700" />
      </div>
      <div className="flex-1 bg-slate-800 px-3 py-1.5 flex items-center gap-2 min-w-0">
        <Shield size={10} className="text-emerald-400 shrink-0" />
        <span className="text-[10px] text-slate-400 font-mono truncate">
          infrastructure.medientrupp.de
        </span>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider">Live</span>
      </div>
    </div>

    {/* ── Map body ── */}
    <div className="bg-white border-x border-b border-slate-200">
      <div className="relative" style={{ aspectRatio: "4 / 3.1" }}>

        {/* Dot-grid background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: "radial-gradient(circle, #cbd5e1 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* SVG: DE outline + connections + nodes */}
        <svg
          viewBox="0 0 200 195"
          className="absolute inset-0 w-full h-full"
          aria-label="Deutschland Infrastruktur-Karte"
        >
          {/* Country fill */}
          <path
            d={DE_PATH}
            fill="#f8fafc"
            stroke="#c8d2de"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />

          {/* Animated connection lines from Frankfurt */}
          {connections.map((c, i) => (
            <motion.line
              key={i}
              x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
              stroke="#a5b4fc"
              strokeWidth="1"
              strokeDasharray="4 3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.15, duration: 0.6 }}
            />
          ))}

          {/* Nodes */}
          {nodes.map((n, i) => (
            <motion.g
              key={n.id}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.12, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: `${n.cx}px`, originY: `${n.cy}px` }}
            >
              {n.primary ? (
                <>
                  {/* Outer pulse ring */}
                  <circle cx={n.cx} cy={n.cy} r="10" fill="#4f46e5" fillOpacity="0.12">
                    <animate attributeName="r" values="8;14;8" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="fill-opacity" values="0.15;0;0.15" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                  {/* Main dot */}
                  <rect x={n.cx - 7} y={n.cy - 7} width="14" height="14" fill="#4f46e5" />
                  {/* Server icon simplified */}
                  <rect x={n.cx - 4} y={n.cy - 2} width="8" height="2" fill="white" rx="0" />
                  <rect x={n.cx - 4} y={n.cy + 1} width="8" height="2" fill="white" opacity="0.6" rx="0" />
                </>
              ) : (
                <>
                  <circle cx={n.cx} cy={n.cy} r="5" fill="white" stroke="#818cf8" strokeWidth="1.5" />
                  <circle cx={n.cx} cy={n.cy} r="2" fill="#6366f1" />
                </>
              )}
              {/* City label */}
              <text
                x={n.cx + (n.id === "ber" ? 8 : n.id === "ham" ? -8 : 9)}
                y={n.cy + (n.id === "muc" ? 14 : 1)}
                fontSize="7"
                fontWeight="700"
                fill="#1e293b"
                textAnchor={n.id === "ham" ? "end" : "start"}
                fontFamily="system-ui, sans-serif"
              >
                {n.city}
              </text>
              {n.primary && (
                <text
                  x={n.cx + 9}
                  y={n.cy + 8}
                  fontSize="5.5"
                  fill="#6366f1"
                  fontWeight="600"
                  fontFamily="system-ui, sans-serif"
                >
                  {n.role}
                </text>
              )}
            </motion.g>
          ))}
        </svg>

        {/* EU Shield badge — top right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-slate-200 px-2.5 py-1.5 shadow-sm">
          <Shield size={11} className="text-indigo-600" />
          <span className="text-[9px] font-black tracking-[0.15em] uppercase text-slate-700">EU · DSGVO</span>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="grid grid-cols-3 divide-x divide-slate-100 border-t border-slate-100">
        {[
          { value: "99.9%", label: "Uptime SLA" },
          { value: "4 DCs",  label: "DE Standorte" },
          { value: "ISO 27001", label: "Zertifiziert" },
        ].map((s) => (
          <div key={s.label} className="py-3 text-center">
            <p className="text-sm font-black text-slate-900 leading-none tracking-tight">{s.value}</p>
            <p className="text-[8px] font-semibold uppercase tracking-widest text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function UeberUnsPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden relative">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-[0.25] pointer-events-none" />
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
      <section className="pb-12 md:pb-24">
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
              <div className="p-4 md:p-6 text-left font-bold text-orange-500 bg-slate-50/50">
                Traditionelle Agentur
              </div>
              <div className="p-4 md:p-6 text-center lg:text-left flex items-center justify-center lg:justify-start gap-3 bg-indigo-50 border-t md:border-t-0 border-indigo-100/50 md:border-l md:border-indigo-100">
                <span className="font-black text-indigo-700 tracking-tight text-lg">Medientrupp</span>
              </div>
            </div>

            {/* List Rows */}
            {comparison.map((row, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-200 last:border-b-0 hover:bg-white transition-colors">
                <div className="p-4 md:p-6 font-bold text-slate-900 flex items-center justify-center md:justify-start md:border-r border-slate-100 text-center md:text-left">
                  {row.category}
                </div>
                <div className="p-4 md:p-6 flex flex-row items-center gap-3 text-slate-500 justify-start text-left">
                  <XCircle size={18} className="text-orange-500 flex-shrink-0" />
                  <span className="font-medium">{row.traditional}</span>
                </div>
                <div className="p-4 md:p-6 flex flex-row items-center gap-3 text-slate-900 justify-start text-left bg-indigo-50/30 border-t md:border-t-0 md:border-l border-indigo-100">
                  <CheckCircle2 size={18} className="text-indigo-600 flex-shrink-0" />
                  <span className="font-bold">{row.medientrupp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location / Headquarters */}
      <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200 relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 eyebrow-badge mb-8">
              <MapPin size={16} className="text-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-700">Headquarters</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Made in Germany.<br/>Hosted in Germany.
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed mb-10">
              In einer digitalisierten Welt ist der Standort des Servers genauso wichtig wie der Firmensitz. Alle unsere Projekte werden DSGVO-konform und mit höchsten Sicherheitsstandards in Deutschland gehostet und entwickelt.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-8 justify-center lg:justify-start">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                  <Server size={24} className="text-indigo-600" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">100% DSGVO-konform</span>
                  <span className="text-sm text-slate-500">Premium EU-Server</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 bg-indigo-50 border border-indigo-100 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck size={24} className="text-indigo-600" />
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">Zertifizierte Sicherheit</span>
                  <span className="text-sm text-slate-500">Regelmäßige Audits</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full flex justify-center lg:justify-end">
            <GermanyServerGraphic />
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <CtaBanner />
    </div>
  );
}
