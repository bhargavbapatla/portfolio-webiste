"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

const projects = [
  {
    num: "01",
    title: "Pantry Pilot",
    category: "Full-Stack SaaS · AI",
    description:
      "A full-stack monorepo SaaS platform for home-based bakery businesses to manage inventory, orders, and fulfillment. Features Sous Chef AI — an agentic voice assistant powered by Google Gemini LLM & ElevenLabs TTS that executes live DB transactions through natural language.",
    tags: ["React.js", "TypeScript", "Node.js", "PostgreSQL", "Gemini LLM", "ElevenLabs"],
    color: "#00ffaa",
    link: "#",
    github: "#",
  },
  {
    num: "02",
    title: "Low-Code / No-Code SaaS",
    category: "Enterprise Platform · Invimatic",
    description:
      "Spearheaded the frontend architecture of a production SaaS platform using React.js and TypeScript with PWA capabilities. Built real-time chat and live-tracking via Webhooks and Redis — replacing API polling and cutting server requests by 60% with sub-200ms latency.",
    tags: ["React.js", "TypeScript", "Redis", "Webhooks", "PWA", "Cube.js"],
    color: "#7b5cff",
    link: "#",
    github: "#",
  },
  {
    num: "03",
    title: "Image Classification · Vision Transformer",
    category: "ML Research · Computer Vision",
    description:
      "Achieved 89.87% accuracy on CIFAR-100 (100-class dataset) by implementing a custom CNN and benchmarking it against a fine-tuned Vision Transformer (ViT). Applied self-attention mechanisms from NLP to image classification for long-range dependency modeling.",
    tags: ["TensorFlow", "Keras", "ViT", "NumPy", "CIFAR-100", "Python"],
    color: "#ff4d6d",
    link: "#",
    github: "#",
  },
];

export function Projects() {
  const [hovered, setHovered] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);

  return (
    <section id="projects" ref={ref} className="relative py-40 px-8">
      {/* Ambient */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex items-center gap-4"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#00ffaa]">
            03 — Work
          </span>
          <div className="h-px flex-1 bg-white/5 max-w-xs" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 text-[clamp(40px,6vw,80px)] font-black leading-[0.92] tracking-tight text-white"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          Selected
          <br />
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.13)" }}
          >
            Projects
          </span>
        </motion.h2>

        {/* Project list */}
        <div className="flex flex-col divide-y divide-white/5 border-t border-white/5">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="group relative grid cursor-default grid-cols-[64px_1fr_auto] items-start gap-8 py-10 transition-all duration-300 md:grid-cols-[64px_1fr_240px_auto]"
            >
              {/* Left accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[2px] origin-top scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
                style={{ background: p.color }}
              />

              {/* Number */}
              <span
                className="font-display text-5xl font-black leading-none transition-colors duration-300"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: hovered === i ? `${p.color}20` : "rgba(255,255,255,0.06)",
                }}
              >
                {p.num}
              </span>

              {/* Body */}
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap gap-2">
                  <span
                    className="font-mono text-[10px] uppercase tracking-[0.2em]"
                    style={{ color: p.color }}
                  >
                    {p.category}
                  </span>
                </div>
                <h3
                  className="text-3xl font-black tracking-tight text-white transition-colors duration-300 group-hover:text-white md:text-4xl"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {p.title}
                </h3>
                <p className="mt-3 max-w-xl font-mono text-xs leading-[2] text-white/35">
                  {p.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-white/8 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-white/35 transition-colors duration-300 group-hover:border-white/15 group-hover:text-white/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description — visible on hover for md+ */}
              <div className="hidden md:block" />

              {/* Links */}
              <div className="flex flex-col items-end gap-3 pt-1">
                <a
                  href={p.link}
                  className="group/link flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/30 transition-colors duration-200 hover:text-white"
                >
                  <span>Live</span>
                  <ArrowUpRight className="h-3 w-3 transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </a>
                <a
                  href={p.github}
                  className="group/link flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/30 transition-colors duration-200 hover:text-white"
                >
                  <span>GitHub</span>
                  <Github className="h-3 w-3" />
                </a>
              </div>

              {/* Hover glow */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `linear-gradient(to right, ${p.color}05, transparent)`,
                    }}
                  />
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 flex justify-end"
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-white/30 transition-colors duration-300 hover:text-[#00ffaa]"
          >
            All Projects on GitHub
            <span className="flex h-8 w-8 items-center justify-center border border-white/10 transition-all duration-300 group-hover:border-[#00ffaa]/40">
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}