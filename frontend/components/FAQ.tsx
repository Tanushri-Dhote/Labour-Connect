"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

interface FAQProps {
  lang: "hi" | "en";
}

export function FAQ({ lang }: FAQProps) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const t = {
    hi: {
      faqTitle: "अक्सर पूछे जाने वाले सवाल (FAQs)",
      faqQ1: "क्या लेबर-कनेक्ट ऐप इस्तेमाल करने का कोई चार्ज है?",
      faqA1: "नहीं, लेबर-कनेक्ट पूरी तरह से मुफ्त है। कामगार और नियोक्ता दोनों के लिए पंजीकरण और संपर्क बिल्कुल फ्री है।",
      faqQ2: "अगर मैं कामगार हूँ, तो मुझे भुगतान कैसे मिलेगा?",
      faqA2: "भुगतान का फैसला कामगार और नियोक्ता के बीच सीधे होता है। आप काम पूरा होने पर सीधे नियोक्ता से नकद या ऑनलाइन भुगतान प्राप्त कर सकते हैं।",
      faqQ3: "क्या ऐप में कामगारों की पहचान सत्यापित होती है?",
      faqA3: "हाँ, प्रोफाइल में मोबाइल सत्यापन के साथ कामगारों की रेटिंग और रिव्यू होते हैं, जो अन्य नियोक्ताओं द्वारा दिए जाते हैं।",
      faqQ4: "क्या मैं अपनी मजदूरी की दर खुद तय कर सकता हूँ?",
      faqA4: "हाँ! आप अपनी प्रोफाइल में दैनिक दर (Daily Rate) या प्रति घंटा चार्ज खुद तय कर सकते हैं और इसे कभी भी बदल सकते हैं।"
    },
    en: {
      faqTitle: "Frequently Asked Questions",
      faqQ1: "Is there any fee to use the LabourConnect app?",
      faqA1: "No, LabourConnect is 100% free for both workers and employers. There are no registration or match fees.",
      faqQ2: "How do workers receive payments?",
      faqA2: "Payments are settled directly between workers and employers. You pay cash or UPI directly to the worker.",
      faqQ3: "Are the worker profiles verified?",
      faqA3: "Yes, profiles require mobile number verification and feature rating histories from past employers.",
      faqQ4: "Can workers set their own daily wage rates?",
      faqA4: "Yes! Workers are independent. You set your own daily or hourly rates and can update them anytime."
    }
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#FAF8F5] border-b-2 border-black dark:bg-[#11100e] text-zinc-950 dark:text-zinc-55">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center">
          <h2 className="text-5xl font-black font-heading tracking-tight text-zinc-950 sm:text-6xl lg:text-7.5xl leading-tight dark:text-white">
            {t[lang].faqTitle}
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {[
            { q: t[lang].faqQ1, a: t[lang].faqA1 },
            { q: t[lang].faqQ2, a: t[lang].faqA2 },
            { q: t[lang].faqQ3, a: t[lang].faqA3 },
            { q: t[lang].faqQ4, a: t[lang].faqA4 }
          ].map((faq, index) => (
            <div 
              key={index} 
              className="rounded-2xl border-2 border-black overflow-hidden bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] mb-4 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all dark:bg-zinc-900"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-6 text-left font-black text-base text-zinc-955 dark:text-white hover:text-brand-green dark:hover:text-brand-green transition-colors cursor-pointer font-heading"
              >
                <span className="flex items-center gap-3">
                  <HelpCircle className="h-5 w-5 text-brand-green shrink-0" />
                  {faq.q}
                </span>
                <ChevronDown className={`h-5 w-5 text-zinc-500 transition-transform duration-200 ${faqOpen === index ? "rotate-180 text-brand-green" : ""}`} />
              </button>
              
              {faqOpen === index && (
                <div className="px-6 pb-6 pt-1 text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed border-t-2 border-black font-bold">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
