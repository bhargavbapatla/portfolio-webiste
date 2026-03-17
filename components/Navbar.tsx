"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Index", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Work", href: "#projects" },
  { name: "Capabilities", href: "#skills" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Force 'home' active if we are near the very top of the page
      if (window.scrollY < window.innerHeight * 0.3) {
        setActiveSection("home");
        return;
      }

      // Track active section with a larger offset threshold
      const sections = navItems.map((i) => i.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 250) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 lg:px-12"
    >
      {/* Sleek Branding */}
      <a href="#home" className="font-sans text-sm font-medium tracking-tight text-white hover:opacity-70 transition-opacity">
        Krishnabhargav Bapatla<span className="opacity-40">.</span>
      </a>

      {/* Elegant Nav Pill */}
      <nav
        className={cn(
          "hidden md:flex items-center gap-1 rounded-full border px-2 py-1.5 transition-all duration-700 ease-out",
          scrolled
            ? "border-white/10 bg-[#050505]/80 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.href.replace("#", "");
          return (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "relative px-5 py-2 text-[10px] font-mono tracking-widest uppercase transition-colors duration-500 rounded-full",
                isActive ? "text-black" : "text-white/40 hover:text-white"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </a>
          );
        })}
      </nav>

      {/* Monochromatic Status */}
      <div className="hidden md:flex items-center gap-3">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
        </span>
        <span className="font-mono text-[10px] tracking-widest uppercase text-white/50">
          Available
        </span>
      </div>
    </motion.header>
  );
}