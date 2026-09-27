import Link from "next/link";
import { Landmark, HardHat, Home, Droplets, GraduationCap, Building2, type LucideIcon } from "lucide-react";
import { classNames } from "@/lib/format";
import { topAgencies } from "@/lib/mockData";

const agencyIcons: Record<string, LucideIcon> = {
  "Rural Development Dept.": Home,
  "Public Works Dept.": HardHat,
  "Zila Panchayat": Landmark,
  "Water Resources Dept.": Droplets,
  "Education Dept.": GraduationCap
};

function scoreStyles(score: number): { bg: string; text: string; border: string } {
  if (score >= 80) return { bg: "bg-emerald-100", text: "text-emerald-800", border: "border-emerald-200" };
  if (score >= 65) return { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-200" };
  if (score >= 55) return { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-200" };
  return { bg: "bg-red-100", text: "text-red-800", border: "border-red-200" };
}

export function TopAgenciesCard() {
  return (
    <section className="card p-4 sm:p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[14px] font-extrabold text-slate-800 tracking-tight">
          Top Agencies by Performance
        </h2>
        <Link href="/agency-performance" className="link-muted">
          View All →
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[11.5px]">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-100">
              <th className="font-semibold pb-2 pr-2">Agency</th>
              <th className="font-semibold pb-2 px-2 text-right">Projects</th>
              <th className="font-semibold pb-2 px-2 text-right">Completion Rate</th>
              <th className="font-semibold pb-2 px-2 text-right">Avg. Delay</th>
              <th className="font-semibold pb-2 pl-2 text-right">Score</th>
            </tr>
          </thead>
          <tbody>
            {topAgencies.map((agency) => {
              const Icon = agencyIcons[agency.name] || Building2;
              const scoreStyle = scoreStyles(agency.score);
              return (
                <tr
                  key={agency.name}
                  className="border-b border-slate-50 last:border-0 hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-2.5 pr-2 font-bold text-slate-800 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        <Icon size={13} />
                      </div>
                      <span className="truncate">{agency.name}</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-2 text-slate-600 text-right font-medium">{agency.projects}</td>
                  <td className="py-2.5 px-2 text-slate-600 text-right font-semibold">{agency.completionRatePct}%</td>
                  <td className="py-2.5 px-2 text-slate-600 text-right whitespace-nowrap font-medium">
                    {agency.avgDelayDays} days
                  </td>
                  <td className="py-2.5 pl-2 text-right">
                    <span
                      className={classNames(
                        "inline-block rounded-lg px-2.5 py-0.5 font-extrabold text-[11px] border shadow-2xs",
                        scoreStyle.bg,
                        scoreStyle.text,
                        scoreStyle.border
                      )}
                    >
                      {agency.score}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
