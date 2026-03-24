"use client";

import { useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2020",
    num: "01",
    title: "Hello World",
    category: "The Beginning",
    desc: "Wrote my very first lines of code. Started exploring the fundamentals of web development and programming logic — the spark that set everything in motion.",
    color: "#007ae5",
  },
  {
    year: "2021",
    num: "02",
    title: "Engineering\nFundamentals",
    category: "Academia · VIIT",
    desc: "Enrolled in B.Tech at VIIT. Dove deep into Data Structures, Algorithms, and core computer science — building the mental models that underpin everything I build.",
    color: "#6ea8fe",
  },
  {
    year: "2022",
    num: "03",
    title: "The React\nEcosystem",
    category: "Frontend Mastery",
    desc: "Fell in love with React.js. Built multiple frontend modules, mastered state management, and explored Next.js — finding my primary medium of expression.",
    color: "#a78bfa",
  },
  {
    year: "2023",
    num: "04",
    title: "Professional\nImpact",
    category: "Industry · Invimatic",
    desc: "Joined Invimatic Technologies as a frontend engineer. Architected Low-Code/No-Code SaaS platforms, replaced polling with Redis Webhooks, and cut server requests by 60%.",
    color: "#eb6110",
  },
  {
    year: "2024",
    num: "05",
    title: "The AI\nFrontier",
    category: "AI Engineering",
    desc: "Transitioned into AI Engineering. Building agentic systems with LangChain, Gemini, and voice integrations — orchestrating intelligence, not just interfaces.",
    color: "#c9a8f0",
  },
];

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const EASE_IN  = [0.55, 0, 0.78, 0] as const;

const leftVariants = {
  enter:  { opacity: 0, y: 32 },
  center: { opacity: 1, y: 0,  transition: { duration: 0.55, ease: EASE_OUT } },
  exit:   { opacity: 0, y: -32, transition: { duration: 0.3,  ease: EASE_IN  } },
};

const rightVariants = {
  enter:  { opacity: 0, y: 40 },
  center: { opacity: 1, y: 0,  transition: { duration: 0.6,  ease: EASE_OUT, delay: 0.08 } },
  exit:   { opacity: 0, y: -40, transition: { duration: 0.28, ease: EASE_IN  } },
};

