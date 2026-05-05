"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Menu, X, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";

export type SidebarItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type SidebarProps = {
  items: SidebarItem[];
  title?: string;
  subtitle?: string;
  homeHref?: string;
};

export function Sidebar({
  items,
  title = "Liftby4west",
  subtitle = "Admin",
  homeHref = "/",
}: SidebarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const SidebarContent = (
    <>
      <Link href={homeHref} className="block group">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-navy text-white shadow-sm transition-transform group-hover:scale-105">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <p className="text-lg font-black tracking-tight text-navy">{title}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500">
              {subtitle}
            </p>
          </div>
        </div>
      </Link>

      <nav className="mt-8 space-y-2">
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "group flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-all duration-200",
                active
                  ? "bg-navy text-white shadow-sm"
                  : "text-neutral-600 hover:bg-subtle hover:text-navy",
              )}
            >
              <Icon
                className={clsx(
                  "h-4 w-4 transition-transform duration-200 group-hover:scale-110",
                  active ? "text-white" : "text-neutral-400 group-hover:text-navy",
                )}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href={homeHref}
        className="mt-auto group flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-neutral-600 transition-all duration-200 hover:bg-subtle hover:text-navy"
      >
        <ArrowLeft className="h-4 w-4 text-neutral-400 transition-transform duration-200 group-hover:-translate-x-1 group-hover:text-navy" />
        Back to Home
      </Link>
    </>
  );

  return (
    <>
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-navy shadow-sm transition hover:bg-subtle md:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-border/60 bg-white/80 backdrop-blur-xl p-6 shadow-soft md:flex md:flex-col z-20">
        {SidebarContent}
      </aside>

      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-navy/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="absolute inset-y-0 left-0 flex w-72 max-w-[80vw] flex-col bg-white p-6 shadow-2xl rounded-r-2xl"
            >
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-neutral-500 transition hover:bg-subtle hover:text-navy"
              >
                <X className="h-4 w-4" />
              </button>
              {SidebarContent}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
