"use client";

import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-subtle">
      <AdminSidebar />
      <main className="px-5 py-6 pt-16 md:ml-64 md:px-10 md:pt-10">
        <div className="mx-auto max-w-6xl pb-24">{children}</div>
      </main>
    </div>
  );
}
