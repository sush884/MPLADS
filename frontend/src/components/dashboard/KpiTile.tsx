import { ArrowUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { classNames } from "@/lib/format";
import { Stat3DIcon, type StatIconType } from "@/components/3d/Stat3DIcon";

type Tint = "blue" | "green" | "red" | "amber" | "plain" | "purple";

const tintStyles: Record<Tint, { card: string; deltaBg: string; textHighlight: string }> = {
  blue: {
    card: "bg-gradient-to-br from-blue-50/90 via-sky-50/40 to-white border-blue-200/70 hover:border-blue-300",
    deltaBg: "bg-emerald-50 text-emerald-700",
    textHighlight: "text-blue-700"
  },
  green: {
    card: "bg-gradient-to-br from-emerald-50/90 via-teal-50/40 to-white border-emerald-200/70 hover:border-emerald-300",
    deltaBg: "bg-emerald-50 text-emerald-700",
    textHighlight: "text-emerald-700"
  },
  red: {
    card: "bg-gradient-to-br from-red-50/90 via-rose-50/40 to-white border-red-200/70 hover:border-red-300",
    deltaBg: "bg-emerald-50 text-emerald-700",
    textHighlight: "text-red-700"
  },
  amber: {
    card: "bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-white border-amber-200/70 hover:border-amber-300",
    deltaBg: "bg-emerald-50 text-emerald-700",
    textHighlight: "text-amber-700"
  },
  purple: {
    card: "bg-gradient-to-br from-indigo-50/90 via-purple-50/40 to-white border-indigo-200/70 hover:border-indigo-300",
    deltaBg: "bg-indigo-50 text-indigo-700",
    textHighlight: "text-indigo-700"
  },
  plain: {
    card: "bg-white border-slate-200 hover:border-slate-300",
    deltaBg: "bg-slate-50 text-slate-700",
    textHighlight: "text-slate-900"
  }
};

const deltaTone = {
  positive: "text-emerald-600 font-bold",
  negative: "text-red-600 font-bold",
  warning: "text-amber-600 font-bold"
} as const;

interface KpiTileProps {
  icon?: LucideIcon;
  stat3d?: StatIconType;
  tint: Tint;
  label: string;
  value: string;
  deltaPct?: number;
  tone?: keyof typeof deltaTone;
  children?: React.ReactNode;
}

export function KpiTile({
  icon: Icon,
  stat3d,
  tint,
  label,
  value,
  deltaPct,
  tone = "positive",
  children
}: KpiTileProps) {
  const styles = tintStyles[tint] || tintStyles.plain;

  return (
    <div
      className={classNames(
        "rounded-2xl border p-4 flex items-center justify-between gap-3 shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
        styles.card
      )}
    >
      <div className="min-w-0 flex-1">
        <p className="text-[11.5px] font-semibold text-slate-500 truncate tracking-tight">{label}</p>
        <p className="text-[24px] font-extrabold text-slate-900 leading-tight mt-0.5 tracking-tight">{value}</p>

        {deltaPct !== undefined ? (
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className={classNames("inline-flex items-center gap-0.5 text-[11px]", deltaTone[tone])}>
              <ArrowUp size={11} strokeWidth={3} />
              {deltaPct}%
            </span>
            <span className="text-[11px] text-slate-400 font-medium">vs. last year</span>
          </div>
        ) : null}

        {children}
      </div>

      {/* 3D Icon or Fallback Icon */}
      <div className="shrink-0 flex items-center justify-center">
        {stat3d ? (
          <Stat3DIcon type={stat3d} size={54} />
        ) : Icon ? (
          <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center">
            <Icon size={22} className="text-blue-600" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
