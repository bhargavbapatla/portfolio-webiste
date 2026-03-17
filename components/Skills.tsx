"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Inline SVG Icons ── */
const icons: Record<string, React.ReactNode> = {
  React: <svg viewBox="0 0 40 40" fill="none" className="h-9 w-9"><circle cx="20" cy="20" r="3.5" fill="#61DAFB" /><ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" /><ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 20 20)" /><ellipse cx="20" cy="20" rx="17" ry="6.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 20 20)" /></svg>,
  TypeScript: <svg viewBox="0 0 40 40" className="h-9 w-9"><rect width="40" height="40" rx="5" fill="#3178C6" /><text x="7" y="28" fontFamily="monospace" fontWeight="bold" fontSize="16" fill="white">TS</text></svg>,
  "Next.js": <svg viewBox="0 0 40 40" className="h-9 w-9"><circle cx="20" cy="20" r="18" fill="#000" /><text x="9" y="27" fontFamily="serif" fontWeight="bold" fontSize="18" fill="white">N</text></svg>,
  "Node.js": <svg viewBox="0 0 40 40" className="h-9 w-9"><polygon points="20,3 37,12.5 37,27.5 20,37 3,27.5 3,12.5" fill="#539E43" /><text x="12" y="26" fontFamily="monospace" fontWeight="bold" fontSize="11" fill="white">JS</text></svg>,
  Python: <svg viewBox="0 0 40 40" className="h-9 w-9"><path d="M20 4c-4 0-7 1.5-7 4v4h7v1H10c-2.5 0-5 2-5 7s2.5 7 5 7h3v-4c0-2 1.5-3.5 7-3.5s7 1.5 7 3.5v3.5h3c2.5 0 5-2 5-7s-2.5-7-5-7H27V8c0-2.5-3-4-7-4z" fill="#3670A0" /><path d="M20 36c4 0 7-1.5 7-4v-4h-7v-1h10c2.5 0 5-2 5-7h-8v4c0 2-1.5 3.5-7 3.5S13 26.5 13 24.5V21h-3c-2.5 0-5 2-5 7s2.5 7 5 7h10z" fill="#FFD43B" /><circle cx="15.5" cy="9.5" r="1.5" fill="white" /><circle cx="24.5" cy="30.5" r="1.5" fill="white" /></svg>,
  LangChain: <svg viewBox="0 0 40 40" className="h-9 w-9"><rect width="40" height="40" rx="7" fill="#1a1a2e" /><path d="M10 20h5l3-6 4 12 3-6h5" stroke="#a78bfa" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  FastAPI: <svg viewBox="0 0 40 40" className="h-9 w-9"><circle cx="20" cy="20" r="18" fill="#059669" /><path d="M21 8l-9 13h8l-1 11 9-13h-8z" fill="white" /></svg>,
  PostgreSQL: <svg viewBox="0 0 40 40" className="h-9 w-9"><ellipse cx="20" cy="13" rx="13" ry="8" fill="#336791" /><path d="M7 13v14c0 4.4 5.8 8 13 8s13-3.6 13-8V13" fill="#336791" /><ellipse cx="20" cy="13" rx="13" ry="8" fill="#4A90D9" opacity="0.5" /></svg>,
  MongoDB: <svg viewBox="0 0 40 40" className="h-9 w-9"><path d="M20 4c0 0-9 10-9 18a9 9 0 0018 0C29 14 20 4 20 4z" fill="#47A248" /><path d="M20 4v32" stroke="#A8D5A2" strokeWidth="1.5" /></svg>,
  Redis: <svg viewBox="0 0 40 40" className="h-9 w-9"><ellipse cx="20" cy="28" rx="16" ry="6" fill="#A41E11" /><ellipse cx="20" cy="22" rx="16" ry="6" fill="#D82C20" /><ellipse cx="20" cy="16" rx="16" ry="6" fill="#FF4438" /></svg>,
  Docker: <svg viewBox="0 0 40 40" className="h-9 w-9"><rect x="4" y="16" width="6" height="5" rx="1" fill="#2496ED" /><rect x="11" y="16" width="6" height="5" rx="1" fill="#2496ED" /><rect x="18" y="16" width="6" height="5" rx="1" fill="#2496ED" /><rect x="11" y="10" width="6" height="5" rx="1" fill="#2496ED" /><rect x="18" y="10" width="6" height="5" rx="1" fill="#2496ED" /><path d="M4 22c0 5 4 9 9 9h10c6 0 10-4 10-9" stroke="#2496ED" strokeWidth="1.5" fill="none" /></svg>,
  TensorFlow: <svg viewBox="0 0 40 40" className="h-9 w-9"><path d="M20 4L4 13v14l16 9 16-9V13L20 4z" fill="#FF6F00" opacity="0.15" /><path d="M20 4v32M4 13l16 9 16-9" stroke="#FF6F00" strokeWidth="1.8" fill="none" /><circle cx="20" cy="20" r="3" fill="#FF6F00" /></svg>,
  Pinecone: <svg viewBox="0 0 40 40" className="h-9 w-9"><rect width="40" height="40" rx="7" fill="#e8e4f0" /><path d="M20 8l5 8-5 2-5-2 5-8z" fill="#00C4A0" /><path d="M15 16l-4 8h18l-4-8" fill="#00C4A0" opacity="0.6" /><ellipse cx="20" cy="28" rx="7" ry="4" fill="#00C4A0" opacity="0.4" /></svg>,
  Stripe: <svg viewBox="0 0 40 40" className="h-9 w-9"><rect width="40" height="40" rx="7" fill="#635BFF" /><path d="M18 15c0-1.5 1.3-2 2.8-2 2.5 0 5 .8 6.7 1.8v-5C25.5 8.7 23 8 20.8 8 15.3 8 12 10.7 12 15.2c0 6.8 9.5 5.7 9.5 8.6 0 1.7-1.5 2.2-3.2 2.2-2.7 0-5.5-1-7.8-2.5v5.2C12.5 30.2 15.5 31 18.3 31c5.7 0 9.2-2.7 9.2-7.2C27.5 16.5 18 17.8 18 15z" fill="white" /></svg>,
  Tailwind: <svg viewBox="0 0 40 40" className="h-9 w-9"><path d="M20 10c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.14.285 1.955 1.113 2.858 2.028C22.05 17.29 23.663 19 27 19c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.14-.285-1.955-1.113-2.858-2.028C24.95 11.71 23.337 10 20 10zM13 19c-4 0-6.5 2-7.5 6 1.5-2 3.25-2.75 5.25-2.25 1.14.285 1.955 1.113 2.858 2.028C15.05 26.29 16.663 28 20 28c4 0 6.5-2 7.5-6-1.5 2-3.25 2.75-5.25 2.25-1.14-.285-1.955-1.113-2.858-2.028C17.95 20.71 16.337 19 13 19z" fill="#38BDF8" /></svg>,
  LangGraph: <svg viewBox="0 0 40 40" className="h-9 w-9"><rect width="40" height="40" rx="7" fill="#f0edf8" /><circle cx="10" cy="20" r="3" fill="#a78bfa" /><circle cx="20" cy="10" r="3" fill="#7b5cff" /><circle cx="30" cy="20" r="3" fill="#a78bfa" /><circle cx="20" cy="30" r="3" fill="#7b5cff" /><path d="M13 20h14M20 13v14" stroke="rgba(167,139,250,0.5)" strokeWidth="1.5" /></svg>,
  Git: <svg viewBox="0 0 40 40" className="h-9 w-9"><path d="M37.5 18.3L21.7 2.5a2.4 2.4 0 00-3.4 0L15 5.8l4.3 4.3a2.9 2.9 0 013.6 3.7l4.1 4.1a2.9 2.9 0 11-1.7 1.7l-3.8-3.8v9.9a2.9 2.9 0 11-2.4 0V15.4a2.9 2.9 0 01-1.6-3.8L13.2 7.3 2.5 18a2.4 2.4 0 000 3.4l15.8 15.8a2.4 2.4 0 003.4 0l15.8-15.8a2.4 2.4 0 000-3.1z" fill="#F05033" /></svg>,
  "Framer Motion": <svg viewBox="0 0 40 40" className="h-9 w-9"><path d="M8 8h24v12H20L8 8z" fill="#BB4CEC" /><path d="M8 20h12l12 12H8V20z" fill="#BB4CEC" opacity="0.6" /><path d="M20 20l12-12v12H20z" fill="#BB4CEC" opacity="0.3" /></svg>,
  n8n: <svg viewBox="0 0 40 40" className="h-9 w-9"><rect width="40" height="40" rx="7" fill="#EA4B71" /><text x="7" y="27" fontFamily="monospace" fontWeight="bold" fontSize="14" fill="white">n8n</text></svg>,
  "Cursor / AI": <svg viewBox="0 0 40 40" className="h-9 w-9"><rect width="40" height="40" rx="7" fill="#f0edf8" /><path d="M12 14l8 6-8 6V14z" fill="#7b5cff" /><rect x="22" y="26" width="8" height="2.5" rx="1" fill="#a78bfa" opacity="0.5" /></svg>,
};

