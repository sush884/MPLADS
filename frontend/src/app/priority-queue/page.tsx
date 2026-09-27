"use client";

import { useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldAlert,
  Send,
  Camera,
  FileCheck2,
  Building2,
  MapPin,
  Calendar,
  Sparkles,
  Info,
  CheckCircle,
  HelpCircle,
  Layers
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Stat3DIcon } from "@/components/3d/Stat3DIcon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { projects } from "@/lib/mockData";
import { classNames } from "@/lib/format";

type PriorityFilter = "ALL" | "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export default function PriorityQueuePage() {
  const [filter, setFilter] = useState<PriorityFilter>("ALL");
  const [actionDone, setActionDone] = useState<string | null>(null);

  const priorityItems = projects.map((p) => {
    let tier: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" = "LOW";
    let tierColor = "bg-emerald-50 text-emerald-700 border-emerald-200";
    let reason = "On track with normal monitoring schedule";

    if (p.aiHealthScore <= 35) {
      tier = "CRITICAL";
      tierColor = "bg-red-50 text-red-700 border-red-200";
      reason = "High expenditure (82%) with low physical progress (48%). Severe delay projected.";
    } else if (p.aiHealthScore <= 50) {
      tier = "HIGH";
      tierColor = "bg-orange-50 text-orange-700 border-orange-200";
      reason = `Delay probability ${p.delayProbabilityPct}%. ${p.predictedDelayDays} days predicted completion overrun.`;
    } else if (p.aiHealthScore <= 70) {
      tier = "MEDIUM";
      tierColor = "bg-amber-50 text-amber-700 border-amber-200";
      reason = "Inconsistent progress updates & 2 milestone deadlines missed.";
    }

    return {
      ...p,
      tier,
      tierColor,
      reason
    };
  });

  const filteredItems = priorityItems.filter((item) => {
    if (filter === "ALL") return true;
    return item.tier === filter;
  });

  const criticalCount = priorityItems.filter((i) => i.tier === "CRITICAL").length;
  const highCount = priorityItems.filter((i) => i.tier === "HIGH").length;
  const mediumCount = priorityItems.filter((i) => i.tier === "MEDIUM").length;

  return (
    <AppShell>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">AI Priority Queue</h1>
            <span className="text-[10px] font-extrabold bg-red-500 text-white px-2 py-0.5 rounded-full shadow-xs">
              {criticalCount + highCount} Urgent Action Items
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Algorithmic risk triage sorting MPLADS projects by failure probability, financial anomalies, and missed milestones.
          </p>
        </div>

        {/* Priority Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
          {(["ALL", "CRITICAL", "HIGH", "MEDIUM", "LOW"] as PriorityFilter[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={classNames(
                "px-3 py-1.5 text-xs font-bold rounded-xl transition-all",
                filter === tab
                  ? "bg-navy-950 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Triage Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 flex items-center justify-between border-l-4 border-l-red-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Critical Risk</p>
            <p className="text-[26px] font-black text-red-600 mt-0.5">{criticalCount}</p>
            <span className="text-[10px] text-red-500 font-bold">Needs immediate intervention</span>
          </div>
          <Stat3DIcon type="delayed" size={48} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-orange-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">High Delay Risk</p>
            <p className="text-[26px] font-black text-orange-600 mt-0.5">{highCount}</p>
            <span className="text-[10px] text-orange-600 font-bold">&gt;60 days projected delay</span>
          </div>
          <Stat3DIcon type="attention" size={48} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-amber-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Attention Needed</p>
            <p className="text-[26px] font-black text-amber-600 mt-0.5">{mediumCount}</p>
            <span className="text-[10px] text-amber-600 font-bold">Missing geo-tagged evidence</span>
          </div>
          <Stat3DIcon type="folder" size={48} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Healthy / On Track</p>
            <p className="text-[26px] font-black text-emerald-600 mt-0.5">
              {priorityItems.length - criticalCount - highCount - mediumCount}
            </p>
            <span className="text-[10px] text-emerald-600 font-bold">Adhering to schedule</span>
          </div>
          <Stat3DIcon type="completed" size={48} />
        </div>
      </div>

      {actionDone && (
        <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-600 shrink-0" />
            <span>{actionDone}</span>
          </div>
          <button
            onClick={() => setActionDone(null)}
            className="text-emerald-600 hover:text-emerald-900 font-bold px-2 py-1 text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Priority Items List */}
      <div className="space-y-4 mb-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="card p-5 shadow-sm border border-slate-200/90 hover:shadow-md transition-all relative overflow-hidden"
          >
            {/* Top Color Accent */}
            <div
              className={classNames(
                "absolute top-0 left-0 bottom-0 w-1.5",
                item.tier === "CRITICAL"
                  ? "bg-red-500"
                  : item.tier === "HIGH"
                  ? "bg-orange-500"
                  : item.tier === "MEDIUM"
                  ? "bg-amber-500"
                  : "bg-emerald-500"
              )}
            />

            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pl-2">
              {/* Left Column: Project Badge & Details */}
              <div className="flex items-start gap-4">
                <div
                  className={classNames(
                    "flex flex-col items-center justify-center rounded-2xl p-2.5 min-w-[76px] text-center border shadow-xs shrink-0",
                    item.tierColor
                  )}
                >
                  <span className="text-[10px] font-black tracking-wider uppercase">{item.tier}</span>
                  <span className="text-[18px] font-black leading-tight mt-0.5">{item.aiHealthScore}/100</span>
                  <span className="text-[8.5px] font-semibold text-slate-500 mt-0.5">Risk Score</span>
                </div>

                <div className="space-y-1.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/projects/${item.id}`}
                      className="text-[16px] font-extrabold text-slate-900 hover:text-blue-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <span className="font-mono text-[10.5px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {item.code}
                    </span>
                    <span className="text-[10.5px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {item.sector}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <MapPin size={12} className="text-slate-400" />
                      {item.constituency}
                    </span>
                    <span className="flex items-center gap-1">
                      <Building2 size={12} className="text-slate-400" />
                      {item.agency}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={12} className="text-slate-400" />
                      Sanctioned: ₹{item.sanctionedAmountCr} Cr
                    </span>
                  </div>

                  {/* AI Diagnosis Reason */}
                  <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-2.5 mt-2 flex items-start gap-2 max-w-2xl">
                    <Sparkles size={14} className="text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-[11.5px] text-slate-700 font-medium leading-relaxed">
                      <strong className="text-slate-900 font-bold">AI Flag:</strong> {item.reason}
                    </p>
                  </div>
                </div>
              </div>

              {/* Center / Right: Progress Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 min-w-[280px] lg:min-w-[320px] bg-slate-50/70 p-3 rounded-2xl border border-slate-200/60">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Physical Work</p>
                  <p className="text-[15px] font-extrabold text-blue-700">{item.physicalProgressPct}%</p>
                  <div className="mt-1">
                    <ProgressBar value={item.physicalProgressPct} color="bg-blue-600" height={4} />
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Funds Spent</p>
                  <p className="text-[15px] font-extrabold text-emerald-700">{item.financialProgressPct}%</p>
                  <div className="mt-1">
                    <ProgressBar value={item.financialProgressPct} color="bg-emerald-500" height={4} />
                  </div>
                </div>

                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Predicted Delay</p>
                  <p className="text-[15px] font-extrabold text-red-600">+{item.predictedDelayDays || 14}d</p>
                  <span className="text-[9.5px] text-red-500 font-semibold">{item.delayProbabilityPct}% prob.</span>
                </div>
              </div>
            </div>

            {/* Bottom Action Strip */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 pl-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActionDone(`Field inspection ordered for "${item.name}". Notification dispatched to District Nodal Officer.`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors"
                >
                  <Camera size={13} />
                  Assign Field Inspection
                </button>

                <button
                  onClick={() => setActionDone(`Formal clarification notice generated for ${item.agency} regarding "${item.name}".`)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  <Send size={13} />
                  Request Clarification
                </button>
              </div>

              <Link
                href={`/projects/${item.id}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
              >
                Deep Dive Project Intelligence
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
