"use client";

import { BookOpen, LayoutDashboard, RadioTower, Users } from "lucide-react";
import { Sidebar } from "@/components/ui/Sidebar";

const items = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/bookings", label: "Bookings", icon: BookOpen },
  { href: "/admin/drivers", label: "Drivers", icon: Users },
  { href: "/admin/relay", label: "Relay Monitor", icon: RadioTower },
];

export function AdminSidebar() {
  return <Sidebar items={items} title="Liftby4west" subtitle="Admin Portal" />;
}
