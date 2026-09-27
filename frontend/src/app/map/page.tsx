"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  MapPin,
  Layers,
  Filter,
  AlertTriangle,
  Building2,
  Calendar,
  Sparkles,
  ArrowRight,
  Maximize2
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { MapPanel } from "@/components/map/MapPanel";
import { Stat3DIcon } from "@/components/3d/Stat3DIcon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { projects } from "@/lib/mockData";
import type { GeoPin, GeoHeatZone } from "@/components/map/types";
import { classNames } from "@/lib/format";

export default function MapViewPage() {
  const [selectedSector, setSelectedSector] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || "1");

  const sectors = useMemo(() => {
    const s = Array.from(new Set(projects.map((p) => p.sector)));
    return ["All", ...s];
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchSector = selectedSector === "All" || p.sector === selectedSector;
      const matchStatus = selectedStatus === "All" || p.status === selectedStatus;
      return matchSector && matchStatus;
    });
  }, [selectedSector, selectedStatus]);

  const pins: GeoPin[] = useMemo(() => {
    return filteredProjects.map((p) => ({
      id: p.id,
      lat: p.location.lat,
      lng: p.location.lng,
      status: p.status,
      label: p.name,
      code: p.code,
      aiScore: p.aiHealthScore,
      sublabel: `${p.constituency} · ${p.agency}`
    }));
  }, [filteredProjects]);

  const heatZones: GeoHeatZone[] = useMemo(() => [
    {
      id: "hz-1",
      lat: 23.35,
      lng: 77.4,
      radiusMetres: 4200,
      intensity: "high",
      label: "Berasia Delay Risk Cluster"
    },
    {
      id: "hz-2",
      lat: 23.32,
      lng: 77.5,
      radiusMetres: 3500,
      intensity: "medium",
      label: "Huzur Infrastructure Cluster"
    },
    {
      id: "hz-3",
      lat: 23.23,
      lng: 77.38,
      radiusMetres: 3000,
      intensity: "high",
      label: "Phanda Water Pipeline Bottleneck"
    }
  ], []);

  const selectedProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">GIS Spatial Map</h1>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full border border-blue-200">
              {pins.length} Geotagged Sites
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Constituency-wide geographic audit view with satellite basemap, spatial delay heatmaps, and project pins.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
          <div className="flex items-center gap-1 text-xs font-semibold text-slate-500">
            <Filter size={13} className="text-blue-600" />
            <span>Filter:</span>
          </div>
          <select
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none"
          >
            {sectors.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Delayed">Delayed</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Map on Left / Top, Selected Project Drawer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-5 items-start mb-8">
        {/* Map Container */}
        <div className="card p-3 shadow-sm border border-slate-200/90 relative">
          <MapPanel
            center={[23.2599, 77.4126]}
            zoom={10}
            pins={pins}
            heatZones={heatZones}
            activePinId={selectedProjectId}
            height={560}
            showBasemapToggle={true}
          />

          {/* Map Legend */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" /> Completed
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-xs" /> In Progress
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-xs" /> Delayed
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-600">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-xs" /> High Risk Cluster
              </span>
            </div>
            <span className="text-[11px] text-slate-400">Click any pin to inspect detail</span>
          </div>
        </div>

        {/* Selected Project Inspector Card */}
        <div className="space-y-4">
          {selectedProject ? (
            <div className="card p-5 border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {selectedProject.code}
                </span>
                <span
                  className={classNames(
                    "text-[10.5px] font-extrabold px-2.5 py-0.5 rounded-full",
                    selectedProject.status === "Completed"
                      ? "bg-emerald-100 text-emerald-800"
                      : selectedProject.status === "Delayed"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  )}
                >
                  {selectedProject.status}
                </span>
              </div>

              <div>
                <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                  {selectedProject.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                  <MapPin size={12} className="text-slate-400" />
                  {selectedProject.constituency}
                </p>
                <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                  <Building2 size={12} className="text-slate-400" />
                  {selectedProject.agency}
                </p>
              </div>

              {/* Progress bars */}
              <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/60">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-600">Physical Work</span>
                    <span className="text-blue-700">{selectedProject.physicalProgressPct}%</span>
                  </div>
                  <ProgressBar value={selectedProject.physicalProgressPct} color="bg-blue-600" height={5} />
                </div>
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-600">Expenditure</span>
                    <span className="text-emerald-700">{selectedProject.financialProgressPct}%</span>
                  </div>
                  <ProgressBar value={selectedProject.financialProgressPct} color="bg-emerald-500" height={5} />
                </div>
              </div>

              {/* Cost & Delay Info */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Sanctioned</p>
                  <p className="text-sm font-black text-slate-900 mt-0.5">₹ {selectedProject.sanctionedAmountCr} Cr</p>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Delay Risk</p>
                  <p className="text-sm font-black text-red-600 mt-0.5">+{selectedProject.predictedDelayDays || 0} Days</p>
                </div>
              </div>

              <Link
                href={`/projects/${selectedProject.id}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-2.5 text-xs shadow-md shadow-blue-500/20 transition-all"
              >
                Deep Dive Full Project Dossier
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : null}

          {/* Quick Select project list */}
          <div className="card p-4 border border-slate-200/90 shadow-sm space-y-2">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
              Select Project to Inspect ({filteredProjects.length})
            </h4>
            <div className="max-h-[220px] overflow-y-auto space-y-1.5 pr-1">
              {filteredProjects.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  className={classNames(
                    "w-full text-left p-2 rounded-xl text-xs transition-all flex items-center justify-between gap-2",
                    selectedProjectId === p.id
                      ? "bg-blue-50 text-blue-900 border border-blue-200 font-bold"
                      : "hover:bg-slate-50 text-slate-700 font-medium"
                  )}
                >
                  <span className="truncate">{p.name}</span>
                  <span className="font-mono text-[10px] text-slate-400 shrink-0">{p.code}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
