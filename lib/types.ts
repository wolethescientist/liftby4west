export enum RelayStage {
  awaiting_driver = "awaiting_driver",
  driver_assigned = "driver_assigned",
  pickup_confirmed = "pickup_confirmed",
  in_transit_to_airport = "in_transit_to_airport",
  airport_handoff = "airport_handoff",
  in_flight = "in_flight",
  destination_received = "destination_received",
  out_for_delivery = "out_for_delivery",
  delivered = "delivered",
}

export type LuggageItem = {
  id: string;
  size: "small" | "medium" | "large";
  label: string;
};

export type Booking = {
  id: string;
  trackingId: string;
  user: {
    name: string;
    phone: string;
  };
  flight: {
    number: string;
    origin: string;
    destination: string;
    date: string;
    time: string;
  };
  pickup: {
    address: string;
    time: string;
  };
  delivery: {
    type: "door" | "airport" | "counter";
    address: string;
  };
  luggage: LuggageItem[];
  verificationCode: string;
  status: RelayStage;
  payment: {
    type: "one-off" | "subscription";
    amount: string;
    status: "paid" | "pending" | "failed";
  };
};

export type Driver = {
  id: string;
  name: string;
  vehicle: string;
  rating: number;
  jobsCompleted: number;
  status: "available" | "assigned" | "offline";
};

export type ChatMessage = {
  id: string;
  sender: "user" | "driver";
  text: string;
  timestamp: string;
};

export type Job = {
  id: string;
  pickup: string;
  dropoff: string;
  bags: number;
  payout: string;
  status: "Open" | "Assigned" | "Verified";
};

export type BookingStatus = RelayStage;
