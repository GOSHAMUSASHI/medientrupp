"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, Shield, TrendingUp, Code2 } from "lucide-react";

const benefits = [
  {
    icon: <Zap size={22} />,
    title: "Unter 0,1 s Ladezeit",
    description:
      "Nicht Wordpress, nicht Wix — React & Next.js auf Edge-Servern. Ihre Website lädt 38× schneller als der Marktdurchschnitt. Jede Sekunde Ladezeit kostet 7 % Conversion.",
    accent: "text-indigo-600",
    bg: "bg-indigo-50",
  },
  {
    icon: <Shield size={22} />,
    title: "100 % Festpreis-Garantie",
    description:
      "Kein Stundensatz, kein Overrun, keine Überraschungsrechnung. Wir fixieren Preis und Umfang vor Projektstart — schriftlich und rechtsverbindlich.",
    accent: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: <TrendingUp size={22} />,
    title: "Systeme, die mit Ihnen wachsen",
    description:
      "Keine Einmal-Website, die nach 2 Jahren veraltet ist. Unsere Architektur skaliert von 100 auf 100.000 Besucher/Monat — ohne Umbau, ohne Mehrkosten.",
    accent: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    icon: <Code2 size={22} />,
    title: "Ihr Code. Ihre Daten. Immer.",
    description:
      "Sie erhalten nach Projektabschluss den vollständigen Quellcode und alle Zugänge. Keine Abhängigkeit von uns, keine Hostingfalle, keine Lock-in-Klauseln.",
    accent: "text-amber-600",
    bg: "bg-amber-50",
  },
];

export const BenefitsSection = () => {
  return (
    <section className="bg-white py-20 md:py-24 relative overflow-hidden border-t border-slate-100">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
              Warum Medientrupp
            </p>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Digitale Systeme, die für Sie{" "}
              <span className="text-indigo-600">arbeiten.</span>
            </h2>
            <p className="text-lg text-slate-500 mb-8 leading-relaxed">
              Ein Baukasten oder der Neffe des Nachbarn sind keine digitale Strategie. Wir bauen Infrastruktur, die Leads generiert, Prozesse automatisiert und Ihre Marke von der Konkurrenz abhebt — langfristig und messbar.
            </p>

            <div className="space-y-3.5">
              {[
                "Kein Fachchinesisch — klare Kommunikation auf Augenhöhe.",
                "Messbarer Business-Impact, keine schönen Bilder ohne Ergebnis.",
                "Ein fester Ansprechpartner für alles Digitale.",
                "Skalierbare Systeme statt Einmal-Projekte.",
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + index * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 size={18} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium text-sm leading-snug">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Benefit Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-slate-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 p-6 rounded-xl flex flex-col"
              >
                <div className={`w-10 h-10 ${benefit.bg} rounded-lg flex items-center justify-center ${benefit.accent} mb-4`}>
                  {benefit.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-tight">
                  {benefit.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
