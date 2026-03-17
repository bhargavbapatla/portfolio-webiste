"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowDownRight } from "lucide-react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    // Hold the loading screen for 1.2 seconds
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // This specific bezier curve is the industry standard for a heavy, cinematic glide
  const transitionEase = [0.76, 0, 0.24, 1];

  return (
    <section ref={containerRef} className="relative h-screen w-full bg-[#050505] overflow-hidden">

      {/* 1. The Preloader (Flies TOWARD the camera) */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="preloader"
            exit={{
              opacity: 0,
              scale: 1.5, // Scales up to simulate flying past the user
            }}
            transition={{ duration: 1.4, ease: transitionEase }}
            // will-change and transform-gpu force the graphics card to handle this layer
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505] transform-gpu origin-center"
            style={{ willChange: "transform, opacity" }}
          >
            <motion.div
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: transitionEase }}
              className="font-mono text-[11px] tracking-[0.4em] text-white/50 uppercase transform-gpu"
            >
              Initiating Sequence...
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. The Background Landing (Drops INTO place) */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        // Scales down from 1.1 to 1.0 as the preloader flies past
        animate={isLoading ? { scale: 1.1, opacity: 0 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: transitionEase }}
        style={{ y: yParallax, opacity: opacityFade, willChange: "transform, opacity" }}
        className="absolute inset-0 z-0 transform-gpu"
      >
        <div className="absolute inset-0 opacity-40 mix-blend-screen"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.06) 0%, transparent 40%),
              radial-gradient(circle at 80% 70%, rgba(255, 255, 255, 0.04) 0%, transparent 50%)
            `,
          }}
        />
        {/* We keep the SVG grain static to prevent rendering jank during the animation */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}
        />
      </motion.div>

      {/* 3. The Main UI Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-12 lg:p-16">

        {/* Top Header Row */}
        <div className="flex justify-between items-start overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isLoading ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: transitionEase, delay: 0.2 }}
            className="font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase transform-gpu"
          >
            Krishnabhargav Bapatla <br />
            Pune, India
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isLoading ? { opacity: 0, y: -20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: transitionEase, delay: 0.3 }}
            className="text-right font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase transform-gpu"
          >
            Availability <br />
            <span className="text-white">Active</span>
          </motion.div>
        </div>

        {/* Center Typography */}
        <div className="w-full">
          {/* pb-4 prevents descender clipping (like the bottom of a 'g') */}
          <div className="overflow-hidden mb-2 pb-4">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              // Removed rotation to ensure pixel-perfect text rendering during animation
              animate={isLoading ? { y: "100%", opacity: 0 } : { y: "0%", opacity: 1 }}
              transition={{ duration: 1.2, ease: transitionEase, delay: 0.1 }}
              className="font-serif text-[clamp(50px,10vw,160px)] font-light leading-[0.85] tracking-tight text-white transform-gpu"
              style={{ willChange: "transform, opacity" }}
            >
              Software Engineer
            </motion.h1>
          </div>
          <div className="overflow-hidden flex items-center gap-6 pb-4">
            <motion.h1
              initial={{ y: "100%", opacity: 0 }}
              animate={isLoading ? { y: "100%", opacity: 0 } : { y: "0%", opacity: 1 }}
              transition={{ duration: 1.2, ease: transitionEase, delay: 0.2 }}
              className="font-sans text-[clamp(40px,8vw,140px)] font-bold leading-[0.85] tracking-tighter text-white/80 transform-gpu"
              style={{ willChange: "transform, opacity" }}
            >
              <span className="italic font-serif font-light text-white">Gen</span>AI Systems.
            </motion.h1>
          </div>
        </div>

        {/* Bottom Details Row */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 border-t border-white/10 pt-8 overflow-hidden">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isLoading ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: transitionEase, delay: 0.4 }}
            className="max-w-md font-sans text-sm font-light leading-relaxed text-white/60 transform-gpu"
          >
            With over 3 years of experience orchestrating scalable platforms and agentic AI workflows. Designing the architecture where data meets elegant interfaces.
          </motion.p>

          <motion.a
            href="#projects"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoading ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: transitionEase, delay: 0.5 }}
            className="group flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-colors hover:bg-white hover:text-black transform-gpu"
          >
            <span className="sr-only">Scroll Down</span>
            <ArrowDownRight className="h-6 w-6 transition-transform duration-500 group-hover:rotate-[-45deg]" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}