"use client";

import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const rows = [
  {
    id: "frontend",
    num: "01",
    label: "Frontend Engineering",
    color: "#007ae5",
    reverse: false,
    duration: 38,
    skills: [
      { name: "React.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Framer Motion", level: 82 },
      { name: "React Native", level: 80 },
    ],
  },
  {
    id: "ai",
    num: "02",
    label: "AI & Backend Systems",
    color: "#c9a8f0",
    reverse: true,
    duration: 44,
    skills: [
      { name: "LangChain", level: 85 },
      { name: "LangGraph", level: 82 },
      { name: "Node.js", level: 88 },
      { name: "FastAPI", level: 80 },
      { name: "RAG Pipelines", level: 82 },
      { name: "Google Gemini", level: 83 },
    ],
  },
  {
    id: "data",
    num: "03",
    label: "Data & Infrastructure",
    color: "#eb6110",
    reverse: false,
    duration: 34,
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "Redis", level: 78 },
      { name: "MongoDB", level: 80 },
      { name: "Pinecone", level: 75 },
      { name: "Docker", level: 76 },
      { name: "Cube.js", level: 80 },
    ],
  },
  {
    id: "tools",
    num: "04",
    label: "Tools & Ecosystem",
    color: "#94a3b8",
    reverse: true,
    duration: 40,
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "TensorFlow", level: 78 },
      { name: "Stripe API", level: 82 },
      { name: "Twilio / WAPI", level: 80 },
      { name: "Claude Code", level: 88 },
      { name: "Figma", level: 75 },
    ],
  },
];

const stats = [
  { value: "24", label: "Technologies" },
  { value: "4", label: "Domains" },
  { value: "5+", label: "Years Building" },
  { value: "60%", label: "Server Load Cut" },
];

export function Skills() {
  return (
    <section id="skills" className="relative overflow-hidden bg-background py-32 md:py-40">

      {/* CSS keyframes */}
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .ticker-track {
          display: flex;
          width: max-content;
          will-change: transform;
        }
        .ticker-track--normal  { animation: ticker linear infinite; }
        .ticker-track--reverse { animation: ticker linear infinite reverse; }
        .ticker-row:hover .ticker-track { animation-play-state: paused; }
      `}</style>

      {/* Top ambient rule */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── Section Header ─────────────────────────────────────────────────── */}
      <div className="px-6 pb-16 md:px-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-4 flex items-center gap-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue">
              04 — Skills
            </span>
            <div className="h-px w-16 bg-dark-blue-ui/50" />
          </motion.div>

          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: EASE }}
              className="text-[clamp(40px,6vw,80px)] font-black leading-[0.9] tracking-tight"
            >
              Technical
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px rgba(245,244,223,0.12)" }}
              >
                Stack.
              </span>
            </motion.h2>

            {/* Stat row — top right */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="flex shrink-0 gap-8 md:gap-10"
            >
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span className="font-display text-2xl font-black leading-none text-foreground md:text-3xl">
                    {s.value}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/30">
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Marquee Strips ──────────────────────────────────────────────────── */}
      <div className="flex flex-col">
        {rows.map((row, rowIndex) => (
          <motion.div
            key={row.id}
            initial={{ opacity: 0, x: row.reverse ? 48 : -48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.65, delay: rowIndex * 0.08, ease: EASE }}
            className="ticker-row relative overflow-hidden"
            style={{
              borderTop: `1px solid ${row.color}15`,
              borderBottom: rowIndex === rows.length - 1 ? `1px solid ${row.color}15` : "none",
            }}
          >
            {/* Scrolling track — duplicated 4× for seamless infinity */}
            <div
              className={`ticker-track ${row.reverse ? "ticker-track--reverse" : "ticker-track--normal"}`}
              style={{ animationDuration: `${row.duration}s` }}
            >
              {Array.from({ length: 4 }, (_, copyIndex) =>
                row.skills.map((skill, i) => (
                  <div
                    key={`${copyIndex}-${i}`}
                    className="mx-3 my-4 flex shrink-0 items-center gap-3 rounded-full border px-5 py-2.5 transition-colors duration-300 hover:border-opacity-60"
                    style={{
                      borderColor: `${row.color}22`,
                      backgroundColor: `${row.color}${Math.round(6 + (skill.level - 75) / 20 * 8).toString(16).padStart(2, "0")}`,
                    }}
                  >
                    {/* Colored dot — size proportional to proficiency */}
                    <div
                      className="rounded-full shrink-0"
                      style={{
                        width:  skill.level >= 90 ? "7px" : skill.level >= 80 ? "6px" : "5px",
                        height: skill.level >= 90 ? "7px" : skill.level >= 80 ? "6px" : "5px",
                        backgroundColor: row.color,
                        opacity: 0.7 + (skill.level - 75) / 100,
                      }}
                    />
                    <span
                      className="font-mono text-sm whitespace-nowrap"
                      style={{
                        color: `rgba(245,244,223,${0.45 + (skill.level - 75) / 100})`,
                      }}
                    >
                      {skill.name}
                    </span>
                    <span
                      className="font-mono text-[10px] tabular-nums"
                      style={{ color: `${row.color}55` }}
                    >
                      {skill.level}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Left label + fade */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 flex items-center pl-6 md:pl-12"
              style={{
                width: "clamp(100px, 28vw, 220px)",
                background: "linear-gradient(to right, var(--background) 60%, transparent)",
              }}
            >
              <div>
                <div
                  className="font-mono text-[9px] uppercase tracking-[0.35em]"
                  style={{ color: `${row.color}cc` }}
                >
                  {row.num}
                </div>
                <div className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/60">
                  {row.label}
                </div>
              </div>
            </div>

            {/* Right fade */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 md:w-32"
              style={{
                background: "linear-gradient(to left, var(--background) 40%, transparent)",
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* ── Bottom ambient rule ─────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
    </section>
  );
}
