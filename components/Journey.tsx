"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2020",
    num: "01",
    title: "Hello World",
    category: "The Beginning",
    desc: "Wrote my very first lines of code. Started exploring the fundamentals of web development and programming logic — the spark that set everything in motion.",
    color: "#007ae5",
  },
  {
    year: "2021",
    num: "02",
    title: "Engineering\nFundamentals",
    category: "Academia · VIIT",
    desc: "Enrolled in B.Tech at VIIT. Dove deep into Data Structures, Algorithms, and core computer science — building the mental models that underpin everything I build.",
    color: "#6ea8fe",
  },
  {
    year: "2022",
    num: "03",
    title: "The React\nEcosystem",
    category: "Frontend Mastery",
    desc: "Fell in love with React.js. Built multiple frontend modules, mastered state management, and explored Next.js — finding my primary medium of expression.",
    color: "#a78bfa",
  },
  {
    year: "2023",
    num: "04",
    title: "Professional\nImpact",
    category: "Industry · Invimatic",
    desc: "Joined Invimatic Technologies as a frontend engineer. Architected Low-Code/No-Code SaaS platforms, replaced polling with Redis Webhooks, and cut server requests by 60%.",
    color: "#eb6110",
  },
  {
    year: "2024",
    num: "05",
    title: "The AI\nFrontier",
    category: "AI Engineering",
    desc: "Transitioned into AI Engineering. Building agentic systems with LangChain, Gemini, and voice integrations — orchestrating intelligence, not just interfaces.",
    color: "#c9a8f0",
  },
];

