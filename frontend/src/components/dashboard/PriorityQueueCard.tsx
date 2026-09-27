import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { classNames } from "@/lib/format";
import { dashboardPriorityQueue, type QueueSeverity } from "@/lib/mockData";

const severityStyles: Record<QueueSeverity, { bg: string; text: string; border: string }> = {
  CRITICAL: { bg: "bg-red-100", text: "text-red-700", border: "border-red-200" },
  HIGH: { bg: "bg-orange-100", text: "text-orange-700", border: "border-orange-200" },
  MEDIUM: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" },
  LOW: { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200" }
};

export function PriorityQueueCard() {
  return (
    <section className="card p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5">
          <span className="w-5 h-5 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
            ₹
          </span>
          <h2 className="text-[14px] font-extrabold text-slate-800 tracking-tight">AI Priority Queue</h2>
        </div>
        <Link href="/priority-queue" className="link-muted">
          View All →
        </Link>
      </div>

      <ul className="divide-y divide-slate-100">
        {dashboardPriorityQueue.map((item) => {
          const style = severityStyles[item.severity];
          return (
            <li key={item.id}>
              <Link
                href={`/projects/${item.id}`}
                className="flex items-center gap-3 py-3 group -mx-1 px-1.5 rounded-xl hover:bg-slate-50/80 transition-colors"
              >
                <div
                  className={classNames(
                    "w-[66px] shrink-0 rounded-xl py-1.5 px-1 text-center border shadow-2xs",
                    style.bg,
                    style.border
                  )}
                >
                  <p className={classNames("text-[8.5px] font-black tracking-wider uppercase leading-none", style.text)}>
                    {item.severity}
                  </p>
                  <p className={classNames("text-[11px] font-extrabold leading-none mt-1", style.text)}>
                    {item.healthScore}/100
                  </p>
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                    {item.name}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">{item.location}</p>
                  <p className="text-[10px] font-medium text-slate-400 truncate mt-0.5">{item.reason}</p>
                </div>

                <ChevronRight
                  size={15}
                  className="text-slate-300 shrink-0 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
