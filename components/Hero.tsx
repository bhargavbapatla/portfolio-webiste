"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

// Stagger container variants
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen flex-col justify-end overflow-hidden px-8 pb-24 pt-32"
    >
      {/* ── Background ──────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,170,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,0.025) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
          }}
        />
        {/* Orbs */}
        <motion.div
          style={{ y }}
          className="absolute -top-32 right-0 h-[600px] w-[600px] rounded-full bg-[#00ffaa]/5 blur-[100px]"
        />
        <motion.div
          style={{ y }}
          className="absolute top-1/2 -left-48 h-[400px] w-[400px] rounded-full bg-violet-500/6 blur-[100px]"
        />
        <motion.div
          className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-rose-500/5 blur-[80px]"
        />
      </div>

      {/* ── Content ─────────────────────────────── */}
      <motion.div
        style={{ opacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-7xl"
      >
        {/* Eyebrow */}
        <motion.div variants={item} className="mb-8 flex items-center gap-4">
          <div className="h-px w-10 bg-[#00ffaa]" />
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#00ffaa]">
            Software Engineer · Frontend & AI
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-display text-[clamp(56px,11vw,160px)] font-black leading-[0.9] tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Crafting
          <br />
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.18)" }}
          >
            Interfaces
          </span>
          <br />
          That{" "}
          <span
            className="relative inline-block"
            style={{
              background: "linear-gradient(90deg, #00ffaa, #7b5cff)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Live
          </span>
          .
        </motion.h1>

        {/* Subtext + CTA row */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <p
            className="max-w-lg font-mono text-sm leading-relaxed text-white/40"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Software Engineer with 3+ years building scalable frontends,
            LLM integrations, and agentic AI systems. Based in Pune, India —
            building for the world.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group relative flex items-center gap-3 overflow-hidden bg-[#00ffaa] px-7 py-4 font-mono text-xs font-semibold uppercase tracking-widest text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,170,0.35)]"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              View Work
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="/resume.pdf"
              className="flex items-center gap-3 border border-white/10 px-7 py-4 font-mono text-xs font-semibold uppercase tracking-widest text-white/60 transition-all duration-300 hover:border-white/30 hover:text-white"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </a>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={item}
          className="mt-20 flex items-center gap-12 border-t border-white/5 pt-10"
        >
          {[
            { num: "3+", label: "Years Exp" },
            { num: "10+", label: "Projects" },
            { num: "60%", label: "Perf Gains" },
            { num: "98", label: "Lighthouse" },
          ].map((s, i) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span
                className="font-display text-4xl font-black text-white leading-none"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {s.num}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                {s.label}
              </span>
            </div>
          ))}

          <div className="ml-auto flex items-center gap-3 text-white/20">
            <div className="h-px w-8 bg-white/10" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
              Scroll
            </span>
            <div className="flex flex-col gap-[3px]">
              <div className="h-[18px] w-px bg-gradient-to-b from-[#00ffaa] to-transparent mx-auto animate-pulse" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}