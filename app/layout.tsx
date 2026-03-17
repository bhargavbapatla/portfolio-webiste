import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const dmSans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["300", "400", "500", "600"] });
const dmMono = DM_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata: Metadata = {
  title: "Krishnabhargav Bapatla — Software Engineer",
  description: "Software Engineer with 3+ years building scalable frontends, LLM integrations, and agentic AI systems. Based in Pune, India.",
  keywords: ["Krishnabhargav Bapatla", "Software Engineer", "React", "TypeScript", "LangChain", "AI"],
  authors: [{ name: "Krishnabhargav Bapatla" }],
  openGraph: {
    title: "Krishnabhargav Bapatla — Software Engineer",
    description: "Software Engineer · Frontend & AI · Pune, India",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&display=swap" rel="stylesheet" />
      </head>
      <body className={`${dmSans.variable} ${dmMono.variable} font-sans antialiased`}>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}