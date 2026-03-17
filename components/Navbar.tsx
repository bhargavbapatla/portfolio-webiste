"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Track active section
      const sections = navItems.map((i) => i.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
    >
      {/* Logo */}
      <a href="#home" className="group relative flex items-center gap-2">
        <span
          className="font-mono text-xs tracking-[0.3em] uppercase text-white/30 group-hover:text-white/60 transition-colors duration-300"
        >
          &lt;
        </span>
        <span className="font-mono text-sm font-semibold tracking-widest text-white">
          KB
        </span>
        <span
          className="font-mono text-xs tracking-[0.3em] uppercase text-[#00ffaa] group-hover:text-[#00ffaa] transition-colors duration-300"
        >
          /&gt;
        </span>
        {/* Glow under logo */}
        <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00ffaa]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </a>

      {/* Nav pill */}
      <nav
        className={cn(
          "hidden md:flex items-center gap-1 rounded-full border px-3 py-2 transition-all duration-500",
          scrolled
            ? "border-white/10 bg-black/60 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]"
            : "border-white/5 bg-white/[0.02] backdrop-blur-sm"
        )}
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.href.replace("#", "");
          return (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                "relative px-4 py-1.5 text-xs font-medium tracking-widest uppercase transition-colors duration-300 rounded-full",
                isActive ? "text-black" : "text-white/40 hover:text-white"
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-[#00ffaa]"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </a>
          );
        })}
      </nav>

      {/* Status badge */}
      <div className="hidden md:flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.02] px-4 py-2 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ffaa] opacity-60" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00ffaa]" />
        </span>
        <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">
          Available
        </span>
      </div>
    </motion.header>
  );
}