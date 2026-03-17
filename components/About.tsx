"use client";

import { motion } from "framer-motion";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export function About() {
  return (
    <section id="about" className="relative py-32 px-8" style={{ background: "#f5f2ee" }}>
      {/* Top rule */}
      <div className="mx-auto max-w-7xl">

        {/* Header row */}
        <div className="flex items-baseline justify-between border-b border-black/10 pb-6 mb-16">
          <span className="mono text-[11px] tracking-[0.25em] uppercase text-black/35">01 — About</span>
          <span className="sans text-[13px] text-black/35">Software Engineer</span>
        </div>

        {/* Main grid */}
        <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">

          {/* Left — big serif pull quote */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }} variants={reveal}
          >
            <h2 className="serif text-[clamp(36px,5vw,64px)] font-black leading-[1.05] tracking-tight text-black">
              Engineer who<br />
              <em className="italic">thinks</em> in<br />
              systems.
            </h2>

            <div className="mt-10 space-y-5 max-w-md">
              {[
                "3+ years architecting scalable applications powered by React, TypeScript, and Generative AI. I bridge frontend precision with deep backend and AI engineering.",
                "At Invimatic Technologies I spearheaded a Low-Code/No-Code SaaS platform, built real-time systems via Redis & Webhooks — cutting server load by 60% — and engineered a Cube.js analytics pipeline saving 800ms per query.",
                "Currently exploring agentic AI systems, RAG pipelines, and the next generation of human-computer interfaces.",
              ].map((p, i) => (
                <p key={i} className="sans text-[15px] leading-relaxed text-black/55 font-light">{p}</p>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4">
              <a
                href="#contact"
                className="flex items-center gap-2 bg-[#0a0a0a] text-[#f5f2ee] px-6 py-3 sans text-[12px] font-medium tracking-wide hover:bg-black/80 transition-colors"
                style={{ borderRadius: "2px" }}
              >
                Work Together ↗
              </a>
              <a
                href="/resume.pdf"
                className="flex items-center gap-2 border border-black/15 px-6 py-3 sans text-[12px] font-medium text-black/55 hover:text-black hover:border-black/35 transition-all"
                style={{ borderRadius: "2px" }}
              >
                Resume PDF
              </a>
            </div>
          </motion.div>

          {/* Right — info cards */}
          <motion.div
            initial="hidden" whileInView="show" viewport={{ once: true }}
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            className="flex flex-col gap-0"
          >
            {/* Code snippet card */}
            <motion.div
              variants={reveal}
              className="border border-black/10 mb-4 overflow-hidden"
              style={{ borderRadius: "4px" }}
            >
              <div className="flex items-center justify-between px-5 py-3 border-b border-black/8" style={{ background: "#edeae5" }}>
                <span className="mono text-[10px] tracking-widest uppercase text-black/35">engineer.ts</span>
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-black/10" />
                  <div className="h-2.5 w-2.5 rounded-full bg-black/10" />
                  <div className="h-2.5 w-2.5 rounded-full bg-black/10" />
                </div>
              </div>
              <div className="p-5 mono text-[13px] leading-7" style={{ background: "#f8f6f2" }}>
                <div className="text-black/30 italic">// professional summary</div>
                <div className="text-black/70">const engineer = {"{"}</div>
                <div className="text-black/50 pl-4">stack:    <span className="text-black/70">"React · TS · AI"</span>,</div>
                <div className="text-black/50 pl-4">exp:      <span className="text-black/70">"3+ years"</span>,</div>
                <div className="text-black/50 pl-4">location: <span className="text-black/70">"Pune, India"</span>,</div>
                <div className="text-black/50 pl-4">status:   <span className="text-black/90 font-medium">"open to roles"</span>,</div>
                <div className="text-black/70">{"}"}</div>
                <div className="mt-1 text-black/80">export default engineer;</div>
              </div>
            </motion.div>

            {/* Stats grid */}
            <motion.div variants={reveal} className="grid grid-cols-3 border border-black/10" style={{ borderRadius: "4px" }}>
              {[
                { num: "3+", label: "Years" },
                { num: "10+", label: "Projects" },
                { num: "60%", label: "Perf ↑" },
              ].map((s, i) => (
                <div key={s.label} className="px-6 py-6" style={{ borderRight: i < 2 ? "1px solid rgba(10,10,10,0.1)" : "none" }}>
                  <div className="serif text-3xl font-black text-black">{s.num}</div>
                  <div className="mono text-[10px] uppercase tracking-[0.15em] text-black/35 mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Facts list */}
            <motion.div variants={reveal} className="mt-4 border border-black/10" style={{ borderRadius: "4px", background: "#f8f6f2" }}>
              {[
                { k: "Education", v: "B.Tech · VIIT Pune" },
                { k: "Current Role", v: "Open to Opportunities" },
                { k: "Focus", v: "React · TypeScript · AI" },
                { k: "Location", v: "Pune, India (Remote OK)" },
              ].map((f, i, arr) => (
                <div
                  key={f.k}
                  className="flex items-center justify-between px-5 py-4"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid rgba(10,10,10,0.08)" : "none" }}
                >
                  <span className="mono text-[11px] uppercase tracking-wider text-black/35">{f.k}</span>
                  <span className="sans text-[13px] text-black/75 font-medium">{f.v}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}