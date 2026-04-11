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
});

// ─── Sub-components ──────────────────────────────────────────────────────────

const stepVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 60 : -60,
  }),
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -60 : 60,
    transition: { duration: 0.25 },
  }),
};

interface ToggleRowProps {
  label: string;
  sublabel: string;
  checked: boolean;
  onToggle: () => void;
  isMonthly?: boolean;
}
const ToggleRow = ({ label, sublabel, checked, onToggle, isMonthly }: ToggleRowProps) => (
  <div
    onClick={onToggle}
    className={`flex items-center justify-between gap-4 p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
      checked
        ? "border-indigo-600 bg-indigo-50/40 shadow-sm shadow-indigo-100"
        : "border-slate-200 hover:border-slate-300 bg-white"
    }`}
  >
    <div className="flex-1">
      <p className={`font-bold text-sm md:text-base ${checked ? "text-slate-900" : "text-slate-700"}`}>
        {label}
      </p>
      <p className={`text-xs mt-0.5 font-semibold ${isMonthly ? "text-amber-600" : "text-indigo-600"}`}>
        {sublabel}
      </p>
    </div>
    <div
      className={`w-12 h-6 rounded-full flex items-center transition-all duration-300 flex-shrink-0 ${
        checked ? "bg-indigo-600" : "bg-slate-200"
      }`}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 500, damping: 40 }}
        className={`w-5 h-5 bg-white rounded-full shadow-md ${checked ? "ml-6" : "ml-0.5"}`}
      />
    </div>
  </div>
);

// ─── Main Page ───────────────────────────────────────────────────────────────

const STEPS = ["Systeme", "Details", "Betreuung", "Anfrage"] as const;

const MAIN_SERVICES: { id: MainService; label: string; icon: React.ReactNode; price: string }[] = [
  { id: "marke", label: "Marke & Design", icon: <Palette size={22} />, price: "ab 500 €" },
  { id: "website", label: "Website & digitaler Auftritt", icon: <Globe size={22} />, price: "ab 1.000 €" },
  { id: "ki", label: "KI-Systeme & Automatisierung", icon: <Zap size={22} />, price: "ab 500 €" },
  { id: "social", label: "Social Media & Video", icon: <Video size={22} />, price: "Preis durch Add-ons" },
];

