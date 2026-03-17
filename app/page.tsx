import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen selection:bg-purple-500/30 selection:text-purple-200">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-bricolage text-xl font-bold italic tracking-tighter">
            Aura<span className="text-purple-500">.</span>
          </div>
          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} Aura Portfolio. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs uppercase tracking-widest font-bold text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
