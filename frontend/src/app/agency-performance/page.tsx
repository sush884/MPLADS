"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HardHat,
  Home,
  Droplets,
  GraduationCap,
  Landmark,
  Building2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  ShieldCheck,
  Send,
  Layers,
  Sparkles
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Stat3DIcon } from "@/components/3d/Stat3DIcon";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { topAgencies, projects } from "@/lib/mockData";
import { classNames } from "@/lib/format";

const agencyIcons: Record<string, any> = {
  "Rural Development Dept.": Home,
  "Public Works Dept.": HardHat,
  "Zila Panchayat": Landmark,
  "Water Resources Dept.": Droplets,
  "Education Dept.": GraduationCap
};

const agencyDetails: Record<string, {
  contactPerson: string;
  email: string;
  phone: string;
  totalFundsCr: number;
  costVariancePct: number;
  stalledProjects: number;
  auditFlag: string | null;
}> = {
  "Rural Development Dept.": {
    contactPerson: "Er. Rameshwar Verma, Chief Engineer",
    email: "rdd-bhopal@mp.gov.in",
    phone: "+91 755 277 4101",
    totalFundsCr: 88.5,
    costVariancePct: 3.2,
    stalledProjects: 1,
    auditFlag: null
  },
  "Public Works Dept.": {
    contactPerson: "Er. K. P. Singh, Executive Engineer",
    email: "pwd-bhopal-div1@mp.gov.in",
    phone: "+91 755 244 8920",
    totalFundsCr: 112.4,
    costVariancePct: 8.6,
    stalledProjects: 3,
    auditFlag: "Notice: 45 days average delay in rural road packages"
  },
  "Zila Panchayat": {
    contactPerson: "Smt. Vandana Sharma, CEO",
    email: "zp-ceo-bhopal@mp.gov.in",
    phone: "+91 755 255 1204",
    totalFundsCr: 54.0,
    costVariancePct: 4.1,
    stalledProjects: 2,
    auditFlag: null
  },
  "Water Resources Dept.": {
    contactPerson: "Er. Alok Saxena, Superintending Engineer",
    email: "wrd-central-mp@gov.in",
    phone: "+91 755 288 3319",
    totalFundsCr: 48.2,
    costVariancePct: 14.8,
    stalledProjects: 4,
    auditFlag: "Critical: High delay & pending pipeline approvals in Phanda"
  },
  "Education Dept.": {
    contactPerson: "Dr. Sunita Chouhan, District Education Officer",
    email: "deo-bhopal@mp.gov.in",
    phone: "+91 755 266 5400",
    totalFundsCr: 39.4,
    costVariancePct: 1.1,
    stalledProjects: 0,
    auditFlag: null
  }
};

