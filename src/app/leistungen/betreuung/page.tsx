"use client";



import { motion } from "framer-motion";

import { Server, RefreshCw, HeadphonesIcon, CheckCircle2, Clock, AlertTriangle } from "lucide-react";

import { SubpageHero } from "@/components/subpage/SubpageHero";

import { SubpageFeatures } from "@/components/subpage/SubpageFeatures";

import { SubpageUpsell } from "@/components/subpage/SubpageUpsell";

import { SubpageCta } from "@/components/subpage/SubpageCta";



// â"?â"? Features â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const features = [

  {

    icon: <Server size={20} strokeWidth={1.75} />,

    title: "Premium Hosting & Security",

    description:

      "Vercel Edge Network, tägliche Backups und automatische Sicherheitsupdates. Ihre Website ist rund um die Uhr geschützt.",

  },

  {

    icon: <RefreshCw size={20} strokeWidth={1.75} />,

    title: "Laufende Optimierung",

    description:

      "Monatliche Core-Web-Vitals-Checks, SEO-Monitoring und proaktive Performance-Verbesserungen ohne Zusatzkosten.",

  },

  {

    icon: <HeadphonesIcon size={20} strokeWidth={1.75} />,

    title: "Persönlicher Ansprechpartner",

    description:

      "Kein Ticket-System, kein Callcenter. Sie haben eine direkte Kontaktperson, die Ihr System in- und auswendig kennt.",

  },

];



// â"?â"? SLA / Monitoring Panel Data â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const uptimeBars = [

  true, true, true, true, true, true, true, true, true, true,

  true, true, true, true, true, true, true, true, true, true,

  true, true, true, true, true, true, true, true, true, false,

];



const slaMetrics = [

  { label: "Uptime SLA", value: "99,9 %", sublabel: "Letzter Monat", status: "green" },

  { label: "Ø Ladezeit", value: "0,8 s", sublabel: "Core Web Vitals", status: "green" },

  { label: "Reaktionszeit", value: "< 4 h", sublabel: "Support-Anfragen", status: "green" },

  { label: "Updates", value: "14 / Mo", sublabel: "Security Patches", status: "green" },

];



const monitorChecks = [

  { label: "SSL-Zertifikat", detail: "Gültig bis 12.2026", ok: true },

  { label: "Backup-Status", detail: "Heute 03:00 Uhr", ok: true },

  { label: "Core Web Vitals", detail: "LCP 0,9 s · CLS 0,0", ok: true },

  { label: "Sicherheitsscans", detail: "Keine Befunde", ok: true },

  { label: "Abhängigkeiten", detail: "3 Updates verfügbar", ok: false },

  { label: "DNS-Auflösung", detail: "Alle Nameserver OK", ok: true },

];



