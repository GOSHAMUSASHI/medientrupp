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
  subOptions: SubOption[];
}

const CATEGORIES: ServiceCategory[] = [
  {
    id: "marke",
    label: "Marke & Design",
    tagline: "Ihr erster Eindruck",
    icon: <Palette size={18} />,
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
    icon: <Globe size={18} />,
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
    icon: <Zap size={18} />,
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
    icon: <Video size={18} />,
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
    icon: <ShieldCheck size={18} />,
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
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  phone: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const submitLead = async (
  data: FormData & { categories: CategoryId[]; subOptions: string[] }
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
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              i < current
                ? "bg-indigo-600 text-white"
                : i === current
                ? "bg-indigo-600 text-white ring-4 ring-indigo-100"
                : "bg-slate-100 text-slate-400"
            }`}
          >
            {i < current ? <Check size={12} strokeWidth={3} /> : i + 1}
          </div>
          <span
            className={`text-xs font-semibold hidden sm:block transition-colors ${
              i === current ? "text-slate-900" : "text-slate-400"
            }`}
          >
            {label}
          </span>
        </div>
        {i < STEP_LABELS.length - 1 && (
          <div
            className={`h-px w-6 sm:w-10 transition-all duration-500 ${
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
    x: dir > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
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
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

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

  const handleNextCat = () => {
    if (!currentSubsSelected) return;
    if (isLastCat) {
      goNext(2);
    } else {
      setDir(1);
      setCatStep((p) => p + 1);
    }
  };

  const handleBackCat = () => {
    if (catStep === 0) {
      goBack(0);
    } else {
      setDir(-1);
      setCatStep((p) => p - 1);
    }
  };

  const allSubOptions = Object.values(selectedSubs).flat();

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    await submitLead({
      ...data,
      categories: selectedCategories,
      subOptions: allSubOptions,
    });
    setStatus("success");
  };

  return (
    <section
      id="projekt-anfragen"
      className="bg-slate-50 border-y border-slate-100 py-12 md:py-20"
      aria-labelledby="funnel-heading"
    >
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-2">
            Projekt-Konfigurator
          </p>
          <h2
            id="funnel-heading"
            className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-3"
          >
            Was braucht Ihr{" "}
            <span className="text-indigo-600">Unternehmen?</span>
          </h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            In 3 Schritten zur unverbindlichen Projektanfrage — kostenlos & ohne
            Verpflichtung.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* ── SUCCESS ──────────────────────────────────────────────── */}
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden"
            >
              <div className="p-8 text-center border-b border-slate-100">
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
              <div className="bg-slate-50 p-8 flex flex-col items-center gap-4">
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
              className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden"
            >
              {/* Card Header: Step Indicator */}
              <div className="px-5 sm:px-6 pt-5 pb-4 border-b border-slate-100">
                <StepIndicator current={step} />
              </div>

              {/* Card Body */}
              <div className="relative overflow-hidden">
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
                      className="p-5 sm:p-6"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                        Was benötigen Sie?{" "}
                        <span className="text-rose-400">
                          (mindestens 1 wählen)
                        </span>
                      </p>

                      <div className="flex flex-col gap-2">
                        {CATEGORIES.map((cat) => {
                          const active = selectedCategories.includes(cat.id);
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => toggleCategory(cat.id)}
                              className={`flex items-center gap-3 p-3.5 rounded-lg border-2 text-left w-full transition-all duration-200 ${
                                active
                                  ? "border-indigo-500 bg-indigo-50"
                                  : "border-slate-100 bg-white hover:border-indigo-200"
                              }`}
                            >
                              <div
                                className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${
                                  active
                                    ? "bg-indigo-600 text-white"
                                    : "bg-slate-100 text-slate-500"
                                }`}
                              >
                                {cat.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm font-bold leading-tight ${
                                    active ? "text-slate-900" : "text-slate-700"
                                  }`}
                                >
                                  {cat.label}
                                </p>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                  {cat.tagline}
                                </p>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                  active
                                    ? "bg-indigo-600 border-indigo-600"
                                    : "border-slate-200"
                                }`}
                              >
                                {active && (
                                  <Check
                                    size={11}
                                    className="text-white"
                                    strokeWidth={3}
                                  />
                                )}
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-5 flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            if (selectedCategories.length === 0) return;
                            goNext(1, 0);
                          }}
                          disabled={selectedCategories.length === 0}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-600/20"
                        >
                          Weiter
                          <ArrowRight size={15} />
                        </button>
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
                      className="p-5 sm:p-6"
                    >
                      {/* Mini breadcrumb */}
                      <div className="flex items-center gap-2.5 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 text-sm">
                          {currentCat.icon}
                        </div>
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                            Schritt {catStep + 1} von {selectedCategories.length}
                          </p>
                          <p className="text-sm font-bold text-slate-900 leading-tight">
                            {currentCat.label}
                          </p>
                        </div>
                        {/* Dot progress for multi-category */}
                        {selectedCategories.length > 1 && (
                          <div className="ml-auto flex gap-1">
                            {selectedCategories.map((_, i) => (
                              <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full transition-all ${
                                  i < catStep
                                    ? "bg-indigo-600"
                                    : i === catStep
                                    ? "bg-indigo-400 w-3"
                                    : "bg-slate-200"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2.5">
                        Was genau brauchen Sie?{" "}
                        <span className="text-rose-400">
                          (mindestens 1 wählen)
                        </span>
                      </p>

                      <div className="flex flex-col gap-2">
                        {currentCat.subOptions.map((sub) => {
                          const active = (
                            selectedSubs[currentCat.id] ?? []
                          ).includes(sub.id);
                          return (
                            <button
                              key={sub.id}
                              type="button"
                              onClick={() => toggleSub(currentCat.id, sub.id)}
                              className={`flex items-center gap-3 p-3.5 rounded-lg border-2 text-left w-full transition-all duration-200 ${
                                active
                                  ? "border-indigo-500 bg-indigo-50"
                                  : "border-slate-100 bg-white hover:border-indigo-200"
                              }`}
                            >
                              <div
                                className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                  active
                                    ? "bg-indigo-600 border-indigo-600"
                                    : "border-slate-200"
                                }`}
                              >
                                {active && (
                                  <Check
                                    size={10}
                                    className="text-white"
                                    strokeWidth={3}
                                  />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p
                                  className={`text-sm font-bold leading-tight ${
                                    active ? "text-slate-900" : "text-slate-700"
                                  }`}
                                >
                                  {sub.label}
                                </p>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                  {sub.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-5 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          onClick={handleBackCat}
                          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-bold text-sm text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all"
                        >
                          <ArrowLeft size={15} />
                          Zurück
                        </button>
                        <button
                          type="button"
                          onClick={handleNextCat}
                          disabled={!currentSubsSelected}
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-600/20"
                        >
                          {isLastCat ? "Zum Abschluss" : "Weiter"}
                          <ArrowRight size={15} />
                        </button>
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
                      className="p-5 sm:p-6"
                    >
                      {/* Selection Summary */}
                      <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-3.5 mb-5">
                        <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-500 mb-2">
                          Ihre Auswahl
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedCategories.map((catId) => {
                            const cat = CATEGORIES.find(
                              (c) => c.id === catId
                            )!;
                            const subs = selectedSubs[catId] ?? [];
                            return (
                              <div key={catId} className="flex flex-col gap-1">
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-md">
                                  <span className="opacity-70">{cat.icon}</span>
                                  {cat.label}
                                </span>
                                {subs.length > 0 && (
                                  <div className="flex flex-wrap gap-1 pl-1">
                                    {subs.map((subId) => {
                                      const sub = cat.subOptions.find(
                                        (s) => s.id === subId
                                      );
                                      return sub ? (
                                        <span
                                          key={subId}
                                          className="text-[10px] font-medium bg-white border border-indigo-100 text-slate-500 px-2 py-0.5 rounded"
                                        >
                                          {sub.label}
                                        </span>
                                      ) : null;
                                    })}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                          Wie erreichen wir Sie?
                        </p>

                        <div className="flex flex-col gap-2.5 mb-5">
                          <div>
                            <input
                              {...register("name")}
                              placeholder="Ihr Name *"
                              className={`w-full bg-slate-50 border rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
                                errors.name
                                  ? "border-rose-400 bg-rose-50"
                                  : "border-slate-200"
                              }`}
                            />
                            {errors.name && (
                              <p className="text-rose-500 text-xs mt-1">
                                {errors.name.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <input
                              {...register("email")}
                              type="email"
                              placeholder="E-Mail Adresse *"
                              className={`w-full bg-slate-50 border rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
                                errors.email
                                  ? "border-rose-400 bg-rose-50"
                                  : "border-slate-200"
                              }`}
                            />
                            {errors.email && (
                              <p className="text-rose-500 text-xs mt-1">
                                {errors.email.message}
                              </p>
                            )}
                          </div>
                          <div>
                            <input
                              {...register("phone")}
                              type="tel"
                              placeholder="Telefon (optional)"
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
                            />
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              goBack(1, selectedCategories.length - 1)
                            }
                            className="inline-flex items-center gap-1.5 px-4 py-3 rounded-lg font-bold text-sm text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all flex-shrink-0"
                          >
                            <ArrowLeft size={15} />
                            Zurück
                          </button>
                          <button
                            type="submit"
                            disabled={status === "loading"}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-600/20"
                          >
                            {status === "loading" ? (
                              <>
                                <Loader2 size={16} className="animate-spin" />
                                Wird gesendet …
                              </>
                            ) : (
                              <>
                                Anfrage absenden
                                <ArrowRight size={15} />
                              </>
                            )}
                          </button>
                        </div>

                        <p className="text-center text-[11px] text-slate-400 mt-3">
                          Unverbindlich & kostenlos. Antwort innerhalb von 24 Stunden.
                        </p>
                      </form>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
