"use client";

import { useRef } from "react";
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
    colorRaw: "#c9a8f0",
    link: "#",
    github: "#",
  },
  {
    num: "03",
    title: "Image Classification",
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
function PantryMockup({ color }: { color: string }) {
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      {/* Top bar */}
      <div className="flex items-center gap-3">
        <div className="h-7 w-28 rounded-sm" style={{ background: `${color}25` }} />
        <div className="ml-auto h-7 w-20 rounded-sm" style={{ background: `${color}15` }} />
      </div>
      {/* Stat cards */}
      <div className="grid grid-cols-3 gap-2 pt-1">
        {["Orders", "Inventory", "Revenue"].map((label) => (
          <div key={label} className="rounded-sm p-3" style={{ background: `${color}12` }}>
            <div className="mb-2 h-2 w-10 rounded-full" style={{ background: `${color}40` }} />
            <div className="h-5 w-14 rounded-sm" style={{ background: `${color}30` }} />
            <div className="mt-1 font-mono text-[8px] text-white/20 uppercase tracking-wider">{label}</div>
          </div>
        ))}
      </div>
      {/* Chat bubble — Sous Chef AI */}
      <div className="mt-auto flex items-end gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full text-[10px]" style={{ background: `${color}30` }}>
          AI
        </div>
        <div className="max-w-[70%] rounded-sm px-3 py-2 font-mono text-[9px] leading-relaxed text-white/40" style={{ background: `${color}15` }}>
          &quot;Added 12 croissants to Tuesday order&quot;
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-sm border px-3 py-2" style={{ borderColor: `${color}20` }}>
        <div className="h-2 flex-1 rounded-full" style={{ background: `${color}15` }} />
        <div className="h-5 w-5 rounded-sm" style={{ background: `${color}30` }} />
      </div>
    </div>
  );
}

function SaaSMockup({ color }: { color: string }) {
  return (
    <div className="flex h-full gap-2 p-4">
      {/* Sidebar */}
      <div className="flex w-10 flex-col gap-2 pt-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-7 w-7 rounded-sm" style={{ background: i === 1 ? `${color}35` : `${color}12` }} />
        ))}
      </div>
      {/* Canvas */}
      <div className="relative flex-1 rounded-sm" style={{ background: `${color}08` }}>
        {/* Component blocks */}
        {[
          { top: "15%", left: "10%", w: "40%", h: "22%" },
          { top: "15%", left: "55%", w: "35%", h: "14%" },
          { top: "48%", left: "10%", w: "25%", h: "30%" },
          { top: "48%", left: "40%", w: "50%", h: "30%" },
        ].map((box, i) => (
          <div
            key={i}
            className="absolute rounded-sm border"
            style={{
              top: box.top, left: box.left, width: box.w, height: box.h,
              borderColor: `${color}30`,
              background: `${color}${i === 0 ? "18" : "0c"}`,
            }}
          />
        ))}
        {/* Connection lines */}
        <svg className="absolute inset-0 h-full w-full" style={{ opacity: 0.3 }}>
          <line x1="30%" y1="37%" x2="30%" y2="48%" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
          <line x1="62%" y1="29%" x2="62%" y2="48%" stroke={color} strokeWidth="1" strokeDasharray="3 3" />
        </svg>
      </div>
    </div>
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
    [0,1],[0,2],[0,3],
    [1,4],[1,5],[2,4],[2,5],[3,4],[3,5],
    [4,6],[5,6],
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

const Mockups = [PantryMockup, SaaSMockup, MLMockup];

