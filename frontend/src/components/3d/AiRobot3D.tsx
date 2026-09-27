import React from "react";

interface AiRobot3DProps {
  className?: string;
  size?: number;
}

export function AiRobot3D({ className = "", size = 48 }: AiRobot3DProps) {
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
      >
        <defs>
          <linearGradient id="botHead" x1="12" y1="14" x2="52" y2="54" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#E0E7FF" />
            <stop offset="100%" stopColor="#C7D2FE" />
          </linearGradient>
          <linearGradient id="botVisor" x1="18" y1="24" x2="46" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>
          <linearGradient id="botEar" x1="4" y1="28" x2="16" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
          <filter id="glowEyes" x="16" y="24" width="32" height="20" filterUnits="userSpaceOnUse">
            <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#38BDF8" floodOpacity="0.8" />
          </filter>
        </defs>

        {/* Top Antenna */}
        <line x1="32" y1="6" x2="32" y2="16" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="32" cy="6" r="3.5" fill="#38BDF8" />
        <circle cx="32" cy="6" r="1.5" fill="#FFFFFF" />

        {/* Ear modules */}
        <rect x="6" y="27" width="6" height="12" rx="3" fill="url(#botEar)" />
        <rect x="52" y="27" width="6" height="12" rx="3" fill="url(#botEar)" />

        {/* Robot Head Body */}
        <rect x="12" y="14" width="40" height="38" rx="16" fill="url(#botHead)" stroke="#EEF2FF" strokeWidth="1.5" />

        {/* Visor Screen */}
        <rect x="17" y="22" width="30" height="18" rx="8" fill="url(#botVisor)" />

        {/* Glowing Visor Eyes / UI */}
        <g filter="url(#glowEyes)">
          <ellipse cx="25" cy="31" rx="3.5" ry="4" fill="#38BDF8" />
          <ellipse cx="39" cy="31" rx="3.5" ry="4" fill="#38BDF8" />
          <circle cx="26" cy="30" r="1.2" fill="#FFFFFF" />
          <circle cx="40" cy="30" r="1.2" fill="#FFFFFF" />
        </g>

        {/* Smile curve */}
        <path d="M28 36C29.5 37.5 34.5 37.5 36 36" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />

        {/* Subtle Cheek blush */}
        <circle cx="20" cy="35" r="1.5" fill="#F472B6" fillOpacity="0.6" />
        <circle cx="44" cy="35" r="1.5" fill="#F472B6" fillOpacity="0.6" />
      </svg>
    </div>
  );
}
