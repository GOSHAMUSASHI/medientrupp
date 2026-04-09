import { SiteHeader } from "@/components/ui/SiteHeader";
import { SiteFooter } from "@/components/ui/SiteFooter";

export const metadata = {
  title: "Über Uns | Medientrupp",
  description: "Das Team hinter dem Medientrupp und unsere Philosophie.",
};

export default function UeberUnsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-32 pb-24 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-6">
            Das <span className="text-indigo-600">Team</span>
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Lernen Sie die Experten kennen, die jeden Tag an der Spitze der technischen Innovation arbeiten, um Ihr Business zu skalieren.
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
