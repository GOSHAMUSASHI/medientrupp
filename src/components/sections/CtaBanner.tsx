"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText } from "lucide-react";
import Link from "next/link";

export const CtaBanner = () => {
  return (
    <section className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-slate-900 rounded-md p-8 md:p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Decorative graphic */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[400px] h-[400px] bg-slate-700 opacity-20 rounded-full blur-[40px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[300px] h-[300px] bg-indigo-500 opacity-10 rounded-full blur-[40px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
                Jetzt kostenlos beraten lassen.<br /><span className="text-indigo-400">Unverbindlich & in 24h.</span>
              </h2>
              <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-xl mx-auto md:mx-0">
                Wir schauen uns Ihre aktuelle digitale Infrastruktur an und zeigen Ihnen konkret, wo der größte Hebel liegt. Kein Pitch, kein Druck.
              </p>
            </div>
            
            <div className="flex-shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-4">
              <Link 
                href="/projekt-anfragen"
                className="bg-indigo-600 text-white px-8 py-4 rounded-md font-bold text-lg flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors"
              >
                Preis berechnen <ArrowRight size={20} />
              </Link>
              <a 
                href="/leistungen"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-md font-bold text-lg flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
              >
                <FileText size={20} /> Leistungen ansehen
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
