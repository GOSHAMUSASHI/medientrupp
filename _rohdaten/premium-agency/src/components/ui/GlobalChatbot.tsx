import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, ChevronDown } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

/* ═══════════════════════════════════════════════════════════════
   KNOWLEDGE BASE — Everything about Medientrupp
   ═══════════════════════════════════════════════════════════════ */

const SERVICES = {
  website: {
    name: 'High-Performance Website',
    price: '500–2.500€ einmalig',
    desc: 'Kein Template, kein Baukasten. Jede Zeile Code handgeschrieben in React + Vite. Lighthouse 100/100.',
    features: ['React 19 + TypeScript + Vite', 'AAA Animationen (Framer Motion)', 'Lighthouse 100/100 Score', 'Responsive auf allen Geräten', 'SSL, Hosting & Deployment inkl.'],
    usp: '0.1s Ladezeit — der Branchenschnitt liegt bei 3.8s. Das ist der Unterschied zwischen Conversion und Bounce.',
  },
  ki: {
    name: 'KI & Automatisierung',
    price: 'ab 500€ Setup',
    desc: 'KI-Lead-Qualifizierung, autonome Mail-Sequenzen, CRM-Integration und intelligente Chatbots.',
    features: ['KI-Lead-Qualifizierung', 'Automatische Pitch-Sequenzen', 'CRM & Kalender-Integration', 'Custom API Workflows', 'Make.com / n8n / Custom'],
    usp: 'Dein autonomer Mitarbeiter der 24/7 arbeitet — ohne Krankentage, ohne Urlaub.',
  },
  ecommerce: {
    name: 'E-Commerce System',
    price: 'Individuell',
    desc: 'Headless React Frontends, KI-gesteuerte Upsells und autonomes Cart Recovery.',
    features: ['Conversion Rate +324%', '0.09s Ladezeit', 'KI-Upsell Engine (+41% AOV)', 'Cart Recovery 62%', 'Headless Architecture'],
    usp: 'Von 20k/Monat auf 6-stellig — das bauen wir.',
  },
  video: {
    name: 'Video & Social Media',
    price: '250–1.000€+ pro Projekt',
    desc: 'Datengetriebener Schnitt für maximale Retention & Engagement.',
    features: ['Hook-optimierte Editing', 'Color Grading & Sound Design', 'TikTok / Reels / Shorts', 'Thumbnail & Caption Design', 'Content-Strategie inklusive'],
    usp: 'Keine Imagefilme die niemand guckt. Daten entscheiden — nicht Bauchgefühl.',
  },
  workshop: {
    name: '1-on-1 Workshop',
    price: '1.000€ einmalig',
    desc: 'Intensiver Deep-Dive in dein Business. Wir finden jede Skalierungslücke.',
    features: ['3–4h Strategischer Deep-Dive', '360° Business-Analyse', 'Skalierungslücken aufdecken', 'Konkreter Action-Plan', 'Follow-Up Session inklusive'],
    usp: 'Ein klares System statt Rätselraten — nach 4 Stunden weißt du genau was zu tun ist.',
  },
  betreuung: {
    name: 'Laufende Betreuung',
    price: '100€/Monat',
    desc: 'Hosting, Wartung, Updates und Google Local SEO.',
    features: ['Backup & Security Updates', 'High-Speed Premium Hosting', 'Google Unternehmensprofil SEO', 'Schutz vor Hackerangriffen', 'Monatliche Performance-Reports'],
    usp: 'Du konzentrierst dich aufs Geld verdienen — wir halten die Technik am Laufen.',
  },
};

const COMPANY = {
  name: 'Medientrupp',
  location: 'Gummersbach, 51647 NRW',
  email: 'impact@medientrupp.de',
  phone: '+49 176 12345678',
  calendly: 'https://calendly.com/medientrupp',
  responseTime: '< 4 Stunden',
  stats: { systems: '47+', templates: '0', customCode: '100%' },
  techStack: ['React 19', 'TypeScript', 'Framer Motion', 'Node.js', 'Supabase', 'OpenAI GPT-4', 'Make.com / n8n', 'Vercel + Cloudflare'],
  manifesto: 'Wir glauben nicht an Templates. Wir glauben nicht an Agentur-Sprech. Jedes Business verdient es, digital zu dominieren.',
};

/* ═══════════════════════════════════════════════════════════════
   INTENT DETECTION
   ═══════════════════════════════════════════════════════════════ */

