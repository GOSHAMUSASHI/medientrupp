"use client";



import { motion } from "framer-motion";

import {

  Clock, ShieldCheck, Zap,

  Inbox, Workflow, Cpu, Database, MessageSquare, Star,

} from "lucide-react";

import { SubpageHero } from "@/components/subpage/SubpageHero";

import { SubpageFeatures } from "@/components/subpage/SubpageFeatures";

import { SubpageUpsell } from "@/components/subpage/SubpageUpsell";

import { SubpageCta } from "@/components/subpage/SubpageCta";
import { AiCloserSimulation } from "@/components/sections/AiCloserSimulation";



// â"?â"? Features â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const features = [

  {

    icon: <Clock size={20} strokeWidth={1.75} />,

    title: "38 Stunden Zeitersparnis",

    description:

      "Anfragenqualifizierung, Follow-ups und Terminbuchung laufen vollautomatisch. Ihre Mitarbeiter fokussieren sich auf das Wesentliche.",

  },

  {

    icon: <ShieldCheck size={20} strokeWidth={1.75} />,

    title: "Null manuelle Fehler",

    description:

      "Automatisierte Workflows greifen nicht auf Tagesverfassung zurück. Jeder Prozess läuft identisch, jeden Tag, ohne Ausnahme.",

  },

  {

    icon: <Zap size={20} strokeWidth={1.75} />,

    title: "24/7 Verfügbarkeit",

    description:

      "Ihr KI-System arbeitet rund um die Uhr. Anfragen werden auch nachts und am Wochenende sofort qualifiziert und beantwortet.",

  },

];



// â"?â"? Flow Diagram Data â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const mainNodes = [

  {

    label: "Anfrage",

    sublabel: "Formular · E-Mail · Chat",

    Icon: Inbox,

  },

  {

    label: "API-Gateway",

    sublabel: "Webhook · Zapier · n8n",

    Icon: Workflow,

  },

  {

    label: "KI-Analyse",

    sublabel: "Scoring · Klassifizierung",

    Icon: Cpu,

  },

];



const outputNodes = [

  { label: "CRM-Eintrag", Icon: Database },

  { label: "KI-Antwort", Icon: MessageSquare },

  { label: "Bewertungs-Anfrage", Icon: Star },

];



// â"?â"? Connector — animierter reisender Punkt â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const AnimatedConnector = ({ delay }: { delay: number }) => (

  <div className="relative flex items-center shrink-0">

    {/* Line */}

    <div className="w-10 md:w-14 h-px bg-slate-200" />

    {/* Arrow tip */}

    <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] border-t-transparent border-b-transparent border-l-slate-300 shrink-0" />

    {/* Traveling dot */}

    <motion.div

      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-600"

      style={{ left: 0 }}

      animate={{ left: ["0%", "78%"] }}

      transition={{

        duration: 0.9,

        repeat: Infinity,

        repeatDelay: 0.4,

        ease: "easeInOut",

        delay,

      }}

    />

  </div>

);



// â"?â"? Vertical connector (mobile / output branch) â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const VerticalConnector = ({ delay }: { delay: number }) => (

  <div className="relative flex flex-col items-center shrink-0 my-1">

    <div className="w-px h-6 bg-slate-200" />

    <div className="w-0 h-0 border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-slate-300" />

    <motion.div

      className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-2 bg-indigo-600"

      animate={{ top: ["0%", "70%"] }}

      transition={{

        duration: 0.9,

        repeat: Infinity,

        repeatDelay: 0.4,

        ease: "easeInOut",

        delay,

      }}

    />

  </div>

);



// â"?â"? Node Box â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



interface NodeBoxProps {

  label: string;

  sublabel: string;

  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;

  delay: number;

  highlighted?: boolean;

}



