"use client";

import { useState } from "react";
import Link from "next/link";
import {
  MessageSquareText,
  ThumbsUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Send,
  MapPin,
  Sparkles,
  Filter,
  Search,
  User
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { Stat3DIcon } from "@/components/3d/Stat3DIcon";
import { classNames } from "@/lib/format";

interface FeedbackItem {
  id: string;
  citizenName: string;
  ward: string;
  block: string;
  category: "Drinking Water" | "Roads" | "Healthcare" | "Community Facilities";
  sentiment: "Positive" | "Neutral" | "Critical";
  date: string;
  message: string;
  status: "Resolved" | "Investigating" | "Action Ordered";
  reply?: string;
}

const mockFeedbacks: FeedbackItem[] = [
  {
    id: "FB-2024-112",
    citizenName: "Govind Narain",
    ward: "Ward 14, Berasia",
    block: "Berasia",
    category: "Community Facilities",
    sentiment: "Critical",
    date: "13 Dec 2024",
    message: "Community hall construction work stopped since 3 weeks. Villagers have no shelter for upcoming panchayat gathering. Please intervene.",
    status: "Action Ordered",
    reply: "Intervention order issued to Rural Development Department on 14 Dec."
  },
  {
    id: "FB-2024-111",
    citizenName: "Meenakshi Soni",
    ward: "Ward 22, Kolar",
    block: "Kolar",
    category: "Healthcare",
    sentiment: "Positive",
    date: "11 Dec 2024",
    message: "The new Primary Health Sub-centre equipment and doctor consultation room are wonderful. Thank you Hon'ble MP sir for this facility.",
    status: "Resolved"
  },
  {
    id: "FB-2024-110",
    citizenName: "Dinesh Malviya",
    ward: "Ward 06, Phanda",
    block: "Phanda",
    category: "Drinking Water",
    sentiment: "Critical",
    date: "09 Dec 2024",
    message: "Pipeline dug up in front of houses for 2 months, water supply still erratic. Muddy road causing problems for school children.",
    status: "Investigating"
  },
  {
    id: "FB-2024-109",
    citizenName: "Sunil Rathore",
    ward: "Ward 31, Misrod",
    block: "Misrod",
    category: "Roads",
    sentiment: "Neutral",
    date: "05 Dec 2024",
    message: "Streetlights are installed but 4 poles near the mandi chowk are not functioning after 8 PM.",
    status: "Resolved",
    reply: "Contractor re-wired faulty junction box on 07 Dec."
  }
];

export default function FeedbackPage() {
  const [filter, setFilter] = useState<string>("ALL");
  const [feedbacks, setFeedbacks] = useState(mockFeedbacks);
  const [replyInput, setReplyInput] = useState<{ [key: string]: string }>({});
  const [toast, setToast] = useState<string | null>(null);

  const filtered = feedbacks.filter((f) => {
    if (filter === "ALL") return true;
    return f.sentiment === filter || f.status === filter;
  });

  const handleSendReply = (id: string) => {
    const text = replyInput[id];
    if (!text) return;
    setFeedbacks((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Resolved", reply: text } : item
      )
    );
    setReplyInput((prev) => ({ ...prev, [id]: "" }));
    setToast(`Official response recorded for grievance ${id}.`);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Citizen Feedback &amp; Grievances</h1>
            <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
              Constituency Pulse
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time citizen sentiment analysis, grievance resolution pipeline, and direct MP feedback dispatch.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-2xs">
          {["ALL", "Critical", "Positive", "Investigating", "Resolved"].map((tab) => (
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

      {toast && (
        <div className="mb-6 rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 flex items-center justify-between shadow-xs animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>{toast}</span>
          </div>
          <button onClick={() => setToast(null)} className="text-emerald-600 underline">Dismiss</button>
        </div>
      )}

      {/* 3D KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card p-4 flex items-center justify-between border-l-4 border-l-blue-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Total Submissions</p>
            <p className="text-[26px] font-black text-slate-900 mt-0.5">342</p>
            <span className="text-[10px] text-blue-600 font-bold">From all 6 blocks</span>
          </div>
          <Stat3DIcon type="folder" size={46} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Resolution Rate</p>
            <p className="text-[26px] font-black text-emerald-600 mt-0.5">84.5%</p>
            <span className="text-[10px] text-emerald-600 font-bold">289 Issues Solved</span>
          </div>
          <Stat3DIcon type="completed" size={46} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-red-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Urgent Escalations</p>
            <p className="text-[26px] font-black text-red-600 mt-0.5">14</p>
            <span className="text-[10px] text-red-500 font-bold">Pending investigation</span>
          </div>
          <Stat3DIcon type="delayed" size={46} />
        </div>

        <div className="card p-4 flex items-center justify-between border-l-4 border-l-purple-500">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase">Citizen Satisfaction</p>
            <p className="text-[26px] font-black text-purple-700 mt-0.5">4.6 / 5.0</p>
            <span className="text-[10px] text-purple-600 font-bold">Constituency Trust</span>
          </div>
          <Stat3DIcon type="allocated" size={46} />
        </div>
      </div>

      {/* Grievances List */}
      <div className="space-y-4 mb-8">
        {filtered.map((item) => (
          <div key={item.id} className="card p-5 border border-slate-200/90 shadow-sm space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs">
                  <User size={15} />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">{item.citizenName}</h3>
                  <p className="text-[10.5px] text-slate-500 flex items-center gap-1">
                    <MapPin size={11} className="text-slate-400" />
                    {item.ward}, {item.block} · {item.date}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                  {item.category}
                </span>
                <span
                  className={classNames(
                    "text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border",
                    item.sentiment === "Critical"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : item.sentiment === "Positive"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-slate-50 text-slate-700 border-slate-200"
                  )}
                >
                  {item.sentiment}
                </span>
                <span
                  className={classNames(
                    "text-[10px] font-bold px-2 py-0.5 rounded",
                    item.status === "Resolved"
                      ? "bg-emerald-100 text-emerald-800"
                      : item.status === "Action Ordered"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-amber-100 text-amber-800"
                  )}
                >
                  {item.status}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200/60">
              &ldquo;{item.message}&rdquo;
            </p>

            {item.reply && (
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-900">
                <strong>MP Office Response:</strong> {item.reply}
              </div>
            )}

            {/* Quick reply bar if not resolved */}
            {item.status !== "Resolved" && (
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Draft response from Member of Parliament..."
                  value={replyInput[item.id] || ""}
                  onChange={(e) =>
                    setReplyInput({ ...replyInput, [item.id]: e.target.value })
                  }
                  className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus:outline-none focus:bg-white focus:border-blue-500"
                />
                <button
                  onClick={() => handleSendReply(item.id)}
                  className="px-3.5 py-2 rounded-xl bg-navy-950 text-white hover:bg-slate-800 font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all"
                >
                  <Send size={12} />
                  Send Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </AppShell>
  );
}
