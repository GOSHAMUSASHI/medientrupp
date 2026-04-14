"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  ArrowRight,
  ChevronLeft,
  Globe,
  Zap,
  Video,
  Palette,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import Link from "next/link";

// ─── Types ─────────────────────────────────────────────────────────────────────

type MainService = "marke" | "website" | "ki" | "social";

interface Addons {
  // Marke
  marke_premium_rebranding: boolean;
  marke_geschaeftsausstattung: boolean;
  // Website
  website_texte: boolean;
  website_seo: boolean;
  website_recruiting: boolean;
  // KI
  ki_lead_erfassung: boolean;
  ki_chatbot: boolean;
  ki_bewertung: boolean;
  // Social
  social_management: boolean;
  social_workshop: boolean;
  social_video: boolean;
}

interface Maintenance {
  hosting: boolean;
  local_seo: boolean;
}

interface ContactForm {
  name: string;
  email: string;
  company: string;
  phone?: string;
  gdpr: true;
}

// ─── Pricing engine ──────────────────────────────────────────────────────────

const BASE_SETUP: Record<MainService, number> = {
  marke: 500,
  website: 1000,
  ki: 500,
  social: 0,
};

function calcCosts(
  services: MainService[],
  addons: Addons,
  maintenance: Maintenance
): { setup: number; monthly: number } {
  let setup = 0;
  let monthly = 0;

  // Base prices
  services.forEach((s) => (setup += BASE_SETUP[s]));

  // Marke add-ons
  if (addons.marke_premium_rebranding) setup += 1500;
  if (addons.marke_geschaeftsausstattung) setup += 500;

  // Website add-ons
  if (addons.website_texte) setup += 500;
  if (addons.website_seo) setup += 500;
  if (addons.website_recruiting) setup += 500;

  // KI add-ons
  if (addons.ki_lead_erfassung) setup += 500;
  if (addons.ki_chatbot) setup += 500;
  if (addons.ki_bewertung) setup += 250;

  // Social add-ons (management is monthly!)
  if (addons.social_management) monthly += 250;
  if (addons.social_workshop) setup += 1000;
  if (addons.social_video) setup += 500;

  // Maintenance
  if (maintenance.hosting) monthly += 100;
  if (maintenance.local_seo) monthly += 150;

  return { setup, monthly };
}

// ─── Contact form schema ─────────────────────────────────────────────────────

const contactSchema = z.object({
  name: z.string().min(2, "Bitte Ihren Namen eingeben."),
  email: z.string().email("Bitte eine gültige E-Mail eingeben."),
  company: z.string().min(2, "Bitte Ihr Unternehmen eingeben."),
  phone: z.string().optional(),
  gdpr: z.literal(true, { error: "Bitte akzeptieren Sie die Datennutzung." }),
});

// ─── Animations ──────────────────────────────────────────────────────────────

const stepVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    transition: { duration: 0.25 },
  }),
};

// ─── UI Components ───────────────────────────────────────────────────────────

