"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  ArrowLeft,
  Globe,
  Palette,
  Video,
  Zap,
  ShieldCheck,
  CheckCircle2,
  Loader2,
} from "lucide-react";

// ── Types & Config ─────────────────────────────────────────────────────────

type CategoryId = "marke" | "website" | "ki" | "social" | "betreuung";

interface SubOption {
  id: string;
  label: string;
}

interface ServiceCategory {
  id: CategoryId;
  label: string;
  icon: React.ReactNode;
  price: number;
  monthly?: boolean;
  subOptions: SubOption[];
}

const CATEGORIES: ServiceCategory[] = [
  {
    id: "marke",
    label: "Marke & Design",
    icon: <Palette size={20} />,
    price: 500,
    subOptions: [
      { id: "branding", label: "Premium Branding & Re-Branding" },
      { id: "geschaeft", label: "Geschäftsausstattung" },
    ],
  },
  {
    id: "website",
    label: "Website & digitale Auftritte",
    icon: <Globe size={20} />,
    price: 1000,
    subOptions: [
      { id: "website-komplett", label: "Schlüsselfertige Website" },
      { id: "texte", label: "Verkaufspsychologische Texte" },
      { id: "seo", label: "Suchmaschinenoptimierung (SEO)" },
      { id: "kontaktformular", label: "Interaktive Lead-Formulare" },
      { id: "recruiting", label: "Recruiting-Seite" },
    ],
  },
  {
    id: "ki",
    label: "KI-Systeme & Automatisierung",
    icon: <Zap size={20} />,
    price: 500,
    subOptions: [
      { id: "lead-mgmt", label: "Automatisches Lead-Management" },
      { id: "chatbot", label: "24/7 KI-Kundenassistent" },
      { id: "bewertung", label: "Automatische Bewertungs-Maschine" },
    ],
  },
  {
    id: "social",
    label: "Social Media & Video",
    icon: <Video size={20} />,
    price: 0,
    monthly: true,
    subOptions: [
      { id: "social-mgmt", label: "Social Media Management" },
      { id: "social-beratung", label: "Strategische Beratung" },
      { id: "video", label: "Professionelle Videoproduktion" },
    ],
  },
  {
    id: "betreuung",
    label: "Laufende Betreuung",
    icon: <ShieldCheck size={20} />,
    price: 0,
    monthly: true,
    subOptions: [
      { id: "hosting", label: "Sicheres Hosting & Wartung" },
      { id: "local-seo", label: "Regionales Google Local SEO" },
    ],
  },
];

// ── Schema ─────────────────────────────────────────────────────────────────

