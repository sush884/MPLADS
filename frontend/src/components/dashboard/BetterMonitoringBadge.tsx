import React from "react";
import { GrowthBars3D } from "@/components/3d/GrowthBars3D";

export function BetterMonitoringBadge() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-blue-50/80 via-sky-50/50 to-indigo-50/60 border border-blue-100/80 p-3.5 flex items-center justify-between gap-3 shadow-xs">
      <div className="leading-tight min-w-0">
        <p className="font-script text-[20px] text-blue-800 leading-none font-bold tracking-wide">
          Better Monitoring
        </p>
        <p className="font-script text-[18px] text-blue-600 leading-none mt-1">
          Stronger Development
        </p>
        <p className="text-[9px] text-slate-400 font-medium mt-1 uppercase tracking-wider">
          MoSPI · Government of India
        </p>
      </div>

      <GrowthBars3D size={58} />
    </div>
  );
}
