import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Hero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const scrollIndicatorRef = useRef(null);

  useEffect(() => {
    // Text reveal animation
    const tl = gsap.timeline();
    
    // Split text logic simulated with spans for simplicity, 
    // ideally use SplitText but it's a premium plugin
    const titleElements = textRef.current.querySelectorAll('.reveal-text');
    
    tl.fromTo(titleElements, 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        stagger: 0.15, 
        ease: "power4.out",
        delay: 0.2
      }
    )
    .fromTo(imageRef.current,
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(scrollIndicatorRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.5"
    );

    // Parallax on scroll
    gsap.to(imageRef.current, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Floating animation
    gsap.to(imageRef.current, {
      y: "+=15",
      duration: 2.5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      delay: 2 // Wait for intro to finish
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-beige"
    >
      <div className="absolute inset-0 z-0">
        {/* Abstract background gradient to look premium */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-brand-terracotta/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-brand-green/10 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center justify-between h-full pt-20">
        <div className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left z-20" ref={textRef}>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-brand-dark leading-tight mb-6 overflow-hidden">
            <div className="overflow-hidden inline-block"style={{marginBottom:"-10px"}}><span className="reveal-text inline-block">Nature's</span></div><br/>
            <div className="overflow-hidden inline-block"><span className="reveal-text inline-block">Elegance,</span></div><br/>
            <div className="overflow-hidden inline-block"><span className="reveal-text inline-block text-brand-green italic">Delivered.</span></div>
          </h1>
          <div className="overflow-hidden">
            <p className="reveal-text text-lg md:text-xl text-brand-dark/70 font-sans max-w-md mx-auto md:mx-0">
              Premium flower pots and curated plants for the modern home. Shop directly from your mobile.
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 h-1/2 md:h-full relative flex items-center justify-center z-10 mt-10 md:mt-0">
          <div ref={imageRef} className="relative w-full max-w-lg aspect-[4/5] drop-shadow-2xl">
            {/* Placeholder for a high-quality pot/plant image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-terracotta/30 to-brand-green/20 rounded-[2rem] overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=1000" 
                alt="Premium Plant Pot" 
                className="w-full h-full object-cover rounded-[2rem] mix-blend-multiply"
              />
            </div>
          </div>
        </div>
      </div>

      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 z-20"
      >
        <span className="text-xs uppercase tracking-[0.2em] text-brand-dark/60 font-medium">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-brand-dark/20 overflow-hidden relative">
          <div className="w-full h-full bg-brand-dark absolute top-0 left-0 origin-top animate-[scroll_2s_ease-in-out_infinite]" />
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          50.1% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
