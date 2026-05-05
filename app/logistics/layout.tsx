"use client";

import { Briefcase, ShieldCheck, Wallet } from "lucide-react";
import { Sidebar } from "@/components/ui/Sidebar";
import { useStore } from "@/lib/store";

const navItems = [
  { href: "/logistics", label: "Jobs", icon: Briefcase },
  { href: "/logistics/verify", label: "Verify", icon: ShieldCheck },
  { href: "/logistics/earnings", label: "Earnings", icon: Wallet },
];

export default function LogisticsLayout({ children }: { children: React.ReactNode }) {
  const { driver } = useStore();

  return (
    <div className="min-h-screen bg-subtle">
      <Sidebar items={navItems} title="Liftby4west" subtitle={`Logistics - ${driver.name}`} />
      <main className="px-5 py-6 pt-16 md:ml-64 md:px-10 md:pt-10">
        <div className="mx-auto max-w-6xl pb-24">{children}</div>
      </main>
    </div>
  );
}
