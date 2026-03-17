"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const transitionEase = [0.76, 0, 0.24, 1];

  return (
    <section id="about" ref={ref} className="relative py-32 px-6 lg:px-12 bg-[#050505] border-t border-white/5">
      <div className="mx-auto max-w-7xl">

        {/* Editorial Section Label */}
        <div className="mb-20 flex items-center justify-between border-b border-white/10 pb-6">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">01 // Biography</span>
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">Pune, India</span>
        </div>

        {/* Huge Headline spanning full width - Added pb-4 to prevent descender clipping */}
        <div className="mb-24">
          <div className="overflow-hidden pb-6">
            <motion.h2
              initial={{ y: "100%", rotate: 1 }}
              whileInView={{ y: "0%", rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: transitionEase }}
              className="text-[clamp(50px,9vw,140px)] font-light leading-[0.85] tracking-tight text-white"
            >
              Bridging logic <br />
              <span className="font-serif italic text-white/60">and elegance.</span>
            </motion.h2>
          </div>
        </div>

        {/* 3-Column Editorial Grid */}
        <motion.div
          style={{ y: yParallax }}
          className="grid gap-16 lg:grid-cols-12 lg:gap-8 pt-8 border-t border-white/10"
        >
          {/* Column 1: Philosophy */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8">The Philosophy</h3>
            <p className="font-sans text-sm font-light leading-[1.8] text-white/70">
              I am a Software Engineer architecting scalable applications powered by modern frameworks and Generative AI. With over 3 years of experience, I specialize in the space where heavy backend logic meets pixel-perfect human interfaces.
            </p>
            <p className="font-sans text-sm font-light leading-[1.8] text-white/70">
              My core belief is that enterprise software shouldn't feel like a spreadsheet. It should feel intuitive, fluid, and meticulously crafted.
            </p>
          </div>

          {/* Column 2: Background */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8">The Background</h3>
            <p className="font-sans text-sm font-light leading-[1.8] text-white/70">
              Previously at Invimatic Technologies, I spearheaded a Low-Code SaaS platform in React, built real-time architectures via Redis, and engineered analytics pipelines that shaved critical milliseconds off query times.
            </p>
            <p className="font-sans text-sm font-light leading-[1.8] text-white/70">
              Today, my focus is heavily skewed toward Agentic AI workflows, LLM integrations, and pushing the boundaries of what browsers can render natively.
            </p>
          </div>

          {/* Column 3: The Metrics (Brutalist Grid) */}
          <div className="lg:col-span-4">
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8">The Metrics</h3>
            <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
              {[
                { num: "03+", label: "Years Exp" },
                { num: "10+", label: "Architectures" },
                { num: "60%", label: "Perf Gains" },
                { num: "AI", label: "Specialization" },
              ].map((s, i) => (
                <div key={i} className="bg-[#050505] p-6 flex flex-col justify-between aspect-square hover:bg-white/5 transition-colors">
                  <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">{s.label}</div>
                  <div className="font-serif italic text-4xl text-white mt-auto">{s.num}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}