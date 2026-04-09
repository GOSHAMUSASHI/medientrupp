"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface ServiceTag {
  label: string;
}

interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: ServiceTag[];
  imageAlt: string;
  imageBg: string; // gradient for the image placeholder
}

// ── Service Data (aus Webflow-Extraktion, sauber rewritten) ──────────────────

const services: Service[] = [
  {
    id: "marke-design",
    number: "01",
    title: "Marke & Design",
    description:
      "Wir erschaffen starke Markenidentitäten, die Vertrauen wecken. Von der strategischen Positionierung bis zur visuellen Gestaltung sorgen wir für einen unverwechselbaren Auftritt — und einen ersten Eindruck, der bleibt.",
    tags: [
      { label: "Brand Strategy" },
      { label: "Corporate Design" },
      { label: "Logo Design" },
      { label: "UI/UX Design" },
    ],
    imageAlt: "Marke und Design Visualisierung",
    imageBg:
      "linear-gradient(135deg, #EEF2FF 0%, #C7D2FE 50%, #A5B4FC 100%)",
  },
  {
    id: "websites",
    number: "02",
    title: "Websites",
    description:
      "Hochperformante Websites und Landingpages, die Ihre Besucher zu Kunden machen. Wir kombinieren State-of-the-art Technologie mit erstklassigem Design — für Ladezeiten unter einer Sekunde und maximale Conversion.",
    tags: [
      { label: "Next.js" },
      { label: "Webflow" },
      { label: "Performance" },
      { label: "SEO" },
    ],
    imageAlt: "Website Entwicklung",
    imageBg:
      "linear-gradient(135deg, #F0FDF4 0%, #BBF7D0 50%, #6EE7B7 100%)",
  },
  {
    id: "ki-automatisierung",
    number: "03",
    title: "KI & Automatisierung",
    description:
      "Optimieren Sie Ihre Geschäftsprozesse mit künstlicher Intelligenz. Wir integrieren intelligente Tools, die Zeit sparen und Ihre Effizienz nachhaltig steigern — ohne komplizierten IT-Overhead.",
    tags: [
      { label: "AI Workflows" },
      { label: "Automations" },
      { label: "Efficiency" },
      { label: "Custom GPTs" },
    ],
    imageAlt: "KI und Automatisierung",
    imageBg:
      "linear-gradient(135deg, #FFF7ED 0%, #FED7AA 50%, #FB923C 100%)",
  },
  {
    id: "video-social",
    number: "04",
    title: "Video & Social Media",
    description:
      "Bewegtbild und Social-Media-Präsenz, die Ihre Zielgruppe wirklich erreicht. Von der Konzeption bis zur Distribution — wir produzieren Inhalte, die Ihre Marke authentisch und professionell repräsentieren.",
    tags: [
      { label: "Video Produktion" },
      { label: "Social Media" },
      { label: "Content Strategy" },
      { label: "Reels & Shorts" },
    ],
    imageAlt: "Video und Social Media",
    imageBg:
      "linear-gradient(135deg, #FDF4FF 0%, #E879F9 40%, #A855F7 100%)",
  },
  {
    id: "laufende-betreuung",
    number: "05",
    title: "Laufende Betreuung",
    description:
      "Rundum-Sorglos-Paket für Ihre digitale Infrastruktur. Wir kümmern uns um sicheres Hosting, regelmäßige Wartung, Updates und fortlaufende Performance-Optimierung. Sie machen Ihr Tagesgeschäft — wir halten die Technik am Laufen.",
    tags: [
      { label: "Sicheres Hosting" },
      { label: "Wartung & Updates" },
      { label: "Performance Reports" },
      { label: "Support" },
    ],
    imageAlt: "Laufende Betreuung Visualisierung",
    imageBg:
      "linear-gradient(135deg, #F8FAFC 0%, #CBD5E1 50%, #94A3B8 100%)",
  },
];

// ── Image Placeholder (replaced by Next.js <Image> when real assets exist) ───

interface ServiceImageProps {
  service: Service;
  isVisible: boolean;
}

