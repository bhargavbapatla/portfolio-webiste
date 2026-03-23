"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

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

// ─── Decorative code block ─────────────────────────────────────────────────────
const CODE_LINES = [
  { text: "const engineer = {",        indent: 0, color: "text-foreground/10" },
  { text: 'role:      "fullstack",',   indent: 1, color: "text-blue/15"       },
  { text: 'focus:     "AI + React",',  indent: 1, color: "text-blue/15"       },
  { text: 'exp:       "3+ years",',    indent: 1, color: "text-blue/15"       },
  { text: 'location:  "Pune, IN",',    indent: 1, color: "text-foreground/10" },
  { text: "};",                        indent: 0, color: "text-foreground/10" },
  { text: "",                          indent: 0, color: ""                   },
  { text: "export default engineer;",  indent: 0, color: "text-blue/20"       },
];

function CodeDecor() {
  return (
    <div
      className="absolute bottom-24 right-8 md:right-14 font-mono text-[11px] leading-[1.9] select-none pointer-events-none"
      aria-hidden
    >
      {CODE_LINES.map((line, i) => (
        <div key={i} className={`${line.color}`}>
          {line.indent > 0 && <span className="mr-4 opacity-40">{"  ".repeat(line.indent)}</span>}
          {line.text}
        </div>
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
// Text animation: line-mask reveal — each name line slides up from behind
// an overflow-hidden container (editorial/magazine style).
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const parallaxY  = useTransform(scrollYProgress, [0, 1],   ["0%",  "18%"]);
  const fadeOut    = useTransform(scrollYProgress, [0, 0.45], [1,     0   ]);

  // Stagger container for the two name lines
  const nameContainer = {
    hidden: {},
    show:   { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
  };

  const lineReveal = {
    hidden: { y: "108%"  },
    show:   { y: "0%", transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
  };

  const fadeUp = (delay: number) => ({
    initial:    { opacity: 0, y: 18 },
    animate:    { opacity: 1, y: 0  },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      {/* ── Background ───────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">

        {/* Engineering grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,122,229,0.055) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,122,229,0.055) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 75% 65% at 50% 42%, black 20%, transparent 100%)",
          }}
        />

        {/* Finer sub-grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,122,229,0.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,122,229,0.025) 1px, transparent 1px)
            `,
            backgroundSize: "16px 16px",
            maskImage: "radial-gradient(ellipse 50% 45% at 50% 42%, black, transparent)",
          }}
        />

        {/* Aurora — top right */}
        <motion.div
          style={{ y: parallaxY }}
          animate={{ scale: [1, 1.16, 1], opacity: [0.11, 0.2, 0.11] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-48 -right-32 h-[640px] w-[640px] rounded-full bg-blue/20 blur-[150px]"
        />
        {/* Aurora — bottom left */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.04, 0.09, 0.04] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute bottom-1/4 -left-48 h-[480px] w-[480px] rounded-full bg-blue/15 blur-[130px]"
        />

        {/* Bottom fade to bg */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Top bar ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08 }}
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
        {/* Name — line mask reveal */}
        <motion.div
          variants={nameContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center"
        >
          {/* Line 1 — solid */}
          <div className="overflow-hidden leading-[0.9]">
            <motion.span
              variants={lineReveal}
              className="block font-display font-black tracking-tight text-foreground"
              style={{ fontSize: "clamp(72px, 13.5vw, 190px)" }}
            >
              KRISHNA
            </motion.span>
          </div>

          {/* Line 2 — ghost outline */}
          <div className="overflow-hidden leading-[0.9]">
            <motion.span
              variants={lineReveal}
              className="block font-display font-black tracking-tight"
              style={{
                fontSize: "clamp(72px, 13.5vw, 190px)",
                color: "transparent",
                WebkitTextStroke: "1.5px rgba(245,244,223,0.13)",
              }}
            >
              BHARGAV
            </motion.span>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left center" }}
          className="mt-10 h-px w-48 bg-gradient-to-r from-transparent via-blue/50 to-transparent"
        />

        {/* Tagline */}
        <motion.p
          className="mt-7 max-w-lg font-mono text-sm leading-[2] text-foreground/40"
          {...fadeUp(1.05)}
        >
          Software Engineer · 3+ years building scalable frontends,
          LLM integrations &amp; agentic AI systems.{" "}
          <span className="text-foreground/20">Based in Pune, India.</span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
          {...fadeUp(1.2)}
        >
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
        </motion.div>
      </motion.div>

      {/* ── Decorative code block ─────────────────────────────────── */}
      <CodeDecor />

      {/* ── Bottom bar ───────────────────────────────────────────── */}
      <motion.div
        className="relative z-10 flex items-center justify-between px-8 pb-10 md:px-14"
        {...fadeUp(1.35)}
      >
        <div className="flex items-center gap-10 border-t border-dark-blue-ui/35 pt-7 w-full">
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
      </motion.div>
    </section>
  );
}
