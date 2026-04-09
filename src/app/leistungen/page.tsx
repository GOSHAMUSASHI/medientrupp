import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";

export const metadata = {
  title: "Leistungen | Medientrupp",
  description: "Unsere kompletten Agentur-Dienstleistungen im Überblick.",
};

export default function LeistungenPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6">
            Unsere <span className="text-indigo-600">Leistungen</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Von Markenstrategie über High-End Webentwicklung bis hin zu KI & Automatisierung - hier finden Sie bald alle Details.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
