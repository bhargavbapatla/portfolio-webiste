"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin();

// ─── Magnetic Button ──────────────────────────────────────────────────────────
function MagneticButton({
  children,
  className,
  href,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  style?: React.CSSProperties;
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const x = useSpring(mouseX, { damping: 15, stiffness: 150 });
  const y = useSpring(mouseY, { damping: 15, stiffness: 150 });

  return (
    <motion.a
      href={href}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left - rect.width / 2) * 0.4);
        mouseY.set((e.clientY - rect.top - rect.height / 2) * 0.4);
      }}
      onMouseLeave={() => {
        mouseX.set(0);
        mouseY.set(0);
      }}
      style={{ x, y, ...style }}
      className={className}
    >
      {children}
    </motion.a>
  );
}

// ─── Canvas particles ─────────────────────────────────────────────────────────
function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let pts: { x: number; y: number; vx: number; vy: number; r: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      pts = Array.from({ length: 52 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.38,
        vy: (Math.random() - 0.5) * 0.38,
        r: Math.random() * 1.4 + 0.4,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0, 122, 229, 0.7)";
        ctx.shadowBlur = 7;
        ctx.shadowColor = "rgba(0, 122, 229, 0.45)";
        ctx.fill();
        ctx.shadowBlur = 0;

        for (let j = i + 1; j < pts.length; j++) {
          const o = pts[j];
          const dx = p.x - o.x, dy = p.y - o.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(o.x, o.y);
            ctx.strokeStyle = `rgba(0, 122, 229, ${(1 - dist / 135) * 0.16})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        const mdx = p.x - mouseRef.current.x, mdy = p.y - mouseRef.current.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 190) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouseRef.current.x, mouseRef.current.y);
          ctx.strokeStyle = `rgba(235, 97, 16, ${(1 - mdist / 190) * 0.45})`;
          ctx.lineWidth = 0.9;
          ctx.stroke();
        }
      });
      raf = requestAnimationFrame(draw);
    };

    const onMouse = (e: MouseEvent) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const onLeave = () => { mouseRef.current = { x: -999, y: -999 }; };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    document.addEventListener("mouseleave", onLeave);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}

// ─── Role rotator ─────────────────────────────────────────────────────────────
const ROLES = ["Frontend Engineer", "AI Engineer", "TypeScript Dev", "React Architect"];

function RoleRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % ROLES.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-4 w-44 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={index}
          initial={{ y: 14, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 font-mono text-[10px] tracking-[0.25em] uppercase text-foreground/40"
        >
          {ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// ─── GSAP character split helper ─────────────────────────────────────────────
// Initial transform is set inline so SSR output is already hidden —
// no flash before GSAP runs on the client.
function CharSplit({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span className={className} style={style} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ verticalAlign: "bottom", lineHeight: "inherit" }}
        >
          {/* translateY(115%) hides char behind the clip from the very first paint */}
          <span
            className="hero-char inline-block"
            style={{ transform: "translateY(115%)" }}
          >
            {ch}
          </span>
        </span>
      ))}
    </span>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const fadeOut   = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // ── GSAP entrance ──────────────────────────────────────────────────────────
  useGSAP(
    () => {
      // gsap.set runs synchronously in useLayoutEffect — locks initial states
      // before the browser paints, even on fast connections.
      gsap.set(".hero-divider", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".hero-sub",     { opacity: 0, y: 18 });

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // 1. Characters slide up from their inline translateY(115%)
      tl.to(".hero-char", {
        y: 0,
        duration: 1.05,
        stagger: { amount: 0.42, from: "start" },
      }, 0.1);

      // 2. Divider extends left → right
      tl.to(".hero-divider", {
        scaleX: 1,
        duration: 0.75,
        ease: "power3.out",
      }, 0.72);

      // 3. Sub-elements fade + rise
      tl.to(".hero-sub", {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.1,
        ease: "power2.out",
      }, 0.88);
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* ── Background ───────────────────────────────────────────── */}
      {/* plain div — no framer-motion initial/animate here to avoid SSR mismatch */}
      <div className="absolute inset-0 z-0 hero-bg-fade">
        {/* Aurora — top right, blue */}
        <motion.div
          style={{ y: parallaxY }}
          animate={{ scale: [1, 1.18, 1], opacity: [0.13, 0.22, 0.13] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-48 -right-32 h-[700px] w-[700px] rounded-full bg-blue/20 blur-[160px]"
        />
        {/* Aurora — left, orange */}
        <motion.div
          style={{ y: parallaxY }}
          animate={{ scale: [1, 1.22, 1], opacity: [0.05, 0.12, 0.05] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute top-1/3 -left-56 h-[540px] w-[540px] rounded-full bg-orange/15 blur-[150px]"
        />
        {/* Aurora — bottom, pink */}
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute bottom-0 right-1/4 h-[360px] w-[360px] rounded-full bg-pink/10 blur-[120px]"
        />

        {/* Radial dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,122,229,0.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            maskImage: "radial-gradient(ellipse 80% 65% at 50% 40%, black, transparent)",
          }}
        />

        <HeroCanvas />

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* ── Top bar ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="relative z-10 flex items-center justify-between px-8 pt-28 md:px-14"
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue">
            01 — Portfolio
          </span>
          <div className="h-px w-8 bg-blue/35" />
        </div>
        <RoleRotator />
      </motion.div>

      {/* ── Center content ───────────────────────────────────────── */}
      <motion.div
        style={{ opacity: fadeOut }}
        className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center"
      >
        {/* Name — two lines, GSAP char reveal */}
        <div className="flex flex-col items-center">
          {/* Line 1 — solid */}
          <div className="leading-[0.87]">
            <CharSplit
              text="KRISHNA"
              className="font-display font-black tracking-tight text-foreground"
              style={{ fontSize: "clamp(72px, 13.5vw, 190px)" }}
            />
          </div>
          {/* Line 2 — ghost outline */}
          <div className="leading-[0.87]">
            <CharSplit
              text="BHARGAV"
              className="font-display font-black tracking-tight"
              style={{
                fontSize: "clamp(72px, 13.5vw, 190px)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(245,244,223,0.13)",
              }}
            />
          </div>
        </div>

        {/* Thin divider */}
        <div
          className="hero-divider mt-10 h-px w-48 bg-gradient-to-r from-transparent via-blue/50 to-transparent"
          style={{ transform: "scaleX(0)", transformOrigin: "left center" }}
        />

        {/* Tagline */}
        <p className="hero-sub mt-7 max-w-lg font-mono text-sm leading-[2] text-foreground/40" style={{ opacity: 0 }}>
          Software Engineer · 3+ years building scalable frontends,
          LLM integrations &amp; agentic AI systems.{" "}
          <span className="text-foreground/20">Based in Pune, India.</span>
        </p>

        {/* CTA buttons */}
        <div className="hero-sub mt-9 flex flex-wrap items-center justify-center gap-4" style={{ opacity: 0 }}>
          <MagneticButton
            href="#projects"
            className="group relative flex items-center gap-3 overflow-hidden bg-blue px-7 py-[14px] font-mono text-xs font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,122,229,0.4)]"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
          >
            <span className="relative z-10 flex items-center gap-3">
              View Work
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </MagneticButton>

          <MagneticButton
            href="/resume.pdf"
            className="group flex items-center gap-3 border border-dark-blue-ui/50 bg-white/5 backdrop-blur-sm px-7 py-[14px] font-mono text-xs font-semibold uppercase tracking-widest text-foreground/55 transition-all duration-300 hover:border-dark-blue-ui hover:text-foreground"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
          >
            <Download className="h-3.5 w-3.5" />
            Resume
          </MagneticButton>
        </div>
      </motion.div>

      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <div className="relative z-10 flex items-center justify-between px-8 pb-10 md:px-14">
        {/* Stats */}
        <div className="hero-sub flex items-center gap-10 border-t border-dark-blue-ui/35 pt-7 w-full" style={{ opacity: 0 }}>
          {[
            { num: "3+",  label: "Years Exp"  },
            { num: "10+", label: "Projects"   },
            { num: "60%", label: "Perf Gains" },
            { num: "98",  label: "Lighthouse" },
          ].map((s, i) => (
            <div key={s.label} className={`flex flex-col gap-0.5 ${i > 1 ? "hidden sm:flex" : ""}`}>
              <span className="font-display text-3xl font-black text-foreground leading-none">
                {s.num}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
                {s.label}
              </span>
            </div>
          ))}

          {/* Scroll cue */}
          <div className="ml-auto flex items-center gap-2.5 text-foreground/25">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase">Scroll</span>
            <div className="relative h-7 w-px overflow-hidden bg-dark-blue-ui/30">
              <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 h-1/2 w-full bg-gradient-to-b from-transparent via-blue to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
