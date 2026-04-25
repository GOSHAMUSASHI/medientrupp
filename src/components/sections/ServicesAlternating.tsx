"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Clapperboard, HeartHandshake, Monitor, Sparkles, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ComponentType } from "react";
import { AutomationGraphic } from "@/components/services/AutomationGraphic";
import { BetreuungGraphic } from "@/components/services/BetreuungGraphic";
import { BrandDesignGraphic } from "@/components/services/BrandDesignGraphic";
import { IndividualKIGraphic } from "@/components/services/IndividualKIGraphic";
import { SocialMediaGraphic } from "@/components/services/SocialMediaGraphic";
import { WebsiteGraphic } from "@/components/services/WebsiteGraphic";

interface Service {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  href: string;
  badgeLabel: string;
  badgeIcon: LucideIcon;
  graphicTone: string;
  Graphic: ComponentType;
}

const services: Service[] = [
  {
    index: "01",
    eyebrow: "Ihr Markenbild",
    title: "Marke & Design",
    description:
      "Wir entwickeln Ihr visuelles Markenbild: Logo, Farben, Schrift und Vorlagen – so dass Sie auf jedem Kanal sofort erkennbar sind und einen professionellen ersten Eindruck hinterlassen.",
    points: ["Logo, Farben & Schrift", "Design-System", "Vorlagen & Assets"],
    href: "/leistungen/branding",
    badgeLabel: "Brand System",
    badgeIcon: Sparkles,
    graphicTone: "from-[#f8f7ff] via-white to-[#f3f5fb]",
    Graphic: BrandDesignGraphic,
  },
  {
    index: "02",
    eyebrow: "Ihr Webauftritt",
    title: "Website & Digitaler Auftritt",
    description:
      "Wir bauen Ihre Website mit Fokus auf Geschwindigkeit, klare Struktur und mehr Anfragen. Kein technischer Aufwand fuer Sie – wir kuemmern uns um alles, vom Design bis zum Go-Live.",
    points: ["Klare Seitenstruktur", "Google-Sichtbarkeit", "Mehr Anfragen"],
    href: "/leistungen/websites",
    badgeLabel: "Premium Frontend",
    badgeIcon: Monitor,
    graphicTone: "from-[#f4f7fb] via-white to-[#f7f9fc]",
    Graphic: WebsiteGraphic,
  },
  {
    index: "03",
    eyebrow: "Ihre Workflows",
    title: "KI & Automation",
    description:
      "Wir automatisieren wiederkehrende Aufgaben in Ihrem Unternehmen: Anfragen sortieren, Daten uebertragen, Ablaeufe steuern – alles laeuft im Hintergrund, ohne dass Ihr Team eingreifen muss.",
    points: ["Automatisch sortieren", "Echtzeit-Ueberblick", "CRM-Anbindung"],
    href: "/leistungen/ki-automation",
    badgeLabel: "Automation Flow",
    badgeIcon: Workflow,
    graphicTone: "from-[#f3f7f2] via-white to-[#f5f7fb]",
    Graphic: AutomationGraphic,
  },
  {
    index: "04",
    eyebrow: "Auf Sie zugeschnitten",
    title: "Individuelle KI-Projekte",
    description:
      "Ob Chatbot, KI-Analyse oder automatisierter Assistent – wir entwickeln KI-Systeme ganz nach Ihren Anforderungen. Fuer Influencer, Investoren oder Unternehmer, die etwas Eigenes wollen.",
    points: ["KI-Konzept & Planung", "Eigene Entwicklung", "Betreuung & Ausbau"],
    href: "/leistungen/individuelle-ki",
    badgeLabel: "Custom AI",
    badgeIcon: Bot,
    graphicTone: "from-[#f5f3ff] via-white to-[#f3f5fb]",
    Graphic: IndividualKIGraphic,
  },
  {
    index: "05",
    eyebrow: "Reichweite aufbauen",
    title: "Social Media & Video",
    description:
      "Wir planen, produzieren und veroeffentlichen Ihren Content. Von der Strategie bis zum fertigen Video – alles aus einer Hand, mit klarem Fokus auf Sichtbarkeit und echte Wirkung.",
    points: ["Content-Planung", "Videoproduktion", "Kanalbetreuung"],
    href: "/leistungen/social-media",
    badgeLabel: "Content Studio",
    badgeIcon: Clapperboard,
    graphicTone: "from-[#fff8f5] via-white to-[#fdf5fb]",
    Graphic: SocialMediaGraphic,
  },
  {
    index: "06",
    eyebrow: "Immer erreichbar",
    title: "Laufende Betreuung",
    description:
      "Wir halten Ihre Systeme sicher, aktuell und stabil. Updates, Sicherheitsueberwachung und schneller Support – damit Sie sich auf Ihr Geschaeft konzentrieren koennen.",
    points: ["Updates & Wartung", "Sicherheitsmonitoring", "Direkter Support"],
    href: "/leistungen/betreuung",
    badgeLabel: "Support & Care",
    badgeIcon: HeartHandshake,
    graphicTone: "from-[#f0f9ff] via-white to-[#f3f7fb]",
    Graphic: BetreuungGraphic,
  },
];

