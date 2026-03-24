"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, MapPin, Linkedin, Github, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const EASE = [0.22, 1, 0.36, 1] as const;

const socials = [
  {
    icon: Github,
    label: "GitHub",
    handle: "github.com/krishnabhargav",
    href: "https://github.com/bhargavbapatla",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "linkedin.com/in/krishnabhargav",
    href: "https://www.linkedin.com/in/krishna-bhargav-7734161a8/",
  },
  {
    icon: Mail,
    label: "Email",
    handle: "bhargav.bapatla20@gmail.com",
    href: "mailto:bhargav.bapatla20@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    handle: "Pune, India · Remote Friendly",
    href: null,
  },
];

const TICKER_ITEMS = [
  "Available for Work",
  "Open to Collaborate",
  "Full-Time",
  "Freelance",
  "Remote Friendly",
  "AI · Full-Stack",
];

/* ── Pulsing availability badge ──────────────────────────────────────── */
function AvailabilityBadge() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex h-2 w-2">
        <span
          className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
          style={{ backgroundColor: "#4ade80" }}
        />
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={{ backgroundColor: "#4ade80" }}
        />
      </div>
      <span
        className="font-mono text-[10px] uppercase tracking-[0.3em]"
        style={{ color: "#4ade80bb" }}
      >
        Available for Work
      </span>
    </div>
  );
}

/* ── Live IST clock ──────────────────────────────────────────────────── */
function LiveClock() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const update = () =>
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-col gap-1">
      <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-foreground/25">
        Local Time · IST
      </span>
      <span className="font-mono text-2xl tabular-nums text-foreground/55 md:text-3xl">
        {time}
      </span>
    </div>
  );
}

