import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />

      <footer className="py-12 px-6 lg:px-12 border-t border-white/10 bg-[#050505]">
        <div className="mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

          <div className="font-sans text-sm tracking-tight text-white">
            Krishnabhargav<span className="opacity-30">.</span>
          </div>

          <div className="flex gap-8 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
            <a href="https://github.com/krishnabhargav" className="hover:text-white transition-colors">Github</a>
            <a href="https://linkedin.com/in/krishnabhargav" className="hover:text-white transition-colors">LinkedIn</a>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-widest text-white/20">
            © {new Date().getFullYear()} / All rights reserved.
          </p>

        </div>
      </footer>
    </main>
  );
}