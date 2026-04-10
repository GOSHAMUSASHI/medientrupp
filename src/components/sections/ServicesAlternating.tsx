"use client";

import { PenTool, Laptop, Zap, Video, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";

const services = [
  {
    icon: <PenTool size={32} />,
    title: "Marke & Design",
    benefit: "Ihr erster Eindruck",
    action: "Wir optimieren Ihre bestehende Marke oder entwickeln eine komplett neue Identität.",
    result: "Sie heben sich sofort ab und strahlen Autorität aus.",
    img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: <Laptop size={32} />,
    title: "Website und digitales Auftreten",
    benefit: "Ihr 24/7 Schaufenster",
    action: "Schnelle, optimierte Website (bis zu 5 Unterseiten). Inklusive verkaufspsychologischer Texte und SEO.",
    result: "Interessenten konvertieren messbar besser in Leads.",
    img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: <Zap size={32} />,
    title: "KI-Systeme & Automatisierungen",
    benefit: "Mehr Zeit, weniger Fehler",
    action: "Automatisierte Lead-Erfassung, 24/7 Chatbot und automatische Bewertungs-Maschine.",
    result: "Sie gewinnen Stunden in der Woche zurück.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: <Video size={32} />,
    title: "Social Media & Videoproduktion",
    benefit: "Sichtbarkeit die bleibt",
    action: "Management, Strategie und Produktion von Short-Form Content / Imagefilmen.",
    result: "Artgerechte Präsentation auf allen digitalen Kanälen.",
    img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: <ShieldCheck size={32} />,
    title: "Laufende Betreuung",
    benefit: "Rundum-Sorglos Paket",
    action: "Sicheres Hosting, Wartung und lokales Google SEO.",
    result: "Technik, die im Hintergrund einfach fehlerfrei läuft.",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=800&auto=format&fit=crop",
  },
];

export const ServicesAlternating = () => {
  return (
    <section className="bg-white py-24 sm:py-32" aria-labelledby="services-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-20">
          <p className="text-xs font-black tracking-[0.2em] uppercase text-indigo-600 mb-3">
            Unsere Kernleistungen
          </p>
          <h2 id="services-heading" className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Bausteine für echte <span className="text-indigo-600">Skalierung.</span>
          </h2>
        </div>

        <div className="flex flex-col gap-16 lg:gap-24">
          {services.map((srv, i) => (
            <div key={i} className="flex flex-col md:flex-row items-center gap-8 lg:gap-16">
              {/* Image Left */}
              <div className="w-full md:w-[45%] lg:w-1/3 relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl shadow-slate-200">
                <Image 
                  src={srv.img}
                  alt={srv.title}
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
                <div className="absolute inset-0 bg-indigo-900/10" />
              </div>
              
              {/* Text Right */}
              <div className="w-full md:w-[55%] lg:w-2/3">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                    {srv.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">{srv.title}</h3>
                    <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mt-1">{srv.benefit}</p>
                  </div>
                </div>
                
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 mb-2 block">Was wir machen</span>
                  <p className="text-slate-700 leading-relaxed font-medium">{srv.action}</p>
                </div>
                
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100">
                  <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2 block">Ihr konkreter Nutzen</span>
                  <p className="text-emerald-900 leading-relaxed font-bold">{srv.result}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <a
            href="/leistungen"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
          >
            Alle Leistungen ansehen
            <ArrowRight size={20} className="text-indigo-500" />
          </a>
        </div>

      </div>
    </section>
  );
};
