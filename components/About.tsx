"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const facts = [
  { label: "Location", value: "Pune, India" },
  { label: "Education", value: "B.Tech · VIIT" },
  { label: "Focus", value: "React · AI · TypeScript" },
  { label: "Availability", value: "Open to roles", accent: true },
];

const codeLines = [
  { text: "// core philosophy", dim: false, comment: true },
  { text: "const engineer = {", dim: false },
  { text: '  craft:      "pixel-perfect",', dim: true },
  { text: '  obsession:  "60fps always",', dim: true },
  { text: '  approach:   "design-first",', dim: true },
  { text: '  goal:       "unforgettable",', dim: true },
  { text: "};", dim: false },
  { text: "", dim: false },
  { text: "export default engineer;", dim: false, accent: true },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-40 px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-64 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-violet-500/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20 flex items-center gap-4"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#00ffaa]">
            01 — About
          </span>
          <div className="h-px flex-1 bg-white/5 max-w-xs" />
        </motion.div>

        <div className="grid gap-24 lg:grid-cols-[1fr_420px] lg:items-start">
          {/* Left — text */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(40px,6vw,80px)] font-black leading-[0.95] tracking-tight text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              I Build What
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}
              >
                Others
              </span>{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, #00ffaa, #7b5cff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Imagine
              </span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-10 space-y-5"
            >
              {[
                "I'm a Software Engineer with 3+ years of experience architecting scalable applications powered by modern frameworks and Generative AI. I bridge frontend precision with AI engineering.",
                "At Invimatic Technologies, I spearheaded a Low-Code/No-Code SaaS platform in React + TypeScript, built real-time chat via Redis & Webhooks cutting server load by 60%, and engineered a Cube.js analytics pipeline that saved 800ms per query.",
                "When I'm not shipping features, I'm building agentic AI systems, exploring RAG pipelines, and contributing to projects that push what's possible in the browser.",
              ].map((p, i) => (
                <p
                  key={i}
                  className="font-mono text-sm leading-[2] text-white/40"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {p}
                </p>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-16 grid grid-cols-3 gap-0 border border-white/5"
            >
              {[
                { num: "3+", label: "Years" },
                { num: "10+", label: "Projects" },
                { num: "60%", label: "Perf ↑" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`px-8 py-6 ${i < 2 ? "border-r border-white/5" : ""}`}
                >
                  <div
                    className="text-4xl font-black text-white"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {s.num}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — card stack */}
          <div className="flex flex-col gap-4">
            {/* Code card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              style={{ x }}
              className="relative overflow-hidden border border-white/8 bg-[#0d0d12]"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
              }}
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-white/5 px-5 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                <span className="ml-4 font-mono text-[10px] tracking-widest text-white/20 uppercase">
                  engineer.ts
                </span>
              </div>
              <div className="p-6 font-mono text-sm leading-7">
                {codeLines.map((line, i) => (
                  <div key={i}>
                    {line.comment ? (
                      <span className="text-white/25 italic">{line.text}</span>
                    ) : line.accent ? (
                      <span className="text-[#00ffaa]">{line.text}</span>
                    ) : line.dim ? (
                      <span className="text-white/40">{line.text}</span>
                    ) : (
                      <span className="text-white/70">{line.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick facts card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="border border-white/5 bg-white/[0.015] p-6"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
              }}
            >
              <div className="mb-4 font-mono text-[10px] tracking-[0.3em] uppercase text-white/25">
                // quick_facts
              </div>
              <ul className="space-y-0 divide-y divide-white/5">
                {facts.map((f) => (
                  <li
                    key={f.label}
                    className="flex items-center justify-between py-3"
                  >
                    <span className="font-mono text-xs text-white/30 uppercase tracking-wider">
                      {f.label}
                    </span>
                    <span
                      className={`font-mono text-xs ${f.accent ? "text-[#00ffaa]" : "text-white/70"
                        }`}
                    >
                      {f.value}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}