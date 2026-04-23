"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Was kostet ein Projekt bei Medientrupp und welche Folgekosten entstehen?",
    answer:
      "Sie erhalten vor Projektbeginn einen verbindlichen Festpreis, schriftlich fixiert. Keine Stundensätze, keine Nachkalkulation, keine Überraschungen. Enthalten sind Konzept, Design, Entwicklung, Testing, Go-Live und 30 Tage Nachbetreuung. Laufende Betreuung und Erweiterungen werden separat kalkuliert.",
  },
  {
    question: "Wie lange dauert es von der Beauftragung bis zum Go-Live?",
    answer:
      "Websites gehen typischerweise in 3 bis 6 Wochen live. KI-Automatisierungen sind oft in 1 bis 3 Wochen produktiv. Größere KI-Plattformen und Individual-Projekte planen wir in 8 bis 12 Wochen. Den konkreten Zeitrahmen fixieren wir im Angebot, verbindlich mit Meilensteinen.",
  },
  {
    question: "Gehören die Systeme, Daten und Quellcodes nach Projektende uns?",
    answer:
      "Ja. Sie erhalten nach Abnahme volle Eigentumsrechte an Code, Design, Inhalten und Daten. Keine Abhängigkeit von proprietären Agentur-Systemen. Sie können das Projekt jederzeit zu einem anderen Anbieter mitnehmen. Wir dokumentieren alles entsprechend.",
  },
  {
    question: "Was passiert, wenn wir die Zusammenarbeit irgendwann beenden?",
    answer:
      "Nichts Unangenehmes. Laufende Betreuungsverträge sind monatlich kündbar. Sie behalten alle Zugänge, Quelldaten und Dokumentation. Auf Wunsch übergeben wir sauber an Ihr internes Team oder einen neuen Dienstleister. Wir setzen auf Qualität statt Vertragsbindung.",
  },
  {
    question: "Arbeiten Sie mit festen Ansprechpartnern oder wechselndem Team?",
    answer:
      "Sie haben vom ersten Gespräch bis zum Go-Live denselben Ansprechpartner. Kein Ticket-System, keine Projekt-Manager-Kette. Das Kernteam aus Strategie, Design und Entwicklung bleibt über die gesamte Laufzeit identisch, auch in der späteren Betreuung.",
  },
  {
    question: "Wo werden unsere Daten gehostet und wie ist die DSGVO-Lage?",
    answer:
      "Alle Systeme laufen auf DSGVO-konformen Servern in Deutschland, primär in Frankfurt. Keine US-Clouds für personenbezogene Daten, keine rechtlichen Grauzonen. Auftragsverarbeitungsverträge nach Art. 28 DSGVO stellen wir standardmäßig bereit. Auf Wunsch auch Hosting in Ihrer eigenen Infrastruktur.",
  },
  {
    question: "Für welche Unternehmensgrößen und Branchen arbeiten Sie?",
    answer:
      "Unser Fokus liegt auf dem deutschen Mittelstand mit 30 bis 500 Mitarbeitern. Typische Branchen sind Industrie, Logistik, Finanzen, Gesundheit, Handwerk und B2B-Dienstleister. Wir arbeiten nicht mit B2C-Startups, Krypto-Projekten oder Glücksspiel. Ein erstes Gespräch klärt schnell, ob wir zueinander passen.",
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
          className="py-8 md:py-12 border-b border-slate-200 mb-6 md:mb-10 text-center"
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
            Häufige Fragen
          </p>
          <h2
            className="font-semibold tracking-[-0.03em] text-slate-900"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
          >
            Klartext,
            <br />
            <span className="text-indigo-600">keine offenen Fragen.</span>
          </h2>
        </motion.div>

        {/* FAQ Accordion — zentriert */}
        <div className="max-w-3xl mx-auto space-y-3 md:space-y-4 pb-10 md:pb-16">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`rounded-xl border overflow-hidden transition-colors duration-300 ${
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
                    className={`font-semibold text-base pr-8 transition-colors ${
                      isOpen ? "text-indigo-900" : "text-slate-900"
                    }`}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
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
