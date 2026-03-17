"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { num: "01", name: "Home", href: "#home" },
  { num: "02", name: "About", href: "#about" },
  { num: "03", name: "Work", href: "#projects" },
  { num: "04", name: "Skills", href: "#skills" },
  { num: "05", name: "Contact", href: "#contact" },
];

interface PillRect { left: number; width: number }

export function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [hoverRect, setHoverRect] = useState<PillRect | null>(null);
  const [activeRect, setActiveRect] = useState<PillRect | null>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const navRef = useRef<HTMLElement>(null);

  const measure = (el: HTMLElement | null): PillRect | null => {
    if (!el || !navRef.current) return null;
    const nb = navRef.current.getBoundingClientRect();
    const ib = el.getBoundingClientRect();
    return { left: ib.left - nb.left, width: ib.width };
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = navItems.map((i) => i.href.replace("#", ""));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const idx = navItems.findIndex((i) => i.href.replace("#", "") === active);
    if (idx !== -1) setActiveRect(measure(itemRefs.current[idx]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 transition-all duration-500",
        scrolled ? "bg-[#f5f2ee]/90 backdrop-blur-md border-b border-black/8" : "bg-transparent"
      )}
    >
      {/* Logo */}
      <a href="#home" className="group flex items-baseline gap-2">
        <span className="serif text-xl font-black tracking-tight text-[#0a0a0a]">KB</span>
        <span className="mono text-[10px] text-black/30 tracking-widest transition-colors group-hover:text-black/60">
          .dev
        </span>
      </a>

      {/* Nav */}
      <nav
        ref={navRef}
        onMouseLeave={() => setHoverRect(null)}
        className="relative hidden md:flex items-center"
      >
        {/* Hover underline */}
        <motion.div
          className="pointer-events-none absolute bottom-0 h-px bg-black/20"
          animate={{
            opacity: hoverRect ? 1 : 0,
            left: hoverRect ? hoverRect.left : (activeRect?.left ?? 0),
            width: hoverRect ? hoverRect.width : (activeRect?.width ?? 0),
          }}
          transition={{ type: "spring", stiffness: 500, damping: 42, mass: 0.6 }}
        />
        {/* Active underline */}
        <motion.div
          className="pointer-events-none absolute bottom-0 h-[1.5px] bg-black"
          animate={{
            opacity: activeRect ? 1 : 0,
            left: activeRect ? activeRect.left : 0,
            width: activeRect ? activeRect.width : 0,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 34 }}
        />

        {navItems.map((item, i) => {
          const isActive = active === item.href.replace("#", "");
          return (
            <a
              key={item.name}
              href={item.href}
              ref={(el) => { itemRefs.current[i] = el; }}
              onMouseEnter={() => setHoverRect(measure(itemRefs.current[i]))}
              className="relative flex items-baseline gap-1.5 px-5 py-3 select-none"
            >
              <span className="mono text-[9px] text-black/30 leading-none">{item.num}</span>
              <span className={cn(
                "sans text-[13px] font-medium tracking-wide transition-colors duration-200",
                isActive ? "text-black" : "text-black/45 hover:text-black/80"
              )}>
                {item.name}
              </span>
            </a>
          );
        })}
      </nav>

      {/* CTA */}
      <a
        href="#contact"
        className="hidden md:flex items-center gap-2 border border-black/15 bg-[#0a0a0a] px-5 py-2.5 text-[#f5f2ee] transition-all duration-300 hover:bg-black/80"
        style={{ borderRadius: "2px" }}
      >
        <span className="sans text-[12px] font-medium tracking-wide">Hire Me</span>
        <span className="mono text-[10px] text-white/40">↗</span>
      </a>
    </motion.header>
  );
}