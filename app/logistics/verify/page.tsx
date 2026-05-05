"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, KeyRound } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageTransition } from "@/components/PageTransition";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { RelayStage } from "@/lib/types";
import { clsx } from "clsx";

const CORRECT_CODE = "7842";

function getStageContent(stage: RelayStage, userName: string) {
  switch (stage) {
    case RelayStage.driver_assigned:
      return {
        title: "Verify Pickup",
        desc: "Verify the passenger's handover code before collecting their luggage.",
        toastTitle: "Pickup verified!",
        toastMsg: "You can now head to the airport.",
      };
    case RelayStage.airport_handoff:
      return {
        title: "Verify In Flight",
        desc: "Verify the code to confirm the bags are in flight.",
        toastTitle: "In Flight verified!",
        toastMsg: "Bags are now confirmed in flight.",
      };
    case RelayStage.in_flight:
      return {
        title: "Verify Destination",
        desc: "Verify the code to confirm bags arrived at destination.",
        toastTitle: "Destination verified!",
        toastMsg: "Bags received at destination airport.",
      };
    case RelayStage.destination_received:
      return {
        title: "Verify Out For Delivery",
        desc: "Verify the code to start delivery.",
        toastTitle: "Delivery started!",
        toastMsg: "Bags are out for delivery.",
      };
    case RelayStage.out_for_delivery:
      return {
        title: "Verify Delivery",
        desc: "Verify the code to confirm final delivery to the passenger.",
        toastTitle: "Delivery verified!",
        toastMsg: "Bags successfully delivered.",
      };
    default:
      return {
        title: "Verify Step",
        desc: "Verify the code to continue.",
        toastTitle: "Verified!",
        toastMsg: "Stage updated.",
      };
  }
}

export default function LogisticsVerifyPage() {
  const router = useRouter();
  const { booking, currentStage, advanceStage } = useStore();
  const content = getStageContent(currentStage, booking.user.name);
  const { showToast } = useToast();
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  function setDigit(index: number, raw: string) {
    const value = raw.replace(/\D/g, "").slice(-1);
    setDigits((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
    setError(null);
    if (value && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  }

  function onKeyDown(index: number, event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  function onPaste(event: React.ClipboardEvent<HTMLInputElement>) {
    const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!pasted) return;
    event.preventDefault();
    const next = ["", "", "", ""];
    for (let i = 0; i < pasted.length && i < 4; i++) {
      next[i] = pasted[i];
    }
    setDigits(next);
    inputs.current[Math.min(pasted.length, 3)]?.focus();
  }

  function confirm() {
    const code = digits.join("");
    if (code === CORRECT_CODE) {
      setSuccess(true);
      advanceStage();
      showToast({
        title: content.toastTitle,
        message: content.toastMsg,
        tone: "success",
      });
      window.setTimeout(() => {
        router.push("/logistics");
      }, 900);
      return;
    }
    setError("Incorrect code. Try again.");
    setShake(true);
    window.setTimeout(() => setShake(false), 500);
    setDigits(["", "", "", ""]);
    inputs.current[0]?.focus();
  }

  const isComplete = digits.every((d) => d.length === 1);

  return (
    <PageTransition>
      <div className="space-y-8 animate-fade-in pb-12">
        <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-warning/20 blur-3xl" />
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
              Logistics Portal
            </p>
            <h1 className="mt-2 text-4xl font-black tracking-tight text-white">{content.title}</h1>
            <p className="mt-3 max-w-sm text-sm font-medium text-white/80 leading-relaxed">
              {content.desc}
            </p>
          </div>
        </div>

        <Card glass className="p-8 backdrop-blur-xl bg-white/60 border-border/40 shadow-glass rounded-3xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy text-white shadow-md relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
              <KeyRound className="h-8 w-8 relative z-10" />
            </div>
            <div>
              <p className="text-lg font-black text-navy leading-tight">
                Authentication Required
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-500">
                Passenger: <span className="font-bold text-navy">{booking.user.name}</span>
              </p>
            </div>
          </div>

          <motion.div
            animate={shake ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-10 grid grid-cols-4 gap-4"
          >
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputs.current[index] = el;
                }}
                value={digit}
                onChange={(event) => setDigit(index, event.target.value)}
                onKeyDown={(event) => onKeyDown(index, event)}
                onPaste={onPaste}
                inputMode="numeric"
                maxLength={1}
                disabled={success}
                aria-label={`Digit ${index + 1}`}
                className={clsx(
                  "aspect-square w-full rounded-2xl border-2 bg-white/50 backdrop-blur-sm text-center font-mono text-4xl font-black text-navy outline-none transition-all shadow-sm focus:ring-4 focus:ring-navy/10 focus:shadow-md hover:bg-white",
                  error ? "border-destructive text-destructive bg-destructive/5" : "border-border/80 focus:border-navy focus:bg-white",
                  success && "border-success bg-success/5 text-success"
                )}
              />
            ))}
          </motion.div>

          <AnimatePresence>
            {error ? (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-center text-sm font-bold text-destructive bg-destructive/10 py-2 rounded-lg"
              >
                {error}
              </motion.p>
            ) : null}
          </AnimatePresence>

          <Button
            onClick={confirm}
            disabled={!isComplete || success}
            fullWidth
            size="lg"
            className={clsx(
              "mt-10 h-16 rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all",
              success && "bg-success hover:bg-success border-success"
            )}
          >
            {success ? (
              <>
                <CheckCircle2 className="h-6 w-6 mr-2" />
                Verified successfully
              </>
            ) : (
              "Confirm Auth Code"
            )}
          </Button>

          <AnimatePresence>
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 flex items-center justify-center gap-3 rounded-2xl border border-success/20 bg-success/10 px-6 py-5 text-lg font-bold text-success-700 shadow-sm"
              >
                <CheckCircle2 className="h-6 w-6 shrink-0" />
                Redirecting to dashboard...
              </motion.div>
            ) : null}
          </AnimatePresence>
        </Card>
      </div>
    </PageTransition>
  );
}
