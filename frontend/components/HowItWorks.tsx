"use client";

import React from "react";

interface HowItWorksProps {
  lang: "hi" | "en";
}

export function HowItWorks({ lang }: HowItWorksProps) {
  const t = {
    hi: {
      stepperTitle: "सफलता की ओर तीन आसान कदम",
      stepperSubtitle: "4 आसान चरणों में काम ढूंढें या कामगारों को काम पर रखें।",
      step1Title: "1. मोबाइल नंबर से आसान रजिस्ट्रेशन",
      step1Desc: "सिर्फ अपने मोबाइल नंबर और OTP से 2 मिनट में अपनी प्रोफाइल बनाएं।",
      step2Title: "2. अपना कौशल और दर (Rates) चुनें",
      step2Desc: "अपनी कला (मिस्त्री, पेंटर, मजदूर) चुनें और अपनी प्रतिदिन की दर सेट करें।",
      step3Title: "3. उपलब्धता चालू करें और काम पाएं",
      step3Desc: "स्थिति 'उपलब्ध' रखें ताकि नियोक्ताओं को आप दिखाई दें और सीधे फोन आएं।"
    },
    en: {
      stepperTitle: "Three Steps to Funding Your Future",
      stepperSubtitle: "Get work or hire workers in 3 simple steps.",
      step1Title: "1. Easy Mobile Registration",
      step1Desc: "Create your worker profile in 2 minutes using just your phone number and OTP.",
      step2Title: "2. Set Your Skills & Rates",
      step2Desc: "Select your trades (mason, painter, helper) and specify your daily wages.",
      step3Title: "3. Turn On Status & Get Hired",
      step3Desc: "Set your status to 'Available' so local employers can find you and call you directly."
    }
  };

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-[#F6F4EE] border-b-2 border-black dark:bg-[#151412] text-zinc-955 dark:text-zinc-55">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <h2 className="text-5xl font-black font-heading tracking-tight text-zinc-955 sm:text-6xl lg:text-7.5xl leading-tight dark:text-white">
            {t[lang].stepperTitle}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-zinc-700 dark:text-zinc-400 font-bold max-w-xl mx-auto leading-relaxed">
            {t[lang].stepperSubtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          {/* Step 1 */}
          <div className="relative rounded-3xl bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:bg-zinc-950">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-brand-green text-white font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">1</span>
            <h3 className="mt-6 text-lg font-black text-zinc-950 dark:text-white font-heading">
              {t[lang].step1Title}
            </h3>
            <p className="mt-3 text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed font-bold">
              {t[lang].step1Desc}
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative rounded-3xl bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:bg-zinc-950">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-brand-green text-white font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">2</span>
            <h3 className="mt-6 text-lg font-black text-zinc-950 dark:text-white font-heading">
              {t[lang].step2Title}
            </h3>
            <p className="mt-3 text-sm text-zinc-655 dark:text-zinc-400 leading-relaxed font-bold">
              {t[lang].step2Desc}
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative rounded-3xl bg-white p-8 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:bg-zinc-950">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-brand-green text-white font-black text-sm shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">3</span>
            <h3 className="mt-6 text-lg font-black text-zinc-955 dark:text-white font-heading">
              {t[lang].step3Title}
            </h3>
            <p className="mt-3 text-sm text-zinc-655 dark:text-zinc-400 leading-relaxed font-bold">
              {t[lang].step3Desc}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
