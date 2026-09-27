"use client";

import { useState } from "react";
import { Search, Bell, ChevronDown, Menu, ShieldCheck, ExternalLink, LogOut, Sparkles } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@/lib/mockData";
import { Emblem } from "./Emblem";

interface HeaderProps {
  /** Opens the mobile navigation drawer. Only relevant below the lg breakpoint. */
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="fixed top-0 inset-x-0 z-40 h-[60px] bg-gradient-to-r from-navy-950 via-[#0a1b3d] to-navy-950 border-b border-white/10 shadow-lg flex items-stretch">
      {/* Brand lockup — width matches the sidebar on desktop */}
      <div className="hidden lg:flex w-64 shrink-0 items-center gap-3 px-4 border-r border-white/5">
        <div className="relative">
          <Emblem size={32} />
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-navy-950 rounded-full" />
        </div>
        <div className="leading-tight min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[15px] font-extrabold text-white tracking-tight">MPLADS</span>
            <span className="text-[9px] font-bold bg-blue-500/30 text-blue-300 border border-blue-400/40 rounded px-1.5 py-0.2">
              AI
            </span>
          </div>
          <p className="text-[9.5px] font-medium text-slate-300 truncate">AI Monitoring &amp; Audit Intelligence</p>
          <p className="text-[8px] text-slate-400 truncate">Smarter Oversight. Greater Impact.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-between gap-3 px-3 sm:px-6 min-w-0">
        {/* Mobile Hamburger & Logo */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            className="p-2 -ml-1 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
          >
            <Menu size={20} />
          </button>

          <Link href="/demo" className="flex items-center gap-2">
            <Emblem size={24} />
            <span className="text-[14px] font-extrabold text-white tracking-tight">MPLADS</span>
          </Link>
        </div>

        {/* Search Bar with glowing gradient ring */}
        <div className="flex-1 max-w-[480px] mx-auto hidden sm:block">
          <div className="relative group">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-blue-300 pointer-events-none transition-colors group-focus-within:text-blue-400"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, constituencies, agencies..."
              aria-label="Search projects, constituencies, agencies"
              className="w-full bg-[#132c58]/80 hover:bg-[#163468] text-slate-100 placeholder:text-blue-200/60 text-[12px] rounded-full pl-9 pr-4 py-2 border border-blue-400/30 focus:border-blue-400 focus:bg-[#15346a] focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-inner transition-all"
            />
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Quick links for Field App & Connected Workspace */}
          <Link
            href="/workspace"
            className="hidden md:inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-blue-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1.5 rounded-full transition-all"
          >
            <ShieldCheck size={13} className="text-blue-400" />
            Connected Workspace
          </Link>

          {/* Notifications Bell with badge */}
          <button
            aria-label="5 unread notifications"
            className="relative p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-colors"
          >
            <Bell size={18} />
            <span className="absolute top-1 right-1 bg-gradient-to-r from-red-500 to-rose-600 text-white text-[9.5px] font-bold rounded-full min-w-[17px] h-[17px] px-1 flex items-center justify-center shadow-md shadow-red-500/40 animate-pulse">
              5
            </span>
          </button>

          {/* User Profile Pill & Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2.5 p-1 sm:px-2.5 sm:py-1 rounded-full hover:bg-white/10 border border-white/5 sm:border-white/10 transition-all text-left"
            >
              <div className="w-[32px] h-[32px] rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-blue-400 text-white text-[11px] font-bold flex items-center justify-center shadow-md shadow-blue-500/30 ring-2 ring-white/20">
                {currentUser.avatarInitials}
              </div>
              <div className="hidden sm:block leading-tight">
                <p className="text-[12px] font-bold text-white tracking-tight">{currentUser.name}</p>
                <p className="text-[10px] text-blue-200/80 font-medium">{currentUser.role}</p>
              </div>
              <ChevronDown size={14} className={`text-slate-300 hidden sm:block transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-navy-950 border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-slate-200">
                <div className="px-3 py-2 border-b border-white/10 mb-1">
                  <p className="text-xs font-bold text-white">{currentUser.name}</p>
                  <p className="text-[10px] text-slate-400">{currentUser.role}</p>
                  <span className="inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-400 mt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Authorized Representative
                  </span>
                </div>
                <Link
                  href="/workspace"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-[11.5px] rounded-lg hover:bg-white/10 transition-colors"
                >
                  <ShieldCheck size={14} className="text-blue-400" />
                  Connected Workspace
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-[11.5px] rounded-lg hover:bg-white/10 transition-colors"
                >
                  <Sparkles size={14} className="text-amber-400" />
                  AI Preferences
                </Link>
                <Link
                  href="/field"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-[11.5px] rounded-lg hover:bg-white/10 transition-colors"
                >
                  <ExternalLink size={14} className="text-slate-400" />
                  Field Inspection App
                </Link>
                <div className="border-t border-white/10 mt-1 pt-1">
                  <Link
                    href="/"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 text-[11.5px] text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut size={14} />
                    Sign Out / Switch Scope
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
