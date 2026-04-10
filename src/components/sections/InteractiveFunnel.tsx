"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Zap, Globe, Video, Briefcase, Server, TrendingUp, Settings2, Database, CheckCircle2, ChevronLeft } from "lucide-react";

// --- Schema & Types ---
const configuratorSchema = z.object({
  services: z.array(z.string()).min(1, "Bitte wählen Sie mindestens ein Hauptsystem aus."),
  addons: z.array(z.string()),
  name: z.string().min(2, "Bitte geben Sie Ihren Namen ein."),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
  phone: z.string().optional(),
});

type ConfiguratorFormValues = z.infer<typeof configuratorSchema>;

const mainServices = [
  { id: "website", label: "High-Performance Website", icon: <Globe size={24} />, setupPrice: 3500, monthlyPrice: 0, priceLabel: "ab €3.500" },
  { id: "ai", label: "KI & Automatisierung", icon: <Zap size={24} />, setupPrice: 2000, monthlyPrice: 150, priceLabel: "ab €2.000 + €150/Mo" },
  { id: "video", label: "Video & Social Media", icon: <Video size={24} />, setupPrice: 1500, monthlyPrice: 800, priceLabel: "ab €1.500/Mo" },
  { id: "branding", label: "Marke & Design", icon: <Briefcase size={24} />, setupPrice: 2000, monthlyPrice: 0, priceLabel: "ab €2.000" },
];

const addonServices = [
  { id: "maintenance", label: "Laufende Betreuung & Hosting", icon: <Server size={20} />, setupPrice: 0, monthlyPrice: 250, description: "Wartung, Updates, Security & Premium Hosting" },
  { id: "crm", label: "CRM & Sales Automatisierung", icon: <Settings2 size={20} />, setupPrice: 1200, monthlyPrice: 0, description: "Integration von Hubspot/Pipedrive" },
  { id: "cms", label: "CMS Migration", icon: <Database size={20} />, setupPrice: 800, monthlyPrice: 0, description: "Datenübernahme aus alten Systemen" },
];

