"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { RelayChain } from "@/components/ui/RelayChain";
import { relayStages } from "@/lib/mockData";
import { useStore } from "@/lib/store";
import { RelayStage } from "@/lib/types";

import { Map } from "@/components/ui/Map";

function hasReached(currentStage: RelayStage, stage: RelayStage) {
  return relayStages.indexOf(currentStage) >= relayStages.indexOf(stage);
}

export default function TrackPage() {
  const { booking, driver, currentStage } = useStore();
  const [revealed, setRevealed] = useState(false);
  const driverAssigned = hasReached(currentStage, RelayStage.driver_assigned);
  const delivered = currentStage === RelayStage.delivered;

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
          Active Tracking
        </p>
        <h1 className="mt-2 font-mono text-3xl font-black text-text">{booking.id}</h1>
        <p className="mt-1 font-mono text-sm text-neutral-500">{booking.trackingId}</p>
      </div>

      <div className="w-full">
        <Map currentStage={currentStage} />
      </div>

      {delivered ? (
        <div className="rounded-md border border-success/20 bg-success/10 px-4 py-3 text-sm font-bold text-success">
          Your bags have arrived!
        </div>
      ) : null}

      {driverAssigned ? (
        <Card>
          <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">Driver</p>
          <div className="mt-3 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-text">{driver.name}</h2>
              <p className="mt-1 text-sm text-neutral-600">{driver.vehicle}</p>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-border px-3 py-1 text-sm font-bold text-navy">
              <Star className="h-4 w-4 fill-current" />
              {driver.rating}
            </div>
          </div>
        </Card>
      ) : null}

      <Card header="RelayChain">
        <RelayChain currentStage={currentStage} />
      </Card>

      <Card>
        <p className="text-xs font-bold uppercase tracking-wide text-neutral-500">
          Your Handoff Code
        </p>
        <div className="mt-4 grid grid-cols-4 gap-3">
          {(revealed ? booking.verificationCode : "••••").split("").map((digit, index) => (
            <div
              key={`${digit}-${index}`}
              className="flex aspect-square items-center justify-center rounded-md border border-border bg-subtle font-mono text-3xl font-black text-navy"
            >
              {digit}
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setRevealed((current) => !current)}
          className="mt-4 text-sm font-bold text-navy underline-offset-4 hover:underline"
        >
          Tap to reveal
        </button>
      </Card>

      <Card>
        <h2 className="text-sm font-bold uppercase tracking-wide text-navy">Luggage</h2>
        <div className="mt-4 space-y-3">
          {booking.luggage.map((bag) => (
            <div
              key={bag.id}
              className="flex items-center justify-between rounded-md border border-border bg-subtle px-3 py-3"
            >
              <span className="text-sm font-semibold">{bag.label}</span>
              <Badge className="capitalize">{bag.size}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
