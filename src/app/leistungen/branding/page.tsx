"use client";



import { motion } from "framer-motion";

import { Paintbrush, BookOpen, Eye } from "lucide-react";

import { SubpageHero } from "@/components/subpage/SubpageHero";

import { SubpageFeatures } from "@/components/subpage/SubpageFeatures";

import { SubpageUpsell } from "@/components/subpage/SubpageUpsell";

import { SubpageCta } from "@/components/subpage/SubpageCta";



// â"?â"? Features â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const features = [

  {

    icon: <Paintbrush size={20} strokeWidth={1.75} />,

    title: "Logo & Visual Identity",

    description:

      "Wortmarke, Bildmarke und Kombination. Ausgeliefert in allen relevanten Formaten für Print und Digital.",

  },

  {

    icon: <BookOpen size={20} strokeWidth={1.75} />,

    title: "Brand Guidelines",

    description:

      "Ein verbindliches Regelwerk für Farben, Schriften und Anwendungen. Konsistenz auf allen Kanälen, ohne Nachfragen.",

  },

  {

    icon: <Eye size={20} strokeWidth={1.75} />,

    title: "Corporate Design",

    description:

      "Visitenkarten, Briefpapier, Präsentationsvorlagen und digitale Assets. Alles aus einem Guss.",

  },

];



// â"?â"? Brand Showcase Data â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const colorSwatches = [

  { name: "Brand Primary", hex: "#7c3aed", label: "Indigo 600", textLight: true },

  { name: "Brand Dark", hex: "#0F172B", label: "Slate 900", textLight: true },

  { name: "Brand Surface", hex: "#F8FAFC", label: "Slate 50", textLight: false },

  { name: "Brand Accent", hex: "#4f46e5", label: "Indigo 700", textLight: true },

  { name: "Neutral", hex: "#64748B", label: "Slate 500", textLight: true },

  { name: "Border", hex: "#E2E8F0", label: "Slate 200", textLight: false },

];



const typeSpecimens = [

  { weight: "900", label: "Black", sample: "Aa", weightClass: "font-black" },

  { weight: "700", label: "Bold", sample: "Aa", weightClass: "font-bold" },

  { weight: "600", label: "Semibold", sample: "Aa", weightClass: "font-semibold" },

  { weight: "400", label: "Regular", sample: "Aa", weightClass: "font-normal" },

];