/* ── Underline animated form field ──────────────────────────────────── */
function Field({
  id,
  label,
  type,
  placeholder,
  focused,
  setFocused,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  focused: string | null;
  setFocused: (v: string | null) => void;
}) {
  const active = focused === id;
  return (
    <div className="flex flex-col gap-2.5">
      <label
        htmlFor={id}
        className="font-mono text-[9px] uppercase tracking-[0.35em] text-foreground/35"
      >
        {label}
      </label>
      <div className="relative pb-px">
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          onFocus={() => setFocused(id)}
          onBlur={() => setFocused(null)}
          /* Tell browsers and extensions to back off */
          spellCheck={false}
          autoComplete="off"
          data-gramm="false"
          data-gramm_editor="false"
          data-enable-grammarly="false"
          /* The ultimate CSS nuke for native styles */
          className="w-full border-0 bg-transparent pb-3 font-mono text-sm text-foreground placeholder-foreground/20 outline-none focus:outline-none focus:ring-0 focus:border-transparent shadow-none appearance-none"
        />
        {/* Static underline rail */}
        <div className="absolute bottom-0 left-0 h-px w-full bg-dark-blue-ui/60" />
        {/* Animated fill */}
        <motion.div
          className="absolute bottom-0 left-0 h-px"
          style={{ backgroundColor: "var(--color-blue)" }}
          animate={{ width: active ? "100%" : "0%" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────── */
export function Contact() {
  const [focused, setFocused] = useState<string | null>(null);
  const [messageFocused, setMessageFocused] = useState(false);
  const [result, setResult] = useState("");
  const headingRef = useRef<HTMLDivElement>(null);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    formData.append("access_key", "e5fae1a1-313b-4ad9-8c6a-0da3cf820b15");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data.success ? "Success!" : "Error");
  };

  /* ── GSAP: staggered word clip-reveal on heading ─────────────────── */
  useGSAP(
    () => {
      if (!headingRef.current) return;
      const words = headingRef.current.querySelectorAll<HTMLElement>(".word-inner");
      gsap.from(words, {
        y: 90,
        opacity: 0,
        duration: 0.95,
        stagger: 0.13,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: headingRef }
  );

  return (
    <section id="contact" className="relative overflow-hidden bg-background">
      {/* Top ambient rule */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* ── HERO HEADER ───────────────────────────────────────────────── */}
      <div className="relative border-b border-dark-blue-ui/30 px-6 pb-20 pt-36 md:px-12">
        {/* Left ambient glow */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[800px] -translate-x-1/4 opacity-25"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 20% 80%, rgba(0,122,229,0.18) 0%, transparent 60%)",
          }}
        />
        {/* Right ambient glow */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-[400px] w-[500px] translate-x-1/4 opacity-20"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 80% 20%, rgba(201,168,240,0.15) 0%, transparent 60%)",
          }}
        />

        <div className="relative mx-auto max-w-7xl">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="mb-10 flex items-center gap-4"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-blue">
              05 — Contact
            </span>
            <div className="h-px w-16 bg-dark-blue-ui/50" />
          </motion.div>

          {/* Big stacked heading — GSAP clip-reveal */}
          <div ref={headingRef}>
            {/* "Let's" — solid */}
            <div className="overflow-hidden">
              <div
                className="word-inner font-display font-black leading-[0.88] tracking-tight text-foreground"
                style={{ fontSize: "clamp(72px, 12vw, 170px)" }}
              >
                Let&apos;s
              </div>
            </div>
            {/* "Build" — ghost outlined */}
            <div className="overflow-hidden">
              <div
                className="word-inner font-display font-black leading-[0.88] tracking-tight text-transparent"
                style={{
                  fontSize: "clamp(72px, 12vw, 170px)",
                  WebkitTextStroke: "1px rgba(245,244,223,0.1)",
                }}
              >
                Build
              </div>
            </div>
            {/* "Something." — gradient */}
            <div className="overflow-hidden">
              <div
                className="word-inner font-display font-black leading-[0.88] tracking-tight"
                style={{
                  fontSize: "clamp(72px, 12vw, 170px)",
                  background:
                    "linear-gradient(90deg, var(--color-blue) 0%, #c9a8f0 60%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Something.
              </div>
            </div>
          </div>

          {/* Sub-row: availability + clock */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
            className="mt-12 flex flex-wrap items-center gap-8 border-t border-dark-blue-ui/30 pt-8"
          >
            <AvailabilityBadge />
            <div className="h-4 w-px bg-dark-blue-ui/70" />
            <LiveClock />
            <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/20 md:block">
              Pune · India
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── AVAILABILITY TICKER STRIP ────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-dark-blue-ui/30 py-4">
        <style>{`
          @keyframes contact-ticker {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
          .contact-track {
            display: flex;
            width: max-content;
            animation: contact-ticker 22s linear infinite;
            will-change: transform;
          }
        `}</style>
        <div className="contact-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <div
              key={i}
              className="flex shrink-0 items-center gap-6 px-8 font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/18"
            >
              <span>{item}</span>
              <span style={{ color: "var(--color-blue)", opacity: 0.4 }}>·</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── BODY: FORM + SOCIALS ─────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12">
        <div className="grid gap-16 lg:grid-cols-[1fr_1px_1fr] lg:gap-0">

          {/* ── Left: Form ───────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:pr-16"
          >
            <div className="mb-10 font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/25">
              // send_a_message
            </div>

            <form onSubmit={onSubmit} className="flex flex-col gap-8">
              <Field
                id="name"
                label="Your Name"
                type="text"
                placeholder="Krishna Bapatla"
                focused={focused}
                setFocused={setFocused}
              />
              <Field
                id="email"
                label="Email Address"
                type="email"
                placeholder="you@example.com"
                focused={focused}
                setFocused={setFocused}
              />
              <Field
                id="subject"
                label="Subject"
                type="text"
                placeholder="Let's build something real"
                focused={focused}
                setFocused={setFocused}
              />

              {/* Textarea — same underline treatment */}
              <div className="flex flex-col gap-2.5">
                <label
                  htmlFor="message"
                  className="font-mono text-[9px] uppercase tracking-[0.35em] text-foreground/35"
                >
                  Message
                </label>
                <div className="relative pb-px">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell me about your project or opportunity..."
                    onFocus={() => setMessageFocused(true)}
                    onBlur={() => setMessageFocused(false)}
                    className="w-full resize-none border-0 bg-transparent pb-3 font-mono text-sm text-foreground placeholder-foreground/20 outline-none"
                  />
                  <div className="absolute bottom-0 left-0 h-px w-full bg-dark-blue-ui/60" />
                  <motion.div
                    className="absolute bottom-0 left-0 h-px"
                    style={{ backgroundColor: "var(--color-blue)" }}
                    animate={{ width: messageFocused ? "100%" : "0%" }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <AnimatePresence mode="wait">
                  {result === "Success!" ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-3 font-mono text-sm"
                      style={{ color: "#4ade80" }}
                    >
                      <span>✓</span> Message sent — I&apos;ll be in touch soon.
                    </motion.div>
                  ) : (
                    <motion.button
                      key="btn"
                      type="submit"
                      className="group relative flex items-center gap-4 overflow-hidden bg-blue px-8 py-4 font-mono text-xs uppercase tracking-widest text-white transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(0,122,229,0.3)]"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        clipPath:
                          "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                      }}
                    >
                      {/* Shimmer sweep */}
                      <motion.div
                        className="absolute inset-0 -skew-x-12 bg-white/[0.08]"
                        initial={{ x: "-180%" }}
                        whileHover={{ x: "180%" }}
                        transition={{ duration: 0.55 }}
                      />
                      Send Message
                      <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>

          {/* Column divider */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
            className="hidden origin-top bg-dark-blue-ui/35 lg:block"
            style={{ width: 1 }}
          />

          {/* ── Right: Info + Socials ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
            className="lg:pl-16"
          >
            <div className="mb-10 font-mono text-[10px] uppercase tracking-[0.35em] text-foreground/25">
              // connect_with_me
            </div>

            <p className="max-w-sm font-mono text-sm leading-[2.1] text-foreground/45">
              Open to full-time roles, freelance projects, and AI-powered
              product builds. If you have a vision that needs engineering
              precision, let&apos;s talk.
            </p>

            {/* Social rows — staggered reveal */}
            <div className="mt-12 flex flex-col border-t border-dark-blue-ui/35">
              {socials.map((s, i) => {
                const Icon = s.icon;
                const row = (
                  <motion.div
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: 0.1 + i * 0.08,
                      ease: EASE,
                    }}
                    className="group flex items-center justify-between border-b border-dark-blue-ui/35 py-5 transition-all duration-300 hover:pl-2"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center border border-dark-blue-ui/70 transition-all duration-300 group-hover:border-blue/35 group-hover:bg-blue/[0.06]"
                      >
                        <Icon
                          className="h-3.5 w-3.5 transition-colors duration-300 group-hover:text-blue"
                          style={{ color: "rgba(245,244,223,0.3)" }}
                        />
                      </div>
                      <div>
                        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-foreground/25">
                          {s.label}
                        </div>
                        <div className="mt-0.5 font-mono text-sm text-foreground/60 transition-colors duration-300 group-hover:text-foreground">
                          {s.handle}
                        </div>
                      </div>
                    </div>
                    {s.href && (
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-foreground/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-blue" />
                    )}
                  </motion.div>
                );

                return s.href ? (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {row}
                  </a>
                ) : (
                  <div key={s.label}>{row}</div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── FOOTER STRIP ─────────────────────────────────────────────── */}
      <div className="border-t border-dark-blue-ui/30 px-6 py-7 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-foreground/20">
            © Krishna Bhargav · 2026
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/15 md:block">
            Built with Next.js · Framer Motion · GSAP
          </span>
        </div>
      </div>
    </section>
  );
}
