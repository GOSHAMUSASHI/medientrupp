"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, TrendingUp, Users, Bell, Settings,
  LayoutDashboard, Search, BarChart2, Zap, Globe, ArrowUpRight,
  CheckCircle2, ChevronDown, ArrowUp, ArrowDown, Download,
  Mail, Phone, Filter, X,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

type DateRange = "7T" | "30T" | "90T" | "12M";

interface TabDataset {
  metrics: { label: string; value: string; trend: string; positive: boolean; sub?: string }[];
  chartHeights: number[];
  chartLabel: string;
  chartTrend: string;
  pipelineStages?: { label: string; count: number; value: string; pct: number }[];
  feed: { icon: React.ReactNode; text: string; time: string; positive?: boolean }[];
}

// ── Date multipliers for realistic data variation ─────────────────────────────

const dateMultiplier: Record<DateRange, number> = { "7T": 0.25, "30T": 1, "90T": 3.1, "12M": 13.5 };
const dateSuffix: Record<DateRange, string> = {
  "7T": "letzte 7 Tage",
  "30T": "letzte 30 Tage",
  "90T": "letzte 90 Tage",
  "12M": "letzte 12 Monate",
};

function fmt(n: number, unit = ""): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(".", ",")} Mio.${unit}`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1).replace(".", ",")} k${unit}`;
  return `${Math.round(n).toLocaleString("de-DE")}${unit}`;
}

// ── Dataset factory per tab ───────────────────────────────────────────────────

