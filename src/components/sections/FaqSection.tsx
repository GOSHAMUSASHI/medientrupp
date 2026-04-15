"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Was kostet eine neue Website bei MedienTrupp?",
    answer:
      "Unsere High-Performance Websites starten bei einem Festpreis von 3.500 €. Jedes Projekt ist individuell, aber wir kommunizieren alle Kosten transparent vorab. Nutzen Sie unseren Projekt-Kalkulator weiter oben, um eine sofortige Einschätzung für Ihren speziellen Bedarf zu erhalten.",
  },
  {
    question: "Wie lange dauert ein typisches Projekt?",
    answer:
      "Ein typischer Website-Relaunch dauert bei uns 4 bis 6 Wochen. KI-Automatisierungen können oft schon nach 1 bis 3 Wochen live gehen. Wir legen großen Wert auf schnelle Umsetzung ohne Qualitätsverlust.",
  },
  {
    question: "Gibt es versteckte Kosten?",
    answer:
      "Nein. Wir arbeiten mit transparenten Festpreisen, die wir vor Projektstart in einem klaren Angebot fixieren. Über den Projektrechner erhalten Sie bereits eine erste realistische Kostenindikation.",
  },
  {
    question: "Was beinhaltet die laufende Betreuung?",
    answer:
      "In der laufenden Betreuung kümmern wir uns um schnelles Premium-Hosting, Sicherheitsupdates, Backups, kleinere Inhaltsänderungen und regelmäßige Performance-Reports. Sie müssen sich um keine technischen Details mehr kümmern.",
  },
  {
    question: "Brauche ich wirklich KI in meinem Unternehmen?",
    answer:
      "Künstliche Intelligenz ist kein Hype mehr, sondern ein Hebel für Effizienz. Auch für kleinere mittelständische Unternehmen lohnen sich schon einfache Automatisierungen — wie automatische Rechnungsauslese oder KI-gestützte Kundenkommunikation — um messbar Zeit zu sparen.",
  },
  {
    question: "Welche Prozesse lassen sich wirklich automatisieren?",
    answer:
      "Die häufigsten Quick-Wins im Mittelstand sind: automatische Anfragen-Qualifizierung (Lead Scoring), digitale Eingangsrechnungsverarbeitung, Terminbuchung mit CRM-Sync, Follow-up-E-Mails nach Erstkontakt sowie automatisierte Google-Bewertungsanfragen nach Projektabschluss. Wir analysieren in einem kostenlosen Erstgespräch, welche drei Prozesse in Ihrem Unternehmen den größten Zeitgewinn bringen.",
  },
  {
    question: "Warum ein Festpreis — und was ist darin enthalten?",
    answer:
      "Stundensätze sind das größte Vertrauensproblem klassischer Agenturen. Ein Festpreis bedeutet: Sie kennen Ihr Investment auf den Cent genau, bevor wir anfangen. Enthalten sind Konzept, Design, Entwicklung, Testing, Go-Live und eine 30-tägige Nachbetreuungsphase. Keine Nachkalkulation, keine Überraschungen.",
  },
  {
    question: "Können wir auch nur einen einzelnen Bereich automatisieren?",
    answer:
      "Ja — unser modularer Ansatz ist genau dafür gemacht. Sie müssen nicht alles auf einmal umstellen. Viele unserer Kunden starten mit einem einzigen Automatisierungs-Modul (z. B. KI-Chatbot oder Lead-Erfassung) und erweitern das System schrittweise. Das minimiert Risiko und ermöglicht einen messbaren ROI bereits in den ersten Wochen.",
  },
];

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header — zentriert */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="py-12 border-b border-slate-200 mb-10 text-center"
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
            Häufige Fragen
          </p>
          <h2
            className="font-black tracking-[-0.03em] text-slate-900"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
          >
            Klartext,
            <br />
            <span className="text-indigo-600">keine offenen Fragen.</span>
          </h2>
        </motion.div>

        {/* FAQ Accordion — zentriert */}
        <div className="max-w-3xl mx-auto space-y-4 pb-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`border overflow-hidden transition-colors duration-300 ${
                  isOpen
                    ? "bg-white border-indigo-600 shadow-sm"
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggleOpen(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span
                    className={`font-bold text-base pr-8 transition-colors ${
                      isOpen ? "text-indigo-900" : "text-slate-900"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? "bg-indigo-50 text-indigo-600 rotate-180"
                        : "bg-slate-100 text-slate-400"
                    }`}
                  >
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
                      <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed">
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
