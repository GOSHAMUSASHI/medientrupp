import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Zap, Box, Activity, Database, LayoutDashboard,
  Settings, TrendingUp, DollarSign, BarChart3,
  Search, RefreshCw, Plus, MessageSquare,
  CreditCard, Sparkles,
  X, CheckCircle
} from 'lucide-react';
import { GlassCard } from '../components/ui/GlassCard';


// ─────────────── SHARED HELPERS ───────────────

const WorkflowNode = ({ icon, title, activeColor, isActive, data }: any) => (
  <motion.div animate={{ y: isActive ? -5 : 0, boxShadow: isActive ? `0 0 30px ${activeColor}40` : 'none', borderColor: isActive ? activeColor : 'rgba(255,255,255,0.1)' }}
    style={{ flex: 1, minWidth: '100%', padding: '1.5rem', background: 'rgba(10,5,15,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', zIndex: 10, textAlign: 'center' }}>
    <div style={{ width: '60px', height: '60px', margin: '0 auto 1rem', borderRadius: '4px', border: `1px solid ${isActive ? activeColor : 'rgba(255,255,255,0.2)'}`, background: isActive ? `${activeColor}20` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isActive ? activeColor : 'var(--text-secondary)', transition: 'all 0.5s' }}>
      {icon}
    </div>
    <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: isActive ? '#fff' : 'var(--text-secondary)', transition: 'color 0.5s' }}>{title}</h4>
    <div style={{ fontSize: '0.8rem', color: isActive ? activeColor : 'rgba(255,255,255,0.2)', fontFamily: 'monospace', background: 'rgba(0,0,0,0.5)', padding: '0.4rem', borderRadius: '2px' }}>{data}</div>
  </motion.div>
);

