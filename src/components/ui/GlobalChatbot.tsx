"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

// ─── KNOWLEDGE BASE ─────────────────────────────────────────────────────────

const SERVICES = {
  marke: {
    name: "Marke & Design",
    price: "Basis ab 500 €",
    desc: "Professionelles Re-Branding und Geschäftsausstattung für einen Premium-Auftritt.",
    usp: "Ihre Marke wird zum visuellen Magnet für Ihre Zielgruppe.",
  },
  website: {
    name: "High-Performance Website",
    price: "Basis ab 1.000 €",
    desc: "Kein Template, kein Baukasten. React + Next.js für blitzschnelle Ladezeiten.",
    usp: "Lighthouse 100/100. Das ist der Unterschied zwischen Bounce und Lead.",
  },
  ki: {
    name: "KI & Automatisierung",
    price: "Basis ab 500 €",
    desc: "Smarte Lead-Erfassung, KI-Chatbots (wie dieser hier!) und automatisierte CRM-Systeme.",
    usp: "Ihr bester Mitarbeiter arbeitet ab jetzt 24/7.",
  },
  social: {
    name: "Social Media & Video",
    price: "Preis durch Add-ons",
    desc: "Content, Workshops und Videoproduktion, die Reichweite in Umsatz verwandelt.",
    usp: "Sichtbarkeit, die bleibt statt im Feed zu versinken.",
  },
  betreuung: {
    name: "Laufende Betreuung",
    price: "ab 100€/Monat",
    desc: "Premium-Hosting, Local SEO, Backups und Sicherheitsupdates.",
    usp: "Sie kümmern sich ums Geschäft, wir uns um die Technik.",
  },
};

const COMPANY = {
  name: "Medientrupp",
  location: "Gummersbach, NRW",
  email: "impact@medientrupp.de",
  phone: "+49 176 12345678",
  calendly: "https://calendly.com",
};

// ─── INTENT DETECTION ───────────────────────────────────────────────────────

type Intent =
  | "GREETING" | "PRICING" | "SERVICE_WEBSITE" | "SERVICE_KI"
  | "SERVICE_MARKE" | "SERVICE_SOCIAL" | "SERVICE_BETREUUNG"
  | "CONTACT" | "BOT_DEMO" | "THANKS" | "UNKNOWN";

const INTENT_PATTERNS: { intent: Intent; keywords: string[] }[] = [
  { intent: "GREETING", keywords: ["hallo", "hi", "hey", "moin", "guten tag", "grüß"] },
  { intent: "PRICING", keywords: ["preis", "kosten", "was kostet", "budget", "angebot", "euro", "€"] },
  { intent: "SERVICE_WEBSITE", keywords: ["website", "webseite", "homepage", "landingpage", "webdesign"] },
  { intent: "SERVICE_KI", keywords: ["ki", "chatbot", "bot", "automatisierung", "automation", "ai", "crm"] },
  { intent: "SERVICE_MARKE", keywords: ["marke", "design", "branding", "logo", "visitenkarte"] },
  { intent: "SERVICE_SOCIAL", keywords: ["video", "social media", "tiktok", "reels", "content", "workshop"] },
  { intent: "SERVICE_BETREUUNG", keywords: ["betreuung", "wartung", "hosting", "seo", "support", "updates"] },
  { intent: "CONTACT", keywords: ["kontakt", "termin", "buchen", "anfrage", "anrufen", "email"] },
  { intent: "BOT_DEMO", keywords: ["bot bauen", "so einen bot", "für mein business", "eigenen chatbot"] },
  { intent: "THANKS", keywords: ["danke", "super", "perfekt", "top", "klasse"] },
];

function detectIntent(input: string): Intent {
  const lower = input.toLowerCase().trim();
  let bestMatch: Intent = "UNKNOWN";
  let bestScore = 0;

  for (const pattern of INTENT_PATTERNS) {
    let score = 0;
    for (const kw of pattern.keywords) {
      if (lower.includes(kw)) score += kw.length;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = pattern.intent;
    }
  }
  return bestMatch;
}

