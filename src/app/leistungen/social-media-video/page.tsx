"use client";



import { motion } from "framer-motion";

import { Play, Film, BarChart2, Share2 } from "lucide-react";

import { SubpageHero } from "@/components/subpage/SubpageHero";

import { SubpageFeatures } from "@/components/subpage/SubpageFeatures";

import { SubpageUpsell } from "@/components/subpage/SubpageUpsell";

import { SubpageCta } from "@/components/subpage/SubpageCta";



// â"?â"? Features â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const features = [

  {

    icon: <Film size={20} strokeWidth={1.75} />,

    title: "Imagefilm & Produktion",

    description:

      "Professionelle Imagefilme, Produktvideos und Corporate-Clips. Konzept, Dreh und Schnitt aus einer Hand.",

  },

  {

    icon: <Share2 size={20} strokeWidth={1.75} />,

    title: "Short-Form Content",

    description:

      "Reels, TikToks und YouTube Shorts, die Algorithmen lieben. Wöchentlich produziert, strategisch ausgespielt.",

  },

  {

    icon: <BarChart2 size={20} strokeWidth={1.75} />,

    title: "Performance-Kampagnen",

    description:

      "Paid Social auf LinkedIn, Instagram und YouTube. Targeting, Creative-Tests und monatliches Reporting inklusive.",

  },

];



// â"?â"? Showcase Data â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



interface ShowcaseItem {

  category: string;

  title: string;

  duration: string;

  gradient: string;

  accentColor: string;

  platform: string;

}



const showcaseItems: ShowcaseItem[] = [

  {

    category: "Imagefilm",

    title: "Corporate Identity Reel",

    duration: "2:34",

    gradient: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #1a1040 100%)",

    accentColor: "#7c3aed",

    platform: "YouTube · LinkedIn",

  },

  {

    category: "Social Reel",

    title: "Produkt-Launch 60 Sek.",

    duration: "0:58",

    gradient: "linear-gradient(135deg, #1a0533 0%, #2e1065 50%, #0f172a 100%)",

    accentColor: "#a78bfa",

    platform: "Instagram · TikTok",

  },

  {

    category: "Testimonial",

    title: "Kunden-Erfolgsgeschichte",

    duration: "3:12",

    gradient: "linear-gradient(135deg, #0c1a2e 0%, #0f2744 50%, #0e1628 100%)",

    accentColor: "#38bdf8",

    platform: "LinkedIn · Website",

  },

  {

    category: "Produkt-Demo",

    title: "Software Walkthrough",

    duration: "1:47",

    gradient: "linear-gradient(135deg, #111827 0%, #1f2937 50%, #0f1a1a 100%)",

    accentColor: "#34d399",

    platform: "YouTube · Website",

  },

];



// â"?â"? Video Thumbnail â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const VideoThumbnail = ({ item, index }: { item: ShowcaseItem; index: number }) => (

  <motion.div

    initial={{ opacity: 0, y: 12 }}

    whileInView={{ opacity: 1, y: 0 }}

    viewport={{ once: true }}

    transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}

    className="group flex flex-col"

  >

    {/* 16:9 Thumbnail */}

    <div className="relative aspect-video overflow-hidden border border-slate-200">



      {/* Background gradient — mock visual */}

      <div

        className="absolute inset-0"

        style={{ background: item.gradient }}

      />



      {/* Subtle scan-line texture overlay */}

      <div

        className="absolute inset-0 opacity-[0.04]"

        style={{

          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)",

        }}

        aria-hidden="true"

      />



      {/* Accent glow bottom-left */}

      <div

        className="absolute bottom-0 left-0 w-32 h-32 opacity-20 blur-2xl"

        style={{ background: item.accentColor }}

        aria-hidden="true"

      />



      {/* Category badge — top left */}

      <div className="absolute top-3 left-3 z-10">

        <span

          className="text-[9px] font-black tracking-[0.18em] uppercase px-2 py-1"

          style={{

            color: item.accentColor,

            background: "rgba(0,0,0,0.55)",

            backdropFilter: "blur(4px)",

          }}

        >

          {item.category}

        </span>

      </div>



      {/* Duration badge — top right */}

      <div className="absolute top-3 right-3 z-10">

        <span className="text-[9px] font-bold text-white/70 bg-black/50 px-2 py-1">

          {item.duration}

        </span>

      </div>



      {/* Play button overlay — centered */}

      <div className="absolute inset-0 flex items-center justify-center z-10">

        <motion.div

          whileHover={{ scale: 1.1 }}

          transition={{ duration: 0.2 }}

          className="w-12 h-12 bg-white/10 border border-white/20 flex items-center justify-center opacity-60 group-hover:opacity-100 group-hover:bg-white/20 transition-all duration-300"

          aria-hidden="true"

        >

          <Play

            size={18}

            className="text-white ml-0.5"

            fill="white"

            strokeWidth={0}

          />

        </motion.div>

      </div>



      {/* Bottom gradient fade */}

      <div

        className="absolute bottom-0 inset-x-0 h-16"

        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)" }}

        aria-hidden="true"

      />



      {/* Platform label — bottom left */}

      <div className="absolute bottom-3 left-3 z-10">

        <span className="text-[9px] font-medium text-white/50">

          {item.platform}

        </span>

      </div>

    </div>



    {/* Caption below thumbnail */}

    <div className="pt-3 pb-1 border-b border-slate-100 group-hover:border-indigo-200 transition-colors duration-300">

      <p className="text-sm font-bold text-slate-900 leading-tight">{item.title}</p>

    </div>

  </motion.div>

);



