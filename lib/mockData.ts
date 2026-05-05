import { RelayStage, type Booking, type ChatMessage, type Driver, type Job } from "@/lib/types";

export const relayStageLabels: Record<RelayStage, string> = {
  [RelayStage.awaiting_driver]: "Awaiting Driver",
  [RelayStage.driver_assigned]: "Driver Assigned",
  [RelayStage.pickup_confirmed]: "Pickup Confirmed",
  [RelayStage.in_transit_to_airport]: "In Transit to Airport",
  [RelayStage.airport_handoff]: "Airport Handoff",
  [RelayStage.in_flight]: "In Flight",
  [RelayStage.destination_received]: "Received at Destination",
  [RelayStage.out_for_delivery]: "Out for Delivery",
  [RelayStage.delivered]: "Delivered",
};

export const relayStages: RelayStage[] = [
  RelayStage.awaiting_driver,
  RelayStage.driver_assigned,
  RelayStage.pickup_confirmed,
  RelayStage.in_transit_to_airport,
  RelayStage.airport_handoff,
  RelayStage.in_flight,
  RelayStage.destination_received,
  RelayStage.out_for_delivery,
  RelayStage.delivered,
];

export const stageToastMessages: Partial<Record<RelayStage, string>> = {
  [RelayStage.driver_assigned]: "Driver assigned — Emeka is on his way",
  [RelayStage.pickup_confirmed]: "Bags picked up successfully",
  [RelayStage.airport_handoff]: "Bags confirmed at departure airport",
  [RelayStage.in_flight]: "Your bags are in the air",
  [RelayStage.out_for_delivery]: "Bags out for delivery at destination",
  [RelayStage.delivered]: "Your bags have been delivered!",
};

export const mockBooking: Booking = {
  id: "BK-00123",
  trackingId: "L4W-ABVLOS-7842",
  user: {
    name: "Adaeze Okonkwo",
    phone: "+234 801 234 5678",
  },
  flight: {
    number: "QR0547",
    origin: "ABV",
    destination: "LOS",
    date: "2024-12-15",
    time: "14:30",
  },
  pickup: {
    address: "12 Maitama Close, Abuja",
    time: "10:00 AM",
  },
  delivery: {
    type: "door",
    address: "5 Admiralty Way, Lagos",
  },
  luggage: [
    { id: "bag-001", size: "large", label: "Black Samsonite" },
    { id: "bag-002", size: "medium", label: "Blue duffel" },
  ],
  verificationCode: "7842",
  status: RelayStage.awaiting_driver,
  payment: {
    type: "one-off",
    amount: "₦15,000",
    status: "paid",
  },
};

export const mockDriver: Driver = {
  id: "driver-001",
  name: "Emeka Nwosu",
  vehicle: "Toyota Hiace ABJ 401 XA",
  rating: 4.8,
  jobsCompleted: 134,
  status: "assigned",
};

export const initialChatMessages: ChatMessage[] = [
  {
    id: "msg-001",
    sender: "driver",
    text: "On my way to your pickup location",
    timestamp: "2024-12-15T09:35:00+01:00",
  },
  {
    id: "msg-002",
    sender: "user",
    text: "Thank you, I'm ready",
    timestamp: "2024-12-15T09:38:00+01:00",
  },
  {
    id: "msg-003",
    sender: "driver",
    text: "Arrived downstairs, please come out",
    timestamp: "2024-12-15T09:50:00+01:00",
  },
];

export const bookings = [
  {
    id: mockBooking.trackingId,
    passenger: mockBooking.user.name,
    route: `${mockBooking.flight.origin} → ${mockBooking.flight.destination}`,
    bags: mockBooking.luggage.length,
    status: mockBooking.status,
    eta: mockBooking.pickup.time,
  },
];

export const drivers = [
  {
    ...mockDriver,
    status: "On Route",
  },
];

export const jobs: Job[] = [
  {
    id: "JOB-7842",
    pickup: mockBooking.pickup.address,
    dropoff: mockBooking.delivery.address,
    bags: mockBooking.luggage.length,
    payout: mockBooking.payment.amount,
    status: "Assigned",
  },
];