function getTabData(tab: string, range: DateRange): TabDataset {
  const m = dateMultiplier[range];

  switch (tab) {
    case "Leads":
      return {
        metrics: [
          { label: "Neue Leads",   value: fmt(84 * m),   trend: "+18 % ggü. Vorperiode",   positive: true },
          { label: "Qualifiziert", value: fmt(45 * m),   trend: "+11 % ggü. Vorperiode",   positive: true },
          { label: "Termine",      value: fmt(22 * m),   trend: "−4 % unter Ziel",          positive: false, sub: "Ziel: " + fmt(23 * m) },
          { label: "Abschlüsse",   value: fmt(8 * m),    trend: "+22 % ggü. Vorperiode",   positive: true },
        ],
        chartHeights: [20, 30, 25, 45, 40, 55, 50, 65, 60, 80, 72, 88],
        chartLabel: "Lead-Entwicklung",
        chartTrend: "+18 %",
        pipelineStages: [
          { label: "Besucher",    count: Math.round(4800 * m), value: "",           pct: 100 },
          { label: "Kontakte",    count: Math.round(840 * m),  value: "",           pct: 18  },
          { label: "Qualifiziert",count: Math.round(210 * m),  value: "",           pct: 4.4 },
          { label: "Angebot",     count: Math.round(52 * m),   value: fmt(4800 * m, " €"), pct: 1.1 },
        ],
        feed: [
          { icon: <CheckCircle2 size={11} className="text-emerald-500" />, text: "Baumann GmbH qualifiziert — Termin bestätigt", time: "vor 8 Min.",  positive: true },
          { icon: <Users        size={11} className="text-indigo-500"  />, text: `${Math.round(5 * m)} neue Leads via Kontaktformular`,            time: "vor 21 Min." },
          { icon: <Zap          size={11} className="text-amber-500"   />, text: "Lead-Score Update: 3 Kontakte auf 'Heiß'",    time: "vor 1 Std."  },
        ],
      };

    case "Analytics":
      return {
        metrics: [
          { label: "Besucher",    value: fmt(12400 * m),  trend: "+22 % ggü. Vorperiode", positive: true },
          { label: "Absprungrate",value: "38 %",           trend: "−6 % vs. Ziel 45 %",   positive: true, sub: "Ziel: 45 %" },
          { label: "Verweildauer",value: "2:41 Min.",      trend: "+18 s ggü. Vorperiode", positive: true },
          { label: "Conversion",  value: "3,6 %",          trend: "+0,5 Pkt ggü. Vorperiode", positive: true },
        ],
        chartHeights: [50, 45, 60, 55, 72, 68, 83, 78, 92, 88, 100, 96],
        chartLabel: "Traffic-Verlauf (Besucher)",
        chartTrend: "+22 %",
        pipelineStages: [
          { label: "Gesamt",    count: Math.round(12400 * m), value: "", pct: 100 },
          { label: "Organisch", count: Math.round(6820 * m),  value: "55 %", pct: 55 },
          { label: "Direkt",    count: Math.round(3720 * m),  value: "30 %", pct: 30 },
          { label: "Social",    count: Math.round(1860 * m),  value: "15 %", pct: 15 },
        ],
        feed: [
          { icon: <TrendingUp   size={11} className="text-emerald-500" />, text: "Lighthouse Score 100 bestätigt — Schmid AG",     time: "vor 2 Std.",  positive: true },
          { icon: <BarChart2    size={11} className="text-indigo-500"  />, text: "SEO: 4 neue Keywords auf Seite 1 (Google.de)",    time: "gestern"     },
          { icon: <Globe        size={11} className="text-slate-400"   />, text: "Core Web Vitals: LCP 0,8 s — INP < 100 ms",       time: "vor 3 Std."  },
        ],
      };

    case "Automation":
      return {
        metrics: [
          { label: "Runs (Periode)", value: fmt(4200 * m),  trend: "+14 % ggü. Vorperiode",  positive: true },
          { label: "Erfolgsrate",    value: "99,8 %",        trend: "SLA: 99,5 % — eingehalten", positive: true },
          { label: "Gesparte Zeit",  value: fmt(142 * m, " h"), trend: `≈ ${fmt(142 * m * 85)} € Personalkosten`, positive: true },
          { label: "Aktive Flows",   value: "14",             trend: "Kein Fehler aktiv",     positive: true },
        ],
        chartHeights: [40, 42, 46, 44, 52, 50, 62, 58, 72, 68, 88, 92],
        chartLabel: "Ausgeführte Automatisierungen",
        chartTrend: "+14 %",
        pipelineStages: [
          { label: "E-Mail Flows",  count: Math.round(1890 * m), value: "45 %", pct: 45 },
          { label: "CRM Sync",      count: Math.round(1470 * m), value: "35 %", pct: 35 },
          { label: "Benachricht.",  count: Math.round(840 * m),  value: "20 %", pct: 20 },
          { label: "Fehler",        count: Math.round(8 * m),    value: "0,2 %", pct: 0 },
        ],
        feed: [
          { icon: <Zap          size={11} className="text-amber-500"   />, text: `${Math.round(3 * m)} Follow-up-Mails automatisch versendet`,   time: "vor 12 Min." },
          { icon: <CheckCircle2 size={11} className="text-emerald-500" />, text: "CRM Sync abgeschlossen — 0 Konflikte",           time: "vor 1 Std.",  positive: true },
          { icon: <Mail         size={11} className="text-indigo-500"  />, text: "Newsletter-Sequenz Baumann AG gestartet (7 Mails)", time: "vor 3 Std."  },
        ],
      };

    case "Kanäle":
      return {
        metrics: [
          { label: "Aktive Kanäle", value: "6",       trend: "SEO, Google Ads, Meta, LI, E-Mail, Empfehlung", positive: true },
          { label: "CPA Ø",         value: "38 €",    trend: "−14 % ggü. Vorperiode",   positive: true, sub: "Branchenø: 62 €" },
          { label: "ROAS Ø",        value: "5,2×",    trend: "+0,7 ggü. Vorperiode",    positive: true },
          { label: "Top-Kanal",     value: "SEO",     trend: "62 % aller Leads organisch", positive: true },
        ],
        chartHeights: [20, 26, 23, 36, 32, 46, 42, 56, 52, 66, 62, 74],
        chartLabel: "Lead-Eingang nach Kanal",
        chartTrend: "+19 %",
        pipelineStages: [
          { label: "SEO",        count: Math.round(320 * m), value: "62 %", pct: 62 },
          { label: "Google Ads", count: Math.round(128 * m), value: "25 %", pct: 25 },
          { label: "Meta Ads",   count: Math.round(52 * m),  value: "10 %", pct: 10 },
          { label: "LinkedIn",   count: Math.round(15 * m),  value: "3 %",  pct: 3  },
        ],
        feed: [
          { icon: <TrendingUp   size={11} className="text-emerald-500" />, text: "Google Ads CPA auf 28 € gesenkt — Kampagne A/B",  time: "heute",      positive: true },
          { icon: <BarChart2    size={11} className="text-indigo-500"  />, text: "SEO: Monatliches Budget um 20 % erhöht",           time: "vor 2 Tg."   },
          { icon: <Phone        size={11} className="text-amber-500"   />, text: "LinkedIn Awareness-Kampagne Q2 gestartet",         time: "vor 4 Tg."   },
        ],
      };

    default: // Dashboard
      return {
        metrics: [
          { label: "Neue Leads",  value: fmt(143 * m),        trend: "+28 % ggü. Vorperiode",   positive: true },
          { label: "Umsatz",      value: fmt(42800 * m, " €"), trend: "+38 % ggü. Vorperiode",   positive: true },
          { label: "Conversion",  value: "6,4 %",              trend: "+1,4 Pkt — Ziel: 7 %",    positive: true, sub: "Ziel: 7,0 %" },
          { label: "Ø Deal-Größe",value: fmt(8500, " €"),      trend: "+12 % ggü. Vorperiode",   positive: true },
        ],
        chartHeights: [30, 45, 38, 62, 55, 72, 60, 82, 74, 93, 87, 100],
        chartLabel: "Lead-Eingang / Woche",
        chartTrend: "+28 %",
        pipelineStages: [
          { label: "Besucher",    count: Math.round(18400 * m), value: "",               pct: 100 },
          { label: "Leads",       count: Math.round(1430 * m),  value: "7,8 %",          pct: 44  },
          { label: "Qualifiziert",count: Math.round(420 * m),   value: fmt(2100 * m, " €"), pct: 20  },
          { label: "Abschlüsse",  count: Math.round(84 * m),    value: fmt(42800 * m, " €"), pct: 6   },
        ],
        feed: [
          { icon: <CheckCircle2 size={11} className="text-emerald-500" />, text: "Schmid GmbH: Angebot akzeptiert — 12.400 €",      time: "vor 3 Min.",  positive: true },
          { icon: <Users        size={11} className="text-indigo-500"  />, text: `${Math.round(5 * m)} neue Leads via Kontaktformular`, time: "vor 18 Min." },
          { icon: <Zap          size={11} className="text-amber-500"   />, text: "KI-Automation: Follow-ups versendet",              time: "vor 1 Std."  },
          { icon: <BarChart2    size={11} className="text-indigo-500"  />, text: "Lighthouse Score 100 — Baumann AG",                time: "vor 2 Std."  },
        ],
      };
  }
}

