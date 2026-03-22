import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const products = [
  {
    id: 1,
    name: "The Terra Minimalist",
    price: "$85",
    image: "https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&q=80&w=800",
    description: "Hand-crafted terracotta with a modern silhouette."
  },
  {
    id: 2,
    name: "Obsidian Cylinder",
    price: "$120",
    image: "https://images.unsplash.com/photo-1416879598555-4089868e2bf5?auto=format&fit=crop&q=80&w=800",
    description: "Matte black finish for contemporary spaces."
  },
  {
    id: 3,
    name: "Marble Pedestal",
    price: "$195",
    image: "https://images.unsplash.com/photo-1545241047-6083a36ee15f?auto=format&fit=crop&q=80&w=800",
    description: "Premium stone pot with elevated base."
  },
  {
    id: 4,
    name: "Ceramic Cloud",
    price: "$95",
    image: "https://images.unsplash.com/photo-1453904300235-0f2f60b15b5d?auto=format&fit=crop&q=80&w=800",
    description: "Organic soft curves in off-white glaze."
  }
];

const ProductShowcase = () => {
  const containerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const scrollWrapper = scrollWrapperRef.current;

    // Calculate total scroll width
    const getScrollAmount = () => {
      let scrollWidth = scrollWrapper.scrollWidth;
      return -(scrollWidth - window.innerWidth);
    };

    const tween = gsap.to(scrollWrapper, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true, // Recalculate on resize
      }
    });

    // Card reveal animation
    cardsRef.current.forEach((card) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: card,
            containerAnimation: tween,
            start: "left 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-brand-dark text-brand-beige overflow-hidden py-20 flex flex-col justify-center">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-4xl md:text-6xl font-serif mb-4">Curated Collection</h2>
        <p className="text-brand-beige/70 font-sans max-w-md">Discover our premium range of flower pots, designed to elevate your living space.</p>
      </div>

      <div className="flex w-full overflow-hidden">
        <div 
          ref={scrollWrapperRef} 
          className="flex gap-8 px-6 md:px-20 w-[max-content]"
        >
          {products.map((product, index) => (
            <div 
              key={product.id}
              ref={el => cardsRef.current[index] = el}
              className="group relative w-[300px] md:w-[450px] aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer shrink-0"
            >
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 z-10" />
              
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              <div className="absolute bottom-0 left-0 w-full p-6 z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex justify-between items-end mb-2">
                  <h3 className="text-2xl font-serif">{product.name}</h3>
                  <span className="text-xl font-sans font-light">{product.price}</span>
                </div>
                <p className="text-sm font-sans text-brand-beige/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {product.description}
                </p>
                
                <button className="mt-4 w-full py-3 border border-brand-beige/30 rounded-lg text-sm uppercase tracking-widest hover:bg-brand-beige hover:text-brand-dark transition-colors duration-300 opacity-0 group-hover:opacity-100">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
