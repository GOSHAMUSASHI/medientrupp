import { PenTool, Laptop, Zap, Video, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Leistungen | MedienTrupp",
  description: "Unsere Kernleistungen für Ihr digitales Wachstum.",
};

const services = [
  {
    title: "Marke & Design (Ihr erster Eindruck)",
    text: "Wir optimieren Ihre bestehende Marke oder entwickeln eine komplett neue. Sie heben sich sofort ab.",
    icon: <PenTool size={32} className="text-indigo-600" />,
  },
  {
    title: "Website und digitales Auftreten",
    text: "Schnelle, optimierte Website (bis zu 5 Unterseiten). Inklusive verkaufspsychologischer Texte und SEO.",
    icon: <Laptop size={32} className="text-indigo-600" />,
  },
  {
    title: "KI-Systeme & Automatisierungen",
    text: "Automatisierte Lead-Erfassung, 24/7 Chatbot und automatische Bewertungs-Maschine.",
    icon: <Zap size={32} className="text-indigo-600" />,
  },
  {
    title: "Social Media & Videoproduktion",
    text: "Management, Strategie und Produktion von Short-Form Content / Imagefilmen.",
    icon: <Video size={32} className="text-indigo-600" />,
  },
  {
    title: "Laufende Betreuung & Sicherheit",
    text: "Sicheres Hosting, Wartung und lokales Google SEO.",
    icon: <ShieldCheck size={32} className="text-indigo-600" />,
  },
];

export default function LeistungenPage() {
  return (
    <main className="min-h-screen bg-slate-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-6">
            Unsere <span className="text-indigo-600">Leistungen</span>
          </h1>
          <p className="text-lg text-slate-600">
            Wir bauen keine einfachen Websites – wir bauen digitale Systeme, die Ihnen mehr Zeit verschaffen und neue Kunden generieren.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s, i) => (
            <div 
              key={i}
              className={`bg-white rounded-xl border border-slate-200 p-8 shadow-sm hover:shadow-lg transition-all ${
                i === 4 ? "md:col-span-2 md:max-w-xl md:mx-auto w-full" : ""
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center mb-6">
                {s.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{s.title}</h3>
              <p className="text-slate-600 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
