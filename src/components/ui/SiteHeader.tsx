"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SiteHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Leistungen", href: "/leistungen" },
    { label: "Portfolio",  href: "/portfolio" },
    { label: "Über uns",   href: "/ueber-uns" },
  ];

  if (pathname === "/projekt-anfragen" || pathname === "/anfragen") {
    return null;
  }

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white border-b border-slate-200 py-3"
            : "bg-transparent py-5"
        }`}
        style={{ willChange: "background, box-shadow" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/*
            Mobile : flex + justify-between  → [Logo ── MobileToggle]
            Desktop: 3-column grid [1fr auto 1fr] → [Logo | Menu (centered) | CTA]
            Grid mit [1fr_auto_1fr] garantiert dass das Menü exakt mittig ist,
            unabhängig von Logo- oder CTA-Breite.
          */}
          <div className="flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:gap-6">

            {/* ── Logo (links) ── */}
            <Link
              href="/"
              id="site-logo"
              className="flex items-center gap-2 group md:justify-self-start"
            >
              {/* Animated dot accent */}
              <span
                className="w-2 h-2 bg-indigo-600 group-hover:scale-125 transition-transform duration-300"
                aria-hidden="true"
              />
              <span className="font-black text-[1.35rem] tracking-tight leading-none">
                <span className="text-indigo-600">Medien</span>
                <span className="text-slate-900">Trupp</span>
              </span>
            </Link>

            {/* ── Desktop Nav (mittig) ── */}
            <nav
              className="hidden md:flex items-center gap-7 md:justify-self-center"
              aria-label="Hauptnavigation"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`relative text-sm font-medium transition-colors duration-200 group/nav pb-0.5 ${
                      isActive ? "text-indigo-600" : "text-slate-600 hover:text-indigo-600"
                    }`}
                  >
                    {link.label}
                    {/* Active / hover underline */}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-[2px] bg-indigo-600 transition-all duration-300 ${
                        isActive
                          ? "w-full opacity-100"
                          : "w-0 opacity-0 group-hover/nav:w-full group-hover/nav:opacity-100"
                      }`}
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </nav>

            {/* ── Desktop CTA (rechts) ── */}
            <Link
              href="/projekt-anfragen"
              id="header-cta"
              className="hidden md:inline-flex btn-glow items-center gap-2 px-5 py-2.5 text-sm md:justify-self-end group"
            >
              Projekt anfragen
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>

            {/* ── Mobile Toggle ── */}
            <button
              id="mobile-menu-toggle"
              className="md:hidden p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menü öffnen"
              aria-expanded={mobileMenuOpen}
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Overlay ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-overlay"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-white md:hidden"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <Link
                href="/"
                id="mobile-logo"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-indigo-600" />
                <span className="font-black text-xl tracking-tight">
                  <span className="text-indigo-600">Medien</span>
                  <span className="text-slate-900">Trupp</span>
                </span>
              </Link>
              <button
                className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Menü schließen"
              >
                <X size={22} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col gap-1 p-6 flex-1" aria-label="Mobile Navigation">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i, ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block text-2xl font-medium py-3 border-b border-slate-100 transition-colors duration-200 ${
                        isActive ? "text-indigo-600" : "text-slate-900 hover:text-indigo-600"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Mobile CTA */}
            <div className="p-6 pt-0">
              <Link
                href="/projekt-anfragen"
                id="mobile-cta"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-glow flex items-center justify-center gap-2 w-full py-4 text-base"
              >
                Projekt anfragen
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
