"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileBarChart2,
  Download,
  Calendar,
  FileCheck,
  ShieldCheck,
  Printer,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  FileSpreadsheet
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Stat3DIcon } from "@/components/3d/Stat3DIcon";
import { Emblem } from "@/components/layout/Emblem";
import { currentUser } from "@/lib/mockData";
import { classNames } from "@/lib/format";

interface ReportDoc {
  id: string;
  title: string;
  category: "Parliamentary" | "Audit & CAG" | "Financial" | "Agency";
  generatedDate: string;
  size: string;
  format: "PDF" | "XLSX";
  description: string;
}

const mockReports: ReportDoc[] = [
  {
    id: "REP-2024-001",
    title: "Parliamentary Annual Performance & Utilization Dossier",
    category: "Parliamentary",
    generatedDate: "14 Dec 2024",
    size: "4.2 MB",
    format: "PDF",
    description: "Comprehensive constituency-wide expenditure, physical milestone audit, and block-wise delivery metrics."
  },
  {
    id: "REP-2024-002",
    title: "CAG Compliance & Anomaly Reconciliation Ledger",
    category: "Audit & CAG",
    generatedDate: "10 Dec 2024",
    size: "2.8 MB",
    format: "PDF",
    description: "Detailed breakdown of the 2 flagged financial anomalies, fund disbursal timestamps, and contractor invoices."
  },
  {
    id: "REP-2024-003",
    title: "Agency Accountability & Delay Penalty Scorecard",
    category: "Agency",
    generatedDate: "05 Dec 2024",
    size: "1.6 MB",
    format: "PDF",
    description: "Ranking and risk grading for Rural Development Dept, PWD, Zila Panchayat, Water Resources, and Education."
  },
  {
    id: "REP-2024-004",
    title: "Raw Transaction & Utilization Certificate Ledger (FY 23-24)",
    category: "Financial",
    generatedDate: "01 Dec 2024",
    size: "850 KB",
    format: "XLSX",
    description: "All sanction orders, bank transfers, measurement book numbers, and utilization certificate receipts."
  },
  {
    id: "REP-2024-005",
    title: "Constituency Spatial Equity & Development Gap Analysis",
    category: "Parliamentary",
    generatedDate: "28 Nov 2024",
    size: "3.5 MB",
    format: "PDF",
    description: "Demographic infrastructure coverage mapping identifying underserved habitations across Bhopal blocks."
  }
];

export default function ReportsPage() {
  const [selectedYear, setSelectedYear] = useState("2024-25");
  const [activeReport, setActiveReport] = useState<ReportDoc>(mockReports[0]);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleDownload = (rep: ReportDoc) => {
    setDownloadSuccess(`Downloaded "${rep.title}" (${rep.format}).`);
    setTimeout(() => setDownloadSuccess(null), 4000);
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Audit &amp; Intelligence Reports</h1>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
              Official Exports
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Parliamentary annual review dossiers, CAG compliance ledgers, and one-click certified export bundles.
          </p>
        </div>

        {/* Year Filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-white p-1.5 rounded-xl border border-slate-200 shadow-2xs">
            <Calendar size={13} className="text-blue-600" />
            <span>Financial Year:</span>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="font-bold text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none"
            >
              <option value="2024-25">FY 2024 - 2025</option>
              <option value="2023-24">FY 2023 - 2024</option>
              <option value="2022-23">FY 2022 - 2023</option>
              <option value="2021-22">FY 2021 - 2022</option>
            </select>
          </div>
        </div>
      </div>

      {downloadSuccess && (
        <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{downloadSuccess}</span>
          </div>
          <button onClick={() => setDownloadSuccess(null)} className="text-emerald-600 underline">Dismiss</button>
        </div>
      )}

      {/* 3D KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 flex items-center justify-between border-l-4 border-l-blue-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Available Dossiers</p>
            <p className="text-[26px] font-black text-slate-900 mt-0.5">14 Reports</p>
            <span className="text-[10px] text-blue-600 font-bold">Updated this week</span>
          </div>
          <Stat3DIcon type="folder" size={46} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">CAG Compliance</p>
            <p className="text-[26px] font-black text-emerald-600 mt-0.5">98.4%</p>
            <span className="text-[10px] text-emerald-600 font-bold">Standard format</span>
          </div>
          <Stat3DIcon type="completed" size={46} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-amber-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Pending UCs</p>
            <p className="text-[26px] font-black text-amber-600 mt-0.5">4 Works</p>
            <span className="text-[10px] text-amber-600 font-bold">Certificates pending</span>
          </div>
          <Stat3DIcon type="attention" size={46} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-purple-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Total Sanctions</p>
            <p className="text-[26px] font-black text-purple-700 mt-0.5">₹ 342.5 Cr</p>
            <span className="text-[10px] text-purple-600 font-bold">Fully Reconciled</span>
          </div>
          <Stat3DIcon type="allocated" size={46} />
        </div>
      </div>

      {/* Main Grid: Available Reports on Left, Official Document Preview on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 items-start mb-8">
        {/* Reports List */}
        <div className="card p-5 border border-slate-200/90 shadow-sm space-y-3">
          <h2 className="text-base font-extrabold text-slate-900 mb-2">Available Intelligence Dossiers</h2>
          <div className="space-y-3">
            {mockReports.map((rep) => (
              <div
                key={rep.id}
                onClick={() => setActiveReport(rep)}
                className={classNames(
                  "p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                  activeReport.id === rep.id
                    ? "bg-blue-50/50 border-blue-400 shadow-xs"
                    : "bg-white hover:bg-slate-50 border-slate-200/80"
                )}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      {rep.id}
                    </span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {rep.category}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">{rep.format} · {rep.size}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{rep.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed max-w-lg">{rep.description}</p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDownload(rep);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 text-xs font-bold transition-all"
                  >
                    <Download size={13} />
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Document Preview Frame */}
        <div className="card p-6 border border-slate-200/90 shadow-sm bg-gradient-to-b from-white to-slate-50 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2.5">
              <Emblem size={28} />
              <div>
                <p className="text-xs font-black uppercase tracking-wider text-slate-800">MPLADS Secretariat</p>
                <p className="text-[9.5px] text-slate-400">Government of India · Lok Sabha</p>
              </div>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              Certified Digitally
            </span>
          </div>

          <div className="space-y-2">
            <span className="font-mono text-[11px] text-slate-400 font-bold">{activeReport.id}</span>
            <h3 className="text-base font-extrabold text-slate-900 leading-snug">{activeReport.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{activeReport.description}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-100 border border-slate-200/70 text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500">Member of Parliament:</span>
              <strong className="text-slate-800">{currentUser.name}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Constituency:</span>
              <strong className="text-slate-800">Bhopal, Madhya Pradesh</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Audit Status:</span>
              <strong className="text-emerald-700">Verified by MoSPI Engine</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Generation Date:</span>
              <strong className="text-slate-800">{activeReport.generatedDate}</strong>
            </div>
          </div>

          <button
            onClick={() => handleDownload(activeReport)}
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 transition-all"
          >
            <Download size={14} />
            Download Complete Certified {activeReport.format}
          </button>
        </div>
      </div>
    </AppShell>
  );
}
