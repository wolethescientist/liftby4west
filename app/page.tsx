"use client";

import { motion, Variants } from "framer-motion";
import {
  LayoutDashboard,
  Truck,
  User,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Plane,
  PackageCheck,
  ScanFace,
  Weight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/Button";

const portals = [
  {
    label: "Passenger Portal",
    description: "Book, track, and manage deliveries effortlessly.",
    href: "/user",
    icon: User,
  },
  {
    label: "Logistics Portal",
    description: "Manage pickups, relays, and verify handoffs.",
    href: "/logistics",
    icon: Truck,
  },
  {
    label: "Admin Portal",
    description: "System overview, intelligent routing, and reports.",
    href: "/admin",
    icon: LayoutDashboard,
  },
];

const features = [
  {
    title: "Door-to-Door Service",
    description: "We collect your luggage from your home and deliver it straight to your destination address.",
    icon: MapPin,
  },
  {
    title: "Identity Verification",
    description: "Strict passenger matching at pickup ensures your luggage is linked exclusively to your travel identity.",
    icon: ScanFace,
  },
  {
    title: "Weigh & Seal Protocol",
    description: "Bags are weighed and secured with tamper-evident seals immediately at your doorstep before transit.",
    icon: Weight,
  },
  {
    title: "Real-Time Tracking",
    description: "Track your luggage every step of the way with our precise multi-point verification system.",
    icon: ShieldCheck,
  },
];

const steps = [
  {
    title: "Schedule",
    description: "Book your luggage pickup in minutes.",
    icon: Sparkles,
  },
  {
    title: "Verify",
    description: "We verify your ID, weigh, and seal your bags.",
    icon: ShieldCheck,
  },
  {
    title: "Travel",
    description: "Head to the airport hands-free.",
    icon: Plane,
  },
  {
    title: "Arrive",
    description: "Your luggage waits at your destination.",
    icon: PackageCheck,
  },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#FAFAF9] font-sans text-neutral-900 selection:bg-amber-200 selection:text-neutral-900">
      
      {/* Liquid Glass Background Effects */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            x: ["-10%", "10%", "-10%"],
            y: ["-10%", "20%", "-10%"],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-amber-200/30 blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            x: ["20%", "-20%", "20%"],
            y: ["10%", "-10%", "10%"],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] -right-[10%] w-[50vw] h-[50vw] rounded-full bg-sky-200/30 blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            x: ["-10%", "30%", "-10%"],
            y: ["30%", "0%", "30%"],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[20%] left-[10%] w-[70vw] h-[70vw] rounded-full bg-indigo-200/20 blur-[140px]" 
        />
      </div>

      <div className="relative z-10 flex flex-col">
        {/* Modern Floating Navbar */}
        <header className="fixed left-0 right-0 top-6 z-50 px-6">
          <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between rounded-full border border-white/40 bg-white/40 px-6 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-900 text-white shadow-md">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight">Liftby4west</span>
            </div>
            <div className="hidden items-center gap-8 md:flex">
              <a href="#how-it-works" className="text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-900">Experience</a>
              <a href="#features" className="text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-900">Security</a>
              <a href="#portals" className="text-sm font-semibold text-neutral-600 transition-colors hover:text-neutral-900">Portals</a>
            </div>
            <div className="flex items-center gap-3">
              <Button href="/user" className="h-10 rounded-full bg-neutral-900 px-6 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-neutral-800">
                Book Now
              </Button>
            </div>
          </nav>
        </header>

        <main className="flex flex-col items-center pt-40 md:pt-52">
          {/* Hero Section */}
          <section className="w-full max-w-6xl px-6 text-center">
            <motion.div initial="hidden" animate="show" variants={staggerContainer} className="flex flex-col items-center">
              <motion.div variants={fadeUp} className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-200/60 bg-amber-100/50 px-4 py-2 text-sm font-semibold text-amber-800 shadow-sm backdrop-blur-md">
                <Sparkles className="h-4 w-4" />
                The Future of Premium Travel
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="max-w-4xl text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[1.05] tracking-tight text-neutral-900">
                Your luggage goes ahead. <br className="hidden md:block" />
                <span className="bg-gradient-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">You travel free.</span>
              </motion.h1>
              
              <motion.p variants={fadeUp} className="mt-8 max-w-2xl text-lg font-medium leading-relaxed text-neutral-600 md:text-xl">
                Experience ultimate travel convenience. We verify, secure, and deliver your luggage straight to your destination. Bypass the airport hassle entirely.
              </motion.p>
              
              <motion.div variants={fadeUp} className="mt-12 flex flex-col gap-4 sm:flex-row">
                <Button href="/user" className="h-14 rounded-full bg-neutral-900 px-8 text-base font-semibold text-white shadow-[0_8px_32px_rgba(0,0,0,0.12)] transition-all hover:scale-105 hover:bg-neutral-800 hover:shadow-[0_16px_48px_rgba(0,0,0,0.2)]">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button href="#how-it-works" variant="outline" className="h-14 rounded-full border-neutral-200 bg-white/50 px-8 text-base font-semibold text-neutral-900 backdrop-blur-md transition-all hover:bg-white hover:shadow-md">
                  Explore Experience
                </Button>
              </motion.div>
            </motion.div>
          </section>

          {/* How It Works */}
          <section id="how-it-works" className="mt-32 w-full max-w-6xl px-6 py-24">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <div className="mb-16 text-center">
                <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight text-neutral-900 md:text-5xl">Seamless Journey</motion.h2>
                <motion.p variants={fadeUp} className="mt-4 text-lg text-neutral-600">Four elegant steps to hands-free travel.</motion.p>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {steps.map((step, i) => (
                  <motion.div key={i} variants={fadeUp} className="group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] hover:bg-white/60">
                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 text-amber-700 shadow-inner transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold text-neutral-900">{step.title}</h3>
                    <p className="text-neutral-600 font-medium leading-relaxed">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Features */}
          <section id="features" className="w-full max-w-6xl px-6 py-24">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}>
              <div className="mb-16 text-center">
                <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight text-neutral-900 md:text-5xl">Uncompromising Security</motion.h2>
                <motion.p variants={fadeUp} className="mt-4 text-lg text-neutral-600">Your belongings, protected at every touchpoint.</motion.p>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                {features.map((feature, i) => (
                  <motion.div key={i} variants={fadeUp} className="group relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/40 p-10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-2xl transition-all duration-500 hover:bg-white/60">
                    <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
                    <div className="relative z-10 flex gap-6">
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-neutral-900 text-amber-400 shadow-lg transition-transform duration-500 group-hover:scale-110">
                        <feature.icon className="h-7 w-7" />
                      </div>
                      <div>
                        <h3 className="mb-3 text-2xl font-bold text-neutral-900">{feature.title}</h3>
                        <p className="text-lg font-medium text-neutral-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Portals */}
          <section id="portals" className="w-full max-w-6xl px-6 py-24 pb-40">
            <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer} className="relative overflow-hidden rounded-[3rem] bg-neutral-900 px-8 py-20 shadow-2xl md:px-16 md:py-24">
              {/* Subtle dark glow inside portals section */}
              <div className="absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-500/20 blur-[100px]" />
              
              <div className="relative z-10 mb-16 text-center">
                <motion.h2 variants={fadeUp} className="text-3xl font-bold tracking-tight text-white md:text-5xl">Access Portals</motion.h2>
                <motion.p variants={fadeUp} className="mt-4 text-lg text-neutral-400">Select your workspace to continue.</motion.p>
              </div>
              
              <div className="relative z-10 grid gap-6 md:grid-cols-3">
                {portals.map((portal) => (
                  <motion.a key={portal.href} href={portal.href} variants={fadeUp} className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:shadow-[0_16px_48px_rgba(0,0,0,0.2)] hover:border-white/20">
                    <portal.icon className="mb-6 h-10 w-10 text-amber-400 transition-transform duration-500 group-hover:scale-110" />
                    <h3 className="mb-3 text-2xl font-bold text-white">{portal.label}</h3>
                    <p className="text-neutral-400 font-medium group-hover:text-neutral-300 transition-colors">{portal.description}</p>
                    <div className="mt-10 flex items-center font-bold text-amber-400">
                      Enter Portal <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </section>
        </main>

        <footer className="w-full border-t border-neutral-200 bg-white/50 px-6 py-12 backdrop-blur-lg">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-900 text-white">
                <Sparkles className="h-3 w-3" />
              </div>
              <span className="text-xl font-bold tracking-tight">Liftby4west</span>
            </div>
            <p className="text-sm font-semibold text-neutral-500">© {new Date().getFullYear()} Liftby4west. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
