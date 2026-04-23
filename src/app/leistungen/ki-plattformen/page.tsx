"use client";



import { motion } from "framer-motion";

import { Cpu, Lock, Layers, Code2, Database, Zap } from "lucide-react";

import { SubpageHero } from "@/components/subpage/SubpageHero";

import { SubpageFeatures } from "@/components/subpage/SubpageFeatures";

import { SubpageUpsell } from "@/components/subpage/SubpageUpsell";

import { SubpageCta } from "@/components/subpage/SubpageCta";



// â"?â"? Features â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const features = [

  {

    icon: <Cpu size={20} strokeWidth={1.75} />,

    title: "Individuelle KI-Modelle",

    description:

      "Kein generisches ChatGPT-Wrapper. Wir trainieren und integrieren Modelle, die auf Ihre Daten, Ihre Branche und Ihre Ziele zugeschnitten sind.",

  },

  {

    icon: <Lock size={20} strokeWidth={1.75} />,

    title: "DSGVO & Datensouveränität",

    description:

      "Alle Daten bleiben in Ihrer kontrollierten Infrastruktur. Kein Training auf fremden Servern, kein Datenverlust.",

  },

  {

    icon: <Layers size={20} strokeWidth={1.75} />,

    title: "White-Label & Skalierbar",

    description:

      "Ihre Plattform, Ihr Branding. Architektiert für Wachstum. Von 10 auf 10.000 Nutzer ohne Rewrite.",

  },

];



// â"?â"? Architecture Block Data â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const layers = [

  {

    index: "01",

    label: "Datenebene",

    description: "Eigene Datenbank, Vektorspeicher und sichere API-Anbindung an Ihre Bestandssysteme.",

    icon: Database,

    tags: ["PostgreSQL", "Pinecone", "REST / GraphQL"],

  },

  {

    index: "02",

    label: "KI-Logik",

    description: "Fine-tuned LLM oder RAG-Pipeline auf Basis Ihrer Dokumente, Produkte oder Kundenhistorie.",

    icon: Cpu,

    tags: ["OpenAI GPT-4o", "LangChain", "RAG-Pipeline"],

  },

  {

    index: "03",

    label: "Integrations-Layer",

    description: "Webhooks, Zapier, n8n oder direkter API-Anschluss an CRM, ERP und bestehende Tools.",

    icon: Zap,

    tags: ["Zapier", "n8n", "Custom API"],

  },

  {

    index: "04",

    label: "Frontend / Interface",

    description: "Web-App, Admin-Dashboard oder eingebettetes Widget, entwickelt mit Next.js und Ihrem Branding.",

    icon: Code2,

    tags: ["Next.js 14", "Tailwind CSS", "Vercel"],

  },

];



// â"?â"? Architecture Block â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const ArchitectureBlock = () => (

  <section className="bg-slate-50 border-t border-slate-200">

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

          Technische Architektur

        </p>

        <h2

          className="font-semibold tracking-[-0.03em] text-slate-900"

          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}

        >

          Vier Ebenen,{" "}

          <span className="text-indigo-600">ein System.</span>

        </h2>

      </motion.div>



      {/* Layer rows */}

      <div className="border-b border-slate-200">

        {layers.map((layer, i) => (

          <motion.div

            key={layer.index}

            initial={{ opacity: 0, y: 8 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}

            transition={{ duration: 0.45, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}

            className="grid grid-cols-1 lg:grid-cols-[64px_1fr_1px_1fr] items-stretch border-t border-slate-200 hover:bg-white transition-colors duration-200"

          >

            {/* Index */}

            <div className="hidden lg:flex items-center py-8">

              <span className="text-[11px] font-semibold tracking-[0.2em] text-slate-300">

                {layer.index}

              </span>

            </div>



            {/* Label + Description */}

            <div className="py-7 lg:pr-12 flex flex-col justify-center gap-2">

              <div className="flex items-center gap-3">

                <div className="w-8 h-8 border border-indigo-100 bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">

                  <layer.icon size={16} strokeWidth={1.75} />

                </div>

                <h3 className="font-black text-lg text-slate-900 tracking-tight">

                  {layer.label}

                </h3>

              </div>

              <p className="text-sm text-slate-500 leading-relaxed max-w-md">

                {layer.description}

              </p>

            </div>



            {/* Divider */}

            <div className="hidden lg:block bg-slate-100 self-stretch" />



            {/* Tags */}

            <div className="py-7 lg:pl-12 flex items-center">

              <div className="flex flex-wrap gap-2">

                {layer.tags.map((tag) => (

                  <span

                    key={tag}

                    className="text-[11px] font-semibold tracking-[0.08em] text-indigo-600 border border-indigo-100 bg-indigo-50 px-3 py-1"

                  >

                    {tag}

                  </span>

                ))}

              </div>

            </div>

          </motion.div>

        ))}

      </div>



    </div>

  </section>

);



// â"?â"? Upsell â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const upsellItems = [

  {

    index: "01",

    title: "KI-Systeme & Automation",

    description:

      "Bevor eine eigene Plattform entsteht, optimieren viele Kunden zuerst ihre internen Prozesse. Der natürliche erste Schritt.",

    href: "/leistungen/ki-automation",

  },

  {

    index: "02",

    title: "Website & Digitaler Auftritt",

    description:

      "Ihre KI-Plattform braucht eine starke Außendarstellung. Wir bauen beides aus einer Hand.",

    href: "/leistungen/websites",

  },

  {

    index: "03",

    title: "Laufende Betreuung",

    description:

      "KI-Systeme entwickeln sich weiter. Wir pflegen, monitoren und optimieren Ihre Plattform dauerhaft.",

    href: "/leistungen/betreuung",

  },

];



// â"?â"? Page â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



export default function KiPlattformenPage() {

  return (

    <div className="bg-white min-h-screen">



      <SubpageHero

        eyebrow="Individuelle KI-Plattformen"

        headline="Ihr eigenes "

        highlightedWord="KI-System."

        subCopy="Custom KI-Plattformen für Unternehmen mit besonderen Anforderungen. Unabhängig von Standard-Tools, gebaut auf Ihre Daten."

        ctaLabel="KI-Plattform anfragen"

        ctaHref="/projekt-anfragen"

      />



      <SubpageFeatures

        eyebrow="Was Sie bekommen"

        headline="Kein Wrapper."

        highlightedWord=" Echte Infrastruktur."

        features={features}

      />



      <ArchitectureBlock />



      <SubpageUpsell

        headline="Der richtige Einstieg für Sie."

        subCopy="Je nach Ausgangslage empfehlen wir einen dieser Schritte als Einstieg in die KI."

        items={upsellItems}

      />



      <SubpageCta

        headline="Bereit für Ihre "

        highlightedWord="eigene KI-Plattform?"

        subCopy="Wir analysieren Ihre Anforderungen und skizzieren in einem kostenlosen Erstgespräch die passende Architektur."

        primaryLabel="Erstgespräch anfragen"

        primaryHref="/projekt-anfragen"

        secondaryLabel="Alle Leistungen ansehen"

        secondaryHref="/leistungen"

      />



    </div>

  );

}