// ── Sub-components ────────────────────────────────────────────────────────────

const MetricCard = ({
  label, value, trend, positive, sub,
}: {
  label: string; value: string; trend: string; positive: boolean; sub?: string;
}) => (
  <div className="bg-white border border-slate-200 p-3 flex flex-col gap-1">
    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">{label}</p>
    <p className="text-lg font-black text-slate-900 tracking-tight leading-none">{value}</p>
    <div className="flex items-center gap-1">
      {positive
        ? <ArrowUp size={10} className="text-emerald-500 flex-shrink-0" />
        : <ArrowDown size={10} className="text-rose-400 flex-shrink-0" />
      }
      <p className={`text-[10px] font-bold leading-tight ${positive ? "text-emerald-600" : "text-rose-500"}`}>
        {trend}
      </p>
    </div>
    {sub && <p className="text-[9px] text-slate-400">{sub}</p>}
  </div>
);

const MiniChart = ({ heights, color }: { heights: number[]; color: string }) => (
  <div className="flex items-end gap-0.5 h-12">
    {heights.map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0 }}
        animate={{ height: `${h}%` }}
        transition={{ duration: 0.5, delay: i * 0.04, ease: "easeOut" }}
        className="flex-1"
        style={{ background: i === heights.length - 1 ? color : `${color}28` }}
      />
    ))}
  </div>
);

// ── Main Dashboard ────────────────────────────────────────────────────────────

