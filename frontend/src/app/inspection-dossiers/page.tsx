"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FolderClock,
  Camera,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Calendar,
  UserCheck,
  ShieldCheck,
  Download,
  Search,
  ExternalLink,
  Sparkles,
  FileCheck
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Stat3DIcon } from "@/components/3d/Stat3DIcon";
import { classNames } from "@/lib/format";

interface InspectionDossier {
  id: string;
  projectCode: string;
  projectName: string;
  officerName: string;
  date: string;
  location: string;
  gpsCoords: string;
  photosCount: number;
  physicalProgressClaimed: number;
  aiVerificationScore: number;
  status: "Verified" | "Under Review" | "Anomaly Flagged";
  notes: string;
  anomalyReason?: string;
}

const mockDossiers: InspectionDossier[] = [
  {
    id: "INS-2024-089",
    projectCode: "MPLADS/2023/001",
    projectName: "Construction of Community Hall",
    officerName: "Shri Rajesh Patil (JE)",
    date: "12 Dec 2024",
    location: "Berasia, Bhopal MP",
    gpsCoords: "23.3512° N, 77.4089° E",
    photosCount: 6,
    physicalProgressClaimed: 48,
    aiVerificationScore: 42,
    status: "Anomaly Flagged",
    notes: "Foundation and pillar column casting complete. Slabs not yet commenced.",
    anomalyReason: "AI Vision Flag: 2 photos match earlier upload from Oct 2024 (possible image reuse)."
  },
  {
    id: "INS-2024-088",
    projectCode: "MPLADS/2023/014",
    projectName: "Rural Road Development",
    officerName: "Smt. Priyanka Tiwari (AE)",
    date: "08 Dec 2024",
    location: "Huzur, Bhopal MP",
    gpsCoords: "23.3204° N, 77.5011° E",
    photosCount: 8,
    physicalProgressClaimed: 40,
    aiVerificationScore: 89,
    status: "Verified",
    notes: "Earthwork and gravel grading verified on 3.2km stretch. Culvert excavation in progress."
  },
  {
    id: "INS-2024-087",
    projectCode: "MPLADS/2022/087",
    projectName: "Drinking Water Pipeline Extension",
    officerName: "Shri Manoj Gupta (Sub-Eng)",
    date: "02 Dec 2024",
    location: "Phanda, Bhopal MP",
    gpsCoords: "23.2301° N, 77.3820° E",
    photosCount: 4,
    physicalProgressClaimed: 65,
    aiVerificationScore: 92,
    status: "Verified",
    notes: "Distribution pipes laid in Ward 4 & 5. Overhead tank foundation completed."
  },
  {
    id: "INS-2024-086",
    projectCode: "MPLADS/2023/042",
    projectName: "Primary Health Sub-centre Renovation",
    officerName: "Dr. A. K. Mishra (Health Inspector)",
    date: "28 Nov 2024",
    location: "Kolar, Bhopal MP",
    gpsCoords: "23.1890° N, 77.4201° E",
    photosCount: 12,
    physicalProgressClaimed: 88,
    aiVerificationScore: 95,
    status: "Verified",
    notes: "Interior painting, electrical fittings, and solar rooftop panel installation complete."
  },
  {
    id: "INS-2024-085",
    projectCode: "MPLADS/2023/091",
    projectName: "Solar Street Lighting Installation",
    officerName: "Shri Sunil Verma (EE)",
    date: "20 Nov 2024",
    location: "Misrod, Bhopal MP",
    gpsCoords: "23.1678° N, 77.4690° E",
    photosCount: 5,
    physicalProgressClaimed: 70,
    aiVerificationScore: 68,
    status: "Under Review",
    notes: "35 out of 50 poles erected with luminaires. Battery enclosures pending delivery."
  }
];

