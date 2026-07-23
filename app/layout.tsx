import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import GrainOverlay from "@/components/GrainOverlay";
import CursorFollower from "@/components/CursorFollower";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Jean Jeromel Hilanga — Web Developer",
  description:
    "Jean Jeromel Hilanga, a web developer expanding into full-stack architecture and DevOps workflows. Selected case studies, experience, and contact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <GrainOverlay />
        <CursorFollower />
        {children}
      </body>
    </html>
  );
}