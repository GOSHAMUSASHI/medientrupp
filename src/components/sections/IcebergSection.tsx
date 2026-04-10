"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Code, Layers, MousePointerClick, Share2, Bot, Database, Workflow, LineChart } from "lucide-react";

export const IcebergSection = () => {
  const [isVisible, setIsVisible] = useState(true);

  const visibleItems = [
    { title: "Websites", icon: <Layers size={24} />, desc: "High-Performance B2B Auftritte" },
    { title: "Landingpages", icon: <MousePointerClick size={24} />, desc: "Auf Conversion optimierte Sales-Pages" },
    { title: "Corporate Branding", icon: <Eye size={24} />, desc: "Einheitlicher, professioneller Look" },
    { title: "Social Media Content", icon: <Share2 size={24} />, desc: "Strategische Sichtbarkeit" },
  ];

  const invisibleItems = [
    { title: "Automatisierungen", icon: <Workflow size={24} />, desc: "Kein manuelles Lead-Nurturing mehr" },
    { title: "KI-Integrationen", icon: <Bot size={24} />, desc: "Chatbots und AI-Assistenz im Hintergrund" },
    { title: "Backend-Architektur", icon: <Database size={24} />, desc: "CRM, Datenbanken & APIs" },
    { title: "Daten & Analytics", icon: <LineChart size={24} />, desc: "Echtzeit-Tracking und Conversion-Messung" },
  ];

  return (
    <section className="bg-slate-50 py-24 sm:py-32" aria-labelledby="iceberg-heading">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
            Full-Spectrum Agentur
          </p>
          <h2 id="iceberg-heading" className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-8">
            Was Sie sehen.<br/>Und was Sie <span className="text-indigo-600">nicht</span> sehen.
          </h2>
          
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 bg-slate-200/50 p-1.5 rounded-2xl shadow-inner">
            <button
              onClick={() => setIsVisible(true)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                isVisible ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Eye size={18} /> Was man sieht
            </button>
            <button
              onClick={() => setIsVisible(false)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                !isVisible ? "bg-indigo-600 text-white shadow-lg" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <EyeOff size={18} /> Was man nicht sieht
            </button>
          </div>
        </div>

        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            {isVisible ? (
              <motion.div
                key="visible"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {visibleItems.map((item, i) => (
                  <div key={i} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-5">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-500 font-medium">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="invisible"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {invisibleItems.map((item, i) => (
                  <div key={i} className="bg-slate-900 p-8 rounded-2xl border border-slate-800 shadow-xl">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 text-indigo-500 flex items-center justify-center mb-5">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-black text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400 font-medium">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
