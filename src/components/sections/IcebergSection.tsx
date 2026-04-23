"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Layers, MousePointerClick, Share2, Bot, Database, Workflow, LineChart } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const visibleItems = [
  { title: "Websites", icon: <Layers size={20} />, desc: "Schnelle, suchmaschinenoptimierte Unternehmensauftritte" },
  { title: "Landingpages", icon: <MousePointerClick size={20} />, desc: "Seiten, die Besucher zuverlässig in Anfragen verwandeln" },
  { title: "Corporate Branding", icon: <Eye size={20} />, desc: "Logo, Farben und Design, einheitlich auf allen Kanälen" },
  { title: "Social Media & Video", icon: <Share2 size={20} />, desc: "Content, der Ihre Zielgruppe regelmäßig erreicht" },
];

const invisibleItems = [
  { title: "Automatisierungen", icon: <Workflow size={20} />, desc: "Kein manuelles Nachfassen von Interessenten. Das System erledigt es." },
  { title: "KI-Integrationen", icon: <Bot size={20} />, desc: "Ein digitaler Assistent beantwortet Kundenfragen rund um die Uhr." },
  { title: "Backend-Architektur", icon: <Database size={20} />, desc: "Kundenverwaltung, Datenbanken und Schnittstellen zu externen Systemen." },
  { title: "Daten & Analytics", icon: <LineChart size={20} />, desc: "Klare Zahlen darüber, woher Anfragen kommen und was daraus wird." },
];

// ── Section ───────────────────────────────────────────────────────────────────

export const IcebergSection = () => {
  const [active, setActive] = useState<"visible" | "invisible">("visible");

  return (
    <section
      className="bg-slate-50 border-t border-slate-200"
      aria-labelledby="iceberg-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header with toggle */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-6 py-8 md:py-12 border-b border-slate-200">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
              Vordergrund & Hintergrund
            </p>
            <h2
              id="iceberg-heading"
              className="font-semibold tracking-[-0.03em] text-slate-900"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
            >
              Alles, was Ihr Unternehmen
              <br />
              <span className="text-indigo-600">digital braucht.</span>
            </h2>
          </div>

          {/* Tab toggle — editorial underline style */}
          <div className="flex items-end gap-0 border-b border-slate-200 pb-0 self-end">
            <button
              onClick={() => setActive("visible")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors border-b-2 ${
                active === "visible"
                  ? "text-indigo-600 border-indigo-600"
                  : "text-slate-400 border-transparent hover:text-slate-700"
              }`}
            >
              <Eye size={16} />
              Sichtbar
            </button>
            <button
              onClick={() => setActive("invisible")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors border-b-2 ${
                active === "invisible"
                  ? "text-indigo-600 border-indigo-600"
                  : "text-slate-400 border-transparent hover:text-slate-700"
              }`}
            >
              <EyeOff size={16} />
              Darunter
            </button>
          </div>
        </div>

        {/* Content — animated list */}
        <div className="min-h-[280px] py-5 md:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 md:grid-cols-2"
            >
              {(active === "visible" ? visibleItems : invisibleItems).map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-start gap-5 py-5 md:py-8 ${
                    i % 2 === 0 && i < (active === "visible" ? visibleItems : invisibleItems).length - 1
                      ? "md:border-r border-slate-200"
                      : ""
                  } ${i < (active === "visible" ? visibleItems : invisibleItems).length - 2 ? "border-b border-slate-200" : ""} ${
                    i % 2 === 1 ? "md:pl-10" : ""
                  }`}
                >
                  {/* Icon square */}
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
