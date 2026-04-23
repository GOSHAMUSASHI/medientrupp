"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────

interface Service {
  index: string;
  title: string;
  subtitle: string;
  action: string;
  result: string;
  tags: string[];
  image: string | null;
  href: string;
}

const services: Service[] = [
  {
    index: "01",
    title: "Marke\n& Design",
    subtitle: "Ihr erster Eindruck",
    action: "Wir entwickeln Ihre Marke von Grund auf. Oder schärfen, was bereits vorhanden ist.",
    result: "Ihr Auftritt strahlt sofort Autorität aus.",
    tags: ["Corporate Design", "Logo & Visual Identity", "Brand Guidelines"],
    image: "/images/leistungen-marke-design.png",
    href: "/leistungen/branding",
  },
  {
    index: "02",
    title: "Website &\nDigitaler Auftritt",
    subtitle: "Ihr 24/7 Schaufenster",
    action: "Wir bauen eine schnelle, suchmaschinenoptimierte Website mit Texten, die verkaufen.",
    result: "Mehr Anfragen. Messbar, nachweisbar, planbar.",
    tags: ["Next.js High-Performance", "Technical SEO", "Core Web Vitals"],
    image: "/images/leistungen-websites.png",
    href: "/leistungen/websites",
  },
  {
    index: "03",
    title: "KI & Automation",
    subtitle: "Wiederkehrende Aufgaben automatisiert",
    action: "Wir richten automatische Interessenten-Erfassung, einen 24/7-Chatbot und Bewertungsanfragen ein.",
    result: "Sie gewinnen mehrere Stunden pro Woche zurück.",
    tags: ["Lead Automation", "24/7 KI-Chatbot", "CRM-Integration"],
    image: "/images/leistungen-ki-automatisierung.png",
    href: "/leistungen/ki-automation",
  },
  {
    index: "04",
    title: "Individuelle\nKI-Projekte",
    subtitle: "Maßgeschneidert für Ihre Branche",
    action: "Wir bauen KI-Systeme speziell für Ihr Unternehmen, trainiert auf Ihre Daten und Prozesse.",
    result: "Ein Werkzeug, das kein Wettbewerber von der Stange kaufen kann.",
    tags: ["Eigenes KI-Modell", "Prozessintegration", "White-Label Plattform"],
    image: "/images/leistungen-ki-plattformen.webp",
    href: "/leistungen/ki-plattformen",
  },
  {
    index: "05",
    title: "Social Media\n& Video",
    subtitle: "Sichtbarkeit, die bleibt",
    action: "Wir produzieren Video-Content und übernehmen die Pflege Ihrer Kanäle. Nach Strategie, nicht Bauchgefühl.",
    result: "Ihre Botschaft erreicht die richtigen Menschen. Regelmäßig.",
    tags: ["Content-Strategie", "Videoproduktion", "Performance Marketing"],
    image: "/images/leistungen-social-video.png",
    href: "/leistungen/social-media-video",
  },
  {
    index: "06",
    title: "Laufende\nBetreuung",
    subtitle: "Rundum-Sorglos",
    action: "Wir übernehmen Hosting, Wartung und laufende Optimierung. Sie kümmern sich ums Kerngeschäft.",
    result: "Technik, die im Hintergrund fehlerfrei läuft.",
    tags: ["Hosting in Deutschland", "Sicherheits-Updates", "Proaktiver Support"],
    image: "/images/leistungen-betreuung.png",
    href: "/leistungen/betreuung",
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

export const ServicesAlternating = () => {
  return (
    <section className="bg-slate-50 border-t border-slate-200" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="py-8 md:py-12 border-b border-slate-200"
        >
          <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
            Unsere Kernleistungen
          </p>
          <h2
            id="services-heading"
            className="font-semibold tracking-[-0.03em] text-slate-900"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
          >
            Bausteine für echte
            <br />
            <span className="text-indigo-600">Skalierung.</span>
          </h2>
        </motion.div>

        {/* Service rows */}
        <div>
          {services.map((srv, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] border-b border-slate-200"
            >
              {/* LEFT — service title block + image */}
              <div className="py-6 md:py-10 lg:pr-12 flex flex-col gap-5 md:gap-8">
                <div className="flex items-start gap-5">
                  <span
                    className="text-[11px] font-semibold tracking-[0.2em] text-slate-400 mt-1 shrink-0"
                  >
                    {srv.index}
                  </span>
                  <div>
                    <h3
                      className="font-semibold tracking-[-0.02em] text-slate-900 mb-3 whitespace-pre-line"
                      style={{ fontSize: "clamp(1.6rem, 3.5vw, 2.6rem)", lineHeight: 0.95 }}
                    >
                      {srv.title}
                    </h3>
                    <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-indigo-600">
                      {srv.subtitle}
                    </p>
                  </div>
                </div>

                {/* Image — sauber integriert, 16:10 */}
                <Link
                  href={srv.href}
                  className="group relative block w-full overflow-hidden rounded-md border border-slate-200 bg-white"
                  style={{ aspectRatio: "16 / 10" }}
                  aria-label={`Mehr zu ${srv.title.replace(/\n/g, " ")}`}
                >
                  {srv.image ? (
                    <Image
                      src={srv.image}
                      alt={`${srv.title.replace(/\n/g, " ")} — Beispiel`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      style={{ objectFit: "cover" }}
                      className="transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  ) : (
                    /* Placeholder für fehlende Bilder */
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-indigo-50 via-slate-50 to-indigo-100">
                      <div className="w-14 h-14 rounded-md bg-indigo-600 flex items-center justify-center">
                        <Cpu size={28} className="text-white" strokeWidth={1.5} />
                      </div>
                      <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-slate-400">
                        Individuelles Projekt
                      </p>
                    </div>
                  )}
                </Link>
              </div>

              {/* CENTER — vertical rule */}
              <div className="hidden lg:block bg-slate-200 self-stretch" />

              {/* RIGHT — detail content */}
              <div className="py-6 md:py-10 lg:pl-12 flex flex-col justify-center gap-4 md:gap-6">
                {/* Was wir machen */}
                <div>
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">
                    Was wir machen
                  </p>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {srv.action}
                  </p>
                </div>

                {/* Ihr Nutzen */}
                <div className="border-l-2 border-indigo-600 pl-4">
                  <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-400 mb-2">
                    Ihr konkreter Nutzen
                  </p>
                  <p className="text-base font-semibold text-slate-900 leading-relaxed">
                    {srv.result}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {srv.tags.map((tag, t) => (
                    <span
                      key={t}
                      className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-500 border border-slate-200 bg-white px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Per-Service CTA */}
                <Link
                  href={srv.href}
                  className="group/link mt-2 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors duration-200 self-start"
                >
                  Mehr erfahren
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover/link:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