const SaaSDashboard = () => {
  const [activeTab, setActiveTab]   = useState("Dashboard");
  const [dateRange, setDateRange]   = useState<DateRange>("30T");
  const [showDateMenu, setShowDateMenu] = useState(false);

  const tabs = [
    { icon: <LayoutDashboard size={13} />, label: "Dashboard" },
    { icon: <Users           size={13} />, label: "Leads"     },
    { icon: <TrendingUp      size={13} />, label: "Analytics" },
    { icon: <Zap             size={13} />, label: "Automation"},
    { icon: <Globe           size={13} />, label: "Kanäle"    },
  ];

  const current = getTabData(activeTab, dateRange);
  const VIOLET  = "#7c3aed";

  return (
    <div className="w-full bg-white border border-slate-200 overflow-hidden">
      {/* ── Top Nav ── */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-slate-200 bg-slate-50">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 bg-indigo-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black text-[9px]">MT</span>
          </div>
          <span className="text-slate-900 font-bold text-xs">Medientrupp CRM</span>
          <span className="text-slate-300 text-xs hidden sm:inline">/ {activeTab}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 bg-white border border-slate-200 text-slate-400 text-[10px]">
            <Search size={10} />
            <span>Suchen…</span>
            <span className="text-slate-300 ml-1">⌘K</span>
          </div>
          <button className="p-1 hover:bg-slate-100 transition-colors relative">
            <Bell size={13} className="text-slate-400" />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-indigo-600" />
          </button>
          <button className="p-1 hover:bg-slate-100 transition-colors">
            <Download size={13} className="text-slate-400" />
          </button>
          <div className="w-6 h-6 bg-indigo-600 flex items-center justify-center">
            <span className="text-white text-[9px] font-black">GS</span>
          </div>
        </div>
      </div>

      <div className="flex min-h-0">
        {/* ── Sidebar ── */}
        <div className="w-10 md:w-40 border-r border-slate-200 bg-slate-50 flex flex-col py-3 flex-shrink-0">
          {tabs.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center gap-2.5 px-2.5 py-2 mx-1.5 mb-0.5 text-[11px] font-semibold transition-colors text-left ${
                activeTab === item.label
                  ? "bg-white border border-slate-200 text-indigo-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800 hover:bg-white"
              }`}
            >
              {item.icon}
              <span className="hidden md:block">{item.label}</span>
            </button>
          ))}
          <div className="mt-auto mx-1.5">
            <button
              onClick={() => setActiveTab("Einstellungen")}
              className="flex items-center gap-2.5 px-2.5 py-2 w-full text-[11px] font-semibold text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
            >
              <Settings size={13} />
              <span className="hidden md:block">Einstellungen</span>
            </button>
          </div>
        </div>

        {/* ── Main Content ── */}
        <div className="flex-1 min-w-0 overflow-hidden bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + "-" + dateRange}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="p-3 space-y-3"
            >
              {/* Header Row */}
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h3 className="text-slate-900 font-bold text-sm">{activeTab} Übersicht</h3>
                  <p className="text-slate-400 text-[10px]">{dateSuffix[dateRange]}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-200 text-[10px] text-slate-500 hover:border-slate-300 transition-colors">
                    <Filter size={10} />
                    <span className="hidden sm:inline">Filter</span>
                  </button>
                  {/* Date range picker */}
                  <div className="relative">
                    <button
                      onClick={() => setShowDateMenu(!showDateMenu)}
                      className="flex items-center gap-1 px-2 py-1 bg-slate-50 border border-slate-200 text-[10px] font-bold text-slate-700 hover:border-slate-300 transition-colors"
                    >
                      {dateRange}
                      <ChevronDown size={10} className={`transition-transform ${showDateMenu ? "rotate-180" : ""}`} />
                    </button>
                    {showDateMenu && (
                      <div className="absolute right-0 top-full mt-1 bg-white border border-slate-200 shadow-lg z-50 min-w-[120px]">
                        {(["7T", "30T", "90T", "12M"] as DateRange[]).map((r) => (
                          <button
                            key={r}
                            onClick={() => { setDateRange(r); setShowDateMenu(false); }}
                            className={`w-full text-left px-3 py-2 text-[11px] font-semibold transition-colors ${
                              dateRange === r
                                ? "bg-indigo-50 text-indigo-700 border-l-2 border-indigo-600"
                                : "text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            {r === "7T" ? "Letzte 7 Tage" : r === "30T" ? "Letzte 30 Tage" : r === "90T" ? "Letzte 90 Tage" : "Letzte 12 Monate"}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {current.metrics.map((m, i) => (
                  <MetricCard key={i} label={m.label} value={m.value} trend={m.trend} positive={m.positive} sub={m.sub} />
                ))}
              </div>

              {/* Chart + Pipeline Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {/* Main Chart */}
                <div className="md:col-span-2 bg-white border border-slate-200 p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      {current.chartLabel}
                    </p>
                    <div className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold">
                      <ArrowUpRight size={11} />
                      {current.chartTrend}
                    </div>
                  </div>
                  <MiniChart heights={current.chartHeights} color={VIOLET} />
                  <div className="flex justify-between mt-1">
                    {["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"].map((w) => (
                      <span key={w} className="text-slate-200 text-[8px]">{w}</span>
                    ))}
                  </div>
                </div>

                {/* Pipeline Funnel */}
                <div className="bg-white border border-slate-200 p-3">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-2">Pipeline</p>
                  <div className="space-y-1.5">
                    {current.pipelineStages?.map((stage, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[9px] font-semibold text-slate-500">{stage.label}</span>
                          <span className="text-[9px] font-black text-slate-700">
                            {stage.value || stage.count.toLocaleString("de-DE")}
                          </span>
                        </div>
                        <div className="h-1.5 bg-slate-100 w-full">
                          <motion.div
                            className="h-full"
                            style={{ background: i === 0 ? "#ede9fe" : VIOLET, opacity: 1 - i * 0.18 }}
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.max(stage.pct, 2)}%` }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Activity Feed */}
              <div className="bg-white border border-slate-200 p-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Aktivitäts-Feed</p>
                  <span className="text-indigo-600 text-[10px] font-semibold cursor-pointer hover:text-indigo-700">
                    Alle ansehen
                  </span>
                </div>
                <div className="space-y-1.5">
                  {current.feed.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 bg-slate-50 border border-slate-200 flex items-center justify-center flex-shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-slate-600 text-[11px] flex-1 truncate">{item.text}</span>
                      <span className="text-slate-300 text-[9px] whitespace-nowrap">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ── Preview Teaser Metrics (always visible) ──────────────────────────────────

const previewStats = [
  { label: "Neue Leads / Monat",   value: "143",      color: "#7c3aed" },
  { label: "Ø Conversion Rate",    value: "6,4 %",    color: "#10B981" },
  { label: "Gesparte Arbeitsstd.", value: "142 h",    color: "#F59E0B" },
  { label: "Automation Erfolgsq.", value: "99,8 %",   color: "#7c3aed" },
];

// ── Main Export ─────────────────────────────────────────────────────────────

export const TechShowcaseModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="bg-slate-50 border-t border-slate-200" aria-labelledby="techshowcase-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-8 pb-10 border-b border-slate-200"
          >
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
                <span className="text-indigo-600">von unserer Infrastruktur.</span>
              </h2>
              <p className="text-base text-slate-500 leading-relaxed mt-5 max-w-lg">
                Keine abstrakten Theorien. Klicken Sie sich durch das echte CRM-Dashboard —
                wechseln Sie Zeiträume, Ansichten und sehen Sie, wie Ihre Daten
                in Echtzeit visualisiert werden.
              </p>
            </div>
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-4 font-bold text-white text-base bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200 self-end"
            >
              <Activity size={18} />
              Live-Demo starten
            </button>
          </motion.div>

          {/* Static preview KPIs — Appetizer ohne das volle Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-10 border border-slate-200 bg-white"
            style={{ boxShadow: "4px 4px 0 #e2e8f0" }}
          >
            {previewStats.map((s, i) => (
              <div
                key={i}
                className={`p-6 flex flex-col gap-2 ${i < 3 ? "border-r border-slate-100" : ""}`}
              >
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.15em]">
                  {s.label}
                </p>
                <p
                  className="font-black tracking-tight leading-none"
                  style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", color: s.color }}
                >
                  {s.value}
                </p>
              </div>
            ))}
          </motion.div>

          {/* CTA hint below */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center text-sm text-slate-400 mt-6"
          >
            Beispiel-Metriken eines typischen Medientrupp-Kunden ·{" "}
            <button
              onClick={() => setIsOpen(true)}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Alle Daten im interaktiven Dashboard ansehen →
            </button>
          </motion.p>

        </div>
      </section>

      {/* ── Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 pb-8 overflow-y-auto"
            style={{ background: "rgba(15,23,42,0.72)" }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-3 -right-3 z-20 w-9 h-9 flex items-center justify-center bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-md"
                aria-label="Demo schließen"
              >
                <X size={16} />
              </button>

              {/* Label */}
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">
                  Live-System Preview · Beispieldaten
                </span>
              </div>

              {/* Dashboard */}
              <div style={{ boxShadow: "6px 6px 0 rgba(15,23,42,0.3)" }}>
                <SaaSDashboard />
              </div>

              <p className="text-center text-[11px] text-slate-400 mt-4">
                Alle Daten sind Musterdaten eines typischen Medientrupp-Kunden aus dem deutschen Mittelstand
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
