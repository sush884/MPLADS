"use client";

import React, { useState } from "react";
import { Calendar, ChevronDown, Clock, Sparkles } from "lucide-react";
import { dashboardMeta } from "@/lib/mockData";
import { Parliament3DIsland } from "@/components/3d/Parliament3DIsland";

interface WelcomeBannerProps {
  userName?: string;
  role?: string;
}

export function WelcomeBanner({ userName = "Shri Arjun Mehta" }: WelcomeBannerProps) {
  const [dateRange, setDateRange] = useState(dashboardMeta.dateRange);
  const [dateMenuOpen, setDateMenuOpen] = useState(false);

  const dateOptions = [
    "Apr 2021 – Dec 2024",
    "Jan 2024 – Dec 2024",
    "Current Financial Year (2024-25)",
    "All Available Terms"
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-50 via-sky-50 to-indigo-50/60 border border-blue-100/80 shadow-sm p-4 sm:p-5 mb-5">
      {/* Decorative ambient light orbs */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 right-12 w-48 h-48 bg-indigo-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left: User greeting & timestamp */}
        <div className="space-y-2 min-w-0 max-w-md">
          <div>
            <h1 className="text-[22px] sm:text-[25px] font-extrabold text-slate-900 tracking-tight leading-tight">
              Welcome, {userName}
            </h1>
            <p className="text-[12.5px] sm:text-[13px] text-slate-600 mt-0.5">
              Here&apos;s the overview of MPLADS projects in your constituency
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-blue-200/60 rounded-full px-3 py-1 shadow-2xs">
            <Clock size={12} className="text-blue-600 shrink-0" />
            <span className="text-[11px] font-medium text-slate-600">
              Last updated: <strong className="text-slate-800 font-semibold">{dashboardMeta.lastUpdated}</strong>
            </span>
          </div>
        </div>

        {/* Center: Signature 3D Parliament Island */}
        <div className="hidden md:flex items-center justify-center shrink-0 -my-2 lg:-my-4">
          <Parliament3DIsland size="sm" showFloatingWidgets={true} />
        </div>

        {/* Right: Inspirational quote + Date range filter */}
        <div className="flex flex-col sm:flex-row lg:flex-col lg:items-end justify-between gap-3 shrink-0">
          {/* Quote */}
          <div className="max-w-xs lg:text-right hidden sm:block">
            <p className="text-[11.5px] italic text-slate-600 leading-relaxed">
              &ldquo;Development is not just about building infrastructure, it&apos;s about building a better tomorrow.&rdquo;
            </p>
            <p className="text-[10px] font-bold text-blue-700 tracking-wide mt-0.5">
              — MPLADS
            </p>
          </div>

          {/* Date Selector Pill */}
          <div className="relative">
            <button
              onClick={() => setDateMenuOpen(!dateMenuOpen)}
              className="inline-flex items-center gap-2 bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-[12px] font-semibold shadow-xs transition-all w-full sm:w-auto justify-center"
            >
              <Calendar size={14} className="text-blue-600 shrink-0" />
              <span className="truncate">{dateRange}</span>
              <ChevronDown size={14} className={`text-slate-400 shrink-0 transition-transform ${dateMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {dateMenuOpen && (
              <div className="absolute right-0 mt-1.5 w-60 rounded-xl bg-white border border-slate-200 shadow-xl p-1.5 z-40 animate-in fade-in zoom-in-95 duration-150">
                {dateOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => {
                      setDateRange(opt);
                      setDateMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-[11.5px] rounded-lg transition-colors ${
                      dateRange === opt ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