export default function AgencyPerformancePage() {
  const [selectedAgency, setSelectedAgency] = useState<string>("All");
  const [noticeSent, setNoticeSent] = useState<string | null>(null);

  const enrichedAgencies = topAgencies.map((agency) => {
    const details = agencyDetails[agency.name] || {
      contactPerson: "Nodal Officer",
      email: "contact@mp.gov.in",
      phone: "+91 755 000 0000",
      totalFundsCr: 30,
      costVariancePct: 5,
      stalledProjects: 1,
      auditFlag: null
    };

    return {
      ...agency,
      ...details
    };
  });

  return (
    <AppShell>
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Agency Performance</h1>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
              5 Key Executing Bodies
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Comparative delivery scores, delay analysis, and cost overrun audits across Bhopal executing agencies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setNoticeSent("Quarterly agency compliance report generated and queued for District Collector dispatch.")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-navy-950 text-white shadow-md shadow-navy-950/20 hover:bg-slate-800 transition-all"
          >
            <Send size={13} />
            Dispatch Agency Review Notice
          </button>
        </div>
      </div>

      {noticeSent && (
        <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 flex items-center justify-between shadow-xs">
          <span>{noticeSent}</span>
          <button onClick={() => setNoticeSent(null)} className="text-emerald-700 underline text-xs">
            Dismiss
          </button>
        </div>
      )}

      {/* 3D KPI Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Top Performer</p>
            <p className="text-[20px] font-black text-slate-900 mt-0.5">Education Dept.</p>
            <span className="text-[10px] text-emerald-600 font-bold">Score 86/100 · 94% Completed</span>
          </div>
          <Stat3DIcon type="completed" size={46} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-blue-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Largest Volume</p>
            <p className="text-[20px] font-black text-slate-900 mt-0.5">Rural Dev. Dept.</p>
            <span className="text-[10px] text-blue-600 font-bold">42 Projects · ₹88.5 Cr</span>
          </div>
          <Stat3DIcon type="folder" size={46} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-red-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Needs Attention</p>
            <p className="text-[20px] font-black text-slate-900 mt-0.5">Water Resources</p>
            <span className="text-[10px] text-red-600 font-bold">Score 52 · 62 Days Avg Delay</span>
          </div>
          <Stat3DIcon type="delayed" size={46} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-purple-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Total Agency Funds</p>
            <p className="text-[20px] font-black text-slate-900 mt-0.5">₹ 342.5 Cr</p>
            <span className="text-[10px] text-purple-600 font-bold">78% Average Utilization</span>
          </div>
          <Stat3DIcon type="allocated" size={46} />
        </div>
      </div>

      {/* Agency Scorecards List */}
      <div className="space-y-4 mb-8">
        {enrichedAgencies.map((agency) => {
          const Icon = agencyIcons[agency.name] || Building2;
          const isHealthy = agency.score >= 80;
          const isWarning = agency.score < 65;

          return (
            <div
              key={agency.name}
              className="card p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                {/* Agency Branding & Contact */}
                <div className="flex items-start gap-4 min-w-[280px]">
                  <div
                    className={classNames(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xs",
                      isHealthy
                        ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                        : isWarning
                        ? "bg-red-50 text-red-600 border border-red-200"
                        : "bg-blue-50 text-blue-600 border border-blue-200"
                    )}
                  >
                    <Icon size={24} />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-[16px] font-bold text-slate-900">{agency.name}</h2>
                      <span
                        className={classNames(
                          "px-2 py-0.5 rounded-full text-[10px] font-extrabold shadow-2xs border",
                          isHealthy
                            ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                            : isWarning
                            ? "bg-red-50 text-red-700 border-red-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        )}
                      >
                        Score: {agency.score}/100
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1">{agency.contactPerson}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {agency.email} · {agency.phone}
                    </p>

                    {agency.auditFlag && (
                      <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 text-red-700 border border-red-200 text-[10.5px] font-semibold">
                        <AlertTriangle size={12} className="shrink-0" />
                        <span>{agency.auditFlag}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/60 flex-1 max-w-2xl">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Projects Assigned</p>
                    <p className="text-[16px] font-black text-slate-900 mt-0.5">{agency.projects}</p>
                    <span className="text-[10px] text-slate-500">₹{agency.totalFundsCr} Cr allocated</span>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Completion Rate</p>
                    <p className="text-[16px] font-black text-emerald-600 mt-0.5">{agency.completionRatePct}%</p>
                    <div className="mt-1">
                      <ProgressBar value={agency.completionRatePct} color="bg-emerald-500" height={4} />
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Average Delay</p>
                    <p className={classNames("text-[16px] font-black mt-0.5", agency.avgDelayDays > 30 ? "text-red-600" : "text-slate-800")}>
                      {agency.avgDelayDays} days
                    </p>
                    <span className="text-[10px] text-slate-500">Cost var: +{agency.costVariancePct}%</span>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Stalled Works</p>
                    <p className="text-[16px] font-black text-amber-600 mt-0.5">{agency.stalledProjects}</p>
                    <span className="text-[10px] text-amber-600 font-semibold">Pending review</span>
                  </div>
                </div>

                {/* Action Link */}
                <div className="shrink-0 flex items-center lg:flex-col lg:justify-center gap-2">
                  <Link
                    href={`/projects?agency=${encodeURIComponent(agency.name)}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold transition-colors"
                  >
                    View Projects
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
