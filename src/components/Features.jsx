import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Leaf, Zap, Palette } from 'lucide-react';

const Features = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(itemsRef.current,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const features = [
    {
      icon: <Leaf size={32} />,
      title: "Eco-Friendly",
      description: "Our pots are made from 100% biodegradable and sustainably sourced materials."
    },
    {
      icon: <Zap size={32} />,
      title: "Fast Delivery",
      description: "Same-day delivery in select cities to ensure your plants arrive fresh and healthy."
    },
    {
      icon: <Palette size={32} />,
      title: "Stylish Design",
      description: "Modern, minimalist designs crafted to complement any interior aesthetic."
    }
  ];

  return (
    <section ref={containerRef} className="py-32 bg-brand-beige text-brand-dark w-full">
      <div className="container mx-auto px-6">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Why Choose BloomPot</h2>
          <div className="w-24 h-[1px] bg-brand-dark/20 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              ref={el => itemsRef.current[index] = el}
              className="flex flex-col items-center text-center p-8 rounded-3xl hover:bg-white hover:shadow-xl transition-all duration-500 group"
            >
              <div className="w-20 h-20 rounded-full bg-brand-green/5 text-brand-green flex items-center justify-center mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors duration-500">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-serif mb-4">{feature.title}</h3>
              <p className="font-sans text-brand-dark/70 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
