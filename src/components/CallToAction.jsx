import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

const CallToAction = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo(textRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(buttonRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="py-40 bg-brand-terracotta text-brand-beige w-full relative overflow-hidden">
      
      {/* Decorative background circles */}
      <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] bg-white/5 rounded-full blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-[-50%] right-[-10%] w-[60%] h-[150%] bg-black/5 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        <div ref={textRef}>
          <h2 className="text-5xl md:text-8xl font-serif mb-8 leading-tight">
            Ready to <span className="italic">Bloom?</span>
          </h2>
          <p className="text-xl md:text-2xl font-sans max-w-2xl mx-auto opacity-90 mb-12">
            Download the BloomPot app today and transform your space with our premium collection.
          </p>
        </div>

        <button 
          ref={buttonRef}
          className="group relative inline-flex items-center justify-center gap-4 px-10 py-5 bg-brand-dark text-brand-beige rounded-full text-lg font-medium overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(26,26,26,0.3)] hover:shadow-[0_0_60px_rgba(26,26,26,0.5)]"
        >
          {/* Button Hover Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-green/20 to-brand-terracotta/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md"></div>
          
          <span className="relative z-10 font-sans tracking-wide">Get the App</span>
          
          <div className="relative z-10 w-8 h-8 rounded-full bg-brand-beige/10 flex items-center justify-center group-hover:bg-brand-beige group-hover:text-brand-dark transition-colors duration-300">
            <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        </button>

      </div>
    </section>
  );
};

export default CallToAction;