export default function InspectionDossiersPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("ALL");
  const [selectedDossier, setSelectedDossier] = useState<InspectionDossier | null>(mockDossiers[0]);

  const filtered = mockDossiers.filter((d) => {
    const matchSearch =
      d.projectName.toLowerCase().includes(search.toLowerCase()) ||
      d.projectCode.toLowerCase().includes(search.toLowerCase()) ||
      d.officerName.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "ALL" || d.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Inspection Dossiers</h1>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
              Evidence Vault
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tamper-proof field inspection records, GPS geotagged photo logs, and computer-vision anomaly verification.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/field"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            <Camera size={13} />
            Open Field Officer App
          </Link>
        </div>
      </div>

      {/* 3D KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Verified Dossiers</p>
            <p className="text-[26px] font-black text-emerald-600 mt-0.5">142</p>
            <span className="text-[10px] text-emerald-600 font-bold">100% Geotagged</span>
          </div>
          <Stat3DIcon type="completed" size={46} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-blue-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Under Review</p>
            <p className="text-[26px] font-black text-blue-600 mt-0.5">18</p>
            <span className="text-[10px] text-blue-600 font-bold">Pending Nodal Sign-off</span>
          </div>
          <Stat3DIcon type="folder" size={46} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-red-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Anomaly Flags</p>
            <p className="text-[26px] font-black text-red-600 mt-0.5">3</p>
            <span className="text-[10px] text-red-500 font-bold">AI Photo Discrepancy</span>
          </div>
          <Stat3DIcon type="delayed" size={46} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-purple-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Active Officers</p>
            <p className="text-[26px] font-black text-purple-700 mt-0.5">12</p>
            <span className="text-[10px] text-purple-600 font-bold">Across 6 Blocks</span>
          </div>
          <Stat3DIcon type="allocated" size={46} />
        </div>
      </div>

      {/* Main Container: List on Left, Detail Viewer on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-5 items-start mb-8">
        {/* Dossiers List */}
        <div className="card p-4 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row gap-2 justify-between items-center pb-3 border-b border-slate-100">
            <div className="relative w-full sm:w-72">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dossiers, codes, officers..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-1">
              {["ALL", "Verified", "Under Review", "Anomaly Flagged"].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilter(st)}
                  className={classNames(
                    "px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all",
                    filter === st
                      ? "bg-navy-950 text-white"
                      : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2.5">
            {filtered.map((d) => (
              <div
                key={d.id}
                onClick={() => setSelectedDossier(d)}
                className={classNames(
                  "p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                  selectedDossier?.id === d.id
                    ? "bg-blue-50/50 border-blue-400 shadow-xs"
                    : "bg-white hover:bg-slate-50 border-slate-200/80"
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10.5px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {d.id}
                    </span>
                    <span className="font-mono text-[10px] text-blue-600 font-semibold">{d.projectCode}</span>
                    <span
                      className={classNames(
                        "text-[9.5px] font-extrabold px-2 py-0.5 rounded-full border",
                        d.status === "Verified"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : d.status === "Anomaly Flagged"
                          ? "bg-red-50 text-red-700 border-red-200"
                          : "bg-amber-50 text-amber-700 border-amber-200"
                      )}
                    >
                      {d.status}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">{d.projectName}</h3>
                  <p className="text-[11px] text-slate-500">
                    Inspected by <strong>{d.officerName}</strong> on {d.date}
                  </p>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0">
                  <span className="text-[11px] font-bold text-slate-700">
                    Claimed: {d.physicalProgressClaimed}%
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {d.photosCount} geotagged photos
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Dossier Inspector */}
        {selectedDossier ? (
          <div className="card p-5 border border-slate-200/90 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-slate-500">{selectedDossier.id}</span>
                <h3 className="text-sm font-extrabold text-slate-900 mt-0.5">{selectedDossier.projectName}</h3>
              </div>
              <span
                className={classNames(
                  "text-[10px] font-extrabold px-2 py-0.5 rounded-full border",
                  selectedDossier.status === "Verified"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                    : selectedDossier.status === "Anomaly Flagged"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-amber-50 text-amber-700 border-amber-200"
                )}
              >
                {selectedDossier.status}
              </span>
            </div>

            {selectedDossier.anomalyReason && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle size={13} className="text-red-600" />
                  <span>AI Computer Vision Alert</span>
                </div>
                <p className="text-[11px] leading-relaxed">{selectedDossier.anomalyReason}</p>
              </div>
            )}

            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Inspection Officer</span>
                <span className="font-bold text-slate-800">{selectedDossier.officerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Date &amp; Time</span>
                <span className="font-bold text-slate-800">{selectedDossier.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">GPS Coordinates</span>
                <span className="font-mono text-slate-700">{selectedDossier.gpsCoords}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">Claimed Progress</span>
                <span className="font-bold text-blue-700">{selectedDossier.physicalProgressClaimed}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span className="text-slate-500">AI Trust Score</span>
                <span className="font-bold text-emerald-700">{selectedDossier.aiVerificationScore}/100</span>
              </div>
            </div>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/60 text-xs">
              <p className="font-bold text-slate-700 mb-1">Field Observation Note:</p>
              <p className="text-slate-600 italic leading-relaxed">&ldquo;{selectedDossier.notes}&rdquo;</p>
            </div>

            {/* Photo Thumbnails */}
            <div>
              <p className="text-xs font-bold text-slate-700 mb-2">
                Geotagged Photo Evidence ({selectedDossier.photosCount} files)
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3].map((idx) => (
                  <div key={idx} className="aspect-video rounded-xl bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-400">
                    <Camera size={16} />
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => alert(`Inspection certified for ${selectedDossier.id}`)}
                className="flex-1 py-2 text-xs font-bold rounded-xl bg-navy-950 text-white hover:bg-slate-800 shadow-xs transition-all text-center"
              >
                Certify Dossier
              </button>
              <button
                onClick={() => alert(`Re-inspection requested for ${selectedDossier.id}`)}
                className="py-2 px-3 text-xs font-bold rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-all"
              >
                Re-inspect
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
