"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, Zap, Sparkles, CheckCircle2 } from "lucide-react";

export const TechShowcaseModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ── Dark Call-Out Bar ──────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-24" aria-labelledby="techshowcase-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            <Sparkles size={13} className="text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300 tracking-widest uppercase">
              Live-Infrastruktur
            </span>
          </div>

          <h2 id="techshowcase-heading" className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 max-w-3xl mx-auto leading-tight">
            Überzeugen Sie sich selbst von <span className="text-indigo-400">unserer Infrastruktur.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Keine endlosen abstrakten Theorien. Wir zeigen Ihnen auf Knopfdruck, wie unsere Kundenanfragen in Echtzeit verarbeitet und gewonnen werden.
          </p>

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-black text-white text-base bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/30"
          >
            <Activity size={20} />
            Live-Demo starten
          </button>
        </div>
      </section>

      {/* ── Modal Overlay ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && <SimulatorModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

// --- Intuitiver Simulator Modal ---
const SimulatorModal = ({ onClose }: { onClose: () => void }) => {
  const [stage, setStage] = useState(0);

  const startDemo = () => {
    setStage(1);
    setTimeout(() => setStage(2), 2500);
    setTimeout(() => setStage(3), 5000);
    setTimeout(() => setStage(4), 6500);
  };

  const steps = [
    { num: 1, title: "Sichtbarkeit", desc: "Besucher klickt auf Ihre Landingpage." },
    { num: 2, title: "KI Automatisierung", desc: "System analysiert und qualifiziert." },
    { num: 3, title: "CRM Übergabe", desc: "Neuer Deal im System angelegt!" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,43,0.85)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Zap size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">System-Demo</h3>
              <p className="text-xs text-slate-500 font-medium tracking-wide">SO WIRD AUS EINEM KLICK EIN KUNDE</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 sm:p-12 text-center">
          <div className="space-y-6 relative max-w-sm mx-auto">
            {/* Connection Line */}
            <div className="absolute left-6 top-8 bottom-8 w-1 bg-slate-100 -z-10 rounded-full" />

            {steps.map((step, i) => {
              const active = stage > i;
              const current = stage === i + 1;
              return (
                <div key={i} className="flex items-center gap-6 text-left relative bg-white p-2">
                  <motion.div
                    animate={{
                      scale: current ? 1.1 : 1,
                      backgroundColor: active ? "#10B981" : current ? "#4F46E5" : "#F1F5F9",
                      color: active || current ? "#fff" : "#94A3B8"
                    }}
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-black z-10 border-4 border-white shadow-sm"
                  >
                    {active ? <CheckCircle2 size={24} /> : step.num}
                  </motion.div>
                  <div className={`transition-opacity duration-300 ${active || current ? "opacity-100" : "opacity-30"}`}>
                    <h4 className="font-black text-slate-900 text-xl">{step.title}</h4>
                    <p className="text-slate-500 text-sm">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex justify-center">
            {stage === 0 || stage === 4 ? (
              <button
                onClick={startDemo}
                className="px-8 py-4 rounded-xl font-bold text-white shadow-lg bg-indigo-600 hover:bg-indigo-700 transition-all active:scale-95"
              >
                {stage === 4 ? "Demo neu starten" : "Prozess simulieren"}
              </button>
            ) : (
              <div className="px-8 py-4 rounded-xl font-bold bg-slate-100 text-slate-500 flex items-center gap-3">
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                  <Activity size={20} className="text-indigo-600" />
                </motion.div>
                System arbeitet...
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
