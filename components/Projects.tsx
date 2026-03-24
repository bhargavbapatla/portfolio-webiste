"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Github, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    num: "01",
    title: "Pantry Pilot",
    category: "Full-Stack SaaS · AI",
    description:
      "A full-stack monorepo SaaS platform for home-based bakery businesses to manage inventory, orders, and fulfillment. Features Sous Chef AI — an agentic voice assistant powered by Google Gemini LLM & ElevenLabs TTS that executes live DB transactions through natural language.",
    tags: ["React.js", "TypeScript", "Node.js", "PostgreSQL", "Gemini LLM", "ElevenLabs"],
    colorRaw: "#007ae5",
    videoSrc: "/pantryPilot_video.mp4",
    link: "https://pantry-pilot-nine.vercel.app/",
    github: "https://github.com/bhargavbapatla/PantryPilot",
  },
  {
    num: "02",
    title: "Nutricore",
    category: "Multi-Agent AI · HealthTech",
    description:
      "Engineered a stateful, multi-agent AI nutrition system using LangGraph and FastAPI. Orchestrates 6 specialized agents for personalized meal planning, leveraging Qdrant for RAG with medical databases and strict Pydantic validation for seamless React frontend sync.",
    tags: ["React.js", "FastAPI", "PostgreSQL", "LangGraph", "Ollama", "Qdrant"],
    colorRaw: "#10b981",
    videoSrc: "/NutriCore.mp4",
    link: "https://nutri-core-omega.vercel.app/",
    github: "https://github.com/bhargavbapatla/NutriCore",
  },
  {
    num: "03",
    title: "Image Classification",
    videoSrc: undefined,
    category: "ML Research · Computer Vision",
    description:
      "Achieved 89.87% accuracy on CIFAR-100 (100-class dataset) by implementing a custom CNN and benchmarking it against a fine-tuned Vision Transformer (ViT). Applied self-attention mechanisms from NLP to image classification for long-range dependency modeling.",
    tags: ["TensorFlow", "Keras", "ViT", "NumPy", "CIFAR-100", "Python"],
    colorRaw: "#eb6110",
    link: "#",
    github: "#",
  },
];

/* ── Per-project mockup visuals ─────────────────────────────── */
function VideoMockup({ src }: { src: string }) {
  return (
    <video
      src={src}
      autoPlay
      muted
      loop
      playsInline
      className="h-full w-full object-cover"
    />
  );
}


