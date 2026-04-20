"use client";

import { useState } from "react";
import { ArrowRight, Mail, Phone, MapPin, CheckCircle2 } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const SiteFooter = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (pathname === "/projekt-anfragen" || pathname === "/anfragen") {
    return null;
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: wire to email provider (Mailchimp / ConvertKit)
    setSubmitted(true);
  };

  return (
    <footer className="bg-white text-slate-600 pt-20 pb-10 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand & Contact */}
          <div className="col-span-1 lg:col-span-1">
            {/* Logo */}
            <Link href="/" className="inline-flex items-center gap-2 mb-5">
              <span className="font-black text-xl tracking-tight">
                <span className="text-slate-900">Medien</span>
                <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                  Trupp
                </span>
              </span>
            </Link>

            <p className="text-sm text-slate-500 mb-6 leading-relaxed">
              Digitale Systeme für den deutschen Mittelstand. Performance, Automatisierung und Design aus einer Hand — zu transparenten Festpreisen.
            </p>

            <div className="flex flex-col gap-3 text-sm mb-6">
              <a
                href="mailto:impact@medientrupp.de"
                className="flex items-center gap-3 hover:text-slate-900 transition-colors group"
              >
                <Mail size={15} className="text-indigo-600 flex-shrink-0" />
                <span className="group-hover:text-indigo-600 transition-colors">impact@medientrupp.de</span>
              </a>
              <a
                href="tel:+4917612345678"
                className="flex items-center gap-3 hover:text-slate-900 transition-colors group"
              >
                <Phone size={15} className="text-indigo-600 flex-shrink-0" />
                <span className="group-hover:text-indigo-600 transition-colors">+49 176 12345678</span>
              </a>
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                <span className="text-slate-500 leading-snug">Gummersbach, NRW<br />51643 Deutschland</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/company/medientrupp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Medientrupp auf LinkedIn"
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/medientrupp"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Medientrupp auf Instagram"
                className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-colors"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-slate-900 font-bold mb-5 text-sm uppercase tracking-wider">Agentur</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/ueber-uns" className="hover:text-indigo-600 transition-colors">
                  Über uns
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-indigo-600 transition-colors">
                  Portfolio & Cases
                </Link>
              </li>
              <li>
                <Link href="/leistungen" className="hover:text-indigo-600 transition-colors">
                  Leistungen & Preise
                </Link>
              </li>
              <li>
                <Link href="/ueber-uns" className="hover:text-indigo-600 transition-colors">
                  Karriere
                </Link>
              </li>
              <li>
                <Link
                  href="/projekt-anfragen"
                  className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                >
                  Projekt berechnen →
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-slate-900 font-bold mb-5 text-sm uppercase tracking-wider">Leistungen</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <Link href="/leistungen" className="hover:text-indigo-600 transition-colors">
                  Marke & Design
                </Link>
              </li>
              <li>
                <Link href="/leistungen" className="hover:text-indigo-600 transition-colors">
                  Websites & Portale
                </Link>
              </li>
              <li>
                <Link href="/leistungen" className="hover:text-indigo-600 transition-colors">
                  KI & Automatisierung
                </Link>
              </li>
              <li>
                <Link href="/leistungen" className="hover:text-indigo-600 transition-colors">
                  Video & Social Media
                </Link>
              </li>
              <li>
                <Link href="/leistungen" className="hover:text-indigo-600 transition-colors">
                  Laufende Betreuung
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-slate-900 font-bold mb-2 text-sm uppercase tracking-wider">Digital Update</h4>
            <p className="text-sm text-slate-500 mb-4 leading-relaxed">
              Einmal im Monat: konkrete Tipps, um als Mittelständler digital Zeit und Geld zu sparen. Kein Spam.
            </p>

            {submitted ? (
              <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3">
                <CheckCircle2 size={16} />
                Danke! Sie erhalten eine Bestätigungs-E-Mail.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ihre E-Mail-Adresse"
                  required
                  className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 text-slate-900 placeholder:text-slate-400 transition-all"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  Abonnieren
                  <ArrowRight size={15} />
                </button>
              </form>
            )}

            <p className="text-[11px] text-slate-400 mt-3 leading-relaxed">
              Kein Spam. Jederzeit abmeldbar. DSGVO-konform.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} Medientrupp — Digitalagentur Gummersbach, NRW. Alle Rechte vorbehalten.
          </div>
          <div className="flex gap-5">
            <Link href="/impressum" className="hover:text-slate-700 transition-colors">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-slate-700 transition-colors">Datenschutz</Link>
            <Link href="/agb" className="hover:text-slate-700 transition-colors">AGB</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};
