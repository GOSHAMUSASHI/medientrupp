"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Was kostet eine neue Website bei MedienTrupp?",
    answer: "Unsere High-Performance Websites starten bei einem Festpreis von 3.500 €. Jedes Projekt ist individuell, aber wir kommunizieren alle Kosten transparent vorab. Nutzen Sie unseren Projekt-Kalkulator weiter oben, um eine sofortige Einschätzung für Ihren speziellen Bedarf zu erhalten.",
  },
  {
    question: "Wie lange dauert ein typisches Projekt?",
    answer: "Ein typischer Website-Relaunch dauert bei uns 4 bis 6 Wochen. KI-Automatisierungen können oft schon nach 1 bis 3 Wochen live gehen. Wir legen großen Wert auf schnelle Umsetzung ohne Qualitätsverlust.",
  },
  {
    question: "Gibt es versteckte Kosten?",
    answer: "Nein. Wir arbeiten mit transparenten Festpreisen, die wir vor Projektstart in einem klaren Angebot fixieren. Über den Projektrechner erhalten Sie bereits eine erste realistische Kostenindikation.",
  },
  {
    question: "Was beinhaltet die laufende Betreuung?",
    answer: "In der laufenden Betreuung kümmern wir uns um schnelles Premium-Hosting, Sicherheitsupdates, Backups, kleinere Inhaltsänderungen und regelmäßige Performance-Reports. Sie müssen sich um keine technischen Details mehr kümmern.",
  },
  {
    question: "Brauche ich wirklich KI in meinem Unternehmen?",
    answer: "Künstliche Intelligenz ist kein Hype mehr, sondern ein Hebel für Effizienz. Auch für kleinere mittelständische Unternehmen lohnen sich schon einfache Automatisierungen, wie automatische Rechnungsauslese oder KI-gestützte Kundenkommunikation, um messbar Zeit zu sparen.",
  },
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-24 border-t border-slate-200">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
            Häufige Fragen
          </p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">
            Klartext, keine offenen Fragen.
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${
                  isOpen ? "bg-white border-indigo-200 shadow-sm" : "bg-white border-slate-200 hover:border-indigo-100"
                }`}
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full px-6 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className={`font-bold text-lg pr-8 transition-colors ${isOpen ? "text-indigo-900" : "text-slate-900"}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? "bg-indigo-100 text-indigo-600 rotate-180" : "bg-slate-100 text-slate-400"}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
