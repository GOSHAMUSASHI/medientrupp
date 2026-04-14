"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, CheckCircle2 } from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

type Message = { id: string; text: string; sender: "ai" | "user" };
type Status  = "IDLE" | "PROCESSING" | "AUTOMATION_MATCHED";

// ── Section ───────────────────────────────────────────────────────────────────

export const AiCloserSimulation = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hallo! Womit können wir Ihnen helfen, mehr Kunden zu gewinnen?", sender: "ai" },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus]   = useState<Status>("IDLE");
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const simulateLead = () => {
    if (status === "PROCESSING") return;
    setStatus("PROCESSING");

    const userMsg: Message = {
      id: Date.now().toString(),
      text: "Unser Shop stagniert bei 20.000 €/Monat. Wir verlieren Kunden im Checkout, obwohl wir in Werbung investieren.",
      sender: "user",
    };
    setMessages((p) => [...p, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      setMessages((p) => [...p, { id: Date.now().toString(), sender: "ai", text: "Vielen Dank für die Einschätzung. Ich sehe zwei klare Hebel: eine hohe Warenkorbabbruch-Rate und fehlendes Retargeting im Backend." }]);

      setTimeout(() => {
        setMessages((p) => [...p, { id: Date.now().toString(), sender: "ai", text: "Unser Vorschlag: Performance-Optimierung des Checkout-Prozesses + automatisiertes KI-Follow-up für Warenkorbabbrecher." }]);

        setTimeout(() => {
          setIsTyping(false);
          setMessages((p) => [...p, { id: Date.now().toString(), sender: "ai", text: "Erfahrungswert aus ähnlichen Projekten: +150–200 % Umsatz im ersten Quartal. Möchten Sie ein kostenloses Erstgespräch vereinbaren?" }]);

          setTimeout(() => setStatus("AUTOMATION_MATCHED"), 1500);
        }, 2500);
      }, 2500);
    }, 1500);
  };

  return (
    <section
      className="bg-slate-50 border-t border-slate-200"
      aria-labelledby="aismulator-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="py-12 border-b border-slate-200"
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
            KI-Assistent
          </p>
          <h2
            id="aismulator-heading"
            className="font-black tracking-[-0.03em] text-slate-900"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
          >
            Ihr digitaler Mitarbeiter —
            <br />
            <span className="text-indigo-600">24⁄7 verfügbar.</span>
          </h2>
        </motion.div>

        {/* Split: chat UI | rule | copy + CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] py-12 gap-0">

          {/* LEFT — Chat UI */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pr-12"
          >
            <div
              className="bg-white border border-slate-200 flex flex-col overflow-hidden"
              style={{ boxShadow: "4px 4px 0 #e2e8f0", minHeight: 380, maxHeight: 520 }}
            >
              {/* Chat header */}
              <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-indigo-600" />
                    <motion.div
                      animate={{ scale: [1, 2.2], opacity: [1, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 border border-indigo-600"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">MedienTrupp KI-Assistent</p>
                    <p className="text-[10px] text-slate-400 tracking-wide">24⁄7 verfügbar</p>
                  </div>
                </div>
                <Bot className="text-indigo-600" size={22} />
              </div>

              {/* Messages */}
              <div
                ref={chatRef}
                className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4 scroll-smooth"
              >
                <AnimatePresence>
                  {messages.map((m) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 8, x: m.sender === "user" ? 16 : -16 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`max-w-[85%] px-4 py-3 text-sm leading-relaxed font-medium ${
                        m.sender === "user"
                          ? "self-end bg-indigo-600 text-white"
                          : "self-start bg-white border border-slate-200 text-slate-700"
                      }`}
                    >
                      {m.text}
                    </motion.div>
                  ))}
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="self-start bg-white border border-slate-200 px-4 py-3 flex gap-1.5 items-center"
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.15 }}
                          className="w-2 h-2 bg-slate-400"
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* CRM confirmation */}
                <AnimatePresence>
                  {status === "AUTOMATION_MATCHED" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-2 bg-indigo-50 border border-indigo-200 p-4 flex items-start gap-3"
                    >
                      <CheckCircle2 className="text-indigo-600 flex-shrink-0 mt-0.5" size={20} />
                      <div>
                        <p className="text-sm font-bold text-indigo-700 mb-0.5">Anfrage im CRM erfasst</p>
                        <p className="text-xs text-slate-600">Wir melden uns innerhalb von 24 Stunden. NDA auf Wunsch vorab erhältlich.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* CENTER — vertical rule */}
          <div className="hidden lg:block bg-slate-200 self-stretch" />

          {/* RIGHT — Copy + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pl-12 mt-10 lg:mt-0 flex flex-col justify-center"
          >
            <p className="text-base text-slate-500 leading-relaxed mb-10 max-w-md">
              Kein simples Support-Widget. Wir integrieren intelligente KI-Assistenten direkt in
              Ihre Plattform. Sie qualifizieren Leads, beantworten Fragen und füllen Ihre Pipeline —
              vollautomatisch, rund um die Uhr.
            </p>

            {/* Feature list */}
            <div className="space-y-0 mb-10">
              {[
                "Leads qualifizieren — ohne manuellen Aufwand",
                "Antworten auf Produktfragen in Echtzeit",
                "Nahtlose CRM-Integration & Follow-up",
                "DSGVO-konform — Daten bleiben in Deutschland",
              ].map((item, i) => (
                <div key={i} className={`flex items-start gap-3 py-4 ${i < 3 ? "border-b border-slate-100" : ""}`}>
                  <span className="w-1.5 h-1.5 bg-indigo-600 mt-2 shrink-0" />
                  <span className="text-slate-700 font-medium text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* Processing indicator */}
            {status === "PROCESSING" && (
              <div className="flex items-center gap-2 mb-6">
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-indigo-600 inline-block"
                />
                <span className="text-sm text-indigo-600 font-medium">KI analysiert Ihre Situation …</span>
              </div>
            )}

            <button
              onClick={simulateLead}
              disabled={status === "PROCESSING"}
              className="btn-glow inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-semibold self-start disabled:opacity-50 disabled:cursor-not-allowed"
            >
              KI-Demo starten
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
