import React from "react";

interface GrowthBars3DProps {
  className?: string;
  size?: number;
}

export function GrowthBars3D({ className = "", size = 64 }: GrowthBars3DProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-lg transition-transform duration-300 hover:scale-105"
      >
        <defs>
          <linearGradient id="bar1Top" x1="12" y1="44" x2="28" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#93C5FD" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
          <linearGradient id="bar1Side" x1="12" y1="44" x2="28" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          <linearGradient id="bar2Top" x1="28" y1="30" x2="44" y2="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <linearGradient id="bar2Side" x1="28" y1="30" x2="44" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>

          <linearGradient id="bar3Top" x1="44" y1="16" x2="60" y2="16" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="bar3Side" x1="44" y1="16" x2="60" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          <linearGradient id="promoCoinTop" x1="50" y1="46" x2="72" y2="62" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
          <linearGradient id="promoCoinSide" x1="50" y1="52" x2="72" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#CA8A04" />
            <stop offset="100%" stopColor="#854D0E" />
          </linearGradient>
        </defs>

        {/* 3D Isometric Bar 1 (Short) */}
        <path d="M12 48L20 44L28 48L20 52Z" fill="url(#bar1Top)" />
        <path d="M12 48L20 52V68L12 64Z" fill="#1E40AF" />
        <path d="M20 52L28 48V64L20 68Z" fill="url(#bar1Side)" />

        {/* 3D Isometric Bar 2 (Medium) */}
        <path d="M28 34L36 30L44 34L36 38Z" fill="url(#bar2Top)" />
        <path d="M28 34L36 38V68L28 64Z" fill="#1E40AF" />
        <path d="M36 38L44 34V64L36 68Z" fill="url(#bar2Side)" />

        {/* 3D Isometric Bar 3 (Tall) */}
        <path d="M44 20L52 16L60 20L52 24Z" fill="url(#bar3Top)" />
        <path d="M44 20L52 24V68L44 64Z" fill="#0369A1" />
        <path d="M52 24L60 20V64L52 68Z" fill="url(#bar3Side)" />

        {/* Floating Golden Coin */}
        <path d="M54 52C54 48 60 45 68 45C76 45 82 48 82 52V56C82 60 76 63 68 63C60 63 54 60 54 56V52Z" fill="url(#promoCoinSide)" />
        <ellipse cx="68" cy="52" rx="12" ry="5.5" fill="url(#promoCoinTop)" />
        <text x="68" y="55" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#713F12" fontFamily="system-ui, sans-serif">₹</text>
      </svg>
    </div>
  );
}
