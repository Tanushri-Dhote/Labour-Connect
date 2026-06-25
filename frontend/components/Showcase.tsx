"use client";

import React, { useState } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { WorkerCard, WorkerProps } from "./WorkerCard";

interface ShowcaseProps {
  lang: "hi" | "en";
  onContact: (type: "call" | "whatsapp", name: string) => void;
}

export function Showcase({ lang, onContact }: ShowcaseProps) {
  const [activeTab, setActiveTab] = useState<"mason" | "painter" | "plumber" | "carpenter" | "helper">("mason");

  const t = {
    hi: {
      showcaseTitle: "नियोक्ताओं और कामगारों के लिए सीधा संपर्क",
      showcaseSubtitle: "सीकर, जयपुर, जोधपुर सहित राजस्थान और भारत के विभिन्न शहरों के सत्यापित कामगार। अपनी जरूरत का कामगार चुनें और सीधे फोन करें।",
      showcaseCTA: "सारे कामगारों को देखें",
      tabMason: "राज मिस्त्री",
      tabPainter: "पेंटर",
      tabPlumber: "प्लंबर",
      tabCarpenter: "बढ़ई",
      tabHelper: "सहायक"
    },
    en: {
      showcaseTitle: "Direct Connections with LabourConnect",
      showcaseSubtitle: "Verified local workers from Sikar, Jaipur, Jodhpur, and other cities near you. Choose the right skill and call directly.",
      showcaseCTA: "View All Workers",
      tabMason: "Mason",
      tabPainter: "Painter",
      tabPlumber: "Plumber",
      tabCarpenter: "Carpenter",
      tabHelper: "Helper"
    }
  };

  const workersData: Record<string, WorkerProps[]> = {
    mason: [
      { name: "राहुल कुमार", nameEn: "Rahul Kumar", category: "राज मिस्त्री (Mason)", categoryEn: "Mason (Head Mason)", experience: 5, distance: 2.5, rating: 4.6, reviewsCount: 32, rate: 700, available: true, avatarUrl: "/avatar_mason.png" },
      { name: "राजेश जांगिड़", nameEn: "Rajesh Jangid", category: "राज मिस्त्री", categoryEn: "Mason", experience: 8, distance: 1.2, rating: 4.8, reviewsCount: 47, rate: 750, available: true, avatarUrl: "/avatar_mason.png" }
    ],
    painter: [
      { name: "मोहन लाल", nameEn: "Mohan Lal", category: "पेंटर (Painter)", categoryEn: "Wall Painter", experience: 7, distance: 3.1, rating: 4.3, reviewsCount: 18, rate: 800, available: true, avatarUrl: "/avatar_painter.png" },
      { name: "सुरेश वर्मा", nameEn: "Suresh Verma", category: "पेंटर व पुट्टी स्पेशलिस्ट", categoryEn: "Painter Specialist", experience: 4, distance: 2.0, rating: 4.7, reviewsCount: 15, rate: 650, available: true, avatarUrl: "/avatar_painter.png" }
    ],
    plumber: [
      { name: "सलीम खान", nameEn: "Salim Khan", category: "प्लंबर (Plumber)", categoryEn: "Plumber", experience: 4, distance: 4.0, rating: 4.1, reviewsCount: 12, rate: 600, available: true, avatarUrl: "/avatar_plumber.png" },
      { name: "दिनेश सैनी", nameEn: "Dinesh Saini", category: "प्लंबर व फिटिंग", categoryEn: "Plumbing & Fitting", experience: 9, distance: 1.5, rating: 4.9, reviewsCount: 56, rate: 700, available: true, avatarUrl: "/avatar_plumber.png" }
    ],
    carpenter: [
      { name: "रामप्रसाद सुथार", nameEn: "Ramprasad Suthar", category: "बढ़ई (Carpenter)", categoryEn: "Furniture Carpenter", experience: 12, distance: 2.8, rating: 4.9, reviewsCount: 78, rate: 900, available: true, avatarUrl: "/avatar_carpenter.png" },
      { name: "अनिल शर्मा", nameEn: "Anil Sharma", category: "लकड़ी कारीगर", categoryEn: "Wooden Decor Carpenter", experience: 5, distance: 3.5, rating: 4.4, reviewsCount: 23, rate: 750, available: true, avatarUrl: "/avatar_carpenter.png" }
    ],
    helper: [
      { name: "संदीप नायक", nameEn: "Sandeep Nayak", category: "बेलदार / सहायक (Helper)", categoryEn: "Construction Helper", experience: 2, distance: 0.8, rating: 4.2, reviewsCount: 8, rate: 450, available: true, avatarUrl: "/avatar_helper.png" },
      { name: "विक्रम गुर्जर", nameEn: "Vikram Gurjar", category: "बेलदार", categoryEn: "Helper / Loader", experience: 3, distance: 3.0, rating: 4.5, reviewsCount: 19, rate: 500, available: true, avatarUrl: "/avatar_helper.png" }
    ]
  };

  return (
    <section id="explore" className="relative py-20 lg:py-28 bg-[#F6F4EE] border-b-2 border-black dark:bg-[#151412] text-zinc-950 dark:text-zinc-55 overflow-hidden">
      
      {/* Decorative Neo-brutalist shapes */}
      <div className="absolute top-12 left-10 h-10 w-10 bg-lime-400 border-2 border-black rounded-full shadow-[2px_2px_0px_0px_#000] rotate-12 hidden md:flex items-center justify-center font-bold text-[10px] select-none text-zinc-950">
        LC
      </div>
      <div className="absolute bottom-16 right-10 h-10 w-24 bg-amber-450 border-2 border-black bg-amber-400 shadow-[2px_2px_0px_0px_#000] -rotate-6 hidden md:flex items-center justify-center font-black text-[10px] tracking-wider select-none text-zinc-950">
        DIRECT CALL
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-5xl font-black font-heading tracking-tight text-zinc-955 sm:text-6xl lg:text-7.5xl leading-tight dark:text-white">
            {t[lang].showcaseTitle}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-zinc-700 dark:text-zinc-400 font-bold max-w-2xl mx-auto leading-relaxed">
            {t[lang].showcaseSubtitle}
          </p>
        </div>
 
        {/* Showcase Tabs */}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {[
            { id: "mason", label: t[lang].tabMason },
            { id: "painter", label: t[lang].tabPainter },
            { id: "plumber", label: t[lang].tabPlumber },
            { id: "carpenter", label: t[lang].tabCarpenter },
            { id: "helper", label: t[lang].tabHelper }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-xl px-6 py-2.5 text-sm font-black border-2 border-black transition-all cursor-pointer shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                activeTab === tab.id
                  ? "bg-brand-green text-white"
                  : "bg-white text-zinc-950 hover:bg-zinc-50 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
 
        {/* Tab content / details layout */}
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
          
          {/* Left Details Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center items-start text-left bg-amber-350 bg-amber-300 p-8 rounded-[32px] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden dark:bg-[#201a10]">
            
            {/* Playful overlapping starburst sticker badge */}
            <div className="absolute -top-4 -right-4 h-20 w-20 bg-lime-400 border-2 border-black rounded-full shadow-[2.5px_2.5px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center text-center rotate-[15deg] select-none z-10">
              <span className="text-[10px] font-black uppercase text-zinc-950 leading-tight">100%</span>
              <span className="text-[10px] font-black uppercase text-zinc-950 leading-tight">FREE</span>
            </div>

            <span className="text-xs uppercase font-black text-white bg-brand-green tracking-wider px-3.5 py-1.5 border-2 border-black rounded-xl mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {activeTab === "mason" ? t[lang].tabMason : activeTab === "painter" ? t[lang].tabPainter : activeTab === "plumber" ? t[lang].tabPlumber : activeTab === "carpenter" ? t[lang].tabCarpenter : t[lang].tabHelper}
            </span>
            <h3 className="text-2xl font-black text-zinc-950 dark:text-white leading-tight font-heading">
              {lang === "hi" ? "सत्यापित व कुशल कारीगर" : "Verified & Skilled Experts"}
            </h3>
            
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-2.5">
                <Check className="h-5 w-5 text-zinc-950 shrink-0 mt-0.5 bg-white border border-black rounded-full p-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" />
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {lang === "hi" ? "सीधा फोन व व्हाट्सएप संपर्क, कोई सर्विस फीस नहीं।" : "Direct phone & WhatsApp calling, zero broker fees."}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="h-5 w-5 text-zinc-950 shrink-0 mt-0.5 bg-white border border-black rounded-full p-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" />
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {lang === "hi" ? "रेट और रेटिंग देखकर पारदर्शी चुनाव की सुविधा।" : "Review salary rates & previous employer ratings."}
                </p>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="h-5 w-5 text-zinc-950 shrink-0 mt-0.5 bg-white border border-black rounded-full p-0.5 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" />
                <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {lang === "hi" ? "लाइव उपलब्धता (Status) चेक करने का विकल्प।" : "Live 'Online' status indicator for instant availability."}
                </p>
              </div>
            </div>
 
            <a 
              href="#download"
              className="mt-8 group inline-flex items-center gap-2 rounded-xl bg-white hover:bg-zinc-50 px-6 py-3.5 text-sm font-black text-zinc-955 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
            >
              <span>{t[lang].showcaseCTA}</span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Right Cards Showcase list */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {workersData[activeTab].map((worker, index) => (
              <WorkerCard
                key={index}
                worker={worker}
                lang={lang}
                onContact={onContact}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
