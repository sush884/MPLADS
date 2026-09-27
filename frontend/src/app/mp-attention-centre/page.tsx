"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BellRing,
  AlertTriangle,
  DollarSign,
  Building2,
  MapPin,
  CheckCircle,
  FileCheck,
  Send,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  HelpCircle,
  Download
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Stat3DIcon } from "@/components/3d/Stat3DIcon";
import { classNames } from "@/lib/format";

export default function MpAttentionCentrePage() {
  const [activeTab, setActiveTab] = useState<"delays" | "financial" | "agency" | "gaps">("delays");
  const [signedLetters, setSignedLetters] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAction = (id: string, message: string) => {
    setSignedLetters((prev) => [...prev, id]);
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 5000);
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">MP Attention Centre</h1>
            <span className="text-[10px] font-extrabold bg-red-500 text-white px-2 py-0.5 rounded-full shadow-xs">
              4 Critical Issues
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Executive triage console highlighting items requiring parliamentary review, executive inquiry, or funding reallocation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleAction("all", "Complete MP Attention Briefing dispatched to District Collector and Parliamentary Office.")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20 hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            <Send size={13} />
            Dispatch Briefing to District Collector
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-600 underline">Dismiss</button>
        </div>
      )}

      {/* 4 Category Nav Cards (Matches Reference Image 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <button
          onClick={() => setActiveTab("delays")}
          className={classNames(
            "card p-4 text-left border-2 transition-all flex items-start justify-between gap-3",
            activeTab === "delays"
              ? "border-red-500 bg-red-50/30 shadow-md"
              : "border-transparent hover:border-slate-300"
          )}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <p className="text-xs font-bold text-red-700 uppercase tracking-wider">Delay Alert</p>
            </div>
            <p className="text-[15px] font-black text-slate-900 mt-1">3 Projects Likely to Delay</p>
            <p className="text-[11px] text-slate-500 mt-0.5">&gt;45 days milestone slippage</p>
          </div>
          <Stat3DIcon type="delayed" size={42} />
        </button>

        <button
          onClick={() => setActiveTab("financial")}
          className={classNames(
            "card p-4 text-left border-2 transition-all flex items-start justify-between gap-3",
            activeTab === "financial"
              ? "border-amber-500 bg-amber-50/30 shadow-md"
              : "border-transparent hover:border-slate-300"
          )}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <p className="text-xs font-bold text-amber-700 uppercase tracking-wider">Audit Alert</p>
            </div>
            <p className="text-[15px] font-black text-slate-900 mt-1">2 Financial Anomalies</p>
            <p className="text-[11px] text-slate-500 mt-0.5">High spend with low output</p>
          </div>
          <Stat3DIcon type="attention" size={42} />
        </button>

        <button
          onClick={() => setActiveTab("agency")}
          className={classNames(
            "card p-4 text-left border-2 transition-all flex items-start justify-between gap-3",
            activeTab === "agency"
              ? "border-blue-500 bg-blue-50/30 shadow-md"
              : "border-transparent hover:border-slate-300"
          )}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              <p className="text-xs font-bold text-blue-700 uppercase tracking-wider">Agency Watch</p>
            </div>
            <p className="text-[15px] font-black text-slate-900 mt-1">1 Agency Needs Review</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Water Resources (Score: 52)</p>
          </div>
          <Stat3DIcon type="folder" size={42} />
        </button>

        <button
          onClick={() => setActiveTab("gaps")}
          className={classNames(
            "card p-4 text-left border-2 transition-all flex items-start justify-between gap-3",
            activeTab === "gaps"
              ? "border-purple-500 bg-purple-50/30 shadow-md"
              : "border-transparent hover:border-slate-300"
          )}
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <p className="text-xs font-bold text-purple-700 uppercase tracking-wider">Constituency Gap</p>
            </div>
            <p className="text-[15px] font-black text-slate-900 mt-1">4 Development Gaps</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Berasia &amp; Phanda health/water</p>
          </div>
          <Stat3DIcon type="allocated" size={42} />
        </button>
      </div>

      {/* Main Tab Content */}
      <div className="card p-6 border border-slate-200/90 shadow-sm mb-8">
        {/* TAB 1: DELAYS */}
        {activeTab === "delays" && (
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-3 mb-4">
              <h2 className="text-lg font-black text-slate-900">3 Projects at Imminent Risk of Major Delay</h2>
              <p className="text-xs text-slate-500">
                Machine learning forecast indicates these works will exceed their sanctioned target dates by over 45 days unless accelerated.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: "del-1",
                  projectId: "1",
                  title: "Construction of Community Hall",
                  code: "MPLADS/2023/001",
                  location: "Berasia, Bhopal MP",
                  agency: "Rural Development Dept.",
                  daysDelayed: 45,
                  probability: 78,
                  diagnosis: "Civil foundation complete, but steel procurement delayed due to local agency vendor payment dispute.",
                  recommendedAction: "Issue directive to Rural Development Dept to release contractor tranche against verified foundation certificate."
                },
                {
                  id: "del-2",
                  projectId: "2",
                  title: "Rural Road Development (Package 4)",
                  code: "MPLADS/2023/014",
                  location: "Huzur, Bhopal MP",
                  agency: "Public Works Dept.",
                  daysDelayed: 78,
                  probability: 82,
                  diagnosis: "Forest department clearance pending on 1.4 km stretch. Work halted for 42 consecutive days.",
                  recommendedAction: "Dispatch MP Coordination Letter to MP State Forest Department for fast-tracked NOC."
                },
                {
                  id: "del-3",
                  projectId: "3",
                  title: "Drinking Water Pipeline Extension",
                  code: "MPLADS/2022/087",
                  location: "Phanda, Bhopal MP",
                  agency: "Water Resources Dept.",
                  daysDelayed: 62,
                  probability: 85,
                  diagnosis: "Over-allocation of agency engineers to other state projects; missing daily supervision log.",
                  recommendedAction: "Request District Collector to appoint a Dedicated Executive Engineer to oversee Phanda water grid."
                }
              ].map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-extrabold text-[10.5px]">
                        +{item.daysDelayed} Days Overrun Projected
                      </span>
                      <span className="text-xs text-slate-400 font-mono">{item.code}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                    <p className="text-xs text-slate-500">{item.location} · {item.agency}</p>
                    <p className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200/60 mt-2">
                      <strong>AI Root Cause:</strong> {item.diagnosis}
                    </p>
                    <p className="text-xs text-blue-800 bg-blue-50/80 p-2.5 rounded-xl border border-blue-200/60 mt-1">
                      <strong>Recommended MP Action:</strong> {item.recommendedAction}
                    </p>
                  </div>

                  <div className="shrink-0 flex flex-col gap-2 min-w-[160px]">
                    <button
                      disabled={signedLetters.includes(item.id)}
                      onClick={() => handleAction(item.id, `Executive directive issued for "${item.title}".`)}
                      className={classNames(
                        "px-3.5 py-2 text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5",
                        signedLetters.includes(item.id)
                          ? "bg-emerald-100 text-emerald-800 cursor-default"
                          : "bg-red-600 hover:bg-red-700 text-white shadow-red-500/20"
                      )}
                    >
                      {signedLetters.includes(item.id) ? (
                        <>
                          <CheckCircle size={13} />
                          Directive Issued
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          Sign Intervention Order
                        </>
                      )}
                    </button>
                    <Link
                      href={`/projects/${item.projectId}`}
                      className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-center transition-all"
                    >
                      Project Analysis →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: FINANCIAL */}
        {activeTab === "financial" && (
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-3 mb-4">
              <h2 className="text-lg font-black text-slate-900">2 Financial Anomalies Flagged for Audit</h2>
              <p className="text-xs text-slate-500">
                Discrepancy detected between recorded fiscal expenditure and verified physical completion metrics.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10.5px]">
                      Severe Spend/Progress Mismatch
                    </span>
                    <span className="text-xs text-slate-400 font-mono">MPLADS/2023/001</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Construction of Community Hall (Berasia)</h3>
                  <p className="text-xs text-slate-600">
                    Expenditure recorded: <strong>82% (₹41.0 Cr)</strong> vs Physical Verification: <strong>48%</strong>.
                  </p>
                  <p className="text-xs text-slate-700 mt-2 bg-white p-2.5 rounded-xl border border-amber-200/60">
                    <strong>Rule Flag:</strong> Expenditure exceeds physical progress by &gt;30 percentage points without intermediate utilization certificate on file.
                  </p>
                </div>
                <div className="shrink-0 flex flex-col gap-2 min-w-[160px]">
                  <button
                    onClick={() => handleAction("fin-1", "CAG Special Audit recommended for Community Hall (Berasia).")}
                    className="px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <FileCheck size={13} />
                    Order Field Audit
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[10.5px]">
                      Stagnant Unspent Balance
                    </span>
                    <span className="text-xs text-slate-400 font-mono">MPLADS/2023/014</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">Rural Road Development (Huzur)</h3>
                  <p className="text-xs text-slate-600">
                    ₹27.3 Cr released in Q1 2023; no secondary billing or measurement book entry in the last 180 days.
                  </p>
                </div>
                <div className="shrink-0 flex flex-col gap-2 min-w-[160px]">
                  <button
                    onClick={() => handleAction("fin-2", "Agency account inquiry issued to PWD Bhopal.")}
                    className="px-3.5 py-2 text-xs font-bold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <FileCheck size={13} />
                    Require Bank Statement
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: AGENCY */}
        {activeTab === "agency" && (
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-3 mb-4">
              <h2 className="text-lg font-black text-slate-900">1 Agency Requiring Performance Hearing</h2>
              <p className="text-xs text-slate-500">
                Water Resources Department has fallen below the 60% completion benchmark across Bhopal district.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold text-[10.5px]">
                    Lowest Performing Agency (Score: 52/100)
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">Water Resources Department</h3>
                <p className="text-xs text-slate-600">
                  Superintending Engineer: <strong>Er. Alok Saxena</strong> · Contact: +91 755 288 3319
                </p>
                <div className="grid grid-cols-3 gap-2 bg-white p-3 rounded-xl border border-slate-200 max-w-lg text-center">
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Avg. Delay</p>
                    <p className="text-base font-black text-red-600">62 Days</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Completion</p>
                    <p className="text-base font-black text-slate-800">58%</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Stalled Works</p>
                    <p className="text-base font-black text-amber-600">4 Works</p>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col gap-2 min-w-[170px]">
                <button
                  onClick={() => handleAction("agency-1", "Formal summon issued to Chief Engineer, Water Resources Dept.")}
                  className="px-3.5 py-2 text-xs font-bold rounded-xl bg-navy-950 text-white hover:bg-slate-800 shadow-xs transition-all flex items-center justify-center gap-1.5"
                >
                  <Send size={13} />
                  Summon for Hearing
                </button>
                <Link
                  href="/agency-performance"
                  className="px-3.5 py-2 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-center transition-all"
                >
                  View Agency Ledger →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: GAPS */}
        {activeTab === "gaps" && (
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-3 mb-4">
              <h2 className="text-lg font-black text-slate-900">4 Constituency Development Gaps</h2>
              <p className="text-xs text-slate-500">
                Spatial GIS and census-linked infrastructure gap models identify these urgent community needs in Bhopal.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  sector: "Drinking Water Supply",
                  location: "Phanda & Kolar Rural Wards",
                  gap: "High Gap",
                  description: "Groundwater depletion has affected 18 villages. Piped tap water coverage stands at only 34%.",
                  recommendedSanction: "Sanction 8 Solar Mini-piped Water Supply Systems (Est. ₹3.2 Cr)"
                },
                {
                  sector: "Primary Healthcare",
                  location: "Berasia Sub-district",
                  gap: "High Gap",
                  description: "Average citizen distance to an operational 24/7 Primary Health Centre exceeds 16 km.",
                  recommendedSanction: "Sanction 2 PHC Health & Wellness Sub-centres (Est. ₹4.5 Cr)"
                },
                {
                  sector: "Secondary Education Labs",
                  location: "Misrod & Kolar",
                  gap: "Medium Gap",
                  description: "12 Government Senior Secondary schools lack modern STEM/computer lab facilities.",
                  recommendedSanction: "Smart Class & Digital Science Laboratory Sanctions (Est. ₹1.8 Cr)"
                },
                {
                  sector: "All-Weather Connectivity",
                  location: "Bairagarh Outer Habitations",
                  gap: "Medium Gap",
                  description: "3 hamlets cut off during monsoon downpours due to low-level submersible causeways.",
                  recommendedSanction: "High-level Box Culvert & CC Road Sanctions (Est. ₹2.4 Cr)"
                }
              ].map((gap, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-full">
                      {gap.sector}
                    </span>
                    <span className="text-[10px] font-black text-red-600 uppercase tracking-wider">{gap.gap}</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{gap.location}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{gap.description}</p>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200/60 text-xs text-blue-900">
                    <strong>Recommended Priority:</strong> {gap.recommendedSanction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