// â"?â"? SLA Panel â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const SlaPanel = () => (

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

          Service Level

        </p>

        <h2

          className="font-semibold tracking-[-0.03em] text-slate-900"

          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}

        >

          Technik, die{" "}

          <span className="text-indigo-600">einfach läuft.</span>

        </h2>

      </motion.div>



      <div className="section-y-compact grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0">



        {/* LEFT — Uptime + SLA Metrics */}

        <motion.div

          initial={{ opacity: 0, y: 8 }}

          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true }}

          transition={{ duration: 0.5, delay: 0.05 }}

          className="lg:pr-16"

        >

          {/* Panel */}

          <div

            className="border border-slate-200 bg-white"

            style={{ boxShadow: "4px 4px 0 #e2e8f0" }}

          >

            {/* Panel header */}

            <div className="flex items-center justify-between px-5 py-3 bg-slate-50 border-b border-slate-200">

              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400">

                System-Status · Echtzeit

              </p>

              <span className="flex items-center gap-1.5">

                <span className="pulse-ring">

                  <span className="w-1.5 h-1.5 bg-green-500 block" />

                </span>

                <span className="text-[9px] font-black text-green-600 uppercase tracking-[0.15em]">

                  Alle Systeme OK

                </span>

              </span>

            </div>



            {/* Uptime bar chart */}

            <div className="px-5 py-5 border-b border-slate-100">

              <div className="flex items-center justify-between mb-2">

                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.12em]">

                  Uptime — Letzte 30 Tage

                </p>

                <span className="text-[9px] font-black text-green-600 border border-green-100 bg-green-50 px-1.5 py-0.5">

                  99,9 %

                </span>

              </div>

              <div className="flex items-end gap-0.5 h-8">

                {uptimeBars.map((ok, i) => (

                  <motion.div

                    key={i}

                    className="flex-1"

                    style={{ background: ok ? "#7c3aed" : "#fed7aa" }}

                    initial={{ height: 0 }}

                    whileInView={{ height: "100%" }}

                    viewport={{ once: true }}

                    transition={{ delay: 0.3 + i * 0.02, duration: 0.25, ease: "easeOut" }}

                  />

                ))}

              </div>

              <div className="flex justify-between mt-1">

                <span className="text-[8px] text-slate-300">Vor 30 Tagen</span>

                <span className="text-[8px] text-slate-300">Heute</span>

              </div>

            </div>



            {/* SLA metrics grid */}

            <div className="grid grid-cols-2 divide-x divide-y divide-slate-100">

              {slaMetrics.map((metric, i) => (

                <motion.div

                  key={i}

                  initial={{ opacity: 0 }}

                  whileInView={{ opacity: 1 }}

                  viewport={{ once: true }}

                  transition={{ delay: 0.4 + i * 0.08 }}

                  className="px-5 py-4"

                >

                  <p className="text-[9px] text-slate-400 uppercase tracking-[0.12em] font-bold mb-1">

                    {metric.label}

                  </p>

                  <p className="font-black text-indigo-600 leading-none mb-1"

                    style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.5rem)" }}>

                    {metric.value}

                  </p>

                  <p className="text-[9px] text-slate-400">{metric.sublabel}</p>

                </motion.div>

              ))}

            </div>

          </div>

        </motion.div>



        {/* CENTER divider */}

        <div className="hidden lg:block bg-slate-200 self-stretch" />



        {/* RIGHT — Monitor Checklist */}

        <motion.div

          initial={{ opacity: 0, y: 8 }}

          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true }}

          transition={{ duration: 0.5, delay: 0.15 }}

          className="lg:pl-16 mt-12 lg:mt-0"

        >

          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-5">

            Monatlicher Prüfbericht

          </p>



          <div className="space-y-0 border border-slate-200 divide-y divide-slate-100 bg-white">

            {monitorChecks.map((check, i) => (

              <motion.div

                key={i}

                initial={{ opacity: 0, x: 8 }}

                whileInView={{ opacity: 1, x: 0 }}

                viewport={{ once: true }}

                transition={{ duration: 0.35, delay: 0.2 + i * 0.07 }}

                className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors duration-150"

              >

                <div className="flex items-center gap-3">

                  <div className={`w-6 h-6 flex items-center justify-center shrink-0 ${

                    check.ok

                      ? "bg-green-50 border border-green-100"

                      : "bg-orange-50 border border-orange-100"

                  }`}>

                    {check.ok

                      ? <CheckCircle2 size={13} className="text-green-600" strokeWidth={2} />

                      : <AlertTriangle size={13} className="text-orange-500" strokeWidth={2} />

                    }

                  </div>

                  <span className="text-sm font-semibold text-slate-900">{check.label}</span>

                </div>

                <span className="text-[11px] text-slate-400 shrink-0 ml-3">{check.detail}</span>

              </motion.div>

            ))}

          </div>



          {/* Last report timestamp */}

          <div className="mt-4 flex items-center gap-2 text-[10px] text-slate-400">

            <Clock size={11} />

            <span>Bericht generiert: Heute, 08:00 Uhr</span>

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

    title: "KI-Systeme & Automation",

    description:

      "Wenn die Technik stabil läuft, ist der nächste Schritt Automatisierung. Wir bauen die Workflows direkt in Ihre Infrastruktur.",

    href: "/leistungen/ki-automation",

  },

  {

    index: "02",

    title: "Website & Digitaler Auftritt",

    description:

      "Aus der Betreuung heraus optimieren wir Ihre Website kontinuierlich. Performance und Conversion immer im Blick.",

    href: "/leistungen/websites",

  },

  {

    index: "03",

    title: "Social Media & Video",

    description:

      "Stabile Technik im Hintergrund, starker Content im Vordergrund. Wir kümmern uns um beides.",

    href: "/leistungen/social-media-video",

  },

];



// â"?â"? Page â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



export default function BetreuungPage() {

  return (

    <div className="bg-white min-h-screen">



      <SubpageHero

        eyebrow="Laufende Betreuung"

        headline="Rundum-Sorglos,"

        highlightedWord=" ohne Kompromisse."

        subCopy="Hosting, Wartung, Sicherheit und Optimierung in einem Paket. Sie kümmern sich um Ihr Geschäft, wir um alles andere."

        ctaLabel="Betreuung anfragen"

        ctaHref="/projekt-anfragen"

      />



      <SubpageFeatures

        eyebrow="Was enthalten ist"

        headline="Alles inklusive,"

        highlightedWord=" nichts vergessen."

        features={features}

      />



      <SlaPanel />



      <SubpageUpsell

        headline="Stabile Basis. Nächster Schritt."

        subCopy="Wer seine Infrastruktur im Griff hat, kann skalieren."

        items={upsellItems}

      />



      <SubpageCta

        headline="Bereit für "

        highlightedWord="sorgenfreie Technik?"

        subCopy="Hosting, Wartung und Optimierung aus einer Hand. Festpreis, persönlicher Ansprechpartner, keine Überraschungen."

        primaryLabel="Jetzt Betreuung anfragen"

        primaryHref="/projekt-anfragen"

        secondaryLabel="Alle Leistungen ansehen"

        secondaryHref="/leistungen"

      />



    </div>

  );

}




