"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Kick-off & Strategie",
    description: "Wir telefonieren kurz. Wir holen uns alle Infos, die wir brauchen. Du lehnst dich zurück.",
    placeholderColor: "linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)"
  },
  {
    number: "02",
    title: "Umsetzung im Hintergrund",
    description: "Unser Team baut dein komplettes System. Ohne dass du Ressourcen aus deinem Tagesgeschäft abziehen musst.",
    placeholderColor: "linear-gradient(135deg, #f3e8ff 0%, #d8b4fe 100%)"
  },
  {
    number: "03",
    title: "Schlüsselübergabe & Go-Live",
    description: "Dein System ist fertig, getestet und wird live geschaltet. Es bringt Ergebnisse ab Tag 1.",
    placeholderColor: "linear-gradient(135deg, #dcfce7 0%, #86efac 100%)"
  },
];

export const ProcessSection = () => {
  return (
    <section className="bg-white py-24 lg:py-32 relative overflow-hidden" aria-labelledby="process-heading">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
            Einfacher Ablauf
          </p>
          <h2 id="process-heading" className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4">
            In 3 Schritten zu deinem <span className="text-indigo-600">neuen System.</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Keine endlosen Abstimmungs-Loops. Wir nehmen Komplextiät raus und übernehmen die harte Arbeit für dich.
          </p>
        </motion.div>

        <div className="space-y-20 lg:space-y-32">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className={`flex flex-col gap-12 lg:gap-24 items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                
                {/* Text Content */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-1 w-full"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-7xl font-black text-slate-200 tracking-tighter">
                      {step.number}
                    </span>
                    <div className="h-0.5 w-16 bg-indigo-600/20" />
                  </div>
                  
                  <h3 className="text-3xl font-black text-slate-900 mb-6 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </motion.div>

                {/* Dashboard / Image Placeholder */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex-1 w-full"
                >
                  <div 
                    className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl shadow-slate-200"
                    style={{ background: step.placeholderColor }}
                  >
                    <div className="absolute inset-0 bg-white/40 backdrop-blur-sm m-6 rounded-2xl border border-white/50 flex flex-col justify-end p-6">
                       <div className="text-sm font-bold text-slate-700 uppercase tracking-widest opacity-50 mb-2">Visueller Platzhalter</div>
                       <div className="w-1/2 h-4 bg-slate-400/20 rounded-full mb-3" />
                       <div className="w-3/4 h-3 bg-slate-400/20 rounded-full" />
                    </div>
                  </div>
                </motion.div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
