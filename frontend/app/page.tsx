"use client";

import React, { useState } from "react";
import { Phone } from "lucide-react";

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Showcase } from "@/components/Showcase";
import { Features } from "@/components/Features";
import { Awards } from "@/components/Awards";
import { Stories } from "@/components/Stories";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQ } from "@/components/FAQ";
import { Insights } from "@/components/Insights";
import { DownloadCTA } from "@/components/DownloadCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [lang, setLang] = useState<"en" | "hi">("hi");
  const [contactMessage, setContactMessage] = useState<string | null>(null);

  const handleContact = (type: "call" | "whatsapp", workerName: string) => {
    const action = type === "call" ? "Calling" : "Opening WhatsApp Chat with";
    const status = type === "call" ? "Dialing +91 98765 XXXXX..." : "Opening WhatsApp...";
    setContactMessage(`${action} ${workerName}. ${status}`);
    setTimeout(() => {
      setContactMessage(null);
    }, 4000);
  };

  return (
    <div className={`min-h-screen bg-white text-zinc-900 selection:bg-brand-green/20 selection:text-brand-green-dark dark:bg-zinc-950 dark:text-zinc-50 ${
      lang === "hi" ? "font-hindi" : "font-sans"
    }`}>
      
      {/* Floating Interactive Contact Notification */}
      {contactMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl border border-emerald-200 bg-white p-4.5 shadow-xl animate-fade-in-up dark:border-emerald-900/50 dark:bg-zinc-900">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green text-white">
            <Phone className="h-5 w-5 animate-bounce" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-zinc-900 dark:text-white">
              {lang === "hi" ? "कनेक्ट हो रहा है..." : "Connecting..."}
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">{contactMessage}</p>
          </div>
          <button 
            onClick={() => setContactMessage(null)}
            className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 text-xs font-bold pl-2"
          >
            ✕
          </button>
        </div>
      )}

      {/* Modular sections */}
      <Header lang={lang} setLang={setLang} />
      <Hero lang={lang} />
      <TrustBar lang={lang} />
      <Showcase lang={lang} onContact={handleContact} />
      <Features lang={lang} />
      <Awards lang={lang} />
      <Stories lang={lang} />
      <HowItWorks lang={lang} />
      <FAQ lang={lang} />
      <Insights lang={lang} />
      <DownloadCTA lang={lang} />
      <Footer lang={lang} />

    </div>
  );
}