// ─── RESPONSE ENGINE ────────────────────────────────────────────────────────

interface BotResponse {
  messages: string[];
  quickReplies?: string[];
}

function generateResponse(intent: Intent, msgCount: number, currentPath: string): BotResponse {
  switch (intent) {
    case "GREETING":
      return {
        messages: [
          "Hey! 👋 Willkommen bei Medientrupp — schön, dass du hier bist.",
          currentPath === "/projekt-anfragen"
            ? "Du bist schon beim interaktiven Kalkulator — stark! Soll ich dir bei der Konfiguration helfen?"
            : currentPath === "/anfragen" || currentPath.includes("kontakt")
            ? "Du bist schon bei der Anfrage — nice! Brauchst du Hilfe?"
            : "Was kann ich für dich tun? Website, KI, Branding oder Social Media?",
        ],
        quickReplies: ["💰 Preise", "🌐 Website", "🤖 KI-Systeme", "📞 Kontakt"],
      };

    case "PRICING":
      return {
        messages: [
          "📊 Hier ist unsere Basis-Preisübersicht:",
          `🌐 **${SERVICES.website.name}**: ${SERVICES.website.price}\n🤖 **${SERVICES.ki.name}**: ${SERVICES.ki.price}\n🎨 **${SERVICES.marke.name}**: ${SERVICES.marke.price}\n🎬 **${SERVICES.social.name}**: ${SERVICES.social.price}\n🔒 **${SERVICES.betreuung.name}**: ${SERVICES.betreuung.price}`,
          "Radikale Transparenz. Welcher Bereich interessiert dich am meisten?",
        ],
        quickReplies: ["🌐 Website Details", "🤖 KI Details", "📞 Erstgespräch buchen"],
      };

    case "SERVICE_WEBSITE":
      return {
        messages: [
          `🌐 **${SERVICES.website.name}** (${SERVICES.website.price})`,
          SERVICES.website.desc,
          `💡 ${SERVICES.website.usp}`,
        ],
        quickReplies: ["💰 Preise", "📞 Website anfragen", "🤖 KI dazu?"],
      };

    case "SERVICE_KI":
      return {
        messages: [
          `🤖 **${SERVICES.ki.name}** (${SERVICES.ki.price})`,
          SERVICES.ki.desc,
          `💡 ${SERVICES.ki.usp}`,
        ],
        quickReplies: ["📞 Erstgespräch buchen", "💰 Preise"],
      };

    case "SERVICE_MARKE":
      return {
        messages: [
          `🎨 **${SERVICES.marke.name}** (${SERVICES.marke.price})`,
          SERVICES.marke.desc,
          `💡 ${SERVICES.marke.usp}`,
        ],
        quickReplies: ["📞 Marke anfragen", "🌐 Website dazu?"],
      };

    case "SERVICE_SOCIAL":
      return {
        messages: [
          `🎬 **${SERVICES.social.name}** (${SERVICES.social.price})`,
          SERVICES.social.desc,
          `💡 ${SERVICES.social.usp}`,
        ],
        quickReplies: ["📞 Strategie Workshop buchen", "💰 Preise"],
      };

    case "SERVICE_BETREUUNG":
      return {
        messages: [
          `🔒 **${SERVICES.betreuung.name}** (${SERVICES.betreuung.price})`,
          SERVICES.betreuung.desc,
          `💡 ${SERVICES.betreuung.usp}`,
        ],
        quickReplies: ["📞 Anfrage starten", "💰 Preise"],
      };

    case "CONTACT":
      return {
        messages: [
          "📞 Lass uns sprechen!",
          "Gehe am besten auf unseren interaktiven Projekt-Kalkulator oder buche direkt ein Erstgespräch.",
          `📧 E-Mail: ${COMPANY.email}`,
        ],
        quickReplies: ["📅 Projekt Kalkulator", "📧 E-Mail senden"],
      };

    case "BOT_DEMO":
      return {
        messages: [
          "🎯 Genau DAS ist unser KI & Automatisierung Service!",
          "Stell dir vor: Dieser Bot, eingebaut in deine Website, der 24/7 Leads für dich generiert.",
          `Investment ab ${SERVICES.ki.price}.`,
        ],
        quickReplies: ["📞 KI-System anfragen", "💰 Was gibt es noch?"],
      };

    case "THANKS":
      return {
        messages: [
          "Gerne! 🙌",
          "Wenn du bereit bist, starte gerne den Konfigurator oder buche ein Gespräch.",
        ],
        quickReplies: ["📅 Loslegen", "👋 Tschüss"],
      };

    case "UNKNOWN":
    default:
      return {
        messages: [
          "Hmm, dazu habe ich keine direkte Antwort — aber ich kann dir bei allem rund um Websites, KI-Systeme, Marke und Social Media helfen.",
          "Wähle einfach ein Thema aus:",
        ],
        quickReplies: ["🌐 Websites", "🤖 KI-Systeme", "💰 Preise", "📞 Kontakt"],
      };
  }
}

