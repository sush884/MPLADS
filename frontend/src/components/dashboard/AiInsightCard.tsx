"use client";

import { FileText, Sparkles } from "lucide-react";
import { dashboardAiInsight } from "@/lib/mockData";
import { AiRobot3D } from "@/components/3d/AiRobot3D";

export function AiInsightCard() {
  return (
    <section className="rounded-2xl bg-gradient-to-r from-blue-50/90 via-sky-50/60 to-indigo-50/70 border border-blue-200/80 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
        <AiRobot3D size={48} className="shrink-0" />

        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <h2 className="text-[13px] font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
              <span className="text-blue-600 font-black">AI</span> Insight
            </h2>
            <span className="text-[9px] font-bold bg-blue-600 text-white rounded-full px-2 py-0.2 shadow-xs">
              Live Analysis
            </span>
          </div>
          <p className="text-[12px] text-slate-700 leading-relaxed">
            {dashboardAiInsight.lead}{" "}
            <strong className="font-extrabold text-blue-700 underline decoration-blue-300 decoration-2 underline-offset-2">
              {dashboardAiInsight.highlight}
            </strong>{" "}
            {dashboardAiInsight.tail}{" "}
            <span className="text-slate-600">{dashboardAiInsight.recommendation}</span>
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => alert("Generating full AI inspection dossier and predictive report...")}
        className="inline-flex items-center justify-center gap-2 text-[12px] font-bold bg-white hover:bg-slate-50 text-slate-800 border border-slate-200/90 rounded-xl px-4 py-2.5 shadow-xs hover:shadow transition-all shrink-0 whitespace-nowrap active:scale-95"
      >
        <FileText size={14} className="text-blue-600" />
        Generate Full Report
      </button>
    </section>
  );
}
