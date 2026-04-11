"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  Globe,
  Palette,
  Video,
  Zap,
  ShieldCheck,
  CheckCircle2,
  CalendarDays,
  Loader2,
} from "lucide-react";

// ── Types & Config ─────────────────────────────────────────────────────────

type CategoryId = "marke" | "website" | "ki" | "social" | "betreuung";

interface SubOption {
  id: string;
  label: string;
  desc: string;
}

interface ServiceCategory {
  id: CategoryId;
  label: string;
  tagline: string;
  icon: React.ReactNode;
  price: number;
  monthly?: boolean;
  subOptions: SubOption[];
}

const CATEGORIES: ServiceCategory[] = [
  {
    id: "marke",
    label: "Marke & Design",
    tagline: "Ihr erster Eindruck",
    icon: <Palette size={16} />,
    price: 500,
    subOptions: [
      {
        id: "branding",
        label: "Premium Branding & Re-Branding",
        desc: "Neue, unverwechselbare Markenidentität entwickeln",
      },
      {
        id: "geschaeft",
        label: "Geschäftsausstattung",
        desc: "Visitenkarten, Briefpapier & E-Mail-Signaturen",
      },
    ],
  },
  {
    id: "website",
    label: "Website & digitales Auftreten",
    tagline: "Ihr 24/7 Schaufenster",
    icon: <Globe size={16} />,
    price: 1000,
    subOptions: [
      {
        id: "website-komplett",
        label: "Die schlüsselfertige Website",
        desc: "Bis zu 5 Unterseiten, inkl. 2 Feedback-Schleifen",
      },
      {
        id: "texte",
        label: "Verkaufspsychologische Texte",
        desc: "Texte, die Besucher in Kunden verwandeln",
      },
      {
        id: "seo",
        label: "Suchmaschinenoptimierung (SEO)",
        desc: "Mehr organische Anfragen bei Google",
      },
      {
        id: "kontaktformular",
        label: "Kontaktformular",
        desc: "Strategisch platziert — mehr Anfragen, weniger Hürden",
      },
      {
        id: "recruiting",
        label: "Recruiting-Seite",
        desc: "Bewerber gewinnen in unter 60 Sekunden",
      },
    ],
  },
  {
    id: "ki",
    label: "KI-Systeme & Automatisierungen",
    tagline: "Mehr Zeit, effizienter arbeiten",
    icon: <Zap size={16} />,
    price: 500,
    subOptions: [
      {
        id: "lead-mgmt",
        label: "Automatisiertes Lead-Management",
        desc: "Sofort-Benachrichtigung bei neuen Anfragen",
      },
      {
        id: "chatbot",
        label: "24/7 KI-Kundenassistent",
        desc: "Beantwortet Fragen & bucht Termine automatisch",
      },
      {
        id: "bewertung",
        label: "Die Bewertungs-Maschine",
        desc: "Automatisch mehr 5-Sterne-Bewertungen bei Google",
      },
    ],
  },
  {
    id: "social",
    label: "Social Media & Videoproduktion",
    tagline: "Ihre Marke in Bewegung",
    icon: <Video size={16} />,
    price: 0,
    monthly: true,
    subOptions: [
      {
        id: "social-mgmt",
        label: "Social Media Management",
        desc: "Komplette Betreuung Ihrer Kanäle (Instagram, LinkedIn …)",
      },
      {
        id: "social-beratung",
        label: "Strategische Social-Media-Beratung",
        desc: "Maßgeschneiderter Fahrplan für Ihre Branche",
      },
      {
        id: "video",
        label: "Professionelle Videoproduktion",
        desc: "Imagefilme & Short-Form Content (Reels / TikTok)",
      },
    ],
  },
  {
    id: "betreuung",
    label: "Laufende Betreuung & Sicherheit",
    tagline: "Rundum-Sorglos",
    icon: <ShieldCheck size={16} />,
    price: 0,
    monthly: true,
    subOptions: [
      {
        id: "hosting",
        label: "Sicheres Hosting & Wartung",
        desc: "Schnelle Server, Backups & Sicherheitsupdates",
      },
      {
        id: "local-seo",
        label: "Lokaler Vorteil (Google Local SEO)",
        desc: "Prominent in Ihrer Region gefunden werden",
      },
    ],
  },
];

