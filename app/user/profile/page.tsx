"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useStore } from "@/lib/store";

export default function ProfilePage() {
  const { booking } = useStore();
  const initials = booking.user.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="space-y-5">
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-navy text-xl font-black text-white">
            {initials}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-black text-text">{booking.user.name}</h1>
            <p className="mt-1 text-sm text-neutral-600">adaeze@liftby4west.com</p>
            <p className="text-sm text-neutral-600">{booking.user.phone}</p>
          </div>
        </div>
        <Badge className="mt-5" tone={booking.payment.type === "subscription" ? "success" : "navy"}>
          {booking.payment.type === "subscription" ? "Subscriber" : "One-off"}
        </Badge>
      </Card>

      <Card>
        <h2 className="text-sm font-bold uppercase tracking-wide text-navy">Past bookings</h2>
        <div className="mt-4 rounded-md border border-border bg-subtle p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-sm font-black">L4W-LOSABV-2049</p>
              <p className="mt-2 text-sm text-neutral-600">LOS to ABV, 2 bags</p>
            </div>
            <Badge tone="success">Completed</Badge>
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Delivered to Maitama Close
          </p>
        </div>
      </Card>

      <Button href="/" fullWidth variant="secondary" size="lg">
        Return to Home
      </Button>
    </div>
  );
}
