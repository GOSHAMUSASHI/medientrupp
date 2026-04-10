"use client";

import { motion } from "framer-motion";
import { TrendingUp, Eye, Users, Play } from "lucide-react";

// Fixed delay values — no Math.random() to avoid SSR hydration mismatch
const STAT_DELAYS = [0, 0.15, 0.3];

const contentStats = [
  { icon: <Eye size={18} />, label: "Ø Reichweite / Woche", value: "84.000", trend: "+38%", color: "#4F46E5" },
  { icon: <TrendingUp size={18} />, label: "Interaktionsrate", value: "6,2%", trend: "+12%", color: "#10B981" },
  { icon: <Users size={18} />, label: "Neue Follower / Woche", value: "1.240", trend: "+24%", color: "#F59E0B" },
];

export const AlgorithmSection = () => {
  return (
    <section className="bg-slate-50 py-24 text-slate-900 relative overflow-hidden" aria-labelledby="algorithm-heading">
      <div className="absolute -left-[20%] top-[10%] w-[600px] h-[600px] bg-slate-500/5 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute -right-[10%] bottom-[10%] w-[500px] h-[500px] bg-indigo-500/5 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-20">
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
            Video &amp; Content
          </p>
          <h2 id="algorithm-heading" className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Sichtbarkeit ist kein Zufall —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-indigo-700">
              sie ist Strategie.
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto leading-relaxed">
            Wir produzieren hochwertige Short-Form Videos und Content-Strategien, die Ihre Zielgruppe wirklich erreichen — datenbasiert, planbar und messbar.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Text & Features */}
          <div className="flex-1 lg:pr-10">
            <div className="inline-flex items-center gap-2 text-indigo-600 text-xs font-bold tracking-widest uppercase mb-6 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-200">
              <motion.div 
                animate={{ opacity: [1, 0.3, 1] }} 
                transition={{ duration: 1.5, repeat: Infinity }} 
                className="w-2 h-2 rounded-full bg-indigo-600" 
              />
              Content läuft — jetzt live
            </div>

            <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-6">
              Content mit System —<br />nicht mit Glück.
            </h3>
            
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Kein Raten, kein Ausprobieren. Wir analysieren, was Ihre Zielgruppe stoppt, und produzieren Inhalte, die auf allen relevanten Plattformen performen.
            </p>

            <ul className="space-y-6 mb-10">
              {[
                { icon: <Play size={18} />, label: 'Contentstrategie mit System', desc: 'Datenbasierte Planung für maximale Reichweite und Konsistenz.' },
                { icon: <TrendingUp size={18} />, label: 'Plattform-Optimierung', desc: 'Native Formate für Instagram, LinkedIn, TikTok & YouTube.' },
                { icon: <Users size={18} />, label: 'Reichweite & Conversion', desc: 'Inhalte, die nicht nur sehen — sondern handeln lassen.' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">{item.label}</h4>
                    <p className="text-sm text-slate-600 mt-0.5">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Analytics Stats Dashboard */}
          <div className="flex-1 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[420px] bg-white border border-slate-200 rounded-2xl shadow-xl shadow-indigo-100/50 overflow-hidden">
              {/* Dashboard Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Content Analytics</p>
                  <p className="text-sm font-black text-slate-900 mt-0.5">Letzte 30 Tage</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-100">
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-1.5 h-1.5 rounded-full bg-green-500"
                  />
                  <span className="text-xs font-bold text-green-700">LIVE</span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="p-5 space-y-3">
                {contentStats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: STAT_DELAYS[i], duration: 0.5 }}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-100"
                    style={{ background: `${stat.color}06` }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ background: `${stat.color}15`, color: stat.color }}
                      >
                        {stat.icon}
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">{stat.label}</p>
                        <p className="text-xl font-black text-slate-900" style={{ lineHeight: 1.2 }}>{stat.value}</p>
                      </div>
                    </div>
                    <span
                      className="text-xs font-bold px-2 py-1 rounded-full"
                      style={{ background: `${stat.color}15`, color: stat.color }}
                    >
                      {stat.trend}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Bottom bar chart (simplified) */}
              <div className="px-5 pb-5">
                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-3">Wöchentliche Reichweite</p>
                <div className="flex items-end gap-1.5 h-16">
                  {[42, 58, 51, 72, 68, 84, 91].map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <motion.div
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.07 }}
                        className="w-full rounded-sm"
                        style={{
                          background: i === 6 ? "#4F46E5" : "rgba(79,70,229,0.2)",
                        }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-1.5">
                  {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
                    <span key={d} className="flex-1 text-center" style={{ color: "#94A3B8", fontSize: "9px" }}>{d}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