type Intent =
  | 'GREETING' | 'PRICING' | 'SERVICE_WEBSITE' | 'SERVICE_KI'
  | 'SERVICE_ECOMMERCE' | 'SERVICE_VIDEO' | 'SERVICE_WORKSHOP'
  | 'SERVICE_BETREUUNG' | 'CONTACT' | 'ABOUT' | 'TECH'
  | 'COMPETITOR' | 'BOT_DEMO' | 'OBJECTION_PRICE' | 'OBJECTION_NEED'
  | 'CLOSING' | 'THANKS' | 'UNKNOWN';

const INTENT_PATTERNS: { intent: Intent; keywords: string[] }[] = [
  { intent: 'GREETING', keywords: ['hallo', 'hi', 'hey', 'moin', 'servus', 'guten tag', 'guten morgen', 'guten abend', 'yo', 'grüß'] },
  { intent: 'PRICING', keywords: ['preis', 'kosten', 'was kostet', 'budget', 'investment', 'investition', 'teuer', 'günstig', 'billig', 'angebot', 'euro', '€', 'preisliste', 'preise'] },
  { intent: 'SERVICE_WEBSITE', keywords: ['website', 'webseite', 'homepage', 'landingpage', 'landing page', 'webdesign', 'webentwicklung', 'seite erstellen', 'internetseite', 'onepager', 'react', 'frontend'] },
  { intent: 'SERVICE_KI', keywords: ['ki', 'künstliche intelligenz', 'chatbot', 'bot', 'automatisierung', 'automation', 'ai', 'lead', 'crm', 'workflow', 'n8n', 'make.com'] },
  { intent: 'SERVICE_ECOMMERCE', keywords: ['shop', 'e-commerce', 'ecommerce', 'online shop', 'onlineshop', 'shopify', 'woocommerce', 'verkaufen', 'produkte', 'warenkorb', 'checkout'] },
  { intent: 'SERVICE_VIDEO', keywords: ['video', 'film', 'imagefilm', 'social media', 'tiktok', 'reels', 'youtube', 'content', 'schnitt', 'editing', 'dreh', 'kamera'] },
  { intent: 'SERVICE_WORKSHOP', keywords: ['workshop', 'beratung', 'consulting', 'strategie', 'coaching', 'session', 'strategieberatung', 'deep dive'] },
  { intent: 'SERVICE_BETREUUNG', keywords: ['betreuung', 'wartung', 'hosting', 'seo', 'maintenance', 'support', 'updates', 'pflege', 'sicherheit', 'backup'] },
  { intent: 'CONTACT', keywords: ['kontakt', 'termin', 'buchen', 'anfrage', 'schreiben', 'anrufen', 'telefonieren', 'email', 'mail', 'whatsapp', 'erreichen', 'melden', 'gespräch'] },
  { intent: 'ABOUT', keywords: ['wer seid ihr', 'über euch', 'team', 'firma', 'agentur', 'unternehmen', 'gummersbach', 'standort', 'seit wann', 'erfahrung', 'medientrupp'] },
  { intent: 'TECH', keywords: ['technik', 'technologie', 'stack', 'framework', 'programmierung', 'code', 'programmieren', 'sprache', 'tools', 'supabase', 'vercel', 'vite'] },
  { intent: 'COMPETITOR', keywords: ['wix', 'squarespace', 'jimdo', 'wordpress', 'baukasten', 'template', 'templatemonster', 'themeforest', 'elementor', 'andere agentur', 'unterschied', 'konkurrenz', 'warum ihr'] },
  { intent: 'BOT_DEMO', keywords: ['bot bauen', 'chatbot bauen', 'so einen bot', 'dieser bot', 'ich will auch', 'für mich', 'für mein business', 'eigenen bot', 'eigenen chatbot'] },
  { intent: 'OBJECTION_PRICE', keywords: ['zu teuer', 'zu viel', 'nicht leisten', 'kein budget', 'billiger', 'rabatt', 'nachlass', 'günstiger'] },
  { intent: 'OBJECTION_NEED', keywords: ['brauche ich nicht', 'weiß nicht', 'nicht sicher', 'überlegen', 'vielleicht', 'irgendwann', 'später', 'noch nicht'] },
  { intent: 'CLOSING', keywords: ['ja', 'buchen', 'machen', 'anfangen', 'starten', 'los', 'deal', 'dabei', 'let\'s go', 'loslegen', 'bestellen'] },
  { intent: 'THANKS', keywords: ['danke', 'dankeschön', 'vielen dank', 'super', 'cool', 'geil', 'perfekt', 'top', 'klasse', 'mega'] },
];

