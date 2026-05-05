import { LayoutDashboard, Truck, User } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const portals = [
  {
    label: "Passenger Portal",
    href: "/user",
    icon: User,
  },
  {
    label: "Logistics Portal",
    href: "/logistics",
    icon: Truck,
  },
  {
    label: "Admin Portal",
    href: "/admin",
    icon: LayoutDashboard,
  },
];

export default function LandingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12">
      <section className="w-full max-w-4xl text-center">
        <p className="text-5xl font-black tracking-tight text-navy">L4W</p>
        <h1 className="mt-3 text-xl font-semibold tracking-wide text-text">Liftby4west</h1>
        <p className="mt-4 text-base text-neutral-600">Your bags go ahead. You travel free.</p>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Card key={portal.href} className="flex min-h-48 flex-col items-center justify-between">
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-subtle text-navy">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h2 className="mt-5 text-base font-semibold">{portal.label}</h2>
                </div>
                <Button href={portal.href} className="mt-8 w-full">
                  Enter
                </Button>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
