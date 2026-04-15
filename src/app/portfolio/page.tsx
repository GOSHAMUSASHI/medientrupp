"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Globe, Layers, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";

const projects = [
  {
    index: "01",
    title: "Global Supply Group",
    category: "Full-Stack B2B Plattform",
    description: "Automatisierte Lead-Gen und Client-Portal für einen internationalen Logistiker.",
    metrics: ["Conversion +40 %", "Ladezeit 0,12 s", "CRM-Sync"],
    image: "/images/case-supply.png",
  },
  {
    index: "02",
    title: "FinTech Navigator",
    category: "Corporate Website & SaaS UI",
    description: "Kompletter Relaunch der Marketing-Website inklusive interaktivem Rendite-Rechner.",
    metrics: ["14 k Leads/Mo", "Web-Vitals 100/100", "Dark Mode"],
    image: "/images/case-fintech.png",
  },
  {
    index: "03",
    title: "MedTech Recruiting",
    category: "Automatisierter Funnel",
    description:
      "Spezialisiertes Karriere-Portal zur vollautomatischen Vorqualifizierung von Fachkräften.",
    metrics: ["−80 % Time-to-Hire", "KI-Screening", "Voll automatisiert"],
    image: "/images/case-medtech.png",
  },
  {
    index: "04",
    title: "Industrial Systems",
    category: "E-Commerce Headless",
    description:
      "Rasend schneller B2B Online-Shop mit Anbindung an bestehende SAP-Warenwirtschaft.",
    metrics: ["3,4 M+ Umsatz", "+120 % Sichtbarkeit", "Headless"],
    image: "/images/case-industrie.png",
  },
];

export default function PortfolioPage() {
  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 border-b border-slate-200 relative overflow-hidden">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-[0.2] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
              Case Studies & Referenzen
            </p>
            <h1
              className="font-black tracking-[-0.03em] text-slate-900 mb-4"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)", lineHeight: 0.93 }}
            >
              Systeme,{" "}
              <span className="text-indigo-600">die gewinnen.</span>
            </h1>
            <p className="text-base text-slate-500 max-w-xl leading-relaxed">
              Jedes System wird kompromisslos auf Performance und ROI optimiert.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project List — kompakte Tabellenzeilen */}
      <section className="border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-1 lg:grid-cols-[56px_1fr_1px_200px] items-stretch border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
            >
              {/* Index */}
              <div className="hidden lg:flex items-center py-8">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-slate-300">
                  {project.index}
                </span>
              </div>

              {/* Content */}
              <div className="py-7 lg:pr-12 flex flex-col justify-center gap-3">
                {/* Top row: category + metrics */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-indigo-600 border border-indigo-100 bg-indigo-50 px-2.5 py-1">
                    {project.category}
                  </span>
                  {project.metrics.map((m, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold text-slate-400 border border-slate-100 bg-slate-50 px-2.5 py-1 uppercase tracking-wide"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2
                  className="font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors duration-200"
                  style={{ fontSize: "clamp(1.15rem, 2.2vw, 1.6rem)" }}
                >
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-slate-500 leading-relaxed max-w-2xl">
                  {project.description}
                </p>
              </div>

              {/* Vertical rule */}
              <div className="hidden lg:block bg-slate-100 self-stretch" />

              {/* Thumbnail */}
              <div className="hidden lg:block relative overflow-hidden self-stretch min-h-[140px]">
                <Image
                  src={project.image}
                  alt={`${project.title} – ${project.category}`}
                  fill
                  sizes="(max-width: 1024px) 0px, 200px"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-slate-900/15 group-hover:bg-slate-900/5 transition-colors duration-500" />
                <div className="absolute bottom-3 right-3 w-8 h-8 bg-white border border-slate-200 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <ArrowUpRight size={16} className="text-slate-900" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tech-Stack Bar */}
      <section className="bg-slate-50 border-b border-slate-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-10">
            Gefertigt mit modernsten Webtechnologien
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 opacity-50 hover:opacity-100 transition-opacity duration-500">
            <div className="flex items-center gap-2.5 text-slate-700 font-semibold text-sm">
              <Code2 size={22} className="text-sky-500" />
              React
            </div>
            <div className="flex items-center gap-2.5 text-slate-700 font-semibold text-sm">
              <Globe size={22} className="text-slate-900" />
              Next.js
            </div>
            <div className="flex items-center gap-2.5 text-slate-700 font-semibold text-sm">
              <Layers size={22} className="text-pink-500" />
              Framer Motion
            </div>
            <div className="flex items-center gap-2.5 text-slate-700 font-semibold text-sm">
              <Cpu size={22} className="text-slate-900" />
              Vercel
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
