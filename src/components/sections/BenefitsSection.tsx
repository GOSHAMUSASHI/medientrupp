"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Shield, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: <Zap size={24} />,
    title: "0,09s Ladezeit garantiert",
    description: "38× schneller als der Marktdurchschnitt. Jede Sekunde Ladezeit kostet Sie 7% Conversion Rate.",
  },
  {
    icon: <Shield size={24} />,
    title: "100% Festpreis Garantie",
    description: "Kein Stundensatz, kein Overrun. Wir fixieren den Preis vor Projektstart — schriftlich und verbindlich.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Systeme, die skalieren",
    description: "Keine Einmal-Website. Wir bauen Systeme, die mit Ihrem Wachstum mitgehen — von 100 auf 100.000 Besucher/Monat.",
  },
];

export const BenefitsSection = () => {
  return (
    <section className="bg-white py-16 md:py-20 text-slate-900 overflow-hidden relative border-t border-slate-200">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
              Der Medientrupp Unterschied
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Fokus auf Ihr Kerngeschäft statt digitaler Baustellen.
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Sicher, Sie könnten einen Baukasten nutzen oder den Praktikanten ranlassen. Aber im Mittelstand zahlt sich Professionalität aus. Wir bauen Systeme, die Leads generieren, Zeit sparen und Ihre Marke stärken.
            </p>

            <div className="space-y-4">
              {[
                "Kein Fachchinesisch. Klare Kommunikation.",
                "Echter Business-Impact statt nur bunte Bilder.",
                "Ein Ansprechpartner für alles Digitale.",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-indigo-600 flex-shrink-0" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Benefit Cards */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
              hidden: { opacity: 0 }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                }}
                className={`bg-white border border-slate-200 shadow-xl shadow-slate-200/50 p-6 rounded-md h-full flex flex-col hover:-translate-y-1 transition-transform duration-300 ${
                  index === 2 ? "sm:col-span-2" : ""
                }`}
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-md flex items-center justify-center text-indigo-600 mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">{benefit.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};