/* ── Component ──────────────────────────────────────────────── */
export function Projects() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const n = projects.length;

      const contentPanels = gsap.utils.toArray<HTMLElement>(".proj-content", wrapper);
      const imagePanels   = gsap.utils.toArray<HTMLElement>(".proj-image",   wrapper);
      const dots          = gsap.utils.toArray<HTMLElement>(".ind-dot",      wrapper);
      const nums          = gsap.utils.toArray<HTMLElement>(".ind-num",      wrapper);
      const fillEl        = wrapper.querySelector<HTMLElement>(".ind-fill");

      /* Initial state — only panel 0 is visible */
      contentPanels.forEach((el, i) => {
        gsap.set(el, { opacity: i === 0 ? 1 : 0, y: i === 0 ? 0 : 80 });
      });
      imagePanels.forEach((el, i) => {
        gsap.set(el, { opacity: i === 0 ? 1 : 0, scale: i === 0 ? 1 : 0.94 });
      });
      gsap.set(dots[0], { backgroundColor: projects[0].colorRaw, scale: 1.6 });
      gsap.set(fillEl, { height: "0%" });

      /* Master scrub timeline */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.4,
        },
      });

      /*
       * Timeline units: total = n (1 unit dwell per project)
       *   project i occupies [i, i+1]
       *   transition i→i+1 happens at i+0.35 … i+0.65
       */
      for (let i = 0; i < n - 1; i++) {
        const outStart  = i + 0.3;
        const inStart   = i + 0.55;
        const fillPct   = ((i + 1) / (n - 1)) * 100;

        // out
        tl.to(contentPanels[i], { opacity: 0, y: -80, duration: 0.3 }, outStart);
        tl.to(imagePanels[i],   { opacity: 0, scale: 1.04, duration: 0.25 }, outStart);

        // fill + dot
        tl.to(fillEl,    { height: `${fillPct}%`, duration: 0.35, ease: "power2.inOut" }, outStart);
        tl.to(dots[i],   { scale: 0.8, opacity: 0.4, duration: 0.25 }, outStart);
        tl.to(nums[i],   { opacity: 0.2, duration: 0.25 }, outStart);
        tl.to(dots[i + 1], { backgroundColor: projects[i + 1].colorRaw, scale: 1.6, duration: 0.3 }, inStart);
        tl.to(nums[i + 1], { opacity: 1, color: projects[i + 1].colorRaw, duration: 0.3 }, inStart);

        // in
        tl.to(contentPanels[i + 1], { opacity: 1, y: 0, duration: 0.35 }, inStart);
        tl.to(imagePanels[i + 1],   { opacity: 1, scale: 1, duration: 0.35 }, inStart);

        // padding dwell at end of each project
        tl.to({}, { duration: 0.3 }, i + 1);
      }

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: wrapperRef }
  );

  /* Indicator track height = gap between first and last dot */
  const DOT_GAP = 72; // px between dots
  const trackH  = (projects.length - 1) * DOT_GAP;

  return (
    /* Scroll space: one viewport per project */
    <div
      ref={wrapperRef}
      id="projects"
      style={{ height: `${projects.length * 100}vh` }}
    >
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
        {projects.map((p, i) => {
          const MockupComponent = Mockups[i];
          return (
            <div key={p.title} className="absolute inset-0 grid grid-cols-2">

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
                    className="group/lnk flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground/40 transition-colors duration-200 hover:text-foreground"
                  >
                    Live
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/lnk:-translate-y-0.5 group-hover/lnk:translate-x-0.5" />
                  </a>
                  <a
                    href={p.github}
                    className="group/lnk flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-foreground/40 transition-colors duration-200 hover:text-foreground"
                  >
                    GitHub
                    <Github className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {/* Right — mockup */}
              <div className="proj-image relative flex items-center justify-center overflow-hidden">
                {/* Radial ambient */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse 70% 70% at 60% 50%, ${p.colorRaw}18 0%, transparent 70%)`,
                  }}
                />

                {/* Mockup window */}
                <div
                  className="relative z-10 w-[70%] overflow-hidden rounded-sm border"
                  style={{
                    borderColor: `${p.colorRaw}30`,
                    background: `linear-gradient(160deg, #0e1620 0%, ${p.colorRaw}0a 100%)`,
                    aspectRatio: "16/10",
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
                  <MockupComponent color={p.colorRaw} />
                </div>

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
