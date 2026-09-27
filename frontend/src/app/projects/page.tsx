"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Building2,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  Download,
  Filter,
  Layers,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Stat3DIcon } from "@/components/3d/Stat3DIcon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { projects } from "@/lib/mockData";
import { classNames } from "@/lib/format";

export default function ProjectsDirectoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");
  const [sortBy, setSortBy] = useState<"score" | "cost" | "progress" | "delay">("score");

  const sectors = useMemo(() => {
    const list = Array.from(new Set(projects.map((p) => p.sector)));
    return ["All", ...list];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.agency.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.constituency.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesSector = selectedSector === "All" || p.sector === selectedSector;
      const matchesStatus = selectedStatus === "All" || p.status === selectedStatus;
      const matchesRisk = selectedRisk === "All" || p.riskLevel === selectedRisk;

      return matchesSearch && matchesSector && matchesStatus && matchesRisk;
    }).sort((a, b) => {
      if (sortBy === "score") return a.aiHealthScore - b.aiHealthScore; // Lowest score first (highest risk)
      if (sortBy === "cost") return b.sanctionedAmountCr - a.sanctionedAmountCr;
      if (sortBy === "progress") return b.physicalProgressPct - a.physicalProgressPct;
      if (sortBy === "delay") return (b.predictedDelayDays || 0) - (a.predictedDelayDays || 0);
      return 0;
    });
  }, [searchQuery, selectedSector, selectedStatus, selectedRisk, sortBy]);

  const stats = useMemo(() => {
    return {
      total: projects.length,
      completed: projects.filter((p) => p.status === "Completed").length,
      inProgress: projects.filter((p) => p.status === "In Progress").length,
      delayed: projects.filter((p) => p.status === "Delayed").length,
      highRisk: projects.filter((p) => p.riskLevel === "High").length
    };
  }, []);

  return (
    <AppShell>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Projects Registry</h1>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
              {filteredProjects.length} Visible
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Constituency-wide MPLADS project tracking, physical verification audits &amp; predictive delay risk scores.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              const headers = "Code,Name,Sector,Agency,Status,AI Score,Sanctioned(Cr),Expenditure(Cr),Physical%\n";
              const rows = filteredProjects
                .map(
                  (p) =>
                    `"${p.code}","${p.name}","${p.sector}","${p.agency}","${p.status}",${p.aiHealthScore},${p.sanctionedAmountCr},${p.expenditureCr},${p.physicalProgressPct}`
                )
                .join("\n");
              const blob = new Blob([headers + rows], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = "MPLADS_Projects_Export.csv";
              a.click();
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs transition-all"
          >
            <Download size={14} className="text-blue-600" />
            Export CSV
          </button>
          <Link
            href="/map"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            <MapPin size={14} />
            View on GIS Map
          </Link>
        </div>
      </div>

      {/* KPI Ribbon with 3D Icons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 mb-6">
        <div className="card p-3.5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Sanctioned</p>
            <p className="text-[22px] font-extrabold text-slate-900 mt-0.5">{stats.total}</p>
            <span className="text-[10px] text-blue-600 font-bold">100% catalogued</span>
          </div>
          <Stat3DIcon type="folder" size={44} />
        </div>

        <div className="card p-3.5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-500">In Progress</p>
            <p className="text-[22px] font-extrabold text-blue-600 mt-0.5">{stats.inProgress}</p>
            <span className="text-[10px] text-slate-400 font-medium">Active field work</span>
          </div>
          <Stat3DIcon type="allocated" size={44} />
        </div>

        <div className="card p-3.5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Completed</p>
            <p className="text-[22px] font-extrabold text-emerald-600 mt-0.5">{stats.completed}</p>
            <span className="text-[10px] text-emerald-600 font-bold">Verified delivery</span>
          </div>
          <Stat3DIcon type="completed" size={44} />
        </div>

        <div className="card p-3.5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Delayed</p>
            <p className="text-[22px] font-extrabold text-red-600 mt-0.5">{stats.delayed}</p>
            <span className="text-[10px] text-red-500 font-bold">Past target date</span>
          </div>
          <Stat3DIcon type="delayed" size={44} />
        </div>

        <div className="card p-3.5 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold text-slate-500">High Risk Queue</p>
            <p className="text-[22px] font-extrabold text-amber-600 mt-0.5">{stats.highRisk}</p>
            <span className="text-[10px] text-amber-600 font-bold">AI Priority Alert</span>
          </div>
          <Stat3DIcon type="attention" size={44} />
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-4 mb-6 shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by project name, code (MPLADS/2023/...), agency, or block..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <Filter size={13} className="text-blue-600" />
              <span>Sector:</span>
            </div>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
            >
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="In Progress">In Progress</option>
              <option value="Delayed">Delayed</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={selectedRisk}
              onChange={(e) => setSelectedRisk(e.target.value)}
              className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
            >
              <option value="All">All Risk Levels</option>
              <option value="High">High Risk</option>
              <option value="Medium">Medium Risk</option>
              <option value="Low">Low Risk</option>
            </select>

            <div className="flex items-center gap-1 pl-2 border-l border-slate-200">
              <ArrowUpDown size={13} className="text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-slate-200 rounded-xl px-2.5 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:border-blue-500"
              >
                <option value="score">Sort by AI Risk Score</option>
                <option value="cost">Sort by Sanctioned Cost</option>
                <option value="progress">Sort by Physical Progress</option>
                <option value="delay">Sort by Predicted Delay</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Table */}
      <div className="card overflow-hidden shadow-sm border border-slate-200/90 mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#f8fafc] text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Project Details</th>
                <th className="py-3.5 px-4">Executing Agency</th>
                <th className="py-3.5 px-4 text-center">AI Health Score</th>
                <th className="py-3.5 px-4">Physical vs Financial</th>
                <th className="py-3.5 px-4">Sanctioned &amp; Spend</th>
                <th className="py-3.5 px-4">Status &amp; Risk</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-400">
                    <Layers size={36} className="mx-auto mb-2 text-slate-300" />
                    <p className="text-sm font-semibold text-slate-600">No projects match your filter criteria</p>
                    <p className="text-xs text-slate-400 mt-1">Try resetting the search or filter dropdowns above</p>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => {
                  const isCritical = p.aiHealthScore <= 40;
                  const isHigh = p.aiHealthScore > 40 && p.aiHealthScore <= 60;
                  const isMedium = p.aiHealthScore > 60 && p.aiHealthScore <= 75;

                  return (
                    <tr
                      key={p.id}
                      className="hover:bg-blue-50/40 transition-colors group"
                    >
                      {/* Project info */}
                      <td className="py-3.5 px-4 max-w-[280px]">
                        <Link
                          href={`/projects/${p.id}`}
                          className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1 text-[13px]"
                        >
                          {p.name}
                        </Link>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                          <span className="font-mono text-slate-500 font-semibold">{p.code}</span>
                          <span>•</span>
                          <span className="truncate">{p.constituency}</span>
                        </div>
                        <span className="inline-block mt-1 text-[9.5px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                          {p.sector}
                        </span>
                      </td>

                      {/* Agency */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                          <Building2 size={13} className="text-slate-400 shrink-0" />
                          <span className="truncate max-w-[170px]">{p.agency}</span>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Start: {p.startDate}
                        </span>
                      </td>

                      {/* AI Health Score Pill */}
                      <td className="py-3.5 px-4 text-center whitespace-nowrap">
                        <div className="inline-flex flex-col items-center">
                          <span
                            className={classNames(
                              "px-2.5 py-1 rounded-full font-black text-[12px] shadow-2xs flex items-center gap-1",
                              isCritical
                                ? "bg-red-50 text-red-700 border border-red-200"
                                : isHigh
                                ? "bg-orange-50 text-orange-700 border border-orange-200"
                                : isMedium
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            )}
                          >
                            <Sparkles size={11} />
                            {p.aiHealthScore} / 100
                          </span>
                          <span className="text-[9.5px] font-semibold text-slate-400 mt-1 uppercase">
                            {isCritical ? "Critical" : isHigh ? "High Risk" : isMedium ? "Medium" : "Healthy"}
                          </span>
                        </div>
                      </td>

                      {/* Physical vs Financial Progress */}
                      <td className="py-3.5 px-4 min-w-[160px]">
                        <div className="space-y-1.5">
                          <div>
                            <div className="flex justify-between text-[10px] font-semibold mb-0.5">
                              <span className="text-blue-700">Physical: {p.physicalProgressPct}%</span>
                            </div>
                            <ProgressBar value={p.physicalProgressPct} color="bg-blue-600" height={5} />
                          </div>
                          <div>
                            <div className="flex justify-between text-[10px] font-semibold mb-0.5">
                              <span className="text-emerald-700">Financial: {p.financialProgressPct}%</span>
                            </div>
                            <ProgressBar value={p.financialProgressPct} color="bg-emerald-500" height={5} />
                          </div>
                        </div>
                      </td>

                      {/* Sanctioned & Expenditure */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900 text-[12px]">
                          ₹ {p.sanctionedAmountCr.toFixed(2)} Cr
                        </div>
                        <div className="text-[10.5px] text-slate-500 mt-0.5">
                          Spend: ₹ {p.expenditureCr.toFixed(2)} Cr
                        </div>
                      </td>

                      {/* Status & Risk */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span
                          className={classNames(
                            "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold",
                            p.status === "Completed"
                              ? "bg-emerald-100 text-emerald-800"
                              : p.status === "Delayed"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          )}
                        >
                          {p.status === "Completed" && <CheckCircle2 size={11} />}
                          {p.status === "Delayed" && <AlertTriangle size={11} />}
                          {p.status === "In Progress" && <Clock size={11} />}
                          {p.status}
                        </span>
                        {p.predictedDelayDays ? (
                          <div className="text-[10px] text-red-600 font-semibold mt-1">
                            +{p.predictedDelayDays} days delay predicted
                          </div>
                        ) : null}
                      </td>

                      {/* Action */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <Link
                          href={`/projects/${p.id}`}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100/80 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          Deep Dive
                          <ArrowRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
