"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Web-Relaunch & B2B Lead Gen",
    client: "Schmid Maschinenbau",
    category: "High-Performance Web",
    metric: "3,5× mehr Anfragen",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop", 
  },
  {
    title: "Support Automation 24/7",
    client: "Baumann Logistik",
    category: "SaaS & Automation",
    metric: "-65% Support-Kosten",
    image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=800&auto=format&fit=crop", 
  },
  {
    title: "Employer Branding Hub",
    client: "Kaiser Pflege & Gesundheit",
    category: "Funnel & Brand",
    metric: "42 neue Bewerber/Mo",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop", 
  }
];

export const ProjectTeaser = () => {
  return (
    <section className="bg-slate-50 py-24 lg:py-32" aria-labelledby="projects-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
              Erfolgsgeschichten
            </p>
            <h2 id="projects-heading" className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Wir bauen Systeme, <br />die <span className="text-indigo-600">gewinnen.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/portfolio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
            >
              Alle Cases ansehen
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="group cursor-pointer"
            >
              <div 
                className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-lg shadow-slate-200 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-indigo-500/20 group-hover:-translate-y-2 bg-slate-200"
              >
                {/* Real Image Placeholder */}
                <Image 
                  src={project.image}
                  alt={project.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-105"
                  unoptimized
                />
                
                {/* Image Placeholder Overlay */}
                <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors duration-500" />
                
                {/* Metric Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-lg font-black text-sm text-indigo-600 uppercase tracking-widest shadow-sm">
                  {project.metric}
                </div>

                <div className="absolute top-4 right-4 w-10 h-10 bg-white text-slate-900 rounded-full flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-lg">
                  <ArrowUpRight size={20} />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {project.category}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  <span className="text-xs font-medium text-slate-500">
                    {project.client}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