const Badge = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <span style={{ padding: '0.25rem 0.6rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, background: `${color}15`, color, border: `1px solid ${color}40`, whiteSpace: 'nowrap' }}>{children}</span>
);

// ─────────────── LIVE NOTIFICATIONS ───────────────

interface Notification {
  id: string;
  type: 'order' | 'cart' | 'upsell' | 'recovery';
  message: string;
  value?: string;
  time: string;
  color: string;
}

const useNotifications = () => {
  const [notifs, setNotifs] = useState<Notification[]>([]);

  useEffect(() => {
    const events: Omit<Notification, 'id' | 'time'>[] = [
      { type: 'order', message: 'Neue Bestellung eingegangen', value: '€249', color: '#10B981' },
      { type: 'upsell', message: 'KI Upsell akzeptiert', value: '+€89', color: '#9333EA' },
      { type: 'cart', message: 'Warenkorb verlassen → Recovery gestartet', color: '#F59E0B' },
      { type: 'order', message: 'High-Ticket Order: Premium Bundle', value: '€890', color: '#10B981' },
      { type: 'recovery', message: 'Cart Recovery erfolgreich', value: '+€156', color: '#3B82F6' },
      { type: 'upsell', message: 'Cross-Sell Trigger ausgelöst', value: '+€45', color: '#9333EA' },
    ];

    let idx = 0;
    const interval = setInterval(() => {
      if (idx >= events.length) {
        clearInterval(interval);
        return;
      }
      const ev = events[idx];
      const notif: Notification = {
        ...ev,
        id: Date.now().toString(),
        time: 'Gerade eben',
      };
      setNotifs(prev => [notif, ...prev.slice(0, 4)]);
      idx++;
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const dismiss = (id: string) => setNotifs(prev => prev.filter(n => n.id !== id));
  return { notifs, dismiss };
};

// ─────────────── OVERVIEW ───────────────

const OverviewView = () => {
  const [pipelineState, setPipelineState] = useState<0 | 1 | 2 | 3>(0);
  const [revenue, setRevenue] = useState(47320);
  const [orders, setOrders] = useState(142);

  useEffect(() => {
    const iv = setInterval(() => {
      setRevenue(r => r + Math.floor(Math.random() * 340 + 60));
      setOrders(o => o + (Math.random() > 0.7 ? 1 : 0));
    }, 4000);
    return () => clearInterval(iv);
  }, []);

  const triggerFunnel = () => {
    setPipelineState(1);
    setTimeout(() => setPipelineState(2), 2000);
    setTimeout(() => setPipelineState(3), 4500);
    setTimeout(() => setPipelineState(0), 12000);
  };

  return (
    <div>
      <div style={{ marginBottom: '2.5rem' }}>
        <span style={{ color: '#10B981', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>High-Conversion System</span>
        <h1 className="heading-xl" style={{ marginTop: '0.5rem', marginBottom: '1rem' }}>Der <span style={{ color: '#10B981' }}>perfekte</span> Funnel.</h1>
        <p className="text-body" style={{ maxWidth: '700px' }}>Baukasten-Systeme binden deine Skalierung. Wir coden komplett eigenständige High-Ticket E-Commerce Architekturen.</p>
      </div>

      {/* Live Revenue Ticker */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Tages-Umsatz', val: `€${revenue.toLocaleString('de')}`, trend: '+12.4%', color: '#10B981', icon: <DollarSign size={18}/> },
          { label: 'Bestellungen', val: orders.toString(), trend: '+8 heute', color: '#9333EA', icon: <ShoppingCart size={18}/> },
          { label: 'Conversion Rate', val: '8.4%', trend: '+324%', color: '#3B82F6', icon: <TrendingUp size={18}/> },
          { label: 'Ø Warenkorbwert', val: '€338', trend: '+41%', color: '#F59E0B', icon: <BarChart3 size={18}/> },
        ].map((s, i) => (
          <GlassCard key={i} style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <div style={{ color: s.color }}>{s.icon}</div>
              <Badge color={s.color}>{s.trend}</Badge>
            </div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.color, lineHeight: 1 }}>{s.val}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.3rem' }}>{s.label}</div>
          </GlassCard>
        ))}
      </div>

      {/* Funnel Pipeline */}
      <div style={{ padding: '2rem', background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', border: '1px solid rgba(16,185,129,0.2)', marginBottom: '2rem', borderRadius: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Activity color="#10B981" size={18}/> Echtzeit Workflow Engine</h3>
          <button onClick={triggerFunnel} disabled={pipelineState > 0} style={{ padding: '0.7rem 1.5rem', background: pipelineState === 0 ? '#10B981' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(16,185,129,0.5)', color: '#fff', fontWeight: 800, textTransform: 'uppercase', cursor: pipelineState === 0 ? 'pointer' : 'not-allowed', fontSize: '0.8rem', letterSpacing: '0.05em', fontFamily: 'inherit' }}>
            {pipelineState === 0 ? '▶ Engine Starten' : '⚡ Running...'}
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative', height: 'auto', padding: '1rem 0' }}>
          <WorkflowNode icon={<ShoppingCart size={28}/>} title="Checkout" activeColor="#10B981" isActive={pipelineState >= 1} data={pipelineState >= 1 ? '249€ initialized' : 'Listening...'} />
          <WorkflowNode icon={<Zap size={28}/>} title="KI Upsell" activeColor="#9333EA" isActive={pipelineState >= 2} data={pipelineState >= 2 ? '+89€ accepted' : 'Waiting...'} />
          <WorkflowNode icon={<Box size={28}/>} title="Fulfillment" activeColor="#3B82F6" isActive={pipelineState >= 3} data={pipelineState >= 3 ? 'Dispatched ✓' : 'Pending...'} />
        </div>
      </div>

      {/* Revenue Chart (Simulated) */}
      <GlassCard style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem' }}>Umsatz — letzte 7 Tage</h3>
          <Badge color="#10B981">+28% ggü. Vorwoche</Badge>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.5rem', height: '100px' }}>
          {[35, 52, 41, 68, 74, 61, 88].map((h, i) => (
            <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.08, duration: 0.6, ease: 'easeOut' }}
              style={{ flex: 1, background: i === 6 ? '#10B981' : 'rgba(16,185,129,0.3)', borderRadius: '2px 2px 0 0', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', color: i === 6 ? '#10B981' : 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                €{(h * 680).toLocaleString('de')}
              </div>
            </motion.div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.75rem' }}>
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(d => (
            <div key={d} style={{ flex: 1, textAlign: 'center', fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{d}</div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

// ─────────────── LIVE TRAFFIC ───────────────

const LiveTrafficView = () => {
  const [users, setUsers] = useState(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      page: ['/', '/product/42', '/cart', '/checkout', '/thanks', '/product/17'][Math.floor(Math.random() * 6)],
      device: ['📱 Mobile', '🖥️ Desktop', '💻 Laptop'][Math.floor(Math.random() * 3)],
      duration: Math.floor(Math.random() * 240 + 10) + 's',
      isNew: Math.random() > 0.5,
      country: ['🇩🇪 DE', '🇦🇹 AT', '🇨🇭 CH', '🇳🇱 NL'][Math.floor(Math.random() * 4)],
      source: ['Google', 'Instagram', 'Direct', 'Email'][Math.floor(Math.random() * 4)],
    }))
  );

  // Simulate live traffic updates
  useEffect(() => {
    const iv = setInterval(() => {
      setUsers(prev => {
        const updated = [...prev];
        const ri = Math.floor(Math.random() * updated.length);
        updated[ri] = {
          ...updated[ri],
          page: ['/', '/product/42', '/cart', '/checkout', '/thanks'][Math.floor(Math.random() * 5)],
          duration: Math.floor(Math.random() * 240 + 10) + 's',
        };
        return updated;
      });
    }, 2500);
    return () => clearInterval(iv);
  }, []);

  const inCheckout = users.filter(u => u.page === '/checkout').length;
  const newVisitors = users.filter(u => u.isNew).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="heading-lg">Live <span style={{ color: '#10B981' }}>Traffic</span></h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981' }} />
          <span style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: 600 }}>LIVE</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <GlassCard style={{ padding: '1.25rem', textAlign: 'center' }}>
          <motion.div key={users.length} animate={{ scale: [1.1, 1] }} style={{ fontSize: '2.5rem', fontWeight: 800, color: '#10B981' }}>{users.length}</motion.div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Active Sessions</div>
        </GlassCard>
        <GlassCard style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#9333EA' }}>{newVisitors}</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>New Visitors</div>
        </GlassCard>
        <GlassCard style={{ padding: '1.25rem', textAlign: 'center' }}>
          <motion.div key={inCheckout} animate={{ scale: [1.15, 1] }} style={{ fontSize: '2.5rem', fontWeight: 800, color: inCheckout > 0 ? '#F59E0B' : '#3B82F6' }}>{inCheckout}</motion.div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>In Checkout</div>
        </GlassCard>
        <GlassCard style={{ padding: '1.25rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#EF4444' }}>2</div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Cart Abandoned</div>
        </GlassCard>
      </div>

      <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.08em' }}>LIVE SESSIONS</span>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}><RefreshCw size={14} color="var(--text-secondary)" /></motion.div>
        </div>
        {/* Column headers */}
        <div style={{ padding: '0.6rem 1.5rem', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '1rem', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em', borderBottom: '1px solid rgba(255,255,255,0.04)', background: 'rgba(0,0,0,0.2)' }}>
          <span>Seite</span><span>Gerät</span><span>Land</span><span>Quelle</span>
        </div>
        <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
          <AnimatePresence>
            {users.map(u => (
              <motion.div key={u.id} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}
                style={{ padding: '0.9rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.03)', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '1rem', fontSize: '0.84rem', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5 + Math.random(), repeat: Infinity }}
                    style={{ width: 6, height: 6, borderRadius: '50%', background: u.page === '/checkout' ? '#F59E0B' : u.isNew ? '#10B981' : '#9333EA', boxShadow: `0 0 6px ${u.page === '/checkout' ? '#F59E0B' : u.isNew ? '#10B981' : '#9333EA'}` }} />
                  <span style={{ color: '#fff', fontFamily: 'monospace' }}>{u.page}</span>
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{u.device}</span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.78rem' }}>{u.country}</span>
                <Badge color={u.source === 'Google' ? '#4285F4' : u.source === 'Instagram' ? '#E1306C' : u.source === 'Email' ? '#10B981' : '#9333EA'}>{u.source}</Badge>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  );
};

// ─────────────── AUTOMATIONS ───────────────

const AutomationsView = () => {
  const [automations, setAutomations] = useState([
    { id: 1, name: 'Cart Abandonment Recovery', trigger: 'Cart inactive > 30min', action: 'WhatsApp + Email Sequence', status: 'ACTIVE', hits: 142, revenue: '€8.420' },
    { id: 2, name: 'High-Ticket Lead Nurture', trigger: 'AOV > 500€', action: 'VIP Sales Call Booking', status: 'ACTIVE', hits: 38, revenue: '€34.200' },
    { id: 3, name: 'Upsell AI Engine', trigger: 'Product added to cart', action: 'Inject Dynamic Upsell', status: 'ACTIVE', hits: 2483, revenue: '€112.350' },
    { id: 4, name: 'Review Request Flow', trigger: '7 days post delivery', action: 'Email + SMS sequence', status: 'PAUSED', hits: 621, revenue: '—' },
    { id: 5, name: 'Win-Back Campaign', trigger: '60 days no purchase', action: 'Re-engagement discount', status: 'ACTIVE', hits: 89, revenue: '€6.230' },
  ]);

  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [triggerEffect, setTriggerEffect] = useState<number | null>(null);

  const toggleStatus = (id: number) => {
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, status: a.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' } : a));
  };

  const triggerAutomation = (id: number) => {
    setTriggerEffect(id);
    setAutomations(prev => prev.map(a => a.id === id ? { ...a, hits: a.hits + 1 } : a));
    setTimeout(() => setTriggerEffect(null), 2000);
  };

  const addAutomation = () => {
    if (!newName.trim()) return;
    setAutomations(prev => [...prev, { id: Date.now(), name: newName, trigger: 'Custom Trigger', action: 'Custom Action', status: 'PAUSED', hits: 0, revenue: '—' }]);
    setNewName('');
    setShowNew(false);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="heading-lg">KI <span style={{ color: '#9333EA' }}>Automations</span></h2>
        <button onClick={() => setShowNew(true)} style={{ padding: '0.7rem 1.5rem', background: '#9333EA', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem' }}>
          <Plus size={16}/> New Flow
        </button>
      </div>

      {/* Add new flow modal */}
      <AnimatePresence>
        {showNew && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', marginBottom: '1.5rem' }}>
            <GlassCard style={{ padding: '1.5rem', border: '1px solid rgba(147,51,234,0.4)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="Automation Name..."
                  style={{ flex: 1, minWidth: '200px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(147,51,234,0.3)', color: '#fff', padding: '0.75rem 1rem', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none' }} />
                <button onClick={addAutomation} style={{ padding: '0.75rem 1.5rem', background: '#9333EA', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}>Erstellen</button>
                <button onClick={() => setShowNew(false)} style={{ padding: '0.75rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={16}/></button>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {automations.map((a) => (
          <motion.div key={a.id} layout initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <GlassCard style={{ padding: '1.25rem 1.5rem', border: triggerEffect === a.id ? '1px solid #9333EA' : undefined, transition: 'border-color 0.3s', boxShadow: triggerEffect === a.id ? '0 0 30px rgba(147,51,234,0.3)' : undefined }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ fontWeight: 700, marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {a.name}
                    {triggerEffect === a.id && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: '0.7rem', color: '#9333EA', background: 'rgba(147,51,234,0.1)', padding: '0.15rem 0.5rem', borderRadius: '20px' }}>⚡ Triggered!</motion.div>}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Trigger: {a.trigger}</div>
                  <div style={{ fontSize: '0.78rem', color: '#9333EA' }}>→ {a.action}</div>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: '#9333EA' }}>{a.hits.toLocaleString()}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Executions</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, color: '#10B981', fontSize: '0.9rem' }}>{a.revenue}</div>
                    <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)' }}>Revenue</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => triggerAutomation(a.id)} title="Manuell auslösen"
                      style={{ padding: '0.4rem 0.7rem', background: 'rgba(147,51,234,0.1)', border: '1px solid rgba(147,51,234,0.3)', color: '#9333EA', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'inherit' }}>
                      ▶ Run
                    </button>
                    <button onClick={() => toggleStatus(a.id)}
                      style={{ padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.72rem', fontWeight: 700, background: a.status === 'ACTIVE' ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)', color: a.status === 'ACTIVE' ? '#10B981' : 'var(--text-secondary)', border: `1px solid ${a.status === 'ACTIVE' ? '#10B981' : 'rgba(255,255,255,0.1)'}`, cursor: 'pointer', fontFamily: 'inherit' }}>
                      {a.status}
                    </button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─────────────── INVENTORY / PRODUCTS ───────────────

const InventoryView = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'stock' | 'price'>('name');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const allProducts = [
    { id: 'SKU-001', name: 'Premium Hoodie (Schwarz)', stock: 234, price: 89, status: 'IN STOCK', sales: 842, rating: 4.8 },
    { id: 'SKU-002', name: 'Limited Edition Tee', stock: 12, price: 49, status: 'LOW STOCK', sales: 401, rating: 4.6 },
    { id: 'SKU-003', name: 'Cap Collection V2', stock: 0, price: 34, status: 'OUT OF STOCK', sales: 215, rating: 4.2 },
    { id: 'SKU-004', name: 'Jogger Pants', stock: 89, price: 79, status: 'IN STOCK', sales: 389, rating: 4.7 },
    { id: 'SKU-005', name: 'Digital Product Bundle', stock: 9999, price: 199, status: 'UNLIMITED', sales: 1204, rating: 4.9 },
    { id: 'SKU-006', name: 'Premium Crewneck', stock: 56, price: 69, status: 'IN STOCK', sales: 178, rating: 4.5 },
  ];

  const filtered = allProducts
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sortBy === 'name' ? a.name.localeCompare(b.name) : sortBy === 'stock' ? b.stock - a.stock : b.price - a.price);

  const statusColor = (s: string) => s === 'IN STOCK' || s === 'UNLIMITED' ? '#10B981' : s === 'LOW STOCK' ? '#F59E0B' : '#EF4444';

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h2 className="heading-lg">Inventory <span style={{ color: '#3B82F6' }}>DB</span></h2>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative' }}>
            <Search size={14} color="var(--text-secondary)" style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)' }} />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Suchen..." style={{ padding: '0.6rem 1rem 0.6rem 2rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', outline: 'none', minWidth: '180px', fontFamily: 'inherit', fontSize: '0.85rem' }} />
          </div>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as any)} style={{ padding: '0.6rem 1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', fontFamily: 'inherit', fontSize: '0.85rem', cursor: 'pointer', outline: 'none' }}>
            <option value="name" style={{ background: '#12101B' }}>Name</option>
            <option value="stock" style={{ background: '#12101B' }}>Bestand</option>
            <option value="price" style={{ background: '#12101B' }}>Preis</option>
          </select>
        </div>
      </div>

      <GlassCard style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '0.8rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'grid', gridTemplateColumns: '0.6fr 2fr 0.8fr 0.8fr 1fr 1fr', gap: '1rem', fontSize: '0.7rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', background: 'rgba(0,0,0,0.2)' }}>
          {['SKU', 'Produkt', 'Bestand', 'Preis', 'Verkäufe', 'Status'].map(h => <span key={h}>{h}</span>)}
        </div>
        <AnimatePresence>
          {filtered.map((p, i) => (
            <motion.div key={p.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.05 }}
              onClick={() => setSelectedProduct(selectedProduct?.id === p.id ? null : p)}
              style={{ display: 'grid', gridTemplateColumns: '0.6fr 2fr 0.8fr 0.8fr 1fr 1fr', gap: '1rem', padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: '0.87rem', alignItems: 'center', cursor: 'pointer', background: selectedProduct?.id === p.id ? 'rgba(59,130,246,0.05)' : 'transparent', transition: 'background 0.2s' }}>
              <span style={{ color: 'var(--text-secondary)', fontFamily: 'monospace', fontSize: '0.75rem' }}>{p.id}</span>
              <span style={{ fontWeight: 600 }}>{p.name}</span>
              <span style={{ color: p.stock < 20 && p.stock > 0 ? '#F59E0B' : '#fff' }}>{p.stock === 9999 ? '∞' : p.stock}</span>
              <span style={{ color: '#9333EA', fontWeight: 700 }}>€{p.price}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <span>{p.sales.toLocaleString()}</span>
                <span style={{ fontSize: '0.65rem', color: '#10B981' }}>★{p.rating}</span>
              </div>
              <Badge color={statusColor(p.status)}>{p.status}</Badge>
            </motion.div>
          ))}
        </AnimatePresence>
      </GlassCard>

      {/* Product Detail Drawer */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            style={{ marginTop: '1rem' }}>
            <GlassCard style={{ padding: '1.5rem', border: '1px solid rgba(59,130,246,0.3)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#3B82F6', letterSpacing: '0.1em', marginBottom: '0.25rem' }}>{selectedProduct.id}</div>
                  <h3 style={{ fontWeight: 800, fontSize: '1.2rem' }}>{selectedProduct.name}</h3>
                </div>
                <button onClick={() => setSelectedProduct(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={20}/></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '1rem' }}>
                {[
                  { label: 'Preis', val: `€${selectedProduct.price}`, color: '#9333EA' },
                  { label: 'Bestand', val: selectedProduct.stock === 9999 ? 'Unlimited' : selectedProduct.stock, color: '#10B981' },
                  { label: 'Verkäufe', val: selectedProduct.sales.toLocaleString(), color: '#3B82F6' },
                  { label: 'Rating', val: `★ ${selectedProduct.rating}`, color: '#F59E0B' },
                  { label: 'Umsatz', val: `€${(selectedProduct.price * selectedProduct.sales).toLocaleString('de')}`, color: '#10B981' },
                ].map((s, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: '0.75rem', background: 'rgba(0,0,0,0.3)' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: s.color }}>{s.val}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─────────────── KI UPSELL ENGINE ───────────────

const UpsellView = () => {
  const [activeProduct, setActiveProduct] = useState(0);
  const [upsellAccepted, setUpsellAccepted] = useState<number[]>([]);
  const [totalUpsell, setTotalUpsell] = useState(0);

  const products = [
    { name: 'Premium Hoodie', price: 89, upsells: [
      { name: 'Passendes Cap', price: 34, reason: 'Kunden kauften dies 83% häufiger zusammen' },
      { name: 'Versicherung & Rückgabe', price: 12, reason: 'Schutz für deine Bestellung — 94% akzeptieren das' },
    ]},
    { name: 'Jogger Pants', price: 79, upsells: [
      { name: 'Matching Crewneck', price: 69, reason: 'Komplettiere deinen Look — Top Seller Combo' },
      { name: 'Priority Shipping', price: 9, reason: 'Lieferung in 24h statt 4 Tagen' },
    ]},
    { name: 'Digital Bundle', price: 199, upsells: [
      { name: '1:1 Onboarding Session', price: 149, reason: '3x höhere Completion Rate mit Onboarding' },
      { name: 'Extended License', price: 99, reason: 'Für Teams & kommerzielle Nutzung' },
    ]},
  ];

  const acceptUpsell = (upsellIdx: number, price: number) => {
    if (!upsellAccepted.includes(upsellIdx)) {
      setUpsellAccepted(prev => [...prev, upsellIdx]);
      setTotalUpsell(t => t + price);
    }
  };

  const p = products[activeProduct];

  return (
    <div>
      <h2 className="heading-lg" style={{ marginBottom: '0.5rem' }}>KI <span style={{ color: '#9333EA' }}>Upsell Engine</span></h2>
      <p className="text-body" style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>Simuliere, wie die KI automatisch Upsells vorschlägt und den Warenkorbwert erhöht.</p>

      {/* Product selector */}
      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {products.map((prod, i) => (
          <button key={i} onClick={() => { setActiveProduct(i); setUpsellAccepted([]); setTotalUpsell(0); }}
            style={{ padding: '0.6rem 1.25rem', background: activeProduct === i ? '#9333EA' : 'rgba(255,255,255,0.04)', border: `1px solid ${activeProduct === i ? '#9333EA' : 'rgba(255,255,255,0.08)'}`, color: '#fff', fontWeight: activeProduct === i ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem', transition: 'all 0.2s' }}>
            {prod.name} — €{prod.price}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Cart */}
        <GlassCard style={{ padding: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem', letterSpacing: '0.05em' }}>🛒 WARENKORB</h3>
          <div style={{ padding: '1rem', background: 'rgba(0,0,0,0.3)', marginBottom: '0.75rem', display: 'flex', justifyContent: 'space-between' }}>
            <span>{p.name}</span>
            <span style={{ fontWeight: 700 }}>€{p.price}</span>
          </div>
          {upsellAccepted.map(idx => {
            const upsell = p.upsells[idx];
            return upsell ? (
              <motion.div key={idx} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                style={{ padding: '0.75rem 1rem', background: 'rgba(147,51,234,0.08)', border: '1px solid rgba(147,51,234,0.2)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: '#B3A8C9' }}>+ {upsell.name}</span>
                <span style={{ color: '#9333EA', fontWeight: 700 }}>+€{upsell.price}</span>
              </motion.div>
            ) : null;
          })}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem' }}>
            <span>Gesamt</span>
            <motion.span key={p.price + totalUpsell} animate={{ scale: [1.2, 1] }} style={{ color: '#10B981' }}>€{p.price + totalUpsell}</motion.span>
          </div>
        </GlassCard>

        {/* KI Suggestions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ padding: '0.75rem 1rem', background: 'rgba(147,51,234,0.08)', border: '1px solid rgba(147,51,234,0.2)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#9333EA' }}>
            <Sparkles size={14}/> KI analysiert Kaufmuster...
          </div>
          {p.upsells.map((upsell, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.2 }}>
              <GlassCard style={{ padding: '1.25rem', border: upsellAccepted.includes(i) ? '1px solid #10B981' : '1px solid rgba(147,51,234,0.2)', transition: 'border-color 0.3s' }}>
                <div style={{ fontSize: '0.7rem', color: '#9333EA', marginBottom: '0.5rem' }}>🤖 KI EMPFEHLUNG</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div style={{ fontWeight: 700 }}>{upsell.name}</div>
                  <div style={{ fontWeight: 800, color: '#9333EA', fontSize: '1.1rem' }}>+€{upsell.price}</div>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>{upsell.reason}</div>
                {upsellAccepted.includes(i) ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#10B981', fontSize: '0.85rem' }}>
                    <CheckCircle size={16}/> Hinzugefügt
                  </div>
                ) : (
                  <button onClick={() => acceptUpsell(i, upsell.price)} style={{ width: '100%', padding: '0.6rem', background: '#9333EA', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.85rem' }}>
                    + Zum Warenkorb
                  </button>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─────────────── SETTINGS ───────────────

const SettingsView = () => (
  <div>
    <h2 className="heading-lg" style={{ marginBottom: '2rem' }}>System <span style={{ color: 'var(--text-secondary)' }}>Settings</span></h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '700px' }}>
      {[
        { label: 'Shopify / Backend Endpoint', val: 'https://api.mystore.com/v1', connected: true, icon: <Box size={16}/> },
        { label: 'OpenAI API Key', val: 'sk-••••••••••••••••XXXX', connected: true, icon: <Sparkles size={16}/> },
        { label: 'WhatsApp Business API', val: 'via WATI.io', connected: false, icon: <MessageSquare size={16}/> },
        { label: 'Stripe Webhook URL', val: 'https://medientrupp.de/api/stripe', connected: true, icon: <CreditCard size={16}/> },
        { label: 'n8n / Make.com Webhook', val: 'https://hook.eu1.make.com/abc123', connected: true, icon: <Zap size={16}/> },
      ].map((s, i) => (
        <GlassCard key={i} style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
            <div style={{ color: s.connected ? '#10B981' : '#EF4444' }}>{s.icon}</div>
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>{s.label}</div>
              <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{s.val}</div>
            </div>
          </div>
          <Badge color={s.connected ? '#10B981' : '#EF4444'}>{s.connected ? 'CONNECTED' : 'NOT SET'}</Badge>
        </GlassCard>
      ))}
    </div>
  </div>
);

// ─────────────── MAIN COMPONENT ───────────────

const PAGES: { [k: string]: React.FC } = {
  overview: OverviewView,
  traffic: LiveTrafficView,
  automations: AutomationsView,
  inventory: InventoryView,
  upsell: UpsellView,
  settings: SettingsView,
};

const navItems = [
  { id: 'overview', icon: <LayoutDashboard size={18}/>, label: 'Overview' },
  { id: 'traffic', icon: <Activity size={18}/>, label: 'Live Traffic' },
  { id: 'automations', icon: <Zap size={18}/>, label: 'Automations' },
  { id: 'inventory', icon: <Database size={18}/>, label: 'Inventory DB' },
  { id: 'upsell', icon: <Sparkles size={18}/>, label: 'KI Upsell' },
  { id: 'settings', icon: <Settings size={18}/>, label: 'Settings' },
];

export const Ecommerce: React.FC = () => {
  const [activePage, setActivePage] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const ActiveView = PAGES[activePage];
  const { notifs, dismiss } = useNotifications();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)', overflow: 'hidden' }}>
      <div style={{ position: 'fixed', inset: 0, background: 'radial-gradient(circle at 70% 30%, rgba(16, 185, 129, 0.05) 0%, transparent 60%)', pointerEvents: 'none', zIndex: 0 }} />
      <div className="bg-grid" style={{ opacity: 0.3, zIndex: 0 }} />

      {/* ─── Mobile Sidebar Overlay ─── */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 50 }}
          />
        )}
      </AnimatePresence>

      {/* ─── SIDEBAR ─── */}
      <aside className={`ecommerce-sidebar ${sidebarOpen ? 'open' : ''}`} style={{
        width: '240px', background: 'rgba(10,5,15,0.97)', borderRight: '1px solid rgba(255,255,255,0.05)',
        paddingTop: '6rem', paddingBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem',
        position: 'fixed', top: 0, height: '100vh', zIndex: 60,
        transition: 'transform 0.3s ease',
      }}>
        <div style={{ padding: '0 1.5rem' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>STORE BACKEND</div>
          <div style={{ fontSize: '0.75rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
            System Online
          </div>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', padding: '0 0.75rem' }}>
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setActivePage(item.id); setSidebarOpen(false); }} style={{
              display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.8rem 1rem',
              background: activePage === item.id ? 'rgba(16,185,129,0.1)' : 'transparent',
              borderLeft: `3px solid ${activePage === item.id ? '#10B981' : 'transparent'}`,
              border: 'none', borderLeftWidth: '3px', borderLeftStyle: 'solid', borderLeftColor: activePage === item.id ? '#10B981' : 'transparent',
              color: activePage === item.id ? '#10B981' : 'var(--text-secondary)',
              cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.85rem', fontWeight: activePage === item.id ? 700 : 500,
              textAlign: 'left', fontFamily: 'inherit', borderRadius: '0 4px 4px 0',
            }}>
              {item.icon} {item.label}
            </button>
          ))}
        </nav>
        <div style={{ marginTop: 'auto', padding: '1rem 1.25rem', background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)', margin: '0 0.75rem' }}>
          <div style={{ fontSize: '0.7rem', color: '#10B981', fontWeight: 700, marginBottom: '0.25rem' }}>BY MEDIENTRUPP</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>Custom-coded. No limits. Your stack.</div>
        </div>
      </aside>

      {/* ─── MAIN ─── */}
      <main className="ecommerce-main" style={{ flex: 1, padding: '6rem 2.5rem 3rem 2.5rem', position: 'relative', zIndex: 10, overflowY: 'auto', marginLeft: '240px' }}>

        {/* Mobile Header Bar */}
        <div className="ecommerce-mobile-header" style={{ display: 'none', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setSidebarOpen(true)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '0.6rem 0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', fontFamily: 'inherit', borderRadius: '4px' }}>
              ☰ {navItems.find(n => n.id === activePage)?.label}
            </button>
            <a href="/" style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.3)', color: '#EC4899', padding: '0.6rem 0.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', fontSize: '0.85rem', fontWeight: 600, borderRadius: '4px' }}>
              Home
            </a>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#10B981', background: 'rgba(16,185,129,0.1)', padding: '0.2rem 0.6rem', borderRadius: '20px', border: '1px solid rgba(16,185,129,0.3)' }}>● LIVE</div>
        </div>

        {/* Live notifications */}
        <div style={{ position: 'fixed', top: '5rem', right: '1.5rem', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '320px' }}>
          <AnimatePresence>
            {notifs.map(n => (
              <motion.div key={n.id} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.35 }}
                style={{ padding: '0.75rem 1rem', background: 'rgba(10,5,15,0.95)', border: `1px solid ${n.color}30`, borderLeft: `3px solid ${n.color}`, backdropFilter: 'blur(20px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', boxShadow: `0 4px 20px rgba(0,0,0,0.5), 0 0 20px ${n.color}10` }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fff' }}>{n.message}</div>
                  {n.value && <div style={{ fontSize: '1rem', fontWeight: 800, color: n.color }}>{n.value}</div>}
                </div>
                <button onClick={() => dismiss(n.id)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', flexShrink: 0 }}><X size={14}/></button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activePage} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
            <ActiveView />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};