const NodeBox = ({ label, sublabel, Icon, delay, highlighted = false }: NodeBoxProps) => (

  <motion.div

    initial={{ opacity: 0, y: 8 }}

    whileInView={{ opacity: 1, y: 0 }}

    viewport={{ once: true }}

    transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}

    className={`flex flex-col items-center gap-2 p-4 border w-[110px] md:w-[120px] shrink-0 ${

      highlighted

        ? "border-indigo-200 bg-indigo-50"

        : "border-slate-200 bg-white"

    }`}

  >

    <div

      className={`w-8 h-8 flex items-center justify-center ${

        highlighted ? "text-indigo-600" : "text-indigo-600"

      }`}

    >

      <Icon size={18} strokeWidth={1.75} />

    </div>

    <div className="text-center">

      <p className="text-[11px] font-black text-slate-900 leading-tight">{label}</p>

      <p className="text-[9px] text-slate-400 leading-tight mt-0.5">{sublabel}</p>

    </div>

  </motion.div>

);



// â"?â"? Output Node â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



interface OutputNodeProps {

  label: string;

  Icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;

  delay: number;

}



const OutputNode = ({ label, Icon, delay }: OutputNodeProps) => (

  <motion.div

    initial={{ opacity: 0, x: 8 }}

    whileInView={{ opacity: 1, x: 0 }}

    viewport={{ once: true }}

    transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}

    className="flex items-center gap-2 px-3 py-2 border border-slate-200 bg-white w-[148px] shrink-0"

  >

    <div className="w-6 h-6 bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">

      <Icon size={13} strokeWidth={1.75} />

    </div>

    <span className="text-[11px] font-semibold text-slate-700 leading-tight">{label}</span>

  </motion.div>

);



// â"?â"? Live Flow Diagram â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const LiveFlowDiagram = () => (

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

          So funktioniert es

        </p>

        <h2

          className="font-semibold tracking-[-0.03em] text-slate-900"

          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}

        >

          Ihr automatisierter{" "}

          <span className="text-indigo-600">Workflow.</span>

        </h2>

      </motion.div>



      {/* Diagram panel */}

      <div className="section-y-compact">

        <motion.div

          initial={{ opacity: 0 }}

          whileInView={{ opacity: 1 }}

          viewport={{ once: true }}

          transition={{ duration: 0.5, delay: 0.1 }}

          className="border border-slate-200 bg-white"

          style={{ boxShadow: "4px 4px 0 #e2e8f0" }}

        >



          {/* Panel header */}

          <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200">

            <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">

              Automatisierter Prozess · Live

            </p>

            <span className="flex items-center gap-1.5">

              <span className="pulse-ring">

                <span className="w-1.5 h-1.5 bg-green-500 block" />

              </span>

              <span className="text-[9px] font-black text-green-600 uppercase tracking-[0.15em]">Aktiv</span>

            </span>

          </div>



          {/* Flow — Desktop: horizontal, Mobile: vertical */}

          <div className="p-8 md:p-10">



            {/* â"?â"? Desktop Layout â"?â"? */}

            <div className="hidden md:flex items-center">



              {/* Main nodes + connectors */}

              {mainNodes.map((node, i) => (

                <div key={node.label} className="flex items-center">

                  <NodeBox

                    label={node.label}

                    sublabel={node.sublabel}

                    Icon={node.Icon}

                    delay={i * 0.12}

                    highlighted={i === 2}

                  />

                  {i < mainNodes.length - 1 && (

                    <AnimatedConnector delay={i * 0.3} />

                  )}

                </div>

              ))}



              {/* Branch connector to outputs */}

              <AnimatedConnector delay={0.6} />



              {/* Output nodes — stacked vertically */}

              <div className="flex flex-col gap-2">

                {outputNodes.map((out, i) => (

                  <OutputNode

                    key={out.label}

                    label={out.label}

                    Icon={out.Icon}

                    delay={0.7 + i * 0.1}

                  />

                ))}

              </div>

            </div>



            {/* â"?â"? Mobile Layout â"?â"? */}

            <div className="flex flex-col items-center md:hidden">

              {mainNodes.map((node, i) => (

                <div key={node.label} className="flex flex-col items-center">

                  <NodeBox

                    label={node.label}

                    sublabel={node.sublabel}

                    Icon={node.Icon}

                    delay={i * 0.12}

                    highlighted={i === 2}

                  />

                  {i < mainNodes.length - 1 && (

                    <VerticalConnector delay={i * 0.3} />

                  )}

                </div>

              ))}



              <VerticalConnector delay={0.6} />



              <div className="flex flex-col gap-2 w-full max-w-[200px]">

                {outputNodes.map((out, i) => (

                  <OutputNode

                    key={out.label}

                    label={out.label}

                    Icon={out.Icon}

                    delay={0.7 + i * 0.1}

                  />

                ))}

              </div>

            </div>



          </div>



          {/* Metrics strip */}

          <div className="grid grid-cols-3 border-t border-slate-200 divide-x divide-slate-200">

            {[

              { value: "< 3 Sek.", label: "Reaktionszeit" },

              { value: "100 %", label: "Fehlerquote" },

              { value: "24/7", label: "Verfügbarkeit" },

            ].map((metric, i) => (

              <div key={i} className="px-5 py-4 text-center">

                <p className="text-lg font-black text-indigo-600 leading-none mb-1">

                  {metric.value}

                </p>

                <p className="text-[9px] font-semibold tracking-[0.12em] uppercase text-slate-400">

                  {metric.label}

                </p>

              </div>

            ))}

          </div>



        </motion.div>

      </div>



    </div>

  </section>

);



