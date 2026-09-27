import React from "react";

interface ParliamentSidebarWidgetProps {
  className?: string;
}

export function ParliamentSidebarWidget({ className = "" }: ParliamentSidebarWidgetProps) {
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-b from-navy-900/90 to-navy-950 border border-blue-500/20 p-3 shadow-lg ${className}`}>
      {/* Ambient background neon glow */}
      <div className="absolute inset-0 bg-radial-gradient from-blue-600/15 via-transparent to-transparent pointer-events-none" />

      {/* 3D Isometric Parliament on Pedestal */}
      <div className="flex justify-center my-1">
        <svg
          width="160"
          height="100"
          viewBox="0 0 200 125"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-lg"
        >
          <defs>
            <linearGradient id="pedestalSideDark" x1="50" y1="90" x2="150" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="pedestalTopGlow" x1="40" y1="85" x2="160" y2="85" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="lawnDark" x1="55" y1="80" x2="145" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
            <linearGradient id="parlBody" x1="70" y1="50" x2="130" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF3C7" />
              <stop offset="100%" stopColor="#FCD34D" />
            </linearGradient>
            <linearGradient id="parlDome" x1="85" y1="30" x2="115" y2="55" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <radialGradient id="glowUnder" cx="100" cy="95" r="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Underglow */}
          <ellipse cx="100" cy="95" rx="80" ry="25" fill="url(#glowUnder)" />

          {/* Neon Grid pedestal */}
          <path d="M30 95C30 85 60 76 100 76C140 76 170 85 170 95V105C170 115 140 124 100 124C60 124 30 115 30 105V95Z" fill="url(#pedestalSideDark)" />
          <ellipse cx="100" cy="95" rx="70" ry="19" fill="url(#pedestalTopGlow)" />
          <ellipse cx="100" cy="95" rx="66" ry="17" fill="none" stroke="#93C5FD" strokeWidth="1.5" strokeOpacity="0.9" />

          {/* Grass Island */}
          <ellipse cx="100" cy="90" rx="55" ry="14" fill="url(#lawnDark)" />

          {/* 3D Round Parliament Colonnade */}
          <path d="M68 64C68 56 82 50 100 50C118 50 132 56 132 64V78C132 86 118 92 100 92C82 92 68 86 68 78V64Z" fill="url(#parlBody)" />
          <ellipse cx="100" cy="64" rx="32" ry="8" fill="#FEF9C3" />
          <ellipse cx="100" cy="63" rx="32.5" ry="8" fill="none" stroke="#EF4444" strokeWidth="1.5" />

          {/* Columns */}
          {[74, 82, 91, 100, 109, 118, 126].map((x, i) => (
            <line key={i} x1={x} y1="65" x2={x} y2="80" stroke="#D97706" strokeWidth="1.5" strokeOpacity="0.5" />
          ))}

          {/* Middle Drum & Dome */}
          <path d="M80 50C80 44 89 40 100 40C111 40 120 44 120 50V58C120 64 111 68 100 68C89 68 80 64 80 58V50Z" fill="#FDE68A" />
          <path d="M86 42C86 30 92 22 100 22C108 22 114 30 114 42C109 45 104 46 100 46C96 46 91 45 86 42Z" fill="url(#parlDome)" />

          {/* Spire & Flag */}
          <line x1="100" y1="22" x2="100" y2="8" stroke="#FFFFFF" strokeWidth="1.5" />
          <path d="M100 8H112V11H100V8Z" fill="#FF9933" />
          <path d="M100 11H112V14H100V11Z" fill="#FFFFFF" />
          <path d="M100 14H112V17H100V14Z" fill="#138808" />

          {/* Miniature trees */}
          <circle cx="58" cy="85" r="4.5" fill="#4ADE80" />
          <circle cx="63" cy="88" r="4" fill="#22C55E" />
          <circle cx="142" cy="85" r="4.5" fill="#4ADE80" />
          <circle cx="137" cy="88" r="4" fill="#22C55E" />
        </svg>
      </div>

      <div className="text-center mt-2">
        <p className="text-[11.5px] font-bold text-white tracking-wide">MPLADS</p>
        <p className="text-[9px] text-blue-200/80 font-medium">AI Monitoring &amp; Audit Intelligence</p>
        <p className="text-[8px] text-slate-400 mt-1 leading-tight">
          Empowering Transparency<br />For a Stronger Democracy
        </p>
      </div>
    </div>
  );
}
