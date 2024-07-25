import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SplitBills",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ userSelect: "none" }}>
      <body className={`${inter.className} h-screen flex flex-col`}>
        <Navbar />
        <Separator orientation="horizontal" />
        <main className="flex-grow flex flex-col items-center bg-muted/40">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
