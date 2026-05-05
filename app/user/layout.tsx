"use client";

import { Home, MapPin, MessageCircle, User } from "lucide-react";
import { Sidebar } from "@/components/ui/Sidebar";

const navItems = [
  { href: "/user", label: "Book", icon: Home },
  { href: "/user/track", label: "Track", icon: MapPin },
  { href: "/user/chat", label: "Chat", icon: MessageCircle },
  { href: "/user/profile", label: "Profile", icon: User },
];

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-subtle">
      <Sidebar items={navItems} title="Liftby4west" subtitle="Passenger" />
      <main className="px-5 py-6 pt-16 md:ml-64 md:px-10 md:pt-10">
        <div className="mx-auto max-w-6xl pb-24">{children}</div>
      </main>
    </div>
  );
}
