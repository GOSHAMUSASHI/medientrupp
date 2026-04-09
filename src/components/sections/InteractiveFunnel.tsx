"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, Zap, Globe, Video, Briefcase, Server, TrendingUp, Settings2, Database } from "lucide-react";

// --- Schema & Types ---
const configuratorSchema = z.object({
  services: z.array(z.string()).min(1, "Bitte wählen Sie mindestens ein Hauptsystem aus."),
  addons: z.array(z.string()),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
});

type ConfiguratorFormValues = z.infer<typeof configuratorSchema>;

const mainServices = [
  { id: "website", label: "High-Performance Website", icon: <Globe size={24} />, setupPrice: 3500, monthlyPrice: 0 },
  { id: "ai", label: "KI & Automatisierung", icon: <Zap size={24} />, setupPrice: 2000, monthlyPrice: 150 },
  { id: "video", label: "Video & Social Media", icon: <Video size={24} />, setupPrice: 1500, monthlyPrice: 800 },
  { id: "branding", label: "Marke & Design", icon: <Briefcase size={24} />, setupPrice: 2000, monthlyPrice: 0 },
];

const addonServices = [
  { id: "maintenance", label: "Laufende Betreuung & Hosting", icon: <Server size={20} />, setupPrice: 0, monthlyPrice: 250, description: "Wartung, Updates, Security & Premium Hosting" },
  { id: "crm", label: "CRM & Sales Automatisierung", icon: <Settings2 size={20} />, setupPrice: 1200, monthlyPrice: 0, description: "Integration von Hubspot/Pipedrive" },
  { id: "cms", label: "CMS Migration", icon: <Database size={20} />, setupPrice: 800, monthlyPrice: 0, description: "Datenübernahme aus alten Systemen" },
];

