import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata: Metadata = {
  title: "Liftby4west",
  description: "Your bags go ahead. You travel free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} bg-white font-sans text-text antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
