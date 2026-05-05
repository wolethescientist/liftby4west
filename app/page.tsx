"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Truck,
  User,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  CheckCircle2,
  Plane,
  PackageCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const portals = [
  {
    label: "Passenger Portal",
    description: "Book, track, and manage your luggage deliveries.",
    href: "/user",
    icon: User,
    color: "text-blue-600",
    bg: "bg-blue-100",
  },
  {
    label: "Logistics Portal",
    description: "Manage pickups, flight relays, and final deliveries.",
    href: "/logistics",
    icon: Truck,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    label: "Admin Portal",
    description: "System overview, booking management, and reports.",
    href: "/admin",
    icon: LayoutDashboard,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
];

const features = [
  {
    title: "Door-to-Door Delivery",
    description: "We pick up your bags from your home and deliver them straight to your destination address.",
    icon: MapPin,
  },
  {
    title: "Real-Time Tracking",
    description: "Track your luggage every step of the way with our precise multi-point verification system.",
    icon: Clock,
  },
  {
    title: "Secure & Insured",
    description: "Travel with peace of mind. Every piece of luggage is securely handled and fully insured.",
    icon: ShieldCheck,
  },
];

const steps = [
  {
    title: "Book Online",
    description: "Schedule your luggage pickup in minutes through our intuitive Passenger Portal.",
    icon: CheckCircle2,
  },
  {
    title: "We Collect",
    description: "Our certified logistics partners collect your bags directly from your home or hotel.",
    icon: Truck,
  },
  {
    title: "You Travel Free",
    description: "Head to the airport hands-free. Skip the baggage drop and baggage claim lines entirely.",
    icon: Plane,
  },
  {
    title: "Bags Arrive",
    description: "Your luggage is securely delivered to your final destination, waiting for you when you arrive.",
    icon: PackageCheck,
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-50 font-sans text-text selection:bg-blue-200 selection:text-navy">
      {/* Aurora Background Effects */}
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[40%] w-[40%] rounded-full bg-blue-400/20 blur-[100px] md:blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[20%] h-[30%] w-[30%] rounded-full bg-orange-400/20 blur-[100px] md:blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-10%] left-[20%] h-[50%] w-[50%] rounded-full bg-emerald-400/20 blur-[100px] md:blur-[120px]" />

      {/* Floating Navbar */}
      <header className="fixed left-4 right-4 top-4 z-50 mx-auto max-w-6xl">
        <nav className="flex h-16 items-center justify-between rounded-2xl border border-white/40 bg-white/70 px-6 shadow-sm backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xl font-black tracking-tight text-navy">L4W</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#how-it-works" className="text-sm font-semibold text-muted transition-colors hover:text-navy">
              How it works
            </a>
            <a href="#features" className="text-sm font-semibold text-muted transition-colors hover:text-navy">
              Features
            </a>
            <a href="#portals" className="text-sm font-semibold text-muted transition-colors hover:text-navy">
              Portals
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Button href="/user" variant="ghost" size="sm" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button href="/user" size="sm">
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      <main className="relative z-10 flex flex-col items-center">
        {/* Hero Section */}
        <section className="flex min-h-[90vh] w-full max-w-6xl flex-col items-center justify-center px-6 pt-32 text-center md:pt-40">
          <motion.div
            initial="hidden"
            animate="show"
            variants={staggerContainer}
            className="flex max-w-4xl flex-col items-center"
          >
            <motion.div variants={fadeUp} className="mb-6 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
              Introducing Liftby4west
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-5xl font-extrabold tracking-tight text-navy sm:text-6xl md:text-7xl">
              Your bags go ahead.<br className="hidden sm:block" /> You travel free.
            </motion.h1>
            <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-lg text-slate-600 sm:text-xl">
              Experience the ultimate travel convenience. We pick up your luggage from your home and deliver it straight to your destination, so you can bypass the airport hassle.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-10 flex flex-col items-center gap-4 w-full sm:flex-row sm:justify-center">
              <Button href="/user" size="lg" className="w-full sm:w-auto">
                Book a Pickup <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="#how-it-works" variant="secondary" size="lg" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full max-w-6xl px-6 py-24 md:py-32">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid gap-8 md:grid-cols-3"
          >
            {features.map((feature, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Card className="h-full border-white/60 bg-white/60 backdrop-blur-sm">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-navy">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-navy">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="w-full bg-navy py-24 text-white md:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold sm:text-4xl">Seamless from start to finish</h2>
              <p className="mt-4 text-slate-400">Four simple steps to a hands-free travel experience.</p>
            </div>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">{step.description}</p>
                  
                  {/* Connector line for desktop */}
                  {i < steps.length - 1 && (
                    <div className="absolute top-7 left-[4.5rem] hidden h-[2px] w-[calc(100%-5rem)] bg-white/10 lg:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portals Section */}
        <section id="portals" className="w-full max-w-6xl px-6 py-24 md:py-32">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-navy sm:text-4xl">Access your portal</h2>
            <p className="mt-4 text-slate-600">Select the portal that matches your role to continue.</p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-3"
          >
            {portals.map((portal) => (
              <motion.div key={portal.href} variants={fadeUp}>
                <Card className="flex h-full flex-col justify-between border-white/60 bg-white/80 transition-all hover:-translate-y-1 hover:shadow-md backdrop-blur-sm">
                  <div>
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${portal.bg} ${portal.color}`}>
                      <portal.icon className="h-7 w-7" />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-navy">{portal.label}</h3>
                    <p className="text-sm text-slate-600">{portal.description}</p>
                  </div>
                  <Button href={portal.href} variant="outline" className="mt-8 w-full group">
                    Enter Portal <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border bg-white px-6 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-navy">L4W</span>
          </div>
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} Liftby4west. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-slate-500 hover:text-navy">Privacy</a>
            <a href="#" className="text-sm text-slate-500 hover:text-navy">Terms</a>
            <a href="#" className="text-sm text-slate-500 hover:text-navy">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