// â"?â"? Showcase Section â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



const ContentShowcase = () => (

  <section className="bg-slate-50 border-t border-slate-200">

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">



      {/* Header */}

      <motion.div

        initial={{ opacity: 0, y: 8 }}

        whileInView={{ opacity: 1, y: 0 }}

        viewport={{ once: true }}

        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}

        className="section-y-compact border-b border-slate-200 flex flex-col md:flex-row md:items-end md:justify-between gap-4"

      >

        <div>

          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">

            Content-Formate

          </p>

          <h2

            className="font-semibold tracking-[-0.03em] text-slate-900"

            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}

          >

            Was wir{" "}

            <span className="text-indigo-600">produzieren.</span>

          </h2>

        </div>

        <p className="text-sm text-slate-400 max-w-xs md:text-right leading-relaxed">

          Jedes Format ist auf die jeweilige Plattform und Zielgruppe optimiert.

        </p>

      </motion.div>



      {/* 2×2 Grid */}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 section-y-compact">

        {showcaseItems.map((item, i) => (

          <VideoThumbnail key={item.title} item={item} index={i} />

        ))}

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

      "Starker Content braucht eine starke Landezone. Wir bauen Websites, die aus Besuchern Kunden machen.",

    href: "/leistungen/websites",

  },

  {

    index: "02",

    title: "Marke & Design",

    description:

      "Konsistente Bildsprache, Farbwelt und Typografie. Ihre Videos werden sofort wiedererkannt.",

    href: "/leistungen/branding",

  },

  {

    index: "03",

    title: "KI-Systeme & Automation",

    description:

      "Content-Distribution und Reporting automatisieren. Mehr Reichweite, weniger manueller Aufwand.",

    href: "/leistungen/ki-automation",

  },

];



// â"?â"? Page â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?â"?



export default function SocialMediaVideoPage() {

  return (

    <div className="bg-white min-h-screen">



      <SubpageHero

        eyebrow="Social Media & Video"

        headline="Sichtbarkeit,"

        highlightedWord=" die bleibt."

        subCopy="Imagefilme, Short-Form Content und Performance-Kampagnen aus einer Hand. Strategisch, nicht zufällig."

        ctaLabel="Content anfragen"

        ctaHref="/projekt-anfragen"

      />



      <SubpageFeatures

        eyebrow="Was wir liefern"

        headline="Drei Hebel für "

        highlightedWord="maximale Reichweite."

        features={features}

      />



      <ContentShowcase />



      <SubpageUpsell

        headline="Content ohne Strategie ist Lärm."

        subCopy="Diese Leistungen verwandeln Ihre Reichweite in messbare Ergebnisse."

        items={upsellItems}

      />



      <SubpageCta

        headline="Bereit für Content, der "

        highlightedWord="wirklich wirkt?"

        subCopy="Wir entwickeln Ihre Content-Strategie und produzieren alles aus einer Hand."

        primaryLabel="Jetzt Projekt anfragen"

        primaryHref="/projekt-anfragen"

        secondaryLabel="Alle Leistungen ansehen"

        secondaryHref="/leistungen"

      />



    </div>

  );

}




