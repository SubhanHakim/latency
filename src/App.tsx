import { useRef, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Gallery from './components/sections/Gallery';
import Footer from './components/sections/Footer';
import Cursor from './components/ui/CustomCursor';
import Support from './components/sections/Support';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis for smooth scrolling with 'heavy' feel
    const lenis = new Lenis({
      duration: 2.0, // Increasing duration for 'latent' feel
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-[#6366f1] selection:text-white min-h-screen">
      <Cursor />

      <Navbar />

      <main className="relative z-10 flex flex-col w-full">
        <Hero />
        <About />
        <Gallery />
        <Support />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}



export default App;
