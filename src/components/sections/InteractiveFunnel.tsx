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

// ─── Types ─────────────────────────────────────────────────────────────────────

type MainService = "marke" | "website" | "ki" | "social";

interface Addons {
  marke_premium_rebranding: boolean;
  marke_geschaeftsausstattung: boolean;
  website_texte: boolean;
  website_seo: boolean;
  website_recruiting: boolean;
  ki_lead_erfassung: boolean;
  ki_chatbot: boolean;
  ki_bewertung: boolean;
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

  services.forEach((s) => (setup += BASE_SETUP[s]));

  if (addons.marke_premium_rebranding) setup += 1500;
  if (addons.marke_geschaeftsausstattung) setup += 500;
  if (addons.website_texte) setup += 500;
  if (addons.website_seo) setup += 500;
  if (addons.website_recruiting) setup += 500;
  if (addons.ki_lead_erfassung) setup += 500;
  if (addons.ki_chatbot) setup += 500;
  if (addons.ki_bewertung) setup += 250;

  if (addons.social_management) monthly += 250;
  if (addons.social_workshop) setup += 1000;
  if (addons.social_video) setup += 500;

  if (maintenance.hosting) monthly += 100;
  if (maintenance.local_seo) monthly += 150;

  return { setup, monthly };
}

const contactSchema = z.object({
  name: z.string().min(2, "Bitte Ihren Namen eingeben."),
  email: z.string().email("Bitte eine gültige E-Mail eingeben."),
  company: z.string().min(2, "Bitte Ihr Unternehmen eingeben."),
  phone: z.string().optional(),
  gdpr: z.literal(true, { error: "Zustimmung erforderlich" }),
});

const stepVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 50 : -50 }),
  center: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const } },
  exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -50 : 50, transition: { duration: 0.25 } }),
};

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
    className={`cursor-pointer p-3 sm:p-4 border-2 transition-all duration-200 flex items-start gap-3 ${
      checked
        ? "border-indigo-600 bg-indigo-50/70"
        : "border-slate-200 hover:border-indigo-300 bg-white"
    }`}
  >
    <div
      className={`mt-0.5 w-5 h-5 flex items-center justify-center border-2 transition-colors flex-shrink-0 ${
        checked ? "bg-indigo-600 border-indigo-600" : "border-slate-300 bg-slate-50"
      }`}
    >
      {checked && <Check size={12} className="text-white" strokeWidth={4} />}
    </div>
    <div className="flex-1 min-w-0">
      <p className={`font-bold text-sm leading-tight ${checked ? "text-slate-900" : "text-slate-700"}`}>{label}</p>
      {desc && <p className="text-xs text-slate-500 mt-0.5 leading-snug">{desc}</p>}
      <p className={`text-[10px] mt-1 font-bold uppercase tracking-widest ${isMonthly ? "text-amber-600" : "text-indigo-600"}`}>
        {sublabel}
      </p>
    </div>
  </div>
);

const MAIN_SERVICES: { id: MainService; label: string; icon: React.ReactNode; price: string }[] = [
  { id: "marke", label: "Marke & Design", icon: <Palette size={24} />, price: "Basis ab 500 €" },
  { id: "website", label: "Website", icon: <Globe size={24} />, price: "Basis ab 1.000 €" },
  { id: "ki", label: "KI & Automatisierung", icon: <Zap size={24} />, price: "Basis ab 500 €" },
  { id: "social", label: "Social Media & Video", icon: <Video size={24} />, price: "Preis durch Add-ons" },
];

