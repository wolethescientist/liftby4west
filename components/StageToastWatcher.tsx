"use client";

import { useEffect, useRef } from "react";
import { stageToastMessages } from "@/lib/mockData";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";

export function StageToastWatcher() {
  const { currentStage } = useStore();
  const { show } = useToast();
  const previous = useRef(currentStage);

  useEffect(() => {
    if (previous.current !== currentStage) {
      const message = stageToastMessages[currentStage];
      if (message) {
        show(message, "success");
      }
      previous.current = currentStage;
    }
  }, [currentStage, show]);

  return null;
}
