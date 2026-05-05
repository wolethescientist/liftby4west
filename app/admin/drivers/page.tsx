"use client";

import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { adminDrivers, AdminDriverRow } from "@/lib/mockData";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { UserCircle2, Star, Car } from "lucide-react";

export default function AdminDriversPage() {
  const [drivers, setDrivers] = useState<AdminDriverRow[]>(adminDrivers);

  const toggleStatus = (id: string) => {
    setDrivers((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: d.status === "Active" ? "Suspended" : "Active" } : d,
      ),
    );
  };

  return (
    <PageTransition>
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
          Admin Portal
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-navy">Drivers</h1>
      </div>

      <Card className="mt-8 !p-0" glass>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead className="bg-subtle/50 text-left text-xs font-bold uppercase tracking-[0.14em] text-neutral-500">
              <tr>
                <th className="px-6 py-4">Driver</th>
                <th className="px-6 py-4">Vehicle</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Completed</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {drivers.map((driver) => (
                <tr key={driver.id} className="transition-colors hover:bg-subtle/40">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/5 text-navy">
                        <UserCircle2 className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-navy">{driver.name}</p>
                        <p className="font-mono text-[10px] text-neutral-400">{driver.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-neutral-600 font-medium">
                      <Car className="h-4 w-4 text-neutral-400" />
                      {driver.vehicle}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={driver.status === "Active" ? "success" : "destructive"}>
                      {driver.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 font-bold text-navy">{driver.jobsCompleted}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 font-bold text-navy">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      {driver.rating.toFixed(1)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant={driver.status === "Active" ? "outline" : "primary"}
                      size="sm"
                      onClick={() => toggleStatus(driver.id)}
                      className={driver.status === "Active" ? "text-destructive hover:border-destructive hover:bg-destructive/5" : ""}
                    >
                      {driver.status === "Active" ? "Suspend" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageTransition>
  );
}
