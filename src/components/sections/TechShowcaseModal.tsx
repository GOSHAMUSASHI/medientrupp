"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Activity, ShoppingCart, Zap, Database, Sparkles, RefreshCw, TrendingUp, DollarSign, BarChart3 } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Notification {
  id: string;
  message: string;
  value?: string;
  color: string;
}

interface PipelineState {
  stage: 0 | 1 | 2 | 3;
}

interface KpiStat {
  label: string;
  value: string;
  trend: string;
  color: string;
  icon: React.ReactNode;
}

// ─── Live Notification Hook (ported from premium-agency) ──────────────────────

const useNotifications = () => {
  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [started, setStarted] = useState(false);

  const startNotifications = () => {
    if (started) return;
    setStarted(true);

    const events: Omit<Notification, "id">[] = [
      { message: "Neue Anfrage eingegangen", value: "Webdesign-Projekt", color: "#4F46E5" },
      { message: "KI-Automation aktiv", value: "38h Zeitersparnis/Monat", color: "#10B981" },
      { message: "Neuer Lead qualifiziert", value: "Mittelstand · Bayern", color: "#F59E0B" },
      { message: "Website live geschaltet", value: "0,09s Ladezeit ✓", color: "#4F46E5" },
      { message: "Conversion optimiert", value: "+324% Uplift ↑", color: "#10B981" },
    ];

    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= events.length) { clearInterval(interval); return; }
      setNotifs((prev) => [
        { ...events[idx], id: `${Date.now()}-${idx}` },
        ...prev.slice(0, 3),
      ]);
      idx++;
    }, 2800);
  };

  const dismiss = (id: string) => setNotifs((prev) => prev.filter((n) => n.id !== id));
  return { notifs, dismiss, startNotifications };
};

// ─── Pipeline Funnel Visualizer ───────────────────────────────────────────────

