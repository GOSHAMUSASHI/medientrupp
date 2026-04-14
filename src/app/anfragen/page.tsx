"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft } from "lucide-react";

export default function AnfragenPage() {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<string[]>([]);
  const [seo, setSeo] = useState(false);
  const [brandingPlus, setBrandingPlus] = useState(false);
  const [maintenance, setMaintenance] = useState<"nein" | "basis" | "premium">("nein");
  
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // Price Calculation Logic
  useEffect(() => {
    let total = 0;
    
    // Step 1 Base Prices
    if (selections.includes("Marke & Design")) total += 1000;
    if (selections.includes("Website")) total += 1000;
    if (selections.includes("KI & Automatisierung")) total += 500;
    if (selections.includes("Video & Social Media")) total += 500;
    
    // Step 2 Upsells
    if (selections.includes("Website") && seo) total += 500;
    if (selections.includes("Marke & Design") && brandingPlus) total += 250;
    
    // 10% Discount Rule
    if (selections.includes("Website") && seo) {
      total = total * 0.9;
    }
    
    setEstimatedPrice(total);
  }, [selections, seo, brandingPlus]);

  const monthlyPrice = maintenance === "basis" ? 100 : maintenance === "premium" ? 150 : 0;

  const toggleSelection = (item: string) => {
    if (selections.includes(item)) {
      setSelections(selections.filter((i) => i !== item));
    } else {
      setSelections([...selections, item]);
    }
  };

  const handleNext = () => setStep((s) => Math.min(s + 1, 4));
  const handlePrev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-40 relative">
      <div className="max-w-2xl mx-auto px-4">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Kalkulieren Sie Ihr <span className="text-violet-600">Projekt</span>.</h1>
          <p className="text-slate-500 mt-2">Transparente Preise in unter 60 Sekunden.</p>
        </div>

        {/* Funnel Card */}
        <div className="bg-white shadow-xl shadow-slate-200/50 rounded-md overflow-hidden border border-slate-100">
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-100 relative">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-violet-600"
              initial={{ width: "25%" }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="p-8 sm:p-10">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Main Services */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Was benötigen Sie? (Mehrfachauswahl möglich)</h2>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { name: "Website", price: "1.000€" },
                      { name: "Marke & Design", price: "1.000€" },
                      { name: "KI & Automatisierung", price: "500€" },
                      { name: "Video & Social Media", price: "500€" }
                    ].map((item) => {
                      const isActive = selections.includes(item.name);
                      return (
                        <div 
                          key={item.name}
                          onClick={() => toggleSelection(item.name)}
                          className={`cursor-pointer p-5 border-2 rounded-md transition-all duration-200 flex flex-col gap-2 ${
                            isActive ? "border-violet-600 bg-violet-50/30" : "border-slate-100 hover:border-violet-300"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`font-bold ${isActive ? "text-slate-900" : "text-slate-600"}`}>{item.name}</span>
                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                              isActive ? "bg-violet-600 border-violet-600" : "border-slate-300"
                            }`}>
                              {isActive && <Check size={14} className="text-white" />}
                            </div>
                          </div>
                          <span className="text-xs font-bold text-violet-600">ab {item.price}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Conditional Follow Ups */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <h2 className="text-xl font-bold text-slate-900 mb-6">Feinabstimmung Ihrer Auswahl</h2>

                  {/* Condition 1: Website */}
                  {selections.includes("Website") && (
                    <div className="bg-slate-50 p-6 rounded-md border border-slate-100">
                      <p className="font-bold text-slate-900 mb-2">Benötigen Sie SEO & verkaufspsychologische Texte für die Website?</p>
                      <p className="text-xs text-slate-500 mb-4">+500€ | <span className="text-emerald-600 font-bold">10% Paket-Rabatt auf Endsumme!</span></p>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setSeo(true)}
                          className={`flex-1 py-3 font-bold rounded-lg transition-colors border-2 ${
                            seo ? "bg-violet-600 text-white border-violet-600" : "bg-white text-slate-600 border-slate-200"
                          }`}
                        >Ja, brauche ich</button>
                        <button 
                          onClick={() => setSeo(false)}
                          className={`flex-1 py-3 font-bold rounded-lg transition-colors border-2 ${
                            !seo ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600 border-slate-200"
                          }`}
                        >Nein, mache ich selbst</button>
                      </div>
                    </div>
                  )}

                  {/* Condition 2: Marke & Design */}
                  {selections.includes("Marke & Design") && (
                    <div className="bg-slate-50 p-6 rounded-md border border-slate-100">
                      <p className="font-bold text-slate-900 mb-2">Benötigen Sie eine komplette Geschäftsausstattung?</p>
                      <p className="text-xs text-slate-500 mb-4">Visitenkarten, Briefpapier, E-Mail Signaturen (+250€)</p>
                      <div className="flex gap-3">
                        <button 
                          onClick={() => setBrandingPlus(true)}
                          className={`flex-1 py-3 font-bold rounded-lg transition-colors border-2 ${
                            brandingPlus ? "bg-violet-600 text-white border-violet-600" : "bg-white text-slate-600 border-slate-200"
                          }`}
                        >Ja, bitte</button>
                        <button 
                          onClick={() => setBrandingPlus(false)}
                          className={`flex-1 py-3 font-bold rounded-lg transition-colors border-2 ${
                            !brandingPlus ? "bg-slate-800 text-white border-slate-800" : "bg-white text-slate-600 border-slate-200"
                          }`}
                        >Nein, danke</button>
                      </div>
                    </div>
                  )}

                  {!selections.includes("Website") && !selections.includes("Marke & Design") && (
                    <div className="text-center py-10">
                      <p className="text-slate-500">Für Ihre Auswahl sind keine weiteren Technik-Details nötig.</p>
                      <p className="text-sm font-bold text-violet-600 mt-2">Klicken Sie direkt auf Weiter.</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 3: Maintenance */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h2 className="text-xl font-bold text-slate-900 mb-2">Laufende Betreuung & Sicherheit</h2>
                  <p className="text-sm text-slate-500 mb-6">Wünschen Sie monatliche Betreuung (Hosting, Wartung, automatisches Backups, Local SEO)?</p>

                  <div className="flex flex-col gap-3">
                    {[
                      { id: "nein", label: "Nein, ich kümmere mich selbst um Updates etc.", price: "0€ / Monat" },
                      { id: "basis", label: "Basis Betreuung (Hosting, Updates, Security)", price: "100€ / Monat" },
                      { id: "premium", label: "Premium Betreuung (Basis + SEO + Anpassungen)", price: "150€ / Monat" }
                    ].map((m) => (
                      <div 
                        key={m.id}
                        onClick={() => setMaintenance(m.id as "nein"|"basis"|"premium")}
                        className={`cursor-pointer p-5 border-2 rounded-md transition-all flex justify-between items-center ${
                          maintenance === m.id ? "border-violet-600 bg-violet-50/30" : "border-slate-100 hover:border-violet-200"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            maintenance === m.id ? "border-violet-600" : "border-slate-300"
                          }`}>
                            {maintenance === m.id && <div className="w-2.5 h-2.5 rounded-full bg-violet-600" />}
                          </div>
                          <span className={`font-semibold ${maintenance === m.id ? "text-slate-900" : "text-slate-600"}`}>{m.label}</span>
                        </div>
                        <span className="text-xs font-bold text-violet-600">{m.price}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
              
              {/* STEP 4: Checkout */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="text-center py-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-emerald-600" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-2">Fast geschafft!</h2>
                  <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                    Klicken Sie den Button, um mit diesen exakten Anforderungen ein erstes Gespräch mit uns zu buchen.
                  </p>
                  <button className="px-8 py-4 w-full rounded-md font-bold bg-violet-600 text-white shadow-lg shadow-violet-600/20 hover:bg-violet-700 transition-colors">
                    Verbindliches Gespräch sichern
                  </button>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="mt-10 flex items-center justify-between border-t border-slate-100 pt-6">
              <button 
                onClick={handlePrev}
                disabled={step === 1}
                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-slate-700 disabled:opacity-0 transition-all"
              >
                <ArrowLeft size={16} /> Zurück
              </button>
              
              {step < 4 && (
                <button 
                  onClick={handleNext}
                  disabled={step === 1 && selections.length === 0}
                  className="flex items-center gap-2 px-6 py-3 rounded-md font-bold bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 transition-all"
                >
                  Weiter <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>

        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 text-white z-50 px-4 py-4 shadow-[0_-20px_40px_rgba(15,23,43,0.3)]">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Geschätztes Investment</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black">ab {estimatedPrice.toLocaleString("de-DE")} €</span>
              {selections.includes("Website") && seo && <span className="text-xs text-emerald-400 font-bold bg-emerald-400/10 px-2 py-0.5 rounded">-10% Rabatt aktiv</span>}
            </div>
          </div>
          {monthlyPrice > 0 && (
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-0.5">Laufende Kosten</p>
              <span className="text-lg font-bold text-slate-200">+{monthlyPrice} € <span className="text-xs font-normal text-slate-400">/ Monat</span></span>
            </div>
          )}
        </div>
      </div>

    </main>
  );
}