interface ToggleCardProps {
  label: string;
  sublabel: string;
  desc?: string;
  checked: boolean;
  onToggle: () => void;
  isMonthly?: boolean;
}
const ToggleCard = ({ label, sublabel, desc, checked, onToggle, isMonthly }: ToggleCardProps) => (
  <div
    onClick={onToggle}
    className={`cursor-pointer p-4 md:p-5 rounded-md border-2 transition-all duration-200 flex items-start gap-3 sm:gap-4 ${
      checked
        ? "border-violet-600 bg-violet-50/70 shadow-[0_4px_12px_-4px_rgba(99,102,241,0.2)]"
        : "border-slate-200 hover:border-violet-300 bg-white shadow-[0_2px_8px_-2px_rgba(0,0,0,0.02)]"
    }`}
  >
    <div
      className={`mt-1 w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
        checked ? "bg-violet-600 border-violet-600" : "border-slate-300 bg-slate-50"
      }`}
    >
      {checked && <Check size={14} className="text-white" strokeWidth={4}/>}
    </div>
    <div className="flex-1">
      <p className={`font-bold md:text-lg leading-tight ${checked ? "text-slate-900" : "text-slate-700"}`}>
        {label}
      </p>
      {desc && <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-snug">{desc}</p>}
      <p className={`text-[10px] sm:text-xs mt-1.5 font-bold uppercase tracking-widest ${isMonthly ? "text-amber-600" : "text-violet-600"}`}>
        {sublabel}
      </p>
    </div>
  </div>
);

// ─── Main Page ───────────────────────────────────────────────────────────────

const MAIN_SERVICES: { id: MainService; label: string; icon: React.ReactNode; price: string }[] = [
  { id: "marke", label: "Marke & Design", icon: <Palette size={24} />, price: "Basis ab 500 €" },
  { id: "website", label: "Website", icon: <Globe size={24} />, price: "Basis ab 1.000 €" },
  { id: "ki", label: "KI & Automatisierung", icon: <Zap size={24} />, price: "Basis ab 500 €" },
  { id: "social", label: "Social Media & Video", icon: <Video size={24} />, price: "Preis durch Add-ons" },
];

export default function ProjektAnfragenPage() {
  const [direction, setDirection] = useState(1);
  const [services, setServices] = useState<MainService[]>([]);
  const [addons, setAddons] = useState<Addons>({
    marke_premium_rebranding: false, marke_geschaeftsausstattung: false,
    website_texte: false, website_seo: false, website_recruiting: false,
    ki_lead_erfassung: false, ki_chatbot: false, ki_bewertung: false,
    social_management: false, social_workshop: false, social_video: false,
  });
  const [maintenance, setMaintenance] = useState<Maintenance>({
    hosting: false, local_seo: false,
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const { setup, monthly } = calcCosts(services, addons, maintenance);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  // Dynamic Flow Array
  const getFlow = () => {
    const flow = ["MAIN"];
    if (services.includes("marke")) flow.push("ADDON_MARKE");
    if (services.includes("website")) flow.push("ADDON_WEBSITE");
    if (services.includes("ki")) flow.push("ADDON_KI");
    if (services.includes("social")) flow.push("ADDON_SOCIAL");
    flow.push("MAINTENANCE");
    flow.push("CONTACT");
    return flow;
  };

  const flow = getFlow();
  const [flowIndex, setFlowIndex] = useState(0);
  const currentStage = flow[flowIndex] || "MAIN";

  const onNext = () => {
    if (currentStage === "MAIN" && services.length === 0) return; // Must select >=1
    if (flowIndex < flow.length - 1) {
      setDirection(1);
      setFlowIndex(flowIndex + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onPrev = () => {
    if (flowIndex > 0) {
      setDirection(-1);
      setFlowIndex(flowIndex - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const onSubmitForm = async (data: ContactForm) => {
    setStatus("loading");
    // Simulate API delay
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleService = (id: MainService) =>
    setServices((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  const toggleAddon = (key: keyof Addons) => setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleMaintenance = (key: keyof Maintenance) => setMaintenance((prev) => ({ ...prev, [key]: !prev[key] }));

  // Helper flags
  const isFormValid = isValid && currentStage === "CONTACT";
  const canProceed = currentStage !== "MAIN" || services.length > 0;

  // Progress Bar calculation
  const progressPercent = ((flowIndex + 1) / flow.length) * 100;

  if (status === "success") {
    // ─── Full Screen Success State ─────────────────────────────────────────────
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-20 font-sans tracking-tight">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white max-w-lg w-full rounded-[32px] p-8 md:p-12 text-center shadow-2xl border border-slate-100">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }} className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-200">
            <CheckCircle2 size={48} className="text-emerald-600" />
          </motion.div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">
            Anfrage erhalten!
          </h2>
          <p className="text-slate-500 text-lg mb-10 leading-relaxed">
            Wir haben Ihr System gespeichert und melden uns rasch mit einem konkreten Angebot bei Ihnen.
          </p>
          <div className="bg-slate-50 border border-slate-200 rounded-md p-8">
            <div className="flex items-center gap-3 justify-center mb-4 text-violet-600">
              <Calendar size={24} />
              <span className="font-black">Kick-off direkt buchen</span>
            </div>
            <p className="text-slate-500 text-sm mb-6">
              Keine Lust zu warten? Sichern Sie sich jetzt direkt einen Termin für ein kurzes Kick-off-Gespräch in unserem Kalender.
            </p>
            <div className="border border-slate-200 bg-white rounded-md h-20 flex items-center justify-center shadow-sm">
              <span className="text-slate-400 font-semibold text-xs uppercase tracking-widest text-center px-4">
                Calendly-Embed wird hier platziert
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* ── Minimal Header ──────────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-[65px] bg-white border-b border-slate-200">
        <Link href="/" className="text-violet-600 font-black text-xl tracking-tight">
          Medien<span className="text-slate-900">Trupp</span>
        </Link>
        {/* Progress Bar (Desktop only, mobile shows below) */}
        <div className="hidden md:flex items-center gap-4 w-1/3">
          <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
             <div className="h-full bg-violet-600 transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">
            {flowIndex + 1} / {flow.length}
          </span>
        </div>
        <Link href="/" className="text-slate-500 hover:text-slate-900 text-sm font-bold transition-colors">
          Abbrechen
        </Link>
      </header>

      {/* Main Layout Area */}
      {/* We add pb-[120px] on mobile to make room for the fixed bottom bar */}
      <div className="flex flex-col lg:flex-row flex-1 pt-[65px] min-h-screen pb-[120px] lg:pb-0">
        
        {/* ── Left: Wizard Content ──────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 md:px-12 py-10 lg:py-20 overflow-x-hidden">
          
          {/* Mobile Progress Bar */}
          <div className="md:hidden w-full max-w-2xl mb-8">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Fortschritt</span>
              <span className="text-[10px] font-bold text-violet-600 uppercase tracking-widest">{flowIndex + 1} / {flow.length}</span>
            </div>
            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-violet-600 transition-all duration-500 ease-out" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          <div className="w-full max-w-2xl relative">
            <AnimatePresence mode="wait" custom={direction}>
              
              {/* ── STAGE: MAIN ────────────────────────────────────────────── */}
              {currentStage === "MAIN" && (
                <motion.div key="main" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-8">
                  <div className="text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3">
                      Was benötigt Ihr <span className="text-violet-600">Unternehmen?</span>
                    </h1>
                    <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                      Wählen Sie alle Bereiche aus, in denen Sie wachsen möchten. Sie sehen sofort Ihren Preis.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {MAIN_SERVICES.map((srv) => {
                      const active = services.includes(srv.id);
                      return (
                        <div
                          key={srv.id}
                          onClick={() => toggleService(srv.id)}
                          className={`cursor-pointer p-4 sm:p-6 rounded-md border-2 transition-all duration-200 flex flex-col gap-4 ${
                            active
                              ? "border-violet-600 bg-violet-50/50 shadow-[0_4px_12px_-4px_rgba(99,102,241,0.2)]"
                              : "border-slate-200 hover:border-violet-300 bg-white shadow-sm shadow-slate-100/50"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className={`w-12 h-12 rounded-md flex items-center justify-center transition-colors ${
                              active ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500"
                            }`}>
                              {srv.icon}
                            </div>
                            <div className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-colors flex-shrink-0 mt-1 ${
                              active ? "bg-violet-600 border-violet-600" : "border-slate-300 bg-slate-50"
                            }`}>
                              {active && <Check size={14} className="text-white" strokeWidth={3} />}
                            </div>
                          </div>
                          <div>
                            <p className="font-bold text-lg text-slate-900">{srv.label}</p>
                            <p className="text-xs font-bold text-violet-600 mt-1 uppercase tracking-widest">{srv.price}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── STAGE: ADDONS MARKE ────────────────────────────────────── */}
              {currentStage === "ADDON_MARKE" && (
                <motion.div key="marke" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
                  <div className="text-center sm:text-left mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-100 text-violet-700 font-black text-xs uppercase tracking-widest mb-4">
                      <Palette size={14} /> Marke & Design
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3">Welche Details?</h1>
                    <p className="text-slate-500 text-sm sm:text-base">Kreuzen Sie an, falls Sie mehr als unser Basis-Paket benötigen.</p>
                  </div>
                  <div className="space-y-3">
                    <ToggleCard
                      label="Premium Re-Branding"
                      sublabel="+ 1.500 € einmalig"
                      desc="Wir erfinden Ihre komplette Markenidentität neu."
                      checked={addons.marke_premium_rebranding}
                      onToggle={() => toggleAddon("marke_premium_rebranding")}
                    />
                    <ToggleCard
                      label="Geschäftsausstattung"
                      sublabel="+ 500 € einmalig"
                      desc="Visitenkarten, Briefpapier, E-Mail-Signaturen aus einem Guss."
                      checked={addons.marke_geschaeftsausstattung}
                      onToggle={() => toggleAddon("marke_geschaeftsausstattung")}
                    />
                  </div>
                </motion.div>
              )}

              {/* ── STAGE: ADDONS WEBSITE ──────────────────────────────────── */}
              {currentStage === "ADDON_WEBSITE" && (
                <motion.div key="website" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
                  <div className="text-center sm:text-left mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-100 text-violet-700 font-black text-xs uppercase tracking-widest mb-4">
                      <Globe size={14} /> Website
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3">Welche Power-Ups?</h1>
                    <p className="text-slate-500 text-sm sm:text-base">Machen Sie aus Ihrer Webseite eine echte Verkaufsmaschine.</p>
                  </div>
                  <div className="space-y-3">
                    <ToggleCard
                      label="Premium Copywriting"
                      sublabel="+ 500 € einmalig"
                      desc="Verkaufspsychologische Texte, die Ihre Zielgruppe packen."
                      checked={addons.website_texte}
                      onToggle={() => toggleAddon("website_texte")}
                    />
                    <ToggleCard
                      label="Technical SEO & On-Page"
                      sublabel="+ 500 € einmalig"
                      desc="Grundlagen-Optimierung für bessere Google-Rankings."
                      checked={addons.website_seo}
                      onToggle={() => toggleAddon("website_seo")}
                    />
                    <ToggleCard
                      label="Recruiting-System"
                      sublabel="+ 500 € einmalig"
                      desc="Eigene Karriereseite mit nahtloser Bewerber-Erfassung."
                      checked={addons.website_recruiting}
                      onToggle={() => toggleAddon("website_recruiting")}
                    />
                  </div>
                </motion.div>
              )}

              {/* ── STAGE: ADDONS KI ───────────────────────────────────────── */}
              {currentStage === "ADDON_KI" && (
                <motion.div key="ki" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
                  <div className="text-center sm:text-left mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-100 text-violet-700 font-black text-xs uppercase tracking-widest mb-4">
                      <Zap size={14} /> KI Systeme
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3">Was dürfen wir automatisieren?</h1>
                  </div>
                  <div className="space-y-3">
                    <ToggleCard
                      label="Intelligente Lead-Erfassung"
                      sublabel="+ 500 € einmalig"
                      desc="Anfragen landen sofort sortiert in Ihrem Postfach/CRM."
                      checked={addons.ki_lead_erfassung}
                      onToggle={() => toggleAddon("ki_lead_erfassung")}
                    />
                    <ToggleCard
                      label="24/7 KI-Chatbot"
                      sublabel="+ 500 € einmalig"
                      desc="Ein virtueller Assistent, der Kundenfragen vollautomatisch klärt."
                      checked={addons.ki_chatbot}
                      onToggle={() => toggleAddon("ki_chatbot")}
                    />
                    <ToggleCard
                      label="Bewertungs-Maschine"
                      sublabel="+ 250 € einmalig"
                      desc="Vollautomatisiert mehr 5-Sterne Google Reviews sammeln."
                      checked={addons.ki_bewertung}
                      onToggle={() => toggleAddon("ki_bewertung")}
                    />
                  </div>
                </motion.div>
              )}

              {/* ── STAGE: ADDONS SOCIAL ───────────────────────────────────── */}
              {currentStage === "ADDON_SOCIAL" && (
                <motion.div key="social" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
                  <div className="text-center sm:text-left mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-100 text-violet-700 font-black text-xs uppercase tracking-widest mb-4">
                      <Video size={14} /> Social Media
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3">Sichtbarkeit skalieren</h1>
                  </div>
                  <div className="space-y-3">
                    <ToggleCard
                      label="Laufendes Social Management"
                      sublabel="+ 250 €"
                      isMonthly
                      desc="Wir pflegen und bespielen Ihre Kanäle proaktiv für Sie."
                      checked={addons.social_management}
                      onToggle={() => toggleAddon("social_management")}
                    />
                    <ToggleCard
                      label="Ganzheitlicher Strategie-Workshop"
                      sublabel="+ 1.000 € einmalig"
                      desc="Wir erarbeiten Ihren Masterplan für massentaugliche Reichweite."
                      checked={addons.social_workshop}
                      onToggle={() => toggleAddon("social_workshop")}
                    />
                    <ToggleCard
                      label="Image- & Videoproduktion"
                      sublabel="+ 500 € einmalig"
                      desc="Professionelle Drehs für High-End Content."
                      checked={addons.social_video}
                      onToggle={() => toggleAddon("social_video")}
                    />
                  </div>
                </motion.div>
              )}

              {/* ── STAGE: MAINTENANCE ─────────────────────────────────────── */}
              {currentStage === "MAINTENANCE" && (
                <motion.div key="maintenance" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
                  <div className="text-center sm:text-left mb-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 font-black text-xs uppercase tracking-widest mb-4">
                      <ShieldCheck size={14} /> Sicherheit
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3">Laufende Betreuung</h1>
                    <p className="text-slate-500 text-sm sm:text-base">Ruhe im Kopf nach dem Projekt-Launch (monatlich kündbar).</p>
                  </div>

                  <div className="space-y-3">
                    <div className="relative">
                      <ToggleCard
                        label={`Sicheres Premium-Hosting${services.includes("website") ? " (Dringend empfohlen)" : ""}`}
                        sublabel="100 €"
                        isMonthly
                        desc="Tägliche Backups, Security-Patches & ultra-schnelle Server."
                        checked={maintenance.hosting}
                        onToggle={() => toggleMaintenance("hosting")}
                      />
                      {services.includes("website") && !maintenance.hosting && (
                        <div className="absolute -bottom-6 left-2 flex items-center gap-1.5 text-amber-500 text-[10px] sm:text-xs font-bold uppercase tracking-wider">
                          ⚠ Ohne Wartung riskieren Sie Hackerangriffe.
                        </div>
                      )}
                    </div>
                    <div className={`${services.includes("website") && !maintenance.hosting ? "mt-10" : ""}`}>
                      <ToggleCard
                        label="Local SEO Betreuung"
                        sublabel="150 €"
                        isMonthly
                        desc="Laufende Optimierung Ihres Google Unternehmensprofils für lokale Dominanz."
                        checked={maintenance.local_seo}
                        onToggle={() => toggleMaintenance("local_seo")}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ── STAGE: CONTACT ─────────────────────────────────────────── */}
              {currentStage === "CONTACT" && (
                <motion.div key="contact" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
                  <div className="text-center sm:text-left mb-8">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3">Letzter Schritt.</h1>
                    <p className="text-slate-500 text-sm sm:text-base">Wie können wir Sie am besten erreichen?</p>
                  </div>

                  <form id="contact-form" onSubmit={handleSubmit(onSubmitForm)} className="space-y-2 max-w-md mx-auto sm:mx-0">
                    <div className="h-[84px]">
                      <input
                        {...register("name")}
                        placeholder="Ihr vollständiger Name *"
                        className={`w-full px-5 py-4 rounded-md bg-white border-2 text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all text-base shadow-sm ${
                          errors.name ? "border-rose-400 bg-rose-50" : "border-slate-200 focus:border-violet-600"
                        }`}
                      />
                      {errors.name && <p className="text-rose-500 text-[11px] mt-1.5 font-bold uppercase tracking-wider px-1">{errors.name.message}</p>}
                    </div>
                    <div className="h-[84px]">
                      <input
                        {...register("company")}
                        placeholder="Ihr Unternehmen *"
                        className={`w-full px-5 py-4 rounded-md bg-white border-2 text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all text-base shadow-sm ${
                          errors.company ? "border-rose-400 bg-rose-50" : "border-slate-200 focus:border-violet-600"
                        }`}
                      />
                      {errors.company && <p className="text-rose-500 text-[11px] mt-1.5 font-bold uppercase tracking-wider px-1">{errors.company.message}</p>}
                    </div>
                    <div className="h-[84px]">
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="Geschäftliche E-Mail *"
                        className={`w-full px-5 py-4 rounded-md bg-white border-2 text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all text-base shadow-sm ${
                          errors.email ? "border-rose-400 bg-rose-50" : "border-slate-200 focus:border-violet-600"
                        }`}
                      />
                      {errors.email && <p className="text-rose-500 text-[11px] mt-1.5 font-bold uppercase tracking-wider px-1">{errors.email.message}</p>}
                    </div>
                    <div className="h-[84px]">
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="Telefon (optional)"
                        className="w-full px-5 py-4 rounded-md bg-white border-2 border-slate-200 focus:border-violet-600 text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all text-base shadow-sm"
                      />
                    </div>

                    <div className="min-h-[60px]">
                      <div className="flex items-start gap-3 px-2 py-2">
                        <div className="pt-1">
                          <input
                            type="checkbox"
                            id="gdpr-page"
                            {...register("gdpr")}
                            className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-600 cursor-pointer"
                          />
                        </div>
                        <label htmlFor="gdpr-page" className="text-xs text-slate-500 leading-snug cursor-pointer">
                          Ich stimme zu, dass meine Daten zur Bearbeitung dieser Anfrage gespeichert und verwendet werden. Weitere Informationen finden Sie in der <Link href="/datenschutz" className="text-violet-600 hover:underline">Datenschutzerklärung</Link>. *
                        </label>
                      </div>
                      {errors.gdpr && <p className="text-rose-500 text-[11px] font-bold uppercase tracking-wider px-2">{errors.gdpr.message}</p>}
                    </div>
                    
                    <p className="text-slate-400 text-[11px] text-center sm:text-left leading-relaxed mt-4 px-2">
                      Unverbindliche Anfrage.
                    </p>
                  </form>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Desktop Navigation (Hidden on mobile) */}
            <div className="hidden lg:flex items-center justify-between mt-12 pt-8 border-t border-slate-200">
              <button
                onClick={onPrev}
                className={`flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition-all px-4 py-3 rounded-md hover:bg-slate-100 ${flowIndex === 0 ? "opacity-0 pointer-events-none" : ""}`}
              >
                <ChevronLeft size={18} />
                Zurück
              </button>

              {currentStage !== "CONTACT" ? (
                <button
                  onClick={onNext}
                  disabled={!canProceed}
                  className="flex items-center gap-3 px-8 py-4 rounded-md font-black bg-violet-600 text-white hover:bg-violet-700 disabled:opacity-40 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all shadow-xl shadow-violet-600/20 text-lg hover:scale-[1.02] active:scale-[0.98]"
                >
                  Weiter
                  <ArrowRight size={18} />
                </button>
              ) : (
                <button
                  type="submit"
                  form="contact-form"
                  disabled={!isFormValid || status === "loading"}
                  className="flex items-center justify-center gap-3 w-64 py-4 rounded-md font-black text-white bg-slate-900 hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-slate-900/20 text-lg"
                >
                  {status === "loading" ? <Loader2 className="animate-spin" size={20} /> : "Anfrage absenden"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Right: Live Cost Tracker (Desktop Sticky) ──────────────────────── */}
        <div className="hidden lg:flex lg:w-[360px] xl:w-[420px] lg:sticky lg:top-[65px] lg:h-[calc(100vh-65px)] flex-col bg-white border-l border-slate-200 shadow-[-20px_0_40px_-20px_rgba(0,0,0,0.05)] z-40">
          
          <div className="p-8 xl:p-10 flex-1 overflow-y-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-violet-50 border border-violet-100 text-violet-700 mb-10">
              <span className="w-2 h-2 rounded-full bg-violet-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest">Live-Kalkulation</span>
            </div>

            <div className="space-y-8">
              {/* Setup */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Einmaliges Setup
                </p>
                <motion.p
                  key={setup}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-5xl xl:text-6xl font-black text-slate-900 tracking-tighter"
                >
                  {setup === 0 ? "—" : `${setup.toLocaleString("de-DE")} €`}
                </motion.p>
              </div>

              {/* Monthly */}
              <div className={`transition-all duration-500 ${monthly > 0 ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none absolute"}`}>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  Monatliche Betreuung
                </p>
                <motion.p
                  key={monthly}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-3xl xl:text-4xl font-black text-amber-600 tracking-tighter flex items-baseline gap-1.5"
                >
                  {monthly.toLocaleString("de-DE")} € <span className="text-base text-slate-400 font-bold uppercase tracking-widest">/ mtl</span>
                </motion.p>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="mt-12 pt-8 border-t border-slate-100">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-5">
                Konfiguration
              </p>
              
              {services.length === 0 && <p className="text-sm font-semibold text-slate-400">Noch keine Systeme gewählt.</p>}
              
              <div className="space-y-3.5">
                {services.map((s) => (
                  <div key={s} className="flex items-start gap-3">
                    <Check size={16} className="text-violet-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-bold text-slate-700 leading-snug">
                      {MAIN_SERVICES.find((m) => m.id === s)?.label}
                    </span>
                  </div>
                ))}
                {(Object.keys(addons) as (keyof Addons)[]).map((key) => {
                  if (!addons[key]) return null;
                  const labels: Record<keyof Addons, string> = {
                    marke_premium_rebranding: "Premium Re-Branding", marke_geschaeftsausstattung: "Geschäftsausstattung",
                    website_texte: "Verkaufspsychologische Texte", website_seo: "Technisches SEO", website_recruiting: "Recruiting-System",
                    ki_lead_erfassung: "Automatisierte Lead-Erfassung", ki_chatbot: "24/7 KI-Chatbot", ki_bewertung: "Bewertungs-Maschine",
                    social_management: "Social Management (mtl.)", social_workshop: "Strategie-Workshop", social_video: "Videoproduktion"
                  };
                  return (
                    <div key={key} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 flex-shrink-0 mt-1.5 ml-1" />
                      <span className="text-sm text-slate-600 leading-snug">{labels[key]}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-200">
             <div className="flex items-start gap-3">
              <ShieldCheck size={24} className="text-emerald-600 flex-shrink-0 -mt-0.5" />
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                <strong className="text-slate-900 block mb-1">100% Festpreis-Garantie.</strong> Kein unvorhersehbarer Stundensatz. Sie kennen das exakte Investment vor Projektstart.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* ── Mobile Fixed Bottom Nav (The core fix) ────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] z-[100] flex items-center justify-between">
        
        {/* Mobile Price */}
        <div className="flex flex-col">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Live Investment</span>
          <div className="flex items-baseline gap-1">
            <motion.span key={setup} initial={{y:5, opacity:0}} animate={{y:0, opacity:1}} className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none">
              ab {setup.toLocaleString("de-DE")} €
            </motion.span>
            {monthly > 0 && <span className="text-[10px] font-bold text-amber-600 uppercase">+mtl</span>}
          </div>
        </div>

        {/* Mobile Action Buttons */}
        <div className="flex items-center gap-2">
          {flowIndex > 0 && (
            <button onClick={onPrev} className="w-12 h-12 flex items-center justify-center rounded-md bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
              <ChevronLeft size={20} />
            </button>
          )}

          {currentStage !== "CONTACT" ? (
            <button 
              onClick={onNext} 
              disabled={!canProceed}
              className="flex items-center gap-2 bg-violet-600 disabled:bg-slate-300 text-white px-5 sm:px-6 py-3.5 rounded-md font-black text-sm sm:text-base transition-colors shadow-lg shadow-violet-600/20 disabled:shadow-none"
            >
              Weiter <ArrowRight size={16}/>
            </button>
          ) : (
             <button 
              type="submit" 
              form="contact-form"
              disabled={!isFormValid || status === "loading"}
              className="flex items-center gap-2 bg-slate-900 disabled:bg-slate-300 text-white px-6 py-3.5 rounded-md font-black text-sm sm:text-base transition-colors shadow-lg shadow-slate-900/20 disabled:shadow-none"
            >
              {status === "loading" ? <Loader2 className="animate-spin" size={16}/> : "Absenden"}
            </button>
          )}
        </div>
      </div>

    </div>
  );
}
