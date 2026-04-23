// ── Case Studies — Single Source of Truth ────────────────────────────────────
// Used by: CasesPreviewSection (Homepage) + PortfolioPage

export interface Case {
  index: string;
  title: string;
  category: string;
  description: string;
  metrics: string[];
  image: string;
  /** Slug of the matching /leistungen/[slug] subpage */
  leistungSlug: string;
  /** Human-readable Leistung label for filter */
  leistungLabel: string;
  /** Industry / Branche for filter */
  branche: string;
  /** 2 bullet points — what we did */
  whatWeDid: [string, string];
  /** 1 measurable result sentence */
  result: string;
}

export const cases: Case[] = [
  {
    index: "01",
    title: "Global Supply Group",
    category: "Full-Stack B2B Plattform",
    description: "Automatisierter Lead-Qualifizierungs-Funnel und Client-Portal für einen internationalen Logistiker.",
    metrics: ["Conversion +40 %", "Ladezeit 0,12 s", "CRM-Sync"],
    image: "/images/case-supply.webp",
    leistungSlug: "websites",
    leistungLabel: "Website",
    branche: "Logistik",
    whatWeDid: [
      "Automatisierten Lead-Qualifizierungs-Funnel mit CRM-Sync entwickelt",
      "Client-Portal mit Echtzeit-Tracking und individuellen Dashboards aufgebaut",
    ],
    result: "Conversion-Rate um 40 % gesteigert, Ladezeit auf 0,12 Sekunden reduziert.",
  },
  {
    index: "02",
    title: "FinTech Navigator",
    category: "Corporate Website & SaaS UI",
    description: "Kompletter Relaunch der Marketing-Website inklusive interaktivem Rendite-Rechner.",
    metrics: ["14 k Leads/Mo", "Web-Vitals 100/100", "Dark Mode"],
    image: "/images/case-fintech.webp",
    leistungSlug: "websites",
    leistungLabel: "Website",
    branche: "Finanzen",
    whatWeDid: [
      "Marketing-Website neu entwickelt mit interaktivem Rendite-Rechner",
      "Core Web Vitals auf 100/100 optimiert und Dark Mode implementiert",
    ],
    result: "14.000 qualifizierte Leads pro Monat bei perfekten Web-Vitals-Werten.",
  },
  {
    index: "03",
    title: "MedTech Recruiting",
    category: "Automatisierter Funnel",
    description: "Spezialisiertes Karriere-Portal zur vollautomatischen Vorqualifizierung von Fachkräften.",
    metrics: ["−80 % Time-to-Hire", "KI-Screening", "Voll automatisiert"],
    image: "/images/case-medtech.webp",
    leistungSlug: "ki-automation",
    leistungLabel: "KI & Automation",
    branche: "Gesundheit",
    whatWeDid: [
      "KI-gestütztes Screening-System zur automatischen Kandidaten-Vorqualifizierung gebaut",
      "Vollautomatische Benachrichtigungen und CRM-Integration für das HR-Team eingerichtet",
    ],
    result: "Time-to-Hire um 80 % reduziert durch vollautomatischen KI-Screening-Prozess.",
  },
  {
    index: "04",
    title: "Industrial Systems",
    category: "E-Commerce Headless",
    description: "Rasend schneller B2B Online-Shop mit direkter Anbindung an bestehende SAP-Warenwirtschaft.",
    metrics: ["3,4 M+ Umsatz", "+120 % Sichtbarkeit", "Headless"],
    image: "/images/case-industrie.webp",
    leistungSlug: "websites",
    leistungLabel: "Website",
    branche: "E-Commerce",
    whatWeDid: [
      "Headless B2B-Shop mit direkter SAP-Warenwirtschafts-Anbindung entwickelt",
      "Performance auf unter 0,5 Sekunden optimiert, organische Sichtbarkeit verdoppelt",
    ],
    result: "3,4 Millionen Euro Umsatz und 120 % mehr Sichtbarkeit innerhalb von 6 Monaten.",
  },
  {
    index: "05",
    title: "Pflegedienst Nord GmbH",
    category: "Website & Local SEO",
    description: "Neuer digitaler Auftritt mit Google-Optimierung für einen ambulanten Pflegedienst.",
    metrics: ["+210 % Anfragen", "Top 3 Google", "Go-Live in 3 Wo."],
    image: "/images/teaser-pflege.webp",
    leistungSlug: "websites",
    leistungLabel: "Website",
    branche: "Gesundheit",
    whatWeDid: [
      "Professionelle Unternehmenswebsite mit Bewerbungsformular und SEO aufgebaut",
      "Google Business Profil optimiert und lokale Suchanzeigen eingerichtet",
    ],
    result: "210 % mehr Kontaktanfragen und Top-3-Platzierung bei lokalen Google-Suchen.",
  },
  {
    index: "06",
    title: "Maschinenbau Euler",
    category: "KI-Plattform & Automation",
    description: "Maßgeschneidertes KI-System zur automatischen Angebotserstellung und Kundenkommunikation.",
    metrics: ["−70 % Aufwand", "24/7 Angebote", "CRM-Integration"],
    image: "/images/teaser-maschinenbau.webp",
    leistungSlug: "ki-plattformen",
    leistungLabel: "Individuelle KI-Projekte",
    branche: "Industrie",
    whatWeDid: [
      "Individuelles KI-Modell zur automatischen Angebotskalkulation trainiert",
      "CRM- und ERP-Anbindung für vollautomatische Kundenkommunikation realisiert",
    ],
    result: "70 % weniger manueller Aufwand bei der Angebotserstellung, Kunden erhalten Angebote in unter 3 Minuten.",
  },
  {
    index: "07",
    title: "Meisterhaus Köln",
    category: "Branding & Corporate Design",
    description: "Komplette Markenidentität für einen wachsenden Handwerksbetrieb — von Logo bis Brand Guidelines.",
    metrics: ["Neue Identität", "Print + Digital", "4 Wochen"],
    image: "/images/teaser-logistik.webp",
    leistungSlug: "branding",
    leistungLabel: "Branding",
    branche: "Handwerk",
    whatWeDid: [
      "Logo, Farbsystem, Typografie und Corporate Design von Grund auf entwickelt",
      "Brand Guidelines und Vorlagen für Print und digitale Kanäle erstellt",
    ],
    result: "Einheitlicher professioneller Auftritt auf allen Kanälen — Neukunden berichten gestiegenes Vertrauen.",
  },
];
