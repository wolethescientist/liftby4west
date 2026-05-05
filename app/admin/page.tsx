"use client";

import { BookOpen, Briefcase, TrendingUp, Users } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PageTransition } from "@/components/PageTransition";
import { adminBookings, adminStats, relayStageLabels } from "@/lib/mockData";
import { useStore } from "@/lib/store";
import { getRelayStageBadgeVariant } from "@/components/ui/Badge";
import { useEffect, useState } from "react";

const stats = [
  { label: "Total Bookings", value: adminStats.totalBookings, icon: BookOpen },
  { label: "Active Jobs", value: String(adminStats.activeJobs), icon: Briefcase },
  { label: "Registered Drivers", value: String(adminStats.registeredDrivers), icon: Users },
  { label: "Revenue This Month", value: adminStats.monthRevenue, icon: TrendingUp },
];

export default function AdminDashboardPage() {
  const { currentStage } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const liveRows = adminBookings.map((row, index) =>
    index === 0 ? { ...row, stage: currentStage } : row,
  );

  if (!mounted) {
    return (
      <div className="space-y-8 pb-12">
        <div className="h-40 w-full animate-pulse rounded-3xl bg-white/40" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="h-32 animate-pulse bg-white/40" />
          ))}
        </div>
        <Card className="h-96 animate-pulse bg-white/40" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-8 pb-12">
        <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-warning/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
              Admin Portal
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-white">Dashboard</h1>
            <p className="mt-3 max-w-sm text-sm font-medium text-white/80 leading-relaxed">
              Real-time overview of Liftby4west logistics and operations.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} glass className="group !p-6 hover:shadow-lg transition-all transform hover:-translate-y-1 bg-white/60 backdrop-blur-xl border-border/40">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm text-navy transition-colors group-hover:bg-navy group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
                <p className="mt-5 text-xs font-black uppercase tracking-widest text-neutral-500">
                  {stat.label}
                </p>
                <p className="mt-1 text-3xl font-black tracking-tight text-navy">{stat.value}</p>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 !p-0 overflow-hidden shadow-glass border-border/40 bg-white/60 backdrop-blur-xl rounded-3xl" glass>
          <div className="flex items-center justify-between border-b border-border/40 bg-white/40 px-8 py-6">
            <div>
              <h2 className="text-xl font-black text-navy">Live Jobs</h2>
              <p className="mt-1 text-sm font-medium text-neutral-500">
                Stage updates reflect in real time across all portals
              </p>
            </div>
            <Badge variant="success" className="animate-pulse shadow-sm px-4 py-2">
              <span className="mr-2 inline-block h-2 w-2 rounded-full bg-success-700 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              Live Updates
            </Badge>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm text-left">
              <thead className="bg-white/40 text-xs font-black uppercase tracking-widest text-neutral-500 border-b border-border/40">
                <tr>
                  <th className="px-8 py-5">Booking ID</th>
                  <th className="px-8 py-5">User</th>
                  <th className="px-8 py-5">Flight</th>
                  <th className="px-8 py-5">Driver</th>
                  <th className="px-8 py-5">Stage</th>
                  <th className="px-8 py-5">Tracking ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {liveRows.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-white/50 group">
                    <td className="px-8 py-5">
                      <Badge className="font-mono text-xs font-bold bg-navy/5 text-navy border-none px-3 py-1">
                        {row.id}
                      </Badge>
                    </td>
                    <td className="px-8 py-5 font-bold text-navy">{row.user}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-navy">{row.flight}</span>
                        <span className="text-neutral-500 font-medium text-xs hidden lg:inline">· {row.route}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 font-medium text-neutral-600">{row.driver}</td>
                    <td className="px-8 py-5">
                      <Badge variant={getRelayStageBadgeVariant(row.stage)} className="shadow-sm">
                        {relayStageLabels[row.stage]}
                      </Badge>
                    </td>
                    <td className="px-8 py-5 font-mono text-xs font-medium text-neutral-400 group-hover:text-navy transition-colors">{row.trackingId}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
