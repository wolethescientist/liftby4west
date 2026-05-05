"use client";

import { Briefcase, TrendingUp, Wallet, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { PageTransition } from "@/components/PageTransition";
import { driverEarnings, recentDriverJobs } from "@/lib/mockData";

const stats = [
  { label: "Today", value: driverEarnings.today, icon: Wallet, trend: "+12%" },
  { label: "This Week", value: driverEarnings.week, icon: TrendingUp, trend: "+8%" },
  { label: "This Month", value: driverEarnings.month, icon: Briefcase, trend: "+24%" },
];

export default function LogisticsEarningsPage() {
  return (
    <PageTransition>
      <div className="space-y-8 pb-12">
        <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-success/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
              Logistics Portal
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-white">Earnings</h1>
            <p className="mt-3 max-w-sm text-sm font-medium text-white/80 leading-relaxed">
              Track your daily, weekly, and monthly payouts.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="!p-6 text-left hover:shadow-lg transition-all transform hover:-translate-y-1 bg-white/60 backdrop-blur-xl border-border/40" glass>
                <div className="flex justify-between items-start mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm text-navy">
                    <Icon className="h-6 w-6" />
                  </div>
                  <Badge className="bg-success/10 text-success-700 border-none font-bold">
                    <ArrowUpRight className="h-3 w-3 mr-1 inline" />
                    {stat.trend}
                  </Badge>
                </div>
                <p className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-1">
                  {stat.label}
                </p>
                <p className="text-3xl font-black tracking-tight text-navy">{stat.value}</p>
              </Card>
            );
          })}
        </div>

        <Card glass className="p-8 backdrop-blur-xl bg-white/60 border-border/40 shadow-glass rounded-3xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-success/10 text-success-700">
                <Briefcase className="h-7 w-7" />
              </div>
              <div>
                <p className="text-lg font-black text-navy">Jobs this month</p>
                <p className="text-sm font-medium text-neutral-500">You&apos;re on track to beat last month!</p>
              </div>
            </div>
            <Badge className="px-4 py-2 bg-navy text-white text-base font-bold shadow-md rounded-xl">
              {driverEarnings.jobsThisMonth} completed
            </Badge>
          </div>
        </Card>

        <div>
          <h2 className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-6 pl-2">Recent jobs</h2>
          <div className="space-y-4">
            {recentDriverJobs.map((job) => (
              <Card key={job.id} className="!p-6 transition-all hover:-translate-y-1 hover:shadow-md group bg-white/60 backdrop-blur-xl border-border/40 rounded-2xl" glass>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className="font-mono text-sm font-bold bg-navy/5 text-navy border-none px-3 py-1">
                        {job.id}
                      </Badge>
                      <span className="text-xs font-bold uppercase tracking-widest text-neutral-400">{job.date}</span>
                    </div>
                    <p className="text-base font-bold text-navy group-hover:text-info transition-colors leading-relaxed">{job.route}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <p className="text-2xl font-black text-success-700">{job.payout}</p>
                    <Badge className={
                      job.status === "Completed" 
                        ? "bg-success/10 text-success-700 border-none font-bold" 
                        : "bg-destructive/10 text-destructive border-none font-bold"
                    }>
                      {job.status}
                    </Badge>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
