import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const images = [
  "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=800", // Tall pot
  "https://images.unsplash.com/photo-1416879598555-4089868e2bf5?auto=format&fit=crop&q=80&w=800", // Wide plant
  "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&q=80&w=800", // Minimalist
  "https://images.unsplash.com/photo-1545241047-6083a36ee15f?auto=format&fit=crop&q=80&w=800", // Shelf setup
  "https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?auto=format&fit=crop&q=80&w=800", // White pot
  "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=800", // Hanging plant
];

const PlantGallery = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    // Title reveal
    gsap.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    // Staggered image reveal with parallax effect
    itemsRef.current.forEach((item) => {
      // Reveal
      gsap.fromTo(item,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
          }
        }
      );

      // Subtle parallax on the image inside the container
      const img = item.querySelector('img');
      gsap.to(img, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="py-32 w-full bg-white text-brand-dark">
      <div className="container mx-auto px-6">
        
        <div ref={titleRef} className="mb-20">
          <h2 className="text-4xl md:text-6xl font-serif max-w-2xl leading-tight">
            Styled for <span className="italic text-brand-green">Modern Living.</span>
          </h2>
          <p className="mt-6 font-sans text-brand-dark/70 max-w-md text-lg">
            Get inspired by how our community incorporates BloomPot into their daily spaces.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          
          {/* Column 1 */}
          <div className="flex flex-col gap-6 md:gap-8">
            <div 
              ref={el => itemsRef.current[0] = el}
              className="w-full aspect-[3/4] rounded-3xl overflow-hidden group relative"
            >
              <img src={images[0]} alt="Styled plant" className="w-full h-[120%] object-cover -translate-y-[10%] group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
            </div>
            <div 
              ref={el => itemsRef.current[1] = el}
              className="w-full aspect-square rounded-3xl overflow-hidden group relative"
            >
              <img src={images[1]} alt="Styled plant" className="w-full h-[120%] object-cover -translate-y-[10%] group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
            </div>
          </div>

          {/* Column 2 (Offset slightly on desktop) */}
          <div className="flex flex-col gap-6 md:gap-8 md:mt-16">
            <div 
              ref={el => itemsRef.current[2] = el}
              className="w-full aspect-square rounded-3xl overflow-hidden group relative"
            >
              <img src={images[2]} alt="Styled plant" className="w-full h-[120%] object-cover -translate-y-[10%] group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
            </div>
            <div 
              ref={el => itemsRef.current[3] = el}
              className="w-full aspect-[3/4] rounded-3xl overflow-hidden group relative"
            >
              <img src={images[3]} alt="Styled plant" className="w-full h-[120%] object-cover -translate-y-[10%] group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-6 md:gap-8 lg:mt-32">
            <div 
              ref={el => itemsRef.current[4] = el}
              className="w-full aspect-[4/5] rounded-3xl overflow-hidden group relative"
            >
              <img src={images[4]} alt="Styled plant" className="w-full h-[120%] object-cover -translate-y-[10%] group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
            </div>
            <div 
              ref={el => itemsRef.current[5] = el}
              className="w-full aspect-square rounded-3xl overflow-hidden group relative hidden lg:block"
            >
              <img src={images[5]} alt="Styled plant" className="w-full h-[120%] object-cover -translate-y-[10%] group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PlantGallery;
