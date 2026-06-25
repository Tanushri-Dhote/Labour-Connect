"use client";

import React from "react";
import { ArrowRight, ArrowUpRight, BookOpen, Calendar } from "lucide-react";

interface InsightsProps {
  lang: "hi" | "en";
}

export function Insights({ lang }: InsightsProps) {
  return (
    <section className="py-20 lg:py-28 bg-[#F6F4EE] border-b-2 border-black dark:bg-[#151412] text-zinc-955 dark:text-zinc-55">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b-2 border-black pb-8 dark:border-zinc-800">
          <div>
            <span className="text-xs uppercase font-black text-brand-green tracking-wider bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 border border-black rounded-md shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
              {lang === "hi" ? "जानकारी एवं सुझाव" : "LATEST GUIDES"}
            </span>
            <h2 className="text-5xl font-black font-heading tracking-tight text-zinc-950 dark:text-white mt-4 sm:text-6xl lg:text-7.5xl leading-tight">
              {lang === "hi" ? "लेबर-कनेक्ट ब्लॉग व समाचार" : "Latest Insights & Guides"}
            </h2>
          </div>
          <button className="inline-flex items-center gap-1.5 text-sm font-black text-zinc-950 bg-white border-2 border-black rounded-xl px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer dark:bg-zinc-900 dark:text-zinc-100">
            <span>{lang === "hi" ? "सारे आर्टिकल्स देखें" : "View All Insights"}</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>

        {/* Blog Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* Blog 1 */}
          <div className="group flex flex-col bg-white rounded-3xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:bg-zinc-950">
            <div className="h-48 bg-zinc-100 relative border-b-2 border-black">
              <div className="absolute inset-0 bg-zinc-900/10 dark:bg-zinc-955/20" />
              <span className="absolute top-4 left-4 rounded-md bg-emerald-50 border border-black text-brand-green text-[10px] font-black px-2 py-1 uppercase tracking-wider dark:bg-emerald-950/20 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">Hiring Guide</span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex gap-4 text-xs font-bold text-zinc-500 dark:text-zinc-500 mb-2">
                  <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> 5 Min Read</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> June 2026</span>
                </div>
                <h4 className="font-black text-base text-zinc-950 group-hover:text-brand-green transition-colors dark:text-white font-heading">
                  {lang === "hi" ? "मकान निर्माण के लिए सही राज मिस्त्री का चुनाव कैसे करें?" : "How to Hire the Right Mason for Your House Construction?"}
                </h4>
                <p className="mt-2 text-xs font-bold text-zinc-650 dark:text-zinc-400 leading-relaxed">
                  {lang === "hi" ? "मकान बनाते समय मिस्त्री का अनुभव, रेटिंग और काम करने के तरीकों की जांच करना महत्वपूर्ण है..." : "Learn about verifying experience, past project references, and rate comparisons..."}
                </p>
              </div>
              <button className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-zinc-950 hover:text-brand-green dark:text-zinc-200 dark:hover:text-brand-green">
                <span>Read Article</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Blog 2 */}
          <div className="group flex flex-col bg-white rounded-3xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:bg-zinc-950">
            <div className="h-48 bg-zinc-100 relative border-b-2 border-black">
              <div className="absolute inset-0 bg-zinc-900/10 dark:bg-zinc-955/20" />
              <span className="absolute top-4 left-4 rounded-md bg-emerald-50 border border-black text-brand-green text-[10px] font-black px-2 py-1 uppercase tracking-wider dark:bg-emerald-950/20 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">Wages Trends</span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex gap-4 text-xs font-bold text-zinc-500 dark:text-zinc-500 mb-2">
                  <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> 8 Min Read</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> June 2026</span>
                </div>
                <h4 className="font-black text-base text-zinc-955 group-hover:text-brand-green transition-colors dark:text-white font-heading">
                  {lang === "hi" ? "राजस्थान में दैनिक मजदूरी दर (2026) का विश्लेषण" : "Construction Wage Trends and Daily Rates in Rajasthan (2026)"}
                </h4>
                <p className="mt-2 text-xs font-bold text-zinc-655 dark:text-zinc-400 leading-relaxed">
                  {lang === "hi" ? "जयपुर, जोधपुर और सीकर जैसे प्रमुख क्षेत्रों में राज मिस्त्री और बेलदार की वर्तमान मजदूरी दरों का विवरण..." : "Compare hourly and daily wages for masons, painters, and helpers across cities..."}
                </p>
              </div>
              <button className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-zinc-950 hover:text-brand-green dark:text-zinc-200 dark:hover:text-brand-green">
                <span>Read Article</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Blog 3 */}
          <div className="group flex flex-col bg-white rounded-3xl border-2 border-black overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:bg-zinc-950">
            <div className="h-48 bg-zinc-100 relative border-b-2 border-black">
              <div className="absolute inset-0 bg-zinc-900/10 dark:bg-zinc-955/20" />
              <span className="absolute top-4 left-4 rounded-md bg-emerald-50 border border-black text-brand-green text-[10px] font-black px-2 py-1 uppercase tracking-wider dark:bg-emerald-950/20 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">Worker Safety</span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex gap-4 text-xs font-bold text-zinc-500 dark:text-zinc-500 mb-2">
                  <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> 4 Min Read</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> May 2026</span>
                </div>
                <h4 className="font-black text-base text-zinc-955 group-hover:text-brand-green transition-colors dark:text-white font-heading">
                  {lang === "hi" ? "निर्माण स्थलों पर सुरक्षा नियम और सावधानियां" : "On-Site Safety Protocols for Construction Workers"}
                </h4>
                <p className="mt-2 text-xs font-bold text-zinc-655 dark:text-zinc-400 leading-relaxed">
                  {lang === "hi" ? "ऊंचाई पर काम करते समय बेल्ट, हेलमेट और सुरक्षा किट का सही उपयोग कैसे करें..." : "Important rules regarding helmets, safety belts, and hazard identification on-site..."}
                </p>
              </div>
              <button className="mt-6 inline-flex items-center gap-1.5 text-xs font-black text-zinc-950 hover:text-brand-green dark:text-zinc-200 dark:hover:text-brand-green">
                <span>Read Article</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
