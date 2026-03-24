import { Preloader } from "@/components/Preloader"; // <-- Import it
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Journey } from "@/components/Journey";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black">
      <Preloader /> {/* <-- Place it at the very top */}
      <Navbar />
      <Hero />
      <About />
      <Journey />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}