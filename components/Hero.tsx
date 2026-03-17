"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";

/* ── Subtle particle field ─── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    const dots = Array.from({ length: 80 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((d) => {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(10,10,10,0.12)";
        ctx.fill();
      });
      // Draw faint connecting lines between close dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(10,10,10,${0.05 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };
const up = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center pt-24 pb-16" style={{ background: "#f5f2ee" }}>
      <ParticleField />

      {/* Faint radial vignette */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 40%, rgba(10,10,10,0.04) 100%)" }} />

      <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10 flex flex-col items-center max-w-5xl">

        {/* Eyebrow label */}
        <motion.div variants={up} className="mb-10 flex items-center gap-3">
          <span className="h-px w-8 bg-black/30" />
          <span className="mono text-[11px] tracking-[0.25em] uppercase text-black/45">
            Software Engineer · Pune, India
          </span>
          <span className="h-px w-8 bg-black/30" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={up}
          className="serif text-[clamp(52px,10vw,130px)] font-black leading-[0.92] tracking-tight text-[#0a0a0a]"
        >
          Building
          <br />
          <em className="not-italic" style={{ color: "transparent", WebkitTextStroke: "2px #0a0a0a" }}>
            Digital
          </em>
          <br />
          Futures.
        </motion.h1>

        {/* Descriptor */}
        <motion.p variants={up} className="mt-9 max-w-lg sans text-[16px] leading-relaxed text-black/50 font-light">
          3+ years architecting scalable frontends, LLM integrations &
          agentic AI systems. I bridge the gap between great design and
          engineering precision.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={up} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="group flex items-center gap-3 bg-[#0a0a0a] text-[#f5f2ee] px-8 py-4 sans text-[13px] font-medium tracking-wide transition-all duration-300 hover:bg-black/80"
            style={{ borderRadius: "2px" }}
          >
            View My Work
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="/resume.pdf"
            className="group flex items-center gap-3 border border-black/15 px-8 py-4 sans text-[13px] font-medium tracking-wide text-black/60 transition-all duration-300 hover:border-black/40 hover:text-black"
            style={{ borderRadius: "2px" }}
          >
            <Download className="h-4 w-4" />
            Resume
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          variants={up}
          className="mt-20 w-full grid grid-cols-4 border-t border-b border-black/10"
        >
          {[
            { num: "3+", label: "Years Experience" },
            { num: "10+", label: "Projects Shipped" },
            { num: "60%", label: "Performance Gains" },
            { num: "98", label: "Lighthouse Score" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="flex flex-col items-center gap-1 py-7"
              style={{ borderRight: i < 3 ? "1px solid rgba(10,10,10,0.1)" : "none" }}
            >
              <span className="serif text-4xl font-black text-black">{s.num}</span>
              <span className="mono text-[10px] uppercase tracking-[0.15em] text-black/35">{s.label}</span>
            </div>
          ))}
        </motion.div>

      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="mono text-[9px] uppercase tracking-[0.3em] text-black/25">Scroll</span>
        <div className="h-8 w-px bg-gradient-to-b from-black/25 to-transparent" />
      </motion.div>
    </section>
  );
}