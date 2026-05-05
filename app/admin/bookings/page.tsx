"use client";

import { useState } from "react";
import { PageTransition } from "@/components/PageTransition";
import { adminBookings, AdminBookingRow, relayStageLabels } from "@/lib/mockData";
import { Badge, getRelayStageBadgeVariant } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { X, Phone, Plane, Package, CreditCard, CalendarDays } from "lucide-react";
import { useStore } from "@/lib/store";
import { AnimatePresence, motion } from "framer-motion";
import { clsx } from "clsx";

export default function AdminBookingsPage() {
  const { currentStage } = useStore();
  const [selectedBooking, setSelectedBooking] = useState<AdminBookingRow | null>(null);

  const liveRows = adminBookings.map((row, index) =>
    index === 0 ? { ...row, stage: currentStage } : row,
  );

  return (
    <PageTransition>
      <div className="space-y-8 pb-12">
        <div className="relative overflow-hidden rounded-3xl bg-navy p-8 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-warning/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-success/20 blur-3xl" />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                Admin Portal
              </p>
              <h1 className="mt-2 text-4xl font-black tracking-tight text-white">Bookings</h1>
              <p className="mt-3 max-w-sm text-sm font-medium text-white/80 leading-relaxed">
                Manage and track all logistics bookings in real-time.
              </p>
            </div>
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-md">
              <CalendarDays className="h-8 w-8 text-white" />
            </div>
          </div>
        </div>

        <Card className="!p-0 overflow-hidden shadow-glass border-border/40 bg-white/60 backdrop-blur-xl rounded-3xl" glass>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-sm text-left">
              <thead className="bg-white/40 text-xs font-black uppercase tracking-widest text-neutral-500 border-b border-border/40">
                <tr>
                  <th className="px-8 py-5">Booking ID</th>
                  <th className="px-8 py-5">User</th>
                  <th className="px-8 py-5">Route</th>
                  <th className="px-8 py-5">Bags</th>
                  <th className="px-8 py-5">Stage</th>
                  <th className="px-8 py-5">Payment</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {liveRows.map((row) => (
                  <tr key={row.id} className="transition-colors hover:bg-white/50 group">
                    <td className="px-8 py-5">
                      <Badge className="font-mono text-xs font-bold bg-navy/5 text-navy border-none px-3 py-1">
                        {row.id}
                      </Badge>
                    </td>
                    <td className="px-8 py-5 font-bold text-navy">{row.user}</td>
                    <td className="px-8 py-5 font-medium text-neutral-600 group-hover:text-navy transition-colors">{row.route}</td>
                    <td className="px-8 py-5 font-medium text-neutral-600">{row.bags}</td>
                    <td className="px-8 py-5">
                      <Badge variant={getRelayStageBadgeVariant(row.stage)} className="shadow-sm">
                        {relayStageLabels[row.stage]}
                      </Badge>
                    </td>
                    <td className="px-8 py-5 font-medium text-neutral-600">
                      <div className="flex flex-col gap-1">
                        <span className="font-bold text-navy">{row.payment.amount}</span>
                        <span className={clsx(
                          "text-[10px] font-black uppercase tracking-wider",
                          row.payment.status === 'paid' ? 'text-success' : 'text-neutral-400'
                        )}>
                          {row.payment.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <Button variant="outline" size="sm" onClick={() => setSelectedBooking(row)} className="rounded-xl border-border/80 hover:bg-navy hover:text-white transition-colors">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <AnimatePresence>
          {selectedBooking && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-40 bg-navy/40 backdrop-blur-md"
                onClick={() => setSelectedBooking(null)}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="fixed inset-y-0 right-0 z-50 w-full max-w-lg overflow-y-auto bg-white/90 backdrop-blur-2xl p-8 shadow-2xl border-l border-white/40"
              >
                <div className="flex items-center justify-between border-b border-border/40 pb-6">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest text-neutral-500">
                      Booking Details
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <h2 className="font-mono text-2xl font-black text-navy tracking-tight">
                        {selectedBooking.id}
                      </h2>
                      <Badge variant={getRelayStageBadgeVariant(selectedBooking.stage)} className="shadow-sm">
                        {relayStageLabels[selectedBooking.stage]}
                      </Badge>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedBooking(null)}
                    className="rounded-2xl bg-white p-2.5 text-neutral-500 shadow-sm border border-border/40 transition hover:bg-neutral-100 hover:text-navy hover:scale-105"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-8 space-y-8">
                  {/* User Info */}
                  <section>
                    <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                      <User className="h-4 w-4" /> Passenger
                    </h3>
                    <div className="rounded-3xl border border-white/60 bg-white/50 p-6 shadow-glass">
                      <p className="text-xl font-black text-navy">{selectedBooking.user}</p>
                      <div className="mt-3 flex items-center text-sm font-semibold text-neutral-500 bg-white rounded-xl p-3 border border-border/40 w-fit">
                        <Phone className="mr-2 h-4 w-4 text-navy" />
                        {selectedBooking.phone}
                      </div>
                    </div>
                  </section>

                  {/* Route & Flight */}
                  <section>
                    <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                      <Plane className="h-4 w-4" /> Route & Flight
                    </h3>
                    <div className="rounded-3xl border border-white/60 bg-white/50 p-6 shadow-glass">
                      <div className="flex items-center text-lg font-black text-navy mb-6 pb-4 border-b border-border/40">
                        <div className="h-10 w-10 rounded-xl bg-info/10 text-info flex items-center justify-center mr-4">
                          <Plane className="h-5 w-5" />
                        </div>
                        {selectedBooking.route} <span className="mx-2 text-neutral-300">|</span> {selectedBooking.flight}
                      </div>
                      <div className="space-y-6 text-sm relative">
                        <div className="absolute left-2.5 top-5 bottom-5 w-0.5 bg-border/60" />
                        <div className="flex items-start relative">
                          <div className="h-5 w-5 rounded-full bg-white border-4 border-navy shrink-0 mr-4 mt-0.5 z-10" />
                          <div>
                            <p className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-1">
                              Pickup
                            </p>
                            <p className="font-semibold text-navy leading-relaxed">
                              {selectedBooking.pickupAddress}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start relative">
                          <div className="h-5 w-5 rounded-full bg-white border-4 border-success shrink-0 mr-4 mt-0.5 z-10" />
                          <div>
                            <p className="text-xs font-black uppercase tracking-widest text-neutral-500 mb-1">
                              Delivery
                            </p>
                            <p className="font-semibold text-navy leading-relaxed">
                              {selectedBooking.deliveryAddress}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Luggage Details */}
                  <section>
                    <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                      <Package className="h-4 w-4" /> Luggage ({selectedBooking.bags} items)
                    </h3>
                    <div className="rounded-3xl border border-white/60 bg-white/50 p-6 shadow-glass text-sm">
                      <ul className="space-y-3">
                        {selectedBooking.bagDetails.map((bag) => (
                          <li key={bag.id} className="flex items-center justify-between bg-white p-3 rounded-2xl border border-border/40 shadow-sm">
                            <div className="flex items-center font-bold text-navy">
                              <Package className="mr-3 h-5 w-5 text-neutral-400" />
                              <span>{bag.label}</span>
                            </div>
                            <Badge className="bg-navy/5 text-navy border-none font-bold">
                              {bag.size}
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </section>

                  {/* Additional Details */}
                  <section>
                    <h3 className="mb-4 text-xs font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                      <CreditCard className="h-4 w-4" /> Status & Payment
                    </h3>
                    <div className="space-y-4 rounded-3xl border border-white/60 bg-white/50 p-6 text-sm shadow-glass">
                      <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-border/40">
                        <span className="font-bold text-neutral-500">Current Stage</span>
                        <Badge variant={getRelayStageBadgeVariant(selectedBooking.stage)} className="shadow-sm">
                          {relayStageLabels[selectedBooking.stage]}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-border/40">
                        <span className="font-bold text-neutral-500">Assigned Driver</span>
                        <span className="font-black text-navy">{selectedBooking.driver}</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-border/40">
                        <span className="font-bold text-neutral-500">Auth Code</span>
                        <Badge className="bg-navy text-white font-mono tracking-widest text-sm shadow-md border-none px-3 py-1">
                          {selectedBooking.verificationCode}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-success/5 to-success/10 rounded-2xl border border-success/20">
                        <div className="flex items-center font-black text-success-700">
                          <CreditCard className="mr-2 h-5 w-5" />
                          Payment
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black tracking-tight text-navy">{selectedBooking.payment.amount}</p>
                          <p className="mt-1 text-[10px] font-black uppercase tracking-widest text-success-700">
                            {selectedBooking.payment.status} &middot; {selectedBooking.payment.type}
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                  <div className="h-4" />
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </PageTransition>
  );
}

// Ensure User is imported
function User({ className }: { className?: string }) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
