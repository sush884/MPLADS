import React from "react";
import { StatusDonutChart } from "@/components/charts/StatusDonutChart";
import { Clipboard3D } from "@/components/3d/Clipboard3D";
import { statusDistribution, dashboardKpis } from "@/lib/mockData";

export function ProjectDistributionCard() {
  return (
    <section className="card p-4 sm:p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[14px] font-extrabold text-slate-800 tracking-tight">
          Project Distribution (Status)
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-auto">
        {/* Donut Chart */}
        <StatusDonutChart data={statusDistribution} total={dashboardKpis.totalProjects.value} />

        {/* Legend */}
        <div className="flex-1 min-w-0 w-full space-y-2.5">
          {statusDistribution.map((status) => (
            <div key={status.label} className="flex items-center justify-between gap-2 text-[12px]">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="w-3 h-3 rounded-full shrink-0 shadow-2xs"
                  style={{ backgroundColor: status.color }}
                />
                <span className="font-semibold text-slate-700 truncate">{status.label}</span>
              </div>
              <div className="font-bold text-slate-900 shrink-0">
                {status.value}{" "}
                <span className="text-slate-400 font-normal text-[11px]">({status.pct}%)</span>
              </div>
            </div>
          ))}
        </div>

        {/* 3D Clipboard Illustration */}
        <div className="hidden md:flex items-center justify-center shrink-0 pl-1">
          <Clipboard3D size={64} />
        </div>
      </div>
    </section>
  );
}