export function Journey() {
  const pinnedRef  = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* ── Mouse parallax for ghost year ──────────────────────────────── */
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 28, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 28, damping: 22 });
  const ghostX  = useTransform(springX, [0, 1], [-28, 28]);
  const ghostY  = useTransform(springY, [0, 1], [-14, 14]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = pinnedRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top)  / rect.height);
    },
    [mouseX, mouseY]
  );

  /* ── GSAP scroll pin ─────────────────────────────────────────────── */
  useGSAP(
    () => {
      const el = pinnedRef.current;
      if (!el) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: `+=${(milestones.length - 1) * window.innerHeight}`,
        pin: true,
        scrub: 1.2,
        onUpdate: (self) => {
          const idx = Math.min(
            milestones.length - 1,
            Math.floor(self.progress * milestones.length)
          );
          setActiveIndex((prev) => (prev !== idx ? idx : prev));
        },
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: pinnedRef }
  );

  const m = milestones[activeIndex];

  return (
    <section id="journey" className="relative">

      {/* ── Top ambient rule ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Section intro header (above the pin, scrolls normally) ───── */}
      <div className="px-6 pb-14 pt-36 md:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-4 flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue">
              03 — My Journey
            </span>
            <div className="h-px w-16 bg-dark-blue-ui/50" />
          </div>
          <div className="flex items-end justify-between">
            <h2 className="text-[clamp(40px,6vw,80px)] font-black leading-[0.9] tracking-tight">
              The Path
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px rgba(245,244,223,0.12)" }}
              >
                So Far.
              </span>
            </h2>
            <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/25 md:block">
              2020 — 2024
            </span>
          </div>
        </div>
      </div>

      {/* ── Pinned chapter viewer ─────────────────────────────────────── */}
      <div
        ref={pinnedRef}
        className="relative h-screen overflow-hidden"
        style={{ backgroundColor: "var(--color-black)" }}
        onMouseMove={handleMouseMove}
      >

        {/* Background gradient — crossfades per milestone */}
        <AnimatePresence>
          <motion.div
            key={m.color + "-bg1"}
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 65% 85% at 12% 50%, ${m.color}1c 0%, transparent 55%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.3, ease: "easeInOut" }}
          />
        </AnimatePresence>
        <AnimatePresence>
          <motion.div
            key={m.color + "-bg2"}
            className="pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 35% 50% at 88% 65%, ${m.color}0c 0%, transparent 45%)`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.15 }}
          />
        </AnimatePresence>

        {/* Ghost year — massive, parallax */}
        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden"
          style={{ x: ghostX, y: ghostY }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={m.year + "-ghost"}
              className="font-display font-black leading-none"
              style={{ fontSize: "clamp(180px, 28vw, 400px)", color: m.color }}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 0.046, scale: 1 }}
              exit={{ opacity: 0, scale: 1.07 }}
              transition={{ duration: 0.75, ease: "easeInOut" }}
            >
              {m.year}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* ── Top bar: hint + year progress segments ─────────────────── */}
        <div className="absolute left-6 right-6 top-7 flex items-start justify-between md:left-12 md:right-12">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/20">
            scroll to explore
          </span>

          {/* Progress segments */}
          <div className="flex items-center gap-5">
            {milestones.map((ms, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                {/* Track */}
                <div
                  className="relative overflow-hidden rounded-full"
                  style={{ width: 32, height: 1, backgroundColor: "rgba(245,244,223,0.07)" }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 h-full"
                    animate={{
                      width:           i <= activeIndex ? "100%" : "0%",
                      backgroundColor: ms.color,
                      opacity:         i < activeIndex ? 0.35 : 1,
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                {/* Year label */}
                <motion.span
                  className="font-mono"
                  style={{ fontSize: "8px" }}
                  animate={{ color: i === activeIndex ? ms.color : "rgba(245,244,223,0.18)" }}
                  transition={{ duration: 0.4 }}
                >
                  {ms.year}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Main content grid ───────────────────────────────────────── */}
        <div className="absolute inset-0 flex items-center px-6 md:px-12">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[5fr_1px_7fr]">

              {/* Left: category + year + counter */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`left-${activeIndex}`}
                  variants={leftVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col justify-center md:pr-16"
                >
                  {/* Category tag */}
                  <span
                    className="mb-5 font-mono text-[10px] uppercase tracking-[0.38em]"
                    style={{ color: m.color }}
                  >
                    {m.num} — {m.category}
                  </span>

                  {/* Year — large */}
                  <div
                    className="font-display font-black leading-none"
                    style={{ fontSize: "clamp(68px, 11vw, 140px)", color: m.color }}
                  >
                    {m.year}
                  </div>

                  {/* Divider + chapter counter */}
                  <div className="mt-7 flex items-center gap-4">
                    <div
                      className="h-px flex-1"
                      style={{ backgroundColor: `${m.color}22` }}
                    />
                    <span className="font-mono text-[10px] text-foreground/20">
                      {m.num} / 0{milestones.length}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Column separator */}
              <motion.div
                className="hidden self-stretch md:block"
                animate={{ backgroundColor: `${m.color}1e` }}
                transition={{ duration: 1.2 }}
                style={{ width: 1 }}
              />

              {/* Right: title + rule + description */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`right-${activeIndex}`}
                  variants={rightVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col justify-center md:pl-16"
                >
                  {/* Title */}
                  <h3
                    className="font-display font-black leading-[0.9] tracking-tight text-foreground"
                    style={{ fontSize: "clamp(36px, 5.2vw, 82px)" }}
                  >
                    {m.title.split("\n").map((line, i) => (
                      <span key={i} className="block">{line}</span>
                    ))}
                  </h3>

                  {/* Animated rule */}
                  <motion.div
                    className="my-7 h-px origin-left"
                    style={{ background: `linear-gradient(to right, ${m.color}65, transparent)` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.65, delay: 0.28, ease: EASE_OUT }}
                  />

                  {/* Description */}
                  <p className="max-w-lg font-mono text-sm leading-[1.9] text-foreground/50">
                    {m.desc}
                  </p>
                </motion.div>
              </AnimatePresence>

            </div>
          </div>
        </div>

        {/* ── Right-edge chapter nav dots ─────────────────────────────── */}
        <div className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col gap-3 md:right-7">
          {milestones.map((ms, i) => (
            <motion.div
              key={i}
              className="rounded-full"
              animate={{
                width:           i === activeIndex ? 5 : 3,
                height:          i === activeIndex ? 5 : 3,
                backgroundColor: i === activeIndex ? ms.color : "rgba(245,244,223,0.18)",
                boxShadow:       i === activeIndex ? `0 0 8px ${ms.color}aa` : "none",
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>

        {/* ── Scroll hint — visible only on first chapter ─────────────── */}
        <AnimatePresence>
          {activeIndex === 0 && (
            <motion.div
              className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.4, duration: 0.5 }}
            >
              <div className="h-8 w-px animate-scroll-pulse bg-gradient-to-b from-blue/50 to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Bottom edge ambient line ─────────────────────────────────── */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      </div>
    </section>
  );
}
