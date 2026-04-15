"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ── Data ──────────────────────────────────────────────────────────────────────

const projects = [
  {
    index: "01",
    title: "Web-Relaunch & B2B Lead Gen",
    client: "Schmid Maschinenbau",
    category: "High-Performance Web",
    metric: "3,5× mehr Anfragen",
    image: "/images/teaser-maschinenbau.png",
  },
  {
    index: "02",
    title: "Support Automation 24/7",
    client: "Baumann Logistik",
    category: "SaaS & Automation",
    metric: "−65 % Support-Kosten",
    image: "/images/teaser-logistik.png",
  },
  {
    index: "03",
    title: "Employer Branding Hub",
    client: "Kaiser Pflege & Gesundheit",
    category: "Funnel & Brand",
    metric: "42 neue Bewerber/Mo",
    image: "/images/teaser-pflege.png",
  },
];

// ── Section ───────────────────────────────────────────────────────────────────

export const ProjectTeaser = () => {
  return (
    <section
      className="bg-white border-t border-slate-200"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-6 py-12 border-b border-slate-200"
        >
          <div>
            <p className="text-[11px] font-semibold tracking-[0.25em] uppercase text-slate-400 mb-4">
              Erfolgsgeschichten
            </p>
            <h2
              id="projects-heading"
              className="font-black tracking-[-0.03em] text-slate-900"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 0.95 }}
            >
              Systeme,{" "}
              <span className="text-indigo-600">die gewinnen.</span>
            </h2>
          </div>
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:text-slate-900 transition-colors duration-200 self-end"
          >
            Alle Cases
            <ArrowRight size={16} className="text-slate-400" aria-hidden="true" />
          </Link>
        </motion.div>

        {/* Project rows */}
        <div>
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group grid grid-cols-1 lg:grid-cols-[60px_1fr_1px_340px] items-stretch border-b border-slate-100 hover:bg-slate-50 transition-colors duration-200"
            >
              {/* Index number */}
              <div className="hidden lg:flex items-center py-8 pr-4">
                <span className="text-[11px] font-semibold tracking-[0.2em] text-slate-300">
                  {project.index}
                </span>
              </div>

              {/* Left: copy */}
              <div className="py-8 lg:pr-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-indigo-600 border border-indigo-100 bg-indigo-50 px-2.5 py-1">
                    {project.category}
                  </span>
                  <span className="w-1 h-1 bg-slate-300" aria-hidden="true" />
                  <span className="text-[11px] font-medium text-slate-400">
                    {project.client}
                  </span>
                </div>
                <h3
                  className="font-black tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors duration-200"
                  style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)" }}
                >
                  {project.title}
                </h3>
                <p className="text-sm font-black text-slate-400 mt-3 tracking-[0.1em] uppercase">
                  {project.metric}
                </p>
              </div>

              {/* Vertical rule */}
              <div className="hidden lg:block bg-slate-200 self-stretch" />

              {/* Right: image */}
              <div className="hidden lg:block relative overflow-hidden border-l-0 self-stretch min-h-[180px]">
                <Image
                  src={project.image}
                  alt={`${project.client} – ${project.title}`}
                  fill
                  sizes="(max-width: 1024px) 0px, 340px"
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-slate-900/10 transition-colors duration-500" />
                {/* Arrow link overlay */}
                <Link
                  href="/portfolio"
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-4 right-4 w-9 h-9 bg-white border border-slate-200 flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10"
                  aria-label={`${project.title} ansehen`}
                >
                  <ArrowUpRight size={18} className="text-slate-900" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="py-10"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 px-7 py-3.5 font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:text-slate-900 transition-colors duration-200"
          >
            Alle Projekte ansehen
            <ArrowRight size={16} className="text-slate-400" aria-hidden="true" />
          </Link>
        </motion.div>

      </div>
    </section>
  );
};
