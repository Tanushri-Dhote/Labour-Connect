"use client";

import React from "react";
import { Play, MapPin } from "lucide-react";

interface StoriesProps {
  lang: "hi" | "en";
}

export function Stories({ lang }: StoriesProps) {
  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5] border-b-2 border-black dark:bg-[#11100e] text-zinc-950 dark:text-zinc-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <h2 className="text-5xl font-black font-heading tracking-tight text-zinc-950 sm:text-6xl lg:text-7.5xl leading-tight dark:text-white">
            {lang === "hi" ? "सफलता की कहानियाँ (Real Stories)" : "Real Stories, Real Results"}
          </h2>
          <p className="mt-6 text-base sm:text-lg text-zinc-700 dark:text-zinc-400 font-bold max-w-xl mx-auto leading-relaxed">
            {lang === "hi" 
              ? "सुनिए उनकी जुबानी जो लेबर-कनेक्ट का उपयोग कर सीधे और खुशहाल काम पा रहे हैं।"
              : "Listen to how workers and employers find success directly using LabourConnect."
            }
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          
          {/* Story 1 (Video mockup card) */}
          <div className="group flex flex-col overflow-hidden rounded-3xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:bg-zinc-900">
            <div className="relative h-48 w-full bg-zinc-800 overflow-hidden flex items-center justify-center border-b-2 border-black">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80 z-10" />
              <span className="text-white text-xs font-bold absolute bottom-4 left-4 z-20 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-brand-green" /> सीकर, राजस्थान
              </span>
              <button 
                onClick={() => alert("Playing Rahul's story...")}
                className="h-14 w-14 rounded-full bg-white text-brand-green flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-20 group-hover:scale-105 transition-transform active:scale-95 cursor-pointer"
              >
                <Play className="h-6 w-6 fill-current ml-0.5" />
              </button>
            </div>
            <div className="p-6">
              <span className="text-[10px] uppercase font-black text-brand-green tracking-wider">राज मिस्त्री (Mason)</span>
              <h4 className="font-black text-lg text-zinc-950 mt-1 dark:text-white font-heading">राहुल कुमार</h4>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-bold">
                {lang === "hi"
                  ? "“ऐप आने के बाद, मुझे सीधे मोबाइल पर ठेकेदारों के फोन आते हैं। अब मुझे रोज़ काम मिलता है और कमीशन देने की भी चिंता नहीं है।”"
                  : "“Since using the app, I get calls directly on my phone. I have stable work now and 0 commission to pay.”"
                }
              </p>
            </div>
          </div>

          {/* Story 2 (Video mockup card) */}
          <div className="group flex flex-col overflow-hidden rounded-3xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:bg-zinc-900">
            <div className="relative h-48 w-full bg-zinc-800 overflow-hidden flex items-center justify-center border-b-2 border-black">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80 z-10" />
              <span className="text-white text-xs font-bold absolute bottom-4 left-4 z-20 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-brand-green" /> सीकर, राजस्थान
              </span>
              <button 
                onClick={() => alert("Playing Rajesh's story...")}
                className="h-14 w-14 rounded-full bg-white text-brand-green flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-20 group-hover:scale-105 transition-transform active:scale-95 cursor-pointer"
              >
                <Play className="h-6 w-6 fill-current ml-0.5" />
              </button>
            </div>
            <div className="p-6">
              <span className="text-[10px] uppercase font-black text-brand-green tracking-wider">पेंटर (Painter)</span>
              <h4 className="font-black text-lg text-zinc-950 mt-1 dark:text-white font-heading">मोहन लाल</h4>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-bold">
                {lang === "hi"
                  ? "“मकान के मालिक सीधे ऐप पर संपर्क करते हैं। पुट्टी व पेंटिंग के लगातार प्रोजेक्ट मिल जाते हैं। कमाई भी समय पर हाथ में मिलती है।”"
                  : "“Homeowners contact me directly. I get back-to-back painting jobs now and daily pay goes straight to my pocket.”"
                }
              </p>
            </div>
          </div>

          {/* Story 3 (Video mockup card) */}
          <div className="group flex flex-col overflow-hidden rounded-3xl border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 dark:bg-zinc-900">
            <div className="relative h-48 w-full bg-zinc-800 overflow-hidden flex items-center justify-center border-b-2 border-black">
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80 z-10" />
              <span className="text-white text-xs font-bold absolute bottom-4 left-4 z-20 flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-brand-green" /> जयपुर, राजस्थान
              </span>
              <button 
                onClick={() => alert("Playing Salim's story...")}
                className="h-14 w-14 rounded-full bg-white text-brand-green flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] z-20 group-hover:scale-105 transition-transform active:scale-95 cursor-pointer"
              >
                <Play className="h-6 w-6 fill-current ml-0.5" />
              </button>
            </div>
            <div className="p-6">
              <span className="text-[10px] uppercase font-black text-brand-green tracking-wider">मकान मालिक (Employer)</span>
              <h4 className="font-black text-lg text-zinc-950 mt-1 dark:text-white font-heading">विकाश शर्मा</h4>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-bold">
                {lang === "hi"
                  ? "“ठेकेदारों के चक्कर काटने की कोई जरूरत नहीं। सीकर के मिस्त्री राजेश जी से बात की और बिना किसी एक्स्ट्रा चार्ज के घर का काम करवाया।”"
                  : "“No need to run after contractors. I found a highly rated local mason directly in 5 minutes for my home renovation.”"
                }
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
