import React from "react";

export type StatIconType = "folder" | "completed" | "delayed" | "attention" | "allocated";

interface Stat3DIconProps {
  type: StatIconType;
  className?: string;
  size?: number;
}

export function Stat3DIcon({ type, className = "", size = 64 }: Stat3DIconProps) {
  switch (type) {
    case "folder":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-md transition-transform duration-300 hover:scale-105 ${className}`}
        >
          <defs>
            <linearGradient id="folderBack" x1="10" y1="20" x2="65" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="folderFront" x1="10" y1="35" x2="70" y2="75" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="60%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
            <linearGradient id="docGrad1" x1="30" y1="12" x2="60" y2="55" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient id="docGrad2" x1="38" y1="8" x2="68" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <filter id="folderShadow" x="4" y="6" width="72" height="72" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#1E40AF" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#folderShadow)">
            {/* Back folder flap */}
            <path
              d="M12 26C12 22.6863 14.6863 20 18 20H32.5C34.5 20 36.3 21 37.5 22.5L41 27H62C65.3137 27 68 29.6863 68 33V60C68 63.3137 65.3137 66 62 66H18C14.6863 66 12 63.3137 12 60V26Z"
              fill="url(#folderBack)"
            />
            {/* White Documents sticking out */}
            <rect x="28" y="12" width="28" height="34" rx="4" transform="rotate(7 28 12)" fill="url(#docGrad2)" />
            <rect x="24" y="14" width="28" height="34" rx="4" transform="rotate(-3 24 14)" fill="url(#docGrad1)" />
            <rect x="28" y="20" width="16" height="2.5" rx="1.25" transform="rotate(-3 28 20)" fill="#94A3B8" />
            <rect x="27" y="25" width="20" height="2.5" rx="1.25" transform="rotate(-3 27 25)" fill="#CBD5E1" />
            {/* Front folder 3D curve */}
            <path
              d="M10 36C10 32.6863 12.6863 30 16 30H64C67.3137 30 70 32.6863 70 36V60C70 64.4183 66.4183 68 62 68H18C13.5817 68 10 64.4183 10 60V36Z"
              fill="url(#folderFront)"
            />
            {/* Specular sheen on top edge */}
            <path
              d="M16 31H64C66.5 31 68.5 32.5 69 34.5C67.5 33 65 32 63 32H17C15 32 12.5 33 11 34.5C11.5 32.5 13.5 31 16 31Z"
              fill="#93C5FD"
              fillOpacity="0.8"
            />
          </g>
        </svg>
      );

    case "completed":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-md transition-transform duration-300 hover:scale-105 ${className}`}
        >
          <defs>
            <linearGradient id="shieldBase" x1="16" y1="12" x2="64" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="shieldRim" x1="20" y1="14" x2="60" y2="66" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <filter id="shieldShadow" x="6" y="8" width="68" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#047857" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#shieldShadow)">
            {/* 3D Shield base */}
            <path
              d="M40 12L64 20V38C64 53.5 53.5 65.5 40 70C26.5 65.5 16 53.5 16 38V20L40 12Z"
              fill="url(#shieldBase)"
            />
            {/* Inner bevel rim */}
            <path
              d="M40 17L59 23.5V37C59 49.5 50.5 59.5 40 63.5C29.5 59.5 21 49.5 21 37V23.5L40 17Z"
              fill="none"
              stroke="url(#shieldRim)"
              strokeWidth="3"
            />
            {/* Gloss highlight */}
            <path
              d="M40 17L59 23.5V33C50 31 30 33 21 38V23.5L40 17Z"
              fill="#FFFFFF"
              fillOpacity="0.25"
            />
            {/* 3D Checkmark */}
            <path
              d="M31 39L37 45L50 31"
              stroke="#FFFFFF"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      );

    case "delayed":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-md transition-transform duration-300 hover:scale-105 ${className}`}
        >
          <defs>
            <linearGradient id="clockBody" x1="16" y1="16" x2="64" y2="68" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="45%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#B91C1C" />
            </linearGradient>
            <linearGradient id="clockDial" x1="24" y1="24" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FEE2E2" />
            </linearGradient>
            <filter id="clockShadow" x="6" y="8" width="68" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#991B1B" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#clockShadow)">
            {/* Alarm Bells */}
            <ellipse cx="23" cy="20" rx="9" ry="6" transform="rotate(-30 23 20)" fill="#EF4444" />
            <ellipse cx="57" cy="20" rx="9" ry="6" transform="rotate(30 57 20)" fill="#EF4444" />
            {/* Clock Legs */}
            <rect x="20" y="60" width="6" height="10" rx="3" transform="rotate(25 20 60)" fill="#DC2626" />
            <rect x="54" y="60" width="6" height="10" rx="3" transform="rotate(-25 54 60)" fill="#DC2626" />
            {/* Main Round Body */}
            <circle cx="40" cy="42" r="26" fill="url(#clockBody)" />
            {/* Inner Dial */}
            <circle cx="40" cy="42" r="20" fill="url(#clockDial)" />
            {/* Minute ticks */}
            <circle cx="40" cy="25" r="1.5" fill="#EF4444" />
            <circle cx="57" cy="42" r="1.5" fill="#EF4444" />
            <circle cx="40" cy="59" r="1.5" fill="#EF4444" />
            <circle cx="23" cy="42" r="1.5" fill="#EF4444" />
            {/* Clock Hands */}
            <line x1="40" y1="42" x2="40" y2="29" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
            <line x1="40" y1="42" x2="51" y2="42" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
            <circle cx="40" cy="42" r="3" fill="#DC2626" />
            {/* Top glass reflection */}
            <path
              d="M24 33C27 27 34 24 40 24C46 24 53 27 56 33C51 31 45 30 40 30C35 30 29 31 24 33Z"
              fill="#FFFFFF"
              fillOpacity="0.4"
            />
          </g>
        </svg>
      );

    case "attention":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-md transition-transform duration-300 hover:scale-105 ${className}`}
        >
          <defs>
            <linearGradient id="warnBody" x1="14" y1="16" x2="66" y2="68" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <filter id="warnShadow" x="6" y="8" width="68" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#B45309" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#warnShadow)">
            {/* 3D Triangle Shield */}
            <path
              d="M35.67 17.5C37.59 14.16 42.41 14.16 44.33 17.5L68.84 60C70.76 63.33 68.36 67.5 64.51 67.5H15.49C11.64 67.5 9.24 63.33 11.16 60L35.67 17.5Z"
              fill="url(#warnBody)"
            />
            {/* Inner rim border */}
            <path
              d="M37.4 20.5L16.2 59.5C15.2 61.2 16.5 63.5 18.5 63.5H61.5C63.5 63.5 64.8 61.2 63.8 59.5L42.6 20.5C41.6 18.8 38.4 18.8 37.4 20.5Z"
              fill="#FEF3C7"
            />
            {/* Exclamation mark */}
            <rect x="37.5" y="28" width="5" height="18" rx="2.5" fill="#B45309" />
            <circle cx="40" cy="53" r="3.2" fill="#B45309" />
            {/* Gloss reflection */}
            <path
              d="M40 18L58 52C53 50 47 49 40 49C33 49 27 50 22 52L40 18Z"
              fill="#FFFFFF"
              fillOpacity="0.35"
            />
          </g>
        </svg>
      );

    case "allocated":
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`drop-shadow-md transition-transform duration-300 hover:scale-105 ${className}`}
        >
          <defs>
            <linearGradient id="goldCoinTop" x1="20" y1="20" x2="60" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="60%" stopColor="#EAB308" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
            <linearGradient id="goldCoinSide" x1="20" y1="25" x2="60" y2="65" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#CA8A04" />
              <stop offset="100%" stopColor="#854D0E" />
            </linearGradient>
            <filter id="coinShadow" x="6" y="8" width="68" height="68" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor="#854D0E" floodOpacity="0.25" />
            </filter>
          </defs>
          <g filter="url(#coinShadow)">
            {/* Bottom Coin */}
            <path d="M18 52C18 46.5 27.85 42 40 42C52.15 42 62 46.5 62 52V58C62 63.5 52.15 68 40 68C27.85 68 18 63.5 18 58V52Z" fill="url(#goldCoinSide)" />
            <ellipse cx="40" cy="52" rx="22" ry="7" fill="url(#goldCoinTop)" />

            {/* Middle Coin */}
            <path d="M18 40C18 34.5 27.85 30 40 30C52.15 30 62 34.5 62 40V46C62 51.5 52.15 56 40 56C27.85 56 18 51.5 18 46V40Z" fill="url(#goldCoinSide)" />
            <ellipse cx="40" cy="40" rx="22" ry="7" fill="url(#goldCoinTop)" />

            {/* Top Coin */}
            <path d="M18 28C18 22.5 27.85 18 40 18C52.15 18 62 22.5 62 28V34C62 39.5 52.15 44 40 44C27.85 44 18 39.5 18 34V28Z" fill="url(#goldCoinSide)" />
            <ellipse cx="40" cy="28" rx="22" ry="7" fill="url(#goldCoinTop)" />

            {/* Rupee Symbol on Top Coin */}
            <text
              x="40"
              y="33"
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              fill="#713F12"
              fontFamily="system-ui, sans-serif"
            >
              ₹
            </text>
            {/* Gloss rim */}
            <ellipse cx="40" cy="28" rx="19" ry="5.5" fill="none" stroke="#FEF08A" strokeWidth="1" strokeOpacity="0.8" />
          </g>
        </svg>
      );
  }
}
