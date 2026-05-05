"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  MapPin,
  Navigation,
  Package,
  Plane,
  User,
  XCircle,
  Truck
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PageTransition } from "@/components/PageTransition";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { mockBooking, relayStageLabels } from "@/lib/mockData";
import { RelayStage } from "@/lib/types";

const PAYOUT = "₦4,500";
const DISTANCE = "3.2 km away";

export default function LogisticsJobsPage() {
  const router = useRouter();
  const { booking, currentStage, advanceStage } = useStore();
  const { showToast } = useToast();
  const [declined, setDeclined] = useState(false);

  if (currentStage === RelayStage.awaiting_driver && !declined) {
    return (
      <PageTransition>
        <IncomingJobCard
          onAccept={() => {
            advanceStage();
            showToast({
              title: "Job accepted",
              message: "Navigate to pickup location.",
              tone: "success",
            });
          }}
          onDecline={() => setDeclined(true)}
        />
      </PageTransition>
    );
  }

  if (currentStage === RelayStage.awaiting_driver && declined) {
    return (
      <PageTransition>
        <Card className="text-center p-8 backdrop-blur-xl bg-white/60 border-border/40 shadow-glass rounded-3xl animate-fade-in" glass>
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 text-destructive shadow-sm">
            <XCircle className="h-10 w-10" />
          </div>
          <h2 className="mt-6 text-2xl font-black text-navy">Job declined</h2>
          <p className="mt-3 text-sm text-neutral-500 font-medium">
            We&apos;ll match this booking with another driver shortly.
          </p>
          <Button onClick={() => setDeclined(false)} variant="secondary" className="mt-8 w-full h-14 rounded-2xl text-base">
            View again
          </Button>
        </Card>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <ActiveJobView
        currentStage={currentStage}
        booking={booking}
        onPrimary={() => {
          if (currentStage === RelayStage.driver_assigned) {
            router.push("/logistics/verify");
            return;
          }
          if (currentStage === RelayStage.pickup_confirmed) {
            advanceStage();
            return;
          }
          if (currentStage === RelayStage.in_transit_to_airport) {
            advanceStage();
            return;
          }
        }}
      />
    </PageTransition>
  );
}

function IncomingJobCard({
  onAccept,
  onDecline,
}: {
  onAccept: () => void;
  onDecline: () => void;
}) {
  return (
    <div className="space-y-6 animate-slide-up">
      <Card glass className="relative overflow-hidden p-8 backdrop-blur-xl bg-white/70 border-border/40 shadow-glass rounded-3xl">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-warning to-warning/50" />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-warning opacity-75" />
              <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-warning" />
            </span>
            <p className="text-xs font-black uppercase tracking-widest text-warning-700">
              New Job Request
            </p>
          </div>
          <Badge className="bg-warning/10 text-warning-700 border-none px-3 py-1 font-bold">{DISTANCE}</Badge>
        </div>

        <div className="mt-8 space-y-6">
          <div className="flex items-start gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-white shadow-md">
              <User className="h-7 w-7" />
            </div>
            <div className="min-w-0 flex-1 pt-1">
              <p className="text-xl font-black text-navy tracking-tight">{mockBooking.user.name}</p>
              <div className="mt-2 flex items-start gap-2 text-sm text-neutral-500 font-semibold bg-navy/5 p-2 rounded-lg border border-navy/10">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
                <span>{mockBooking.pickup.address}</span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-navy/10 bg-white/60 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-navy">
                <Plane className="h-5 w-5 opacity-70" />
                <p className="text-xs font-bold uppercase tracking-widest text-neutral-500">
                  Flight Info
                </p>
              </div>
              <Badge className="font-mono text-sm font-bold tracking-wider bg-navy text-white border-none">
                {mockBooking.flight.number}
              </Badge>
            </div>
            <div className="mt-4 flex items-center gap-4 text-3xl font-black tracking-tight text-navy">
              <span>{mockBooking.flight.origin}</span>
              <div className="flex-1 h-px bg-border relative">
                <Plane className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400 fill-white" />
              </div>
              <span>{mockBooking.flight.destination}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-border/50 bg-white/50 p-5 shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-500">
                <Package className="h-4 w-4" />
                Bags
              </div>
              <p className="mt-3 text-xl font-black text-navy">
                {mockBooking.luggage.length} bags
              </p>
              <p className="mt-1 text-sm font-medium text-neutral-500 capitalize">
                {mockBooking.luggage.map((b) => b.size).join(" · ")}
              </p>
            </div>
            <div className="rounded-2xl border border-success/20 bg-success/5 p-5 shadow-sm relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-5 text-success">
                <Wallet className="h-24 w-24" />
              </div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-success-700">
                <Clock className="h-4 w-4" />
                Payout
              </div>
              <p className="mt-3 text-3xl font-black text-success-700 tracking-tight">{PAYOUT}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-4">
          <Button onClick={onDecline} variant="secondary" className="w-full h-14 rounded-2xl shadow-sm text-lg border border-dashed border-border/80 bg-white/40 hover:bg-white hover:border-destructive/30 hover:text-destructive">
            Decline
          </Button>
          <Button onClick={onAccept} className="w-full h-14 rounded-2xl shadow-md text-lg transform hover:-translate-y-1 transition-all">
            Accept Job
          </Button>
        </div>
      </Card>
    </div>
  );
}

function Wallet({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  );
}

function ActiveJobView({
  currentStage,
  booking,
  onPrimary,
}: {
  currentStage: RelayStage;
  booking: typeof mockBooking;
  onPrimary: () => void;
}) {
  const router = useRouter();

  return (
    <div className="space-y-8 pb-12">
      <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white shadow-xl">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-success/20 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
              Active Job
            </p>
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-md px-3 py-1 text-xs">
              {relayStageLabels[currentStage]}
            </Badge>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white mb-2">{booking.id}</h1>
          <p className="max-w-sm text-sm font-medium text-white/80 leading-relaxed">
            Follow the steps below to complete this luggage transfer.
          </p>
        </div>
      </div>

      <Card glass className="p-8 backdrop-blur-xl bg-white/60 border-border/40 shadow-glass rounded-3xl">
        <p className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-6">
          Next Action Required
        </p>

        {currentStage === RelayStage.driver_assigned ? (
          <TaskCard
            icon={Navigation}
            title="Navigate to Pickup"
            detail={booking.pickup.address}
          />
        ) : null}

        {currentStage === RelayStage.pickup_confirmed ? (
          <TaskCard
            icon={Truck}
            title="Head to airport"
            detail={`${booking.flight.origin} departure terminal`}
          />
        ) : null}

        {currentStage === RelayStage.in_transit_to_airport ? (
          <TaskCard
            icon={CheckCircle2}
            title="Confirm airport handoff"
            detail={`${booking.flight.origin} airport staff counter`}
          />
        ) : null}

        {currentStage === RelayStage.airport_handoff ? (
          <TaskCard
            icon={Plane}
            title="Confirm In Flight"
            detail="Verify with airport staff to mark as in-flight"
          />
        ) : null}

        {currentStage === RelayStage.in_flight ? (
          <TaskCard
            icon={Package}
            title="Confirm Arrival"
            detail="Verify bags received at destination"
          />
        ) : null}

        {currentStage === RelayStage.destination_received ? (
          <TaskCard
            icon={Truck}
            title="Start Delivery"
            detail="Verify with destination driver to begin delivery"
          />
        ) : null}

        {currentStage === RelayStage.out_for_delivery ? (
          <TaskCard
            icon={User}
            title="Confirm Handover"
            detail="Verify with passenger upon delivery"
          />
        ) : null}

        {currentStage === RelayStage.delivered ? (
          <div className="rounded-2xl border border-success/20 bg-success/10 px-6 py-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success text-white shrink-0 shadow-sm">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-lg font-black text-success-700">Job Complete</p>
                <p className="mt-1 text-sm font-medium text-success-700/80 leading-relaxed">
                  Bags successfully delivered to the passenger. Great work!
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {currentStage === RelayStage.driver_assigned ? (
          <Button onClick={onPrimary} fullWidth size="lg" className="mt-8 h-16 rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            Navigate to Pickup
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        ) : null}

        {currentStage === RelayStage.pickup_confirmed ? (
          <Button onClick={onPrimary} fullWidth size="lg" className="mt-8 h-16 rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            Start Trip to Airport
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        ) : null}

        {currentStage === RelayStage.in_transit_to_airport ? (
          <Button onClick={onPrimary} fullWidth size="lg" className="mt-8 h-16 rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            Confirm Airport Handoff
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        ) : null}

        {currentStage === RelayStage.airport_handoff ? (
          <Button onClick={() => router.push("/logistics/verify")} fullWidth size="lg" className="mt-8 h-16 rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            Verify In Flight
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        ) : null}

        {currentStage === RelayStage.in_flight ? (
          <Button onClick={() => router.push("/logistics/verify")} fullWidth size="lg" className="mt-8 h-16 rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            Verify Received at Destination
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        ) : null}

        {currentStage === RelayStage.destination_received ? (
          <Button onClick={() => router.push("/logistics/verify")} fullWidth size="lg" className="mt-8 h-16 rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            Start Out for Delivery
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        ) : null}

        {currentStage === RelayStage.out_for_delivery ? (
          <Button onClick={() => router.push("/logistics/verify")} fullWidth size="lg" className="mt-8 h-16 rounded-2xl text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
            Verify Delivered
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        ) : null}
      </Card>

      <Card glass className="p-8 backdrop-blur-xl bg-white/60 border-border/40 shadow-glass rounded-3xl">
        <h2 className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-6">Booking Details</h2>
        <div className="space-y-5 text-sm font-medium text-navy">
          <div className="flex items-start justify-between gap-3 p-4 bg-white/50 rounded-xl border border-border/40">
            <span className="text-neutral-500 flex items-center gap-2"><User className="h-4 w-4" />Passenger</span>
            <span className="font-bold text-right text-base">{booking.user.name}</span>
          </div>
          <div className="flex items-start justify-between gap-3 p-4 bg-white/50 rounded-xl border border-border/40">
            <span className="text-neutral-500 flex items-center gap-2"><Plane className="h-4 w-4" />Flight</span>
            <span className="font-bold text-right text-base">
              {booking.flight.origin} → {booking.flight.destination} <br/><span className="text-neutral-400 text-xs">{booking.flight.number}</span>
            </span>
          </div>
          <div className="flex items-start justify-between gap-3 p-4 bg-white/50 rounded-xl border border-border/40">
            <span className="text-neutral-500 flex items-center gap-2"><Package className="h-4 w-4" />Bags</span>
            <span className="font-bold text-right text-base">
              {booking.luggage.length} <br/><span className="text-neutral-400 text-xs capitalize">({booking.luggage.map((b) => b.size).join(", ")})</span>
            </span>
          </div>
          <div className="flex items-start justify-between gap-3 p-4 bg-white/50 rounded-xl border border-border/40">
            <span className="text-neutral-500 flex items-center gap-2"><MapPin className="h-4 w-4" />Pickup</span>
            <span className="font-bold text-right text-base max-w-[60%]">{booking.pickup.address}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

function TaskCard({
  icon: Icon,
  title,
  detail,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  detail: string;
}) {
  return (
    <div className="flex items-start gap-5 rounded-2xl border border-navy/10 bg-white/80 p-6 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 h-full w-2 bg-navy/10" />
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-navy text-white shadow-md">
        <Icon className="h-7 w-7" />
      </div>
      <div className="min-w-0 flex-1 pt-1">
        <p className="text-xl font-black text-navy tracking-tight">{title}</p>
        <p className="mt-1 text-sm font-medium text-neutral-500 leading-relaxed">{detail}</p>
      </div>
    </div>
  );
}

