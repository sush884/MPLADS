"use client";

import { AppShell } from "@/components/layout/AppShell";
import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { KpiTile } from "@/components/dashboard/KpiTile";
import { ProjectDistributionCard } from "@/components/dashboard/ProjectDistributionCard";
import { BlockBreakdownCard } from "@/components/dashboard/BlockBreakdownCard";
import { FundUtilizationTrendCard } from "@/components/dashboard/FundUtilizationTrendCard";
import { TopAgenciesCard } from "@/components/dashboard/TopAgenciesCard";
import { PriorityQueueCard } from "@/components/dashboard/PriorityQueueCard";
import { AttentionCentreCard } from "@/components/dashboard/AttentionCentreCard";
import { BetterMonitoringBadge } from "@/components/dashboard/BetterMonitoringBadge";
import { AiInsightCard } from "@/components/dashboard/AiInsightCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import {
  currentUser,
  dashboardKpis
} from "@/lib/mockData";

export default function DashboardPage() {
  return (
    <AppShell>
      {/* 1. Welcome & 3D Island Hero Banner */}
      <WelcomeBanner userName={currentUser.name} role={currentUser.role} />

      {/* 2. 5 3D KPI Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3.5 mb-5">
        <KpiTile
          stat3d="folder"
          tint="blue"
          label="Total Projects"
          value={String(dashboardKpis.totalProjects.value)}
          deltaPct={dashboardKpis.totalProjects.deltaPct}
          tone="positive"
        />
        <KpiTile
          stat3d="completed"
          tint="green"
          label="Completed"
          value={String(dashboardKpis.completed.value)}
          deltaPct={dashboardKpis.completed.deltaPct}
          tone="positive"
        />
        <KpiTile
          stat3d="delayed"
          tint="red"
          label="Delayed"
          value={String(dashboardKpis.delayed.value)}
          deltaPct={dashboardKpis.delayed.deltaPct}
          tone="positive"
        />
        <KpiTile
          stat3d="attention"
          tint="amber"
          label="Needs Attention"
          value={String(dashboardKpis.needsAttention.value)}
          deltaPct={dashboardKpis.needsAttention.deltaPct}
          tone="positive"
        />
        <KpiTile
          stat3d="allocated"
          tint="purple"
          label="Total Allocated"
          value={`₹ ${dashboardKpis.totalAllocatedCr} C`}
        >
          <div className="mt-1.5">
            <div className="flex items-center justify-between text-[10.5px] mb-1 font-bold">
              <span className="text-emerald-700">Utilized: {dashboardKpis.utilizedPct}%</span>
            </div>
            <ProgressBar value={dashboardKpis.utilizedPct} color="bg-gradient-to-r from-emerald-500 to-teal-500" height={6} />
          </div>
        </KpiTile>
      </div>

      {/* 3. Main Analytics & Priority Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr_330px] gap-4 items-start mb-5">
        {/* Row 1 Left: Project Distribution (Status) */}
        <ProjectDistributionCard />

        {/* Row 1 Center: Projects by Block */}
        <BlockBreakdownCard />

        {/* Right Rail (Spans both rows): AI Priority Queue + Attention Centre + Better Monitoring Badge */}
        <div className="space-y-4 xl:row-span-2">
          <PriorityQueueCard />
          <AttentionCentreCard />
          <BetterMonitoringBadge />
        </div>

        {/* Row 2 Left: Fund Utilization Trend */}
        <FundUtilizationTrendCard />

        {/* Row 2 Center: Top Agencies by Performance */}
        <TopAgenciesCard />

        {/* Full width AI Insight Banner */}
        <div className="xl:col-span-2">
          <AiInsightCard />
        </div>
      </div>
    </AppShell>
  );
}
