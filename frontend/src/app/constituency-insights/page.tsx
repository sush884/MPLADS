"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Landmark,
  Layers,
  Sparkles,
  MapPin,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Droplets,
  HeartPulse,
  GraduationCap,
  Car,
  Home,
  ArrowRight,
  Download,
  Plus
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Stat3DIcon } from "@/components/3d/Stat3DIcon";
import { blockBreakdown } from "@/lib/mockData";
import { classNames } from "@/lib/format";

export default function ConstituencyInsightsPage() {
  const [selectedBlock, setSelectedBlock] = useState<string>("All");

  const totalSanctioned = 342.5;
  const totalUtilized = 267.8;

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Constituency Insights</h1>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
              Bhopal Lok Sabha
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Data-driven development gap analysis, spatial equity distribution, and AI-recommended sanction priorities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert("Constituency Development Strategy PDF generated.")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs transition-all"
          >
            <Download size={13} className="text-blue-600" />
            Download Strategy Dossier
          </button>
        </div>
      </div>

      {/* 3D KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 flex items-center justify-between border-l-4 border-l-blue-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Constituency Population</p>
            <p className="text-[24px] font-black text-slate-900 mt-0.5">24.8 Lakh</p>
            <span className="text-[10px] text-blue-600 font-bold">6 Administrative Blocks</span>
          </div>
          <Stat3DIcon type="folder" size={46} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Fund Utilization</p>
            <p className="text-[24px] font-black text-emerald-600 mt-0.5">78.2%</p>
            <span className="text-[10px] text-emerald-600 font-bold">₹267.8 Cr / ₹342.5 Cr</span>
          </div>
          <Stat3DIcon type="completed" size={46} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-amber-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Top Development Gap</p>
            <p className="text-[20px] font-black text-amber-700 mt-0.5">Drinking Water</p>
            <span className="text-[10px] text-amber-600 font-bold">Phanda &amp; Berasia Rural</span>
          </div>
          <Stat3DIcon type="attention" size={46} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-purple-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">AI Sanction Suggestions</p>
            <p className="text-[24px] font-black text-purple-700 mt-0.5">14 Projects</p>
            <span className="text-[10px] text-purple-600 font-bold">₹18.4 Cr Target Budget</span>
          </div>
          <Stat3DIcon type="allocated" size={46} />
        </div>
      </div>

      {/* Grid: Blocks Distribution & Sector Gaps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Block Breakdown */}
        <div className="card p-5 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Projects &amp; Funds by Block</h2>
              <p className="text-xs text-slate-500">Spatial distribution of works across administrative divisions</p>
            </div>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
              6 Blocks
            </span>
          </div>

          <div className="space-y-3.5">
            {blockBreakdown.map((block) => (
              <div key={block.block} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900">{block.block}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-slate-700">{block.total} Projects</span>
                    <span className="font-semibold text-emerald-700">₹{(block.total * 1.88).toFixed(1)} Cr</span>
                  </div>
                </div>

                <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
                  <div style={{ width: `${(block.completed / block.total) * 100}%` }} className="bg-emerald-500" title={`Completed: ${block.completed}`} />
                  <div style={{ width: `${(block.inProgress / block.total) * 100}%` }} className="bg-blue-500" title={`In Progress: ${block.inProgress}`} />
                  <div style={{ width: `${(block.delayed / block.total) * 100}%` }} className="bg-red-500" title={`Delayed: ${block.delayed}`} />
                  <div style={{ width: `${(block.notStarted / block.total) * 100}%` }} className="bg-amber-400" title={`Not Started: ${block.notStarted}`} />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                  <span className="text-emerald-700 font-semibold">{block.completed} Completed</span>
                  <span className="text-blue-700 font-semibold">{block.inProgress} In Progress</span>
                  <span className="text-red-700 font-semibold">{block.delayed} Delayed</span>
                  <span className="text-amber-700 font-semibold">{block.notStarted} Stalled</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sectoral Gap Analysis */}
        <div className="card p-5 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Sectoral Deficit Analysis</h2>
              <p className="text-xs text-slate-500">Benchmark comparison vs state infrastructure averages</p>
            </div>
            <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
              High Priority Focus
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                sector: "Drinking Water Supply",
                icon: Droplets,
                gapLevel: "High Deficit",
                gapColor: "bg-red-50 text-red-700 border-red-200",
                coverage: "46%",
                benchmark: "75%",
                summary: "Severe piped water shortages in 28 fringe villages. Tubewell water table fallen below 240 ft.",
                action: "Sanction Solar Deep Tubewells & Water ATMs"
              },
              {
                sector: "Primary Healthcare Facilities",
                icon: HeartPulse,
                gapLevel: "High Deficit",
                gapColor: "bg-red-50 text-red-700 border-red-200",
                coverage: "52%",
                benchmark: "80%",
                summary: "Berasia and Huzur rural populations travel &gt;18km for secondary healthcare diagnostics.",
                action: "Sanction 4 Mobile Medical Vans & Diagnostic Labs"
              },
              {
                sector: "Secondary Education & Labs",
                icon: GraduationCap,
                gapLevel: "Medium Deficit",
                gapColor: "bg-amber-50 text-amber-700 border-amber-200",
                coverage: "68%",
                benchmark: "85%",
                summary: "Digital literacy gap: 14 higher secondary government schools lack computer labs.",
                action: "Sanction Smart Classes & Solar Backup"
              },
              {
                sector: "Rural Roads & Connectivity",
                icon: Car,
                gapLevel: "Low Deficit",
                gapColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
                coverage: "84%",
                benchmark: "90%",
                summary: "Paved all-weather road network good; minor bridge repairs required in 3 wards.",
                action: "Bridge Culvert Works in Misrod"
              }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.sector} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                        <Icon size={14} />
                      </div>
                      <span className="font-bold text-xs text-slate-900">{item.sector}</span>
                    </div>
                    <span className={classNames("text-[10px] font-extrabold px-2 py-0.5 rounded-full border", item.gapColor)}>
                      {item.gapLevel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600">{item.summary}</p>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                    <span className="text-[11px] text-slate-400">Coverage: <strong>{item.coverage}</strong> (Target: {item.benchmark})</span>
                    <span className="text-[11px] font-bold text-blue-700">{item.action}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Recommendation Engine Card */}
      <div className="card p-6 bg-gradient-to-br from-blue-900 via-indigo-950 to-navy-950 text-white border border-blue-800/40 shadow-xl mb-8">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/30 border border-blue-400/40 flex items-center justify-center shrink-0">
            <Sparkles size={24} className="text-blue-300" />
          </div>
          <div className="space-y-2 flex-1">
            <h3 className="text-lg font-bold text-white">
              AI Recommendation: Rebalance FY 2024-25 MPLADS Sanctions
            </h3>
            <p className="text-xs text-blue-200/80 leading-relaxed max-w-3xl">
              Based on historical completion velocity and demographic deficit modeling, allocating the next tranche of ₹12.5 Cr towards <strong>Solar Piped Drinking Water (Berasia/Phanda)</strong> and <strong>Primary Health Tele-clinics</strong> will maximize citizen impact score by <strong>+34%</strong> while maintaining a low delay probability.
            </p>
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => alert("Pre-approved draft recommendation letters loaded.")}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs shadow-md shadow-blue-500/30 transition-all"
              >
                <Plus size={14} />
                Draft AI-Recommended Sanction Letter
              </button>
              <Link href="/projects" className="text-xs text-blue-300 hover:text-white underline">
                Browse Existing Pipeline →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
