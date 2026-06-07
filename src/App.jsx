import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Welcome from './components/Welcome';
import Projects from './components/Projects';
import Service from './components/Service';
import Contact from './components/Contact';
import Footer from './components/Footer';

import './index.css';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      smoothTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Portfolio />
        <Hero />
        <Welcome />
        <Projects />
        <Service />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
