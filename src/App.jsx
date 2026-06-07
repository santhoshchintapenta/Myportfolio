import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Welcome from './components/Welcome';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollIndicator from './components/ScrollIndicator';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      if (isLoading) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
        window.scrollTo(0, 0);
      }
    }
  }, [isLoading]);

  return (
    <div className="relative">
      {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <main>
        <Hero isLoading={isLoading} />
        <Welcome />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollIndicator />
    </div>
  );
}

export default App;