export const InteractiveFunnel = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [setupCost, setSetupCost] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ConfiguratorFormValues>({
    resolver: zodResolver(configuratorSchema),
    mode: "onChange",
    defaultValues: {
      services: [],
      addons: [],
      name: "",
      email: "",
      phone: "",
    },
  });

  const selectedServices = watch("services");
  const selectedAddons = watch("addons");

  // Recalculate cost on selection change
  useEffect(() => {
    let setup = 0;
    let monthly = 0;
    selectedServices.forEach((id) => {
      const s = mainServices.find((x) => x.id === id);
      if (s) { setup += s.setupPrice; monthly += s.monthlyPrice; }
    });
    selectedAddons.forEach((id) => {
      const s = addonServices.find((x) => x.id === id);
      if (s) { setup += s.setupPrice; monthly += s.monthlyPrice; }
    });
    setSetupCost(setup);
    setMonthlyCost(monthly);
  }, [selectedServices, selectedAddons]);

  const toggleArrayItem = (field: "services" | "addons", id: string) => {
    const current = watch(field);
    if (current.includes(id)) {
      setValue(field, current.filter((item) => item !== id), { shouldValidate: true });
    } else {
      setValue(field, [...current, id], { shouldValidate: true });
    }
  };

  const onSubmit = (data: ConfiguratorFormValues) => {
    console.log("Anfrage gesendet:", data);
    setIsSubmitted(true);
  };

  // --- Progress bar helper ---
  const STEPS = ["Leistungen", "Kontakt", "Bestätigung"] as const;

  return (
    <section id="konfigurator" className="bg-white py-24 lg:py-32" aria-labelledby="funnel-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
            Projekt Kalkulator
          </p>
          <h2 id="funnel-heading" className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Berechnen Sie Ihr Setup.
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">
            Wählen Sie Ihre Bausteine. Sie sehen sofort das geschätzte Investment.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mb-10 overflow-hidden px-2">
          <div className="flex items-center justify-between mb-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-1 sm:gap-2">
                <div
                  className="w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black transition-all shrink-0"
                  style={{
                    background: step > i + 1 ? "#10B981" : step === i + 1 ? "#4F46E5" : "#E2E8F0",
                    color: step >= i + 1 ? "#fff" : "#94A3B8",
                  }}
                >
                  {step > i + 1 ? <Check size={12} /> : i + 1}
                </div>
                <span className="text-[10px] sm:text-sm font-semibold" style={{ color: step === i + 1 ? "#0F172A" : "#94A3B8" }}>{label}</span>
                {i < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 w-6 sm:w-16 mx-1 sm:mx-2 rounded" style={{ background: step > i + 1 ? "#4F46E5" : "#E2E8F0" }} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl shadow-indigo-500/10 border border-slate-100 overflow-hidden"
          >
            <AnimatePresence mode="wait">

              {/* ---- STEP 1: Service Selection ---- */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex flex-col lg:flex-row"
                >
                  {/* Left: Services */}
                  <div className="flex-1 p-5 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">1. Was benötigen Sie? <span className="text-red-500">*</span></h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                      {mainServices.map((srv) => {
                        const isSelected = selectedServices.includes(srv.id);
                        return (
                          <div
                            key={srv.id}
                            onClick={() => toggleArrayItem("services", srv.id)}
                            className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 flex flex-col gap-3 ${
                              isSelected
                                ? "border-indigo-600 bg-indigo-50/50 shadow-md"
                                : "border-slate-100 hover:border-indigo-300 bg-white"
                            }`}
                          >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                              isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                            }`}>
                              {srv.icon}
                            </div>
                            <div className="flex justify-between items-start gap-2">
                              <div>
                                <span className={`font-semibold text-sm block ${
                                  isSelected ? "text-slate-900" : "text-slate-600"
                                }`}>{srv.label}</span>
                                <span className="text-xs text-indigo-600 font-bold mt-0.5 block">{srv.priceLabel}</span>
                              </div>
                              <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-colors ${
                                isSelected ? "bg-indigo-600 border-indigo-600" : "border-slate-300"
                              }`}>
                                {isSelected && <Check size={14} className="text-white" />}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">2. Erweiterungen & Betreuung</h3>
                    <div className="flex flex-col gap-3">
                      {addonServices.map((srv) => {
                        const isSelected = selectedAddons.includes(srv.id);
                        return (
                          <div
                            key={srv.id}
                            onClick={() => toggleArrayItem("addons", srv.id)}
                            className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-200 flex items-center justify-between ${
                              isSelected
                                ? "border-indigo-600 bg-indigo-50/50"
                                : "border-slate-100 hover:border-indigo-300 bg-white"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                              }`}>{srv.icon}</div>
                              <div>
                                <p className={`font-semibold text-sm ${isSelected ? "text-slate-900" : "text-slate-700"}`}>{srv.label}</p>
                                <p className="text-xs text-slate-500">{srv.description}</p>
                              </div>
                            </div>
                            <div className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border transition-colors ${
                              isSelected ? "bg-indigo-600 border-indigo-600" : "border-slate-300"
                            }`}>
                              {isSelected && <Check size={14} className="text-white" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right: Cost Summary */}
                  <div className="lg:w-[340px] bg-slate-900 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 mb-8">
                        <TrendingUp size={14} className="text-indigo-400" />
                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">Live Kalkulation</span>
                      </div>

                      <div className="space-y-6 mb-8">
                        <div>
                          <p className="text-slate-400 text-sm mb-1 font-medium">Einmaliges Setup</p>
                          <p className="text-4xl font-black text-white">
                            {setupCost > 0 ? `ab €${setupCost.toLocaleString()}` : "€0"}
                          </p>
                        </div>
                        {monthlyCost > 0 && (
                          <div className="pt-5 border-t border-slate-800">
                            <p className="text-slate-400 text-sm mb-1 font-medium">Laufende Kosten</p>
                            <p className="text-2xl font-bold text-slate-200">
                              €{monthlyCost.toLocaleString()} <span className="text-sm font-normal text-slate-500">/ mtl.</span>
                            </p>
                          </div>
                        )}
                        {setupCost === 0 && (
                          <p className="text-slate-500 text-sm">Wählen Sie eine Leistung, um den Preis zu sehen.</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => selectedServices.length > 0 && setStep(2)}
                      disabled={selectedServices.length === 0}
                      className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-white transition-colors ${
                        selectedServices.length === 0
                          ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                          : "bg-indigo-600 hover:bg-indigo-700"
                      }`}
                    >
                      Weiter zur Anfrage
                      <ArrowRight size={18} />
                    </button>
                    {selectedServices.length === 0 && (
                      <p className="text-slate-500 text-xs text-center mt-3">Bitte wählen Sie mindestens eine Leistung.</p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* ---- STEP 2: Contact ---- */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col lg:flex-row"
                >
                  <div className="flex-1 p-5 sm:p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-8"
                    >
                      <ChevronLeft size={16} /> Zurück
                    </button>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6">Wie dürfen wir Sie kontaktieren?</h3>
                    <form id="funnel-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <input
                            {...register("name")}
                            placeholder="Ihr Name *"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all text-slate-900 text-[16px]"
                          />
                          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                        </div>
                        <div>
                          <input
                            {...register("phone")}
                            placeholder="Telefon (optional)"
                            type="tel"
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all text-slate-900 text-[16px]"
                          />
                        </div>
                      </div>
                      <div>
                        <input
                          {...register("email")}
                          placeholder="Geschäftliche E-Mail *"
                          type="email"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all text-slate-900 text-[16px]"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                      <p className="text-slate-400 text-xs">Ihre Daten werden sicher übertragen. Kein Newsletter, kein Spam.</p>
                    </form>
                  </div>

                  {/* Right: Summary */}
                  <div className="lg:w-[340px] bg-slate-900 p-6 sm:p-8 flex flex-col justify-between">
                    <div>
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-5">Ihre Auswahl</p>
                      <div className="space-y-2 mb-6">
                        {selectedServices.map((id) => {
                          const s = mainServices.find((x) => x.id === id);
                          return s ? (
                            <div key={id} className="flex items-center gap-2">
                              <Check size={14} className="text-indigo-400 flex-shrink-0" />
                              <span className="text-slate-300 text-sm">{s.label}</span>
                            </div>
                          ) : null;
                        })}
                        {selectedAddons.map((id) => {
                          const s = addonServices.find((x) => x.id === id);
                          return s ? (
                            <div key={id} className="flex items-center gap-2">
                              <Check size={14} className="text-green-400 flex-shrink-0" />
                              <span className="text-slate-400 text-sm">{s.label}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                      <div className="border-t border-slate-800 pt-5">
                        <p className="text-slate-400 text-sm">Geschätztes Setup</p>
                        <p className="text-3xl font-black text-white">ab €{setupCost.toLocaleString()}</p>
                        {monthlyCost > 0 && (
                          <p className="text-slate-400 text-sm mt-1">+ €{monthlyCost.toLocaleString()} / Monat</p>
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      form="funnel-form"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-colors mt-6"
                    >
                      Anfrage verbindlich senden
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ---- STEP 3: Thank You ---- */}
              {isSubmitted && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-16 flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6"
                  >
                    <CheckCircle2 size={40} className="text-green-600" />
                  </motion.div>
                  <h3 className="text-3xl font-black text-slate-900 mb-3">Anfrage erhalten!</h3>
                  <p className="text-slate-500 text-lg max-w-md mb-2">
                    Wir melden uns innerhalb von <strong className="text-slate-700">24 Stunden</strong> mit einem konkreten Vorschlag bei Ihnen.
                  </p>
                  <p className="text-slate-400 text-sm">Kein Spam. Kein Newsletter. Nur Ihr Projekt.</p>
                </motion.div>
              )}

            </AnimatePresence>
          </motion.div>

          {/* Mobile Sticky CTA — shown in step 1 only */}
          <AnimatePresence>
            {step === 1 && selectedServices.length > 0 && (
              <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                className="fixed bottom-0 inset-x-0 z-40 p-4 bg-white border-t border-slate-200 shadow-2xl lg:hidden"
              >
                <button
                  onClick={() => setStep(2)}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-white bg-indigo-600 hover:bg-indigo-700 transition-colors"
                >
                  Weiter zur Anfrage (ab €{setupCost.toLocaleString()})
                  <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </section>
  );
};