export const InteractiveFunnel = () => {
  const [setupCost, setSetupCost] = useState(0);
  const [monthlyCost, setMonthlyCost] = useState(0);
  const [estimatedRoi, setEstimatedRoi] = useState(0);
  const [isCapturing, setIsCapturing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ConfiguratorFormValues>({
    resolver: zodResolver(configuratorSchema),
    defaultValues: {
      services: [],
      addons: [],
    },
  });

  const selectedServices = watch("services");
  const selectedAddons = watch("addons");

  // React to changes to calculate Cost
  useEffect(() => {
    let setup = 0;
    let monthly = 0;
    let roi = 0;

    selectedServices.forEach((serviceId) => {
      const srv = mainServices.find((s) => s.id === serviceId);
      if (srv) {
        setup += srv.setupPrice;
        monthly += srv.monthlyPrice;
        roi += (srv.setupPrice * 1.5) + (srv.monthlyPrice * 12 * 2); // Conceptual ROI calc
      }
    });

    selectedAddons.forEach((addonId) => {
      const srv = addonServices.find((s) => s.id === addonId);
      if (srv) {
        setup += srv.setupPrice;
        monthly += srv.monthlyPrice;
        roi += (srv.setupPrice * 0.8) + (srv.monthlyPrice * 12 * 1.2);
      }
    });

    setSetupCost(setup);
    setMonthlyCost(monthly);
    setEstimatedRoi(Math.round(roi));
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
    if (!isCapturing && data.services.length > 0) {
      setIsCapturing(true);
      return;
    }
    console.log("Form Submitted:", data);
    alert("Projektanfrage wurde gesendet! (Demonstration)");
  };

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
            Wählen Sie Ihre Bausteine. Sie sehen sofort das geschätzte Einmal-Invest und optionale Fixkosten.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl shadow-indigo-500/10 border border-slate-100 overflow-hidden"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row">
              
              {/* Left Side: Inputs */}
              <div className="flex-1 p-8 sm:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100">
                
                {/* 1. Main Services */}
                <div className="mb-10">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">1. Hauptsysteme wählen <span className="text-red-500">*</span></h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {mainServices.map((srv) => {
                      const isSelected = selectedServices.includes(srv.id);
                      return (
                        <div
                          key={srv.id}
                          onClick={() => toggleArrayItem("services", srv.id)}
                          className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 flex flex-col gap-3 ${
                            isSelected 
                              ? "border-indigo-600 bg-indigo-50/50 shadow-md transform scale-[1.02]" 
                              : "border-slate-100 hover:border-indigo-300 bg-white"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                            isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                          }`}>
                            {srv.icon}
                          </div>
                          <div className="flex justify-between items-center">
                            <span className={`font-semibold ${isSelected ? "text-slate-900" : "text-slate-600"}`}>
                              {srv.label}
                            </span>
                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isSelected ? "bg-indigo-600 border-indigo-600" : "border-slate-300"}`}>
                              {isSelected && <Check size={14} className="text-white" />}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {errors.services && (
                    <span className="text-red-500 text-xs font-bold mt-2 inline-block">
                      {errors.services.message}
                    </span>
                  )}
                </div>

                {/* 2. Addons */}
                <div className="mb-10">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">2. Erweiterungen & Betreuung</h3>
                  <div className="flex flex-col gap-3">
                    {addonServices.map((srv) => {
                      const isSelected = selectedAddons.includes(srv.id);
                      return (
                        <div
                          key={srv.id}
                          onClick={() => toggleArrayItem("addons", srv.id)}
                          className={`cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 flex items-center justify-between ${
                            isSelected 
                              ? "border-indigo-600 bg-indigo-50/50 shadow-sm" 
                              : "border-slate-100 hover:border-indigo-300 bg-white"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                              isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-500"
                            }`}>
                              {srv.icon}
                            </div>
                            <div>
                              <p className={`font-semibold text-sm ${isSelected ? "text-slate-900" : "text-slate-700"}`}>
                                {srv.label}
                              </p>
                              <p className="text-xs text-slate-500">{srv.description}</p>
                            </div>
                          </div>
                          <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isSelected ? "bg-indigo-600 border-indigo-600" : "border-slate-300"}`}>
                            {isSelected && <Check size={14} className="text-white" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Lead Capture Fields */}
                <AnimatePresence>
                  {isCapturing && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-4 mb-2 overflow-hidden"
                    >
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 pt-4 border-t border-slate-100">3. Kontaktdaten</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                          {...register("name")} 
                          placeholder="Ihr Name" 
                          required
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all text-slate-900"
                        />
                        <input 
                          {...register("phone")} 
                          placeholder="Telefonnummer" 
                          type="tel"
                          required
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all text-slate-900"
                        />
                      </div>
                      <input 
                        {...register("email")} 
                        placeholder="Geschäftliche E-Mail" 
                        type="email"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all text-slate-900"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

              {/* Right Side: Live Feedback & CTA */}
              <div className="lg:w-[380px] bg-slate-900 p-8 sm:p-10 lg:p-12 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 mb-8">
                    <TrendingUp size={14} className="text-indigo-400" />
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-300">Live Kalkulation</span>
                  </div>

                  <div className="space-y-8 mb-10">
                    {/* Setup Cost */}
                    <div>
                      <p className="text-slate-400 text-sm mb-2 font-medium flex justify-between items-center">
                        Einmaliges Setup 
                        {setupCost > 0 && <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-300">Projektbasis</span>}
                      </p>
                      <p className="text-4xl font-black text-white">
                        {setupCost > 0 ? `ab €${setupCost.toLocaleString()}` : "€0"}
                      </p>
                    </div>

                    {/* Monthly Cost */}
                    {(monthlyCost > 0 || setupCost > 0) && (
                      <div className="pt-6 border-t border-slate-800">
                        <p className="text-slate-400 text-sm mb-2 font-medium flex justify-between items-center">
                          Laufende Kosten 
                          {monthlyCost > 0 && <span className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded border border-indigo-500/20">Monatlich</span>}
                        </p>
                        <p className="text-3xl font-bold text-slate-200">
                          {monthlyCost > 0 ? `€${monthlyCost.toLocaleString()}` : "€0"} <span className="text-sm font-normal text-slate-500">/ mtl.</span>
                        </p>
                      </div>
                    )}

                    {/* ROI Highlight (Subtle) */}
                    {(setupCost > 0 || monthlyCost > 0) && estimatedRoi > 0 && (
                      <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-xl p-4">
                        <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">Geschätzter Jahres-Impact</p>
                        <p className="text-indigo-400 text-xl font-bold">~ €{estimatedRoi.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8">
                  {/* Validation text if trying to submit without services */}
                  {selectedServices.length === 0 && !isCapturing && (
                    <p className="text-slate-500 text-sm text-center mb-4">Bitte wählen Sie ein Hauptsystem aus, um zu beginnen.</p>
                  )}
                  <button 
                    type={isCapturing ? "submit" : "button"}
                    onClick={!isCapturing ? () => handleSubmit(onSubmit)() : undefined}
                    disabled={selectedServices.length === 0}
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-black text-white transition-colors 
                      ${selectedServices.length === 0 
                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                        : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                  >
                    {isCapturing ? "Anfrage verbindlich anfragen" : "Jetzt Projekt anfragen"}
                    <ArrowRight size={18} />
                  </button>
                  {isCapturing && (
                    <p className="text-slate-500 text-xs text-center mt-4">
                      Ihre Daten werden sicher übertragen. Kein Newsletter, kein Spam.
                    </p>
                  )}
                </div>
              </div>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
