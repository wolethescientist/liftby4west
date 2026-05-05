import { clsx } from "clsx";
import { relayStageLabels, relayStages } from "@/lib/mockData";
import type { RelayStage } from "@/lib/types";

type RelayChainProps = {
  currentStage: RelayStage | string;
  className?: string;
};

export function RelayChain({ currentStage, className }: RelayChainProps) {
  const currentIndex = relayStages.findIndex((stage) => stage === currentStage);

  return (
    <ol className={clsx("space-y-0", className)}>
      {relayStages.map((stage, index) => {
        const completed = currentIndex >= 0 && index < currentIndex;
        const current = currentIndex === index;
        const pending = !completed && !current;
        const showLine = index < relayStages.length - 1;

        return (
          <li key={stage} className="relative flex gap-3 pb-6 last:pb-0">
            {showLine ? (
              <span
                aria-hidden="true"
                className={clsx(
                  "absolute left-[11px] top-6 h-full w-px",
                  completed ? "bg-navy" : "bg-border",
                )}
              />
            ) : null}
            <span
              className={clsx(
                "relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 bg-white",
                completed && "border-navy bg-navy",
                current && "border-navy",
                pending && "border-border",
              )}
            >
              {current ? (
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-navy opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-navy" />
                </span>
              ) : null}
            </span>
            <span
              className={clsx(
                "pt-0.5 text-sm",
                completed && "font-semibold text-navy",
                current && "font-bold text-navy",
                pending && "font-medium text-neutral-400",
              )}
            >
              {relayStageLabels[stage]}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