function MLMockup({ color }: { color: string }) {
  const nodes = [
    { cx: "15%", cy: "50%" }, // input
    { cx: "38%", cy: "25%" }, { cx: "38%", cy: "50%" }, { cx: "38%", cy: "75%" }, // hidden 1
    { cx: "62%", cy: "35%" }, { cx: "62%", cy: "65%" }, // hidden 2
    { cx: "85%", cy: "50%" }, // output
  ];
  const edges = [
    [0, 1], [0, 2], [0, 3],
    [1, 4], [1, 5], [2, 4], [2, 5], [3, 4], [3, 5],
    [4, 6], [5, 6],
  ];

  return (
    <div className="relative flex h-full flex-col p-4">
      {/* Accuracy badge */}
      <div className="mb-3 flex items-center gap-2">
        <div className="h-2 w-2 rounded-full" style={{ background: color }} />
        <span className="font-mono text-[10px] text-white/30 tracking-widest">CIFAR-100 · 89.87% ACC</span>
      </div>
      {/* Neural net SVG */}
      <div className="relative flex-1">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid meet">
          {edges.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a].cx} y1={nodes[a].cy}
              x2={nodes[b].cx} y2={nodes[b].cy}
              stroke={color} strokeWidth="0.5" opacity="0.25"
            />
          ))}
          {nodes.map((n, i) => (
            <circle
              key={i}
              cx={n.cx} cy={n.cy} r="4"
              fill={color}
              opacity={i === 0 || i === nodes.length - 1 ? 0.8 : 0.4}
            />
          ))}
        </svg>
      </div>
      {/* Progress bars */}
      <div className="mt-2 flex flex-col gap-1.5">
        {[["ViT (fine-tuned)", 89], ["Custom CNN", 74]].map(([label, val]) => (
          <div key={String(label)} className="flex items-center gap-2">
            <span className="w-24 font-mono text-[8px] text-white/25">{label}</span>
            <div className="flex-1 overflow-hidden rounded-full" style={{ background: `${color}15`, height: "4px" }}>
              <div style={{ width: `${val}%`, background: color, height: "100%", borderRadius: "9999px" }} />
            </div>
            <span className="font-mono text-[8px]" style={{ color }}>{val}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}


/* ── Circular visit cursor ──────────────────────────────────── */
function CircularCursor({ visible, x, y }: { visible: boolean; x: number; y: number }) {
  return (
    <div
      className="pointer-events-none fixed z-[999] -translate-x-1/2 -translate-y-1/2"
      style={{
        left: x,
        top: y,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.25s ease",
      }}
    >
      {/* Rotating text ring */}
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        style={{ animation: "spin 9s linear infinite" }}
      >
        <defs>
          <path
            id="cursorCircle"
            d="M 60 60 m -44 0 a 44 44 0 1 1 88 0 a 44 44 0 1 1 -88 0"
          />
        </defs>
        <text
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "9px",
            fill: "rgba(245,244,223,0.85)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          <textPath href="#cursorCircle">OPEN PROJECT • OPEN PROJECT •</textPath>
        </text>
      </svg>
      {/* Center arrow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm ring-1 ring-white/20">
          <ArrowUpRight className="h-4 w-4 text-white" />
        </div>
      </div>
    </div>
  );
}

/* ── Component ──────────────────────────────────────────────── */
export function Projects() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [cursor, setCursor] = useState({ visible: false, x: 0, y: 0 });

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const n = projects.length;

      const panels = gsap.utils.toArray<HTMLElement>(".proj-panel", wrapper);
      const contentPanels = gsap.utils.toArray<HTMLElement>(".proj-content", wrapper);
      const imagePanels = gsap.utils.toArray<HTMLElement>(".proj-image", wrapper);
      const dots = gsap.utils.toArray<HTMLElement>(".ind-dot", wrapper);
      const nums = gsap.utils.toArray<HTMLElement>(".ind-num", wrapper);
      const fillEl = wrapper.querySelector<HTMLElement>(".ind-fill");

      /* Initial state — Explicitly lift the first panel using zIndex and autoAlpha */
      panels.forEach((el, i) => {
        gsap.set(el, {
          pointerEvents: i === 0 ? "auto" : "none",
          zIndex: i === 0 ? 10 : 1 // Active panel stays physically on top
        });
      });
      contentPanels.forEach((el, i) => {
        // autoAlpha handles both opacity and visibility: hidden
        gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, y: i === 0 ? 0 : 80 });
      });
      imagePanels.forEach((el, i) => {
        gsap.set(el, { autoAlpha: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.94 });
      });
      gsap.set(dots[0], { backgroundColor: projects[0].colorRaw, scale: 1.6 });
      if (fillEl) gsap.set(fillEl, { height: "0%" });

      /* Master scrub timeline */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.4,
        },
      });

      for (let i = 0; i < n - 1; i++) {
        const outStart = i + 0.3;
        const inStart = i + 0.55;
        const fillPct = ((i + 1) / (n - 1)) * 100;

        // out - shift inactive panels to the back
        tl.to(contentPanels[i], { autoAlpha: 0, y: -80, duration: 0.3 }, outStart);
        tl.to(imagePanels[i], { autoAlpha: 0, scale: 1.04, duration: 0.25 }, outStart);
        tl.set(panels[i], { pointerEvents: "none", zIndex: 1 }, outStart);

        // fill + dot
        if (fillEl) {
          tl.to(fillEl, { height: `${fillPct}%`, duration: 0.35, ease: "power2.inOut" }, outStart);
        }
        tl.to(dots[i], { scale: 0.8, opacity: 0.4, duration: 0.25 }, outStart);
        tl.to(nums[i], { opacity: 0.2, duration: 0.25 }, outStart);
        tl.to(dots[i + 1], { backgroundColor: projects[i + 1].colorRaw, scale: 1.6, duration: 0.3 }, inStart);
        tl.to(nums[i + 1], { opacity: 1, color: projects[i + 1].colorRaw, duration: 0.3 }, inStart);

        // in - pull active panel to the front
        tl.set(panels[i + 1], { pointerEvents: "auto", zIndex: 10 }, inStart);
        tl.to(contentPanels[i + 1], { autoAlpha: 1, y: 0, duration: 0.35 }, inStart);
        tl.to(imagePanels[i + 1], { autoAlpha: 1, scale: 1, duration: 0.35 }, inStart);

        // padding dwell at end of each project
        tl.to({}, { duration: 0.3 }, i + 1);
      }

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: wrapperRef }
  );

  /* Indicator track height = gap between first and last dot */
  const DOT_GAP = 72; // px between dots
  const trackH = (projects.length - 1) * DOT_GAP;

  return (
    /* Scroll space: one viewport per project */
    <div
      ref={wrapperRef}
      id="projects"
      style={{ height: `${projects.length * 100}vh` }}
    >
      <CircularCursor visible={cursor.visible} x={cursor.x} y={cursor.y} />
      {/* ── Sticky viewport ──────────────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">

        {/* Ambient separator */}
        <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* ── Section header ── */}
        <div className="absolute left-24 top-14 z-20">
          <div className="mb-3 flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue">
              03 — Work
            </span>
            <div className="h-px w-16 bg-dark-blue-ui/50" />
          </div>
          <h2 className="text-[clamp(32px,4.5vw,64px)] font-black leading-[0.92] tracking-tight">
            Selected
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px rgba(245,244,223,0.12)" }}
            >
              Projects
            </span>
          </h2>
        </div>

        {/* ── Lateral pin indicator ── */}
        <div className="absolute left-8 top-1/2 z-20 -translate-y-1/2">
          <div className="relative flex flex-col items-center" style={{ height: `${trackH + 8}px` }}>

            {/* Background track */}
            <div
              className="absolute left-[3px] top-[4px] w-px"
              style={{ height: `${trackH}px`, background: "rgba(245,244,223,0.08)" }}
            />

            {/* Animated fill */}
            <div
              className="ind-fill absolute left-[3px] top-[4px] w-px origin-top"
              style={{ height: "0%", maxHeight: `${trackH}px`, background: projects[0].colorRaw, transition: "background 0.3s" }}
            />

            {/* Dots + numbers */}
            {projects.map((p, i) => (
              <div
                key={i}
                className="relative z-10 flex items-center gap-3"
                style={{ marginBottom: i < projects.length - 1 ? `${DOT_GAP - 8}px` : 0 }}
              >
                <div
                  className="ind-dot h-[7px] w-[7px] rounded-full"
                  style={{
                    backgroundColor: i === 0 ? p.colorRaw : "rgba(245,244,223,0.18)",
                    transform: i === 0 ? "scale(1.6)" : "scale(1)",
                  }}
                />
                <span
                  className="ind-num font-mono text-[9px] uppercase tracking-widest"
                  style={{
                    color: i === 0 ? p.colorRaw : "rgba(245,244,223,0.2)",
                    opacity: i === 0 ? 1 : 0.4,
                  }}
                >
                  {p.num}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Project panels ── */}
        {projects.map((p) => {
          return (
            <div key={p.title} className="proj-panel absolute inset-0 grid grid-cols-2">

              {/* Left — content */}
              <div className="proj-content flex flex-col justify-center pl-24 pr-12 pt-28">
                <span
                  className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em]"
                  style={{ color: p.colorRaw }}
                >
                  {p.category}
                </span>

                <h3 className="mb-6 font-display text-[clamp(36px,3.8vw,60px)] font-black leading-[1.0] tracking-tight text-foreground">
                  {p.title}
                </h3>

                <p className="mb-8 max-w-md font-mono text-xs leading-[2] text-foreground/50">
                  {p.description}
                </p>

                <div className="mb-10 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="border border-dark-blue-ui/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-8">
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/lnk flex cursor-pointer items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground/40 transition-colors duration-200 hover:text-foreground"
                    style={{ ["--hover-color" as string]: p.colorRaw }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = p.colorRaw)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    Live
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/lnk:-translate-y-0.5 group-hover/lnk:translate-x-0.5" />
                  </a>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/lnk flex cursor-pointer items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground/40 transition-colors duration-200 hover:text-foreground"
                    onMouseEnter={(e) => (e.currentTarget.style.color = p.colorRaw)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                  >
                    GitHub
                    <Github className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Right — mockup */}
              <div
                className="proj-image relative flex items-center justify-center overflow-hidden cursor-none"
                onMouseMove={(e) => setCursor({ visible: true, x: e.clientX, y: e.clientY })}
                onMouseLeave={() => setCursor((s) => ({ ...s, visible: false }))}
              >
                {/* Radial ambient */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 70% 70% at 60% 50%, ${p.colorRaw}18 0%, transparent 70%)`,
                  }}
                />

                {/* Mockup window — clicks open live link */}
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 block w-[92%] overflow-hidden rounded-sm border transition-all duration-300 hover:border-opacity-60"
                  style={{
                    borderColor: `${p.colorRaw}30`,
                    background: `linear-gradient(160deg, #0e1620 0%, ${p.colorRaw}0a 100%)`,
                    aspectRatio: "16/9",
                  }}
                >
                  {/* Browser chrome */}
                  <div
                    className="flex items-center gap-1.5 border-b px-4 py-3"
                    style={{ borderColor: `${p.colorRaw}20`, background: `${p.colorRaw}08` }}
                  >
                    <span className="h-2 w-2 rounded-full bg-red-500/50" />
                    <span className="h-2 w-2 rounded-full bg-yellow-500/50" />
                    <span className="h-2 w-2 rounded-full bg-green-500/50" />
                    <div
                      className="mx-3 flex h-5 flex-1 items-center rounded-full px-3"
                      style={{ background: `${p.colorRaw}10` }}
                    >
                      <span className="font-mono text-[8px] text-white/20">
                        {p.title.toLowerCase().replace(/\s+/g, "-")}.app
                      </span>
                    </div>
                  </div>

                  {/* Dynamic mockup content */}
                  {p.videoSrc
                    ? <VideoMockup src={p.videoSrc} />
                    : <MLMockup color={p.colorRaw} />
                  }
                </a>

                {/* Corner label */}
                <div className="absolute bottom-8 right-8 text-right">
                  <span
                    className="font-display text-[80px] font-black leading-none"
                    style={{ color: `${p.colorRaw}10` }}
                  >
                    {p.num}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
