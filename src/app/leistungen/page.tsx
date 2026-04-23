"use client";

import { motion } from "framer-motion";
import { ArrowRight, LayoutTemplate, Bot, Cpu, Zap, Video, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { CtaBanner } from "@/components/sections/CtaBanner";

// Placeholder component for services without an image
const ImagePlaceholder = ({ icon }: { icon: ReactNode }) => (
  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-indigo-50 via-slate-50 to-indigo-100">
    <div className="w-12 h-12 rounded-md bg-indigo-600 flex items-center justify-center text-white">
      {icon}
    </div>
    <p className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-400">Individuelles Projekt</p>
  </div>
);

// ── Services ────────────────────────────────────────────────────────────────

interface ServiceCard {
  id: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  image: string | null;
  description: string;
  href: string;
}

const services: ServiceCard[] = [
  {
    id: "branding",
    title: "Marke & Design",
    subtitle: "Identität",
    icon: <Zap size={20} strokeWidth={1.75} />,
    image: "/images/leistungen-marke-design.png",
    description:
      "Strategische Positionierung, Corporate Design und Brand Guidelines. Ein Auftritt, der Autorität ausstrahlt.",
    href: "/leistungen/branding",
  },
  {
    id: "websites",
    title: "Websites & Digitaler Auftritt",
    subtitle: "Schaufenster",
    icon: <LayoutTemplate size={20} strokeWidth={1.75} />,
    image: "/images/leistungen-websites.png",
    description:
      "Schnelle, SEO-optimierte Websites mit verkaufspsychologischen Texten. Ihre beste Vertrieblerin, rund um die Uhr.",
    href: "/leistungen/websites",
  },
  {
    id: "ki-automation",
    title: "KI & Automation",
    subtitle: "Standard-Workflows",
    icon: <Bot size={20} strokeWidth={1.75} />,
    image: "/images/leistungen-ki-automatisierung.png",
    description:
      "Lead-Qualifizierung, 24/7 Chatbot und CRM-Automation. Sie gewinnen Stunden pro Woche zurück.",
    href: "/leistungen/ki-automation",
  },
  {
    id: "ki-plattformen",
    title: "Individuelle KI-Projekte",
    subtitle: "Maßgeschneidert",
    icon: <Cpu size={20} strokeWidth={1.75} />,
    image: "/images/leistungen-ki-plattformen.webp",
    description:
      "Eigene KI-Plattformen und trainierte Modelle für Ihre Branche. Ein einzigartiges Werkzeug, das Wettbewerber nicht haben.",
    href: "/leistungen/ki-plattformen",
  },
  {
    id: "social-media-video",
    title: "Social Media & Video",
    subtitle: "Sichtbarkeit",
    icon: <Video size={20} strokeWidth={1.75} />,
    image: "/images/leistungen-social-video.png",
    description:
      "Content-Strategie, Videoproduktion und Performance Marketing. Ihre Botschaft erreicht die richtigen Menschen.",
    href: "/leistungen/social-media-video",
  },
  {
    id: "betreuung",
    title: "Laufende Betreuung",
    subtitle: "Rundum-Sorglos",
    icon: <ShieldCheck size={20} strokeWidth={1.75} />,
    image: "/images/leistungen-betreuung.png",
    description:
      "Hosting, Wartung und kontinuierliche Optimierung. Technik, die im Hintergrund fehlerfrei läuft.",
    href: "/leistungen/betreuung",
  },
];

// ── Page ────────────────────────────────────────────────────────────────────

export default function LeistungenPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="pt-24 pb-10 md:pt-40 md:pb-20 bg-slate-50 relative overflow-hidden">
        <div aria-hidden="true" className="dot-grid absolute inset-0 opacity-[0.3] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-indigo-600 mb-6">
              Volles Spektrum
            </p>
            <h1
              className="font-semibold tracking-[-0.03em] text-slate-900 mb-8"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.75rem)", lineHeight: 0.95 }}
            >
              Unsere Systeme im <span className="text-indigo-600">Detail.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
              Wir bauen keine Standard-Websites, sondern Vertriebsmaschinen. Entdecken Sie die Bausteine, die Ihr Unternehmen messbar nach vorne bringen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="section-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((srv, i) => (
              <motion.div
                key={srv.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  href={srv.href}
                  className="group flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative w-full overflow-hidden bg-slate-100" style={{ aspectRatio: "16 / 10" }}>
                    {srv.image ? (
                      <Image
                        src={srv.image}
                        alt={srv.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-700 group-hover:scale-[1.04]"
                      />
                    ) : (
                      <ImagePlaceholder icon={srv.icon} />
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6 lg:p-7">
                    <div className="mb-4 flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-indigo-50 text-indigo-600">
                        {srv.icon}
                      </span>
                      <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-slate-400">
                        {srv.subtitle}
                      </span>
                    </div>

                    <h2 className="mb-3 font-semibold tracking-[-0.02em] text-slate-900 text-xl lg:text-2xl leading-tight">
                      {srv.title}
                    </h2>

                    <p className="mb-6 text-sm text-slate-500 leading-relaxed">
                      {srv.description}
                    </p>

                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 group-hover:text-indigo-800 transition-colors">
                      Mehr erfahren
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <CtaBanner />
    </div>
  );
}