export default function ProjektAnfragenPage() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [services, setServices] = useState<MainService[]>([]);
  const [addons, setAddons] = useState<Addons>({
    marke_premium_rebranding: false,
    marke_geschaeftsausstattung: false,
    website_texte: false,
    website_seo: false,
    website_recruiting: false,
    ki_lead_erfassung: false,
    ki_chatbot: false,
    ki_bewertung: false,
    social_management: false,
    social_workshop: false,
    social_video: false,
  });
  const [maintenance, setMaintenance] = useState<Maintenance>({
    hosting: false,
    local_seo: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const { setup, monthly } = calcCosts(services, addons, maintenance);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

  const navigate = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const toggleService = (id: MainService) =>
    setServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );

  const toggleAddon = (key: keyof Addons) =>
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));

  const toggleMaintenance = (key: keyof Maintenance) =>
    setMaintenance((prev) => ({ ...prev, [key]: !prev[key] }));

  const onSubmit = () => setSubmitted(true);

  const hasAnyAddon =
    services.includes("marke") ||
    services.includes("website") ||
    services.includes("ki") ||
    services.includes("social");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Minimal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/80 backdrop-blur-lg border-b border-slate-200">
        <Link href="/" className="text-indigo-600 font-black text-xl tracking-tight">
          Medien<span className="text-slate-900">Trupp</span>
        </Link>
        <span className="text-slate-500 text-sm font-semibold">Projekt-Konfigurator</span>
      </header>

      <div className="flex flex-col lg:flex-row flex-1 pt-[65px] min-h-screen">
        {/* ── Left: Wizard ──────────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col justify-start lg:justify-center px-4 py-8 lg:py-12 lg:px-12 xl:px-20 overflow-y-auto">
          {/* Step progress */}
          <div className="flex items-center gap-3 mb-10">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                    i < step
                      ? "bg-indigo-600 text-white"
                      : i === step
                      ? "bg-indigo-600 text-white ring-2 ring-indigo-200 ring-offset-2 ring-offset-slate-50"
                      : "bg-slate-200 text-slate-500"
                  }`}
                >
                  {i < step ? <Check size={14} /> : i + 1}
                </div>
                <span
                  className={`text-xs font-bold hidden sm:block ${
                    i === step ? "text-slate-900" : "text-slate-500"
                  }`}
                >
                  {label}
                </span>
                {i < STEPS.length - 1 && (
                  <div
                    className={`w-8 h-0.5 rounded ${i < step ? "bg-indigo-600" : "bg-slate-200"}`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="max-w-2xl w-full overflow-hidden relative">
            <AnimatePresence mode="wait" custom={direction}>
              {/* ── STEP 0: Hauptsysteme ─────────────────────────────────── */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
                      Was benötigen Sie?
                    </h1>
                    <p className="text-slate-500">Mehrfachauswahl möglich. Preise entstehen live neben Ihnen.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {MAIN_SERVICES.map((srv) => {
                      const active = services.includes(srv.id);
                      return (
                        <div
                          key={srv.id}
                          onClick={() => toggleService(srv.id)}
                          className={`cursor-pointer p-5 rounded-2xl border-2 transition-all duration-200 flex flex-col gap-3 ${
                            active
                              ? "border-indigo-600 bg-indigo-50/50 shadow-md shadow-indigo-100"
                              : "border-slate-200 hover:border-indigo-300 bg-white shadow-sm shadow-slate-100"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div
                              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-colors ${
                                active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                              }`}
                            >
                              {srv.icon}
                            </div>
                            <div
                              className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-colors flex-shrink-0 mt-0.5 ${
                                active ? "bg-indigo-600 border-indigo-600" : "border-slate-300"
                              }`}
                            >
                              {active && <Check size={14} className="text-white" />}
                            </div>
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{srv.label}</p>
                            <p className="text-xs font-semibold text-indigo-600 mt-0.5">{srv.price}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* ── STEP 1: Detail-Konfiguration ──────────────────────────── */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-8"
                >
                  <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
                      Feinabstimmung
                    </h1>
                    <p className="text-slate-500">Konfigurieren Sie Ihre gewählten Systeme im Detail.</p>
                  </div>

                  {!hasAnyAddon && (
                    <div className="bg-white rounded-md border border-slate-200 p-8 text-center shadow-sm">
                      <p className="text-slate-500">Sie haben noch keine Leistung ausgewählt. Bitte gehen Sie zurück zu Schritt 1.</p>
                    </div>
                  )}

                  {/* Marke Add-ons */}
                  {services.includes("marke") && (
                    <div className="space-y-3">
                      <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-3">
                        <span className="inline-flex items-center gap-1.5"><Palette size={14} /> Marke & Design</span>
                      </p>
                      <ToggleRow
                        label="Premium Re-Branding"
                        sublabel="+ 1.500 € einmalig"
                        checked={addons.marke_premium_rebranding}
                        onToggle={() => toggleAddon("marke_premium_rebranding")}
                      />
                      <ToggleRow
                        label="Geschäftsausstattung (Visitenkarten, Briefpapier etc.)"
                        sublabel="+ 500 € einmalig"
                        checked={addons.marke_geschaeftsausstattung}
                        onToggle={() => toggleAddon("marke_geschaeftsausstattung")}
                      />
                    </div>
                  )}

                  {/* Website Add-ons */}
                  {services.includes("website") && (
                    <div className="space-y-3">
                      <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-3">
                        <span className="inline-flex items-center gap-1.5"><Globe size={14} /> Website</span>
                      </p>
                      <ToggleRow
                        label="Verkaufspsychologische Texte & Copywriting"
                        sublabel="+ 500 € einmalig"
                        checked={addons.website_texte}
                        onToggle={() => toggleAddon("website_texte")}
                      />
                      <ToggleRow
                        label="Technisches SEO & On-Page Optimierung"
                        sublabel="+ 500 € einmalig"
                        checked={addons.website_seo}
                        onToggle={() => toggleAddon("website_seo")}
                      />
                      <ToggleRow
                        label="Recruiting-System & Karriereseite"
                        sublabel="+ 500 € einmalig"
                        checked={addons.website_recruiting}
                        onToggle={() => toggleAddon("website_recruiting")}
                      />
                    </div>
                  )}

                  {/* KI Add-ons */}
                  {services.includes("ki") && (
                    <div className="space-y-3">
                      <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-3">
                        <span className="inline-flex items-center gap-1.5"><Zap size={14} /> KI & Automatisierung</span>
                      </p>
                      <ToggleRow
                        label="Automatisierte Lead-Erfassung"
                        sublabel="+ 500 € einmalig"
                        checked={addons.ki_lead_erfassung}
                        onToggle={() => toggleAddon("ki_lead_erfassung")}
                      />
                      <ToggleRow
                        label="24/7 KI-Chatbot & Assistent"
                        sublabel="+ 500 € einmalig"
                        checked={addons.ki_chatbot}
                        onToggle={() => toggleAddon("ki_chatbot")}
                      />
                      <ToggleRow
                        label="Bewertungs-Maschine (Automatisierte Reviews)"
                        sublabel="+ 250 € einmalig"
                        checked={addons.ki_bewertung}
                        onToggle={() => toggleAddon("ki_bewertung")}
                      />
                    </div>
                  )}

                  {/* Social Add-ons */}
                  {services.includes("social") && (
                    <div className="space-y-3">
                      <p className="text-xs font-black uppercase tracking-widest text-indigo-600 mb-3">
                        <span className="inline-flex items-center gap-1.5"><Video size={14} /> Social Media & Video</span>
                      </p>
                      <ToggleRow
                        label="Social Media Management (laufend)"
                        sublabel="+ 250 € / Monat"
                        checked={addons.social_management}
                        onToggle={() => toggleAddon("social_management")}
                        isMonthly
                      />
                      <ToggleRow
                        label="Strategie Workshop (einmalig)"
                        sublabel="+ 1.000 € einmalig"
                        checked={addons.social_workshop}
                        onToggle={() => toggleAddon("social_workshop")}
                      />
                      <ToggleRow
                        label="Videoproduktion (einmalig)"
                        sublabel="+ 500 € einmalig"
                        checked={addons.social_video}
                        onToggle={() => toggleAddon("social_video")}
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── STEP 2: Laufende Betreuung ────────────────────────────── */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
                      Laufende Betreuung
                    </h1>
                    <p className="text-slate-500">
                      Sicherheit & Wachstum nach dem Launch — monatlich kündbar.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Pflicht-Toggle wenn Website */}
                    <div>
                      <ToggleRow
                        label={`Sicheres Hosting & Wartung${services.includes("website") ? " (empfohlen für Ihre Website)" : ""}`}
                        sublabel="100 € / Monat — inkl. Backups, Security & Updates"
                        checked={maintenance.hosting}
                        onToggle={() => toggleMaintenance("hosting")}
                        isMonthly
                      />
                      {services.includes("website") && !maintenance.hosting && (
                        <p className="text-amber-600 text-xs font-bold mt-1.5 ml-1">
                          ⚠ Für Ihre Website empfehlen wir diesen Service.
                        </p>
                      )}
                    </div>

                    <ToggleRow
                      label="Local SEO & Google Unternehmensprofil"
                      sublabel="ab 150 € / Monat — mehr lokale Sichtbarkeit & Bewertungen"
                      checked={maintenance.local_seo}
                      onToggle={() => toggleMaintenance("local_seo")}
                      isMonthly
                    />
                  </div>

                  {/* Summary teaser */}
                  <div className="bg-white rounded-md border border-slate-200 p-6 space-y-3 shadow-sm">
                    <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">Ihre aktuelle Kalkulation</p>
                    <div className="flex justify-between items-baseline">
                      <span className="text-slate-500 font-medium">Einmaliges Setup</span>
                      <span className="text-slate-900 font-black text-xl">ab {setup.toLocaleString("de-DE")} €</span>
                    </div>
                    {monthly > 0 && (
                      <div className="flex justify-between items-baseline pt-3 border-t border-slate-100">
                        <span className="text-slate-500 font-medium">Monatliche Kosten</span>
                        <span className="text-amber-600 font-black">{monthly.toLocaleString("de-DE")} € / Mon.</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ── STEP 3: Checkout ──────────────────────────────────────── */}
              {step === 3 && !submitted && (
                <motion.div
                  key="step3"
                  custom={direction}
                  variants={stepVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="space-y-6"
                >
                  <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
                      Fast geschafft.
                    </h1>
                    <p className="text-slate-500">Hinterlassen Sie Ihre Kontaktdaten — wir melden uns innerhalb von 24h.</p>
                  </div>

                  <form id="contact-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {[
                      { name: "name" as const, placeholder: "Ihr vollständiger Name *", type: "text" },
                      { name: "email" as const, placeholder: "Geschäftliche E-Mail *", type: "email" },
                      { name: "company" as const, placeholder: "Ihr Unternehmen *", type: "text" },
                      { name: "phone" as const, placeholder: "Telefon (optional)", type: "tel" },
                    ].map((field) => (
                      <div key={field.name}>
                        <input
                          {...register(field.name)}
                          placeholder={field.placeholder}
                          type={field.type}
                          className="w-full px-5 py-4 rounded-md bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 transition-all text-[16px] shadow-sm shadow-slate-100"
                        />
                        {errors[field.name] && (
                          <p className="text-red-500 text-xs mt-1.5 font-semibold">
                            {errors[field.name]?.message}
                          </p>
                        )}
                      </div>
                    ))}
                    <p className="text-slate-500 text-xs">
                      Ihre Daten werden SSL-verschlüsselt übertragen und nicht an Dritte weitergegeben.
                    </p>
                  </form>

                  <button
                    type="submit"
                    form="contact-form"
                    disabled={!isValid}
                    className="w-full flex items-center justify-center gap-2 px-8 py-5 rounded-md font-black text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-600/20 text-lg"
                  >
                    Anfrage verbindlich absenden
                    <ArrowRight size={20} />
                  </button>
                </motion.div>
              )}

              {/* ── SUCCESS STATE ─────────────────────────────────────────── */}
              {step === 3 && submitted && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="text-center py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                    className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-200"
                  >
                    <CheckCircle2 size={40} className="text-emerald-600" />
                  </motion.div>
                  <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-3">
                    Anfrage erhalten!
                  </h2>
                  <p className="text-slate-500 text-lg mb-10 max-w-sm mx-auto">
                    Wir melden uns innerhalb von{" "}
                    <strong className="text-slate-900">24 Stunden</strong> mit einem
                    konkreten Angebot bei Ihnen.
                  </p>

                  {/* Calendly Placeholder */}
                  <div className="bg-white border border-slate-200 rounded-md p-8 shadow-sm">
                    <div className="flex items-center gap-3 justify-center mb-4">
                      <Calendar size={24} className="text-indigo-600" />
                      <span className="font-bold text-slate-900">Kick-off direkt buchen</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-6">
                      Noch schneller? Buchen Sie Ihr kostenloses Kick-off-Gespräch (30 Min.) direkt in unserem Kalender.
                    </p>
                    <div className="bg-slate-50 border border-slate-200 rounded-md h-16 flex items-center justify-center">
                      <span className="text-slate-500 font-semibold text-sm">
                        📅 Calendly-Embed wird hier platziert
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {!(step === 3 && submitted) && (
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-200">
                <button
                  onClick={() => navigate(step - 1)}
                  disabled={step === 0}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold disabled:opacity-0 transition-all"
                >
                  <ChevronLeft size={18} />
                  Zurück
                </button>

                {step < 3 && (
                  <button
                    onClick={() => navigate(step + 1)}
                    disabled={step === 0 && services.length === 0}
                    className="flex items-center gap-2 px-7 py-3.5 rounded-md font-black bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-lg shadow-slate-900/20"
                  >
                    Weiter
                    <ArrowRight size={18} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Live Cost Tracker ───────────────────────────────────── */}
        <div className="lg:w-[340px] xl:w-[380px] lg:sticky lg:top-[65px] lg:h-[calc(100vh-65px)] flex flex-col justify-between bg-white border-t lg:border-t-0 lg:border-l border-slate-200 p-6 lg:p-8 lg:shadow-[-10px_0_30px_rgba(15,23,43,0.03)]">
          {/* Top */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-100 border border-slate-200 mb-8">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">Live Kalkulation</span>
            </div>

            <div className="space-y-6">
              {/* Setup */}
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                  Einmaliges Setup
                </p>
                <motion.p
                  key={setup}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl xl:text-5xl font-black text-slate-900 tracking-tight"
                >
                  ab {setup.toLocaleString("de-DE")} €
                </motion.p>
              </div>

              {/* Monthly */}
              <div className={`transition-opacity duration-300 ${monthly > 0 ? "opacity-100" : "opacity-30"}`}>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                  Monatliche Betreuung
                </p>
                <motion.p
                  key={monthly}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-black text-amber-600 tracking-tight"
                >
                  {monthly > 0 ? `${monthly.toLocaleString("de-DE")} €` : "0 €"}
                  <span className="text-slate-500 text-sm font-semibold"> / Mon.</span>
                </motion.p>
              </div>
            </div>

            {/* Breakdown */}
            {(services.length > 0 || monthly > 0) && (
              <div className="mt-8 pt-8 border-t border-slate-100 space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                  Beinhaltete Leistungen
                </p>
                {services.map((s) => (
                  <div key={s} className="flex items-center gap-2 text-sm">
                    <Check size={14} className="text-indigo-600 flex-shrink-0" />
                    <span className="text-slate-600 font-medium">
                      {MAIN_SERVICES.find((m) => m.id === s)?.label}
                    </span>
                  </div>
                ))}
                {(Object.keys(addons) as (keyof Addons)[]).map((key) => {
                  if (!addons[key]) return null;
                  const labels: Record<keyof Addons, string> = {
                    marke_premium_rebranding: "Premium Re-Branding",
                    marke_geschaeftsausstattung: "Geschäftsausstattung",
                    website_texte: "Copywriting",
                    website_seo: "SEO-Optimierung",
                    website_recruiting: "Recruiting-System",
                    ki_lead_erfassung: "Lead-Erfassung",
                    ki_chatbot: "KI-Chatbot 24/7",
                    ki_bewertung: "Bewertungs-Maschine",
                    social_management: "Social Management (mtl.)",
                    social_workshop: "Strategie Workshop",
                    social_video: "Videoproduktion",
                  };
                  return (
                    <div key={key} className="flex items-center gap-2 text-sm">
                      <Check size={14} className="text-indigo-600 flex-shrink-0" />
                      <span className="text-slate-600">{labels[key]}</span>
                    </div>
                  );
                })}
                {maintenance.hosting && (
                  <div className="flex items-center gap-2 text-sm">
                    <ShieldCheck size={14} className="text-amber-600 flex-shrink-0" />
                    <span className="text-slate-600">Hosting & Wartung (mtl.)</span>
                  </div>
                )}
                {maintenance.local_seo && (
                  <div className="flex items-center gap-2 text-sm">
                    <ShieldCheck size={14} className="text-amber-600 flex-shrink-0" />
                    <span className="text-slate-600">Local SEO (mtl.)</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Bottom: Security/Trust */}
          <div className="mt-10 py-6 border-t border-slate-100">
            <div className="flex items-start gap-3">
              <ShieldCheck size={20} className="text-slate-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-500 leading-relaxed">
                <strong className="text-slate-900">100% Festpreis-Garantie.</strong> Kein Stundensatz. Kein Overrun. Sie kennen Ihr Investment vor Projektstart — schriftlich und verbindlich.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