// ── Schema ─────────────────────────────────────────────────────────────────

const schema = z.object({
  name: z.string().min(2, "Pflichtfeld"),
  email: z.string().email("Ungültige E-Mail"),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const submitLead = async (
  data: FormData & { categories: CategoryId[]; subOptions: string[]; total: number }
) => {
  await new Promise((r) => setTimeout(r, 1200));
  return { success: true };
};

// ── Step Indicator ─────────────────────────────────────────────────────────

const STEP_LABELS = ["Leistungen", "Details", "Kontakt"];

const StepIndicator = ({ current }: { current: number }) => (
  <div className="flex items-center justify-center gap-1.5 sm:gap-2">
    {STEP_LABELS.map((label, i) => (
      <div key={i} className="flex items-center gap-1.5 sm:gap-2">
        <div className="flex items-center gap-1.5">
          <div
            className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold transition-all duration-300 ${
              i < current
                ? "bg-indigo-600 text-white"
                : i === current
                ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            {i < current ? <Check size={10} strokeWidth={3} /> : i + 1}
          </div>
          <span
            className={`text-[10px] sm:text-xs font-semibold hidden sm:block transition-colors ${
              i === current ? "text-slate-900" : "text-slate-400"
            }`}
          >
            {label}
          </span>
        </div>
        {i < STEP_LABELS.length - 1 && (
          <div
            className={`h-[1px] w-4 sm:w-8 transition-all duration-500 ${
              i < current ? "bg-indigo-500" : "bg-slate-200"
            }`}
          />
        )}
      </div>
    ))}
  </div>
);

// ── Slide variants ─────────────────────────────────────────────────────────

const slide = {
  enter: (dir: number) => ({
    x: dir > 0 ? 30 : -30,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -30 : 30,
    opacity: 0,
  }),
};

// ── Component ──────────────────────────────────────────────────────────────

export const InteractiveFunnel = () => {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>(
    []
  );
  const [selectedSubs, setSelectedSubs] = useState<
    Partial<Record<CategoryId, string[]>>
  >({});
  const [catStep, setCatStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  // Helpers
  const toggleCategory = (id: CategoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleSub = (catId: CategoryId, subId: string) => {
    setSelectedSubs((prev) => {
      const current = prev[catId] ?? [];
      return {
        ...prev,
        [catId]: current.includes(subId)
          ? current.filter((s) => s !== subId)
          : [...current, subId],
      };
    });
  };

  const currentCat = CATEGORIES.find(
    (c) => c.id === selectedCategories[catStep]
  );
  const currentSubsSelected = currentCat
    ? (selectedSubs[currentCat.id] ?? []).length > 0
    : false;
  const isLastCat = catStep >= selectedCategories.length - 1;

  // Pricing Logic
  const calculatedTotal = CATEGORIES.filter((c) => selectedCategories.includes(c.id)).reduce(
    (sum, c) => sum + (c.price || 0),
    0
  );
  const hasMonthly = CATEGORIES.some((c) => selectedCategories.includes(c.id) && c.monthly);

  // Navigation
  const goNext = (nextStep: number, nextCat?: number) => {
    setDir(1);
    if (nextCat !== undefined) setCatStep(nextCat);
    setStep(nextStep);
  };
  const goBack = (prevStep: number, prevCat?: number) => {
    setDir(-1);
    if (prevCat !== undefined) setCatStep(prevCat);
    setStep(prevStep);
  };

  const handleNextAction = () => {
    if (step === 0) {
      if (selectedCategories.length === 0) return;
      goNext(1, 0);
    } else if (step === 1) {
      if (!currentSubsSelected) return;
      if (isLastCat) {
        goNext(2);
      } else {
        setDir(1);
        setCatStep((p) => p + 1);
      }
    } else if (step === 2) {
      // Handled by form submit
    }
  };

  const handleBackAction = () => {
    if (step === 1) {
      if (catStep === 0) {
        goBack(0);
      } else {
        setDir(-1);
        setCatStep((p) => p - 1);
      }
    } else if (step === 2) {
      goBack(1, selectedCategories.length - 1);
    }
  };

  const allSubOptions = Object.values(selectedSubs).flat();

  const onSubmitForm = async (data: FormData) => {
    setStatus("loading");
    await submitLead({
      ...data,
      categories: selectedCategories,
      subOptions: allSubOptions,
      total: calculatedTotal
    });
    setStatus("success");
  };

  // Determine if Next Button should be disabled
  let isNextDisabled = false;
  if (step === 0 && selectedCategories.length === 0) isNextDisabled = true;
  if (step === 1 && !currentSubsSelected) isNextDisabled = true;
  if (step === 2 && !isValid) isNextDisabled = true;

  // Determine Next Button Label
  let nextLabel = "Weiter";
  if (step === 1 && isLastCat) nextLabel = "Zum Abschluss";
  if (step === 2) nextLabel = "Absenden";

  return (
    <section
      id="projekt-anfragen"
      className="bg-slate-50 py-8 sm:py-16 md:py-20"
      aria-labelledby="funnel-heading"
    >
      <div className="max-w-xl mx-auto px-2 sm:px-6">
        
        {/* Section Header - Only visible on desktop to save space on mobile */}
        <div className="text-center mb-6 hidden sm:block">
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-2">
            Projekt-Konfigurator
          </p>
          <h2
            id="funnel-heading"
            className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight"
          >
            Was braucht Ihr <span className="text-indigo-600">Unternehmen?</span>
          </h2>
        </div>

        <AnimatePresence mode="wait">
          {/* ── SUCCESS ──────────────────────────────────────────────── */}
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden"
            >
              <div className="p-6 sm:p-8 text-center border-b border-slate-100">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Anfrage erhalten!
                </h3>
                <p className="text-slate-500 text-sm max-w-sm mx-auto">
                  Wir melden uns innerhalb von 24 Stunden. Buchen Sie direkt
                  Ihren kostenlosen Strategie-Call:
                </p>
              </div>
              <div className="bg-slate-50 p-6 sm:p-8 flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-indigo-600 font-bold">
                  <CalendarDays size={20} />
                  Jetzt Kick-off Termin wählen
                </div>
                <div className="w-full h-[180px] bg-white border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 gap-2">
                  <CalendarDays size={28} className="text-slate-300" />
                  <p className="text-sm font-medium">Calendly-Embed</p>
                  <p className="text-xs text-slate-300">
                    Hier das Calendly-Widget einbetten
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ── FORM CARD ───────────────────────────────────────────── */
            <motion.div
              key="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-200/60 overflow-hidden flex flex-col w-full h-[88vh] sm:h-[650px]"
            >
              <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col w-full h-full" noValidate>
                
                {/* Header: Step Indicator */}
                <div className="shrink-0 px-4 sm:px-6 pt-5 pb-4 border-b border-slate-100 bg-white z-10">
                  <StepIndicator current={step} />
                </div>
  
                {/* Body: Scrollable Content */}
                <div className="flex-1 overflow-y-auto overflow-x-hidden relative bg-slate-50/30">
                  <AnimatePresence mode="wait" custom={dir}>
  
                    {/* ── STEP 0: Category Selection ─────────────────────── */}
                    {step === 0 && (
                      <motion.div
                        key="s0"
                        custom={dir}
                        variants={slide}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="p-4 sm:p-6"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400">
                            Was benötigen Sie?{" "}
                          </p>
                          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest bg-rose-50 px-2 py-0.5 rounded">
                            Mind. 1 wählen
                          </span>
                        </div>
  
                        <div className="flex flex-col gap-2">
                          {CATEGORIES.map((cat) => {
                            const active = selectedCategories.includes(cat.id);
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => toggleCategory(cat.id)}
                                className={`flex items-center gap-3 py-2.5 px-3 sm:px-4 sm:py-3.5 rounded-xl border-2 text-left w-full transition-all duration-200 ${
                                  active
                                    ? "border-indigo-500 bg-indigo-50/80 shadow-[0_4px_12px_-4px_rgba(99,102,241,0.2)]"
                                    : "border-slate-100/80 bg-white hover:border-indigo-200"
                                }`}
                              >
                                <div
                                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                                    active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                                  }`}
                                >
                                  {cat.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-[13px] sm:text-sm font-bold leading-tight ${active ? "text-slate-900" : "text-slate-700"}`}>
                                    {cat.label}
                                  </p>
                                  {/* Hide tagline on mobile for extreme compactness */}
                                  <p className="text-[10px] sm:text-[11px] text-slate-400 mt-0.5 hidden sm:block">
                                    {cat.tagline}
                                  </p>
                                </div>
                                <div
                                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                    active ? "bg-indigo-600 border-indigo-600" : "border-slate-200"
                                  }`}
                                >
                                  {active && <Check size={11} className="text-white" strokeWidth={3} />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
  
                    {/* ── STEP 1: Sub-options per Category ───────────────── */}
                    {step === 1 && currentCat && (
                      <motion.div
                        key={`s1-${catStep}`}
                        custom={dir}
                        variants={slide}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="p-4 sm:p-6"
                      >
                        {/* Mini breadcrumb within step */}
                        <div className="flex items-center gap-3 mb-5 p-3 sm:p-4 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 text-sm shadow-md shadow-indigo-600/20">
                            {currentCat.icon}
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500">
                              Kategorie {catStep + 1} von {selectedCategories.length}
                            </p>
                            <p className="text-[13px] sm:text-[15px] font-bold text-slate-900 leading-tight">
                              {currentCat.label}
                            </p>
                          </div>
                          {selectedCategories.length > 1 && (
                            <div className="flex gap-1">
                              {selectedCategories.map((_, i) => (
                                <div
                                  key={i}
                                  className={`h-1.5 rounded-full transition-all ${
                                    i === catStep ? "bg-indigo-500 w-4" : i < catStep ? "bg-indigo-300 w-1.5" : "bg-slate-200 w-1.5"
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                        </div>
  
                        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                          Bitte Details wählen:
                        </p>
  
                        <div className="flex flex-col gap-2">
                          {currentCat.subOptions.map((sub) => {
                            const active = (selectedSubs[currentCat.id] ?? []).includes(sub.id);
                            return (
                              <button
                                key={sub.id}
                                type="button"
                                onClick={() => toggleSub(currentCat.id, sub.id)}
                                className={`flex items-center gap-3 py-3 px-3 sm:px-4 rounded-xl border-2 text-left w-full transition-all duration-200 ${
                                  active
                                    ? "border-indigo-500 bg-indigo-50/80 shadow-[0_4px_12px_-4px_rgba(99,102,241,0.2)]"
                                    : "border-slate-100/80 bg-white hover:border-indigo-200"
                                }`}
                              >
                                <div
                                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors mt-0.5 self-start ${
                                    active ? "bg-indigo-600 border-indigo-600" : "border-slate-200"
                                  }`}
                                >
                                  {active && <Check size={10} className="text-white" strokeWidth={3} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className={`text-[12px] sm:text-[13px] font-bold leading-tight mb-0.5 ${active ? "text-slate-900" : "text-slate-700"}`}>
                                    {sub.label}
                                  </p>
                                  {/* Descriptions conditionally hidden on very small height screens, but usually fine here */}
                                  <p className="text-[10px] sm:text-[11px] text-slate-400 leading-snug">
                                    {sub.desc}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
  
                    {/* ── STEP 2: Contact Form ────────────────────────────── */}
                    {step === 2 && (
                      <motion.div
                        key="s2"
                        custom={dir}
                        variants={slide}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="p-4 sm:p-6"
                      >
                        {/* Summary Block */}
                        <div className="bg-indigo-50/60 border border-indigo-100/60 rounded-xl p-3 sm:p-4 mb-5">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 mb-2.5">
                            Ihre Anfrage
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {selectedCategories.map((catId) => {
                              const cat = CATEGORIES.find((c) => c.id === catId)!;
                              return (
                                <span key={catId} className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold bg-white text-slate-700 px-2 py-1 rounded-md border border-slate-200/60 shadow-sm">
                                  <span className="text-indigo-400">{cat.icon}</span>
                                  {cat.label}
                                </span>
                              );
                            })}
                          </div>
                        </div>
  
                        <p className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                          Wir melden uns bei Ihnen:
                        </p>
  
                        <div className="flex flex-col gap-3">
                          <div>
                            <input
                              {...register("name")}
                              placeholder="Ihr Name *"
                              className={`w-full bg-white border rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all ${
                                errors.name ? "border-rose-400 bg-rose-50" : "border-slate-200"
                              }`}
                            />
                            {errors.name && <p className="text-rose-500 text-[10px] mt-1 pl-1">{errors.name.message}</p>}
                          </div>
                          <div>
                            <input
                              {...register("email")}
                              type="email"
                              placeholder="E-Mail Adresse *"
                              className={`w-full bg-white border rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all ${
                                errors.email ? "border-rose-400 bg-rose-50" : "border-slate-200"
                              }`}
                            />
                            {errors.email && <p className="text-rose-500 text-[10px] mt-1 pl-1">{errors.email.message}</p>}
                          </div>
                          <div>
                            <input
                              {...register("phone")}
                              type="tel"
                              placeholder="Telefon (optional)"
                              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                            />
                          </div>
                        </div>
                        
                        <p className="text-center text-[10px] text-slate-400 mt-4 leading-relaxed max-w-[280px] mx-auto">
                          Unverbindlich & kostenlos.<br/>Mit dem Absenden stimmen Sie den Datenschutzbestimmungen zu.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
  
                {/* ── Sticky Bottom Navigation Bar ─────────────────────────── */}
                <div className="shrink-0 bg-white border-t border-slate-100 p-4 sm:p-5 flex items-center justify-between z-20 shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.05)]">
                  
                  {/* Left Side: Price or Back Button */}
                  {step === 0 ? (
                    <div className="flex flex-col">
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-400 leading-tight">Investment</span>
                      <div className="flex items-baseline gap-1 mt-0.5">
                        <motion.span 
                          key={calculatedTotal}
                          initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                          className="text-lg sm:text-xl font-black text-slate-900 leading-none"
                        >
                          {calculatedTotal === 0 ? "—" : `ab ${calculatedTotal.toLocaleString("de-DE")} €`}
                        </motion.span>
                        {hasMonthly && <span className="text-[10px] text-slate-400 font-bold ml-1">+ mtl.</span>}
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleBackAction}
                      className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-auto sm:px-6 sm:py-3.5 rounded-xl font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 transition-colors flex-shrink-0"
                      aria-label="Zurück"
                    >
                      <ArrowLeft size={18} />
                      <span className="hidden sm:inline-block ml-2">Zurück</span>
                    </button>
                  )}
  
                  {/* Right Side: Next / Submit Button */}
                  <div className="flex-1 flex justify-end">
                    {step === 2 ? (
                      <button
                        type="submit"
                        disabled={isNextDisabled || status === "loading"}
                        className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-600/20 w-fit"
                      >
                        {status === "loading" ? (
                          <><Loader2 size={16} className="animate-spin" /> Senden …</>
                        ) : (
                          <>{nextLabel} <ArrowRight size={16} /></>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNextAction}
                        disabled={isNextDisabled}
                        className={`inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-sm transition-all shadow-lg w-fit ${
                          isNextDisabled 
                            ? "bg-slate-100 text-slate-400 shadow-none cursor-not-allowed" 
                            : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20 hover:scale-[1.02]"
                        }`}
                      >
                        {nextLabel}
                        <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
  
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
