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
  { text: "const engineer = {", indent: 0, color: "text-foreground/10" },
  { text: 'role:      "fullstack",', indent: 1, color: "text-blue/40" },
  { text: 'focus:     "AI + React",', indent: 1, color: "text-blue/40" },
  { text: 'exp:       "3+ years",', indent: 1, color: "text-orange/40" },
  { text: 'location:  "Pune, IN",', indent: 1, color: "text-foreground/10" },
  { text: "};", indent: 0, color: "text-foreground/10" },
  { text: "", indent: 0, color: "" },
  { text: "export default engineer;", indent: 0, color: "text-blue/60" },
];

function CodeDecor() {
  return (
    <div
      className="absolute bottom-24 right-8 md:right-14 font-mono text-[11px] leading-[1.9] select-none pointer-events-none z-10"
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

// ─── Interactive Canvas Background ────────────────────────────────────────────
function HeroCanvas({ onExplode }: { onExplode: () => void }) {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const explodeRef  = useRef(onExplode);
  useEffect(() => { explodeRef.current = onExplode; }, [onExplode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const clicks: { x: number; y: number; t: number }[] = [];

    // ── Phase machine ─────────────────────────────────────────
    type Phase = "idle" | "charging" | "exploding" | "settling";
    let phase: Phase = "idle";
    let phaseStart   = 0;
    let lastMoveAt   = Date.now();
    let lastMX = -9999, lastMY = -9999;
    let exX = 0, exY = 0;

    interface Node {
      x: number; y: number;
      vx: number; vy: number;
      size: number; phase: number;
      isHub: boolean;
    }
    let nodes: Node[] = [];

    const setup = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      nodes = [];
      for (let i = 0; i < 7; i++)
        nodes.push({ x: (0.1 + Math.random() * 0.8) * W, y: (0.1 + Math.random() * 0.8) * H,
          vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18,
          size: 2.4 + Math.random() * 1.4, phase: Math.random() * Math.PI * 2, isHub: true });
      for (let i = 0; i < 55; i++)
        nodes.push({ x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
          size: 0.8 + Math.random() * 1.1, phase: Math.random() * Math.PI * 2, isHub: false });
      phase = "idle";
    };

    const CONN = 135, MR = 210, CR = 290, CD = 850;
    const CHARGE_DUR  = 900;   // ms vibrating before boom
    const EXPLODE_DUR = 1400;  // ms of supernova visual
    const SETTLE_DUR  = 2800;  // ms nodes drift back

    const fireExplosion = () => {
      exX = mouse.x; exY = mouse.y;
      phase = "exploding"; phaseStart = Date.now();
      // Give every node a radial velocity burst
      for (const n of nodes) {
        const dx = n.x - exX, dy = n.y - exY;
        const d  = Math.sqrt(dx * dx + dy * dy) || 1;
        const f  = 18 + Math.random() * 14;
        n.vx = (dx / d) * f + (Math.random() - 0.5) * 6;
        n.vy = (dy / d) * f + (Math.random() - 0.5) * 6;
      }
      explodeRef.current();
    };

    const tick = (time: number) => {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, W, H);
      const now = Date.now();

      // ── Track mouse idle time ──────────────────────────────
      if (Math.abs(mouse.x - lastMX) > 2 || Math.abs(mouse.y - lastMY) > 2) {
        lastMX = mouse.x; lastMY = mouse.y;
        lastMoveAt = now;
        if (phase === "charging") phase = "idle"; // movement resets charge
      }

      // ── Phase transitions ──────────────────────────────────
      if (phase === "idle" && mouse.x > -100 && now - lastMoveAt > 5000)
        { phase = "charging"; phaseStart = now; }
      if (phase === "charging" && now - phaseStart > CHARGE_DUR)
        fireExplosion();
      if (phase === "exploding" && now - phaseStart > EXPLODE_DUR)
        { phase = "settling"; phaseStart = now; }
      if (phase === "settling" && now - phaseStart > SETTLE_DUR)
        { phase = "idle"; lastMoveAt = now; }

      // Purge old click shockwaves
      while (clicks.length && now - clicks[0].t > CD) clicks.shift();

      // ── Update nodes ───────────────────────────────────────
      for (const n of nodes) {
        if (phase === "idle" || phase === "charging") {
          // Mouse attraction
          const mdx = mouse.x - n.x, mdy = mouse.y - n.y;
          const md  = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < MR && md > 1) {
            const str = phase === "charging" ? 0.09 : 0.045;
            const f   = (1 - md / MR) * str;
            n.vx += (mdx / md) * f; n.vy += (mdy / md) * f;
          }
          // Charging vibration — builds in intensity
          if (phase === "charging") {
            const prog = (now - phaseStart) / CHARGE_DUR;
            const amp  = prog * 0.38;
            n.vx += (Math.random() - 0.5) * amp;
            n.vy += (Math.random() - 0.5) * amp;
          }
          // Click shockwaves (only in normal phases)
          for (const c of clicks) {
            const prog = (now - c.t) / CD;
            const wR = prog * CR;
            const cdx = n.x - c.x, cdy = n.y - c.y;
            const cd = Math.sqrt(cdx * cdx + cdy * cdy);
            if (cd > 1 && Math.abs(cd - wR) < 45) {
              const push = (1 - Math.abs(cd - wR) / 45) * 0.12;
              n.vx += (cdx / cd) * push; n.vy += (cdy / cd) * push;
            }
          }
        }

        const drag   = phase === "settling" ? 0.92 : 0.955;
        const maxSpd = phase === "exploding" || phase === "settling" ? 20 : 2.8;
        n.vx *= drag; n.vy *= drag;
        const spd = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
        if (spd > maxSpd) { n.vx = (n.vx / spd) * maxSpd; n.vy = (n.vy / spd) * maxSpd; }
        n.x += n.vx; n.y += n.vy;

        if (phase !== "exploding") {
          if (n.x < 8) n.vx += 0.08; if (n.x > W - 8) n.vx -= 0.08;
          if (n.y < 8) n.vy += 0.08; if (n.y > H - 8) n.vy -= 0.08;
        }
        // Clamp so nodes don't fly to infinity
        n.x = Math.max(-150, Math.min(W + 150, n.x));
        n.y = Math.max(-150, Math.min(H + 150, n.y));
      }

      // ── Draw connections ───────────────────────────────────
      if (phase !== "exploding") {
        const connFade = phase === "settling" ? Math.max(0, 1 - (now - phaseStart) / 600) : 1;
        ctx.lineWidth = 0.5;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i], b = nodes[j];
            const dx = a.x - b.x, dy = a.y - b.y;
            const d  = Math.sqrt(dx * dx + dy * dy);
            if (d < CONN) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0,122,229,${((1 - d / CONN) * 0.13 * connFade).toFixed(3)})`;
              ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
        }
      }

      // ── Click shockwave rings ──────────────────────────────
      if (phase === "idle" || phase === "charging") {
        for (const c of clicks) {
          const prog = (now - c.t) / CD;
          ctx.beginPath(); ctx.arc(c.x, c.y, prog * CR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,122,229,${((1 - prog) * 0.38).toFixed(3)})`;
          ctx.lineWidth = 1.5; ctx.stroke();
          ctx.beginPath(); ctx.arc(c.x, c.y, prog * CR * 0.55, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,122,229,${((1 - prog) * 0.18).toFixed(3)})`;
          ctx.lineWidth = 1; ctx.stroke();
        }
      }

      // ── Charge ring indicator ──────────────────────────────
      if (phase === "charging" && mouse.x > -100) {
        const prog = (now - phaseStart) / CHARGE_DUR;
        // Arc fills clockwise as charge builds
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 50, -Math.PI / 2, -Math.PI / 2 + prog * Math.PI * 2);
        ctx.strokeStyle = `rgba(0,122,229,${(0.25 + prog * 0.6).toFixed(3)})`;
        ctx.lineWidth = 2; ctx.stroke();
        // Pulsing core dot
        const coreR = 5 + Math.sin(now * 0.018) * 2.5 + prog * 4;
        const coreG = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, coreR * 4);
        coreG.addColorStop(0, `rgba(0,122,229,${(prog * 0.7).toFixed(3)})`);
        coreG.addColorStop(1, "transparent");
        ctx.fillStyle = coreG;
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, coreR * 4, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(mouse.x, mouse.y, coreR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(120,195,255,${(prog * 0.9).toFixed(3)})`; ctx.fill();
      }

      // ── Supernova explosion ────────────────────────────────
      if (phase === "exploding") {
        const t   = Math.min(1, (now - phaseStart) / EXPLODE_DUR);
        const maxR = Math.hypot(W, H);

        // Bright core flash (quick, white-blue)
        const flashA = Math.max(0, 0.75 - t * 6);
        if (flashA > 0.002) {
          const fg = ctx.createRadialGradient(exX, exY, 0, exX, exY, 160);
          fg.addColorStop(0,   `rgba(220,240,255,${flashA.toFixed(3)})`);
          fg.addColorStop(0.35,`rgba(0,122,229,${(flashA * 0.65).toFixed(3)})`);
          fg.addColorStop(1,   "transparent");
          ctx.fillStyle = fg; ctx.fillRect(0, 0, W, H);
        }

        // Four expanding rings — different radii and decay rates
        const rings = [
          { s: 1.00, baseAlpha: 0.55, lw: 2.5 },
          { s: 0.72, baseAlpha: 0.38, lw: 1.5 },
          { s: 0.50, baseAlpha: 0.28, lw: 1.0 },
          { s: 0.34, baseAlpha: 0.18, lw: 0.7 },
        ];
        for (const ring of rings) {
          const rt = Math.max(0, Math.min(1, t * ring.s * 1.5));
          const r  = rt * maxR;
          const a  = ring.baseAlpha * (1 - rt);
          if (a < 0.005) continue;
          ctx.beginPath(); ctx.arc(exX, exY, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0,122,229,${a.toFixed(3)})`;
          ctx.lineWidth = ring.lw; ctx.stroke();
        }

        // Soft ambient bloom (expands slowly)
        const bloomA = Math.max(0, 0.14 * (1 - t * 1.1));
        if (bloomA > 0.003) {
          const bg = ctx.createRadialGradient(exX, exY, 0, exX, exY, t * 500 + 50);
          bg.addColorStop(0, `rgba(0,122,229,${bloomA.toFixed(3)})`);
          bg.addColorStop(1, "transparent");
          ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
        }
      }

      // ── Mouse glow lens ────────────────────────────────────
      if (mouse.x > -100 && phase !== "exploding") {
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 220);
        g.addColorStop(0, "rgba(0,122,229,0.045)"); g.addColorStop(1, "transparent");
        ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
      }

      // ── Draw nodes ─────────────────────────────────────────
      for (const n of nodes) {
        const pulse  = Math.sin(time * 0.0009 + n.phase);
        const r      = n.isHub ? n.size + pulse * 0.7 : n.size;
        // Nodes fade out quickly during explosion, reappear during settling
        let alpha = 1;
        if (phase === "exploding") alpha = Math.max(0, 1 - (now - phaseStart) / (EXPLODE_DUR * 0.55));
        if (phase === "settling")  alpha = Math.min(1, (now - phaseStart) / (SETTLE_DUR * 0.4));
        if (alpha < 0.01) continue;

        if (n.isHub) {
          const hg = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5.5);
          hg.addColorStop(0, `rgba(0,122,229,${((0.13 + pulse * 0.04) * alpha).toFixed(3)})`);
          hg.addColorStop(1, "transparent");
          ctx.fillStyle = hg;
          ctx.beginPath(); ctx.arc(n.x, n.y, r * 5.5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = n.isHub
          ? `rgba(0,122,229,${((0.82 + pulse * 0.12) * alpha).toFixed(3)})`
          : `rgba(0,122,229,${(0.52 * alpha).toFixed(3)})`;
        ctx.fill();
      }
    };

    setup();
    raf = requestAnimationFrame(tick);

    const onMove  = (e: MouseEvent) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; lastMoveAt = Date.now(); if (phase === "charging") phase = "idle"; };
    const onClick = (e: MouseEvent) => {
      if (phase === "idle" || phase === "settling") {
        const r = canvas.getBoundingClientRect();
        clicks.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: Date.now() });
      }
    };

    window.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    window.addEventListener("click", onClick);
    window.addEventListener("resize", setup);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("click", onClick);
      window.removeEventListener("resize", setup);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-background">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background to-transparent z-10" />
    </div>
  );
}

// ─── Scramble decode text ─────────────────────────────────────────────────────
const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%<>{}!/|";

function ScrambleText({ text, isOutline = false }: { text: string; isOutline?: boolean }) {
  const [display, setDisplay] = useState<{ ch: string; locked: boolean }[]>(
    () => text.split("").map((ch) => ({ ch, locked: true }))
  );
  const ivRef  = useRef<ReturnType<typeof setInterval> | null>(null);
  const toRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const live   = useRef(false);

  const clear = () => {
    if (ivRef.current) clearInterval(ivRef.current);
    toRefs.current.forEach(clearTimeout);
    toRefs.current = [];
  };

  const scramble = () => {
    if (live.current) return;
    live.current = true;
    const locked = text.split("").map(() => false);

    ivRef.current = setInterval(() => {
      setDisplay(text.split("").map((orig, i) => ({
        ch: locked[i] ? orig : SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)],
        locked: locked[i],
      })));
    }, 38);

    text.split("").forEach((_, i) => {
      const t = setTimeout(() => {
        locked[i] = true;
        if (locked.every(Boolean)) {
          clear();
          setDisplay(text.split("").map((ch) => ({ ch, locked: true })));
          live.current = false;
        }
      }, 55 + i * 52 + Math.random() * 28);
      toRefs.current.push(t);
    });
  };

  const reset = () => {
    clear();
    live.current = false;
    setDisplay(text.split("").map((ch) => ({ ch, locked: true })));
  };

  useEffect(() => () => clear(), []);

  return (
    <div
      className="inline-flex cursor-default font-display font-black tracking-tight select-none"
      style={{ fontSize: "clamp(72px, 13.5vw, 190px)" }}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      aria-label={text}
    >
      {display.map(({ ch, locked }, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            transition: "color 0.08s, opacity 0.08s, -webkit-text-stroke-color 0.08s",
            ...(isOutline
              ? {
                  color: "transparent",
                  WebkitTextStroke: locked
                    ? "1.5px rgba(245,244,223,0.15)"
                    : "1.5px rgba(0,122,229,0.55)",
                }
              : {
                  color: locked ? "rgba(245,244,223,1)" : "rgba(0,122,229,0.75)",
                }),
          }}
        >
          {ch === " " ? "\u00a0" : ch}
        </span>
      ))}
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef });
  const fadeOut = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  const handleExplode = () => {
    const el = contentRef.current;
    if (!el) return;
    el.classList.remove("hero-shake");
    void el.offsetWidth; // force reflow so animation restarts
    el.classList.add("hero-shake");
    setTimeout(() => el.classList.remove("hero-shake"), 650);
  };

  const nameContainer = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const lineReveal = {
    hidden: { y: "108%" },
    show: { y: "0%", transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } },
  };

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-background"
    >
      {/* ── Background ─────────────────────────── */}
      <HeroCanvas onExplode={handleExplode} />

      {/* ── Shakeable UI layer ─────────────────────────────────── */}
      <div ref={contentRef} className="relative z-10 flex flex-1 flex-col">

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
          <div className="overflow-hidden leading-[0.9] pb-4">
            <motion.div variants={lineReveal}>
              <ScrambleText text="KRISHNA" />
            </motion.div>
          </div>

          <div className="overflow-hidden leading-[0.9] pb-4">
            <motion.div variants={lineReveal}>
              <ScrambleText text="BHARGAV" isOutline />
            </motion.div>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: "left center" }}
          className="mt-10 h-px w-48 bg-gradient-to-r from-transparent via-blue/50 to-transparent"
        />

        {/* Tagline */}
        <motion.p
          className="mt-7 max-w-lg font-mono text-sm leading-[2] text-foreground/60 drop-shadow-md"
          {...fadeUp(1.4)}
        >
          Software Engineer · 3+ years building scalable frontends,
          LLM integrations &amp; agentic AI systems.{" "}
          <span className="text-blue">Based in Pune, India.</span>
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
          {...fadeUp(1.55)}
        >
          <MagneticButton
            href="#projects"
            className="group relative flex items-center gap-3 overflow-hidden bg-blue px-7 py-[14px] font-mono text-xs font-bold uppercase tracking-widest text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,122,229,0.5)]"
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
            className="group flex items-center gap-3 border border-dark-blue-ui/50 bg-white/5 backdrop-blur-md px-7 py-[14px] font-mono text-xs font-semibold uppercase tracking-widest text-foreground/70 transition-all duration-300 hover:border-blue hover:shadow-[0_0_20px_rgba(0,122,229,0.2)] hover:text-white"
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
        {...fadeUp(1.7)}
      >
        <div className="flex items-center gap-10 border-t border-dark-blue-ui/50 pt-7 w-full">
          {[
            { num: "3+", label: "Years Exp" },
            { num: "10+", label: "Projects" },
            { num: "60%", label: "Perf Gains" },
            { num: "98", label: "Lighthouse" },
          ].map((s, i) => (
            <div key={s.label} className={`flex flex-col gap-0.5 ${i > 1 ? "hidden sm:flex" : ""}`}>
              <span className="font-display text-3xl font-black text-foreground leading-none drop-shadow-sm">
                {s.num}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue/70">
                {s.label}
              </span>
            </div>
          ))}

          {/* Scroll cue */}
          <div className="ml-auto flex items-center gap-2.5 text-foreground/40">
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-orange">Scroll</span>
            <div className="relative h-7 w-px overflow-hidden bg-dark-blue-ui/30">
              <motion.div
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 h-1/2 w-full bg-gradient-to-b from-transparent via-orange to-transparent"
              />
            </div>
          </div>
        </div>
      </motion.div>
      </div>{/* end shakeable UI layer */}
    </section>
  );
}