const viewport = { once: true, amount: 0.35 } as const;
const transition = { duration: 0.7, ease: [0.16, 1, 0.3, 1] } as const;

export const ServicesAlternating = () => {
  return (
    <section
      aria-labelledby="services-heading"
      className="relative overflow-hidden border-t border-slate-200 bg-white section-y"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.08),_transparent_34%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={transition}
          className="max-w-3xl"
        >
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-600">
            Unsere Kernleistungen
          </p>
          <h2
            id="services-heading"
            className="max-w-2xl font-semibold tracking-[-0.03em] text-slate-900"
            style={{ fontSize: "clamp(2.1rem, 4.4vw, 3.4rem)", lineHeight: 1.03 }}
          >
            Sechs Leistungen, die nahtlos ineinandergreifen.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
            Von Marke und Website ueber KI-Loesungen bis hin zu Social Media und laufender
            Betreuung – alles aus einer Hand, visuell wie technisch stimmig.
          </p>
        </motion.div>

        <div className="flex flex-col gap-20 md:gap-24">
          {services.map((service, index) => {
            const reversed = index % 2 === 1;
            const BadgeIcon = service.badgeIcon;

            return (
              <div
                key={service.index}
                className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24"
              >
                <motion.div
                  initial={{ opacity: 0, x: reversed ? 28 : -28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={transition}
                  className={reversed ? "lg:order-2" : undefined}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <span className="text-[11px] font-semibold tracking-[0.22em] text-slate-400">
                      {service.index}
                    </span>
                    <span className="h-px w-16 bg-slate-200" />
                    <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-600">
                      {service.eyebrow}
                    </span>
                  </div>

                  <h3
                    className="max-w-xl font-semibold tracking-[-0.03em] text-slate-900"
                    style={{ fontSize: "clamp(1.75rem, 3vw, 2.35rem)", lineHeight: 1.08 }}
                  >
                    {service.title}
                  </h3>

                  <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-500 md:text-lg">
                    {service.description}
                  </p>

                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {service.points.map((point) => (
                      <div
                        key={point}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 shadow-[0_18px_30px_-28px_rgba(15,23,42,0.28)]"
                      >
                        <span className="mb-3 block h-1.5 w-10 rounded-full bg-indigo-600/70" />
                        <p className="text-sm font-medium leading-snug text-slate-700">{point}</p>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={service.href}
                    className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition-colors duration-200 hover:text-indigo-600"
                  >
                    Mehr zu {service.title}
                    <ArrowRight
                      size={15}
                      className="text-slate-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: reversed ? -28 : 28 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={viewport}
                  transition={{ ...transition, delay: 0.08 }}
                  className={reversed ? "lg:order-1" : undefined}
                >
                  <div className="relative mx-auto w-full max-w-[38rem]">
                    <div className="absolute inset-x-10 top-10 bottom-0 rounded-[2rem] bg-slate-200/70" />
                    <div className="absolute inset-x-6 top-6 bottom-2 rounded-[2rem] bg-white shadow-[0_28px_60px_-42px_rgba(15,23,42,0.28)]" />

                    <div
                      className={`relative overflow-hidden rounded-[2rem] border border-slate-200 bg-gradient-to-br ${service.graphicTone} p-5 pb-10 shadow-[0_36px_80px_-44px_rgba(15,23,42,0.35)] sm:p-7 sm:pb-12`}
                    >
                      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),transparent_24%,transparent_76%,rgba(241,245,249,0.55))]" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_transparent_74%)]" />

                      <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewport}
                        transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 px-3 py-2 shadow-[0_16px_32px_-24px_rgba(15,23,42,0.35)] backdrop-blur-sm sm:left-5 sm:top-5"
                      >
                        <BadgeIcon size={14} className="text-indigo-600" strokeWidth={2} />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-700">
                          {service.badgeLabel}
                        </span>
                      </motion.div>

                      <div className="relative pt-12 sm:pt-14">
                        <service.Graphic />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