// â"?â"? Brand Showcase Section â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const BrandShowcase = () => (

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

          Design System

        </p>

        <h2

          className="font-semibold tracking-[-0.03em] text-slate-900"

          style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}

        >

          Farbe, Schrift,{" "}

          <span className="text-indigo-600">Charakter.</span>

        </h2>

      </motion.div>



      <div className="section-y-compact grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0">



        {/* LEFT — Color Swatches */}

        <motion.div

          initial={{ opacity: 0, y: 8 }}

          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true }}

          transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}

          className="lg:pr-16"

        >

          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-6">

            Farbsystem

          </p>



          {/* Large primary swatch */}

          <motion.div

            initial={{ opacity: 0, y: 6 }}

            whileInView={{ opacity: 1, y: 0 }}

            viewport={{ once: true }}

            transition={{ duration: 0.4, delay: 0.1 }}

            className="h-20 w-full mb-1 border border-slate-200"

            style={{ background: "#7c3aed" }}

          />



          {/* Secondary swatches row */}

          <div className="grid grid-cols-5 gap-1 mb-6">

            {["#6d28d9", "#5b21b6", "#4c1d95", "#ede9fe", "#f5f3ff"].map((color, i) => (

              <motion.div

                key={color}

                initial={{ opacity: 0 }}

                whileInView={{ opacity: 1 }}

                viewport={{ once: true }}

                transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}

                className="h-10 border border-slate-200"

                style={{ background: color }}

              />

            ))}

          </div>



          {/* Swatch grid */}

          <div className="grid grid-cols-2 gap-3">

            {colorSwatches.map((swatch, i) => (

              <motion.div

                key={swatch.hex}

                initial={{ opacity: 0, y: 4 }}

                whileInView={{ opacity: 1, y: 0 }}

                viewport={{ once: true }}

                transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}

                className="flex items-center gap-3 border border-slate-200 bg-white p-3"

              >

                <div

                  className="w-8 h-8 shrink-0 border border-slate-200"

                  style={{ background: swatch.hex }}

                />

                <div>

                  <p className="text-[10px] font-bold text-slate-700 leading-none mb-0.5">

                    {swatch.name}

                  </p>

                  <p className="text-[9px] font-mono text-slate-400 leading-none">

                    {swatch.hex}

                  </p>

                </div>

              </motion.div>

            ))}

          </div>

        </motion.div>



        {/* CENTER divider */}

        <div className="hidden lg:block bg-slate-200 self-stretch mx-0" />



        {/* RIGHT — Typography Specimen */}

        <motion.div

          initial={{ opacity: 0, y: 8 }}

          whileInView={{ opacity: 1, y: 0 }}

          viewport={{ once: true }}

          transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}

          className="lg:pl-16 mt-12 lg:mt-0"

        >

          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-6">

            Typografie

          </p>



          {/* Font family header */}

          <div className="border border-slate-200 bg-white p-5 mb-6">

            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">

              Primäre Schriftfamilie

            </p>

            <p className="font-black text-3xl text-slate-900 tracking-tight leading-none">

              Inter

            </p>

            <p className="text-xs text-slate-400 mt-1">Variable · Google Fonts · Free</p>

          </div>



          {/* Weight specimens */}

          <div className="space-y-0 border border-slate-200 divide-y divide-slate-100 bg-white">

            {typeSpecimens.map((spec, i) => (

              <motion.div

                key={spec.weight}

                initial={{ opacity: 0, x: 8 }}

                whileInView={{ opacity: 1, x: 0 }}

                viewport={{ once: true }}

                transition={{ duration: 0.35, delay: 0.2 + i * 0.08 }}

                className="flex items-center justify-between px-5 py-4"

              >

                <div>

                  <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-slate-400 mb-1">

                    {spec.weight} · {spec.label}

                  </p>

                  <p

                    className={`text-slate-900 text-xl leading-none ${spec.weightClass}`}

                    style={{ letterSpacing: "-0.02em" }}

                  >

                    {spec.sample} — Mittelstand

                  </p>

                </div>

              </motion.div>

            ))}

          </div>



          {/* Headline specimen */}

          <div className="mt-6 border border-slate-200 bg-white p-5">

            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-3">

              Headline-Beispiel

            </p>

            <p

              className="font-black text-slate-900 leading-none"

              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", letterSpacing: "-0.03em" }}

            >

              Stark.<br />

              <span className="text-indigo-600">Unverwechselbar.</span>

            </p>

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

    title: "Website & Digitaler Auftritt",

    description:

      "Die neue Identität braucht einen starken digitalen Auftritt. Website und Branding aus einer Hand.",

    href: "/leistungen/websites",

  },

  {

    index: "02",

    title: "Social Media & Video",

    description:

      "Konsistente Bildsprache auf allen Kanälen. Wir produzieren Content, der Ihre Marke zum Leben erweckt.",

    href: "/leistungen/social-media-video",

  },

  {

    index: "03",

    title: "Laufende Betreuung",

    description:

      "Ihre Brand Assets werden gepflegt, aktualisiert und weiterentwickelt. Immer markenkonform, immer aktuell.",

    href: "/leistungen/betreuung",

  },

];



// â"?â"? Page â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



export default function BrandingPage() {

  return (

    <div className="bg-white min-h-screen">



      <SubpageHero

        eyebrow="Marke & Design"

        headline="Ihr erster "

        highlightedWord="Eindruck zählt."

        subCopy="Logo, Corporate Design und Brand Guidelines für den deutschen Mittelstand. Ein Auftritt, der Autorität ausstrahlt."

        ctaLabel="Branding anfragen"

        ctaHref="/projekt-anfragen"

      />



      <SubpageFeatures

        eyebrow="Was entsteht"

        headline="Mehr als ein Logo."

        highlightedWord=" Eine Identität."

        features={features}

      />



      <BrandShowcase />



      <SubpageUpsell

        headline="Die Marke steht. Was kommt danach?"

        subCopy="Diese Leistungen bringen Ihre neue Identität in die Welt."

        items={upsellItems}

      />



      <SubpageCta

        headline="Bereit für eine Marke, die "

        highlightedWord="haften bleibt?"

        subCopy="Wir entwickeln Ihre visuelle Identität von Grund auf. Festpreis, klares Briefing, keine Überraschungen."

        primaryLabel="Jetzt Projekt anfragen"

        primaryHref="/projekt-anfragen"

        secondaryLabel="Alle Leistungen ansehen"

        secondaryHref="/leistungen"

      />



    </div>

  );

}




