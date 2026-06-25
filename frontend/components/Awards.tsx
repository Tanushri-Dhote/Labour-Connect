"use client";

import React from "react";
import { Award } from "lucide-react";

interface AwardsProps {
  lang: "hi" | "en";
}

export function Awards({ lang }: AwardsProps) {
  return (
    <section className="bg-brand-green py-10 border-y-2 border-black text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-3">
          <Award className="h-9 w-9 text-lime-300 shrink-0" />
          <h4 className="text-md font-black tracking-wide uppercase font-heading">
            {lang === "hi" ? "सफलता और विश्वसनीयता" : "AWARDS & TRUST RECOGNITION"}
          </h4>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-12 text-center font-bold">
          <div className="flex flex-col items-center">
            <span className="text-xl font-black text-lime-300 font-heading">Top Social App 2026</span>
            <span className="text-[10px] text-emerald-100 font-bold uppercase">India Impact Awards</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-xl font-black text-lime-300 font-heading">100% Safe App</span>
            <span className="text-[10px] text-emerald-100 font-bold uppercase">CyberTrust Certified</span>
          </div>
          <div className="col-span-2 md:col-span-1 flex flex-col items-center">
            <span className="text-xl font-black text-lime-300 font-heading">Zero Middlemen</span>
            <span className="text-[10px] text-emerald-100 font-bold uppercase">Verified Direct Platform</span>
          </div>
        </div>
      </div>
    </section>
  );
}
