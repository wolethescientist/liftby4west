"use client";

import dynamic from "next/dynamic";
import { RelayStage } from "@/lib/types";

// Dynamically import the map component with SSR disabled
// because leaflet relies on the window object
const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full rounded-2xl border border-border/50 bg-white/50 flex items-center justify-center text-neutral-400 font-medium">
      Loading map...
    </div>
  ),
});

export function Map({ currentStage }: { currentStage: RelayStage }) {
  return <MapComponent currentStage={currentStage} />;
}
