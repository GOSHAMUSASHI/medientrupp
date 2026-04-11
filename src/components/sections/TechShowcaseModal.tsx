"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Activity, Sparkles, TrendingUp, Users, Bell, Settings,
  LayoutDashboard, Search, BarChart2, Zap, Globe, ArrowUpRight,
  CheckCircle2, ChevronDown,
} from "lucide-react";

// ── Dashboard Mockup ────────────────────────────────────────────────────────

const MetricCard = ({
  label, value, trend, positive = true,
}: { label: string; value: string; trend: string; positive?: boolean }) => (
  <div className="bg-slate-800 border border-white/5 rounded-lg p-4">
    <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
    <p className="text-2xl font-black text-white tracking-tight">{value}</p>
    <p className={`text-xs font-bold mt-1 ${positive ? "text-emerald-400" : "text-rose-400"}`}>{trend}</p>
  </div>
);

const MiniChart = ({ heights, color }: { heights: number[]; color: string }) => (
  <div className="flex items-end gap-1 h-12">
    {heights.map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        animate={{ height: `${h}%` }}
        transition={{ duration: 0.6, delay: i * 0.05, ease: "easeOut" }}
        className="flex-1 rounded-sm"
        style={{ background: i === heights.length - 1 ? color : `${color}50` }}
      />
    ))}
  </div>
);

const SaaSDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const tabs = [
    { icon: <LayoutDashboard size={14} />, label: "Dashboard" },
    { icon: <Users size={14} />, label: "Leads" },
    { icon: <TrendingUp size={14} />, label: "Analytics" },
    { icon: <Zap size={14} />, label: "Automation" },
    { icon: <Globe size={14} />, label: "Kanäle" },
  ];

  const getTabData = (tab: string) => {
    switch (tab) {
      case "Leads":
        return {
          metrics: [
            { label: "Neue Leads", value: "84", trend: "+12% vs. Vormonat" },
            { label: "Qualifiziert", value: "45", trend: "+5% vs. Vormonat" },
            { label: "Termine", value: "22", trend: "-2% gegenüber Ziel", positive: false },
            { label: "Abschlüsse", value: "8", trend: "+10% vs. Vormonat" }
          ],
          chartHeights: [20, 30, 25, 45, 40, 50, 45, 60, 55, 75, 70, 84],
          chartLabel: "Lead-Entwicklung",
          pieLabel: "Lead-Qualität",
          pieData: [
             { label: "Heiß", pct: "25%", color: "#f59e0b" },
             { label: "Warm", pct: "40%", color: "#4F46E5" },
             { label: "Kalt", pct: "35%", color: "#10b981" },
          ]
        };
      case "Analytics":
        return {
          metrics: [
            { label: "Besucher", value: "12.4k", trend: "+18% vs. Vormonat" },
            { label: "Absprungrate", value: "42%", trend: "-5% vs. Vormonat", positive: true },
            { label: "Verweildauer", value: "02:14", trend: "+12s vs. Vormonat" },
            { label: "Conversion", value: "3.2%", trend: "+0.4% vs. Vormonat" }
          ],
          chartHeights: [50, 45, 60, 55, 70, 65, 80, 75, 90, 85, 100, 95],
          chartLabel: "Traffic-Verlauf",
          pieLabel: "Traffic-Quellen",
           pieData: [
             { label: "Google", pct: "55%", color: "#4F46E5" },
             { label: "Direct", pct: "30%", color: "#10b981" },
             { label: "Social", pct: "15%", color: "#f59e0b" },
          ]
        };
      case "Automation":
        return {
          metrics: [
            { label: "Runs (30T)", value: "4.2k", trend: "+8% vs. Vormonat" },
            { label: "Erfolgsrate", value: "99.8%", trend: "+0.1% vs. Vormonat" },
            { label: "Gesparte Zeit", value: "142h", trend: "+15h vs. Vormonat" },
            { label: "Aktive Flows", value: "12", trend: "Keine Fehler" }
          ],
          chartHeights: [40, 40, 45, 42, 50, 48, 60, 55, 70, 65, 85, 90],
          chartLabel: "Ausgeführte Automatisierungen",
          pieLabel: "Automation Typ",
           pieData: [
             { label: "E-Mail", pct: "45%", color: "#4F46E5" },
             { label: "CRM Sync", pct: "35%", color: "#10b981" },
             { label: "Slack Allg.", pct: "20%", color: "#f59e0b" },
          ]
        };
      case "Kanäle":
        return {
           metrics: [
            { label: "Active Channels", value: "5", trend: "Stabil" },
            { label: "Top Kanal", value: "SEO", trend: "60% Anteil" },
            { label: "CPA Ø", value: "42 €", trend: "-12% vs. Vormonat" },
            { label: "ROAS Ø", value: "4.8", trend: "+0.5 vs. Vormonat" }
          ],
          chartHeights: [20, 25, 22, 35, 30, 45, 40, 55, 50, 65, 60, 70],
          chartLabel: "Performance nach Kanälen",
          pieLabel: "Budget Spend",
          pieData: [
             { label: "Google Ads", pct: "50%", color: "#4F46E5" },
             { label: "Meta Ads", pct: "35%", color: "#10b981" },
             { label: "LinkedIn", pct: "15%", color: "#f59e0b" },
          ]
        };
      case "Einstellungen":
         return {
           metrics: [
            { label: "Plan", value: "Enterprise", trend: "Aktiv" },
            { label: "Team Members", value: "8/10", trend: "+2 freie Plätze" },
            { label: "API Nutzung", value: "45%", trend: "Im Rahmen" },
            { label: "Sicherheit", value: "100%", trend: "2FA Aktiviert" }
          ],
          chartHeights: [10, 10, 15, 12, 18, 15, 20, 18, 25, 22, 30, 28],
          chartLabel: "Speicherplatz Verlauf",
          pieLabel: "Speichernutzung",
          pieData: [
             { label: "Bilder", pct: "40%", color: "#4F46E5" },
             { label: "Docs", pct: "20%", color: "#10b981" },
             { label: "Frei", pct: "40%", color: "#f59e0b" },
          ]
        };
      default:
        return {
          metrics: [
            { label: "Neue Leads", value: "143", trend: "+22% vs. Vormonat" },
            { label: "Conversion", value: "6,4%", trend: "+1.2% gegenüber Ziel" },
            { label: "Umsatz", value: "42.800 €", trend: "+38% vs. Vormonat" },
            { label: "Ø Deal-Größe", value: "8.500 €", trend: "+12% Ø Wert" }
          ],
          chartHeights: [30, 45, 38, 62, 55, 70, 58, 80, 72, 91, 85, 100],
          chartLabel: "Lead-Eingang / Woche",
          pieLabel: "Kanal-Verteilung",
          pieData: [
            { label: "Organisch", pct: "60%", color: "#4F46E5" },
            { label: "Direkt", pct: "25%", color: "#10b981" },
            { label: "Social", pct: "15%", color: "#f59e0b" },
          ]
        };
    }
  };

  const currentData = getTabData(activeTab);

  return (
    <div className="w-full bg-slate-900 rounded-lg border border-white/10 overflow-hidden shadow-2xl shadow-black/50">
    {/* Top Nav */}
    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-950">
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
          <span className="text-white font-black text-[9px]">MT</span>
        </div>
        <span className="text-white font-bold text-sm">Medientrupp CRM</span>
        <span className="text-slate-600 text-xs">/ Dashboard</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-800 border border-white/5 text-slate-400 text-xs">
          <Search size={11} />
          <span>Suchen...</span>
          <span className="ml-2 text-slate-600">⌘K</span>
        </div>
        <div className="relative">
          <Bell size={15} className="text-slate-500" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-indigo-500 rounded-full" />
        </div>
        <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
          <span className="text-white text-[9px] font-black">GS</span>
        </div>
      </div>
    </div>

    <div className="flex min-h-0">
      {/* Sidebar */}
      <div className="w-11 md:w-44 border-r border-white/5 bg-slate-950 flex flex-col py-4">
        {tabs.map((item, i) => (
          <div
            key={i}
            onClick={() => setActiveTab(item.label)}
            className={`flex items-center gap-3 px-3 py-2 mx-2 mb-1 rounded-md text-xs font-medium cursor-pointer transition-colors ${
              activeTab === item.label
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/20"
                : "text-slate-500 hover:text-slate-300"
            }`}
          >
            {item.icon}
            <span className="hidden md:block">{item.label}</span>
          </div>
        ))}
        <div className="mt-auto mx-2">
          <div 
             onClick={() => setActiveTab("Einstellungen")}
             className={`flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium cursor-pointer transition-colors ${
              activeTab === "Einstellungen"
                ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/20"
                : "text-slate-600 hover:text-slate-400"
            }`}>
            <Settings size={14} />
            <span className="hidden md:block">Einstellungen</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4 overflow-hidden">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <motion.div
            key={activeTab + "-header"}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-white font-bold text-sm">{activeTab} Übersicht</h3>
            <p className="text-slate-500 text-xs">Letzte 30 Tage</p>
          </motion.div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-slate-800 border border-white/5 text-xs text-slate-400">
            Apr 2025
            <ChevronDown size={11} />
          </div>
        </div>

        {/* Metrics Grid */}
        <motion.div 
          key={activeTab + "-metrics"}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {currentData.metrics.map((m, i) => (
            <MetricCard key={i} label={m.label} value={m.value} trend={m.trend} positive={m.positive} />
          ))}
        </motion.div>

        {/* Chart Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Main Chart */}
          <div className="md:col-span-2 bg-slate-800 border border-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">{currentData.chartLabel}</p>
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
                <ArrowUpRight size={12} />
                +38%
              </div>
            </div>
            <motion.div
              key={activeTab + "-chart"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <MiniChart heights={currentData.chartHeights} color="#4F46E5" />
            </motion.div>
            <div className="flex justify-between mt-2">
              {["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"].map((w) => (
                <span key={w} className="text-slate-600 text-[9px]">{w}</span>
              ))}
            </div>
          </div>

          {/* Donut + KPIs */}
          <div className="bg-slate-800 border border-white/5 rounded-lg p-4 flex flex-col justify-between">
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-3">{currentData.pieLabel}</p>
            <motion.div 
              key={activeTab + "-pie"}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-4"
            >
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1e293b" strokeWidth="3" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke={currentData.pieData[0].color} strokeWidth="3" strokeDasharray="60 40" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke={currentData.pieData[1].color} strokeWidth="3" strokeDasharray="25 75" strokeDashoffset="-60" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke={currentData.pieData[2].color} strokeWidth="3" strokeDasharray="15 85" strokeDashoffset="-85" />
                </svg>
              </div>
              <div className="space-y-1.5 text-xs w-full">
                {currentData.pieData.map((s) => (
                  <div key={s.label} className="flex items-center gap-2 w-full">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                    <span className="text-slate-400 whitespace-nowrap">{s.label}</span>
                    <span className="text-slate-200 font-bold ml-auto">{s.pct}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800 border border-white/5 rounded-lg p-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Aktivitäts-Feed</p>
            <span className="text-indigo-400 text-xs font-medium cursor-pointer hover:text-indigo-300">Alle ansehen</span>
          </div>
          <div className="space-y-2">
            {[
              { icon: <CheckCircle2 size={11} className="text-emerald-400" />, text: "Schmid GmbH: Angebot akzeptiert — 12.400 €", time: "vor 3 Min." },
              { icon: <Users size={11} className="text-indigo-400" />, text: "5 neue Leads via Kontaktformular", time: "vor 18 Min." },
              { icon: <Zap size={11} className="text-amber-400" />, text: "KI-Automation: 3 Follow-Ups versendet", time: "vor 1 Std." },
              { icon: <BarChart2 size={11} className="text-indigo-400" />, text: "Lighthouse Score 100 bestätigt — Baumann AG", time: "vor 2 Std." },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-md bg-slate-700 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <span className="text-slate-400 text-xs flex-1 truncate">{item.text}</span>
                <span className="text-slate-600 text-[10px] whitespace-nowrap">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

// ── Main Export ─────────────────────────────────────────────────────────────

export const TechShowcaseModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ── Dark Call-Out Bar */}
      <section className="bg-slate-900 py-16 md:py-20" aria-labelledby="techshowcase-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-md border border-white/10 bg-white/5">
            <Sparkles size={13} className="text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300 tracking-widest uppercase">
              Live-Infrastruktur
            </span>
          </div>

          <h2 id="techshowcase-heading" className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 max-w-3xl mx-auto leading-tight">
            Überzeugen Sie sich selbst von <span className="text-indigo-400">unserer Infrastruktur.</span>
          </h2>
          <p className="text-base md:text-lg text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Keine abstrakten Theorien. Wir zeigen Ihnen das Dashboard, das Ihre Leads, Ihre Metriken und Ihre Automatisierungen in Echtzeit visualisiert.
          </p>

          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-md font-black text-white text-base bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300 shadow-lg shadow-indigo-600/30"
          >
            <Activity size={20} />
            Live-Demo starten
          </button>
        </div>
      </section>

      {/* ── Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto"
            style={{ background: "rgba(2,6,23,0.92)", backdropFilter: "blur(6px)" }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-3 -right-3 z-10 w-9 h-9 flex items-center justify-center rounded-md bg-slate-800 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Label */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Live-System Preview</span>
              </div>

              {/* Dashboard */}
              <SaaSDashboard />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
