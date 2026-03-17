"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Linkedin, Github, ArrowUpRight } from "lucide-react";

const socials = [
  {
    icon: Github,
    label: "GitHub",
    handle: "github.com/krishnabhargav",
    href: "https://github.com/krishnabhargav",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "linkedin.com/in/krishnabhargav",
    href: "https://www.linkedin.com/in/krishnabhargav",
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

export function Contact() {
  const [focused, setFocused] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative overflow-hidden py-40 px-8">
      {/* top divider */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-full -translate-x-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-[#00ffaa]/4 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-20 flex items-center gap-4"
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#00ffaa]">
            05 — Contact
          </span>
          <div className="h-px flex-1 bg-white/5 max-w-xs" />
        </motion.div>

        <div className="grid gap-20 lg:grid-cols-[1fr_480px]">
          {/* Left */}
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(48px,7vw,100px)] font-black leading-[0.92] tracking-tight text-white"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Let's Build
              <br />
              <span
                className="text-transparent"
                style={{ WebkitTextStroke: "1px rgba(255,255,255,0.13)" }}
              >
                Something
              </span>
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #00ffaa, #7b5cff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Real.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-10 max-w-md font-mono text-sm leading-[2] text-white/35"
            >
              Open to full-time roles, freelance projects, and AI-powered product
              builds. If you have a vision that needs engineering precision, let's
              talk.
            </motion.p>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-14 flex flex-col gap-0 divide-y divide-white/5 border-t border-white/5"
            >
              {socials.map((s) => {
                const Icon = s.icon;
                const inner = (
                  <div className="group flex items-center justify-between py-5 transition-all duration-300 hover:pl-2">
                    <div className="flex items-center gap-5">
                      <div className="flex h-9 w-9 items-center justify-center border border-white/8 text-white/30 transition-colors duration-300 group-hover:border-[#00ffaa]/30 group-hover:text-[#00ffaa]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
                          {s.label}
                        </div>
                        <div className="font-mono text-sm text-white/60 transition-colors duration-300 group-hover:text-white">
                          {s.handle}
                        </div>
                      </div>
                    </div>
                    {s.href && (
                      <ArrowUpRight className="h-4 w-4 text-white/15 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#00ffaa]" />
                    )}
                  </div>
                );

                return s.href ? (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {inner}
                  </a>
                ) : (
                  <div key={s.label}>{inner}</div>
                );
              })}
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 border border-white/5 bg-white/[0.015] p-8"
              style={{
                clipPath:
                  "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
              }}
            >
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/25">
                // send_message
              </div>

              {/* Name + Email row */}
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { id: "name", label: "Name", type: "text", placeholder: "Krishna Bapatla" },
                  { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
                ].map((f) => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label
                      htmlFor={f.id}
                      className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25"
                    >
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      placeholder={f.placeholder}
                      onFocus={() => setFocused(f.id)}
                      onBlur={() => setFocused(null)}
                      className="border border-white/8 bg-transparent px-4 py-3 font-mono text-sm text-white placeholder-white/20 outline-none transition-all duration-300"
                      style={{
                        borderColor:
                          focused === f.id
                            ? "rgba(0,255,170,0.35)"
                            : "rgba(255,255,255,0.06)",
                        background:
                          focused === f.id
                            ? "rgba(0,255,170,0.02)"
                            : "transparent",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="subject"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25"
                >
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="Let's build something together"
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  className="border border-white/8 bg-transparent px-4 py-3 font-mono text-sm text-white placeholder-white/20 outline-none transition-all duration-300"
                  style={{
                    borderColor:
                      focused === "subject"
                        ? "rgba(0,255,170,0.35)"
                        : "rgba(255,255,255,0.06)",
                    background:
                      focused === "subject"
                        ? "rgba(0,255,170,0.02)"
                        : "transparent",
                  }}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="message"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  className="resize-none border border-white/8 bg-transparent px-4 py-3 font-mono text-sm text-white placeholder-white/20 outline-none transition-all duration-300"
                  style={{
                    borderColor:
                      focused === "message"
                        ? "rgba(0,255,170,0.35)"
                        : "rgba(255,255,255,0.06)",
                    background:
                      focused === "message"
                        ? "rgba(0,255,170,0.02)"
                        : "transparent",
                  }}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group relative mt-2 flex items-center justify-center gap-3 overflow-hidden bg-[#00ffaa] px-8 py-4 font-mono text-xs font-semibold uppercase tracking-widest text-black transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,170,0.3)]"
                style={{
                  clipPath:
                    "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                }}
              >
                {sent ? (
                  <>Message Sent ✓</>
                ) : (
                  <>
                    Send Message
                    <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}