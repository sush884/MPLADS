"use client";

import React, { useState, useEffect, useRef, useId } from "react";
import { INDIA_MAINLAND_STATES, INDIA_ISLAND_STATES, INDIA_MAP_PINS, MapPin } from "./indiaMapData";

export function MpladsHeroScene3D({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [activePin, setActivePin] = useState<string>("central");
  const uniqueId = useId().replace(/:/g, "_");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({
      x: -y * 14,
      y: x * 18
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full max-w-[560px] aspect-[4/3] flex items-center justify-center select-none cursor-pointer perspective-[1200px] ${className}`}
      style={{ perspective: "1200px" }}
    >
      {/* Soft Ambient Radial Glow Behind the Island */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 via-cyan-400/25 to-indigo-500/10 rounded-full blur-3xl pointer-events-none transform -translate-y-4 scale-95" />

      {/* Floating 3D Interactive Container */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform ease-out will-change-transform"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transitionDuration: isHovered ? "120ms" : "800ms"
        }}
      >
        {/* Subtle Ambient Floating Wrapper */}
        <div
          className={`w-full h-full flex items-center justify-center ${
            mounted ? "animate-float-subtle" : ""
          }`}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Main Vector / SVG Isometric Island Canvas */}
          <svg
            viewBox="0 0 580 440"
            className="w-full h-full drop-shadow-[0_25px_35px_rgba(30,58,138,0.22)] overflow-visible"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Podium Base Gradients */}
              <linearGradient id={`${uniqueId}_podiumSide`} x1="120" y1="280" x2="460" y2="400" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="50%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <linearGradient id={`${uniqueId}_podiumTop`} x1="140" y1="240" x2="440" y2="340" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#93C5FD" />
                <stop offset="50%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
              <linearGradient id={`${uniqueId}_grassTop`} x1="160" y1="240" x2="420" y2="330" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#86EFAC" />
                <stop offset="50%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#22C55E" />
              </linearGradient>
              <linearGradient id={`${uniqueId}_glowRing`} x1="100" y1="280" x2="480" y2="380" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#818CF8" stopOpacity="0.2" />
              </linearGradient>

              {/* India Map Holographic Glass Gradients */}
              <linearGradient id={`${uniqueId}_indiaMapSide`} x1="200" y1="80" x2="380" y2="280" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0369A1" />
                <stop offset="100%" stopColor="#075985" />
              </linearGradient>
              <linearGradient id={`${uniqueId}_indiaMap`} x1="200" y1="80" x2="380" y2="280" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="45%" stopColor="#0EA5E9" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
              <linearGradient id={`${uniqueId}_indiaMapHighlight`} x1="220" y1="80" x2="340" y2="220" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.2" />
              </linearGradient>

              {/* Analytics Card Gradients */}
              <linearGradient id={`${uniqueId}_chartPanel`} x1="360" y1="120" x2="480" y2="240" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1E293B" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0F172A" stopOpacity="0.98" />
              </linearGradient>
              <linearGradient id={`${uniqueId}_cardGlass`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#F0F9FF" stopOpacity="0.85" />
              </linearGradient>
              <linearGradient id={`${uniqueId}_barBlue`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
              <linearGradient id={`${uniqueId}_barEmerald`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
              <linearGradient id={`${uniqueId}_barAmber`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FBBF24" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              {/* Verification Stamp & Folder Gradients */}
              <linearGradient id={`${uniqueId}_folderBlue`} x1="140" y1="160" x2="220" y2="240" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <linearGradient id={`${uniqueId}_checkCircle`} x1="240" y1="260" x2="310" y2="330" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38BDF8" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#0EA5E9" />
              </linearGradient>

              {/* Tree 3D Sphere Gradients */}
              <linearGradient id={`${uniqueId}_treeCanopy`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#16A34A" />
              </linearGradient>
              <linearGradient id={`${uniqueId}_treeCanopyDark`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22C55E" />
                <stop offset="100%" stopColor="#15803D" />
              </linearGradient>

              {/* Soft Drop Shadow Filter */}
              <filter id={`${uniqueId}_shadow`} x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* ======================================================== */}
            {/* 1. LAYER 1: BASE PODIUM (Isometric Tiered Platform)      */}
            {/* ======================================================== */}
            <g id="base-podium">
              {/* Outer Glow Halo on Ground */}
              <ellipse cx="290" cy="350" rx="210" ry="60" fill="url(#glowRing)" opacity="0.35" />

              {/* Lower Tier - Base Floor & Side */}
              <path
                d="M 120 325 
                   C 120 310, 160 290, 290 290 
                   C 420 290, 460 310, 460 325 
                   L 460 355 
                   C 460 375, 420 395, 290 395 
                   C 160 395, 120 375, 120 355 Z"
                fill={`url(#${uniqueId}_podiumSide)`}
              />
              <path
                d="M 120 325 
                   C 120 305, 160 285, 290 285 
                   C 420 285, 460 305, 460 325 
                   C 460 345, 420 365, 290 365 
                   C 160 365, 120 345, 120 325 Z"
                fill={`url(#${uniqueId}_podiumTop)`}
              />

              {/* Glowing Accent Border Line */}
              <path
                d="M 120 325 C 120 345, 160 365, 290 365 C 420 365, 460 345, 460 325"
                stroke="#93C5FD"
                strokeWidth="2.5"
                opacity="0.8"
              />

              {/* Upper Island Tier - Green Grass Turf */}
              <path
                d="M 145 310 
                   C 145 295, 180 278, 290 278 
                   C 400 278, 435 295, 435 310 
                   L 435 328 
                   C 435 345, 400 360, 290 360 
                   C 180 360, 145 345, 145 328 Z"
                fill="#15803D"
              />
              <path
                d="M 145 308 
                   C 145 292, 180 275, 290 275 
                   C 400 275, 435 292, 435 308 
                   C 435 324, 400 340, 290 340 
                   C 180 340, 145 324, 145 308 Z"
                fill={`url(#${uniqueId}_grassTop)`}
              />
              {/* Inner lawn contour line */}
              <path
                d="M 160 306 C 160 294, 190 280, 290 280 C 390 280, 420 294, 420 306 C 420 318, 390 332, 290 332 C 190 332, 160 318, 160 306"
                stroke="#DCFCE7"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.6"
              />
            </g>

            {/* ======================================================== */}
            {/* 2. LAYER 2: 3D ISOMETRIC TREES (Perimeter Landscaping)    */}
            {/* ======================================================== */}
            <g id="trees" filter={`url(#${uniqueId}_shadow)`}>
              {/* Left Front Tree */}
              <ellipse cx="172" cy="326" rx="8" ry="4" fill="#064E3B" opacity="0.3" />
              <rect x="170" y="318" width="4" height="8" rx="2" fill="#78350F" />
              <circle cx="172" cy="314" r="14" fill={`url(#${uniqueId}_treeCanopy)`} />
              <circle cx="168" cy="310" r="4" fill="#86EFAC" opacity="0.6" />

              {/* Left Back Tree */}
              <ellipse cx="188" cy="294" rx="7" ry="3.5" fill="#064E3B" opacity="0.3" />
              <rect x="186.5" y="287" width="3.5" height="7" rx="1.5" fill="#78350F" />
              <circle cx="188" cy="283" r="12" fill={`url(#${uniqueId}_treeCanopyDark)`} />

              {/* Right Front Tree */}
              <ellipse cx="406" cy="322" rx="8" ry="4" fill="#064E3B" opacity="0.3" />
              <rect x="404" y="314" width="4" height="8" rx="2" fill="#78350F" />
              <circle cx="406" cy="310" r="15" fill={`url(#${uniqueId}_treeCanopy)`} />
              <circle cx="402" cy="306" r="4" fill="#86EFAC" opacity="0.6" />

              {/* Right Back Tree */}
              <ellipse cx="424" cy="296" rx="7" ry="3.5" fill="#064E3B" opacity="0.3" />
              <rect x="422.5" y="289" width="3.5" height="7" rx="1.5" fill="#78350F" />
              <circle cx="424" cy="285" r="11" fill={`url(#${uniqueId}_treeCanopyDark)`} />

              {/* Center Back Tree */}
              <ellipse cx="290" cy="274" rx="6" ry="3" fill="#064E3B" opacity="0.3" />
              <rect x="288.5" y="268" width="3" height="6" rx="1.5" fill="#78350F" />
              <circle cx="290" cy="265" r="10" fill={`url(#${uniqueId}_treeCanopy)`} />
            </g>

            {/* ======================================================== */}
            {/* 3. LAYER 3: 3D STANDING GEOGRAPHIC INDIA MAP (Centerpiece) */}
            {/* ======================================================== */}
            <g id="india-map-monument">
              {/* Ground Ambient Platform Shadow */}
              <ellipse cx="289" cy="265" rx="72" ry="16" fill="#0284C7" opacity="0.32" filter="blur(6px)" />

              {/* 3D Extruded Depth Slabs (Bottom & Right) */}
              <g transform="translate(214, 83) scale(0.265)" fill={`url(#${uniqueId}_indiaMapSide)`} opacity="0.85">
                {INDIA_MAINLAND_STATES.map((state) => (
                  <path key={`ext1-${state.id}`} d={state.path} />
                ))}
              </g>
              <g transform="translate(211, 79) scale(0.265)" fill={`url(#${uniqueId}_indiaMapSide)`} opacity="0.5">
                {INDIA_MAINLAND_STATES.map((state) => (
                  <path key={`ext2-${state.id}`} d={state.path} />
                ))}
              </g>

              {/* Front Map Face with State Contours */}
              <g transform="translate(208, 75) scale(0.265)" filter={`url(#${uniqueId}_shadow)`}>
                <g fill={`url(#${uniqueId}_indiaMap)`} stroke="#E0F2FE" strokeWidth="1.2" strokeOpacity="0.75" strokeLinejoin="round">
                  {INDIA_MAINLAND_STATES.map((state) => (
                    <path
                      key={`front-${state.id}`}
                      id={`state-${state.id}`}
                      d={state.path}
                      onMouseEnter={() => setHoveredState(`${state.name} · MPLADS Monitored District Hub`)}
                      onMouseLeave={() => setHoveredState(null)}
                      className="transition-colors duration-150 hover:fill-sky-300 cursor-pointer"
                    >
                      <title>{state.name}</title>
                    </path>
                  ))}
                  {INDIA_ISLAND_STATES.map((state) => (
                    <path
                      key={`island-${state.id}`}
                      id={`state-${state.id}`}
                      d={state.path}
                      opacity={0.85}
                      onMouseEnter={() => setHoveredState(`${state.name} · Island Territory`)}
                      onMouseLeave={() => setHoveredState(null)}
                      className="hover:fill-sky-300 cursor-pointer"
                    >
                      <title>{state.name}</title>
                    </path>
                  ))}
                </g>

                {/* Top Subtle Gloss Sheen */}
                <path d="M 80 80 Q 280 180 500 130 L 500 40 L 80 40 Z" fill="#FFFFFF" opacity="0.14" pointerEvents="none" />
              </g>

              {/* 3D Standing Teardrop Location Pins with Radar Waves & Tooltips */}
              {INDIA_MAP_PINS.map((pin, idx) => {
                const isSelected = activePin === pin.id;
                return (
                  <g
                    key={pin.id}
                    transform={`translate(${pin.x}, ${pin.y})`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePin(pin.id);
                    }}
                    onMouseEnter={() => setHoveredState(`${pin.label} (${pin.state}) · ${pin.sublabel}`)}
                    onMouseLeave={() => setHoveredState(null)}
                    className="cursor-pointer group"
                  >
                    {/* Floor Pin Shadow */}
                    <ellipse cx="0" cy="2" rx="4.5" ry="1.8" fill="#0F172A" opacity="0.4" />

                    {/* Radar Pulse Effect */}
                    {(isSelected || pin.id === "central") && (
                      <circle cx="0" cy="-12" r="10" stroke={pin.accentColor} strokeWidth="1.6" fill="none" className="animate-ping" opacity="0.75" />
                    )}

                    {/* 3D Teardrop Pin Body */}
                    <g className="animate-bounce-subtle" style={{ animationDelay: `${idx * 220}ms` }}>
                      <path
                        d="M 0 0 C -4 -4 -6 -8 -6 -12 A 6 6 0 1 1 6 -12 C 6 -8 4 -4 0 0 Z"
                        fill={pin.color}
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.25))"
                      />
                      <circle cx="0" cy="-12" r="2.5" fill="#FFFFFF" />
                    </g>
                  </g>
                );
              })}

              {/* Interactive Telemetry HUD Chip */}
              {hoveredState && (
                <g transform="translate(289, 68)" className="pointer-events-none transition-all duration-200">
                  <rect x="-95" y="-14" width="190" height="22" rx="6" fill="#0F172A" fillOpacity="0.92" stroke="#38BDF8" strokeWidth="1" />
                  <circle cx="-83" cy="-3" r="3" fill="#22C55E" className="animate-pulse" />
                  <text x="-74" y="1" fill="#F8FAFC" fontSize="8" fontWeight="bold">
                    {hoveredState.length > 32 ? hoveredState.substring(0, 30) + "…" : hoveredState}
                  </text>
                </g>
              )}
            </g>

            {/* ======================================================== */}
            {/* 4. LAYER 4: RIGHT STANDING 3D ANALYTICS BOARD            */}
            {/* ======================================================== */}
            <g id="analytics-panel" filter={`url(#${uniqueId}_shadow)`} transform="translate(15, -10)">
              {/* Backing Stand */}
              <path d="M 370 140 L 465 110 L 465 210 L 370 240 Z" fill="#1E293B" opacity="0.9" rx="8" />
              <path d="M 370 140 L 465 110 L 465 208 L 370 238 Z" fill={`url(#${uniqueId}_chartPanel)`} stroke="#38BDF8" strokeWidth="1.5" />

              {/* Chart Header Bar */}
              <rect x="382" y="132" width="45" height="5" rx="2.5" fill="#38BDF8" opacity="0.9" transform="skewY(-17.5)" />
              <rect x="432" y="116" width="16" height="5" rx="2.5" fill="#64748B" opacity="0.8" transform="skewY(-17.5)" />

              {/* 3D Isometric Bar Charts */}
              {/* Bar 1 - Blue */}
              <rect x="385" y="180" width="10" height="32" rx="2" fill={`url(#${uniqueId}_barBlue)`} transform="skewY(-17.5)" />
              {/* Bar 2 - Green */}
              <rect x="402" y="160" width="10" height="52" rx="2" fill={`url(#${uniqueId}_barEmerald)`} transform="skewY(-17.5)" />
              {/* Bar 3 - Amber */}
              <rect x="419" y="175" width="10" height="37" rx="2" fill={`url(#${uniqueId}_barAmber)`} transform="skewY(-17.5)" />
              {/* Bar 4 - Cyan */}
              <rect x="436" y="150" width="10" height="62" rx="2" fill={`url(#${uniqueId}_barBlue)`} transform="skewY(-17.5)" />

              {/* Trend Sparkline across bars */}
              <path
                d="M 390 192 L 407 172 L 424 186 L 441 160"
                stroke="#FFFFFF"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                transform="skewY(-17.5)"
              />
              <circle cx="441" cy="160" r="2.5" fill="#38BDF8" transform="skewY(-17.5)" />
            </g>

            {/* ======================================================== */}
            {/* 5. LAYER 5: LEFT 3D CLIPBOARD & PROJECT FOLDERS          */}
            {/* ======================================================== */}
            <g id="clipboard-folder" filter={`url(#${uniqueId}_shadow)`} transform="translate(-10, -5)">
              {/* 3D Blue Project Folder */}
              <path
                d="M 185 240 L 255 215 L 255 275 L 185 300 Z"
                fill="#1D4ED8"
                rx="6"
              />
              <path
                d="M 188 236 L 220 224 L 230 228 L 258 218 L 258 275 L 188 295 Z"
                fill={`url(#${uniqueId}_folderBlue)`}
                stroke="#60A5FA"
                strokeWidth="1.2"
              />
              {/* Folder tab */}
              <path d="M 194 233 L 214 225 L 222 228 L 194 238 Z" fill="#93C5FD" />

              {/* Papers sticking out */}
              <rect x="200" y="222" width="34" height="20" rx="2" fill="#FFFFFF" transform="skewY(-19)" opacity="0.95" />
              <line x1="204" y1="228" x2="228" y2="228" stroke="#CBD5E1" strokeWidth="2" transform="skewY(-19)" />
              <line x1="204" y1="234" x2="222" y2="234" stroke="#CBD5E1" strokeWidth="2" transform="skewY(-19)" />

              {/* Standing 3D Inspection Clipboard */}
              <rect
                x="142"
                y="190"
                width="64"
                height="84"
                rx="6"
                fill="#FFFFFF"
                stroke="#E2E8F0"
                strokeWidth="2"
                transform="skewY(14)"
                filter={`url(#${uniqueId}_shadow)`}
              />
              {/* Clipboard top metallic clasp */}
              <rect x="162" y="182" width="24" height="9" rx="3" fill="#3B82F6" transform="skewY(14)" />
              <circle cx="174" cy="186" r="2.5" fill="#FFFFFF" transform="skewY(14)" />

              {/* Checklist items with green ticks */}
              <g transform="skewY(14)">
                {/* Row 1 */}
                <circle cx="154" cy="204" r="4.5" fill="#10B981" />
                <path d="M 152 204 L 153.5 205.5 L 156.5 202.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <rect x="163" y="202" width="35" height="3.5" rx="1.5" fill="#334155" />

                {/* Row 2 */}
                <circle cx="154" cy="218" r="4.5" fill="#10B981" />
                <path d="M 152 218 L 153.5 219.5 L 156.5 216.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <rect x="163" y="216" width="30" height="3.5" rx="1.5" fill="#334155" />

                {/* Row 3 */}
                <circle cx="154" cy="232" r="4.5" fill="#10B981" />
                <path d="M 152 232 L 153.5 233.5 L 156.5 230.5" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <rect x="163" y="230" width="33" height="3.5" rx="1.5" fill="#334155" />

                {/* Row 4 (In progress) */}
                <circle cx="154" cy="246" r="4.5" fill="#3B82F6" />
                <rect x="163" y="244" width="22" height="3.5" rx="1.5" fill="#94A3B8" />
              </g>
            </g>

            {/* ======================================================== */}
            {/* 6. LAYER 6: FOREGROUND VERIFICATION HERO STAMP & LENS     */}
            {/* ======================================================== */}
            <g id="verification-hero" filter={`url(#${uniqueId}_shadow)`} transform="translate(10, 15)">
              {/* Magnifying Glass Handle & Rim */}
              <ellipse cx="270" cy="285" rx="34" ry="24" fill="#0284C7" opacity="0.3" />
              <path d="M 292 302 L 325 330" stroke="#0284C7" strokeWidth="8" strokeLinecap="round" />
              <path d="M 292 302 L 325 330" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />

              {/* Magnifying Glass Outer Rim */}
              <ellipse cx="265" cy="280" rx="36" ry="26" stroke="#38BDF8" strokeWidth="4" fill="none" />

              {/* Glowing Verification Badge in Center */}
              <ellipse cx="265" cy="280" rx="30" ry="22" fill={`url(#${uniqueId}_checkCircle)`} />
              <ellipse cx="263" cy="276" rx="26" ry="18" fill="#0284C7" opacity="0.3" />

              {/* Large White 3D Checkmark */}
              <path
                d="M 252 280 L 261 289 L 280 270"
                stroke="#FFFFFF"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
              <path
                d="M 252 280 L 261 289 L 280 270"
                stroke="#E0F2FE"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </g>

            {/* ======================================================== */}
            {/* 7. LAYER 7: AMBIENT FLOATING 3D GLASS CARDS & CUBES      */}
            {/* ======================================================== */}
            {/* Floating Card Top-Right: Mini Donut Chart */}
            <g id="donut-widget" filter={`url(#${uniqueId}_shadow)`} className="animate-float-slow">
              <rect x="420" y="80" width="70" height="52" rx="10" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
              <circle cx="445" cy="106" r="16" stroke="#E2E8F0" strokeWidth="4.5" fill="none" />
              <circle
                cx="445"
                cy="106"
                r="16"
                stroke="#3B82F6"
                strokeWidth="4.5"
                strokeDasharray="100"
                strokeDashoffset="28"
                strokeLinecap="round"
                fill="none"
                transform="rotate(-90 445 106)"
              />
              <text x="445" y="110" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#1E293B">78%</text>
              <rect x="468" y="98" width="16" height="4" rx="2" fill="#3B82F6" />
              <rect x="468" y="106" width="12" height="4" rx="2" fill="#94A3B8" />
            </g>

            {/* Floating Card Top-Left: Mini Document Sheet */}
            <g id="doc-widget" filter={`url(#${uniqueId}_shadow)`} className="animate-float-reverse">
              <rect x="110" y="120" width="60" height="45" rx="8" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
              <rect x="120" y="132" width="24" height="4" rx="2" fill="#3B82F6" />
              <rect x="120" y="140" width="40" height="3" rx="1.5" fill="#CBD5E1" />
              <rect x="120" y="147" width="30" height="3" rx="1.5" fill="#CBD5E1" />
              <circle cx="155" cy="133" r="4" fill="#10B981" />
            </g>

            {/* Floating Pastel 3D Rounded Cubes */}
            {/* Cube 1: Cyan (Upper Right) */}
            <g transform="translate(485, 160)" className="animate-float-slow">
              <rect width="20" height="20" rx="5" fill="#67E8F9" opacity="0.8" />
              <rect x="2" y="2" width="16" height="8" rx="3" fill="#E0F2FE" opacity="0.6" />
            </g>

            {/* Cube 2: Purple (Far Right) */}
            <g transform="translate(500, 205)" className="animate-float-reverse">
              <rect width="18" height="18" rx="5" fill="#A855F7" opacity="0.75" />
              <rect x="2" y="2" width="14" height="7" rx="3" fill="#F3E8FF" opacity="0.6" />
            </g>

            {/* Cube 3: Emerald (Left) */}
            <g transform="translate(90, 215)" className="animate-float-slow">
              <rect width="18" height="18" rx="5" fill="#34D399" opacity="0.8" />
              <rect x="2" y="2" width="14" height="7" rx="3" fill="#ECFDF5" opacity="0.6" />
            </g>

            {/* Cube 4: Light Blue (Bottom Right) */}
            <g transform="translate(460, 290)" className="animate-float-subtle">
              <rect width="16" height="16" rx="4" fill="#38BDF8" opacity="0.7" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
}
