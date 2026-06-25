"use client";

import React, { useState } from "react";
import { Download, Menu, X } from "lucide-react";

interface HeaderProps {
  lang: "hi" | "en";
  setLang: (lang: "hi" | "en") => void;
}

export function Header({ lang, setLang }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    hi: {
      features: "विशेषताएं",
      howItWorks: "कैसे काम करता है",
      explore: "कामगार खोजें",
      faq: "अक्सर पूछे जाने वाले प्रश्न",
      downloadApp: "ऐप डाउनलोड करें"
    },
    en: {
      features: "Features",
      howItWorks: "How It Works",
      explore: "Find Workers",
      faq: "FAQs",
      downloadApp: "Download App"
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-100 bg-white/80 backdrop-blur-md dark:border-zinc-900/60 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-7xl h-20 items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green text-white shadow-md shadow-emerald-500/10">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="text-xl font-black font-heading tracking-tight text-zinc-900 dark:text-white">
            Labour<span className="text-brand-green">Connect</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-base font-bold text-zinc-600 hover:text-brand-green dark:text-zinc-400 dark:hover:text-white transition-colors">
            {t[lang].features}
          </a>
          <a href="#how-it-works" className="text-base font-bold text-zinc-600 hover:text-brand-green dark:text-zinc-400 dark:hover:text-white transition-colors">
            {t[lang].howItWorks}
          </a>
          <a href="#explore" className="text-base font-bold text-zinc-600 hover:text-brand-green dark:text-zinc-400 dark:hover:text-white transition-colors">
            {t[lang].explore}
          </a>
          <a href="#faq" className="text-base font-bold text-zinc-600 hover:text-brand-green dark:text-zinc-400 dark:hover:text-white transition-colors">
            {t[lang].faq}
          </a>
        </nav>

        {/* Right Action Controls */}
        <div className="flex items-center gap-4.5">
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "hi" ? "en" : "hi")}
            className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-base font-black text-zinc-700 shadow-2xs hover:bg-zinc-50 cursor-pointer dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            🌐 {lang === "hi" ? "English" : "हिन्दी (Hindi)"}
          </button>

          {/* Download App button */}
          <a
            href="#download"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-brand-green px-5 py-2.5 text-base font-bold text-white shadow-sm hover:bg-brand-green-hover transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>{t[lang].downloadApp}</span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-full p-2 md:hidden hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-200"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-100 bg-white px-4 py-4 space-y-3 dark:border-zinc-800 dark:bg-zinc-950 animate-fade-in">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-bold text-zinc-700 hover:bg-zinc-50 hover:text-brand-green dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            {t[lang].features}
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-bold text-zinc-700 hover:bg-zinc-50 hover:text-brand-green dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            {t[lang].howItWorks}
          </a>
          <a
            href="#explore"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-bold text-zinc-700 hover:bg-zinc-50 hover:text-brand-green dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            {t[lang].explore}
          </a>
          <a
            href="#faq"
            onClick={() => setMobileMenuOpen(false)}
            className="block rounded-lg px-3 py-2 text-base font-bold text-zinc-700 hover:bg-zinc-50 hover:text-brand-green dark:text-zinc-300 dark:hover:bg-zinc-900"
          >
            {t[lang].faq}
          </a>
          <a
            href="#download"
            onClick={() => setMobileMenuOpen(false)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-green py-2.5 text-center font-bold text-white"
          >
            <Download className="h-4.5 w-4.5" />
            <span>{t[lang].downloadApp}</span>
          </a>
        </div>
      )}
    </header>
  );
}
