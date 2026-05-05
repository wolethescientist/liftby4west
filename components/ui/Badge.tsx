import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

export type BadgeVariant = "default" | "success" | "warning" | "destructive" | "info" | "navy";

type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  tone?: "neutral" | "success" | "destructive" | "navy" | BadgeVariant;
};

const variants: Record<BadgeVariant, string> = {
  default: "border-border bg-white text-neutral-600 shadow-sm",
  success: "border-success/20 bg-success/10 text-success-700 shadow-sm",
  warning: "border-warning/30 bg-warning/10 text-warning-700 shadow-sm",
  destructive: "border-destructive/20 bg-destructive/10 text-destructive-700 shadow-sm",
  info: "border-info/20 bg-info/10 text-info-700 shadow-sm",
  navy: "border-navy/20 bg-navy/10 text-navy shadow-sm",
};

const toneAliases: Record<NonNullable<BadgeProps["tone"]>, BadgeVariant> = {
  neutral: "default",
  default: "default",
  success: "success",
  warning: "warning",
  destructive: "destructive",
  navy: "navy",
  info: "info",
};

export const relayStageBadgeVariants: Record<string, BadgeVariant> = {
  delivered: "success",
  destination_received: "success",
  in_flight: "info",
  in_transit_to_airport: "info",
  airport_handoff: "info",
  pickup_confirmed: "warning",
  driver_assigned: "warning",
  awaiting_driver: "default",
};

export function getRelayStageBadgeVariant(stage: string): BadgeVariant {
  return relayStageBadgeVariants[stage] ?? "default";
}

export function Badge({ className, variant, tone, ...props }: BadgeProps) {
  const resolvedVariant = variant ?? (tone ? toneAliases[tone] : "default");

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold tracking-wide uppercase transition-colors duration-200",
        variants[resolvedVariant],
        className,
      )}
      {...props}
    />
  );
}
