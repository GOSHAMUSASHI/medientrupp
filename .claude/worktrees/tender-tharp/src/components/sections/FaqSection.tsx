"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

const faqs = [
  // ── Pricing & Budget ─────────────────────────────────────────────────────
  {
    category: "Preis & Budget",
    question: "Was kostet eine neue Website bei Medientrupp?",
    answer:
      "Unsere High-Performance Websites starten bei einem Festpreis von 3.500 €. Je nach Umfang — mit KI-Integration, individuellem Design-System oder Recruiting-Modul — liegt der Projektpreis typischerweise zwischen 3.500 € und 12.000 €. Nutzen Sie unseren Projekt-Kalkulator, um in 3 Minuten eine exakte Kostenindikation zu erhalten. Kein Telefonat erforderlich.",
  },
  {
    category: "Preis & Budget",
    question: "Gibt es versteckte Kosten oder Nachträge?",
    answer:
      "Nein — und das ist einer unserer wichtigsten Grundsätze. Wir arbeiten ausschließlich mit Festpreisen, die wir vor Projektstart in einem klaren Angebot schriftlich fixieren. Was drin steht, wird geliefert. Kein Stundensatz, kein Overrun, keine Überraschungsrechnung. Sollten Sie nach Projektstart neue Wünsche haben, besprechen wir diese separat und transparent.",
  },
  // ── Prozess & Timeline ────────────────────────────────────────────────────
  {
    category: "Prozess & Timeline",
    question: "Wie lange dauert ein typisches Projekt?",
    answer:
      "Ein vollständiger Website-Relaunch dauert bei uns 4 bis 6 Wochen. Woche 1: Kick-off, Briefing, Strategie. Wochen 2–5: Design und Entwicklung im Hintergrund — Sie müssen dabei kaum aktiv sein. Woche 6: Abnahme, Testphase und Go-Live. KI-Automatisierungen können je nach Komplexität bereits nach 1 bis 3 Wochen live gehen.",
  },
  {
    category: "Prozess & Timeline",
    question: "Wie viel Zeit muss ich selbst investieren?",
    answer:
      "Erheblich weniger als bei herkömmlichen Agenturen. Der Kick-off dauert ca. 45 Minuten. Danach sind es meist nur 1–2 Feedback-Runden à 30 Minuten. Wir benötigen von Ihnen: Zugang zu bestehenden Systemen, Ihr Logo/Branding falls vorhanden, und Ihren inhaltlichen Input (was macht Ihr Unternehmen, was sind Ihre Ziele). Den Rest übernehmen wir.",
  },
  // ── Eigentum & Übergabe ───────────────────────────────────────────────────
  {
    category: "Eigentum & Übergabe",
    question: "Wem gehört der Code nach Projektabschluss?",
    answer:
      "Ihnen. Vollständig. Sie erhalten nach Projektabschluss den kompletten Quellcode, alle Zugänge (CMS, Hosting, Domain, Analytics) und eine technische Dokumentation. Es gibt keine versteckten Lizenzen, keine Nutzungsgebühren und keine Abhängigkeit von uns. Sie können jederzeit zu einem anderen Anbieter wechseln — ohne Datenverlust.",
  },
  {
    category: "Eigentum & Übergabe",
    question: "Was passiert, wenn wir nach dem Projekt nicht weiterarbeiten wollen?",
    answer:
      "Dann übergeben wir sauber und vollständig. Sie erhalten alle Zugänge, den Quellcode und eine ausführliche Übergabedokumentation. Unsere Hosting-Pakete sind monatlich kündbar — keine Mindestvertragslaufzeit. Sie sind zu keiner weiteren Zusammenarbeit verpflichtet.",
  },
  // ── Technologie ──────────────────────────────────────────────────────────
  {
    category: "Technologie",
    question: "Warum Next.js statt WordPress oder Jimdo?",
    answer:
      "WordPress und Baukasten-Systeme sind für Content-Blogs konzipiert, nicht für leistungsstarke Unternehmensauftritte. Unsere Websites auf Basis von React und Next.js laden in unter 0,1 Sekunden, erreichen Lighthouse-Scores von 100/100 und können beliebig skaliert werden. Das bedeutet: bessere Google-Rankings, niedrigere Absprungraten und messbar mehr Leads.",
  },
  {
    category: "Technologie",
    question: "Braucht mein Unternehmen wirklich KI?",
    answer:
      "Nicht jedes Unternehmen braucht sofort ein vollständiges KI-System — aber fast jedes profitiert davon. Schon einfache Automatisierungen wie ein 24/7-Chatbot für Erstqualifizierung, automatische Terminbuchung oder intelligentes Lead-Routing können Ihnen pro Monat 10–30 Stunden manueller Arbeit ersparen. Wir analysieren im Kick-off ehrlich, wo der sinnvollste Hebel für Ihr Unternehmen liegt.",
  },
  // ── Ergebnisse & Garantien ────────────────────────────────────────────────
  {
    category: "Ergebnisse & Garantien",
    question: "Welche Ergebnisse kann ich realistisch erwarten?",
    answer:
      "Das hängt von Ihrer Ausgangssituation, Ihrem Markt und Ihrem Einsatz ab — wir machen keine unrealistischen Versprechen. Was wir garantieren: eine technisch einwandfreie, schnelle Website, die Ihre Zielgruppe anspricht und konvertiert. Was unsere Kunden im Schnitt berichten: +30–120 % mehr qualifizierte Anfragen, deutlich verbesserte Google-Sichtbarkeit und signifikant reduzierter manueller Aufwand.",
  },
  {
    category: "Ergebnisse & Garantien",
    question: "Was passiert, wenn ich mit dem Ergebnis nicht zufrieden bin?",
    answer:
      "Wir arbeiten iterativ und zeigen Ihnen Zwischenstände — Überraschungen am Ende gibt es nicht. Sollte dennoch etwas nicht Ihren Vorstellungen entsprechen, überarbeiten wir es im Rahmen des vereinbarten Projekts ohne Mehrkosten. Unsere Qualitätsgarantie: Abgenommen wird erst, wenn Sie vollständig zufrieden sind.",
  },
  // ── Betreuung ─────────────────────────────────────────────────────────────
  {
    category: "Laufende Betreuung",
    question: "Was beinhaltet die laufende Betreuung nach Go-Live?",
    answer:
      "In unserem monatlichen Betreuungspaket (ab 100 €/Monat) kümmern wir uns um: schnelles Premium-Hosting in deutschen Rechenzentren, tägliche Backups, Sicherheitsupdates, kleinere Inhaltsanpassungen (bis 1 Stunde/Monat), Google-Performance-Reports und priorisierten Support. Das Paket ist monatlich kündbar — keine Mindestlaufzeit.",
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export const FaqSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 md:py-24 border-t border-slate-100" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
            Häufige Fragen
          </p>
          <h2 id="faq-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            Klartext, keine offenen Fragen.
          </h2>
          <p className="text-slate-500 text-lg">
            Alles, was Sie vor einer Entscheidung wissen sollten.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.05, 0.3) }}
                className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                  isOpen
                    ? "bg-white border-indigo-200 shadow-md shadow-indigo-100/50"
                    : "bg-white border-slate-200 hover:border-indigo-200"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-start justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 rounded-xl"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1 pr-4">
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 block mb-1">
                      {faq.category}
                    </span>
                    <span className={`font-bold text-base leading-snug transition-colors ${isOpen ? "text-indigo-900" : "text-slate-900"}`}>
                      {faq.question}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 mt-0.5 ${isOpen ? "bg-indigo-100 text-indigo-600 rotate-180" : "bg-slate-100 text-slate-400"}`}>
                    <ChevronDown size={16} />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-4 mt-0">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 text-slate-500 text-sm"
        >
          Noch Fragen?{" "}
          <Link href="mailto:impact@medientrupp.de" className="text-indigo-600 font-semibold hover:underline">
            Schreiben Sie uns direkt.
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