const schema = z.object({
  name: z.string().min(2, "Bitte Namen eintragen"),
  email: z.string().email("Ungültige E-Mail Adresse"),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const submitLead = async (
  data: FormData & { categories: CategoryId[]; subOptions: string[]; total: number }
) => {
  await new Promise((r) => setTimeout(r, 1200));
  return { success: true };
};

// ── Slide variants ─────────────────────────────────────────────────────────

const slideVariants = {
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
  const [step, setStep] = useState(0);             // 0: Cat, 1: Subs, 2: Form
  const [catStep, setCatStep] = useState(0);       // Internal sub-step for categories
  const [dir, setDir] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<CategoryId[]>([]);
  const [selectedSubs, setSelectedSubs] = useState<Partial<Record<CategoryId, string[]>>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  // Event Handlers
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

  const currentCat = CATEGORIES.find((c) => c.id === selectedCategories[catStep]);
  const currentSubsSelected = currentCat ? (selectedSubs[currentCat.id] ?? []).length > 0 : false;
  const isLastCat = catStep >= selectedCategories.length - 1;

  // Pricing
  const calculatedTotal = CATEGORIES.filter((c) => selectedCategories.includes(c.id)).reduce(
    (sum, c) => sum + (c.price || 0),
    0
  );
  const hasMonthly = CATEGORIES.some((c) => selectedCategories.includes(c.id) && c.monthly);

  // Navigation Logic
  const handleNext = () => {
    if (step === 0 && selectedCategories.length > 0) {
      setDir(1);
      setCatStep(0);
      setStep(1);
    } else if (step === 1 && currentSubsSelected) {
      if (isLastCat) {
        setDir(1);
        setStep(2);
      } else {
        setDir(1);
        setCatStep((p) => p + 1);
      }
    }
  };

  const handleBack = () => {
    if (step === 1) {
      if (catStep === 0) {
        setDir(-1);
        setStep(0);
      } else {
        setDir(-1);
        setCatStep((p) => p - 1);
      }
    } else if (step === 2) {
      setDir(-1);
      setCatStep(selectedCategories.length - 1);
      setStep(1);
    }
  };

  const totalSteps = selectedCategories.length > 0 ? 2 + selectedCategories.length : 3;
  const currentOverallStep = step === 0 ? 1 : step === 1 ? 2 + catStep : totalSteps;

  const onSubmitForm = async (data: FormData) => {
    setStatus("loading");
    await submitLead({
      ...data,
      categories: selectedCategories,
      subOptions: Object.values(selectedSubs).flat(),
      total: calculatedTotal
    });
    setStatus("success");
  };

  // Status vars
  let isNextDisabled = false;
  if (step === 0 && selectedCategories.length === 0) isNextDisabled = true;
  if (step === 1 && !currentSubsSelected) isNextDisabled = true;
  
  if (status === "success") {
    // SUCCESS SCREEN (Completely detached from funnel logic)
    return (
      <section className="bg-slate-50 py-12 sm:py-20 flex justify-center items-center font-sans tracking-tight" id="projekt-anfragen">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white max-w-lg w-full mx-4 rounded-2xl shadow-2xl p-8 text-center border border-slate-100">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-emerald-500" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-3">Anfrage erfolgreich!</h3>
          <p className="text-slate-500 mb-8 leading-relaxed">
            Wir haben Ihre Konfiguration erhalten und melden uns in Kürze. 
            Für den schnellsten Start können Sie direkt hier Ihren Termin im Kalender buchen:
          </p>
          <div className="w-full aspect-[4/3] bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 gap-2">
            <CalendarDays size={32} />
            <span className="font-bold">Calendly Einbindung</span>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section id="projekt-anfragen" className="bg-slate-50 py-12 sm:py-20 font-sans tracking-tight">
      <div className="max-w-2xl mx-auto px-4 z-10 relative">

        {/* The Quiz Container */}
        <div className="bg-white rounded-2xl sm:rounded-[32px] shadow-2xl shadow-indigo-900/5 border border-slate-100 overflow-hidden relative flex flex-col min-h-[500px] sm:min-h-[550px]">
          
          {/* STATIC TOP BAR - Always visible, never scrolls */}
          <div className="sticky top-0 w-full bg-white/90 backdrop-blur-md px-4 sm:px-8 py-4 sm:py-5 flex items-center justify-between border-b border-slate-100 z-50">
            {/* Back Button Placeholder */}
            <div className="w-12">
              {step > 0 && (
                <button onClick={handleBack} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 hover:bg-slate-100 text-slate-500 transition-colors">
                  <ArrowLeft size={18} />
                </button>
              )}
            </div>

            {/* Progress Bar (Dots) */}
            <div className="flex-1 flex justify-center items-center gap-1.5 px-4">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i + 1 === currentOverallStep ? "w-6 bg-indigo-600" : i + 1 < currentOverallStep ? "w-2 bg-indigo-300" : "w-2 bg-slate-100"
                  }`}
                />
              ))}
            </div>

            {/* Price Badge */}
            <div className="w-auto flex justify-end">
              <div className="bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-full flex flex-col items-end leading-none">
                <span className="text-[9px] uppercase tracking-wider opacity-60 mb-0.5">Budget ab</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm sm:text-base">{calculatedTotal.toLocaleString("de-DE")} €</span>
                  {hasMonthly && <span className="text-[9px] sm:text-[10px] opacity-70">+mtl</span>}
                </div>
              </div>
            </div>
          </div>

          {/* DYNAMIC CONTENT AREA - Centers the content */}
          <div className="flex-1 flex flex-col p-5 sm:p-8 relative">
            <AnimatePresence mode="wait" custom={dir}>

              {/* ── STEP 0: Main Categories ────────────────── */}
              {step === 0 && (
                <motion.div
                  key="s0"
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full flex-1 flex flex-col"
                >
                  <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Was ist Ihr Fokus?</h2>
                    <p className="text-slate-500 text-sm">Wählen Sie einen oder mehrere Bereiche aus.</p>
                  </div>

                  <div className="flex flex-col gap-2.5 sm:gap-3 flex-1 justify-center">
                    {CATEGORIES.map((cat) => {
                      const active = selectedCategories.includes(cat.id);
                      return (
                        <button
                          key={cat.id}
                          onClick={() => toggleCategory(cat.id)}
                          className={`w-full flex items-center p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 text-left ${
                            active 
                              ? "border-indigo-600 bg-indigo-50/50 shadow-sm" 
                              : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl shrink-0 transition-colors ${
                            active ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                          }`}>
                            {cat.icon}
                          </div>
                          <span className={`ml-4 flex-1 font-bold text-sm sm:text-base ${active ? "text-slate-900" : "text-slate-700"}`}>
                            {cat.label}
                          </span>
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors shrink-0 ${
                            active ? "bg-indigo-600 border-indigo-600" : "border-slate-200 bg-white"
                          }`}>
                            {active && <Check size={12} className="text-white" strokeWidth={4} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={isNextDisabled}
                    className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-4 sm:py-4 rounded-xl sm:rounded-2xl transition-all flex justify-center items-center gap-2 text-base shadow-lg shadow-indigo-600/20 disabled:shadow-none"
                  >
                    Weiter <ArrowRight size={18} />
                  </button>
                </motion.div>
              )}


              {/* ── STEP 1: Details for selected Category ──── */}
              {step === 1 && currentCat && (
                <motion.div
                  key={`s1-${currentCat.id}`}
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full flex-1 flex flex-col"
                >
                  <div className="text-center mb-6 sm:mb-8">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      {currentCat.icon}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">{currentCat.label}</h2>
                    <p className="text-slate-500 text-sm">Wobei genau brauchen Sie hier Unterstützung?</p>
                  </div>

                  <div className="flex flex-col gap-2.5 sm:gap-3 flex-1 justify-center">
                    {currentCat.subOptions.map((sub) => {
                      const active = (selectedSubs[currentCat.id] ?? []).includes(sub.id);
                      return (
                        <button
                          key={sub.id}
                          onClick={() => toggleSub(currentCat.id, sub.id)}
                          className={`w-full flex items-center p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 text-left ${
                            active 
                              ? "border-indigo-600 bg-indigo-50/50" 
                              : "border-slate-100 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                        >
                          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors shrink-0 ${
                            active ? "bg-indigo-600 border-indigo-600" : "border-slate-200 bg-white"
                          }`}>
                            {active && <Check size={12} className="text-white" strokeWidth={4} />}
                          </div>
                          <span className={`ml-4 flex-1 font-bold text-sm sm:text-base ${active ? "text-slate-900" : "text-slate-700"}`}>
                            {sub.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={isNextDisabled}
                    className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl sm:rounded-2xl transition-all flex justify-center items-center gap-2 text-base shadow-lg shadow-indigo-600/20 disabled:shadow-none"
                  >
                    {isLastCat ? "Kontaktdaten eingeben" : "Zum nächsten Schritt"} <ArrowRight size={18} />
                  </button>
                </motion.div>
              )}


              {/* ── STEP 2: Form ───────────────────────────── */}
              {step === 2 && (
                <motion.div
                  key="s2"
                  custom={dir}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full flex-1 flex flex-col"
                >
                  <div className="text-center mb-6 sm:mb-8">
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">Fast geschafft!</h2>
                    <p className="text-slate-500 text-sm">Wohin dürfen wir die Auswertung senden?</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col flex-1 justify-center max-w-sm w-full mx-auto" noValidate>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Name</label>
                        <input
                          {...register("name")}
                          placeholder="Max Mustermann"
                          className={`w-full bg-slate-50 border-2 rounded-xl sm:rounded-2xl px-5 py-4 text-base text-slate-900 placeholder-slate-400 outline-none transition-all ${
                            errors.name ? "border-rose-300 focus:border-rose-500 bg-rose-50" : "border-transparent focus:border-indigo-600 focus:bg-white"
                          }`}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">E-Mail</label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="hallo@unternehmen.de"
                          className={`w-full bg-slate-50 border-2 rounded-xl sm:rounded-2xl px-5 py-4 text-base text-slate-900 placeholder-slate-400 outline-none transition-all ${
                            errors.email ? "border-rose-300 focus:border-rose-500 bg-rose-50" : "border-transparent focus:border-indigo-600 focus:bg-white"
                          }`}
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">Telefonnummer <span className="opacity-50">(optional)</span></label>
                        <input
                          {...register("phone")}
                          type="tel"
                          placeholder="+49 123 ..."
                          className="w-full bg-slate-50 border-2 rounded-xl sm:rounded-2xl px-5 py-4 text-base text-slate-900 placeholder-slate-400 border-transparent focus:border-indigo-600 focus:bg-white outline-none transition-all"
                        />
                      </div>
                    </div>

                    <p className="text-[11px] text-center text-slate-400 mt-6 leading-relaxed">
                      Unverbindliche Anfrage. Ihre Daten werden 100% DSGVO-konform behandelt.
                    </p>

                    <button
                      type="submit"
                      disabled={!isValid || status === "loading"}
                      className="w-full mt-4 bg-slate-900 hover:bg-black disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold py-4 rounded-xl sm:rounded-2xl transition-all flex justify-center items-center gap-2 text-base shadow-lg shadow-slate-900/20 disabled:shadow-none disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <><Loader2 size={18} className="animate-spin" /> Auswerten ...</>
                      ) : (
                        <><CheckCircle2 size={18} /> Projektanfrage absenden</>
                      )}
                    </button>
                  </form>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
