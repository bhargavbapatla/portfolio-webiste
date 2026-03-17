import type { Metadata } from "next";
import { DM_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-mono" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Krishnabhargav Bapatla | Software Engineer",
  description: "Software Engineer with 3+ years building scalable frontends and agentic AI systems. Based in Pune, India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${dmMono.variable} ${instrumentSerif.variable} font-sans antialiased bg-[#050505] text-white selection:bg-white selection:text-black`}
        suppressHydrationWarning
      >
        <SmoothScroll />

        {/* Sophisticated High-Contrast Film Grain */}
        <div
          className="pointer-events-none fixed inset-0 z-[999] opacity-[0.035] mix-blend-screen"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Removed the bright neon background glows for a pure, deep architectural void */}
        <div className="pointer-events-none fixed inset-0 -z-20 bg-[#050505]" />

        {children}
      </body>
    </html>
  );
}