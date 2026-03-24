"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Journey", href: "#journey" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      if (menuOpen) setMenuOpen(false);

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
  }, [menuOpen]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="flex items-center justify-between px-5 py-4 md:px-8 md:py-5">
        {/* Logo */}
        <a href="#home" className="group relative flex items-center gap-2">
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-foreground/30 group-hover:text-foreground/60 transition-colors duration-300">
            &lt;
          </span>
          <span className="font-mono text-sm font-semibold tracking-widest text-foreground">
            KB
          </span>
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-blue group-hover:text-blue transition-colors duration-300">
            /&gt;
          </span>
          <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </a>

        {/* Desktop nav pill */}
        <nav
          className={cn(
            "hidden md:flex items-center gap-1 rounded-full border px-3 py-2 transition-all duration-500",
            scrolled
              ? "border-dark-blue-ui/50 bg-black/60 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              : "border-dark-blue-ui/50 bg-dark-blue-ui/20 backdrop-blur-sm"
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
                  isActive ? "text-foreground" : "text-foreground/40 hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-blue"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Desktop status badge */}
        <div className="hidden md:flex items-center gap-2 rounded-full border border-dark-blue-ui/50 bg-dark-blue-ui/20 px-4 py-2 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue" />
          </span>
          <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40">
            Available
          </span>
        </div>

        {/* Mobile hamburger */}
        <button
          className="relative z-50 flex md:hidden flex-col justify-center gap-[5px] p-2"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 7 : 0 }}
            transition={{ duration: 0.25 }}
            className="block h-px w-5 origin-center bg-foreground/70"
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1, scaleX: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
            className="block h-px w-5 bg-foreground/70"
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -7 : 0 }}
            transition={{ duration: 0.25 }}
            className="block h-px w-5 origin-center bg-foreground/70"
          />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-b border-dark-blue-ui/50 bg-black/95 backdrop-blur-xl px-5 pb-5"
          >
            <div className="flex flex-col">
              {navItems.map((item, i) => {
                const isActive = activeSection === item.href.replace("#", "");
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    className={cn(
                      "border-b border-dark-blue-ui/30 py-3.5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 last:border-0",
                      isActive ? "text-blue" : "text-foreground/40"
                    )}
                  >
                    {item.name}
                  </motion.a>
                );
              })}
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-foreground/30">
                Available for work
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
