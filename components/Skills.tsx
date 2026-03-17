"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skillGroups = [
  {
    category: "Frontend Architecture",
    items: ["React.js", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "React Native"],
  },
  {
    category: "AI & Backend Systems",
    items: ["LangChain / LangGraph", "Node.js / Express", "FastAPI / Django", "RAG Pipelines", "n8n Workflows", "Google Gemini LLM"],
  },
  {
    category: "Data & Infrastructure",
    items: ["PostgreSQL", "Redis", "MongoDB / Firebase", "Pinecone / ChromaDB", "Docker", "Cube.js Analytics"],
  },
  {
    category: "Tools & Integrations",
    items: ["Git / GitHub", "TensorFlow / Keras", "Stripe Integration", "Twilio / WhatsApp API", "Cursor / Claude Code", "Figma"],
  },
];

const marqueeWords = [
  "React", "TypeScript", "LangChain", "Next.js", "FastAPI",
  "RAG", "Redis", "PostgreSQL", "Docker", "TensorFlow",
  "React Native", "LangGraph", "Stripe", "Node.js", "Gemini",
];

export function Skills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const transitionEase = [0.76, 0, 0.24, 1];

  return (
    <section id="skills" ref={ref} className="relative py-32 bg-[#050505] overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Section Header */}
        <div className="mb-24 flex items-center justify-between border-b border-white/10 pb-6">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">04 // Capabilities</span>
        </div>

        <div className="grid gap-20 lg:grid-cols-12 lg:gap-8">

          {/* Left Side: Sticky Header */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                animate={isInView ? { y: "0%" } : { y: "100%" }}
                transition={{ duration: 1.2, ease: transitionEase }}
                className="text-[clamp(40px,5vw,80px)] font-light leading-[0.9] tracking-tighter text-white"
              >
                Technical <br />
                <span className="font-serif italic text-white/60">Arsenal.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="mt-8 max-w-sm font-sans text-sm font-light leading-relaxed text-white/50"
              >
                A curated selection of frameworks, languages, and tools utilized to engineer scalable systems and intelligent interfaces.
              </motion.p>
            </div>
          </div>

          {/* Right Side: Brutalist Grid */}
          <div className="lg:col-span-7 flex flex-col pt-4">
            {skillGroups.map((group, groupIdx) => (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: groupIdx * 0.15, ease: transitionEase }}
                className="mb-12 last:mb-0"
              >
                <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-white">
                  {group.category}
                </h3>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4 border-t border-white/10 pt-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item, i) => (
                    <div key={i} className="font-sans text-sm font-light text-white/60 hover:text-white transition-colors">
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Elegant Marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative mt-32 overflow-hidden border-t border-b border-white/10 py-6 bg-[#0a0a0a]"
      >
        <div
          className="flex gap-16 whitespace-nowrap"
          style={{ animation: "marquee 40s linear infinite" }}
        >
          {/* Tripled the array for smooth infinite scrolling on ultrawide monitors */}
          {[...marqueeWords, ...marqueeWords, ...marqueeWords].map((word, i) => (
            <span
              key={i}
              className="flex items-center gap-16 font-mono text-[11px] uppercase tracking-[0.3em] text-white/30"
            >
              {word}
              {/* Replacing the old diamond with a sleek, minimalist slash */}
              <span className="font-light text-white/10">/</span>
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.33%); }
          }
        `}</style>
      </motion.div>
    </section>
  );
}