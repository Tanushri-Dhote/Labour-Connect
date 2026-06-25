"use client";

import React from "react";

interface FooterProps {
  lang: "hi" | "en";
}

export function Footer({ lang }: FooterProps) {
  const t = {
    hi: {
      footerDesc: "लेबर-कनेक्ट भारत के स्थानीय कामगारों को सशक्त बनाने और डिजिटल रूप से जोड़ने का एक सामाजिक प्रयास है।",
      footerCopyright: "© 2026 लेबर-कनेक्ट। सर्वाधिकार सुरक्षित।"
    },
    en: {
      footerDesc: "LabourConnect is a social initiative to digitally empower and connect local workers across India.",
      footerCopyright: "© 2026 LabourConnect. All rights reserved."
    }
  };

  return (
    <footer className="bg-[#FAF8F5] py-12 border-t-2 border-black dark:bg-[#11100e] text-zinc-950 dark:text-zinc-55">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b-2 border-black pb-8">
          {/* Brand & description */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-md">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-green text-white font-extrabold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                LC
              </div>
              <span className="text-lg font-black text-zinc-950 dark:text-white font-heading">
                Labour<span className="text-brand-green">Connect</span>
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {t[lang].footerDesc}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
            <div className="flex flex-wrap justify-center gap-6 text-xs font-bold text-zinc-600 dark:text-zinc-400">
              <a href="#features" className="hover:text-brand-green">FAQ</a>
              <a href="#how-it-works" className="hover:text-brand-green">Terms of Service</a>
              <a href="#explore" className="hover:text-brand-green">Privacy Policy</a>
              <a href="#faq" className="hover:text-brand-green">Contact Us</a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & socials */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-[11px] font-semibold text-zinc-400 dark:text-zinc-600">
          <p>{t[lang].footerCopyright}</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Facebook</a>
            <span>•</span>
            <a href="#" className="hover:underline">WhatsApp Group</a>
            <span>•</span>
            <a href="#" className="hover:underline">YouTube channel</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
