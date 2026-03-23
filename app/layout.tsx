import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Krishnabhargav Bapatla | Software Engineer",
  description:
    "Software Engineer with 3+ years building scalable frontends, LLM integrations, and agentic AI systems. Based in Pune, India.",
  keywords: [
    "Krishnabhargav Bapatla",
    "Software Engineer",
    "Frontend Developer",
    "React",
    "TypeScript",
    "LangChain",
    "AI Engineer",
    "Pune",
  ],
  authors: [{ name: "Krishnabhargav Bapatla", url: "https://github.com/krishnabhargav" }],
  openGraph: {
    title: "Krishnabhargav Bapatla | Software Engineer",
    description:
      "Software Engineer with 3+ years building scalable frontends, LLM integrations, and agentic AI systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Bebas Neue for display headings */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${dmMono.variable} font-mono antialiased bg-background text-foreground selection:bg-blue/20 selection:text-blue`}
        suppressHydrationWarning
      >
        <SmoothScroll />

        {/* Noise grain overlay */}
        <div
          className="pointer-events-none fixed inset-0 z-[999] opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px",
          }}
        />

        {/* Ambient background — top blue glow */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(0,122,229,0.06),transparent)]" />
        {/* Bottom-right pink */}
        <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(ellipse_50%_40%_at_80%_100%,rgba(255,217,201,0.05),transparent)]" />
        {/* Base dark */}
        <div className="pointer-events-none fixed inset-0 -z-20 bg-background" />

        {children}
      </body>
    </html>
  );
}