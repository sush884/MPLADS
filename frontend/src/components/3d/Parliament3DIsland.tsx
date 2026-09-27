import React from "react";
import { INDIA_MAINLAND_STATES } from "./indiaMapData";

interface Parliament3DIslandProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showFloatingWidgets?: boolean;
}

export function Parliament3DIsland({
  className = "",
  size = "md",
  showFloatingWidgets = true
}: Parliament3DIslandProps) {
  const dimensions = {
    sm: { w: 220, h: 160 },
    md: { w: 340, h: 230 },
    lg: { w: 460, h: 320 }
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        width={dimensions.w}
        height={dimensions.h}
        viewBox="0 0 460 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-2xl transition-transform duration-500 hover:scale-[1.02]"
      >
        <defs>
          {/* Base Pedestal Gradients */}
          <linearGradient id="pedestalTop" x1="80" y1="180" x2="380" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="pedestalSide" x1="120" y1="240" x2="340" y2="310" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="100%" stopColor="#172554" />
          </linearGradient>
          <linearGradient id="pedestalGrass" x1="100" y1="180" x2="360" y2="260" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="50%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>

          {/* Parliament Building Gradients */}
          <linearGradient id="bldTier1" x1="140" y1="130" x2="320" y2="210" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="40%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="bldTier2" x1="165" y1="100" x2="295" y2="170" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFDF5" />
            <stop offset="50%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#FCD34D" />
          </linearGradient>
          <linearGradient id="bldDome" x1="190" y1="70" x2="270" y2="130" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
          <linearGradient id="bldRoofColonnade" x1="140" y1="130" x2="320" y2="145" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F87171" />
            <stop offset="50%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>

          {/* Tree gradients */}
          <linearGradient id="treeGreen1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
          <linearGradient id="treeGreen2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>

          {/* Floating UI Card Glass */}
          <linearGradient id="glassCard" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0.65" />
          </linearGradient>

          {/* Base Glow */}
          <radialGradient id="baseGlow" cx="230" cy="240" r="160" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#3B82F6" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient Ground Glow */}
        <ellipse cx="230" cy="250" rx="190" ry="60" fill="url(#baseGlow)" />

        {/* Floating Holographic Map/Dashboard Backdrop (Optional) */}
        {showFloatingWidgets && (
          <g opacity="0.9">
            {/* Holographic grid lines & India backdrop */}
            <path
              d="M170 30L260 20L310 50L290 100L230 140L170 110L140 60Z"
              fill="#93C5FD"
              fillOpacity="0.25"
              stroke="#60A5FA"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            {/* Holographic Accurate India Map Silhouette */}
            <g transform="translate(170, 22) scale(0.14)" fill="#3B82F6" fillOpacity="0.32" stroke="#60A5FA" strokeWidth="0.8">
              {INDIA_MAINLAND_STATES.map((s) => (
                <path key={`holo-${s.id}`} d={s.path} />
              ))}
            </g>
            {/* Map Pin Point (Bhopal/Central) */}
            <circle cx="208" cy="72" r="3.5" fill="#EF4444" />
            <circle cx="208" cy="72" r="7" stroke="#F87171" strokeWidth="1" fill="#EF4444" fillOpacity="0.25" />

            {/* Floating Glass Chart Card (Top Right) */}
            <g transform="translate(290, 35)">
              <rect x="0" y="0" width="75" height="52" rx="8" fill="url(#glassCard)" stroke="#FFFFFF" strokeWidth="1.5" />
              <rect x="10" y="32" width="8" height="12" rx="2" fill="#3B82F6" />
              <rect x="22" y="24" width="8" height="20" rx="2" fill="#10B981" />
              <rect x="34" y="16" width="8" height="28" rx="2" fill="#6366F1" />
              <rect x="46" y="20" width="8" height="24" rx="2" fill="#F59E0B" />
              <line x1="10" y1="46" x2="65" y2="46" stroke="#CBD5E1" strokeWidth="1.5" />
              <circle cx="58" cy="14" r="3" fill="#10B981" />
            </g>

            {/* Floating Glass Metric Card (Top Left) */}
            <g transform="translate(95, 45)">
              <rect x="0" y="0" width="70" height="48" rx="8" fill="url(#glassCard)" stroke="#FFFFFF" strokeWidth="1.5" />
              <rect x="10" y="10" width="28" height="4" rx="2" fill="#3B82F6" />
              <rect x="10" y="18" width="48" height="3" rx="1.5" fill="#94A3B8" />
              <rect x="10" y="25" width="38" height="3" rx="1.5" fill="#CBD5E1" />
              <circle cx="54" cy="34" r="6" fill="#10B981" />
              <path d="M51 34L53.5 36.5L57 32" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </g>
        )}

        {/* 3D Isometric Floating Island Pedestal */}
        {/* Layer 1 - Bottom Tech Base Ring */}
        <path
          d="M80 235C80 210 147 190 230 190C313 190 380 210 380 235V260C380 285 313 305 230 305C147 305 80 285 80 260V235Z"
          fill="url(#pedestalSide)"
        />
        <ellipse cx="230" cy="235" rx="150" ry="45" fill="url(#pedestalTop)" />

        {/* Neon Grid Rim */}
        <ellipse cx="230" cy="235" rx="146" ry="42" fill="none" stroke="#93C5FD" strokeWidth="2" strokeOpacity="0.8" />

        {/* Layer 2 - Lush Green Grass Island */}
        <path
          d="M100 220C100 200 158 185 230 185C302 185 360 200 360 220V235C360 255 302 270 230 270C158 270 100 255 100 235V220Z"
          fill="#15803D"
        />
        <ellipse cx="230" cy="220" rx="130" ry="36" fill="url(#pedestalGrass)" />

        {/* Stepped Concrete Courtyard */}
        <ellipse cx="230" cy="214" rx="105" ry="28" fill="#E2E8F0" />
        <ellipse cx="230" cy="212" rx="98" ry="25" fill="#F8FAFC" />

        {/* 3D Round Parliament Building */}
        {/* Tier 1 - Outer Colonnade Cylindrical Ring */}
        <path
          d="M140 160C140 142 180 130 230 130C280 130 320 142 320 160V196C320 214 280 226 230 226C180 226 140 214 140 196V160Z"
          fill="url(#bldTier1)"
        />
        <ellipse cx="230" cy="160" rx="90" ry="22" fill="#FEF08A" />

        {/* Red Roof Cornice Trim */}
        <ellipse cx="230" cy="158" rx="91" ry="22" fill="none" stroke="url(#bldRoofColonnade)" strokeWidth="4" />

        {/* Outer Columns (Vertical Pillars) */}
        {[
          152, 164, 178, 194, 212, 230, 248, 266, 282, 296, 308
        ].map((x, i) => {
          const yTop = 160 + Math.sin(((x - 140) / 180) * Math.PI) * 16 - 16;
          const yBot = 196 + Math.sin(((x - 140) / 180) * Math.PI) * 18 - 18;
          return (
            <g key={i}>
              <line x1={x} y1={yTop + 14} x2={x} y2={yBot + 16} stroke="#D97706" strokeWidth="2.5" strokeOpacity="0.4" />
              <line x1={x - 1} y1={yTop + 14} x2={x - 1} y2={yBot + 16} stroke="#FFFFFF" strokeWidth="1.5" />
            </g>
          );
        })}

        {/* Tier 2 - Middle Drum Ring */}
        <path
          d="M170 125C170 112 197 104 230 104C263 104 290 112 290 125V148C290 161 263 169 230 169C197 169 170 161 170 148V125Z"
          fill="url(#bldTier2)"
        />
        <ellipse cx="230" cy="125" rx="60" ry="15" fill="#FEF9C3" />
        <ellipse cx="230" cy="124" rx="61" ry="15" fill="none" stroke="#DC2626" strokeWidth="2.5" />

        {/* Tier 3 - Central Grand Dome */}
        <path
          d="M192 110C192 82 208 65 230 65C252 65 268 82 268 110C255 116 242 118 230 118C218 118 205 116 192 110Z"
          fill="url(#bldDome)"
        />
        {/* Dome Ribs */}
        <path d="M230 65V118" stroke="#FDE68A" strokeWidth="2" />
        <path d="M230 65C216 78 208 95 204 114" stroke="#FDE68A" strokeWidth="1.5" strokeOpacity="0.8" />
        <path d="M230 65C244 78 252 95 256 114" stroke="#D97706" strokeWidth="1.5" />

        {/* Dome Finial / Spire */}
        <rect x="228.5" y="48" width="3" height="18" fill="#F59E0B" rx="1.5" />
        <circle cx="230" cy="46" r="3.5" fill="#FDE047" />

        {/* Indian Tricolor Flag on Flagpole */}
        <line x1="230" y1="46" x2="230" y2="22" stroke="#E2E8F0" strokeWidth="2" />
        {/* Saffron */}
        <path d="M230 22H252C256 24 256 27 252 29H230V22Z" fill="#FF9933" />
        {/* White */}
        <path d="M230 29H252C256 31 256 34 252 36H230V29Z" fill="#FFFFFF" />
        <circle cx="240" cy="32.5" r="2" fill="#000080" />
        {/* Green */}
        <path d="M230 36H252C256 38 256 41 252 43H230V36Z" fill="#138808" />

        {/* Lush Miniature 3D Trees on Lawn */}
        {/* Left Tree Cluster */}
        <ellipse cx="125" cy="210" rx="9" ry="12" fill="url(#treeGreen1)" />
        <ellipse cx="132" cy="216" rx="8" ry="10" fill="url(#treeGreen2)" />
        <ellipse cx="118" cy="222" rx="7" ry="9" fill="url(#treeGreen1)" />
        <ellipse cx="140" cy="228" rx="8" ry="11" fill="url(#treeGreen2)" />

        {/* Right Tree Cluster */}
        <ellipse cx="335" cy="210" rx="9" ry="12" fill="url(#treeGreen1)" />
        <ellipse cx="328" cy="216" rx="8" ry="10" fill="url(#treeGreen2)" />
        <ellipse cx="342" cy="222" rx="7" ry="9" fill="url(#treeGreen1)" />
        <ellipse cx="320" cy="228" rx="8" ry="11" fill="url(#treeGreen2)" />

        {/* Front Path / Stairs */}
        <path d="M220 220L216 238H244L240 220Z" fill="#CBD5E1" />
        <line x1="219" y1="225" x2="241" y2="225" stroke="#94A3B8" strokeWidth="1" />
        <line x1="218" y1="230" x2="242" y2="230" stroke="#94A3B8" strokeWidth="1" />
        <line x1="217" y1="235" x2="243" y2="235" stroke="#94A3B8" strokeWidth="1" />
      </svg>
    </div>
  );
}
