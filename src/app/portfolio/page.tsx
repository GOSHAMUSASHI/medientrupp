import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";

export const metadata = {
  title: "Portfolio | Medientrupp",
  description: "Erfolgreiche High-Performance Web & KI Projekte.",
};

export default function PortfolioPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6">
            Portfolio <span className="text-indigo-600">Cases</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Hier werden in Zukunft detaillierte Case Studies und Echtwelt-Zahlen unserer Kundenprojekte veröffentlicht.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
