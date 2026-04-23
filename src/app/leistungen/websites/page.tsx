"use client";



import { motion } from "framer-motion";

import { Gauge, TrendingUp, SearchCheck, X, Check } from "lucide-react";

import { SubpageHero } from "@/components/subpage/SubpageHero";

import { SubpageFeatures } from "@/components/subpage/SubpageFeatures";

import { SubpageUpsell } from "@/components/subpage/SubpageUpsell";

import { SubpageCta } from "@/components/subpage/SubpageCta";



// â"?â"? Data â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const features = [

  {

    icon: <Gauge size={20} strokeWidth={1.75} />,

    title: "Core Web Vitals 95+",

    description:

      "Ladezeit unter einer Sekunde. Schnelle Seiten ranken besser und gewinnen mehr Anfragen.",

  },

  {

    icon: <TrendingUp size={20} strokeWidth={1.75} />,

    title: "Conversion-optimiert",

    description:

      "Klare Seitenstruktur, präzise Call-to-Actions und Texte, die zum Handeln führen. Nachweislich mehr Leads.",

  },

  {

    icon: <SearchCheck size={20} strokeWidth={1.75} />,

    title: "Technical SEO ab Tag 1",

    description:

      "Semantisches HTML, strukturierte Daten und saubere Meta-Tags. Google-ready von Anfang an.",

  },

];



const comparisonRows = [

  {

    category: "Performance",

    negative:

      "Langsame Standard-Websites mit 3 bis 8 Sekunden Ladezeit. Google straft ab.",

    positive:

      "Next.js-Stack mit Core Web Vitals 95+. Ladezeit unter einer Sekunde, messbar.",

  },

  {

    category: "Kosten",

    negative:

      "Stundensätze und Nachkalkulation. Klassische Agenturen ab 5.000 €.",

    positive:

      "Festpreis ab 1.000 €. Alle Leistungen inklusive, keine Überraschungen.",

  },

  {

    category: "Zeit",

    negative:

      "Klassische Agenturen brauchen 3 bis 6 Monate bis zum Go-Live.",

    positive:

      "Go-Live in 3 bis 6 Wochen. Termin fix bei Auftragserteilung.",

  },

  {

    category: "Technologie",

    negative:

      "Veraltete CMS mit Plugin-Chaos und regelmäßigen Sicherheitslücken.",

    positive:

      "Moderner Stack: Next.js, Tailwind, Vercel Edge Network.",

  },

];



const upsellItems = [

  {

    index: "01",

    title: "KI-Systeme & Automation",

    description:

      "Automatische Anfragen, 24/7-Chatbot und Bewertungsmanagement. Direkt integriert.",

    href: "/leistungen/ki-automation",

  },

  {

    index: "02",

    title: "Laufende Betreuung",

    description:

      "Hosting, Wartung und Performance-Reports. Ihre Website läuft dauerhaft sauber.",

    href: "/leistungen/betreuung",

  },

  {

    index: "03",

    title: "Marke & Design",

    description:

      "Logo, Corporate Design und Brand Guidelines. Professioneller Auftritt von Anfang an.",

    href: "/leistungen/branding",

  },

];



// â"?â"? Page â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



export default function WebsitesPage() {

  return (

    <div className="bg-white min-h-screen">



      <SubpageHero

        eyebrow="Website & Digitaler Auftritt"

        headline="Ihr 24/7 Schaufenster."

        highlightedWord="24/7 Schaufenster."

        subCopy="Schnelle, conversion-optimierte Websites zum Festpreis. Go-Live in unter 6 Wochen."

        ctaLabel="Website anfragen"

        ctaHref="/projekt-anfragen"

      />



      <SubpageFeatures

        eyebrow="Was inklusive ist"

        headline="Gebaut für Performance & "

        highlightedWord="Konversion."

        features={features}

      />



      {/* â"?â"? C-Level Vergleichsblock â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"? */}

      <section className="bg-slate-50 border-t border-slate-200" aria-label="Vergleich">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">



          {/* Header */}

          <motion.div

            initial={{ opacity: 0, y: 8 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}

            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}

            className="section-y-compact border-b border-slate-200"

          >

            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">

              Warum Medientrupp

            </p>

            <h2

              className="font-semibold tracking-[-0.03em] text-slate-900"

              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}

            >

              Der direkte{" "}

              <span className="text-indigo-600">Vergleich.</span>

            </h2>

          </motion.div>



          {/* Column labels */}

          <div className="grid grid-cols-[100px_1fr_1fr] md:grid-cols-[180px_1fr_1fr]">

            <div className="py-4 border-b border-slate-200" />

            <div className="py-4 px-5 md:px-8 border-b border-l border-slate-200">

              <span className="text-[10px] font-black tracking-[0.18em] uppercase text-orange-500">

                Klassische Agentur

              </span>

            </div>

            <div className="py-4 px-5 md:px-8 border-b border-l border-slate-200">

              <span className="text-[10px] font-black tracking-[0.18em] uppercase text-indigo-600">

                Medientrupp

              </span>

            </div>

          </div>



          {/* Rows */}

          {comparisonRows.map((row, i) => (

            <motion.div

              key={i}

              initial={{ opacity: 0, x: -6 }}

              whileInView={{ opacity: 1, x: 0 }}

              viewport={{ once: true }}

              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}

              className={`grid grid-cols-[100px_1fr_1fr] md:grid-cols-[180px_1fr_1fr] hover:bg-white transition-colors duration-200 ${

                i < comparisonRows.length - 1 ? "border-b border-slate-200" : "border-b border-slate-200"

              }`}

            >

              {/* Category */}

              <div className="flex items-center py-6 pr-3">

                <span className="text-[10px] font-black tracking-[0.15em] uppercase text-slate-400">

                  {row.category}

                </span>

              </div>



              {/* Negative — Klassische Agentur */}

              <div className="flex items-start gap-3 py-6 px-5 md:px-8 border-l border-slate-200">

                <span className="mt-0.5 w-5 h-5 bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0">

                  <X size={10} className="text-orange-500" strokeWidth={3} />

                </span>

                <p className="text-sm text-slate-500 leading-relaxed">{row.negative}</p>

              </div>



              {/* Positive — MedienTrupp */}

              <div className="flex items-start gap-3 py-6 px-5 md:px-8 border-l border-slate-200 bg-indigo-50/40">

                <span className="mt-0.5 w-5 h-5 bg-indigo-50 border border-indigo-200 flex items-center justify-center shrink-0">

                  <Check size={10} className="text-indigo-600" strokeWidth={3} />

                </span>

                <p className="text-sm text-slate-800 font-medium leading-relaxed">{row.positive}</p>

              </div>

            </motion.div>

          ))}



        </div>

      </section>



      <SubpageUpsell

        headline="Nächste Schritte nach dem Launch."

        subCopy="Eine starke Website ist der Anfang. Diese Leistungen ergänzen sie perfekt."

        items={upsellItems}

      />



      <SubpageCta

        headline="Bereit für Ihre "

        highlightedWord="neue Website?"

        subCopy="Festpreis ab 1.000 €. Go-Live in unter 6 Wochen."

        primaryLabel="Jetzt Projekt anfragen"

        primaryHref="/projekt-anfragen"

        secondaryLabel="Alle Leistungen ansehen"

        secondaryHref="/leistungen"

      />



    </div>

  );

}







