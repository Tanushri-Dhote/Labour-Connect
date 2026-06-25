"use client";

import React, { useState } from "react";
import { 
  Wifi, Signal, Battery, ArrowLeft, Send, Check, Search, 
  Home, Briefcase, Plus, MessageCircle, User, Star, MapPin, 
  Phone, CheckCircle2, ChevronRight, Settings, HelpCircle, 
  Wallet, Calendar
} from "lucide-react";

export function MockPhone() {
  const [screen, setScreen] = useState<"welcome" | "login" | "register1" | "register3" | "dashboard" | "search">("welcome");
  const [isAvailable, setIsAvailable] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState("98765 43210");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("Mason");

  // Mock data for search
  const mockWorkers = [
    {
      name: "राहुल कुमार",
      category: "राज मिस्त्री (Mason)",
      exp: "5 वर्ष",
      dist: "2.5 KM",
      rate: "₹700 / दिन",
      rating: "4.6 (32)",
      available: true,
      avatar: "RK",
      avatarBg: "bg-amber-100 text-amber-800"
    },
    {
      name: "मोहन लाल",
      category: "पेंटर (Painter)",
      exp: "7 वर्ष",
      dist: "3.1 KM",
      rate: "₹800 / दिन",
      rating: "4.3 (18)",
      available: true,
      avatar: "ML",
      avatarBg: "bg-sky-100 text-sky-800"
    },
    {
      name: "सलीम खान",
      category: "प्लंबर (Plumber)",
      exp: "4 वर्ष",
      dist: "4.0 KM",
      rate: "₹600 / दिन",
      rating: "4.1 (12)",
      available: false,
      avatar: "SK",
      avatarBg: "bg-teal-100 text-teal-800"
    }
  ];

  return (
    <div className="relative mx-auto h-[720px] w-[340px] shrink-0 rounded-[48px] border-[12px] border-zinc-900 bg-zinc-900 shadow-2xl ring-4 ring-zinc-800/50">
      
      {/* Phone Camera/Speaker Notch */}
      <div className="absolute top-3 left-1/2 z-30 h-5 w-32 -translate-x-1/2 rounded-full bg-zinc-900" />

      {/* Phone Screen Container */}
      <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[36px] bg-white text-zinc-800 font-sans select-none shadow-inner dark:bg-zinc-950">
        
        {/* Status Bar */}
        <div className="z-20 flex h-10 items-center justify-between px-6 pt-2 text-xs font-semibold text-zinc-900 bg-transparent dark:text-zinc-100">
          <span>9:41</span>
          <div className="flex items-center gap-1.5">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <Battery className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* Dynamic Screen Content */}
        <div className="flex-1 overflow-y-auto px-4 pb-4">
          
          {/* SCREEN 1: WELCOME */}
          {screen === "welcome" && (
            <div className="flex h-full flex-col justify-between py-6 text-center animate-fade-in bg-zinc-950 text-white -mx-4 -mt-10 px-6">
              <div className="flex flex-col items-center mt-16">
                {/* Logo Mockup */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-brand-green shadow-lg ring-4 ring-emerald-500/20">
                  <svg className="h-12 w-12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
                  Labour<span className="text-brand-green">Connect</span>
                </h1>
                <p className="mt-2 text-sm text-zinc-400 font-semibold">काम की तलाश अब आसान</p>
              </div>

              {/* Background silhouette illustration mockup in CSS */}
              <div className="relative my-8 h-28 w-full rounded-2xl bg-zinc-900/50 border border-zinc-800 overflow-hidden flex items-end justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent z-10" />
                <div className="flex gap-4 items-end mb-2 z-0 opacity-40">
                  <div className="h-16 w-8 bg-zinc-700 rounded-t-lg" />
                  <div className="h-20 w-8 bg-zinc-600 rounded-t-lg" />
                  <div className="h-14 w-8 bg-zinc-700 rounded-t-lg" />
                </div>
                <span className="absolute bottom-2 text-xs text-zinc-500 font-medium">Local Workers Directory</span>
              </div>

              <div className="flex flex-col gap-3.5 mb-4">
                <button 
                  onClick={() => setScreen("login")}
                  className="w-full rounded-xl bg-brand-green py-3.5 font-bold text-white transition-all hover:bg-brand-green-hover active:scale-95"
                >
                  मैं Labour हूँ
                </button>
                <button 
                  onClick={() => setScreen("search")}
                  className="w-full rounded-xl border-2 border-white bg-transparent py-3 font-bold text-white transition-all hover:bg-white/10 active:scale-95"
                >
                  मुझे Labour चाहिए
                </button>
                <p className="mt-2 text-xs text-zinc-400">
                  पहले से अकाउंट है? <span className="font-semibold text-brand-green underline cursor-pointer" onClick={() => setScreen("login")}>लॉगिन करें</span>
                </p>
              </div>
            </div>
          )}

          {/* SCREEN 2: LOGIN */}
          {screen === "login" && (
            <div className="flex h-full flex-col justify-between py-4 animate-fade-in">
              <div>
                <button onClick={() => setScreen("welcome")} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 mt-2">
                  <ArrowLeft className="h-5 w-5 dark:text-white" />
                </button>
                
                <div className="mt-6">
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">लॉगिन / रजिस्टर</h2>
                  <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">अपना मोबाइल नंबर डालें</p>
                  
                  {/* Phone input */}
                  <div className="mt-4 flex items-center rounded-xl border border-zinc-200 bg-zinc-50 p-3.5 dark:border-zinc-800 dark:bg-zinc-900">
                    <span className="font-semibold text-zinc-500 border-r border-zinc-300 pr-3 mr-3 dark:border-zinc-700">+91</span>
                    <input 
                      type="tel" 
                      value={phoneNumber} 
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-transparent font-semibold outline-none dark:text-white"
                      placeholder="98765 43210"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 mb-4">
                <button 
                  onClick={() => setScreen("register1")}
                  className="w-full rounded-xl bg-brand-green py-3.5 font-bold text-white transition-all hover:bg-brand-green-hover flex items-center justify-center gap-2 active:scale-95"
                >
                  <span>OTP भेजें</span>
                  <Send className="h-4 w-4" />
                </button>
                
                <div className="relative my-2 text-center">
                  <span className="absolute inset-x-0 top-1/2 h-px bg-zinc-200 dark:bg-zinc-800" />
                  <span className="relative bg-white px-3 text-xs text-zinc-400 dark:bg-zinc-950">या</span>
                </div>

                <button onClick={() => setScreen("register1")} className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white py-2.5 text-sm font-semibold hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-white">
                  <span className="h-4 w-4 bg-red-500 rounded-full inline-block flex items-center justify-center text-[8px] text-white font-black">G</span>
                  <span>Google से जारी रखें</span>
                </button>
                
                <p className="text-[10px] text-center text-zinc-400 mt-2">
                  जारी रखने का मतलब है कि आप हमारी <span className="text-brand-green underline">नियम व शर्तों</span> से सहमत हैं
                </p>
              </div>
            </div>
          )}

          {/* SCREEN 3: REGISTER STEP 1 (Personal Info) */}
          {screen === "register1" && (
            <div className="flex h-full flex-col justify-between py-2 animate-fade-in">
              <div>
                <div className="flex items-center justify-between mt-2">
                  <button onClick={() => setScreen("login")} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <ArrowLeft className="h-5 w-5 dark:text-white" />
                  </button>
                  <span className="text-sm font-bold text-zinc-800 dark:text-white">Labour रजिस्ट्रेशन</span>
                  <span className="text-xs font-semibold text-zinc-400">1/6</span>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div className="h-full w-1/6 rounded-full bg-brand-green" />
                </div>

                <div className="mt-4">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">व्यक्तिगत जानकारी</h3>
                  
                  {/* Avatar Upload Mockup */}
                  <div className="mt-4 flex flex-col items-center">
                    <div className="relative h-16 w-16 rounded-full bg-zinc-100 ring-2 ring-brand-green/20 flex items-center justify-center dark:bg-zinc-800">
                      <User className="h-8 w-8 text-zinc-400" />
                      <span className="absolute bottom-0 right-0 rounded-full bg-brand-green p-1 text-white text-[8px] font-bold">+</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3.5">
                    <div>
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">नाम</label>
                      <input 
                        type="text" 
                        defaultValue="राहुल कुमार"
                        className="mt-1 w-full rounded-lg border border-zinc-200 p-2.5 text-sm font-semibold outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">उम्र</label>
                        <input 
                          type="number" 
                          defaultValue="28"
                          className="mt-1 w-full rounded-lg border border-zinc-200 p-2.5 text-sm font-semibold outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">लिंग</label>
                        <div className="mt-1 flex gap-1 bg-zinc-100 rounded-lg p-0.5 dark:bg-zinc-800">
                          <span className="flex-1 text-center py-1.5 text-xs font-bold bg-brand-green text-white rounded-md">पुरुष</span>
                          <span className="flex-1 text-center py-1.5 text-xs font-bold text-zinc-500 dark:text-zinc-400">महिला</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">मोबाइल नंबर</label>
                      <input 
                        type="tel" 
                        value={phoneNumber} 
                        readOnly
                        className="mt-1 w-full rounded-lg border border-zinc-200 p-2.5 text-sm font-semibold bg-zinc-50 text-zinc-500 outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setScreen("register3")}
                className="w-full rounded-xl bg-brand-green py-3 font-bold text-white transition-all hover:bg-brand-green-hover mt-6 active:scale-95"
              >
                आगे बढ़ें
              </button>
            </div>
          )}

          {/* SCREEN 4: REGISTER STEP 3 (Skills & Category) */}
          {screen === "register3" && (
            <div className="flex h-full flex-col justify-between py-2 animate-fade-in">
              <div>
                <div className="flex items-center justify-between mt-2">
                  <button onClick={() => setScreen("register1")} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <ArrowLeft className="h-5 w-5 dark:text-white" />
                  </button>
                  <span className="text-sm font-bold text-zinc-800 dark:text-white">Labour रजिस्ट्रेशन</span>
                  <span className="text-xs font-semibold text-zinc-400">3/6</span>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div className="h-full w-3/6 rounded-full bg-brand-green" />
                </div>

                <div className="mt-4">
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white">कौशल और श्रेणी</h3>
                  
                  <div className="mt-3">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">Labour श्रेणी</label>
                    <select className="mt-1 w-full rounded-lg border border-zinc-200 p-2.5 text-sm font-semibold bg-white dark:border-zinc-800 dark:bg-zinc-900 dark:text-white outline-none">
                      <option>राज मिस्त्री (Mason)</option>
                      <option>पेंटर (Painter)</option>
                      <option>प्लंबर (Plumber)</option>
                      <option>कारपेंटर (Carpenter)</option>
                    </select>
                  </div>

                  <div className="mt-4">
                    <label className="text-xs font-bold text-zinc-500 dark:text-zinc-400">कौशल (एक से अधिक चुनें)</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {[
                        { name: "राज मिस्त्री", checked: true },
                        { name: "प्लास्टर", checked: true },
                        { name: "टाईल्स", checked: false },
                        { name: "पेंटिंग", checked: false },
                        { name: "ईंट का काम", checked: false },
                        { name: "कंक्रीट काम", checked: false },
                        { name: "फिनिशिंग", checked: false }
                      ].map((skill, index) => (
                        <span 
                          key={index} 
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold border cursor-pointer transition-all ${
                            skill.checked
                              ? "bg-emerald-50 border-brand-green text-brand-green dark:bg-emerald-950/20"
                              : "border-zinc-200 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400"
                          }`}
                        >
                          {skill.name}
                          {skill.checked && <Check className="h-3.5 w-3.5" />}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setScreen("dashboard")}
                className="w-full rounded-xl bg-brand-green py-3 font-bold text-white transition-all hover:bg-brand-green-hover mt-6 active:scale-95"
              >
                रजिस्ट्रेशन पूरा करें
              </button>
            </div>
          )}

          {/* SCREEN 5: WORKER DASHBOARD */}
          {screen === "dashboard" && (
            <div className="flex h-full flex-col justify-between py-2 animate-fade-in -mx-4 px-4 bg-zinc-50 dark:bg-zinc-900/40">
              <div>
                {/* Header */}
                <div className="flex items-center justify-between border-b border-zinc-100 bg-white pb-3 pt-2 -mx-4 px-4 dark:border-zinc-800 dark:bg-zinc-950">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-full bg-brand-green text-white flex items-center justify-center font-bold text-sm">
                      RK
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">नमस्ते, राहुल!</h4>
                      <p className="text-[10px] text-zinc-400">प्रोफ़ाइल पूरा है 90%</p>
                    </div>
                  </div>
                  <button onClick={() => setScreen("welcome")} className="rounded-full p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800">
                    <Settings className="h-4.5 w-4.5 text-zinc-500" />
                  </button>
                </div>

                {/* Availability card */}
                <div className="mt-4 rounded-2xl bg-white p-4.5 shadow-xs border border-zinc-100 dark:bg-zinc-950 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="font-bold text-sm text-zinc-900 dark:text-white">आज की स्थिति (Status)</h5>
                      <p className="text-xs text-zinc-400 mt-0.5">आज आप काम के लिए उपलब्ध हैं</p>
                    </div>
                    <button 
                      onClick={() => setIsAvailable(!isAvailable)}
                      className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
                        isAvailable ? "bg-brand-green" : "bg-zinc-200 dark:bg-zinc-800"
                      }`}
                    >
                      <span className={`pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
                        isAvailable ? "translate-x-5.5" : "translate-x-0"
                      }`} />
                    </button>
                  </div>
                  
                  {/* Status Indicator text badge */}
                  <div className="mt-3.5 flex items-center gap-1.5 border-t border-zinc-50 pt-3 dark:border-zinc-900">
                    <span className={`h-2.5 w-2.5 rounded-full ${isAvailable ? "bg-emerald-500" : "bg-red-500 animate-pulse"}`} />
                    <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                      {isAvailable ? "कॉल रिसीव करने के लिए तैयार" : "ऑफलाइन - कॉल बंद"}
                    </span>
                  </div>
                </div>

                {/* Menu items */}
                <div className="mt-4 space-y-2.5">
                  {[
                    { label: "मेरा प्रोफ़ाइल देखें", icon: User },
                    { label: "मेरे काम और बुकिंग", icon: Calendar },
                    { label: "भुगतान और कमाई", icon: Wallet },
                    { label: "हेल्प और सपोर्ट", icon: HelpCircle }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between rounded-xl bg-white p-3.5 border border-zinc-100 dark:bg-zinc-950 dark:border-zinc-800 cursor-pointer hover:border-brand-green/20 transition-all">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4.5 w-4.5 text-brand-green" />
                        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">{item.label}</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-zinc-400" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Bar */}
              <div className="flex justify-around items-center bg-white border-t border-zinc-100 py-2.5 -mx-4 px-2 dark:bg-zinc-950 dark:border-zinc-800 z-10">
                <button className="flex flex-col items-center gap-0.5 text-brand-green">
                  <Home className="h-5 w-5" />
                  <span className="text-[9px] font-bold">होम</span>
                </button>
                <button onClick={() => setScreen("search")} className="flex flex-col items-center gap-0.5 text-zinc-400 dark:text-zinc-500">
                  <Search className="h-5 w-5" />
                  <span className="text-[9px] font-medium">खोजें</span>
                </button>
                <button className="flex flex-col items-center gap-0.5 text-zinc-400 dark:text-zinc-500">
                  <Plus className="h-5 w-5 text-brand-green bg-emerald-50 dark:bg-emerald-950/30 p-0.5 rounded-full" />
                  <span className="text-[9px] font-medium">नया</span>
                </button>
                <button className="flex flex-col items-center gap-0.5 text-zinc-400 dark:text-zinc-500">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-[9px] font-medium">मैसेज</span>
                </button>
                <button className="flex flex-col items-center gap-0.5 text-zinc-400 dark:text-zinc-500">
                  <User className="h-5 w-5" />
                  <span className="text-[9px] font-medium">प्रोफाइल</span>
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 6: EMPLOYER SEARCH */}
          {screen === "search" && (
            <div className="flex h-full flex-col justify-between py-2 animate-fade-in -mx-4 px-4 bg-zinc-50 dark:bg-zinc-900/40">
              <div>
                {/* Header */}
                <div className="bg-white p-3 -mx-4 px-4 border-b border-zinc-100 dark:bg-zinc-950 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-extrabold text-zinc-900 dark:text-white">Labour खोजें</h4>
                      <p className="text-[10px] text-zinc-400 flex items-center gap-0.5 mt-0.5">
                        <MapPin className="h-3 w-3 text-brand-green" /> सीकर, राजस्थान
                      </p>
                    </div>
                    <button onClick={() => setScreen("welcome")} className="text-xs font-bold text-brand-green">
                      English
                    </button>
                  </div>

                  {/* Search Bar */}
                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-zinc-50 border border-zinc-100 px-3 py-2 dark:bg-zinc-900 dark:border-zinc-800">
                    <Search className="h-4.5 w-4.5 text-zinc-400" />
                    <input 
                      type="text" 
                      placeholder="कौशल, नाम या कीवर्ड से खोजें"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent text-xs font-medium outline-none dark:text-white"
                    />
                  </div>
                </div>

                {/* Skill selector quick filters */}
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1.5 -mx-4 px-4 scrollbar-none">
                  {["Mason", "Painter", "Plumber", "Carpenter", "Helper"].map((skill) => (
                    <button 
                      key={skill}
                      onClick={() => setSelectedSkill(skill)}
                      className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold transition-all border ${
                        selectedSkill === skill 
                          ? "bg-brand-green border-brand-green text-white" 
                          : "bg-white border-zinc-200 text-zinc-600 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {skill === "Mason" ? "राज मिस्त्री" : skill === "Painter" ? "पेंटर" : skill === "Plumber" ? "प्लंबर" : skill === "Carpenter" ? "बढ़ई" : "सहायक"}
                    </button>
                  ))}
                </div>

                {/* Worker List */}
                <div className="mt-3.5 space-y-3 pb-8">
                  {mockWorkers
                    .filter(w => selectedSkill === "Mason" ? w.category.includes("Mason") : selectedSkill === "Painter" ? w.category.includes("Painter") : selectedSkill === "Plumber" ? w.category.includes("Plumber") : true)
                    .map((worker, index) => (
                      <div key={index} className="rounded-xl border border-zinc-100 bg-white p-3 shadow-xs dark:border-zinc-800 dark:bg-zinc-950">
                        <div className="flex items-start gap-3">
                          <div className={`h-11 w-11 rounded-full shrink-0 flex items-center justify-center font-bold text-sm ${worker.avatarBg}`}>
                            {worker.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h5 className="text-xs font-bold text-zinc-900 dark:text-white truncate">{worker.name}</h5>
                              <span className={`inline-flex items-center rounded-full px-1.5 py-0.5 text-[9px] font-semibold ${
                                worker.available ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20" : "bg-red-50 text-red-700 dark:bg-red-950/20"
                              }`}>
                                {worker.available ? "उपलब्ध" : "अनुपलब्ध"}
                              </span>
                            </div>
                            <p className="text-[10px] text-zinc-400 font-semibold mt-0.5">{worker.category}</p>
                            
                            <div className="mt-1.5 flex items-center justify-between gap-2">
                              <div className="flex gap-2 text-[9px] text-zinc-400 font-medium">
                                <span>{worker.exp} अनुभव</span>
                                <span>•</span>
                                <span>{worker.dist} दूर</span>
                              </div>
                              <span className="text-xs font-extrabold text-brand-green">{worker.rate}</span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-2.5 pt-2 border-t border-zinc-50 dark:border-zinc-900 flex justify-between items-center">
                          <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                            <Star className="h-3 w-3 fill-current text-amber-500" />
                            <span>{worker.rating}</span>
                          </div>
                          
                          <div className="flex gap-2">
                            <button className="h-7 w-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center hover:bg-emerald-100 transition-colors">
                              <MessageCircle className="h-3.5 w-3.5 fill-current" />
                            </button>
                            <button className="h-7 px-3 rounded-full bg-brand-green text-white text-[10px] font-bold flex items-center gap-1 hover:bg-brand-green-hover transition-colors">
                              <Phone className="h-3 w-3 fill-current" />
                              <span>कॉल करें</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Navigation Bar */}
              <div className="flex justify-around items-center bg-white border-t border-zinc-100 py-2.5 -mx-4 px-2 dark:bg-zinc-950 dark:border-zinc-800 z-10">
                <button onClick={() => setScreen("dashboard")} className="flex flex-col items-center gap-0.5 text-zinc-400 dark:text-zinc-500">
                  <Home className="h-5 w-5" />
                  <span className="text-[9px] font-medium">होम</span>
                </button>
                <button className="flex flex-col items-center gap-0.5 text-brand-green">
                  <Search className="h-5 w-5" />
                  <span className="text-[9px] font-bold">खोजें</span>
                </button>
                <button className="flex flex-col items-center gap-0.5 text-zinc-400 dark:text-zinc-500">
                  <Plus className="h-5 w-5 text-brand-green bg-emerald-50 dark:bg-emerald-950/30 p-0.5 rounded-full" />
                  <span className="text-[9px] font-medium">नया</span>
                </button>
                <button className="flex flex-col items-center gap-0.5 text-zinc-400 dark:text-zinc-500">
                  <MessageCircle className="h-5 w-5" />
                  <span className="text-[9px] font-medium">मैसेज</span>
                </button>
                <button className="flex flex-col items-center gap-0.5 text-zinc-400 dark:text-zinc-500">
                  <User className="h-5 w-5" />
                  <span className="text-[9px] font-medium">प्रोफाइल</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
