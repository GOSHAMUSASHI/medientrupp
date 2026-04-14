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
  <div className="bg-white border border-slate-200 p-4">
    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">{label}</p>
    <p className="text-xl font-black text-slate-900 tracking-tight">{value}</p>
    <p className={`text-xs font-bold mt-1 ${positive ? "text-emerald-600" : "text-rose-500"}`}>{trend}</p>
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
        className="flex-1"
        style={{ background: i === heights.length - 1 ? color : `${color}30` }}
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
            { label: "Abschlüsse", value: "8", trend: "+10% vs. Vormonat" },
          ],
          chartHeights: [20, 30, 25, 45, 40, 50, 45, 60, 55, 75, 70, 84],
          chartLabel: "Lead-Entwicklung",
          pieLabel: "Lead-Qualität",
          pieData: [
            { label: "Heiß", pct: "25%", color: "#f59e0b" },
            { label: "Warm", pct: "40%", color: "#7C3AED" },
            { label: "Kalt", pct: "35%", color: "#10b981" },
          ],
        };
      case "Analytics":
        return {
          metrics: [
            { label: "Besucher", value: "12.4k", trend: "+18% vs. Vormonat" },
            { label: "Absprungrate", value: "42%", trend: "-5% vs. Vormonat", positive: true },
            { label: "Verweildauer", value: "02:14", trend: "+12s vs. Vormonat" },
            { label: "Conversion", value: "3.2%", trend: "+0.4% vs. Vormonat" },
          ],
          chartHeights: [50, 45, 60, 55, 70, 65, 80, 75, 90, 85, 100, 95],
          chartLabel: "Traffic-Verlauf",
          pieLabel: "Traffic-Quellen",
          pieData: [
            { label: "Google", pct: "55%", color: "#7C3AED" },
            { label: "Direct", pct: "30%", color: "#10b981" },
            { label: "Social", pct: "15%", color: "#f59e0b" },
          ],
        };
      case "Automation":
        return {
          metrics: [
            { label: "Runs (30T)", value: "4.2k", trend: "+8% vs. Vormonat" },
            { label: "Erfolgsrate", value: "99.8%", trend: "+0.1% vs. Vormonat" },
            { label: "Gesparte Zeit", value: "142h", trend: "+15h vs. Vormonat" },
            { label: "Aktive Flows", value: "12", trend: "Keine Fehler" },
          ],
          chartHeights: [40, 40, 45, 42, 50, 48, 60, 55, 70, 65, 85, 90],
          chartLabel: "Ausgeführte Automatisierungen",
          pieLabel: "Automation Typ",
          pieData: [
            { label: "E-Mail", pct: "45%", color: "#7C3AED" },
            { label: "CRM Sync", pct: "35%", color: "#10b981" },
            { label: "Slack Allg.", pct: "20%", color: "#f59e0b" },
          ],
        };
      case "Kanäle":
        return {
          metrics: [
            { label: "Active Channels", value: "5", trend: "Stabil" },
            { label: "Top Kanal", value: "SEO", trend: "60% Anteil" },
            { label: "CPA Ø", value: "42 €", trend: "-12% vs. Vormonat" },
            { label: "ROAS Ø", value: "4.8", trend: "+0.5 vs. Vormonat" },
          ],
          chartHeights: [20, 25, 22, 35, 30, 45, 40, 55, 50, 65, 60, 70],
          chartLabel: "Performance nach Kanälen",
          pieLabel: "Budget Spend",
          pieData: [
            { label: "Google Ads", pct: "50%", color: "#7C3AED" },
            { label: "Meta Ads", pct: "35%", color: "#10b981" },
            { label: "LinkedIn", pct: "15%", color: "#f59e0b" },
          ],
        };
      case "Einstellungen":
        return {
          metrics: [
            { label: "Plan", value: "Enterprise", trend: "Aktiv" },
            { label: "Team Members", value: "8/10", trend: "+2 freie Plätze" },
            { label: "API Nutzung", value: "45%", trend: "Im Rahmen" },
            { label: "Sicherheit", value: "100%", trend: "2FA Aktiviert" },
          ],
          chartHeights: [10, 10, 15, 12, 18, 15, 20, 18, 25, 22, 30, 28],
          chartLabel: "Speicherplatz Verlauf",
          pieLabel: "Speichernutzung",
          pieData: [
            { label: "Bilder", pct: "40%", color: "#7C3AED" },
            { label: "Docs", pct: "20%", color: "#10b981" },
            { label: "Frei", pct: "40%", color: "#f59e0b" },
          ],
        };
      default:
        return {
          metrics: [
            { label: "Neue Leads", value: "143", trend: "+22% vs. Vormonat" },
            { label: "Conversion", value: "6,4%", trend: "+1.2% gegenüber Ziel" },
            { label: "Umsatz", value: "42.800 €", trend: "+38% vs. Vormonat" },
            { label: "Ø Deal-Größe", value: "8.500 €", trend: "+12% Ø Wert" },
          ],
          chartHeights: [30, 45, 38, 62, 55, 70, 58, 80, 72, 91, 85, 100],
          chartLabel: "Lead-Eingang / Woche",
          pieLabel: "Kanal-Verteilung",
          pieData: [
            { label: "Organisch", pct: "60%", color: "#7C3AED" },
            { label: "Direkt", pct: "25%", color: "#10b981" },
            { label: "Social", pct: "15%", color: "#f59e0b" },
          ],
        };
    }
  };

  const currentData = getTabData(activeTab);

  return (
    <div className="w-full bg-white border border-slate-200 overflow-hidden shadow-xl shadow-slate-200/80">
      {/* Top Nav */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 bg-violet-600 flex items-center justify-center">
            <span className="text-white font-black text-[9px]">MT</span>
          </div>
          <span className="text-slate-900 font-bold text-sm">Medientrupp CRM</span>
          <span className="text-slate-400 text-xs">/ Dashboard</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 text-slate-500 text-xs">
            <Search size={11} />
            <span>Suchen...</span>
            <span className="ml-2 text-slate-300">⌘K</span>
          </div>
          <div className="relative">
            <Bell size={15} className="text-slate-400" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-violet-600" />
          </div>
          <div className="w-6 h-6 bg-violet-600 flex items-center justify-center">
            <span className="text-white text-[9px] font-black">GS</span>
          </div>
        </div>
      </div>

      <div className="flex min-h-0">
        {/* Sidebar */}
        <div className="w-11 md:w-44 border-r border-slate-200 bg-slate-50 flex flex-col py-4">
          {tabs.map((item, i) => (
            <div
              key={i}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center gap-3 px-3 py-2 mx-2 mb-1 text-xs font-medium cursor-pointer transition-colors ${
                activeTab === item.label
                  ? "bg-violet-50 text-violet-600 border border-violet-100"
                  : "text-slate-500 hover:text-slate-900 hover:bg-white"
              }`}
            >
              {item.icon}
              <span className="hidden md:block">{item.label}</span>
            </div>
          ))}
          <div className="mt-auto mx-2">
            <div
              onClick={() => setActiveTab("Einstellungen")}
              className={`flex items-center gap-3 px-3 py-2 text-xs font-medium cursor-pointer transition-colors ${
                activeTab === "Einstellungen"
                  ? "bg-violet-50 text-violet-600 border border-violet-100"
                  : "text-slate-400 hover:text-slate-700 hover:bg-white"
              }`}
            >
              <Settings size={14} />
              <span className="hidden md:block">Einstellungen</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 space-y-4 overflow-hidden bg-white">
          {/* Header Row */}
          <div className="flex items-center justify-between">
            <motion.div
              key={activeTab + "-header"}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-slate-900 font-bold text-sm">{activeTab} Übersicht</h3>
              <p className="text-slate-400 text-xs">Letzte 30 Tage</p>
            </motion.div>
            <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200 text-xs text-slate-500">
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
            <div className="md:col-span-2 bg-white border border-slate-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{currentData.chartLabel}</p>
                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
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
                <MiniChart heights={currentData.chartHeights} color="#7C3AED" />
              </motion.div>
              <div className="flex justify-between mt-2">
                {["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"].map((w) => (
                  <span key={w} className="text-slate-300 text-[9px]">{w}</span>
                ))}
              </div>
            </div>

            {/* Donut + Legend */}
            <div className="bg-white border border-slate-200 p-4 flex flex-col justify-between">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-3">{currentData.pieLabel}</p>
              <motion.div
                key={activeTab + "-pie"}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex items-center gap-4"
              >
                <div className="relative w-16 h-16 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke={currentData.pieData[0].color} strokeWidth="3" strokeDasharray="60 40" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke={currentData.pieData[1].color} strokeWidth="3" strokeDasharray="25 75" strokeDashoffset="-60" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke={currentData.pieData[2].color} strokeWidth="3" strokeDasharray="15 85" strokeDashoffset="-85" />
                  </svg>
                </div>
                <div className="space-y-1.5 text-xs w-full">
                  {currentData.pieData.map((s) => (
                    <div key={s.label} className="flex items-center gap-2 w-full">
                      <span className="w-2 h-2 flex-shrink-0" style={{ background: s.color }} />
                      <span className="text-slate-500 whitespace-nowrap">{s.label}</span>
                      <span className="text-slate-900 font-bold ml-auto">{s.pct}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white border border-slate-200 p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Aktivitäts-Feed</p>
              <span className="text-violet-600 text-xs font-medium cursor-pointer hover:text-violet-700">Alle ansehen</span>
            </div>
            <div className="space-y-2">
              {[
                { icon: <CheckCircle2 size={11} className="text-emerald-600" />, text: "Schmid GmbH: Angebot akzeptiert — 12.400 €", time: "vor 3 Min." },
                { icon: <Users size={11} className="text-violet-600" />, text: "5 neue Leads via Kontaktformular", time: "vor 18 Min." },
                { icon: <Zap size={11} className="text-amber-500" />, text: "KI-Automation: 3 Follow-Ups versendet", time: "vor 1 Std." },
                { icon: <BarChart2 size={11} className="text-violet-600" />, text: "Lighthouse Score 100 bestätigt — Baumann AG", time: "vor 2 Std." },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 bg-slate-100 border border-slate-200 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-slate-600 text-xs flex-1 truncate">{item.text}</span>
                  <span className="text-slate-400 text-[10px] whitespace-nowrap">{item.time}</span>
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
      {/* ── Editorial Call-Out Bar */}
      <section className="bg-slate-50 border-t border-slate-200" aria-labelledby="techshowcase-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-8 py-12 border-b border-slate-200">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
                Live-Infrastruktur
              </p>
              <h2
                id="techshowcase-heading"
                className="font-black tracking-[-0.03em] text-slate-900"
                style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
              >
                Überzeugen Sie sich selbst
                <br />
                <span className="text-violet-600">von unserer Infrastruktur.</span>
              </h2>
              <p className="text-base text-slate-500 leading-relaxed mt-5 max-w-lg">
                Keine abstrakten Theorien. Wir zeigen Ihnen das Dashboard, das Ihre Leads,
                Metriken und Automatisierungen in Echtzeit visualisiert.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-4 font-bold text-white text-base bg-violet-600 hover:bg-violet-700 transition-colors duration-200 self-end"
            >
              <Activity size={20} />
              Live-Demo starten
            </button>
          </div>
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
            style={{ background: "rgba(15,23,42,0.65)" }}
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
                className="absolute -top-3 -right-3 z-10 w-9 h-9 flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
              >
                <X size={18} />
              </button>

              {/* Label */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Live-System Preview</span>
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
