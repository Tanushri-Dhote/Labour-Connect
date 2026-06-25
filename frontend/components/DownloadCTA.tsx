"use client";

import React from "react";
import { Download } from "lucide-react";

interface DownloadCTAProps {
  lang: "hi" | "en";
}

export function DownloadCTA({ lang }: DownloadCTAProps) {
  const t = {
    hi: {
      downloadTitle: "क्या आप अपनी कमाई बढ़ाने के लिए तैयार हैं?",
      downloadSubtitle: "आज ही लेबर-कनेक्ट ऐप डाउनलोड करें और सीधे नियोक्ताओं से जुड़कर अपनी दैनिक आय बढ़ाएं।",
      downloadAPK: "APK डाउनलोड करें",
      downloadPlayStore: "गूगल प्ले स्टोर से पाएं"
    },
    en: {
      downloadTitle: "Ready to Grow Your Income?",
      downloadSubtitle: "Download the LabourConnect app today, connect directly with local employers, and boost your daily earnings.",
      downloadAPK: "Download Direct APK",
      downloadPlayStore: "Get it on Play Store"
    }
  };

  return (
    <section id="download" className="py-16 bg-[#FAF8F5] border-b-2 border-black dark:bg-[#11100e] text-zinc-955 dark:text-zinc-55">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal dark green pill container */}
        <div className="relative rounded-[40px] bg-brand-green text-white p-8 sm:p-12 lg:p-16 overflow-hidden border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center relative z-10">
            
            {/* Left Column Text details */}
            <div className="flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
              <h2 className="text-5xl font-black sm:text-6xl lg:text-7.5xl leading-tight font-heading">
                {t[lang].downloadTitle}
              </h2>
              <p className="mt-6 text-emerald-100 font-bold max-w-lg leading-relaxed text-base sm:text-lg">
                {t[lang].downloadSubtitle}
              </p>

              {/* Download CTA buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-5 w-full sm:justify-center lg:justify-start">
                
                {/* APK direct download */}
                <button 
                  onClick={() => alert(lang === "hi" ? "लेबर-कनेक्ट APK डाउनलोड हो रहा है..." : "Downloading LabourConnect APK...")}
                  className="group flex items-center justify-center gap-3 rounded-xl bg-white text-zinc-950 px-6 py-3 font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                >
                  <Download className="h-5 w-5 text-brand-green fill-current" />
                  <div className="text-left leading-tight">
                    <span className="text-[9px] text-zinc-500 block font-black uppercase tracking-wider">Android Direct</span>
                    <span className="text-sm font-black">{t[lang].downloadAPK}</span>
                  </div>
                </button>

                {/* Play Store */}
                <button 
                  onClick={() => alert("Opening Play Store...")}
                  className="group flex items-center justify-center gap-3 rounded-xl bg-lime-400 text-zinc-950 px-6 py-3 font-black border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
                >
                  <svg className="h-5 w-5 fill-current text-zinc-950" viewBox="0 0 24 24">
                    <path d="M3 5.277L14.77 17.05l2.454-2.454L3 3v2.277zM19.127 8.012l-2.903-1.675-2.454 2.454 2.903 2.903 2.454-3.682zm-4.357 5.356L3 21h.277l11.493-11.493-2.454-2.454L3 17.546v.277l9.227-9.227 2.543 4.772z" />
                  </svg>
                  <div className="text-left leading-tight">
                    <span className="text-[9px] text-emerald-950 block font-black uppercase tracking-wider">Google Play</span>
                    <span className="text-sm font-black">{t[lang].downloadPlayStore}</span>
                  </div>
                </button>

              </div>
            </div>

            {/* Right Column: Portrait image of worker in a carpentry shop */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative h-[320px] w-[320px] sm:h-[350px] sm:w-[350px] overflow-hidden rounded-[40px] border-2 border-black bg-white p-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-[3deg] hover:rotate-0 transition-transform duration-300 flex items-center justify-center">
                <img 
                  src="/footer_cta_worker.png" 
                  alt="LabourConnect Carpenter" 
                  className="h-full w-full object-cover object-center rounded-[30px] border-2 border-black"
                />
                {/* Decorative QR code overlay */}
                <div className="absolute bottom-6 right-6 bg-white p-2 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hidden sm:flex flex-col items-center">
                  <div className="h-14 w-14 bg-zinc-100 flex flex-wrap gap-0.5 p-1 items-center justify-center">
                    <div className="h-3 w-3 bg-zinc-900" />
                    <div className="h-3 w-3 bg-zinc-900" />
                    <div className="h-3 w-3 bg-transparent" />
                    <div className="h-3 w-3 bg-zinc-900" />
                  </div>
                  <span className="text-[7px] font-black text-zinc-550 uppercase mt-1">Scan to Download</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
  