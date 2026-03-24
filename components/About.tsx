"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const containerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Ensure we have heights to work with
      const leftHeight = leftRef.current?.offsetHeight || 0;
      const rightHeight = rightRef.current?.offsetHeight || 0;
      const scrollDistance = rightHeight - leftHeight;

      if (scrollDistance > 0) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 15%",
          end: () => `+=${scrollDistance}`,
          pin: leftRef.current,
          pinSpacing: false,
        });
      }

      // Parallax effect on cards
      gsap.fromTo(".about-card", 
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1.5,
          }
        }
      );
    });

    // Animate the text lines in paragraph
    gsap.fromTo(".about-text-line",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: leftRef.current,
          start: "top 75%",
        }
      }
    );

    // Animate stats
    gsap.fromTo(".stat-item",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".stats-container",
          start: "top 85%",
        }
      }
    );

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section id="about" className="relative overflow-hidden py-20 px-4 md:py-40 md:px-8">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -right-64 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-pink/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl" ref={containerRef}>
        {/* Section label */}
        <div className="mb-20 flex items-center gap-4">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-blue">
            01 — About
          </span>
          <div className="h-px flex-1 bg-dark-blue-ui/50 max-w-xs" />
        </div>

        <div className="grid gap-16 md:gap-24 lg:grid-cols-[1fr_420px] lg:items-start relative">
          {/* Left — text */}
          <div ref={leftRef} className="lg:pr-10">
            <h2 className="about-heading text-[clamp(40px,6vw,80px)] font-black leading-[0.95] tracking-tight text-foreground">
              I Build What
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px rgba(245,244,223,0.15)" }}
              >
                Others
              </span>{" "}
              <span
                style={{
                  background: "linear-gradient(90deg, var(--color-blue), var(--color-pink))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Imagine
              </span>
            </h2>

            <div className="mt-10 space-y-6">
              {[
                "I'm a Software Engineer with 3+ years of experience architecting scalable applications powered by modern frameworks and Generative AI. I bridge frontend precision with AI engineering.",
                "At Invimatic Technologies, I spearheaded a Low-Code/No-Code SaaS platform in React + TypeScript, built real-time chat via Redis & Webhooks cutting server load by 60%, and engineered a Cube.js analytics pipeline that saved 800ms per query.",
                "When I'm not shipping features, I'm building agentic AI systems, exploring RAG pipelines, and contributing to projects that push what's possible in the browser.",
              ].map((p, i) => (
                <p
                  key={i}
                  className="about-text-line font-mono text-sm leading-[2] text-foreground/80"
                >
                  {p}
                </p>
              ))}
            </div>

            {/* Stats */}
            <div className="stats-container mt-16 grid grid-cols-3 gap-0 border border-dark-blue-ui/50">
              {[
                { num: "3+", label: "Years" },
                { num: "10+", label: "Projects" },
                { num: "60%", label: "Perf ↑" },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`stat-item px-4 py-5 md:px-8 md:py-6 ${i < 2 ? "border-r border-dark-blue-ui/50" : ""}`}
                >
                  <div className="text-2xl md:text-4xl font-black text-foreground">
                    {s.num}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — card stack */}
          <div ref={rightRef} className="flex flex-col gap-12 pt-10 lg:pt-32 pb-20">
            {/* Code card */}
            <div
              style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}
              className="about-card relative overflow-hidden border border-dark-blue-ui/80 bg-black"
            >
              {/* Window chrome */}
              <div className="flex items-center gap-2 border-b border-dark-blue-ui/50 px-5 py-3">
                <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                <span className="ml-4 font-mono text-[10px] tracking-widest text-foreground/40 uppercase">
                  engineer.ts
                </span>
              </div>
              <div className="p-6 font-mono text-sm leading-7">
                {codeLines.map((line, i) => (
                  <div key={i}>
                    {line.comment ? (
                      <span className="text-foreground/40 italic">{line.text}</span>
                    ) : line.accent ? (
                      <span className="text-blue">{line.text}</span>
                    ) : line.dim ? (
                      <span className="text-foreground/60">{line.text}</span>
                    ) : (
                      <span className="text-foreground">{line.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick facts card */}
            <div
              className="about-card border border-dark-blue-ui/50 bg-white/[0.015] p-6"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
              }}
            >
              <div className="mb-4 font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/40">
                // quick_facts
              </div>
              <ul className="space-y-0 divide-y divide-dark-blue-ui/50">
                {facts.map((f) => (
                  <li
                    key={f.label}
                    className="flex items-center justify-between py-3"
                  >
                    <span className="font-mono text-xs text-foreground/50 uppercase tracking-wider">
                      {f.label}
                    </span>
                    <span
                      className={`font-mono text-xs ${f.accent ? "text-blue" : "text-foreground"
                        }`}
                    >
                      {f.value}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
             {/* Extra placeholder card to make right side longer for the pin scroll effect */}
             <div
              className="about-card border border-dark-blue-ui/50 bg-blue/5 p-6"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
              }}
            >
              <div className="mb-4 font-mono text-[10px] tracking-[0.3em] uppercase text-blue">
                // current_status
              </div>
              <div className="font-mono text-sm leading-[2] text-foreground/80">
                Actively exploring new frontiers in LLM orchestration, creating agents that autonomously execute workflows. Open to collaborating on innovative AI-driven products.
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}