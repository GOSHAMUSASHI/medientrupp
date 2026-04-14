"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Layers, MousePointerClick, Share2, Bot, Database, Workflow, LineChart } from "lucide-react";

// ── Data ──────────────────────────────────────────────────────────────────────

const visibleItems = [
  { title: "Websites", icon: <Layers size={20} />, desc: "High-Performance B2B Auftritte" },
  { title: "Landingpages", icon: <MousePointerClick size={20} />, desc: "Auf Conversion optimierte Sales-Pages" },
  { title: "Corporate Branding", icon: <Eye size={20} />, desc: "Einheitlicher, professioneller Look" },
  { title: "Social Media Content", icon: <Share2 size={20} />, desc: "Strategische Sichtbarkeit" },
];

const invisibleItems = [
  { title: "Automatisierungen", icon: <Workflow size={20} />, desc: "Kein manuelles Lead-Nurturing mehr" },
  { title: "KI-Integrationen", icon: <Bot size={20} />, desc: "Chatbots und AI-Assistenz im Hintergrund" },
  { title: "Backend-Architektur", icon: <Database size={20} />, desc: "CRM, Datenbanken & APIs" },
  { title: "Daten & Analytics", icon: <LineChart size={20} />, desc: "Echtzeit-Tracking und Conversion-Messung" },
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
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-6 py-12 border-b border-slate-200">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
              Full-Spectrum Agentur
            </p>
            <h2
              id="iceberg-heading"
              className="font-black tracking-[-0.03em] text-slate-900"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
            >
              Was Sie sehen.
              <br />
              Und was{" "}
              <span className="text-violet-600">darunter liegt.</span>
            </h2>
          </div>

          {/* Tab toggle — editorial underline style */}
          <div className="flex items-end gap-0 border-b border-slate-200 pb-0 self-end">
            <button
              onClick={() => setActive("visible")}
              className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold transition-colors border-b-2 ${
                active === "visible"
                  ? "text-violet-600 border-violet-600"
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
                  ? "text-violet-600 border-violet-600"
                  : "text-slate-400 border-transparent hover:text-slate-700"
              }`}
            >
              <EyeOff size={16} />
              Darunter
            </button>
          </div>
        </div>

        {/* Content — animated list */}
        <div className="min-h-[320px] py-10">
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
                  className={`flex items-start gap-5 py-8 ${
                    i % 2 === 0 && i < (active === "visible" ? visibleItems : invisibleItems).length - 1
                      ? "md:border-r border-slate-200"
                      : ""
                  } ${i < (active === "visible" ? visibleItems : invisibleItems).length - 2 ? "border-b border-slate-200" : ""} ${
                    i % 2 === 1 ? "md:pl-10" : ""
                  }`}
                >
                  {/* Icon square */}
                  <div className="w-10 h-10 bg-white border border-slate-200 flex items-center justify-center text-violet-600 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-slate-900 mb-1">
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
