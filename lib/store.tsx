"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  initialChatMessages,
  jobs as initialJobs,
  mockBooking,
  mockDriver,
  relayStages,
} from "@/lib/mockData";
import { RelayStage, type Booking, type ChatMessage, type Driver, type Job } from "@/lib/types";

const storageKey = "liftby4west_state";

type AppStoreState = {
  booking: Booking;
  driver: Driver;
  currentStage: RelayStage;
  chatMessages: ChatMessage[];
  jobs: Job[];
};

type LegacyBookingView = {
  id: string;
  passenger: string;
  route: string;
  bags: number;
  status: RelayStage;
  eta: string;
};

type AppStoreContextValue = AppStoreState & {
  bookings: LegacyBookingView[];
  hydrated: boolean;
  advanceStage: () => void;
  resetDemo: () => void;
  sendMessage: (text: string, sender: ChatMessage["sender"]) => void;
  updateBooking: (partial: Partial<Booking>) => void;
  addBooking: (booking: LegacyBookingView) => void;
  verifyJob: (jobId: string) => void;
};

const initialState: AppStoreState = {
  booking: mockBooking,
  driver: mockDriver,
  currentStage: mockBooking.status,
  chatMessages: initialChatMessages,
  jobs: initialJobs,
};

const AppStoreContext = createContext<AppStoreContextValue | null>(null);

function toBookingView(booking: Booking): LegacyBookingView {
  return {
    id: booking.trackingId,
    passenger: booking.user.name,
    route: `${booking.flight.origin} → ${booking.flight.destination}`,
    bags: booking.luggage.length,
    status: booking.status,
    eta: booking.pickup.time,
  };
}

function getInitialState(): AppStoreState {
  return {
    ...initialState,
    booking: { ...initialState.booking },
    driver: { ...initialState.driver },
    chatMessages: [...initialState.chatMessages],
    jobs: [...initialState.jobs],
  };
}

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppStoreState>(getInitialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<AppStoreState>;
        setState((current) => ({
          ...current,
          ...parsed,
          booking: parsed.booking ?? current.booking,
          driver: parsed.driver ?? current.driver,
          currentStage: parsed.currentStage ?? parsed.booking?.status ?? current.currentStage,
          chatMessages: parsed.chatMessages ?? current.chatMessages,
          jobs: parsed.jobs ?? current.jobs,
        }));
      }
    } catch {
      window.localStorage.removeItem(storageKey);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [hydrated, state]);

  const advanceStage = useCallback(() => {
    setState((current) => {
      const currentIndex = relayStages.indexOf(current.currentStage);
      const nextStage = relayStages[Math.min(currentIndex + 1, relayStages.length - 1)];

      return {
        ...current,
        currentStage: nextStage,
        booking: {
          ...current.booking,
          status: nextStage,
        },
      };
    });
  }, []);

  const resetDemo = useCallback(() => {
    setState(getInitialState());
  }, []);

  const sendMessage = useCallback((text: string, sender: ChatMessage["sender"]) => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }

    setState((current) => ({
      ...current,
      chatMessages: [
        ...current.chatMessages,
        {
          id: `msg-${Date.now()}`,
          sender,
          text: trimmedText,
          timestamp: new Date().toISOString(),
        },
      ],
    }));
  }, []);

  const updateBooking = useCallback((partial: Partial<Booking>) => {
    setState((current) => {
      const booking = {
        ...current.booking,
        ...partial,
      };

      return {
        ...current,
        booking,
        currentStage: partial.status ?? current.currentStage,
      };
    });
  }, []);

  const addBooking = useCallback((booking: LegacyBookingView) => {
    setState((current) => ({
      ...current,
      booking: {
        ...current.booking,
        id: booking.id,
        trackingId: booking.id,
        user: {
          ...current.booking.user,
          name: booking.passenger,
        },
        luggage: current.booking.luggage.slice(0, booking.bags),
        status: booking.status,
      },
      currentStage: booking.status,
    }));
  }, []);

  const verifyJob = useCallback((jobId: string) => {
    setState((current) => ({
      ...current,
      jobs: current.jobs.map((job) =>
        job.id === jobId ? { ...job, status: "Verified" } : job,
      ),
      currentStage: RelayStage.airport_handoff,
      booking: {
        ...current.booking,
        status: RelayStage.airport_handoff,
      },
    }));
  }, []);

  const bookings = useMemo(() => [toBookingView(state.booking)], [state.booking]);

  const value = useMemo(
    () => ({
      ...state,
      bookings,
      hydrated,
      advanceStage,
      resetDemo,
      sendMessage,
      updateBooking,
      addBooking,
      verifyJob,
    }),
    [addBooking, advanceStage, bookings, hydrated, resetDemo, sendMessage, state, updateBooking, verifyJob],
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export const StoreProvider = AppStoreProvider;

export function useStore() {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error("useStore must be used inside AppStoreProvider");
  }

  return context;
}