function detectIntent(input: string): Intent {
  const lower = input.toLowerCase().trim();
  let bestMatch: Intent = 'UNKNOWN';
  let bestScore = 0;

  for (const pattern of INTENT_PATTERNS) {
    let score = 0;
    for (const kw of pattern.keywords) {
      if (lower.includes(kw)) {
        score += kw.length; // Longer keyword matches = higher confidence
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = pattern.intent;
    }
  }
  return bestMatch;
}

/* ═══════════════════════════════════════════════════════════════
   RESPONSE ENGINE
   ═══════════════════════════════════════════════════════════════ */

interface BotResponse {
  messages: string[];
  quickReplies?: string[];
}

function formatFeatures(features: string[]): string {
  return features.map(f => `✅ ${f}`).join('\n');
}

function generateResponse(intent: Intent, msgCount: number, currentPath: string): BotResponse {
  // CEO-Bot teaser after 3+ messages
  const ceoTeaser = msgCount >= 4 && msgCount % 3 === 0;

  const ceoTeaserMsg = [
    '💡 Übrigens — genau so einen Assistenten können wir auch in dein Business einbauen. 24/7, keine Krankheitstage, keine Pausen.',
    '🤖 Du merkst gerade wie das wirkt, oder? Stell dir vor, so einer arbeitet für DICH. Das ist unser KI-Service — ab 500€ Setup.',
    '⚡ Fun fact: Dieser Bot ist nur ein Bruchteil von dem, was wir bauen. Für unsere Kunden machen wir das mit GPT-4 Integration, CRM-Anbindung und automatischen Follow-Ups.',
  ];

  const appendCeoTeaser = (resp: BotResponse): BotResponse => {
    if (ceoTeaser) {
      resp.messages.push(ceoTeaserMsg[msgCount % ceoTeaserMsg.length]);
    }
    return resp;
  };

  switch (intent) {
    case 'GREETING':
      return appendCeoTeaser({
        messages: [
          'Hey! 👋 Willkommen bei Medientrupp — schön, dass du hier bist.',
          currentPath === '/ecommerce'
            ? 'Du schaust dir gerade unseren E-Commerce Simulator an. Hast du Fragen zum Funnel-System?'
            : currentPath === '/kontakt'
            ? 'Du bist schon auf der Kontaktseite — nice! Soll ich dir bei der Anfrage helfen?'
            : currentPath === '/about'
            ? 'Du informierst dich über uns — gut so. Was möchtest du wissen?'
            : 'Was kann ich für dich tun? Website, KI-System, E-Commerce oder Video?',
        ],
        quickReplies: ['💰 Preise', '🌐 Website', '🤖 KI-Systeme', '🛒 E-Commerce', '📞 Kontakt'],
      });

    case 'PRICING':
      return appendCeoTeaser({
        messages: [
          '📊 Hier unsere Preisübersicht:',
          `🌐 **Website**: ${SERVICES.website.price}\n🤖 **KI & Automation**: ${SERVICES.ki.price}\n🎬 **Video & Social**: ${SERVICES.video.price}\n📚 **Workshop**: ${SERVICES.workshop.price}\n🔒 **Betreuung**: ${SERVICES.betreuung.price}`,
          'Radikale Transparenz — keine versteckten Kosten. Jeder Euro ist ein Investment in Infrastruktur, die sich zurückzahlt. Welcher Bereich interessiert dich?',
        ],
        quickReplies: ['🌐 Website Details', '🤖 KI Details', '🎬 Video Details', '📞 Erstgespräch buchen'],
      });

    case 'SERVICE_WEBSITE':
      return appendCeoTeaser({
        messages: [
          `🌐 **${SERVICES.website.name}**\n${SERVICES.website.price}`,
          SERVICES.website.desc,
          formatFeatures(SERVICES.website.features),
          `💡 ${SERVICES.website.usp}`,
          'Wir haben 47+ Systeme gebaut — 0 davon mit Templates. Jede Zeile ist handgeschrieben.',
        ],
        quickReplies: ['💰 Was kostet das genau?', '📞 Erstgespräch buchen', '🤖 KI dazu?', '🔒 Betreuung dazu?'],
      });

    case 'SERVICE_KI':
      return appendCeoTeaser({
        messages: [
          `🤖 **${SERVICES.ki.name}**\n${SERVICES.ki.price}`,
          SERVICES.ki.desc,
          formatFeatures(SERVICES.ki.features),
          `💡 ${SERVICES.ki.usp}`,
        ],
        quickReplies: ['📞 KI-Erstgespräch buchen', '🛒 E-Commerce + KI?', '💰 Preise'],
      });

    case 'SERVICE_ECOMMERCE':
      return appendCeoTeaser({
        messages: [
          `🛒 **${SERVICES.ecommerce.name}**`,
          SERVICES.ecommerce.desc,
          formatFeatures(SERVICES.ecommerce.features),
          `💡 ${SERVICES.ecommerce.usp}`,
          'Schau dir unseren Live E-Commerce Simulator an — da siehst du, wie das System funktioniert.',
        ],
        quickReplies: ['🖥️ Simulator ansehen', '📞 E-Commerce anfragen', '🤖 KI-Upsells erklärt?'],
      });

    case 'SERVICE_VIDEO':
      return appendCeoTeaser({
        messages: [
          `🎬 **${SERVICES.video.name}**\n${SERVICES.video.price}`,
          SERVICES.video.desc,
          formatFeatures(SERVICES.video.features),
          `💡 ${SERVICES.video.usp}`,
        ],
        quickReplies: ['📞 Video-Projekt anfragen', '💰 Preise', '🌐 Website dazu?'],
      });

    case 'SERVICE_WORKSHOP':
      return appendCeoTeaser({
        messages: [
          `📚 **${SERVICES.workshop.name}**\n${SERVICES.workshop.price}`,
          SERVICES.workshop.desc,
          formatFeatures(SERVICES.workshop.features),
          `💡 ${SERVICES.workshop.usp}`,
        ],
        quickReplies: ['📞 Workshop buchen', '💰 Alle Preise', '🌐 Website stattdessen?'],
      });

    case 'SERVICE_BETREUUNG':
      return appendCeoTeaser({
        messages: [
          `🔒 **${SERVICES.betreuung.name}**\n${SERVICES.betreuung.price}`,
          SERVICES.betreuung.desc,
          formatFeatures(SERVICES.betreuung.features),
          `💡 ${SERVICES.betreuung.usp}`,
        ],
        quickReplies: ['📞 Betreuung anfragen', '🌐 Website + Betreuung?', '💰 Preise'],
      });

    case 'CONTACT':
      return appendCeoTeaser({
        messages: [
          '📞 So erreichst du uns:',
          `📧 E-Mail: ${COMPANY.email}\n📱 WhatsApp: ${COMPANY.phone}\n📍 Standort: ${COMPANY.location}\n⏱️ Reaktionszeit: ${COMPANY.responseTime}`,
          'Am schnellsten geht\'s über ein Erstgespräch — wir analysieren dein Projekt und geben dir direkt einen konkreten Fahrplan.',
        ],
        quickReplies: ['📅 Erstgespräch buchen', '📝 Kontaktformular', '📧 E-Mail senden'],
      });

    case 'ABOUT':
      return appendCeoTeaser({
        messages: [
          `**${COMPANY.name}** — AAA Digitalinfrastruktur aus ${COMPANY.location}.`,
          COMPANY.manifesto,
          `📊 ${COMPANY.stats.systems} Systeme gebaut | ${COMPANY.stats.templates} Templates | ${COMPANY.stats.customCode} Custom Code`,
          'Wir sind keine klassische Agentur. Wir sind Infrastruktur-Engineers. Remote-First, aber physisch in der Metropolregion Köln/Bonn.',
        ],
        quickReplies: ['🔧 Tech Stack?', '💰 Preise', '📞 Kontakt', '🌐 Website ansehen'],
      });

    case 'TECH':
      return appendCeoTeaser({
        messages: [
          '🔧 **Unser Tech-Arsenal:**',
          COMPANY.techStack.map(t => `→ ${t}`).join('\n'),
          'Kein WordPress. Kein Baukasten. Alles von Hand engineered — für Performance, Skalierbarkeit und Conversion.',
        ],
        quickReplies: ['🌐 Website anfragen', '🤖 KI-Systeme', '💰 Preise'],
      });

    case 'COMPETITOR':
      return appendCeoTeaser({
        messages: [
          '⚡ Gute Frage. Hier ist der Unterschied:',
          '**Baukasten (Wix, Squarespace, etc.):**\n❌ 3.8s Ladezeit\n❌ Limitiertes Design\n❌ Keine echte Skalierung\n❌ Conversion-Rate unter 2%',
          '**Medientrupp:**\n✅ 0.1s Ladezeit\n✅ 100% Custom Code\n✅ Lighthouse 100/100\n✅ KI-Integration möglich\n✅ Conversion-Rate 8.4%+',
          'Der Preisunterschied zahlt sich innerhalb von Wochen zurück — durch Performance und Conversions.',
        ],
        quickReplies: ['💰 Preise vergleichen', '📞 Beratung buchen', '🌐 Website anfragen'],
      });

    case 'BOT_DEMO':
      return {
        messages: [
          '🎯 Genau DAS ist unser KI & Automatisierung Service!',
          'Was du gerade erlebst, ist nur ein Bruchteil. Für unsere Kunden bauen wir Bots mit:\n\n🧠 GPT-4 Integration\n📊 CRM-Anbindung (HubSpot, Pipedrive, etc.)\n📧 Automatische Follow-Up Sequenzen\n📱 WhatsApp Business API\n💰 Lead-Scoring & Qualifizierung',
          `Investment: ${SERVICES.ki.price} — laufende Kosten nach Verbrauch.`,
          'Stell dir vor: Dieser Bot hier — aber auf Steroiden, 24/7 für DEIN Business aktiv.',
        ],
        quickReplies: ['📞 KI-Bot anfragen', '💰 Was kostet das?', '🤖 Mehr Features?'],
      };

    case 'OBJECTION_PRICE':
      return appendCeoTeaser({
        messages: [
          'Ich verstehe den Gedanken. Lass mich dir eine andere Perspektive geben:',
          '💡 Eine Website die 500€ kostet und 10.000€ Umsatz generiert — ist das "teuer"?\n\nUnsere Kunden sehen im Schnitt:\n→ +324% Conversion Rate\n→ +41% höheren Warenkorbwert\n→ 62% Cart Recovery',
          'Das ist kein Kostenpunkt, das ist ein Investment mit messbarem ROI. Wollen wir mal darüber sprechen, was für DEIN Business realistisch ist?',
        ],
        quickReplies: ['📞 Erstgespräch (kostenlos)', '💰 Preisübersicht', '📚 Workshop stattdessen?'],
      });

    case 'OBJECTION_NEED':
      return appendCeoTeaser({
        messages: [
          'Kein Druck — ernsthaft. 🤝',
          'Aber stell dir mal die Frage: Was kostet dich jeder Tag OHNE ein System, das automatisch Leads generiert und konvertiert?',
          'Viele unserer besten Kunden haben sich anfangs gesagt "brauche ich noch nicht" — und hätten rückblickend gern früher angefangen.',
          'Wie wäre es mit einem unverbindlichen Erstgespräch? 30 Minuten, kein Sales-Pitch — pure Analyse deiner Situation.',
        ],
        quickReplies: ['📞 Unverbindliches Gespräch', '💰 Preise ansehen', '📧 Später melden'],
      });

    case 'CLOSING':
      return {
        messages: [
          'Läuft! 🔥',
          'Der schnellste Weg: Buch dir jetzt ein Erstgespräch. Wir analysieren dein Projekt und geben dir einen konkreten Fahrplan.\n\n📅 Calendly: calendly.com/medientrupp\n📧 E-Mail: impact@medientrupp.de\n📱 WhatsApp: +49 176 12345678',
          '⚠️ Heads up: Wir nehmen nur wenige ausgewählte Projekte pro Quartal an. Q2 2026 ist fast voll.',
        ],
        quickReplies: ['📅 Calendly öffnen', '📝 Kontaktformular', '📧 E-Mail senden'],
      };

    case 'THANKS':
      return appendCeoTeaser({
        messages: [
          'Gerne! Freut mich, dass ich helfen konnte. 🙌',
          'Falls du noch Fragen hast — ich bin hier. Und wenn du bereit bist, buch dir einfach ein Erstgespräch.',
        ],
        quickReplies: ['📅 Erstgespräch buchen', '💰 Preise', '👋 Tschüss'],
      });

    case 'UNKNOWN':
    default:
      return appendCeoTeaser({
        messages: [
          'Hmm, dazu habe ich keine direkte Antwort — aber ich kann dir bei allem rund um Websites, KI-Systeme, E-Commerce, Video und Strategie helfen.',
          'Wähle einfach ein Thema oder schreib mir, was dich interessiert:',
        ],
        quickReplies: ['🌐 Websites', '🤖 KI-Systeme', '🛒 E-Commerce', '🎬 Video', '💰 Preise', '📞 Kontakt'],
      });
  }
}

/* ═══════════════════════════════════════════════════════════════
   QUICK-REPLY → INTENT MAPPING
   ═══════════════════════════════════════════════════════════════ */

function quickReplyToIntent(reply: string): Intent {
  const r = reply.toLowerCase();
  if (r.includes('preis') || r.includes('kosten') || r.includes('💰')) return 'PRICING';
  if (r.includes('website') || r.includes('🌐')) return 'SERVICE_WEBSITE';
  if (r.includes('ki') || r.includes('🤖') || r.includes('bot')) return 'SERVICE_KI';
  if (r.includes('e-commerce') || r.includes('ecommerce') || r.includes('shop') || r.includes('🛒')) return 'SERVICE_ECOMMERCE';
  if (r.includes('video') || r.includes('🎬')) return 'SERVICE_VIDEO';
  if (r.includes('workshop') || r.includes('📚')) return 'SERVICE_WORKSHOP';
  if (r.includes('betreuung') || r.includes('🔒')) return 'SERVICE_BETREUUNG';
  if (r.includes('kontakt') || r.includes('📞') || r.includes('gespräch') || r.includes('📅') || r.includes('erstgespräch') || r.includes('calendly')) return 'CONTACT';
  if (r.includes('simulator') || r.includes('🖥️')) return 'SERVICE_ECOMMERCE';
  if (r.includes('tech') || r.includes('🔧') || r.includes('stack')) return 'TECH';
  if (r.includes('kontaktformular') || r.includes('📝')) return 'CONTACT';
  if (r.includes('e-mail') || r.includes('📧')) return 'CONTACT';
  if (r.includes('tschüss') || r.includes('👋')) return 'THANKS';
  return 'UNKNOWN';
}

/* ═══════════════════════════════════════════════════════════════
   MESSAGE TYPE
   ═══════════════════════════════════════════════════════════════ */

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  quickReplies?: string[];
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════════════════════════ */

export const GlobalChatbot: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [hasNewMsg, setHasNewMsg] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Welcome message based on current page
  const getWelcomeMessage = useCallback((): ChatMessage[] => {
    const path = location.pathname;
    let welcome = 'Willkommen bei Medientrupp! 👋 Wie kann ich dir helfen?';
    if (path === '/ecommerce') welcome = 'Hey! 👋 Du schaust dir gerade unseren E-Commerce Simulator an. Coole Sache, oder? Hast du Fragen dazu?';
    else if (path === '/kontakt') welcome = 'Hey! 👋 Du bist auf der Kontaktseite — fast soweit! Soll ich dir helfen, die richtige Anfrage zu formulieren?';
    else if (path === '/about') welcome = 'Hey! 👋 Hier erfährst du, wer wir sind und wie wir ticken. Was möchtest du wissen?';

    return [
      { id: 'welcome-1', text: welcome, sender: 'ai', quickReplies: ['💰 Preise', '🌐 Website', '🤖 KI-Systeme', '🛒 E-Commerce', '📞 Kontakt'] },
    ];
  }, [location.pathname]);

  // Init messages on first open
  useEffect(() => {
    if (isOpen && !initialized) {
      setMessages(getWelcomeMessage());
      setInitialized(true);
    }
  }, [isOpen, initialized, getWelcomeMessage]);

  // Auto-scroll
  useEffect(() => {
    if (chatRef.current) {
      setTimeout(() => {
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
      }, 50);
    }
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Notification pulse when closed
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setHasNewMsg(true), 5000);
      return () => clearTimeout(timer);
    } else {
      setHasNewMsg(false);
    }
  }, [isOpen]);

  // Handle navigation actions from bot
  const handleNavAction = useCallback((text: string) => {
    if (text.includes('Simulator ansehen') || text.includes('simulator')) {
      navigate('/ecommerce');
    } else if (text.includes('Kontaktformular') || text.includes('kontaktformular')) {
      navigate('/kontakt');
    } else if (text.includes('Calendly') || text.includes('calendly')) {
      window.open(COMPANY.calendly, '_blank');
    } else if (text.includes('E-Mail senden') || text.includes('e-mail')) {
      window.open(`mailto:${COMPANY.email}`, '_blank');
    }
  }, [navigate]);

  // Process user input
  const processInput = useCallback((text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = { id: `u-${Date.now()}`, text: text.trim(), sender: 'user' };
    setMessages(prev => prev.map(m => ({ ...m, quickReplies: undefined })).concat(userMsg));
    setMsgCount(c => c + 1);
    setIsTyping(true);

    const intent = detectIntent(text);
    const response = generateResponse(intent, msgCount + 1, location.pathname);

    // Handle navigation
    handleNavAction(text);

    // Simulate typing with staggered messages
    let delay = 600;
    response.messages.forEach((msg, i) => {
      const isLast = i === response.messages.length - 1;
      delay += Math.min(msg.length * 15, 1800) + 300;

      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `ai-${Date.now()}-${i}`,
            text: msg,
            sender: 'ai',
            quickReplies: isLast ? response.quickReplies : undefined,
          },
        ]);
        if (isLast) setIsTyping(false);
      }, delay);
    });
  }, [msgCount, location.pathname, handleNavAction]);

  const handleSend = () => {
    processInput(inputVal);
    setInputVal('');
  };

  const handleQuickReply = (reply: string) => {
    const intent = quickReplyToIntent(reply);

    // Navigating quick replies
    if (reply.includes('Simulator') || reply.includes('🖥️')) {
      navigate('/ecommerce');
    } else if (reply.includes('Kontaktformular') || reply.includes('📝')) {
      navigate('/kontakt');
    } else if (reply.includes('Calendly') || reply.includes('📅')) {
      window.open(COMPANY.calendly, '_blank');
    } else if (reply.includes('E-Mail') || reply.includes('📧')) {
      window.open(`mailto:${COMPANY.email}`, '_blank');
    }

    // User bubble
    const userMsg: ChatMessage = { id: `u-${Date.now()}`, text: reply, sender: 'user' };
    setMessages(prev => prev.map(m => ({ ...m, quickReplies: undefined })).concat(userMsg));
    setMsgCount(c => c + 1);
    setIsTyping(true);

    const response = generateResponse(intent, msgCount + 1, location.pathname);

    let delay = 600;
    response.messages.forEach((msg, i) => {
      const isLast = i === response.messages.length - 1;
      delay += Math.min(msg.length * 15, 1800) + 300;
      setTimeout(() => {
        setMessages(prev => [
          ...prev,
          {
            id: `ai-${Date.now()}-${i}`,
            text: msg,
            sender: 'ai',
            quickReplies: isLast ? response.quickReplies : undefined,
          },
        ]);
        if (isLast) setIsTyping(false);
      }, delay);
    });
  };

  /* ─── STYLES ─── */

  const formatText = (text: string) => {
    // Bold
    let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Line breaks
    formatted = formatted.replace(/\n/g, '<br/>');
    return formatted;
  };

  return (
    <>
      {/* ═══ FAB BUTTON ═══ */}
      <motion.button
        onClick={() => setIsOpen(o => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem',
          width: '64px', height: '64px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #6F4E7C 0%, #9333EA 100%)',
          color: '#fff', border: 'none', cursor: 'pointer', zIndex: 10000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(147, 51, 234, 0.4), 0 0 0 0 rgba(147,51,234,0)',
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.2 }}>
              <MessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification badge */}
        {hasNewMsg && !isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={{
              position: 'absolute', top: -2, right: -2,
              width: '20px', height: '20px', borderRadius: '50%',
              background: '#EF4444', border: '2px solid #12101B',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.65rem', fontWeight: 800,
            }}
          >
            1
          </motion.div>
        )}

        {/* Pulse ring */}
        {hasNewMsg && !isOpen && (
          <motion.div
            animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              position: 'absolute', inset: -4,
              borderRadius: '50%', border: '2px solid #9333EA',
            }}
          />
        )}
      </motion.button>

      {/* ═══ CHAT WINDOW ═══ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
            className="chatbot-window"
            style={{
              position: 'fixed',
              bottom: '6.5rem', right: '2rem',
              width: '400px', height: '560px',
              background: 'rgba(12, 10, 20, 0.97)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid rgba(147, 51, 234, 0.25)',
              borderRadius: '16px',
              zIndex: 10001,
              display: 'flex', flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(147,51,234,0.1)',
            }}
          >
            {/* ─── HEADER ─── */}
            <div style={{
              padding: '1rem 1.25rem',
              background: 'linear-gradient(180deg, rgba(30, 26, 46, 0.95) 0%, rgba(18, 16, 27, 0.95) 100%)',
              borderBottom: '1px solid rgba(147, 51, 234, 0.2)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Avatar */}
                <div style={{ position: 'relative', width: 40, height: 40 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6F4E7C, #9333EA)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Bot size={20} color="#fff" />
                  </div>
                  <div style={{
                    position: 'absolute', bottom: 0, right: 0,
                    width: 12, height: 12, borderRadius: '50%',
                    background: '#10B981', border: '2px solid #12101B',
                  }} />
                  <motion.div
                    animate={{ scale: [1, 2], opacity: [0.8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 12, height: 12, borderRadius: '50%',
                      background: '#10B981',
                    }}
                  />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff', letterSpacing: '0.02em' }}>
                    Medientrupp AI
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#10B981', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }} />
                    Online • Antwortet sofort
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-secondary)', cursor: 'pointer', padding: '0.4rem',
                  borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
              >
                <ChevronDown size={18} />
              </button>
            </div>

            {/* ─── MESSAGES ─── */}
            <div
              ref={chatRef}
              className="chatbot-messages"
              style={{
                flex: 1, overflowY: 'auto', padding: '1rem',
                display: 'flex', flexDirection: 'column', gap: '0.5rem',
                scrollBehavior: 'smooth',
              }}
            >
              {messages.map((m, idx) => (
                <React.Fragment key={m.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 10, x: m.sender === 'user' ? 10 : -10 }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
                      maxWidth: '85%',
                      padding: '0.75rem 1rem',
                      background: m.sender === 'user'
                        ? 'linear-gradient(135deg, #6F4E7C, #9333EA)'
                        : 'rgba(255,255,255,0.04)',
                      border: m.sender === 'user'
                        ? 'none'
                        : '1px solid rgba(255,255,255,0.06)',
                      borderRadius: m.sender === 'user'
                        ? '12px 12px 2px 12px'
                        : '12px 12px 12px 2px',
                      color: '#fff',
                      fontSize: '0.88rem',
                      lineHeight: 1.55,
                      wordBreak: 'break-word',
                      whiteSpace: 'pre-wrap',
                    }}
                    dangerouslySetInnerHTML={{ __html: formatText(m.text) }}
                  />

                  {/* Quick Replies */}
                  {m.quickReplies && m.quickReplies.length > 0 && idx === messages.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      style={{
                        display: 'flex', flexWrap: 'wrap', gap: '0.4rem',
                        alignSelf: 'flex-start', marginTop: '0.25rem',
                      }}
                    >
                      {m.quickReplies.map((qr, qi) => (
                        <motion.button
                          key={qi}
                          whileHover={{ scale: 1.05, background: 'rgba(147,51,234,0.2)' }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleQuickReply(qr)}
                          style={{
                            padding: '0.4rem 0.75rem',
                            background: 'rgba(147,51,234,0.08)',
                            border: '1px solid rgba(147,51,234,0.3)',
                            borderRadius: '20px',
                            color: '#B3A8C9',
                            fontSize: '0.78rem',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            transition: 'all 0.2s',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {qr}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </React.Fragment>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    display: 'flex', gap: '0.35rem', alignSelf: 'flex-start',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px 12px 12px 2px',
                  }}
                >
                  {[0, 0.15, 0.3].map((delay, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay }}
                      style={{
                        width: 7, height: 7, borderRadius: '50%',
                        background: i === 0 ? '#9333EA' : i === 1 ? '#6F4E7C' : '#B3A8C9',
                      }}
                    />
                  ))}
                </motion.div>
              )}
            </div>

            {/* ─── INPUT ─── */}
            <div style={{
              padding: '0.75rem 1rem',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(18, 16, 27, 0.95)',
              display: 'flex', gap: '0.5rem', alignItems: 'center',
            }}>
              <input
                ref={inputRef}
                value={inputVal}
                onChange={e => setInputVal(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
                placeholder="Schreib eine Nachricht..."
                disabled={isTyping}
                style={{
                  flex: 1,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '10px',
                  color: '#fff', padding: '0.7rem 1rem',
                  fontSize: '0.88rem',
                  outline: 'none',
                  fontFamily: 'inherit',
                  transition: 'border-color 0.3s',
                }}
                onFocus={e => { e.target.style.borderColor = 'rgba(147,51,234,0.5)'; }}
                onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; }}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSend}
                disabled={!inputVal.trim() || isTyping}
                style={{
                  width: 40, height: 40,
                  borderRadius: '10px',
                  background: inputVal.trim() && !isTyping
                    ? 'linear-gradient(135deg, #6F4E7C, #9333EA)'
                    : 'rgba(255,255,255,0.05)',
                  border: 'none',
                  color: inputVal.trim() && !isTyping ? '#fff' : 'rgba(255,255,255,0.2)',
                  cursor: inputVal.trim() && !isTyping ? 'pointer' : 'not-allowed',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.3s',
                  flexShrink: 0,
                }}
              >
                <Send size={16} />
              </motion.button>
            </div>

            {/* ─── POWERED BY ─── */}
            <div style={{
              textAlign: 'center',
              padding: '0.4rem',
              fontSize: '0.6rem',
              color: 'rgba(255,255,255,0.15)',
              letterSpacing: '0.1em',
              background: 'rgba(0,0,0,0.3)',
            }}>
              POWERED BY MEDIENTRUPP AI ENGINE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
