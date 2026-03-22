import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Storytelling = () => {
  const containerRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  
  // Elements to parallax
  const potRef = useRef(null);
  const plantFrontRef = useRef(null);
  const plantBackRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=200%", // Keep pinned for 2 screen heights
        pin: true,
        scrub: 1,
      }
    });

    // Initial state
    gsap.set([text2Ref.current, text3Ref.current], { opacity: 0, y: 50 });
    gsap.set(potRef.current, { scale: 0.8, y: 100 });
    gsap.set(plantBackRef.current, { scale: 0.5, y: 150, opacity: 0 });
    gsap.set(plantFrontRef.current, { scale: 0.6, y: 200, opacity: 0 });

    // Animation sequence
    tl.to(text1Ref.current, { opacity: 0, y: -50, duration: 1 })
      .to(potRef.current, { scale: 1, y: 0, duration: 2 }, "<")
      .to(plantBackRef.current, { scale: 1, y: 0, opacity: 1, duration: 2 }, "<0.5")
      
      .to(text2Ref.current, { opacity: 1, y: 0, duration: 1 }, "-=1")
      .to(text2Ref.current, { opacity: 0, y: -50, duration: 1, delay: 1 })
      
      .to(plantFrontRef.current, { scale: 1.2, y: -20, opacity: 1, duration: 2 }, "-=1")
      .to(potRef.current, { scale: 1.1, duration: 2 }, "<")
      
      .to(text3Ref.current, { opacity: 1, y: 0, duration: 1 }, "-=1");

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-[#1c2e17] text-brand-beige overflow-hidden relative flex items-center justify-center">
      
      {/* Background ambient light */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
        <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full bg-brand-green/30 blur-[100px]"></div>
      </div>

      {/* Layered Graphics */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        {/* Background Plant Leaves (blur) */}
        <div ref={plantBackRef} className="absolute w-[600px] h-[600px] opacity-60 mix-blend-screen filter blur-[2px]">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-brand-green">
            <path d="M45.7,-76.4C58.9,-69.3,69.1,-55.3,77.7,-40.8C86.3,-26.3,93.4,-11.3,92.6,3.4C91.8,18.1,83.1,32.5,72.4,44.7C61.7,56.9,49.1,66.9,34.8,74.6C20.5,82.3,4.4,87.7,-11.4,89.5C-27.2,91.3,-42.6,89.5,-55.9,82C-69.2,74.5,-80.4,61.3,-87.3,46.1C-94.2,30.9,-96.8,13.7,-93.2,-2.1C-89.6,-17.9,-79.8,-32.3,-68.5,-44.6C-57.2,-56.9,-44.4,-67.1,-30.5,-73.4C-16.6,-79.7,-1.6,-82.1,13.9,-81.1C29.4,-80.1,45,-75.7,45.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>

        {/* The Pot */}
        <div ref={potRef} className="absolute w-[300px] h-[350px] z-20 translate-y-20">
          <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#e07a5f] drop-shadow-2xl">
            <path d="M10,20 L90,20 C95,20 98,25 98,30 L85,110 C83,115 78,120 70,120 L30,120 C22,120 17,115 15,110 L2,30 C2,25 5,20 10,20 Z" />
            <rect x="5" y="5" width="90" height="15" rx="3" fill="#d06a4f" />
            {/* Highlight */}
            <path d="M15,20 L30,20 L25,110 L18,110 Z" fill="#eb8a6f" opacity="0.4" />
          </svg>
        </div>

        {/* Foreground Plant Leaves (sharp) */}
        <div ref={plantFrontRef} className="absolute w-[700px] h-[700px] z-30 opacity-90 -translate-y-10">
           <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full fill-[#3a5a2f] drop-shadow-2xl">
            <path d="M47.5,-71.4C59.9,-61.8,67.3,-45.7,73.5,-29.4C79.7,-13.1,84.7,3.5,80.6,18.4C76.5,33.3,63.3,46.5,48.7,56.5C34.1,66.5,18.1,73.3,1.3,71.2C-15.5,69.1,-31,58.1,-45.3,46.8C-59.6,35.5,-72.7,23.9,-78.4,9.1C-84.1,-5.7,-82.4,-23.7,-73.4,-37.9C-64.4,-52.1,-48.1,-62.5,-32.5,-70.7C-16.9,-78.9,-2,-84.9,11.8,-82.6C25.6,-80.3,35.1,-69.7,47.5,-71.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* Storytelling Text */}
      <div className="relative z-40 w-full h-full flex flex-col items-center justify-center pointer-events-none text-center px-6">
        
        <div ref={text1Ref} className="absolute">
          <h2 className="text-5xl md:text-7xl font-serif mb-6">From Earth.</h2>
          <p className="text-xl font-sans text-brand-beige/70 max-w-md mx-auto">Sustainably sourced materials, shaped by master artisans.</p>
        </div>

        <div ref={text2Ref} className="absolute">
          <h2 className="text-5xl md:text-7xl font-serif mb-6">To Seed.</h2>
          <p className="text-xl font-sans text-brand-beige/70 max-w-md mx-auto">Providing the perfect environment for your greenery to thrive.</p>
        </div>

        <div ref={text3Ref} className="absolute">
          <h2 className="text-5xl md:text-7xl font-serif mb-6">To Your Home.</h2>
          <p className="text-xl font-sans text-brand-beige/70 max-w-md mx-auto">A seamless journey bringing nature into your daily life.</p>
        </div>

      </div>
    </section>
  );
};

export default Storytelling;
