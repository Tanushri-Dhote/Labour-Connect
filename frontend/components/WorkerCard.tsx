"use client";

import React from "react";
import { MessageCircle, Star, MapPin, Briefcase } from "lucide-react";

export interface WorkerProps {
  name: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  experience: number;
  distance: number;
  rating: number;
  reviewsCount: number;
  rate: number;
  available: boolean;
  avatarUrl?: string;
}

interface WorkerCardComponentProps {
  worker: WorkerProps;
  lang: "hi" | "en";
  onContact?: (type: "call" | "whatsapp", name: string) => void;
}

export function WorkerCard({ worker, lang, onContact }: WorkerCardComponentProps) {
  const [imageError, setImageError] = React.useState(false);
  const {
    name,
    nameEn,
    category,
    categoryEn,
    experience,
    distance,
    rating,
    reviewsCount,
    rate,
    available,
    avatarUrl,
  } = worker;

  const displayName = lang === "hi" ? name : nameEn;
  const displayCategory = lang === "hi" ? category : categoryEn;
  const experienceText = lang === "hi" ? `${experience} वर्ष अनुभव` : `${experience} Years Exp`;
  const distanceText = lang === "hi" ? `${distance} KM दूर` : `${distance} KM away`;
  const rateText = lang === "hi" ? `₹${rate} / दिन` : `₹${rate} / day`;
  
  const availabilityText = available 
    ? (lang === "hi" ? "उपलब्ध" : "Available")
    : (lang === "hi" ? "अनुपलब्ध" : "Unavailable");

  // Fallback avatars with beautiful colors if image not loaded
  const fallbackBg = [
    "bg-emerald-100 text-emerald-800",
    "bg-teal-100 text-teal-800",
    "bg-sky-100 text-sky-800",
    "bg-amber-100 text-amber-800",
  ][Math.floor((name.charCodeAt(0) || 0) % 4)];

  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2);

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border-2 border-black bg-white p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:border-zinc-800 dark:bg-zinc-950 text-zinc-955 dark:text-zinc-55">
      
      {/* Overlapping starburst badge in the corner */}
      <div className="absolute -top-2.5 -right-2.5 bg-lime-300 border-2 border-black rounded-md px-2 py-0.5 text-[9px] font-black uppercase text-zinc-955 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] rotate-[6deg] z-20 select-none">
        {rating >= 4.7 ? (lang === "hi" ? "टॉप रेटेड" : "TOP RATED") : (lang === "hi" ? "सत्यापित" : "VERIFIED")}
      </div>

      {/* Top Section: Avatar & Info */}
      <div className="flex items-start gap-4">
        {avatarUrl && !imageError ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="h-16 w-16 rounded-full object-cover border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-lg font-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${fallbackBg}`}>
            {initials}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h3 className="truncate font-black text-lg text-zinc-900 dark:text-zinc-50 group-hover:text-brand-green transition-colors font-heading">
              {displayName}
            </h3>
            
            {/* Availability Badge */}
            <span
              className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-black border border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] ${
                available
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              <span className={`mr-1 h-1.5 w-1.5 rounded-full ${available ? "bg-emerald-500" : "bg-red-500"}`} />
              {availabilityText}
            </span>
          </div>

          <p className="mt-0.5 text-sm font-bold text-zinc-650 dark:text-zinc-400 flex items-center gap-1">
            <Briefcase className="h-3.5 w-3.5 text-brand-green" />
            {displayCategory}
          </p>
          
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="font-bold">{experienceText}</span>
            <span className="h-1 w-1 rounded-full bg-zinc-400 dark:bg-zinc-700" />
            <span className="flex items-center gap-0.5">
              <MapPin className="h-3 w-3 text-zinc-500" />
              {distanceText}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 border-t-2 border-black" />

      {/* Bottom Section: Rating, Rate, Actions */}
      <div className="flex items-center justify-between gap-4">
        {/* Rating and Price */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-black text-zinc-900 dark:text-zinc-200">{rating}</span>
            <span className="text-xs text-zinc-450">({reviewsCount})</span>
          </div>
          <span className="mt-0.5 text-base font-extrabold text-brand-green">
            {rateText}
          </span>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onContact?.("whatsapp", displayName)}
            className="flex items-center gap-1.5 rounded-xl border-2 border-black bg-[#e7f7ef] hover:bg-emerald-100 px-4 py-1.5 text-sm font-black text-emerald-850 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:scale-95 cursor-pointer dark:bg-emerald-950/20"
          >
            <MessageCircle className="h-4 w-4 fill-current text-emerald-800" />
            <span>{lang === "hi" ? "व्हाट्सएप चैट" : "WhatsApp Chat"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
