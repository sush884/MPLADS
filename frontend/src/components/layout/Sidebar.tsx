"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Layers,
  AlertTriangle,
  MapPin,
  BarChart3,
  Landmark,
  FolderClock,
  FileBarChart2,
  BellRing,
  MessageSquareText,
  Settings,
  X,
  Sparkles,
  Link2,
  type LucideIcon
} from "lucide-react";
import { classNames } from "@/lib/format";
import { priorityQueueCount } from "@/lib/mockData";
import { Emblem } from "./Emblem";
import { ParliamentSidebarWidget } from "@/components/3d/ParliamentSidebarWidget";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

const navItems: NavItem[] = [
  { href: "/demo", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workspace", label: "Connected Workspace", icon: Link2 },
  { href: "/projects", label: "Projects", icon: Layers },
  { href: "/priority-queue", label: "AI Priority Queue", icon: AlertTriangle, badge: priorityQueueCount },
  { href: "/map", label: "Map View", icon: MapPin },
  { href: "/agency-performance", label: "Agency Performance", icon: BarChart3 },
  { href: "/constituency-insights", label: "Constituency Insights", icon: Landmark },
  { href: "/inspection-dossiers", label: "Inspection Dossiers", icon: FolderClock },
  { href: "/reports", label: "Reports", icon: FileBarChart2 },
  { href: "/mp-attention-centre", label: "MP Attention Centre", icon: BellRing },
  { href: "/feedback", label: "Feedback", icon: MessageSquareText }
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full justify-between">
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href === "/demo" && pathname === "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={classNames(
                "group flex items-center justify-between gap-2.5 rounded-xl px-3.5 py-2.5 text-[12.5px] transition-all duration-200",
                active
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold shadow-md shadow-blue-600/30 scale-[1.01]"
                  : "text-slate-300 hover:bg-white/10 hover:text-white font-medium"
              )}
            >
              <span className="flex items-center gap-3 min-w-0">
                <Icon
                  size={17}
                  className={classNames(
                    "shrink-0 transition-transform group-hover:scale-110",
                    active ? "text-white" : "text-blue-300/70 group-hover:text-blue-200"
                  )}
                />
                <span className="truncate">{item.label}</span>
              </span>
              {item.badge ? (
                <span className="text-[10px] font-extrabold bg-red-500 text-white rounded-full min-w-[19px] h-[19px] px-1.5 flex items-center justify-center shrink-0 shadow-sm shadow-red-500/50">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}

        <div className="pt-1">
          <Link
            href="/settings"
            onClick={onNavigate}
            aria-current={pathname === "/settings" ? "page" : undefined}
            className={classNames(
              "group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-[12.5px] transition-all duration-200",
              pathname === "/settings"
                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold shadow-md shadow-blue-600/30"
                : "text-slate-300 hover:bg-white/10 hover:text-white font-medium"
            )}
          >
            <Settings size={17} className="shrink-0 text-blue-300/70 group-hover:text-blue-200" />
            <span className="truncate">Settings</span>
          </Link>
        </div>
      </nav>

      {/* 3D Parliament Card at the bottom of the sidebar */}
      <div className="p-3 pt-0">
        <ParliamentSidebarWidget />
      </div>
    </div>
  );
}

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  return (
    <>
      {/* Desktop: fixed sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:fixed lg:top-[60px] lg:bottom-0 lg:w-64 bg-gradient-to-b from-navy-950 via-[#0a1b3d] to-navy-950 border-r border-white/10 text-slate-300 z-30 shadow-2xl">
        <SidebarNav />
      </aside>

      {/* Mobile: backdrop + slide-in drawer */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={classNames(
          "fixed inset-0 z-40 bg-navy-950/80 backdrop-blur-sm lg:hidden transition-opacity duration-200",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={classNames(
          "fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-navy-950 border-r border-white/10 text-slate-300 flex flex-col lg:hidden shadow-2xl",
          "transform transition-transform duration-200 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="h-[60px] shrink-0 flex items-center justify-between px-4 border-b border-white/10 bg-navy-950">
          <div className="flex items-center gap-2">
            <Emblem size={26} />
            <span className="text-sm font-extrabold text-white tracking-tight">MPLADS AI</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <SidebarNav onNavigate={onClose} />
        </div>
      </aside>
    </>
  );
}
