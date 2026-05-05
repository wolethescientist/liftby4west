"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, RotateCcw, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { relayStageLabels } from "@/lib/mockData";
import { useStore } from "@/lib/store";

export function DemoControls() {
  const pathname = usePathname();
  const { currentStage, advanceStage, resetDemo } = useStore();
  const [open, setOpen] = useState(false);

  if (pathname === "/") {
    return null;
  }

  return (
    <div className="fixed bottom-24 right-4 z-[60] md:bottom-6">
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="w-72 rounded-2xl border border-navy/20 bg-white p-4 shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-navy text-white">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">
                  Demo
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Collapse demo controls"
                className="flex h-7 w-7 items-center justify-center rounded-md text-neutral-500 hover:bg-subtle"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-3 rounded-md border border-border bg-subtle px-3 py-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-500">
                Current Stage
              </p>
              <p className="mt-1 text-sm font-bold text-navy">{relayStageLabels[currentStage]}</p>
            </div>

            <div className="mt-3 grid grid-cols-[1fr_auto] gap-2">
              <button
                type="button"
                onClick={advanceStage}
                className="h-10 rounded-md border border-navy bg-navy text-sm font-semibold text-white transition hover:bg-[#111122]"
              >
                Next Stage →
              </button>
              <button
                type="button"
                onClick={resetDemo}
                aria-label="Reset demo"
                className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-neutral-600 transition hover:border-destructive hover:text-destructive"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="pill"
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(true)}
            className="flex h-10 items-center gap-2 rounded-full border border-navy/20 bg-navy px-4 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-lg transition hover:bg-[#111122]"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Demo
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
