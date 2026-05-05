"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2, PlaneTakeoff, MapPin, CreditCard, Luggage } from "lucide-react";
import { clsx } from "clsx";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/ui/Toast";
import { useStore } from "@/lib/store";
import { RelayStage, type LuggageItem } from "@/lib/types";

type DeliveryPreference = "door" | "counter";
type PaymentType = "one-off" | "subscription";
type BagSize = LuggageItem["size"];

const inputClass =
  "h-12 w-full rounded-xl border border-border/50 bg-white/50 backdrop-blur-sm px-4 text-sm text-text outline-none transition-all duration-200 placeholder:text-neutral-400 focus:border-navy focus:bg-white focus:ring-4 focus:ring-navy/10 hover:border-navy/30";

const initialBags: LuggageItem[] = [
  { id: "bag-carryon", label: "Cabin roller", size: "small" },
  { id: "bag-checkin", label: "Checked suitcase", size: "large" },
];

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="space-y-4 rounded-3xl border border-border/40 bg-white/60 p-6 backdrop-blur-xl shadow-glass transition-all hover:shadow-lg">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/5 text-navy">
          <Icon className="h-5 w-5" />
        </div>
        <h2 className="text-sm font-black uppercase tracking-widest text-navy">{title}</h2>
      </div>
      <div className="space-y-4 pt-2">
        {children}
      </div>
    </div>
  );
}

function ToggleCard({
  active,
  title,
  detail,
  onClick,
}: {
  active: boolean;
  title: string;
  detail?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        "relative w-full rounded-2xl border p-5 text-left transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-navy/20",
        active 
          ? "border-navy bg-navy text-white shadow-md transform scale-[1.02]" 
          : "border-border/50 bg-white/50 hover:bg-white hover:border-navy/30 text-navy"
      )}
    >
      <span className="block text-sm font-bold tracking-wide">{title}</span>
      {detail ? (
        <span className={clsx("mt-2 block text-xs font-medium", active ? "text-white/80" : "text-neutral-500")}>
          {detail}
        </span>
      ) : null}
      
      {/* Selection Indicator */}
      {active && (
        <div className="absolute top-5 right-5 h-2 w-2 rounded-full bg-success shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
      )}
    </button>
  );
}

