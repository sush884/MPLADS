import Link from "next/link";
import { AlertTriangle, ArrowRight, ChevronRight, DollarSign, Building2, MapPin } from "lucide-react";
import { classNames } from "@/lib/format";
import { attentionCentreItems, attentionCentreNewCount } from "@/lib/mockData";

const attentionItemIcons = [
  { tone: "red", bg: "bg-red-500/20 text-red-400", Icon: AlertTriangle },
  { tone: "amber", bg: "bg-amber-500/20 text-amber-400", Icon: DollarSign },
  { tone: "blue", bg: "bg-blue-500/20 text-blue-400", Icon: Building2 },
  { tone: "purple", bg: "bg-purple-500/20 text-purple-400", Icon: MapPin }
];

export function AttentionCentreCard() {
  return (
    <section className="rounded-2xl bg-gradient-to-b from-[#0e2246] via-[#0b1b38] to-[#07132a] border border-blue-500/20 p-4 sm:p-5 text-slate-200 shadow-xl relative overflow-hidden">
      {/* Subtle background gradient glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex items-center justify-between mb-3.5">
        <h2 className="text-[14px] font-extrabold text-white tracking-tight">MP Attention Centre</h2>
        <span className="text-[10px] font-extrabold bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-full px-2.5 py-0.5 shadow-sm shadow-red-500/40 animate-pulse">
          {attentionCentreNewCount} New
        </span>
      </div>

      <ul className="space-y-1.5 mb-4">
        {attentionCentreItems.map((item, idx) => {
          const config = attentionItemIcons[idx % attentionItemIcons.length];
          const Icon = config.Icon;
          return (
            <li key={item.id}>
              <Link
                href="/mp-attention-centre"
                className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-all text-left group"
              >
                <span
                  className={classNames(
                    "w-7 h-7 rounded-lg flex items-center justify-center shrink-0 shadow-inner",
                    config.bg
                  )}
                >
                  <Icon size={14} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[12px] font-semibold text-slate-100 group-hover:text-white truncate">
                    {item.title}
                  </span>
                  {item.detail ? (
                    <span className="block text-[10px] text-slate-400 truncate">{item.detail}</span>
                  ) : null}
                </span>
                <ChevronRight size={14} className="text-slate-400 shrink-0 group-hover:translate-x-0.5 group-hover:text-white transition-all" />
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href="/mp-attention-centre"
        className="w-full inline-flex items-center justify-center gap-2 text-[12px] font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl py-2.5 shadow-md shadow-blue-600/30 transition-all active:scale-98"
      >
        View Detailed Analysis <ArrowRight size={14} />
      </Link>
    </section>
  );
}
