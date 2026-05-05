"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";
import { clsx } from "clsx";

export type BottomNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export function BottomNav({ items }: { items: BottomNavItem[] }) {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white">
      <div
        className="mx-auto grid max-w-xl"
        style={{ gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))` }}
      >
        {items.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/user" && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={clsx(
                "flex min-h-16 flex-col items-center justify-center gap-1 text-xs font-semibold transition",
                active ? "text-navy" : "text-neutral-500 hover:text-text",
              )}
            >
              <span
                className={clsx(
                  "flex h-8 w-10 items-center justify-center rounded-full",
                  active && "bg-navy/10",
                )}
              >
                <Icon className="h-5 w-5" />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