export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef    = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const line    = lineRef.current;
      if (!section || !line) return;

      /* ── Initial state ───────────────────────────────────────── */
      gsap.set(line, { scaleY: 0 });

      /* ── Spine line draws as you scroll through the section ─── */
      ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end: "bottom 55%",
        scrub: 1.8,
        onUpdate: (self) => {
          gsap.set(line, { scaleY: self.progress });
        },
      });

      /* ── Per-milestone reveal ────────────────────────────────── */
      const items = gsap.utils.toArray<HTMLElement>(".ms-item", section);

      items.forEach((item) => {
        const dot      = item.querySelector<HTMLElement>(".ms-dot");
        const yearNum  = item.querySelector<HTMLElement>(".ms-year");
        const tag      = item.querySelector<HTMLElement>(".ms-tag");
        const titleEl  = item.querySelector<HTMLElement>(".ms-title");
        const rule     = item.querySelector<HTMLElement>(".ms-rule");
        const desc     = item.querySelector<HTMLElement>(".ms-desc");
        const counter  = item.querySelector<HTMLElement>(".ms-counter");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            end: "top 30%",
            toggleActions: "play none none reverse",
          },
        });

        // 1. Dot pops in
        tl.from(dot, { scale: 0, opacity: 0, duration: 0.45, ease: "back.out(3)" }, 0);

        // 2. Year number slides in from the left with blur
        tl.from(yearNum, { opacity: 0, x: -30, filter: "blur(8px)", duration: 0.6, ease: "power3.out" }, 0.08);

        // 3. Counter fades in
        tl.from(counter, { opacity: 0, duration: 0.4, ease: "power2.out" }, 0.15);

        // 4. Tag slides in from right
        tl.from(tag, { opacity: 0, x: 16, duration: 0.45, ease: "power2.out" }, 0.22);

        // 5. Title curtain reveal — lines slide up from behind the clip
        if (titleEl) {
          const lines = titleEl.querySelectorAll<HTMLElement>(".ms-title-line");
          lines.forEach((line, li) => {
            tl.from(line, { y: "108%", duration: 0.7, ease: "power4.out" }, 0.3 + li * 0.08);
          });
        }

        // 6. Rule extends left→right
        tl.from(rule, { scaleX: 0, duration: 0.7, ease: "power3.out" }, 0.5);

        // 7. Description fades up
        tl.from(desc, { opacity: 0, y: 22, duration: 0.6, ease: "power2.out" }, 0.7);
      });

      return () => ScrollTrigger.getAll().forEach((t) => t.kill());
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative px-6 pb-40 pt-36 md:px-12"
    >
      {/* Top ambient rule */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-7xl">

        {/* ── Section header ────────────────────────────────────── */}
        <div className="mb-4 flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue">
            03 — My Journey
          </span>
          <div className="h-px w-16 bg-dark-blue-ui/50" />
        </div>

        <div className="mb-28 flex items-end justify-between">
          <h2 className="text-[clamp(40px,6vw,80px)] font-black leading-[0.9] tracking-tight">
            The Path
            <br />
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px rgba(245,244,223,0.12)" }}
            >
              So Far.
            </span>
          </h2>

          {/* Right — decorative year range */}
          <span
            className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-foreground/25 md:block"
          >
            2020 — 2024
          </span>
        </div>

        {/* ── Timeline container ────────────────────────────────── */}
        <div className="relative">

          {/* Dim background track */}
          <div
            className="pointer-events-none absolute top-2 hidden w-px md:block"
            style={{
              left: "152px",
              height: "calc(100% - 16px)",
              background: "rgba(245,244,223,0.05)",
            }}
          />

          {/* Animated gradient spine — scaleY driven by scroll */}
          <div
            ref={lineRef}
            className="pointer-events-none absolute top-2 hidden origin-top md:block"
            style={{
              left: "152px",
              width: "1px",
              height: "calc(100% - 16px)",
              background:
                "linear-gradient(to bottom, #007ae5 0%, #6ea8fe 25%, #a78bfa 50%, #eb6110 75%, #c9a8f0 100%)",
            }}
          />

          {/* ── Milestones ─────────────────────────────────────── */}
          {milestones.map((m) => (
            <div
              key={m.year}
              className="ms-item relative pb-24 last:pb-0 md:grid"
              style={{ gridTemplateColumns: "152px 1fr" }}
            >

              {/* ── Left cell: year + dot ── */}
              <div className="relative mb-6 flex items-start md:mb-0 md:flex-col md:items-end md:pr-10 md:pt-1">

                {/* Node dot (sits on the spine line) */}
                <div
                  className="ms-dot relative z-10 mr-4 mt-[10px] h-[10px] w-[10px] shrink-0 rounded-full md:absolute md:right-0 md:top-[10px] md:mr-0 md:-translate-x-[4px]"
                  style={{
                    backgroundColor: m.color,
                    boxShadow: `0 0 14px ${m.color}90`,
                  }}
                />

                {/* Year */}
                <span
                  className="ms-year font-display text-[38px] font-black leading-none md:mt-0 md:text-[44px]"
                  style={{ color: m.color }}
                >
                  {m.year}
                </span>
              </div>

              {/* ── Right cell: content ── */}
              <div className="md:pl-14">

                {/* Top row: tag + counter */}
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className="ms-tag font-mono text-[10px] uppercase tracking-[0.3em]"
                    style={{ color: m.color }}
                  >
                    {m.num} — {m.category}
                  </span>
                  <span className="ms-counter hidden font-mono text-[10px] text-foreground/20 md:block">
                    {m.num} / 05
                  </span>
                </div>

                {/* Title — each line wrapped in overflow:hidden for curtain reveal */}
                <div className="ms-title mb-0">
                  {m.title.split("\n").map((line, li) => (
                    <div key={li} className="overflow-hidden">
                      <div
                        className="ms-title-line font-display font-black leading-[0.93] tracking-tight text-foreground"
                        style={{ fontSize: "clamp(40px, 5.5vw, 82px)" }}
                      >
                        {line}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Rule */}
                <div
                  className="ms-rule mb-7 mt-6 h-px origin-left"
                  style={{ background: `linear-gradient(to right, ${m.color}50, transparent)` }}
                />

                {/* Description */}
                <p className="ms-desc max-w-2xl font-mono text-sm leading-[1.9] text-foreground/50">
                  {m.desc}
                </p>

                {/* Ghost year — decorative, bottom-right */}
                <div
                  className="pointer-events-none mt-4 select-none text-right font-display text-[6rem] font-black leading-none md:text-[9rem]"
                  style={{ color: `${m.color}07` }}
                >
                  {m.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