// â"?â"? Upsell â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const upsellItems = [

  {

    index: "01",

    title: "Individuelle KI-Plattformen",

    description:

      "Interne Automationen sind der erste Schritt. Bauen Sie Ihr eigenes KI-Produkt und monetarisieren Sie es direkt.",

    href: "/leistungen/ki-plattformen",

  },

  {

    index: "02",

    title: "Website & Digitaler Auftritt",

    description:

      "Ihr automatisierter Backend braucht ein starkes Frontend. Wir bauen beides aus einer Hand.",

    href: "/leistungen/websites",

  },

  {

    index: "03",

    title: "Laufende Betreuung",

    description:

      "Hosting, Monitoring und laufende Optimierung Ihrer Automatisierungen inklusive monatlichem Report.",

    href: "/leistungen/betreuung",

  },

];



// â"?â"? Page â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



export default function KiAutomationPage() {

  return (

    <div className="bg-white min-h-screen">



      <SubpageHero

        eyebrow="KI-Systeme & Automation"

        headline="Mehr Zeit. Weniger "

        highlightedWord="Fehler."

        subCopy="Automatisierte Workflows übernehmen Routineaufgaben. Ihr Team fokussiert sich aufs Wachstum."

        ctaLabel="Automation anfragen"

        ctaHref="/projekt-anfragen"

      />



      <SubpageFeatures

        eyebrow="Was Sie gewinnen"

        headline="Systeme, die "

        highlightedWord="für Sie arbeiten."

        features={features}

      />



      <LiveFlowDiagram />

      {/* KI-Agent Live Demo */}
      <section className="bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="mb-10">
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
              Live Demo
            </p>
            <h2
              className="font-semibold tracking-[-0.03em] text-slate-900"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
            >
              Ihr KI-Agent{" "}
              <span className="text-indigo-600">in Aktion.</span>
            </h2>
            <p className="mt-4 text-base text-slate-500 max-w-xl leading-relaxed">
              Klicken Sie auf &quot;Demo starten&quot; und sehen Sie, wie Ihr KI-System einen Interessenten automatisch qualifiziert und betreut.
            </p>
          </div>
          <AiCloserSimulation />
        </div>
      </section>

      <SubpageUpsell

        headline="Der nächste logische Schritt."

        subCopy="Wer interne Prozesse automatisiert hat, baut als Nächstes eigene KI-Produkte."

        items={upsellItems}

      />



      <SubpageCta

        headline="Bereit für Ihr "

        highlightedWord="erstes Automatisierungsprojekt?"

        subCopy="Im kostenlosen Erstgespräch analysieren wir, welche drei Prozesse in Ihrem Unternehmen den größten Zeitgewinn bringen."

        primaryLabel="Jetzt Projekt anfragen"

        primaryHref="/projekt-anfragen"

        secondaryLabel="Alle Leistungen ansehen"

        secondaryHref="/leistungen"

      />



    </div>

  );

}




