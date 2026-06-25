"use client";

import React from "react";
import { Phone, BadgePercent, CheckCircle2, ShieldCheck } from "lucide-react";

interface FeaturesProps {
  lang: "hi" | "en";
}

export function Features({ lang }: FeaturesProps) {
  const t = {
    hi: {
      featuresTitle: "लेबर-कनेक्ट ही क्यों चुनें?",
      featuresSubtitle: "परंपरागत ठेकेदारी प्रथा को हटाकर सीधे काम दिलाने का आधुनिक डिजिटल मंच।",
      feature1Title: "सीधा फोन व व्हाट्सएप संपर्क",
      feature1Desc: "नियोक्ता सीधे कामगार के फोन नंबर पर संपर्क कर सकते हैं, बिना किसी तीसरे व्यक्ति के हस्तक्षेप के।",
      feature2Title: "0% कमीशन",
      feature2Desc: "कामगारों की मेहनत की पूरी कमाई (100%) सीधे उनके पास जाती है। ऐप पर कोई सर्विस चार्ज नहीं है।",
      feature3Title: "आज की स्थिति (Availability)",
      feature3Desc: "कामगार ऐप में एक क्लिक से खुद को 'उपलब्ध' या 'अनुपलब्ध' सेट कर सकते हैं, जिससे फालतू कॉल नहीं आतीं।",
      feature4Title: "सुरक्षित व सत्यापित",
      feature4Desc: "सभी कामगारों की प्रोफाइल, अनुभव और रेटिंग पारदर्शी रूप से दिखाई जाती है ताकि सही चुनाव हो सके।"
    },
    en: {
      featuresTitle: "Why Choose LabourConnect?",
      featuresSubtitle: "Eliminating middlemen to empower local workers and simplify recruitment.",
      feature1Title: "Direct Call & WhatsApp",
      feature1Desc: "Employers call workers directly on their mobile phones, bypassing middlemen completely.",
      feature2Title: "Zero Commission",
      feature2Desc: "100% of the worker's hard-earned daily wages go to them. The platform is completely free.",
      feature3Title: "Live Availability Toggle",
      feature3Desc: "Workers can set their status to 'Available' or 'Unavailable' in one tap to prevent unwanted calls.",
      feature4Title: "Transparent & Verified",
      feature4Desc: "Workers' skills, experience, ratings, and rates are clearly visible for easy decision making."
    }
  };

  return (
    <section id="features" className="py-20 lg:py-28 bg-[#F6F4EE] border-b-2 border-black dark:bg-[#151412] text-zinc-950 dark:text-zinc-55">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-5xl font-black font-heading tracking-tight text-zinc-950 sm:text-6xl lg:text-7.5xl leading-tight dark:text-white">
            {t[lang].featuresTitle}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-zinc-700 dark:text-zinc-400 font-bold max-w-xl mx-auto leading-relaxed">
            {t[lang].featuresSubtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Feature 1 */}
          <div className="group rounded-3xl bg-white p-6.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:bg-zinc-950">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#e7f7ef] text-brand-green dark:bg-emerald-950/40">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-black text-zinc-950 dark:text-white group-hover:text-brand-green transition-colors font-heading">
              {t[lang].feature1Title}
            </h3>
            <p className="mt-2 text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed font-bold">
              {t[lang].feature1Desc}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="group rounded-3xl bg-white p-6.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:bg-zinc-950">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#e7f7ef] text-brand-green dark:bg-emerald-950/40">
              <BadgePercent className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-black text-zinc-950 dark:text-white group-hover:text-brand-green transition-colors font-heading">
              {t[lang].feature2Title}
            </h3>
            <p className="mt-2 text-sm text-zinc-655 dark:text-zinc-400 leading-relaxed font-bold">
              {t[lang].feature2Desc}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="group rounded-3xl bg-white p-6.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:bg-zinc-950">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#e7f7ef] text-brand-green dark:bg-emerald-950/40">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-black text-zinc-950 dark:text-white group-hover:text-brand-green transition-colors font-heading">
              {t[lang].feature3Title}
            </h3>
            <p className="mt-2 text-sm text-zinc-655 dark:text-zinc-400 leading-relaxed font-bold">
              {t[lang].feature3Desc}
            </p>
          </div>

          {/* Feature 4 */}
          <div className="group rounded-3xl bg-white p-6.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:bg-zinc-950">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-[#e7f7ef] text-brand-green dark:bg-emerald-950/40">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-black text-zinc-950 dark:text-white group-hover:text-brand-green transition-colors font-heading">
              {t[lang].feature4Title}
            </h3>
            <p className="mt-2 text-sm text-zinc-655 dark:text-zinc-400 leading-relaxed font-bold">
              {t[lang].feature4Desc}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
