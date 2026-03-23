"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { NeuralBackground } from "./NeuralBackground";

// Magnetic Button Wrapper
function MagneticButton({ children, className, href, style }: { children: React.ReactNode, className?: string, href?: string, style?: any }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    mouseX.set((clientX - centerX) * 0.4);
    mouseY.set((clientY - centerY) * 0.4);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.a
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y, ...style }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// Stagger container variants
const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as any } },
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
        <NeuralBackground />

        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,122,229,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,122,229,0.03) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent)",
          }}
        />
        {/* Orbs */}
        <motion.div
          style={{ y }}
          className="absolute -top-32 right-0 h-[600px] w-[600px] rounded-full bg-blue/10 blur-[120px]"
        />
        <motion.div
          style={{ y }}
          className="absolute top-1/2 -left-48 h-[400px] w-[400px] rounded-full bg-pink/15 blur-[120px]"
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
          <div className="h-px w-10 bg-blue" />
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-blue">
            Software Engineer · Frontend & AI
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className="font-display text-[clamp(56px,11vw,160px)] font-black leading-[0.9] tracking-tight text-foreground mb-6"
        >
          {["Crafting", "Interfaces", "That", "Live."].map((word, i) => (
            <span key={i} className="inline-block mr-[0.2em] overflow-hidden align-bottom">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className={i === 1 ? "text-transparent inline-block" : "inline-block"}
                style={i === 1 ? { WebkitTextStroke: "1px rgba(245,244,223,0.18)" } : i === 2 ? {
                  background: "linear-gradient(90deg, var(--color-blue), var(--color-pink))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                } : {}}
              >
                {word}
              </motion.span>
              {i === 1 && <br />}
            </span>
          ))}
        </motion.h1>

        {/* Subtext + CTA row */}
        <motion.div
          variants={item}
          className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between"
        >
          <p
            className="max-w-lg font-mono text-sm leading-relaxed text-foreground/40"
          >
            Software Engineer with 3+ years building scalable frontends,
            LLM integrations, and agentic AI systems. Based in Pune, India —
            building for the world.
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <MagneticButton
              href="#projects"
              className="group relative flex items-center gap-3 overflow-hidden bg-blue px-8 py-5 font-mono text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,122,229,0.4)]"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              <span className="relative z-10 flex items-center gap-3">
                View Work
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </MagneticButton>

            <MagneticButton
              href="/resume.pdf"
              className="group flex items-center gap-3 border border-dark-blue-ui/50 bg-white/5 backdrop-blur-sm px-8 py-5 font-mono text-xs font-semibold uppercase tracking-widest text-foreground/60 transition-all duration-300 hover:border-dark-blue-ui hover:text-foreground"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              <Download className="h-3.5 w-3.5" />
              Resume
            </MagneticButton>
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={item}
          className="mt-20 flex items-center gap-12 border-t border-dark-blue-ui/50 pt-10"
        >
          {[
            { num: "3+", label: "Years Exp" },
            { num: "10+", label: "Projects" },
            { num: "60%", label: "Perf Gains" },
            { num: "98", label: "Lighthouse" },
          ].map((s, i) => (
            <div key={s.label} className="flex flex-col gap-1">
              <span
                className="font-display text-4xl font-black text-foreground leading-none"
              >
                {s.num}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
                {s.label}
              </span>
            </div>
          ))}

          <div className="ml-auto flex items-center gap-3 text-foreground/20">
            <div className="h-px w-8 bg-dark-blue-ui/50" />
            <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
              Scroll
            </span>
            <div className="flex flex-col gap-[3px]">
              <div className="h-[18px] w-px bg-gradient-to-b from-blue to-transparent mx-auto animate-pulse" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}