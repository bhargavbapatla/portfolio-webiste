"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const socials = [
  { label: "GitHub", href: "https://github.com/krishnabhargav" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/krishnabhargav" },
  { label: "Email", href: "mailto:bhargav.bapatla20@gmail.com" },
  { label: "Location", href: null, value: "Pune, India" },
];

export function Contact() {
  const [sent, setSent] = useState(false);
  const transitionEase = [0.76, 0, 0.24, 1];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="relative py-32 px-6 lg:px-12 bg-[#050505] overflow-hidden">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-24 flex items-center justify-between border-b border-white/10 pb-6">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">05 // Inquiry</span>
        </div>

        <div className="grid gap-20 lg:grid-cols-[1.2fr_1fr] lg:gap-32">

          {/* Left Column: Typography & Socials */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="overflow-hidden mb-6 pb-6">
                <motion.h2
                  initial={{ y: "100%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: transitionEase }}
                  className="text-[clamp(50px,8vw,120px)] font-light leading-[0.85] tracking-tighter text-white"
                >
                  Let's build <br />
                  <span className="font-serif italic text-white/60">something real.</span>
                </motion.h2>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="max-w-md font-sans text-sm font-light leading-relaxed text-white/50 mt-8"
              >
                Open to full-time engineering roles, high-impact freelance projects, and AI-powered product builds. If you have a vision that requires architectural precision, let's talk.
              </motion.p>
            </div>

            {/* Editorial Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6, ease: transitionEase }}
              className="mt-20 flex flex-col border-t border-white/10"
            >
              {socials.map((s) => (
                <div key={s.label} className="group flex items-center justify-between border-b border-white/10 py-6 transition-colors hover:border-white/40">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-colors">
                    {s.label}
                  </span>
                  {s.href ? (
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 font-sans text-sm font-light text-white transition-transform duration-500 group-hover:-translate-x-2"
                    >
                      <span>Connect</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <span className="font-sans text-sm font-light text-white/60">
                      {s.value}
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Minimalist Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4, ease: transitionEase }}
            className="pt-4"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-12">

              <div className="flex flex-col gap-8">
                {/* Name Input */}
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder="What's your name?"
                    className="peer w-full border-b border-white/20 bg-transparent py-4 font-sans text-lg font-light text-white placeholder-transparent outline-none transition-colors focus:border-white"
                  />
                  <label
                    htmlFor="name"
                    className="pointer-events-none absolute left-0 top-4 font-sans text-lg font-light text-white/30 transition-all peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-white/50 peer-valid:-translate-y-6 peer-valid:text-xs peer-valid:text-white/50"
                  >
                    Name
                  </label>
                </div>

                {/* Email Input */}
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="What's your email?"
                    className="peer w-full border-b border-white/20 bg-transparent py-4 font-sans text-lg font-light text-white placeholder-transparent outline-none transition-colors focus:border-white"
                  />
                  <label
                    htmlFor="email"
                    className="pointer-events-none absolute left-0 top-4 font-sans text-lg font-light text-white/30 transition-all peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-white/50 peer-valid:-translate-y-6 peer-valid:text-xs peer-valid:text-white/50"
                  >
                    Email Address
                  </label>
                </div>

                {/* Message Input */}
                <div className="relative mt-4">
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Tell me about your project..."
                    className="peer w-full resize-none border-b border-white/20 bg-transparent py-4 font-sans text-lg font-light text-white placeholder-transparent outline-none transition-colors focus:border-white"
                  />
                  <label
                    htmlFor="message"
                    className="pointer-events-none absolute left-0 top-4 font-sans text-lg font-light text-white/30 transition-all peer-focus:-translate-y-6 peer-focus:text-xs peer-focus:text-white/50 peer-valid:-translate-y-6 peer-valid:text-xs peer-valid:text-white/50"
                  >
                    Project Details
                  </label>
                </div>
              </div>

              {/* Monochromatic Button */}
              <button
                type="submit"
                className="group flex w-full items-center justify-between border border-white bg-white px-8 py-6 transition-all duration-500 hover:bg-[#050505]"
              >
                {/* Added leading-normal to stop text clipping */}
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] leading-normal text-black transition-colors duration-500 group-hover:text-white">
                  {sent ? "Message Delivered" : "Submit Inquiry"}
                </span>

                {/* Fixed relative positioning for clean arrow translation */}
                <div className="relative h-5 w-5 overflow-hidden">
                  <ArrowUpRight className="absolute inset-0 h-5 w-5 text-black transition-all duration-500 group-hover:-translate-y-full group-hover:translate-x-full" />
                  <ArrowUpRight className="absolute inset-0 -translate-x-full translate-y-full h-5 w-5 text-white transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
                </div>
              </button>

            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}