export const InteractiveFunnel = () => {
  const [direction, setDirection] = useState(1);
  const [services, setServices] = useState<MainService[]>([]);
  const [addons, setAddons] = useState<Addons>({
    marke_premium_rebranding: false, marke_geschaeftsausstattung: false,
    website_texte: false, website_seo: false, website_recruiting: false,
    ki_lead_erfassung: false, ki_chatbot: false, ki_bewertung: false,
    social_management: false, social_workshop: false, social_video: false,
  });
  const [maintenance, setMaintenance] = useState<Maintenance>({ hosting: false, local_seo: false });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const { setup, monthly } = calcCosts(services, addons, maintenance);

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
  });

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
    if (currentStage === "MAIN" && services.length === 0) return;
    if (flowIndex < flow.length - 1) {
      setDirection(1);
      setFlowIndex(flowIndex + 1);
    }
  };

  const onPrev = () => {
    if (flowIndex > 0) {
      setDirection(-1);
      setFlowIndex(flowIndex - 1);
    }
  };

  const onSubmitForm = async (data: ContactForm) => {
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("success");
  };

  const toggleService = (id: MainService) =>
    setServices((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);

  const toggleAddon = (key: keyof Addons) => setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleMaintenance = (key: keyof Maintenance) => setMaintenance((prev) => ({ ...prev, [key]: !prev[key] }));

  const isFormValid = isValid && currentStage === "CONTACT";
  const canProceed = currentStage !== "MAIN" || services.length > 0;
  const progressPercent = ((flowIndex + 1) / flow.length) * 100;

  return (
    <section id="projekt-anfragen" className="bg-white py-16 sm:py-24 font-sans tracking-tight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
            Interaktiver Kalkulator
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Konfigurieren Sie Ihr <span className="text-indigo-600">Projekt.</span>
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Keine versteckten Kosten. Wählen Sie Ihre Bausteine und sehen Sie den Festpreis sofort.
          </p>
        </div>

        {status === "success" ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white max-w-2xl mx-auto w-full p-8 md:p-12 text-center shadow-xl shadow-slate-200/60 border border-slate-200">
            <div className="w-24 h-24 bg-emerald-50 flex items-center justify-center mx-auto mb-8 border border-emerald-200">
              <CheckCircle2 size={48} className="text-emerald-600" />
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 mb-4">Anfrage erhalten!</h2>
            <p className="text-slate-500 text-lg mb-10 leading-relaxed max-w-md mx-auto">
              Wir haben Ihr System gespeichert und melden uns rasch mit dem Angebot bei Ihnen.
            </p>
            <div className="bg-slate-50 border border-slate-200 rounded-md p-6 sm:p-8">
              <div className="flex items-center gap-3 justify-center mb-4 text-indigo-600">
                <Calendar size={24} />
                <span className="font-black">Kick-off direkt buchen</span>
              </div>
              <p className="text-slate-500 text-sm mb-6">Sichern Sie sich direkt einen Termin in unserem Kalender.</p>
              <div className="border border-slate-200 bg-white rounded-md h-20 flex items-center justify-center shadow-sm">
                <span className="text-slate-400 font-semibold text-xs uppercase tracking-widest">Calendly-Embed</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-200/60 overflow-hidden flex flex-col lg:flex-row max-w-6xl mx-auto min-h-[600px]">

            {/* ── Left: Wizard Content ──────────────────────────────────────────── */}
            <div className="flex-1 flex flex-col relative overflow-hidden" style={{ height: "min(620px, calc(100svh - 140px))" }}>
              
              {/* Internal Header */}
              <div className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white z-20">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-10">
                    {flowIndex > 0 && (
                      <button onClick={onPrev} className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors">
                        <ChevronLeft size={16} />
                      </button>
                    )}
                  </div>
                  <div className="flex-1 h-1 bg-slate-100 overflow-hidden">
                    <div className="h-full bg-indigo-600 transition-all duration-500" style={{ width: `${progressPercent}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest min-w-[32px] text-right">
                    {flowIndex + 1}/{flow.length}
                  </span>
                </div>
              </div>

              {/* Scrollable Content Container */}
              <div className="flex-1 overflow-x-hidden overflow-y-auto px-4 py-3 sm:px-8 sm:py-5 lg:px-14" id="funnel-scroll-container">
                <AnimatePresence mode="wait" custom={direction}>
                  
                  {currentStage === "MAIN" && (
                    <motion.div key="main" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-4 pb-4">
                      <div>
                        <h1 className="text-xl sm:text-3xl lg:text-4xl font-black text-slate-900 mb-1.5">Was benötigt Ihr Unternehmen?</h1>
                        <p className="text-slate-500 text-xs sm:text-sm">Mehrfachauswahl möglich. Preise entstehen live.</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 sm:gap-3">
                        {MAIN_SERVICES.map((srv) => {
                          const active = services.includes(srv.id);
                          return (
                            <div key={srv.id} onClick={() => toggleService(srv.id)} className={`cursor-pointer p-3 sm:p-4 border-2 transition-all flex flex-col gap-2.5 ${active ? "border-indigo-600 bg-indigo-50/50" : "border-slate-200 bg-white"}`}>
                              <div className="flex items-start justify-between">
                                <div className={`w-9 h-9 flex items-center justify-center ${active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"}`}>{srv.icon}</div>
                                <div className={`w-5 h-5 flex items-center justify-center border-2 ${active ? "bg-indigo-600 border-indigo-600" : "border-slate-300"}`}>{active && <Check size={12} className="text-white" strokeWidth={3} />}</div>
                              </div>
                              <div>
                                <p className="font-bold text-sm text-slate-900">{srv.label}</p>
                                <p className="text-[10px] font-bold text-indigo-600 mt-0.5 uppercase">{srv.price}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {currentStage === "ADDON_MARKE" && (
                     <motion.div key="marke" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-4 pb-4">
                       <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 font-black text-[10px] uppercase"><Palette size={11} /> Marke</div>
                       <h1 className="text-xl sm:text-3xl font-black text-slate-900">Welche Details?</h1>
                       <div className="space-y-2">
                         <ToggleCard label="Premium Re-Branding" sublabel="+ 1.500 €" desc="Komplette Neuentwicklung der Markenidentität." checked={addons.marke_premium_rebranding} onToggle={() => toggleAddon("marke_premium_rebranding")} />
                         <ToggleCard label="Geschäftsausstattung" sublabel="+ 500 €" desc="Visitenkarten, Briefpapier & Mailsignaturen." checked={addons.marke_geschaeftsausstattung} onToggle={() => toggleAddon("marke_geschaeftsausstattung")} />
                       </div>
                     </motion.div>
                  )}

                  {currentStage === "ADDON_WEBSITE" && (
                    <motion.div key="website" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-4 pb-4">
                       <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 font-black text-[10px] uppercase"><Globe size={11} /> Website</div>
                       <h1 className="text-xl sm:text-3xl font-black text-slate-900">Website Power-Ups</h1>
                       <div className="space-y-2">
                         <ToggleCard label="Premium Copywriting" sublabel="+ 500 €" desc="Verkaufspsychologische Texte für maximale Conversion." checked={addons.website_texte} onToggle={() => toggleAddon("website_texte")} />
                         <ToggleCard label="Tech SEO & On-Page" sublabel="+ 500 €" desc="Besseres initiales Google-Ranking durch Setup." checked={addons.website_seo} onToggle={() => toggleAddon("website_seo")} />
                         <ToggleCard label="Recruiting-System" sublabel="+ 500 €" desc="Eigene Karrierepage für einfaches Bewerber-Management." checked={addons.website_recruiting} onToggle={() => toggleAddon("website_recruiting")} />
                       </div>
                    </motion.div>
                  )}

                  {currentStage === "ADDON_KI" && (
                    <motion.div key="ki" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-4 pb-4">
                       <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 font-black text-[10px] uppercase"><Zap size={11} /> KI Systeme</div>
                       <h1 className="text-xl sm:text-3xl font-black text-slate-900">Was automatisieren?</h1>
                       <div className="space-y-2">
                         <ToggleCard label="Smarte Lead-Erfassung" sublabel="+ 500 €" desc="CRM Anbindung & Auto-Mails." checked={addons.ki_lead_erfassung} onToggle={() => toggleAddon("ki_lead_erfassung")} />
                         <ToggleCard label="KI-Chatbot 24/7" sublabel="+ 500 €" desc="Beantwortet Support-Fragen Ihrer Kunden." checked={addons.ki_chatbot} onToggle={() => toggleAddon("ki_chatbot")} />
                         <ToggleCard label="Bewertungs-Maschine" sublabel="+ 250 €" desc="Fängt automatisiert 5-Sterne-Reviews ab." checked={addons.ki_bewertung} onToggle={() => toggleAddon("ki_bewertung")} />
                       </div>
                    </motion.div>
                  )}

                  {currentStage === "ADDON_SOCIAL" && (
                    <motion.div key="social" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-4 pb-4">
                       <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 font-black text-[10px] uppercase"><Video size={11} /> Social</div>
                       <h1 className="text-xl sm:text-3xl font-black text-slate-900">Sichtbarkeit Details</h1>
                       <div className="space-y-2">
                         <ToggleCard label="Social Management" sublabel="+ 250 €/Mo" isMonthly desc="Laufende Pflege & Posting Ihres Contents." checked={addons.social_management} onToggle={() => toggleAddon("social_management")} />
                         <ToggleCard label="Strategie Workshop" sublabel="+ 1.000 €" desc="Wir erarbeiten Ihren Content-Masterplan." checked={addons.social_workshop} onToggle={() => toggleAddon("social_workshop")} />
                         <ToggleCard label="Reel-/Videoproduktion" sublabel="+ 500 €" desc="Professioneller Schnitt & Drehtag." checked={addons.social_video} onToggle={() => toggleAddon("social_video")} />
                       </div>
                    </motion.div>
                  )}

                  {currentStage === "MAINTENANCE" && (
                    <motion.div key="maintenance" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-4 pb-4">
                       <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 font-black text-[10px] uppercase"><ShieldCheck size={11} /> Betreuung</div>
                       <h1 className="text-xl sm:text-3xl font-black text-slate-900">Laufender Support</h1>
                       <div className="space-y-2">
                         <ToggleCard label="Premium-Hosting" sublabel="+ 100 €/Mo" isMonthly desc="Backups, Sicherheitsupdates & superschnelle Ladezeiten." checked={maintenance.hosting} onToggle={() => toggleMaintenance("hosting")} />
                         <ToggleCard label="Local SEO" sublabel="+ 150 €/Mo" isMonthly desc="Google-Präsenz und lokale Sichtbarkeit in Ihrer Region." checked={maintenance.local_seo} onToggle={() => toggleMaintenance("local_seo")} />
                       </div>
                    </motion.div>
                  )}

                  {currentStage === "CONTACT" && (
                    <motion.div key="contact" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-4 pb-4">
                      <div className="mb-4">
                        <h1 className="text-xl sm:text-3xl font-black text-slate-900">Letzter Schritt.</h1>
                        <p className="text-slate-500 text-xs sm:text-sm mt-1.5">Ihre Kontaktdaten für das kostenlose Strategie-Gespräch.</p>
                      </div>
                      <form id="contact-form-homepage" onSubmit={handleSubmit(onSubmitForm)} className="space-y-2">
                        <div className="h-[84px]">
                          <input {...register("name")} placeholder="Ihr Name *" className={`w-full px-5 py-4 rounded-md bg-white border-2 text-base shadow-sm transition-colors ${errors.name ? "border-rose-400" : "border-slate-200 focus:border-indigo-600"}`} />
                          {errors.name && <p className="text-rose-500 text-[11px] font-bold mt-1 px-1">{errors.name.message}</p>}
                        </div>
                        <div className="h-[84px]">
                          <input {...register("company")} placeholder="Ihr Unternehmen *" className={`w-full px-5 py-4 rounded-md bg-white border-2 text-base shadow-sm transition-colors ${errors.company ? "border-rose-400" : "border-slate-200 focus:border-indigo-600"}`} />
                          {errors.company && <p className="text-rose-500 text-[11px] font-bold mt-1 px-1">{errors.company.message}</p>}
                        </div>
                        <div className="h-[84px]">
                          <input {...register("email")} type="email" placeholder="Geschäftliche E-Mail *" className={`w-full px-5 py-4 rounded-md bg-white border-2 text-base shadow-sm transition-colors ${errors.email ? "border-rose-400" : "border-slate-200 focus:border-indigo-600"}`} />
                          {errors.email && <p className="text-rose-500 text-[11px] font-bold mt-1 px-1">{errors.email.message}</p>}
                        </div>
                        <div className="h-[84px]">
                          <input {...register("phone")} type="tel" placeholder="Telefon (optional)" className="w-full px-5 py-4 rounded-md bg-white border-2 border-slate-200 focus:border-indigo-600 text-base shadow-sm transition-colors" />
                        </div>
                        <div className="min-h-[60px]">
                          <div className="flex items-start gap-3 px-1 py-1">
                            <div className="pt-1">
                              <input type="checkbox" id="gdpr-home" {...register("gdpr")} className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-600 cursor-pointer" />
                            </div>
                            <label htmlFor="gdpr-home" className="text-[11px] text-slate-500 leading-snug cursor-pointer">
                              Ich stimme zu, dass meine Daten zur Bearbeitung dieser Anfrage gespeichert werden. Details in der <a href="/datenschutz" className="text-indigo-600 hover:underline">Datenschutzerklärung</a>. *
                            </label>
                          </div>
                          {errors.gdpr && <p className="text-rose-500 text-[10px] font-bold uppercase tracking-wider px-1 mt-1">{errors.gdpr.message}</p>}
                        </div>
                      </form>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Mobile Embedded Bottom Action Bar (Fixed INSIDE the card) */}
              <div className="shrink-0 bg-white border-t border-slate-200 px-4 sm:px-6 py-3 flex items-center justify-between z-20">
                <div className="flex flex-col lg:hidden">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Investment</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight leading-none">ab {setup.toLocaleString()} €</span>
                  </div>
                </div>
                
                <div className="hidden lg:block text-slate-400 text-xs font-medium">
                  {currentStage === "CONTACT" ? "Bereit zum Absenden" : "Wählen Sie Ihre Bausteine"}
                </div>

                {currentStage !== "CONTACT" ? (
                  <button onClick={() => { onNext(); document.getElementById('funnel-scroll-container')?.scrollTo(0,0); }} disabled={!canProceed} className="flex items-center gap-2 bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-md font-bold transition-all shadow-md">
                    Weiter <ArrowRight size={16}/>
                  </button>
                ) : (
                   <button type="submit" form="contact-form-homepage" disabled={!isFormValid || status === "loading"} className="flex items-center gap-2 bg-slate-900 disabled:bg-slate-200 text-white px-8 py-3.5 rounded-md font-bold transition-all shadow-md">
                    {status === "loading" ? <Loader2 className="animate-spin" size={16}/> : "Absenden"}
                  </button>
                )}
              </div>
            </div>

            {/* ── Right: Live Cost Tracker (Desktop Only) ──────────────────────── */}
            <div className="hidden lg:flex w-[340px] xl:w-[400px] flex-col bg-slate-50 border-l border-slate-200">
               <div className="p-8 xl:p-10 flex-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-slate-200 bg-white shadow-sm mb-10">
                    <span className="w-2 h-2 bg-indigo-600 animate-pulse" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Live-Kalkulation</span>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Setup</p>
                      <motion.p key={setup} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-4xl xl:text-5xl font-black text-slate-900 tracking-tighter">
                        {setup === 0 ? "—" : `${setup.toLocaleString("de-DE")} €`}
                      </motion.p>
                    </div>

                    {monthly > 0 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Monatlich</p>
                        <p className="text-3xl font-black text-amber-600 tracking-tighter">
                          {monthly.toLocaleString("de-DE")} €
                        </p>
                      </motion.div>
                    )}
                  </div>

                   <div className="mt-12 pt-8 border-t border-slate-200">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-5">Beinhaltet</p>
                    {services.length === 0 && <p className="text-sm text-slate-400">Noch nichts gewählt.</p>}
                    <div className="space-y-3.5">
                      {services.map((s) => (
                        <div key={s} className="flex items-start gap-3">
                          <Check size={16} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-bold text-slate-800">{MAIN_SERVICES.find((m) => m.id === s)?.label}</span>
                        </div>
                      ))}
                      {/* Short list of addons */}
                      {(Object.keys(addons) as (keyof Addons)[]).filter(k => addons[k]).map((key) => (
                          <div key={key} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-slate-300 flex-shrink-0 mt-1.5 ml-1" />
                            <span className="text-xs font-medium text-slate-600">Add-on aktiviert</span>
                          </div>
                      ))}
                    </div>
                  </div>
               </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
};
