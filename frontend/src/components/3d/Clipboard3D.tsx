import React from "react";

interface Clipboard3DProps {
  className?: string;
  size?: number;
}

export function Clipboard3D({ className = "", size = 68 }: Clipboard3DProps) {
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
          <linearGradient id="clipBoardBase" x1="14" y1="12" x2="66" y2="72" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="60%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="clipPaper" x1="20" y1="18" x2="60" y2="68" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
          <linearGradient id="clipMetal" x1="28" y1="8" x2="52" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E2E8F0" />
            <stop offset="50%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
        </defs>

        {/* 3D Blue Clipboard Board */}
        <rect x="14" y="12" width="52" height="60" rx="8" fill="url(#clipBoardBase)" />
        {/* Specular edge */}
        <rect x="14" y="12" width="52" height="60" rx="8" stroke="#93C5FD" strokeWidth="1.5" strokeOpacity="0.6" />

        {/* White Paper Sheet */}
        <rect x="20" y="18" width="40" height="50" rx="5" fill="url(#clipPaper)" />

        {/* Metal Clamp */}
        <rect x="30" y="8" width="20" height="12" rx="3" fill="url(#clipMetal)" />
        <ellipse cx="40" cy="11" rx="4" ry="2" fill="#334155" />

        {/* Checklist Rows with green checkmarks */}
        {/* Row 1 */}
        <circle cx="28" cy="30" r="4" fill="#DCFCE7" />
        <path d="M26 30L27.5 31.5L30 28.5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="35" y="28.5" width="19" height="3" rx="1.5" fill="#94A3B8" />

        {/* Row 2 */}
        <circle cx="28" cy="42" r="4" fill="#DCFCE7" />
        <path d="M26 42L27.5 43.5L30 40.5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="35" y="40.5" width="16" height="3" rx="1.5" fill="#94A3B8" />

        {/* Row 3 */}
        <circle cx="28" cy="54" r="4" fill="#DCFCE7" />
        <path d="M26 54L27.5 55.5L30 52.5" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="35" y="52.5" width="20" height="3" rx="1.5" fill="#CBD5E1" />
      </svg>
    </div>
  );
}
