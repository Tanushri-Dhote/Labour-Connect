"use client";

import React from "react";

interface TrustBarProps {
  lang: "hi" | "en";
}

export function TrustBar({ lang }: TrustBarProps) {
  return (
    <section className="border-b-2 border-black py-8 bg-amber-100 dark:bg-[#1c180e]">
      <div className="mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 text-zinc-950 font-black text-sm">
        <span className="text-zinc-900 dark:text-zinc-200 uppercase tracking-widest text-xs font-black">
          {lang === "hi" ? "सत्यापित एवं स्वीकृत" : "TRUSTED BY LOCAL BUILDERS"}
        </span>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 font-extrabold text-zinc-950 dark:text-zinc-100">
          <span className="text-lg font-black tracking-tight">सीकर बिल्डर्स संघ</span>
          <span className="text-lg font-black italic">Jaipur Devs</span>
          <span className="text-lg font-black tracking-tight">Rajasthan RERA</span>
          <span className="text-lg font-black tracking-tight">L&T Subcontractors</span>
        </div>
      </div>
    </section>
  );
}
