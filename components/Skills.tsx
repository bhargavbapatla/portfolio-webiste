"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const skillGroups = [
  {
    category: "Frontend",
    color: "var(--color-blue)",
    items: [
      { name: "React.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 82 },
      { name: "React Native", level: 80 },
    ],
  },
  {
    category: "AI & Backend",
    color: "var(--color-pink)",
    items: [
      { name: "LangChain / LangGraph", level: 85 },
      { name: "Node.js / Express", level: 88 },
      { name: "FastAPI / Django", level: 80 },
      { name: "RAG Pipelines", level: 82 },
      { name: "n8n Workflows", level: 78 },
      { name: "Google Gemini LLM", level: 83 },
    ],
  },
  {
    category: "Data & Infra",
    color: "var(--color-orange)",
    items: [
      { name: "PostgreSQL", level: 85 },
      { name: "Redis", level: 78 },
      { name: "MongoDB / Firebase", level: 80 },
      { name: "Pinecone / ChromaDB", level: 75 },
      { name: "Docker", level: 76 },
      { name: "Cube.js Analytics", level: 80 },
    ],
  },
  {
    category: "Tools & More",
    color: "var(--color-grey)",
    items: [
      { name: "Git / GitHub", level: 92 },
      { name: "TensorFlow / Keras", level: 78 },
      { name: "Stripe Integration", level: 82 },
      { name: "Twilio / WhatsApp API", level: 80 },
      { name: "Cursor / Claude Code", level: 88 },
      { name: "Figma", level: 75 },
    ],
  },
];

const marqueeWords = [
  "React", "TypeScript", "LangChain", "Next.js", "FastAPI",
  "RAG", "Redis", "PostgreSQL", "Docker", "TensorFlow",
  "React Native", "LangGraph", "Stripe", "Node.js", "Gemini",
];

export function Skills() {
  const [activeGroup, setActiveGroup] = useState(0);

  return (
    <section id="skills" className="relative overflow-hidden py-40 px-8">
      {/* top divider */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex items-center gap-4"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-blue">
            04 — Skills
          </span>
          <div className="h-px flex-1 bg-dark-blue-ui/50 max-w-xs" />
        </motion.div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-[clamp(40px,6vw,80px)] font-black leading-[0.92] tracking-tight text-foreground"
        >
          Technical
          <br />
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1px rgba(245,244,223,0.13)" }}
          >
            Arsenal
          </span>
        </motion.h2>

        {/* Tab selector */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 flex flex-wrap gap-2"
        >
          {skillGroups.map((g, i) => (
            <button
              key={g.category}
              onClick={() => setActiveGroup(i)}
              className="relative px-5 py-2.5 font-mono text-xs uppercase tracking-widest transition-all duration-300"
              style={{
                color: activeGroup === i ? "#000" : "rgba(245,244,223,0.4)",
                clipPath:
                  "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
                background:
                  activeGroup === i ? g.color : "rgba(245,244,223,0.03)",
                border: activeGroup === i ? "none" : "1px solid rgba(245,244,223,0.06)",
              }}
            >
              {g.category}
            </button>
          ))}
        </motion.div>

        {/* Skill bars panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGroup}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {skillGroups[activeGroup].items.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group border border-white/5 bg-white/[0.015] p-5 transition-colors duration-300 hover:border-dark-blue-ui/50"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-mono text-xs text-foreground/70 group-hover:text-foreground transition-colors duration-300">
                    {skill.name}
                  </span>
                  <span
                    className="font-mono text-[10px]"
                    style={{ color: skillGroups[activeGroup].color }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div className="h-[2px] w-full bg-dark-blue-ui/50">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.9, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full"
                    style={{
                      background: `linear-gradient(90deg, ${skillGroups[activeGroup].color}, ${skillGroups[activeGroup].color}80)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Marquee */}
        <div className="relative mt-24 overflow-hidden border-t border-b border-dark-blue-ui/50 py-6">
          <div className="flex gap-12 whitespace-nowrap"
            style={{ animation: "marquee 28s linear infinite" }}
          >
            {[...marqueeWords, ...marqueeWords].map((word, i) => (
              <span
                key={i}
                className="flex items-center gap-12 font-mono text-xs uppercase tracking-[0.3em] text-foreground/20"
              >
                {word}
                <span className="text-blue/30">◆</span>
              </span>
            ))}
          </div>
          <style>{`
            @keyframes marquee {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}