export const chatMessages = initialChatMessages.map((message) => ({
  id: message.id,
  sender: message.sender === "user" ? "You" : "Support",
  body: message.text,
  time: new Intl.DateTimeFormat("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(message.timestamp)),
}));

// ── Logistics earnings ─────────────────────────────────────────────────────

export const driverEarnings = {
  today: "₦4,500",
  week: "₦31,200",
  month: "₦89,500",
  jobsThisMonth: 12,
};

export const recentDriverJobs = [
  {
    id: "JOB-7821",
    date: "Dec 14",
    route: "Wuse 2 → NAIA Terminal",
    payout: "₦4,500",
    status: "Completed" as const,
  },
  {
    id: "JOB-7799",
    date: "Dec 13",
    route: "Garki → NAIA Terminal",
    payout: "₦3,800",
    status: "Completed" as const,
  },
  {
    id: "JOB-7782",
    date: "Dec 12",
    route: "Asokoro → NAIA Terminal",
    payout: "₦5,200",
    status: "Completed" as const,
  },
  {
    id: "JOB-7770",
    date: "Dec 11",
    route: "Maitama → NAIA Terminal",
    payout: "₦4,100",
    status: "Cancelled" as const,
  },
];

// ── Admin mock data ────────────────────────────────────────────────────────

export const adminStats = {
  totalBookings: "1,204",
  activeJobs: 8,
  registeredDrivers: 47,
  monthRevenue: "₦1,840,000",
};

export type AdminBookingRow = {
  id: string;
  user: string;
  phone: string;
  route: string;
  flight: string;
  bags: number;
  bagDetails: { id: string; label: string; size: "small" | "medium" | "large" }[];
  driver: string;
  stage: RelayStage;
  payment: { type: "one-off" | "subscription"; amount: string; status: "paid" | "pending" | "failed" };
  trackingId: string;
  verificationCode: string;
  pickupAddress: string;
  deliveryAddress: string;
};

export const adminBookings: AdminBookingRow[] = [
  {
    id: "BK-00123",
    user: "Adaeze Okonkwo",
    phone: "+234 801 234 5678",
    route: "ABV → LOS",
    flight: "QR0547",
    bags: 2,
    bagDetails: [
      { id: "bag-001", label: "Black Samsonite", size: "large" },
      { id: "bag-002", label: "Blue duffel", size: "medium" },
    ],
    driver: "Emeka Nwosu",
    stage: RelayStage.driver_assigned,
    payment: { type: "one-off", amount: "₦15,000", status: "paid" },
    trackingId: "L4W-ABVLOS-7842",
    verificationCode: "7842",
    pickupAddress: "12 Maitama Close, Abuja",
    deliveryAddress: "5 Admiralty Way, Lagos",
  },
  {
    id: "BK-00124",
    user: "Tunde Adeyemi",
    phone: "+234 802 555 9911",
    route: "LOS → ABV",
    flight: "AW2231",
    bags: 1,
    bagDetails: [{ id: "bag-101", label: "Grey carry-on", size: "small" }],
    driver: "Chinedu Okafor",
    stage: RelayStage.in_flight,
    payment: { type: "one-off", amount: "₦12,500", status: "paid" },
    trackingId: "L4W-LOSABV-3318",
    verificationCode: "3318",
    pickupAddress: "21 Lekki Phase 1, Lagos",
    deliveryAddress: "Sheraton Hotel, Abuja",
  },
  {
    id: "BK-00125",
    user: "Ngozi Eze",
    phone: "+234 703 100 8821",
    route: "ABV → PHC",
    flight: "AW0918",
    bags: 3,
    bagDetails: [
      { id: "bag-201", label: "Red hardcase", size: "large" },
      { id: "bag-202", label: "Beige tote", size: "small" },
      { id: "bag-203", label: "Cargo box", size: "medium" },
    ],
    driver: "Aisha Bello",
    stage: RelayStage.delivered,
    payment: { type: "subscription", amount: "₦25,000/mo", status: "paid" },
    trackingId: "L4W-ABVPHC-5527",
    verificationCode: "5527",
    pickupAddress: "Asokoro, Abuja",
    deliveryAddress: "GRA Phase 2, Port Harcourt",
  },
  {
    id: "BK-00126",
    user: "Kelechi Obi",
    phone: "+234 805 220 4477",
    route: "LOS → KAN",
    flight: "AW3392",
    bags: 2,
    bagDetails: [
      { id: "bag-301", label: "Navy duffel", size: "medium" },
      { id: "bag-302", label: "Olive backpack", size: "small" },
    ],
    driver: "Yusuf Musa",
    stage: RelayStage.awaiting_driver,
    payment: { type: "one-off", amount: "₦18,000", status: "pending" },
    trackingId: "L4W-LOSKAN-9912",
    verificationCode: "9912",
    pickupAddress: "Yaba, Lagos",
    deliveryAddress: "Nasarawa GRA, Kano",
  },
  {
    id: "BK-00127",
    user: "Funmi Adebayo",
    phone: "+234 809 778 1144",
    route: "ABV → LOS",
    flight: "QR0547",
    bags: 1,
    bagDetails: [{ id: "bag-401", label: "Pink suitcase", size: "medium" }],
    driver: "Emeka Nwosu",
    stage: RelayStage.out_for_delivery,
    payment: { type: "one-off", amount: "₦15,000", status: "paid" },
    trackingId: "L4W-ABVLOS-2204",
    verificationCode: "2204",
    pickupAddress: "Gwarinpa, Abuja",
    deliveryAddress: "Ikoyi, Lagos",
  },
];

export type AdminDriverRow = {
  id: string;
  name: string;
  vehicle: string;
  status: "Active" | "Suspended";
  jobsCompleted: number;
  rating: number;
};

export const adminDrivers: AdminDriverRow[] = [
  {
    id: "DR-001",
    name: "Emeka Nwosu",
    vehicle: "Toyota Hiace · ABJ-401-XA",
    status: "Active",
    jobsCompleted: 134,
    rating: 4.8,
  },
  {
    id: "DR-002",
    name: "Chinedu Okafor",
    vehicle: "Toyota Sienna · LAG-887-FX",
    status: "Active",
    jobsCompleted: 96,
    rating: 4.7,
  },
  {
    id: "DR-003",
    name: "Aisha Bello",
    vehicle: "Honda Odyssey · ABJ-220-MN",
    status: "Active",
    jobsCompleted: 211,
    rating: 4.9,
  },
  {
    id: "DR-004",
    name: "Yusuf Musa",
    vehicle: "Mercedes Vito · KAN-145-PB",
    status: "Suspended",
    jobsCompleted: 47,
    rating: 4.3,
  },
];