function quickReplyToIntent(reply: string): Intent {
  const r = reply.toLowerCase();
  if (r.includes("preis") || r.includes("💰")) return "PRICING";
  if (r.includes("website") || r.includes("🌐")) return "SERVICE_WEBSITE";
  if (r.includes("ki") || r.includes("🤖") || r.includes("bot")) return "SERVICE_KI";
  if (r.includes("marke") || r.includes("🎨")) return "SERVICE_MARKE";
  if (r.includes("social") || r.includes("🎬") || r.includes("workshop")) return "SERVICE_SOCIAL";
  if (r.includes("kontakt") || r.includes("📞") || r.includes("gespräch") || r.includes("loslegen")) return "CONTACT";
  if (r.includes("e-mail") || r.includes("📧")) return "CONTACT";
  if (r.includes("tschüss") || r.includes("👋") || r.includes("danke")) return "THANKS";
  return "UNKNOWN";
}

interface ChatMessage {
  id: string;
  text: string;
  sender: "user" | "ai";
  quickReplies?: string[];
}

export const GlobalChatbot = () => {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const [initialized, setInitialized] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus and Scroll
  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Notification Pulse
  useEffect(() => {
    if (!isOpen && initialized) {
      const timer = setTimeout(() => setHasNewMsg(true), 5000);
      return () => clearTimeout(timer);
    } else {
      setHasNewMsg(false);
    }
  }, [isOpen, initialized]);

  // Init
  const getWelcomeMessage = useCallback((): ChatMessage[] => {
    const welcome = generateResponse("GREETING", 0, pathname || "");
    return [{ id: "welcome-1", text: welcome.messages[0], sender: "ai", quickReplies: welcome.quickReplies }];
  }, [pathname]);

  useEffect(() => {
    if (isOpen && !initialized) {
      // Simulate connection lag
      setIsTyping(true);
      setTimeout(() => {
        setMessages(getWelcomeMessage());
        setIsTyping(false);
        setInitialized(true);
      }, 1000);
    }
  }, [isOpen, initialized, getWelcomeMessage]);

  const handleNavAction = useCallback((text: string) => {
    if (text.includes("Kalkulator") || text.includes("Projekt") || text.includes("Loslegen")) {
      router.push("/projekt-anfragen");
    } else if (text.includes("E-Mail")) {
      window.open(`mailto:${COMPANY.email}`, "_blank");
    }
  }, [router]);

  const pushAiMessages = (responses: BotResponse) => {
    let delay = 600;
    responses.messages.forEach((msg, i) => {
      const isLast = i === responses.messages.length - 1;
      delay += Math.min(msg.length * 15, 1500) + 300;
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}-${i}`,
            text: msg,
            sender: "ai",
            quickReplies: isLast ? responses.quickReplies : undefined,
          },
        ]);
        if (isLast) setIsTyping(false);
      }, delay);
    });
  };

  const processInput = (text: string, intentOverride?: Intent) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, text: text.trim(), sender: "user" };
    setMessages((prev) => [...prev.map((m): ChatMessage => ({ ...m, quickReplies: undefined })), userMsg]);
    setMsgCount((c) => c + 1);
    setIsTyping(true);

    const intent = intentOverride || detectIntent(text);
    const response = generateResponse(intent, msgCount + 1, pathname || "");

    handleNavAction(text);
    pushAiMessages(response);
  };

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    processInput(inputVal);
    setInputVal("");
  };

  const handleQuickReply = (reply: string) => {
    processInput(reply, quickReplyToIntent(reply));
  };

  const formatText = (text: string) => {
    let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formatted = formatted.replace(/\n/g, "<br/>");
    return formatted;
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }} className="fixed bottom-6 right-6 z-50">
            <div className="relative group">
              {hasNewMsg && (
                 <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 border-2 border-white flex items-center justify-center text-[10px] font-bold text-white z-10">
                   1
                 </motion.div>
              )}
              <button
                onClick={() => setIsOpen(true)}
                className="relative w-14 h-14 bg-slate-900 border-2 border-indigo-600 text-white flex items-center justify-center shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-colors duration-200"
                aria-label="Chat öffnen"
              >
                <MessageCircle size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[550px] max-h-[calc(100vh-6rem)] bg-white border border-slate-200 shadow-2xl shadow-slate-900/12 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between shadow-md z-10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-indigo-600 flex items-center justify-center border border-indigo-500">
                    <Bot size={20} className="text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-slate-900" />
                </div>
                <div>
                  <h3 className="font-bold tracking-tight text-sm">Medientrupp Support</h3>
                  <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center hover:bg-slate-800 transition-colors text-slate-300" aria-label="Chat schließen">
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-5 pb-2 flex flex-col gap-4 scroll-smooth bg-slate-50/50">
              <AnimatePresence>
                {messages.map((m, idx) => (
                  <div key={m.id} className="flex flex-col gap-2">
                    <motion.div
                      initial={{ opacity: 0, y: 10, x: m.sender === "user" ? 10 : -10 }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      className={`max-w-[85%] px-4 py-3 text-[14px] leading-relaxed ${
                        m.sender === "user"
                          ? "self-end bg-indigo-600 text-white shadow-sm shadow-indigo-900/10"
                          : "self-start bg-white border border-slate-200 text-slate-700 shadow-sm"
                      }`}
                      dangerouslySetInnerHTML={{ __html: formatText(m.text) }}
                    />
                    
                    {m.quickReplies && m.quickReplies.length > 0 && idx === messages.length - 1 && (
                      <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap gap-2 self-start mt-1">
                        {m.quickReplies.map((qr, qi) => (
                          <button
                            key={qi}
                            onClick={() => handleQuickReply(qr)}
                            className="px-3 py-1.5 bg-indigo-50 border border-indigo-200 hover:border-indigo-600 hover:bg-indigo-100 text-indigo-700 text-[12px] font-semibold transition-colors"
                          >
                            {qr}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="self-start bg-white border border-slate-200 p-4 flex gap-1.5 shadow-sm">
                    {[0, 1, 2].map((i) => (
                      <motion.div key={i} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.2 }} className="w-2 h-2 bg-slate-400" />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-slate-100 z-10">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Schreiben Sie eine Nachricht..."
                  disabled={isTyping}
                  className="w-full bg-slate-50 border border-slate-200 py-3.5 pl-4 pr-12 text-sm focus:outline-none focus:border-indigo-600 transition-colors font-medium placeholder:text-slate-400 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!inputVal.trim() || isTyping}
                  className="absolute right-2 w-9 h-9 flex items-center justify-center bg-indigo-600 text-white disabled:opacity-40 disabled:bg-slate-300 transition-colors hover:bg-indigo-700"
                  aria-label="Senden"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </form>
               <div className="text-center mt-2 text-[9px] font-bold tracking-widest text-slate-300 uppercase">
                 Powered by Medientrupp offline KI
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
