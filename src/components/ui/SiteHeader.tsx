"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Leistungen", href: "/leistungen" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Über uns", href: "/ueber-uns" },
  ];

  if (pathname === "/projekt-anfragen" || pathname === "/anfragen") {
    return null;
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo (Text-Based Premium Concept) */}
          <Link href="/" className="flex items-center">
            <span className="font-black text-2xl tracking-tight text-indigo-600">
              Medien<span className="text-slate-900">Trupp</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/projekt-anfragen"
              className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-md hover:bg-indigo-700 transition-colors"
            >
              Projekt anfragen
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Menü öffnen"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-white md:hidden flex flex-col"
          >
            <div className="flex items-center justify-between p-6">
              {/* Mobile Logo */}
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center">
                <span className="font-black text-2xl tracking-tight text-indigo-600">
                  Medien<span className="text-slate-900">Trupp</span>
                </span>
              </Link>
              <button
                className="p-2 text-slate-600"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Menü schließen"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="flex flex-col gap-6 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-black text-slate-900 hover:text-indigo-600 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-8">
                <Link
                  href="/projekt-anfragen"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-4 bg-indigo-600 text-white text-lg font-bold rounded-md hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
                >
                  Projekt anfragen
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
