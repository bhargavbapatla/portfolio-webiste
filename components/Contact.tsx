"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Linkedin, Github } from "lucide-react";

const socials = [
  { icon: Github, label: "GitHub", handle: "github.com/krishnabhargav", href: "https://github.com/krishnabhargav" },
  { icon: Linkedin, label: "LinkedIn", handle: "linkedin.com/in/krishnabhargav", href: "https://www.linkedin.com/in/krishnabhargav" },
  { icon: Mail, label: "Email", handle: "bhargav.bapatla20@gmail.com", href: "mailto:bhargav.bapatla20@gmail.com" },
  { icon: MapPin, label: "Location", handle: "Pune, India · Remote Friendly", href: null },
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
    <section id="contact" className="py-32 px-8" style={{ background: "#edeae5" }}>
      <div className="mx-auto max-w-7xl">

        {/* Header row */}
        <div className="flex items-baseline justify-between border-b border-black/10 pb-6 mb-16">
          <span className="mono text-[11px] tracking-[0.25em] uppercase text-black/35">05 — Contact</span>
          <span className="sans text-[13px] text-black/35">Let's Build Something</span>
        </div>

        <div className="grid gap-20 lg:grid-cols-[1fr_480px]">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="serif text-[clamp(42px,6vw,84px)] font-black leading-[0.95] tracking-tight text-black">
              Start a<br />
              <em className="italic">conversation.</em>
            </h2>

            <p className="mt-8 max-w-md sans text-[15px] leading-relaxed text-black/50 font-light">
              Open to full-time roles, freelance builds, and AI-powered product
              projects. If you have a vision that needs precise engineering —
              let's connect.
            </p>

            {/* Social links */}
            <div className="mt-12 flex flex-col border-t border-black/10">
              {socials.map((s) => {
                const Icon = s.icon;
                const inner = (
                  <div className="group flex items-center justify-between py-5 border-b border-black/8 transition-all duration-200 hover:pl-1">
                    <div className="flex items-center gap-4">
                      <div className="h-8 w-8 flex items-center justify-center border border-black/12 text-black/35 group-hover:border-black/30 group-hover:text-black transition-all" style={{ borderRadius: "2px" }}>
                        <Icon className="h-3.5 w-3.5" />
                      </div>
                      <div>
                        <div className="mono text-[10px] uppercase tracking-wider text-black/30">{s.label}</div>
                        <div className="sans text-[13px] text-black/60 group-hover:text-black transition-colors font-medium">{s.handle}</div>
                      </div>
                    </div>
                    {s.href && <ArrowUpRight className="h-4 w-4 text-black/20 transition-all duration-200 group-hover:text-black group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
                  </div>
                );
                return s.href ? (
                  <a key={s.label} href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div key={s.label}>{inner}</div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-5 p-8 border border-black/10"
              style={{ borderRadius: "4px", background: "#f5f2ee" }}
            >
              <div className="mono text-[10px] uppercase tracking-[0.25em] text-black/30 mb-1">// send a message</div>

              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { id: "name", label: "Name", type: "text", ph: "Krishnabhargav" },
                  { id: "email", label: "Email", type: "email", ph: "you@example.com" },
                ].map((f) => (
                  <div key={f.id} className="flex flex-col gap-2">
                    <label htmlFor={f.id} className="mono text-[10px] uppercase tracking-wider text-black/35">{f.label}</label>
                    <input
                      id={f.id} type={f.type} placeholder={f.ph}
                      onFocus={() => setFocused(f.id)} onBlur={() => setFocused(null)}
                      className="w-full px-4 py-3 sans text-[13px] text-black placeholder-black/25 outline-none transition-all duration-200"
                      style={{
                        background: "#f8f6f2",
                        border: `1px solid ${focused === f.id ? "rgba(10,10,10,0.4)" : "rgba(10,10,10,0.12)"}`,
                        borderRadius: "2px",
                      }}
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="mono text-[10px] uppercase tracking-wider text-black/35">Subject</label>
                <input
                  id="subject" type="text" placeholder="Let's work together"
                  onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                  className="w-full px-4 py-3 sans text-[13px] text-black placeholder-black/25 outline-none transition-all duration-200"
                  style={{ background: "#f8f6f2", border: `1px solid ${focused === "subject" ? "rgba(10,10,10,0.4)" : "rgba(10,10,10,0.12)"}`, borderRadius: "2px" }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="mono text-[10px] uppercase tracking-wider text-black/35">Message</label>
                <textarea
                  id="message" rows={5} placeholder="Tell me about your project..."
                  onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                  className="w-full px-4 py-3 sans text-[13px] text-black placeholder-black/25 outline-none transition-all duration-200 resize-none"
                  style={{ background: "#f8f6f2", border: `1px solid ${focused === "message" ? "rgba(10,10,10,0.4)" : "rgba(10,10,10,0.12)"}`, borderRadius: "2px" }}
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-3 bg-[#0a0a0a] text-[#f5f2ee] py-4 sans text-[13px] font-medium tracking-wide transition-all duration-200 hover:bg-black/80 mt-2"
                style={{ borderRadius: "2px" }}
              >
                {sent ? "Message Sent ✓" : (
                  <><span>Send Message</span><ArrowUpRight className="h-4 w-4" /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}