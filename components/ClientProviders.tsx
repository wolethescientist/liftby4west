"use client";

import { DemoControls } from "@/components/DemoControls";
import { StageToastWatcher } from "@/components/StageToastWatcher";
import { ToastProvider } from "@/components/ui/Toast";
import { AppStoreProvider } from "@/lib/store";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AppStoreProvider>
      <ToastProvider>
        <StageToastWatcher />
        {children}
        <DemoControls />
      </ToastProvider>
    </AppStoreProvider>
  );
}
