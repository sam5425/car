import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Hero from './components/Hero';
import ProductShowcase from './components/ProductShowcase';
import MobileAppExperience from './components/MobileAppExperience';
import Storytelling from './components/Storytelling';
import Features from './components/Features';
import PlantGallery from './components/PlantGallery';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    
    // Use only GSAP ticker to drive Lenis for perfect sync
    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="app-container">
      <Hero />
      <ProductShowcase />
      <MobileAppExperience />
      <Storytelling />
      <Features />
      <PlantGallery />
      <CallToAction />
      <Footer />
    </div>
  );
}

export default App;
