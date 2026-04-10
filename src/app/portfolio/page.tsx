import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Portfolio | MedienTrupp",
  description: "Erfolgreiche Projekte und digitale Systeme.",
};

const cases = [
  {
    title: "Web-Relaunch & B2B Lead Gen",
    industry: "Schmid Maschinenbau",
    result: "3,5× mehr Anfragen",
  },
  {
    title: "Support Automation 24/7",
    industry: "Baumann Logistik",
    result: "-65% Support-Kosten",
  },
  {
    title: "Employer Branding Hub",
    industry: "Kaiser Pflege",
    result: "42 neue Bewerber/Mo",
  }
];

export default function PortfolioPage() {
  return (
    <main className="min-h-screen pt-32 flex flex-col">
      <div className="flex-1 bg-slate-50 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">
              Unser <span className="text-indigo-600">Portfolio</span>
            </h1>
            <p className="text-lg text-slate-600">
              Ein Auszug unserer erfolgreichen Systeme. Wir messen unseren Erfolg am messbaren Wachstum unserer Kunden.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cases.map((c, i) => (
              <div 
                key={i}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group cursor-pointer"
              >
                <div className="aspect-[4/3] bg-slate-200 relative overflow-hidden flex items-center justify-center">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Platzhalter Image</span>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">{c.industry}</span>
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                    {c.title}
                  </h3>
                  <div className="bg-emerald-50 rounded-lg py-2 px-3 inline-block">
                    <span className="text-sm font-bold text-emerald-700">{c.result}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bg-slate-900 text-white py-24 text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-black mb-6">Bereit für ähnliche Ergebnisse?</h2>
          <p className="text-slate-400 mb-10 text-lg">Lassen Sie uns gemeinsam Ihr digitales Fundament bauen.</p>
          <Link 
            href="/anfragen"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold bg-indigo-600 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 text-white"
          >
            Projekt anfragen <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
