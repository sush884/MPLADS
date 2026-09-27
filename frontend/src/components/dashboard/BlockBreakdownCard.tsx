import Link from "next/link";
import { blockBreakdown, statusDistribution } from "@/lib/mockData";

export function BlockBreakdownCard() {
  const segments = [
    { key: "completed", color: "#22c55e", label: "Completed" },
    { key: "inProgress", color: "#3b82f6", label: "In Progress" },
    { key: "delayed", color: "#ef4444", label: "Delayed" },
    { key: "notStarted", color: "#f59e0b", label: "Not Started" }
  ] as const;

  return (
    <section className="card p-4 sm:p-5 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-0.5">
          <h2 className="text-[14px] font-extrabold text-slate-800 tracking-tight">Projects by Block</h2>
          <Link href="/projects" className="link-muted">
            View All →
          </Link>
        </div>
        <p className="text-[11.5px] text-slate-400 font-medium mb-3">
          Distribution across constituency blocks
        </p>

        <ul className="space-y-2.5">
          {blockBreakdown.map((row) => (
            <li key={row.block}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-bold text-slate-700">{row.block}</span>
                <span className="text-[11.5px] font-extrabold text-slate-600">{row.total}</span>
              </div>
              <div className="flex h-2.5 rounded-full overflow-hidden bg-slate-100 shadow-inner">
                {segments.map((segment) => {
                  const value = row[segment.key];
                  const widthPct = (value / row.total) * 100;
                  return (
                    <div
                      key={segment.key}
                      style={{ width: `${widthPct}%`, backgroundColor: segment.color }}
                      title={`${row.block}: ${value} ${segment.label}`}
                    />
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-slate-100">
        {statusDistribution.map((status) => (
          <span key={status.label} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
            <span
              className="w-2.5 h-2.5 rounded-full shadow-2xs"
              style={{ backgroundColor: status.color }}
            />
            {status.label}
          </span>
        ))}
      </div>
    </section>
  );
}