const PipelineVisualizer = () => {
  const [pipeline, setPipeline] = useState<PipelineState>({ stage: 0 });
  const [revenue, setRevenue] = useState(47320);

  const triggerFunnel = () => {
    setPipeline({ stage: 1 });
    setTimeout(() => { setPipeline({ stage: 2 }); setRevenue((r) => r + 249); }, 2000);
    setTimeout(() => { setPipeline({ stage: 3 }); setRevenue((r) => r + 89); }, 4000);
    setTimeout(() => setPipeline({ stage: 0 }), 9000);
  };

  const stages = [
    { label: "Lead eingehend", data: "Website-Formular", color: "#4F46E5", stage: 1 },
    { label: "KI qualifiziert", data: "+€89 Upsell angenommen", color: "#10B981", stage: 2 },
    { label: "Projekt gestartet", data: "Dispatched ✓", color: "#F59E0B", stage: 3 },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Live Umsatz-Ticker</p>
          <motion.div
            key={revenue}
            animate={{ scale: [1.08, 1] }}
            transition={{ duration: 0.3 }}
            className="text-3xl font-black text-slate-900"
          >
            €{revenue.toLocaleString("de")}
          </motion.div>
        </div>
        <button
          onClick={triggerFunnel}
          disabled={pipeline.stage > 0}
          className="px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: pipeline.stage === 0 ? "#4F46E5" : "rgba(79,70,229,0.12)",
            color: pipeline.stage === 0 ? "#fff" : "#4F46E5",
            border: "1px solid rgba(79,70,229,0.3)",
          }}
        >
          {pipeline.stage === 0 ? "▶ Funnel starten" : "⚡ Läuft..."}
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {stages.map((s) => {
          const isActive = pipeline.stage >= s.stage;
          return (
            <motion.div
              key={s.stage}
              animate={{
                y: isActive ? -4 : 0,
                boxShadow: isActive ? `0 8px 24px ${s.color}30` : "none",
              }}
              transition={{ duration: 0.4 }}
              className="rounded-xl p-4 text-center border transition-colors duration-300"
              style={{
                background: isActive ? `${s.color}08` : "#F8FAFC",
                borderColor: isActive ? s.color : "#E2E8F0",
              }}
            >
              <div
                className="text-xs font-black uppercase tracking-widest mb-2 transition-colors duration-300"
                style={{ color: isActive ? s.color : "#CBD5E1" }}
              >
                {s.label}
              </div>
              <div
                className="text-xs transition-colors duration-300"
                style={{ color: isActive ? "#475569" : "#CBD5E1", fontFamily: "monospace" }}
              >
                {isActive ? s.data : "Waiting..."}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

// ─── KPI Stats Bar ────────────────────────────────────────────────────────────

const kpiStats: KpiStat[] = [
  { label: "Leads / Monat", value: "148", trend: "+12,4%", color: "#4F46E5", icon: <TrendingUp size={16} /> },
  { label: "Zeitersparnis KI", value: "38h", trend: "+23%", color: "#10B981", icon: <Zap size={16} /> },
  { label: "Conversion Rate", value: "8,4%", trend: "+324%", color: "#F59E0B", icon: <BarChart3 size={16} /> },
  { label: "Tages-Umsatz", value: "€47k", trend: "+28%", color: "#4F46E5", icon: <DollarSign size={16} /> },
];

// ─── Modal Content ────────────────────────────────────────────────────────────

interface SimulatorModalProps {
  onClose: () => void;
}

const SimulatorModal = ({ onClose }: SimulatorModalProps) => {
  const { notifs, dismiss, startNotifications } = useNotifications();

  // Start notifications when modal opens
  useState(() => {
    startNotifications();
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15,23,43,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden"
        style={{ boxShadow: "0 40px 80px rgba(15,23,43,0.3), 0 0 0 1px rgba(15,23,43,0.08)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-7 py-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center">
              <Activity size={18} className="text-white" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">Live-Infrastruktur Simulator</h3>
              <p className="text-xs text-slate-400">Echtzeit-Simulation unseres Digital-Stacks</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 border border-green-100">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-green-500"
              />
              <span className="text-xs font-bold text-green-700">LIVE</span>
            </div>
            <button
              onClick={onClose}
              id="simulator-close-btn"
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all duration-200"
              aria-label="Simulator schließen"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-7 grid grid-cols-1 md:grid-cols-2 gap-8 max-h-[70vh] overflow-y-auto">
          {/* LEFT — KPIs + Pipeline */}
          <div className="space-y-6">
            {/* KPI grid */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Performance KPIs</p>
              <div className="grid grid-cols-2 gap-3">
                {kpiStats.map((kpi, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-3 border border-slate-100"
                    style={{ background: `${kpi.color}06` }}
                  >
                    <div className="flex items-center gap-1.5 mb-2" style={{ color: kpi.color }}>
                      {kpi.icon}
                      <span
                        className="text-[10px] font-black uppercase tracking-wider"
                        style={{ color: "#94A3B8" }}
                      >
                        {kpi.label}
                      </span>
                    </div>
                    <div className="text-2xl font-black" style={{ color: kpi.color, lineHeight: 1 }}>
                      {kpi.value}
                    </div>
                    <div
                      className="text-[10px] font-bold mt-1 px-1.5 py-0.5 rounded-full inline-block"
                      style={{ background: `${kpi.color}15`, color: kpi.color }}
                    >
                      {kpi.trend}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline */}
            <div className="rounded-xl border border-slate-100 p-4">
              <PipelineVisualizer />
            </div>
          </div>

          {/* RIGHT — Live Automations + Notifications */}
          <div className="space-y-6">
            {/* Automations list */}
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Aktive Automations</p>
              <div className="space-y-2.5">
                {[
                  { name: "Lead Nurture Sequence", hits: 142, revenue: "€8.420", active: true },
                  { name: "KI Upsell Engine", hits: 2483, revenue: "€112.350", active: true },
                  { name: "Cart Recovery Flow", hits: 89, revenue: "€6.230", active: true },
                  { name: "Win-Back Campaign", hits: 38, revenue: "€34.200", active: false },
                ].map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl border"
                    style={{ background: "#F8FAFC", borderColor: "#E2E8F0" }}
                  >
                    <div className="flex items-center gap-2.5">
                      <motion.div
                        animate={a.active ? { opacity: [1, 0.4, 1] } : { opacity: 0.3 }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: a.active ? "#10B981" : "#CBD5E1" }}
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{a.name}</p>
                        <p className="text-xs text-slate-400">{a.hits.toLocaleString()} Executions</p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-black text-green-600">{a.revenue}</p>
                      <p
                        className="text-[10px] font-bold"
                        style={{ color: a.active ? "#10B981" : "#94A3B8" }}
                      >
                        {a.active ? "ACTIVE" : "PAUSED"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Live notification feed */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <RefreshCw size={12} className="text-slate-400" />
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Live Event Feed
                </p>
              </div>
              <div className="space-y-2 min-h-[120px]">
                <AnimatePresence>
                  {notifs.length === 0 ? (
                    <div className="text-xs text-slate-300 italic">Simulator lädt Events...</div>
                  ) : (
                    notifs.map((n) => (
                      <motion.div
                        key={n.id}
                        initial={{ opacity: 0, x: 16, height: 0 }}
                        animate={{ opacity: 1, x: 0, height: "auto" }}
                        exit={{ opacity: 0, x: 16, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-start justify-between p-3 rounded-lg border-l-2"
                        style={{
                          background: `${n.color}06`,
                          borderLeftColor: n.color,
                          borderTop: "1px solid rgba(15,23,43,0.05)",
                          borderRight: "1px solid rgba(15,23,43,0.05)",
                          borderBottom: "1px solid rgba(15,23,43,0.05)",
                        }}
                      >
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{n.message}</p>
                          {n.value && (
                            <p className="text-xs font-bold mt-0.5" style={{ color: n.color }}>
                              {n.value}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => dismiss(n.id)}
                          className="text-slate-300 hover:text-slate-500 transition-colors ml-2 flex-shrink-0"
                          aria-label="Benachrichtigung schließen"
                        >
                          <X size={12} />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-7 py-4 border-t border-slate-100 bg-slate-50">
          <p className="text-xs text-slate-400">
            Dies ist eine Simulation unserer echten Infrastruktur-Metriken.
          </p>
          <a
            href="#konfigurator"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:opacity-90"
            style={{ background: "#4F46E5" }}
            id="simulator-cta-konfigurator"
          >
            Projekt anfragen
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

export const TechShowcaseModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* ── Dark Call-Out Bar ──────────────────────────────────────────────── */}
      <section
        className="bg-slate-900 py-20"
        aria-labelledby="techshowcase-heading"
      >
        {/* Subtle radial glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(79,70,229,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-white/10 bg-white/5">
            <Sparkles size={13} className="text-indigo-400" />
            <span className="text-xs font-semibold text-indigo-300 tracking-widest uppercase">
              Live-Infrastruktur
            </span>
          </div>

          <h2
            id="techshowcase-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 max-w-3xl mx-auto leading-tight"
          >
            Überzeugen Sie sich selbst von{" "}
            <span className="text-indigo-400">unserer Infrastruktur.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Keine Hochglanz-Folien. Wir zeigen Ihnen live, wie unsere
            digitalen Systeme in Echtzeit Ergebnisse liefern.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="techshowcase-open-btn"
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-black text-white text-base bg-indigo-600 hover:bg-indigo-700 transition-colors"
            >
              <Activity size={20} />
              Live-Simulator starten
            </button>
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <ShoppingCart size={14} />
              <span>+2.483 Automations laufen gerade</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10">
            {[
              { value: "€112k", label: "Umsatz durch KI-Automations" },
              { value: "38h", label: "Durchschnittliche Zeitersparnis" },
              { value: "8,4%", label: "Conversion Rate (Ø Branche: 2,1%)" },
              { value: "0,09s", label: "Website-Ladezeit" },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-3xl font-black text-white mb-1">{s.value}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Modal Overlay ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && <SimulatorModal onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};
