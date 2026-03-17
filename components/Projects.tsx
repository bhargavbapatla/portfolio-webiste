"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    num: "01",
    title: "Pantry Pilot",
    year: "2024",
    category: "Full-Stack SaaS · AI",
    description: "Full-stack monorepo SaaS for home-based bakery businesses. Features Sous Chef AI — an agentic voice assistant powered by Google Gemini LLM & ElevenLabs TTS that executes live database transactions through natural language. Integrated Twilio WhatsApp API for automated order notifications.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL", "Gemini LLM", "ElevenLabs", "Prisma"],
    link: "#",
    github: "#",
  },
  {
    num: "02",
    title: "Low-Code / No-Code SaaS",
    year: "2023",
    category: "Enterprise Platform",
    description: "Spearheaded frontend architecture at Invimatic Technologies using React.js + TypeScript with PWA capabilities. Built real-time chat and live-tracking via Webhooks and Redis — cutting server requests by 60% with sub-200ms latency. Cube.js analytics pipeline saved 800ms per query.",
    tags: ["React", "TypeScript", "Redis", "Webhooks", "PWA", "Cube.js", "Stripe"],
    link: "#",
    github: "#",
  },
  {
    num: "03",
    title: "Vision Transformer Research",
    year: "2022",
    category: "ML Research · Computer Vision",
    description: "Achieved 89.87% accuracy on CIFAR-100 by implementing a custom CNN and benchmarking against a fine-tuned Vision Transformer. Applied self-attention mechanisms from NLP to image classification for long-range spatial dependency modeling.",
    tags: ["TensorFlow", "Keras", "ViT", "NumPy", "Python", "CIFAR-100"],
    link: "#",
    github: "#",
  },
];

export function Projects() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="projects" className="py-32 px-8" style={{ background: "#edeae5" }}>
      <div className="mx-auto max-w-7xl">

        {/* Header row */}
        <div className="flex items-baseline justify-between border-b border-black/10 pb-6 mb-16">
          <span className="mono text-[11px] tracking-[0.25em] uppercase text-black/35">03 — Work</span>
          <a
            href="https://github.com/krishnabhargav"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 mono text-[11px] tracking-wider text-black/35 hover:text-black transition-colors"
          >
            All on GitHub <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="serif text-[clamp(36px,5vw,64px)] font-black leading-[1.0] tracking-tight text-black mb-16"
        >
          Selected<br />
          <em className="italic">Projects.</em>
        </motion.h2>

        {/* Project rows */}
        <div className="flex flex-col">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="border-t border-black/10"
            >
              {/* Row header — always visible */}
              <button
                className="group w-full text-left py-8 flex items-start gap-8"
                onClick={() => setExpanded(expanded === i ? null : i)}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Number */}
                <span className="mono text-[11px] text-black/25 pt-1 w-8 shrink-0">{p.num}</span>

                {/* Title + category */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-4 flex-wrap">
                    <span
                      className="serif text-[clamp(22px,3.5vw,40px)] font-black leading-none tracking-tight text-black transition-all duration-300"
                      style={{ color: hovered === i ? "#0a0a0a" : "rgba(10,10,10,0.85)" }}
                    >
                      {p.title}
                    </span>
                    <span className="mono text-[11px] text-black/30 tracking-wider hidden sm:block">{p.category}</span>
                  </div>
                </div>

                {/* Right: year + expand */}
                <div className="flex items-center gap-6 shrink-0 pt-1">
                  <span className="mono text-[11px] text-black/25">{p.year}</span>
                  <motion.div
                    animate={{ rotate: expanded === i ? 45 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="h-7 w-7 flex items-center justify-center border border-black/15 text-black/50 hover:border-black/40 hover:text-black transition-colors"
                    style={{ borderRadius: "2px" }}
                  >
                    <span className="sans text-[16px] leading-none font-light">+</span>
                  </motion.div>
                </div>
              </button>

              {/* Expanded content */}
              <AnimatePresence>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 pl-16 grid gap-8 md:grid-cols-[1fr_auto]">
                      <div>
                        <p className="sans text-[15px] leading-relaxed text-black/55 font-light max-w-2xl mb-6">
                          {p.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="mono text-[10px] tracking-wider uppercase text-black/45 border border-black/12 px-3 py-1.5"
                              style={{ borderRadius: "2px" }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-row md:flex-col gap-3 items-start">
                        <a
                          href={p.link}
                          className="flex items-center gap-2 bg-[#0a0a0a] text-[#f5f2ee] px-5 py-2.5 sans text-[12px] font-medium tracking-wide hover:bg-black/80 transition-colors whitespace-nowrap"
                          style={{ borderRadius: "2px" }}
                        >
                          Live Demo <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                        <a
                          href={p.github}
                          className="flex items-center gap-2 border border-black/15 px-5 py-2.5 sans text-[12px] font-medium text-black/55 hover:text-black hover:border-black/35 transition-all whitespace-nowrap"
                          style={{ borderRadius: "2px" }}
                        >
                          GitHub ↗
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          {/* bottom rule */}
          <div className="border-t border-black/10" />
        </div>
      </div>
    </section>
  );
}