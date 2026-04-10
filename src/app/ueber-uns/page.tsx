export const metadata = {
  title: "Über uns | MedienTrupp",
  description: "Wir bauen digitale Systeme für den deutschen Mittelstand.",
};

export default function UeberUnsPage() {
  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        <div className="mb-16">
          <p className="text-sm font-bold tracking-widest uppercase text-indigo-600 mb-4">
            Über MedienTrupp
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-8">
            Wir bauen Systeme, <br/>die <span className="text-indigo-600">gewinnen.</span>
          </h1>
          <div className="prose prose-lg prose-slate max-w-none text-slate-600 space-y-6">
            <p>
              Willkommen bei MedienTrupp. Wir sind nicht einfach nur eine Agentur, die bunte Bilder malt. Wir verstehen uns als Ihre digitale Taskforce für messbares Wachstum.
            </p>
            <p>
              In einer Zeit, in der digitale Sichtbarkeit über den Markterfolg entscheidet, reicht "schön" nicht mehr aus. Es bedarf technischer Exzellenz, psychologischem Kopfwissen und effizienter Automatisierung, um Interessenten in Kunden zu verwandeln. 
            </p>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-16">
          <h2 className="text-2xl font-black text-slate-900 mb-8">Unsere Kernwerte</h2>
          
          <ul className="space-y-8">
            <li className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-900 shrink-0">1</div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Extreme Umsetzungsgeschwindigkeit</h3>
                <p className="text-slate-600">Keine endlosen Abstimmungs-Loops. Wir liefern High-End Ergebnisse in Wochen, nicht in Monaten.</p>
              </div>
            </li>
            
            <li className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-900 shrink-0">2</div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Next.js & Edge Network statt WordPress-Chaos</h3>
                <p className="text-slate-600">Wir setzen auf die modernsten, schnellsten und sichersten Technologien am Markt, um Performance-Vorteile zu sichern.</p>
              </div>
            </li>

            <li className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-black text-slate-900 shrink-0">3</div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Transparente Festpreise</h3>
                <p className="text-slate-600">Keine bösen Überraschungen oder Nachfakturiererei. Sie wissen ab Tag 1, was Sie investieren.</p>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </main>
  );
}