const ServiceImage = ({ service, isVisible }: ServiceImageProps) => (
  <div
    className="relative w-full h-[calc(100vh-160px)] min-h-[500px] max-h-[800px] rounded-2xl overflow-hidden"
    style={{
      boxShadow: "0 20px 40px -10px rgba(79,70,229,0.12)",
    }}
  >
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={service.id}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ background: service.imageBg }}
          aria-label={service.imageAlt}
        >
          {/* Service number watermark */}
          <span
            className="text-white/20 font-black select-none"
            style={{ fontSize: "clamp(6rem, 18vw, 12rem)", lineHeight: 1 }}
          >
            {service.number}
          </span>
          {/* Service title overlay */}
          <span className="absolute bottom-6 left-6 text-white/70 font-bold text-lg tracking-tight">
            {service.title}
          </span>
        </motion.div>
      )}
    </AnimatePresence>

    {/* Subtle bottom gradient overlay */}
    <div
      className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
      style={{
        background:
          "linear-gradient(to top, rgba(255,255,255,0.25), transparent)",
      }}
      aria-hidden="true"
    />
  </div>
);

// ── Accordion Item ────────────────────────────────────────────────────────────

interface AccordionItemProps {
  service: Service;
  isActive: boolean;
  onToggle: () => void;
}

const AccordionItem = ({ service, isActive, onToggle }: AccordionItemProps) => (
  <div
    className="border-b border-slate-100 cursor-pointer"
    onClick={onToggle}
    role="button"
    aria-expanded={isActive}
    aria-controls={`service-content-${service.id}`}
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") onToggle();
    }}
  >
    {/* Header row */}
    <div className="flex items-center justify-between py-6">
      <div>
        {/* Service number */}
        <p
          className="text-[10px] font-black tracking-[0.3em] uppercase mb-1.5 transition-colors duration-300"
          style={{ color: isActive ? "#4F46E5" : "#CBD5E1" }}
        >
          {service.number}
        </p>
        {/* Service title */}
        <h3
          className="text-2xl sm:text-3xl font-black tracking-tight transition-colors duration-300"
          style={{ color: isActive ? "#0F172A" : "#94A3B8" }}
        >
          {service.title}
        </h3>
      </div>

      {/* Toggle icon */}
      <div
        className="w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-300 flex-shrink-0"
        style={
          isActive
            ? {
                borderColor: "#4F46E5",
                color: "#4F46E5",
                background: "#EEF2FF",
                transform: "rotate(180deg)",
              }
            : { borderColor: "#E2E8F0", color: "#CBD5E1" }
        }
        aria-hidden="true"
      >
        <ChevronDown size={18} />
      </div>
    </div>

    {/* Expandable content */}
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          id={`service-content-${service.id}`}
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div className="pb-8 pr-4">
            {/* Description */}
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              {service.description}
            </p>
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {service.tags.map((tag) => (
                <span
                  key={tag.label}
                  className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest border"
                  style={{
                    background: "#F8FAFC",
                    color: "#64748B",
                    borderColor: "#E2E8F0",
                  }}
                >
                  {tag.label}
                </span>
              ))}
            </div>
            {/* Learn more CTA */}
            <a
              href="/leistungen"
              className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-300 hover:gap-3"
              style={{ color: "#4F46E5" }}
              onClick={(e) => e.stopPropagation()}
            >
              Leistungen ansehen
              <ArrowRight size={14} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

export const ServicesAlternating = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleToggle = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  return (
    <section
      id="leistungen"
      className="bg-slate-50 py-24 lg:py-32"
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
            Leistungsübersicht
          </p>
          <h2
            id="services-heading"
            className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4"
          >
            Jede Säule, ein bewährter Baustein.
          </h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
            Für Ihren digitalen Erfolg — klar strukturiert, ohne Fachjargon.
          </p>
        </motion.div>

        {/* Grid — Accordion left, sticky image right */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* LEFT — Accordion */}
          <div className="flex-1">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <AccordionItem
                  service={service}
                  isActive={activeIndex === index}
                  onToggle={() => handleToggle(index)}
                />
              </motion.div>
            ))}

            {/* Bottom CTA */}
            <div className="mt-10">
              <a
                href="/leistungen"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                id="services-all-link"
              >
                Alle Leistungen ansehen
                <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* RIGHT — Sticky Image Display (desktop only) */}
          <div className="hidden lg:block lg:w-[42%] flex-shrink-0">
            <div className="sticky top-24">
              <ServiceImage
                service={services[activeIndex >= 0 ? activeIndex : 0]}
                isVisible={true}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
