import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen" style={{ background: "#f5f2ee" }}>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />

      <footer className="px-8 py-10 border-t border-black/10" style={{ background: "#f5f2ee" }}>
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-baseline gap-1.5">
            <span className="serif text-lg font-black text-black">KB</span>
            <span className="mono text-[10px] text-black/30 tracking-widest">.dev</span>
          </div>
          <p className="mono text-[11px] tracking-wider text-black/30">
            © {new Date().getFullYear()} Krishnabhargav Bapatla · Pune, India
          </p>
          <div className="flex gap-8 mono text-[10px] uppercase tracking-[0.2em] text-black/30">
            <a href="#home" className="hover:text-black transition-colors">Top</a>
            <a href="#projects" className="hover:text-black transition-colors">Work</a>
            <a href="#contact" className="hover:text-black transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}