"use client";

import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export const SiteFooter = () => {
  return (
    <footer className="bg-white text-slate-600 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand & Info */}
          <div className="col-span-1 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center">
                <span className="text-white font-black text-sm">MT</span>
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Medientrupp
              </span>
            </a>
            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Digitale Systeme für den deutschen Mittelstand. Performance, Automatisierung und Design aus einer Hand.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-indigo-600" />
                <a href="mailto:hallo@medientrupp.de" className="hover:text-slate-900 transition-colors">hallo@medientrupp.de</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-indigo-600" />
                <a href="tel:+49123456789" className="hover:text-slate-900 transition-colors">+49 (0) 123 456 789</a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={16} className="text-indigo-600" />
                <span>Musterstraße 12, 12345 Berlin</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Agentur</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Über uns</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Portfolio & Cases</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Unser Prozess</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Karriere</a></li>
              <li><a href="#konfigurator" className="hover:text-indigo-600 transition-colors font-semibold text-slate-900">Projekt berechnen</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Leistungen</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Marke & Design</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Websites & Portale</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">KI & Automatisierung</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Video & Social Media</a></li>
              <li><a href="#" className="hover:text-indigo-600 transition-colors">Laufende Betreuung</a></li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h4 className="text-slate-900 font-bold mb-6">Digital Update</h4>
            <p className="text-sm text-slate-500 mb-4">
              Einmal im Monat konkrete Tipps, um als Mittelständler digital Zeit und Geld zu sparen. Ohne Bullshit.
            </p>
            <form className="flex flex-col gap-3">
              <input 
                type="email" 
                placeholder="E-Mail Adresse" 
                className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-indigo-600 text-slate-900"
                required
              />
              <button 
                type="button"
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors"
              >
                Kostenlos abonnieren <ArrowRight size={16} />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} Medientrupp. Alle Rechte vorbehalten.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-900 transition-colors">Impressum</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-slate-900 transition-colors">AGB</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
