"use client";

import { useStore } from "@/lib/store";
import { relayStages, relayStageLabels } from "@/lib/mockData";
import { PageTransition } from "@/components/PageTransition";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Circle, Clock, Radio, Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { clsx } from "clsx";

export default function RelayMonitorPage() {
  const { currentStage, advanceStage, resetDemo } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentStageIndex = relayStages.indexOf(currentStage);

  // Hydration skeleton
  if (!mounted) {
    return (
      <div className="space-y-8 pb-12">
        <div className="h-40 w-full animate-pulse rounded-3xl bg-white/40" />
        <Card className="h-96 animate-pulse bg-white/40" />
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-8 pb-12">
        <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-info/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
              Admin Portal
            </p>
            <div className="flex items-center gap-3 mt-2">
              <h1 className="text-4xl font-black tracking-tight text-white">Live Relay Monitor</h1>
              <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                </span>
                <span className="font-mono text-xs font-bold tracking-wider text-white">BK-00123</span>
              </div>
            </div>
            <p className="mt-3 max-w-md text-sm font-medium text-white/80 leading-relaxed">
              Track the exact location and status of this booking through the Liftby4west network.
            </p>
          </div>
        </div>

        <Card glass className="p-8 backdrop-blur-xl bg-white/60 border-border/40 shadow-glass rounded-3xl">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="relative space-y-8 before:absolute before:inset-y-4 before:left-6 before:w-0.5 before:-translate-x-1/2 before:bg-border/60">
                {relayStages.map((stage, index) => {
                  const isCompleted = index < currentStageIndex;
                  const isCurrent = index === currentStageIndex;
                  
                  return (
                    <div key={stage} className="relative flex items-center gap-6 group">
                      <div className="absolute left-6 -translate-x-1/2 bg-white rounded-full transition-transform duration-300 group-hover:scale-110">
                        {isCompleted ? (
                          <div className="relative">
                            <CheckCircle2 className="h-10 w-10 text-success shadow-md rounded-full bg-white relative z-10" />
                            <div className="absolute inset-0 bg-success/20 rounded-full blur-md" />
                          </div>
                        ) : isCurrent ? (
                          <div className="relative flex h-10 w-10 items-center justify-center bg-white rounded-full shadow-lg">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-info opacity-40" />
                            <Radio className="h-5 w-5 text-info animate-pulse" />
                            <div className="absolute inset-0 rounded-full border-[3px] border-info" />
                          </div>
                        ) : (
                          <Circle className="h-10 w-10 text-neutral-200 fill-neutral-50/50" />
                        )}
                      </div>
                      <div className="ml-16 flex-1 bg-white/50 p-4 rounded-2xl border border-white/20 shadow-sm backdrop-blur-sm transition-all group-hover:bg-white/80 group-hover:shadow-md">
                        <p
                          className={clsx(
                            "text-lg font-black transition-colors duration-300",
                            isCompleted ? "text-navy/60" : isCurrent ? "text-navy" : "text-neutral-400"
                          )}
                        >
                          {relayStageLabels[stage]}
                        </p>
                        {isCompleted && (
                          <p className="mt-1.5 flex items-center text-xs font-bold text-neutral-500">
                            <Clock className="mr-1.5 h-3.5 w-3.5 text-neutral-400" />
                            {new Date(Date.now() - (currentStageIndex - index) * 600000).toLocaleTimeString(
                              "en-NG",
                              { hour: "2-digit", minute: "2-digit" },
                            )}
                          </p>
                        )}
                        {isCurrent && (
                          <div className="mt-3 flex items-center gap-2">
                            <Badge className="bg-info/10 text-info font-bold border-none">In Progress</Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex w-full flex-col gap-6 rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl p-8 shadow-glass lg:w-96 sticky top-24">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy text-white shadow-md">
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-black text-navy text-lg">Demo Controls</h3>
                  <p className="mt-0.5 text-xs font-medium text-neutral-500">
                    Simulate real-time tracking
                  </p>
                </div>
              </div>
              
              <div className="h-px w-full bg-border/50" />
              
              <Button
                size="lg"
                className="w-full h-14 rounded-2xl text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                onClick={advanceStage}
                disabled={currentStageIndex === relayStages.length - 1}
              >
                Mark Next Stage Complete
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full h-14 rounded-2xl text-base border-destructive/30 text-destructive hover:bg-destructive hover:text-white transition-all shadow-sm hover:shadow-md" 
                onClick={resetDemo}
              >
                Reset Demo Simulation
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
