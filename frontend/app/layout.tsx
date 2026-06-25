import type { Metadata } from "next";
import { Chewy, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const chewy = Chewy({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400"],
});

const tiroDevanagariHindi = Tiro_Devanagari_Hindi({
  variable: "--font-hindi",
  subsets: ["devanagari"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "LabourConnect - काम की तलाश अब आसान",
  description: "Direct Connection to Local Construction & Renovation Workers. Zero Broker Commission.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", chewy.variable, tiroDevanagariHindi.variable, "font-sans")}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
