import React from "react";
import { FundUtilizationChart } from "@/components/charts/FundUtilizationChart";
import { fundUtilizationTrend, dashboardKpis } from "@/lib/mockData";

export function FundUtilizationTrendCard() {
  return (
    <section className="card p-4 sm:p-5 flex flex-col justify-between">
      <div className="flex flex-wrap items-center justify-between gap-y-1 mb-2">
        <h2 className="text-[14px] font-extrabold text-slate-800 tracking-tight">
          Fund Utilization Trend
        </h2>
        <div className="flex items-center gap-3 text-[11px] font-semibold">
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-3 h-[3px] rounded-full bg-blue-600" /> Allocated
          </span>
          <span className="flex items-center gap-1.5 text-slate-600">
            <span className="w-3 h-[3px] rounded-full bg-emerald-600" /> Utilized
          </span>
        </div>
      </div>

      <div className="relative">
        <FundUtilizationChart data={fundUtilizationTrend} />

        {/* Current status badges overlay */}
        <div className="absolute top-2 right-2 space-y-1.5 pointer-events-none">
          <div className="flex items-center gap-1.5 bg-blue-50/95 border border-blue-200/80 rounded-lg px-2.5 py-1 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
            <span className="text-[11px] font-extrabold text-blue-800">
              ₹ {dashboardKpis.totalAllocatedCr} Cr
            </span>
            <span className="text-[10px] text-blue-600 font-medium">Allocated</span>
          </div>

          <div className="flex items-center gap-1.5 bg-emerald-50/95 border border-emerald-200/80 rounded-lg px-2.5 py-1 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
            <span className="text-[11px] font-extrabold text-emerald-800">
              ₹ 267.8 Cr
            </span>
            <span className="text-[10px] text-emerald-600 font-medium">Utilized</span>
          </div>
        </div>
      </div>
    </section>
  );
}
