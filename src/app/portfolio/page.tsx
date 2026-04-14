"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, ExternalLink, Globe, Layers, Zap } from "lucide-react";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";

// Mock Data for Projects
const projects = [
  {
    title: "Global Supply Group",
    category: "Full-Stack B2B Plattform",
    description: "Automatisierte Lead-Gen und Client-Portal für einen internationalen Logistiker.",
    metrics: ["Conversion +40%", "Ladezeit 0.12s", "CRM-Sync"],
    color: "from-blue-500/20 to-cyan-500/20",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "FinTech Navigator",
    category: "Corporate Website & SaaS UI",
    description: "Kompletter Relaunch der Marketing-Website inklusive interaktivem Rendite-Rechner.",
    metrics: ["14k Leads/Mo", "Web-Vitals 100/100", "Dark Mode"],
    color: "from-indigo-500/20 to-purple-500/20",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "MedTech Recruiting",
    category: "Automatisierter Funnel",
    description: "Ein spezialisiertes Karriere-Portal zur vollautomatischen Vorqualifizierung von Fachkräften.",
    metrics: ["-80% Time-to-Hire", "KI-Screening", "Voll automatisiert"],
    color: "from-emerald-500/20 to-teal-500/20",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop"
  },
  {
    title: "Industrial Systems",
    category: "E-Commerce Headless",
    description: "Ein rasend schneller B2B Online-Shop mit Anbindung an bestehende SAP-Warenwirtschaft.",
    metrics: ["3.4M+ Umsatz", "+120% Sichtbarkeit", "Headless"],
    color: "from-orange-500/20 to-red-500/20",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop"
  }
];

export default function PortfolioPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Premium Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden relative">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-[0.25] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-sm font-black tracking-[0.2em] uppercase text-indigo-600 mb-6">
              Case Studies & Referenzen
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 mb-8">
              Systeme, die <span className="text-indigo-600">gewinnen.</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-medium">
              Einblicke in unsere Infrastrukturen und Case Studies. Jedes System wird kompromisslos auf Performance und ROI optimiert.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Massive modern Grid Layout */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {projects.map((project, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                key={idx}
                className="group flex flex-col h-full cursor-pointer"
              >
                {/* Visual Placeholder for Mockups */}
                <div className="relative aspect-[4/3] rounded-md overflow-hidden mb-8 shadow-xl shadow-slate-200/50 border border-slate-200 bg-white">
                  {/* Subtle Background Glow per project */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 z-0`}></div>
                  
                  {/* Image implementation with minimal zoom on hover */}
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03] z-10"
                    unoptimized
                  />

                  {/* Glass Overlay on Hover */}
                  <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 flex items-center justify-center">
                    {/* Secondary Button Fading in */}
                    <span className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-[400ms] ease-out bg-slate-900 text-white font-bold px-8 py-4 rounded-md shadow-2xl flex items-center gap-2">
                      <ExternalLink size={20} />
                      Live-Vorschau ansehen
                    </span>
                  </div>
                </div>

                {/* Content & Metrics */}
                <div className="flex flex-col flex-1">
                  {/* Metrics Badges */}
                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.metrics.map((metric, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white text-slate-800 font-bold text-xs uppercase tracking-widest border border-slate-200 shadow-sm">
                        <Zap size={14} className="text-indigo-600" />
                        {metric}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
                    {project.category}
                  </p>
                  <p className="text-lg text-slate-500 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subtle Tech-Stack Bar */}
      <section className="border-t border-slate-200 bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-10">
            Gefertigt mit modernsten Webtechnologien
          </p>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-20 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {/* React */}
            <div className="flex flex-col items-center gap-3 text-slate-800 font-semibold">
              <Code2 size={36} className="text-sky-500" /> 
              <span>React</span>
            </div>
            {/* Next.js */}
            <div className="flex flex-col items-center gap-3 text-slate-800 font-semibold">
              <Globe size={36} className="text-slate-900" /> 
              <span>Next.js</span>
            </div>
            {/* Framer */}
            <div className="flex flex-col items-center gap-3 text-slate-800 font-semibold">
              <Layers size={36} className="text-pink-500" /> 
              <span>Framer Motion</span>
            </div>
            {/* Vercel */}
            <div className="flex flex-col items-center gap-3 text-slate-800 font-semibold">
              <Cpu size={36} className="text-slate-900" /> 
              <span>Vercel</span>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />
    </div>
  );
}