export default function UserBookPage() {
  const router = useRouter();
  const { updateBooking, advanceStage } = useStore();
  const { showToast } = useToast();
  const [bags, setBags] = useState<LuggageItem[]>(initialBags);
  const [showBagForm, setShowBagForm] = useState(false);
  const [bagLabel, setBagLabel] = useState("");
  const [bagSize, setBagSize] = useState<BagSize>("medium");
  const [deliveryPreference, setDeliveryPreference] = useState<DeliveryPreference>("door");
  const [paymentType, setPaymentType] = useState<PaymentType>("one-off");
  const [form, setForm] = useState({
    flightNumber: "",
    departure: "",
    destination: "",
    date: "",
    time: "",
    pickupAddress: "",
    pickupTime: "",
    destinationAddress: "",
  });

  function updateField(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function addBag() {
    const label = bagLabel.trim();
    if (!label) {
      return;
    }

    setBags((current) => [...current, { id: `bag-${Date.now()}`, label, size: bagSize }]);
    setBagLabel("");
    setBagSize("medium");
    setShowBagForm(false);
  }

  function confirmBooking() {
    const departure = (form.departure || "LOS").toUpperCase();
    const destination = (form.destination || "ABV").toUpperCase();

    updateBooking({
      id: `booking-${Date.now()}`,
      trackingId: `L4W-${departure}${destination}-7842`,
      flight: {
        number: form.flightNumber || "Pending flight",
        origin: departure,
        destination,
        date: form.date || "Date pending",
        time: form.time || "Time pending",
      },
      pickup: {
        address: form.pickupAddress || "Pickup address pending",
        time: form.pickupTime || "Pickup time pending",
      },
      delivery: {
        type: deliveryPreference === "door" ? "door" : "counter",
        address:
          deliveryPreference === "door"
            ? form.destinationAddress || "Destination address pending"
            : "Airport collection counter",
      },
      luggage: bags,
      verificationCode: "7842",
      status: RelayStage.awaiting_driver,
      payment: {
        type: paymentType,
        amount: paymentType === "one-off" ? "₦15,000" : "₦25,000/month",
        status: "paid",
      },
    });
    advanceStage();
    showToast({
      title: "Booking confirmed",
      message: "A driver has been assigned to your pickup.",
      tone: "success",
    });
    router.push("/user/track");
  }

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white shadow-xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-info/20 blur-3xl" />
        <div className="relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
            Passenger Portal
          </p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-white">New Booking</h1>
          <p className="mt-3 max-w-sm text-sm font-medium text-white/80 leading-relaxed">
            Your bags go ahead. You travel free. Book your luggage transfer in seconds.
          </p>
        </div>
      </div>

      <Section title="Flight Details" icon={PlaneTakeoff}>
        <input
          className={inputClass}
          placeholder="Flight number (e.g. BA 123)"
          value={form.flightNumber}
          onChange={(event) => updateField("flightNumber", event.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            className={inputClass}
            placeholder="Departure (LOS)"
            value={form.departure}
            onChange={(event) => updateField("departure", event.target.value)}
          />
          <input
            className={inputClass}
            placeholder="Destination (ABV)"
            value={form.destination}
            onChange={(event) => updateField("destination", event.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className={inputClass}
            value={form.date}
            onChange={(event) => updateField("date", event.target.value)}
          />
          <input
            type="time"
            className={inputClass}
            value={form.time}
            onChange={(event) => updateField("time", event.target.value)}
          />
        </div>
      </Section>

      <Section title="Your Luggage" icon={Luggage}>
        <div className="space-y-3">
          {bags.map((bag) => (
            <div
              key={bag.id}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-border/50 bg-white/40 px-4 py-4 backdrop-blur-sm transition-all hover:bg-white hover:shadow-sm"
            >
              <span className="min-w-0 flex-1 text-sm font-semibold text-navy">{bag.label}</span>
              <Badge className="capitalize shadow-sm bg-navy/5 text-navy border-none px-3 py-1">{bag.size}</Badge>
              <button
                type="button"
                aria-label={`Remove ${bag.label}`}
                onClick={() => setBags((current) => current.filter((item) => item.id !== bag.id))}
                className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 opacity-50 transition-all hover:bg-destructive/10 hover:text-destructive hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        {showBagForm ? (
          <div className="grid gap-4 rounded-2xl border border-navy/20 bg-navy/5 p-4 animate-slide-up">
            <input
              className={inputClass}
              placeholder="Bag label (e.g. Red Suitcase)"
              value={bagLabel}
              onChange={(event) => setBagLabel(event.target.value)}
            />
            <div className="grid grid-cols-[1fr_auto] gap-3">
              <select
                className={inputClass}
                value={bagSize}
                onChange={(event) => setBagSize(event.target.value as BagSize)}
              >
                <option value="small">Small (Carry-on)</option>
                <option value="medium">Medium (Checked)</option>
                <option value="large">Large (Oversized)</option>
              </select>
              <Button type="button" onClick={addBag} className="h-12 px-6 rounded-xl">
                Add Bag
              </Button>
            </div>
          </div>
        ) : (
          <Button type="button" variant="secondary" onClick={() => setShowBagForm(true)} className="w-full border border-dashed border-border bg-white/40 hover:bg-white hover:border-navy/30 h-14 rounded-2xl shadow-none">
            <Plus className="h-4 w-4" />
            Add Another Bag
          </Button>
        )}
      </Section>

      <Section title="Pickup & Delivery" icon={MapPin}>
        <div className="space-y-4">
          <input
            className={inputClass}
            placeholder="Pickup address"
            value={form.pickupAddress}
            onChange={(event) => updateField("pickupAddress", event.target.value)}
          />
          <input
            type="time"
            className={inputClass}
            value={form.pickupTime}
            onChange={(event) => updateField("pickupTime", event.target.value)}
          />
        </div>
        
        <div className="pt-4 mt-4 border-t border-border/40">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4">Delivery Preference</h3>
          <div className="grid grid-cols-2 gap-4">
            <ToggleCard
              active={deliveryPreference === "door"}
              title="To my door"
              onClick={() => setDeliveryPreference("door")}
            />
            <ToggleCard
              active={deliveryPreference === "counter"}
              title="Airport counter"
              onClick={() => setDeliveryPreference("counter")}
            />
          </div>
          {deliveryPreference === "door" ? (
            <div className="mt-4 animate-fade-in">
              <input
                className={inputClass}
                placeholder="Destination address"
                value={form.destinationAddress}
                onChange={(event) => updateField("destinationAddress", event.target.value)}
              />
            </div>
          ) : null}
        </div>
      </Section>

      <Section title="Payment Method" icon={CreditCard}>
        <div className="grid grid-cols-2 gap-4">
          <ToggleCard
            active={paymentType === "one-off"}
            title="Pay per trip"
            detail="₦15,000 / booking"
            onClick={() => setPaymentType("one-off")}
          />
          <ToggleCard
            active={paymentType === "subscription"}
            title="Premium Plan"
            detail="₦25,000/mo, unlimited"
            onClick={() => setPaymentType("subscription")}
          />
        </div>
      </Section>

      <Button type="button" fullWidth size="lg" onClick={confirmBooking} className="mt-8 h-16 text-lg rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
        Confirm & Pay {paymentType === "one-off" ? "₦15,000" : "₦25,000"}
      </Button>
    </div>
  );
}
