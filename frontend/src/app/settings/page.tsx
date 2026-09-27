"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Settings,
  User,
  Sliders,
  Bell,
  Database,
  CheckCircle2,
  Save,
  ShieldCheck,
  Sparkles,
  KeyRound
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { currentUser } from "@/lib/mockData";
import { classNames } from "@/lib/format";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "ai" | "notifications" | "connection">("ai");
  const [criticalThreshold, setCriticalThreshold] = useState(40);
  const [delaySensitivity, setDelaySensitivity] = useState(75);
  const [spendDivergence, setSpendDivergence] = useState(25);
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = () => {
    setToast("Settings saved and AI risk heuristics recalibrated.");
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">System Settings</h1>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full border border-slate-200">
              Admin &amp; AI Config
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Configure parliamentary scope, AI model risk tolerances, notification rules, and database sync.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/20 transition-all"
        >
          <Save size={13} />
          Save Preferences
        </button>
      </div>

      {toast && (
        <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{toast}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-emerald-600 underline">Dismiss</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2 mb-6 overflow-x-auto">
        {[
          { id: "ai", label: "AI Risk Engine Parameters", icon: Sliders },
          { id: "profile", label: "Parliamentary Profile", icon: User },
          { id: "notifications", label: "Alert Dispatch Rules", icon: Bell },
          { id: "connection", label: "Database & API Sync", icon: Database }
        ].map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={classNames(
                "inline-flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all",
                activeTab === t.id
                  ? "bg-navy-950 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              )}
            >
              <Icon size={14} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* TAB: AI RISK ENGINE */}
      {activeTab === "ai" && (
        <div className="card p-6 border border-slate-200/90 shadow-sm space-y-6 max-w-3xl mb-8">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">AI Risk &amp; Predictive Model Tuning</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Adjust how aggressively the intelligence engine flags delayed projects, anomalous spending, and photo evidence.
            </p>
          </div>

          <div className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Critical Risk Threshold (AI Health Score)
                </label>
                <span className="text-xs font-black text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-lg">
                  Score ≤ {criticalThreshold}
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="60"
                value={criticalThreshold}
                onChange={(e) => setCriticalThreshold(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-red-600"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Projects scoring below this benchmark are immediately placed in the MP Priority Queue.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Delay Probability Flag Sensitivity
                </label>
                <span className="text-xs font-black text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg">
                  &gt; {delaySensitivity}% Probability
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="90"
                value={delaySensitivity}
                onChange={(e) => setDelaySensitivity(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Machine learning milestone variance model alert threshold.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-800">
                  Financial vs Physical Divergence Tolerance
                </label>
                <span className="text-xs font-black text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-lg">
                  ± {spendDivergence}% Gap
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="40"
                value={spendDivergence}
                onChange={(e) => setSpendDivergence(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Flags potential financial anomalies if fund expenditure outpaces physical completion by more than this margin.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB: PROFILE */}
      {activeTab === "profile" && (
        <div className="card p-6 border border-slate-200/90 shadow-sm space-y-4 max-w-2xl mb-8">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Parliamentary Credentials</h2>
            <p className="text-xs text-slate-500">Representative scope verified with Lok Sabha Secretariat</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Representative Name</label>
              <input
                type="text"
                defaultValue={currentUser.name}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Role / Designation</label>
              <input
                type="text"
                defaultValue={currentUser.role}
                disabled
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-500 font-semibold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Constituency</label>
              <input
                type="text"
                defaultValue="Bhopal Lok Sabha (Madhya Pradesh)"
                disabled
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-500 font-semibold"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Nodal District Authority</label>
              <input
                type="text"
                defaultValue="Office of District Collector, Bhopal"
                disabled
                className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-slate-500 font-semibold"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB: NOTIFICATIONS */}
      {activeTab === "notifications" && (
        <div className="card p-6 border border-slate-200/90 shadow-sm space-y-4 max-w-2xl mb-8">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Notification &amp; Escalation Rules</h2>
            <p className="text-xs text-slate-500">Automated channels for high-priority parliamentary alerts</p>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { label: "Critical Delay SMS & WhatsApp", desc: "Instant alert to MP Personal Secretary when a work is projected >60 days delay" },
              { label: "Financial Anomaly CAG Audit Ping", desc: "Immediate notification upon spend-to-work mismatch detection" },
              { label: "Weekly Parliamentary Executive Briefing", desc: "Automated Monday morning PDF email digest of all 182 projects" },
              { label: "Citizen Grievance Escalations", desc: "Notify when a citizen complaint remains unresolved >14 days" }
            ].map((rule, idx) => (
              <div key={idx} className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <div>
                  <p className="font-bold text-slate-800">{rule.label}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">{rule.desc}</p>
                </div>
                <input type="checkbox" defaultChecked className="mt-1 w-4 h-4 text-blue-600 rounded" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB: CONNECTION */}
      {activeTab === "connection" && (
        <div className="card p-6 border border-slate-200/90 shadow-sm space-y-4 max-w-2xl mb-8">
          <div>
            <h2 className="text-base font-extrabold text-slate-900">Database &amp; API Health</h2>
            <p className="text-xs text-slate-500">Connection status to FastAPI and PostgreSQL PostGIS servers</p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">FastAPI Backend:</span>
              <span className="font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Operational (Render / Local)
              </span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Database Engine:</span>
              <span className="font-bold text-slate-800">PostgreSQL 16 + PostGIS Extension</span>
            </div>
            <div className="flex justify-between py-2 border-b border-slate-100">
              <span className="text-slate-500">Last Telemetry Sync:</span>
              <span className="font-bold text-slate-800">Today, 10:45 AM</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/workspace"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-all"
            >
              <Database size={13} />
              Open Live Connected Workspace
            </Link>
          </div>
        </div>
      )}
    </AppShell>
  );
}
