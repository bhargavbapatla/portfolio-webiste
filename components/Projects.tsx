"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    num: "01",
    title: "Nutrimind",
    category: "AI · HealthTech",
    description:
      "A personalized diet recommendation system powered by Agentic AI. Engineered to dynamically analyze nutritional requirements and generate tailored meal plans using state-of-the-art LLMs.",
    tags: ["Generative AI", "React", "TypeScript", "Prompt Engineering"],
    link: "#",
    github: "#",
  },
  {
    num: "02",
    title: "Low-Code Enterprise SaaS",
    category: "Architecture · Frontend",
    description:
      "Spearheaded the frontend architecture using React.js and TypeScript. Built real-time synchronization via Webhooks and Redis, cutting server requests by 60% with sub-200ms latency.",
    tags: ["React", "Redis", "Cube.js", "Webhooks"],
    link: "#",
    github: "#",
  },
  {
    num: "03",
    title: "Automated Workflow Engine",
    category: "Automation · n8n",
    description:
      "Architected an end-to-end n8n workflow for dynamic CV generation and evaluation. Leveraged Gemini LLMs to evaluate resumes against job descriptions and track data via Google Sheets APIs.",
    tags: ["n8n", "Gemini API", "Automation", "Google Sheets API"],
    link: "#",
    github: "#",
  },
  {
    num: "04",
    title: "Vision Transformer Classification",
    category: "Machine Learning",
    description:
      "Achieved 89.87% accuracy on the CIFAR-100 dataset. Implemented a custom CNN architecture benchmarked against a fine-tuned Vision Transformer, applying NLP self-attention to image classification.",
    tags: ["TensorFlow", "Keras", "ViT", "Python"],
    link: "#",
    github: "#",
  },
];

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef<HTMLElement>(null);
  const transitionEase = [0.76, 0, 0.24, 1];

  return (
    <section id="projects" ref={ref} className="relative py-32 px-6 lg:px-12 bg-[#050505]">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mb-20 flex items-center justify-between border-b border-white/10 pb-6">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40">02 // Selected Works</span>
        </div>

        {/* Large Typography Title */}
        <div className="mb-24 overflow-hidden pb-6">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: transitionEase }}
            className="text-[clamp(40px,7vw,110px)] font-light leading-[0.85] tracking-tighter text-white"
          >
            Digital <span className="font-serif italic text-white/60">Craft.</span>
          </motion.h2>
        </div>

        {/* The List */}
        <div className="flex flex-col border-t border-white/10">
          {projects.map((p, i) => {
            const isHovered = hoveredIndex === i;
            const isDimmed = hoveredIndex !== null && hoveredIndex !== i;

            return (
              <motion.div
                key={p.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: transitionEase }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={cn(
                  "group relative grid grid-cols-1 items-start gap-8 border-b border-white/10 py-12 transition-opacity duration-500 lg:grid-cols-[100px_1fr_1fr_auto]",
                  isDimmed ? "opacity-30" : "opacity-100"
                )}
              >
                {/* Number */}
                <div className="font-mono text-sm tracking-widest text-white/40">
                  {p.num}
                </div>

                {/* Title & Category */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-sans text-3xl font-light tracking-tight text-white lg:text-4xl">
                    {p.title}
                  </h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">
                    {p.category}
                  </span>
                </div>

                {/* Description & Tags */}
                <div className="flex max-w-sm flex-col gap-6">
                  <p className="font-sans text-sm font-light leading-relaxed text-white/50">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-white/40">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-6 pt-2 lg:flex-col lg:items-end lg:pt-0">
                  <a href={p.link} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40 transition-colors hover:text-white">
                    <span>View</span>
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </a>
                  <a href={p.github} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-white/40 transition-colors hover:text-white">
                    <span>Source</span>
                    <Github className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}