const categories = [
  { label: "All", skills: ["React", "TypeScript", "Next.js", "Tailwind", "Framer Motion", "Node.js", "FastAPI", "LangChain", "LangGraph", "n8n", "Python", "TensorFlow", "PostgreSQL", "MongoDB", "Redis", "Pinecone", "Docker", "Stripe", "Git", "Cursor / AI"] },
  { label: "Frontend", skills: ["React", "TypeScript", "Next.js", "Tailwind", "Framer Motion"] },
  { label: "AI & LLM", skills: ["LangChain", "LangGraph", "n8n", "Python", "TensorFlow", "Pinecone"] },
  { label: "Backend", skills: ["Node.js", "FastAPI", "PostgreSQL", "MongoDB", "Redis", "Stripe"] },
  { label: "Infra", skills: ["Docker", "Git", "Cursor / AI"] },
];

const marqueeWords = ["React", "TypeScript", "LangChain", "Next.js", "FastAPI", "PostgreSQL", "Docker", "TensorFlow", "LangGraph", "Stripe", "Node.js", "Pinecone", "Redis", "Python", "Framer Motion"];

export function Skills() {
  const [active, setActive] = useState("All");
  const skills = categories.find((c) => c.label === active)?.skills ?? [];

  return (
    <section id="skills" className="py-32 px-8" style={{ background: "#f5f2ee" }}>
      <div className="mx-auto max-w-7xl">

        {/* Header row */}
        <div className="flex items-baseline justify-between border-b border-black/10 pb-6 mb-16">
          <span className="mono text-[11px] tracking-[0.25em] uppercase text-black/35">04 — Skills</span>
          <span className="sans text-[13px] text-black/35">Technical Toolkit</span>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row lg:gap-20 lg:items-start">
          {/* Left heading */}
          <div className="lg:w-72 shrink-0">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="serif text-[clamp(36px,4vw,56px)] font-black leading-[1.0] tracking-tight text-black"
            >
              What I<br />
              <em className="italic">build</em><br />
              with.
            </motion.h2>

            {/* Filter tabs — vertical on desktop */}
            <div className="mt-10 flex flex-row lg:flex-col flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.label}
                  onClick={() => setActive(cat.label)}
                  className="text-left px-4 py-2 sans text-[12px] font-medium tracking-wide border transition-all duration-200"
                  style={{
                    borderRadius: "2px",
                    background: active === cat.label ? "#0a0a0a" : "transparent",
                    color: active === cat.label ? "#f5f2ee" : "rgba(10,10,10,0.4)",
                    borderColor: active === cat.label ? "#0a0a0a" : "rgba(10,10,10,0.12)",
                  }}
                >
                  {cat.label}
                  <span className="ml-2 mono text-[10px] opacity-50">
                    {categories.find(c => c.label === cat.label)?.skills.length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right grid */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28 }}
                className="grid border border-black/10"
                style={{ gridTemplateColumns: "repeat(auto-fill, minmax(130px,1fr))", borderRadius: "4px", overflow: "hidden" }}
              >
                {skills.map((name, i) => (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    className="group flex flex-col items-center justify-center gap-3 p-6 cursor-default transition-all duration-200 hover:bg-[#edeae5]"
                    style={{
                      borderRight: "1px solid rgba(10,10,10,0.08)",
                      borderBottom: "1px solid rgba(10,10,10,0.08)",
                    }}
                  >
                    <div className="transition-transform duration-200 group-hover:-translate-y-0.5">
                      {icons[name] ?? (
                        <div className="h-9 w-9 flex items-center justify-center border border-black/12 mono text-[10px] font-bold text-black/40" style={{ borderRadius: "4px" }}>
                          {name.slice(0, 2).toUpperCase()}
                        </div>
                      )}
                    </div>
                    <span className="sans text-[11px] font-medium text-black/50 transition-colors duration-200 group-hover:text-black/80 text-center leading-tight">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Marquee */}
        <div className="mt-20 overflow-hidden border-t border-b border-black/8 py-4">
          <div className="flex gap-12 whitespace-nowrap animate-marquee">
            {[...marqueeWords, ...marqueeWords].map((w, i) => (
              <span key={i} className="flex items-center gap-12 mono text-[11px] tracking-[0.25em] uppercase text-black/18">
                {w}<span className="text-black/15">·</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}