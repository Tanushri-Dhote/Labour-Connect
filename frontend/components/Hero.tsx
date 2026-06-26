"use client";

import React from "react";
import { ArrowRight, Eye, ShieldCheck, CheckCircle2, Star, Sparkles, MapPin } from "lucide-react";

interface HeroProps {
  lang: "hi" | "en";
}

export function Hero({ lang }: HeroProps) {
  const t = {
    hi: {
      heroBadge: "100% मुफ्त • सीधा संपर्क • 0% कमीशन",
      heroTitlePrefix: "काम",
      heroTitleHighlight1: "की तलाश",
      heroTitleMid: "अब और भी",
      heroTitleHighlight2: "आसान",
      heroSubtitle: "राज मिस्त्री, पेंटर, प्लंबर और बढ़ई को सीधे मकान मालिकों से जोड़ने वाला भारत का सबसे भरोसेमंद ऐप। बिना किसी कमीशन या बिचौलिए के सीधे संपर्क करें।",
      ctaWorker: "मैं Labour हूँ (काम पाएं)",
      ctaEmployer: "मुझे Labour चाहिए (काम दें)",
      statsWorkers: "50,000+ पंजीकृत कामगार",
      statsCommission: "0% कमीशन (बिचौलिया मुक्त)",
      statsCities: "50+ शहरों में उपलब्ध",
      statsRating: "4.7★ यूजर रेटिंग"
    },
    en: {
      heroBadge: "100% Free • Direct Contact • 0% Commission",
      heroTitlePrefix: "Where",
      heroTitleHighlight1: "Workers",
      heroTitleMid: "Click &",
      heroTitleHighlight2: "Careers",
      heroTitleSuffix: "Soar",
      heroSubtitle: "Connecting Masons, Painters, Plumbers, and Carpenters directly with Homeowners & Contractors. Get direct calls with 0% middleman commission.",
      ctaWorker: "I am a Worker (Get Work)",
      ctaEmployer: "I Need a Worker (Give Work)",
      statsWorkers: "50,000+ Registered Workers",
      statsCommission: "0% Commission (Direct)",
      statsCities: "Available in 50+ Cities",
      statsRating: "4.7★ User Rating"
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#FAF8F5] text-zinc-900 pt-20 pb-28 border-b-2 border-black">
      
      {/* Decorative Neo-brutalist geometric shapes in background */}
      <div className="absolute top-12 left-10 h-16 w-16 bg-amber-400 border-2 border-black rounded-full shadow-[2px_2px_0px_0px_#000] -rotate-12 hidden md:flex items-center justify-center font-bold text-xs select-none">
        FREE!
      </div>
      <div className="absolute bottom-12 right-10 h-12 w-28 bg-[#38bdf8] border-2 border-black shadow-[3px_3px_0px_0px_#000] rotate-6 hidden md:flex items-center justify-center font-black text-xs text-white uppercase tracking-wider select-none">
        No Fees
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Left Hero Details */}
          <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            
            {/* Neo-brutalist Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-md border-2 border-black bg-emerald-50 px-4 py-1.5 text-xs font-black text-emerald-800 shadow-[2px_2px_0px_0px_#000] dark:bg-emerald-950/20 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-700" />
              {t[lang].heroBadge}
            </span>

            {/* Title: Big, Chunky, Playful */}
            <h1 className="mt-8 text-5xl font-black tracking-tight sm:text-6xl lg:text-7.5xl leading-tight font-heading text-zinc-950">
              {lang === "hi" ? (
                <>
                  <span className="text-brand-green">{t[lang].heroTitlePrefix}</span>{" "}
                  {t[lang].heroTitleHighlight1}{" "}
                  <span className="block sm:inline">{t[lang].heroTitleMid}</span>{" "}
                  <span className="text-brand-green">{t[lang].heroTitleHighlight2}</span>
                </>
              ) : (
                <>
                  {t[lang].heroTitlePrefix}{" "}
                  <span className="text-brand-green">{t[lang].heroTitleHighlight1}</span>{" "}
                  <span className="block sm:inline">{t[lang].heroTitleMid}</span>{" "}
                  <span className="text-brand-green">{t[lang].heroTitleHighlight2}</span>{" "}
                  <span className="text-zinc-950">{t[lang].heroTitleSuffix}</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-2xl text-base sm:text-lg text-zinc-700 font-bold leading-relaxed">
              {t[lang].heroSubtitle}
            </p>

            {/* Neo-brutalist Buttons (Solid black border, solid offset black shadow) */}
            <div className="mt-8 flex w-full flex-col gap-5 sm:flex-row sm:justify-center lg:justify-start">
              <a 
                href="/register" 
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green hover:bg-brand-green-hover px-7 py-4 text-base font-black text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
              >
                <span>{t[lang].ctaWorker}</span>
                <ArrowRight className="h-5 w-5" />
              </a>

              <a 
                href="#explore" 
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-base font-black text-zinc-950 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
              >
                <span>{t[lang].ctaEmployer}</span>
                <Eye className="h-5 w-5 text-brand-green" />
              </a>
            </div>

            {/* Stepper info underneath hero */}
            <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-4 text-left border-t-2 border-black pt-8 w-full max-w-lg">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-brand-green shrink-0" />
                <span className="text-sm font-extrabold text-zinc-800">{t[lang].statsWorkers}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-brand-green shrink-0" />
                <span className="text-sm font-extrabold text-zinc-800">{t[lang].statsCommission}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-brand-green shrink-0" />
                <span className="text-sm font-extrabold text-zinc-800">{t[lang].statsCities}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-5 w-5 text-brand-green shrink-0" />
                <span className="text-sm font-extrabold text-zinc-800">{t[lang].statsRating}</span>
              </div>
            </div>
          </div>

          {/* Right Hero Column: Neo-brutalist layered cards & stickers */}
          <div className="lg:col-span-5 flex justify-center relative mt-10 lg:mt-0">
            
            {/* Tilted main worker card with solid black border & offset shadow */}
            <div className="relative h-[430px] w-[310px] rounded-3xl border-2 border-black bg-white p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[-3deg] hover:rotate-0 transition-transform duration-300 z-10">
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-zinc-100 border-2 border-black">
                <img 
                  src="/hero_worker.png" 
                  alt="LabourConnect Worker" 
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-x-0 bottom-0 bg-white border-t-2 border-black p-4 text-center">
                  <h4 className="text-base font-extrabold text-zinc-950">राजेश कुमार (मिस्त्री)</h4>
                  <p className="text-[11px] text-zinc-650 font-bold mt-0.5">9 वर्ष अनुभव • सीकर, राजस्थान</p>
                </div>
              </div>
            </div>

            {/* Overlapping secondary card (Salim Khan) */}
            <div className="absolute -bottom-6 -left-6 z-20 rounded-2xl border-2 border-black bg-amber-350 p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 rotate-[4deg] max-w-[210px] bg-amber-400">
              <div className="h-9 w-9 rounded-full border-2 border-black bg-white flex items-center justify-center font-bold text-xs shrink-0">
                SK
              </div>
              <div className="min-w-0">
                <h5 className="text-xs font-black text-zinc-950 truncate">सलीम खान</h5>
                <p className="text-[9px] font-bold text-zinc-800 flex items-center gap-0.5 mt-0.5">
                  <MapPin className="h-3 w-3" /> सीकर • प्लंबर
                </p>
              </div>
            </div>

            {/* Playful CSS sticker: starburst "POWER UP" */}
            <div className="absolute -top-8 -right-4 z-20 h-20 w-20 bg-lime-400 border-2 border-black rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center rotate-[15deg] select-none">
              <Sparkles className="h-4.5 w-4.5 text-zinc-900 fill-zinc-900" />
              <span className="text-[9px] font-black uppercase text-zinc-900 leading-tight mt-0.5">100% FREE</span>
            </div>

            {/* Playful CSS sticker: "THE FUTURE" banner */}
            <div className="absolute bottom-1/3 -right-12 z-20 rounded-md border-2 border-black bg-[#4f46e5] text-white px-3.5 py-1 text-xs font-black uppercase tracking-wider rotate-[-10deg] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              No Broker
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
