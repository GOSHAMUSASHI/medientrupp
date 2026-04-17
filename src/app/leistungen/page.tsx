"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Zap, LayoutTemplate, Bot, Video, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { CtaBanner } from "@/components/sections/CtaBanner";

// The 5 sections content based on the raw HTML
const services = [
  {
    id: "websites",
    title: "Schlüsselfertige Websites für Ihren Erfolg",
    subtitle: "Websites",
    icon: <LayoutTemplate size={24} />,
    image: "/images/leistungen-websites.png",
    description: "Von der Idee bis zum Launch. Wir bauen Websites, die funktionieren, schnell laden und auf jedem Gerät perfekt aussehen. Wartungsfrei und bereit für Ihre Kunden.",
    features: [
      "Responsive Design für alle Geräte",
      "Schnelle Ladezeiten (< 0.09s)",
      "Technical SEO & Core Web Vitals",
      "Wartungsfrei und zukunftssicher"
    ]
  },
  {
    id: "ai-automatisierung",
    title: "KI und Automatisierung für Ihre Prozesse",
    subtitle: "Intelligenz",
    icon: <Bot size={24} />,
    image: "/images/leistungen-ki-automatisierung.png",
    description: "Wir implementieren intelligente Workflows, die Ihre Zeit zurückgeben. KI-Lösungen optimieren Ihre Prozesse und schaffen Raum für das Wesentliche.",
    features: [
      "24/7 KI Lead-Qualifizierung",
      "Automatisches Follow-Up System",
      "CRM Seamless Integration",
      "Reduzierung manueller Tasks um bis zu 80%"
    ]
  },
  {
    id: "marke-design",
    title: "Marke und Design für Ihren Auftritt",
    subtitle: "Identität",
    icon: <Zap size={24} />,
    image: "/images/leistungen-marke-design.png",
    description: "Eine starke Marke ist das Fundament. Wir entwickeln Logodesigns, Corporate Design und visuelle Leitlinien, die Ihr Unternehmen prägen und im Gedächtnis bleiben.",
    features: [
      "Strategische Positionierung",
      "Einheitliches Corporate Design System",
      "Premium B2B Branding",
      "Digitale Brand Guidelines"
    ]
  },
  {
    id: "social-media",
    title: "Reichweite durch Video und Social Media",
    subtitle: "Sichtbarkeit",
    icon: <Video size={24} />,
    image: "/images/leistungen-social-video.png",
    description: "Wir produzieren Inhalte, die wirken. Kampagnen, Videos und Strategien, die Ihre Botschaft zu den richtigen Menschen bringen.",
    features: [
      "Content-Strategie & Redaktionsplan",
      "Hochwertige Videoproduktion",
      "Social Performance Marketing",
      "Datengesteuerte Skalierung"
    ]
  },
  {
    id: "betreuung",
    title: "Laufende Unterstützung für Ihren Erfolg",
    subtitle: "Betreuung",
    icon: <ShieldCheck size={24} />,
    image: "/images/leistungen-betreuung.png",
    description: "Nach dem Launch beginnt die echte Arbeit. Wir kümmern uns um Wartung, Support und kontinuierliche Verbesserung Ihrer digitalen Systeme.",
    features: [
      "Premium Cloud Hosting",
      "Regelmäßige Sicherheits-Updates",
      "Persönlicher Support-Kanal",
      "Proaktive Conversion-Optimierung"
    ]
  }
];

export default function LeistungenPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 bg-slate-50 relative overflow-hidden">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-[0.3] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-sm font-black tracking-[0.2em] uppercase text-indigo-600 mb-6">
              Volles Spektrum
            </p>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-slate-900 mb-8">
              Unsere Systeme im <span className="text-indigo-600">Detail.</span>
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed font-medium">
              Wir bauen keine Standard-Websites, sondern Vertriebsmaschinen. Entdecken Sie die Bausteine, die Ihr Unternehmen messbar nach vorne bringen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content with Sticky Nav */}
      <section className="py-16 md:py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sticky Navigation Sidebar */}
            <div className="lg:w-1/4 hidden lg:block">
              <div className="sticky top-32 bg-slate-50/50 p-6 rounded-md border border-slate-100 shadow-sm">
                <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 mb-6">
                  Inhalt
                </h3>
                <nav className="flex flex-col gap-5">
                  {services.map((srv) => (
                    <a
                      key={srv.id}
                      href={`#${srv.id}`}
                      className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                      {srv.subtitle}
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            {/* Services List */}
            <div className="lg:w-3/4 flex flex-col gap-24 md:gap-32">
              {services.map((srv, index) => {
                const isEven = index % 2 === 0;
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.7 }}
                    key={srv.id} 
                    id={srv.id}
                    className={`flex flex-col gap-10 lg:gap-16 items-center scroll-mt-32 ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                  >
                    {/* Copy */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                          {srv.icon}
                        </div>
                        <span className="text-xs font-black tracking-widest uppercase text-indigo-600">
                          {srv.subtitle}
                        </span>
                      </div>
                      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
                        {srv.title}
                      </h2>
                      <p className="text-base md:text-lg text-slate-500 leading-relaxed mb-8">
                        {srv.description}
                      </p>
                      <ul className="space-y-4">
                        {srv.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-3 bg-slate-50/50 p-3 rounded-md border border-slate-100">
                            <CheckCircle2 size={20} className="text-indigo-600 flex-shrink-0" />
                            <span className="text-slate-800 font-semibold text-sm md:text-base">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Image */}
                    <div className="flex-1 w-full relative group">
                      <div className="aspect-[4/3] border border-slate-200 overflow-hidden relative transition-transform duration-500 group-hover:-translate-y-1">
                        <Image
                          src={srv.image}
                          alt={srv.title}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          style={{ objectFit: "cover" }}
                          className="transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <CtaBanner />
    </div>
  );
}
