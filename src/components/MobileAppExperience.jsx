import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, ShoppingBag, Truck } from 'lucide-react';

const MobileAppExperience = () => {
  const containerRef = useRef(null);
  const phoneRef = useRef(null);
  const screenRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    // Pin section and animate phone
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=150%", // Keep pinned for 150% of screen height
        pin: true,
        scrub: 1,
      }
    });

    // Move phone from right to center while sliding screens
    tl.fromTo(phoneRef.current, 
      { x: '20vw', rotation: 5, scale: 0.9 },
      { x: '0', rotation: 0, scale: 1, duration: 1 }
    )
    .to(screenRef.current, {
      yPercent: -33.33, // Slide to second "screen" (assuming 3 screens in container)
      duration: 1,
      ease: "none"
    }, "<") // Animate simultaneously
    .to(textRefs.current[0], { opacity: 0, y: -20, duration: 0.5 }, "<")
    .fromTo(textRefs.current[1], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "<0.5")
    
    .to(screenRef.current, {
      yPercent: -66.66, // Slide to third "screen"
      duration: 1,
      ease: "none"
    })
    .to(textRefs.current[1], { opacity: 0, y: -20, duration: 0.5 }, "<")
    .fromTo(textRefs.current[2], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "<0.5");

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="h-screen w-full bg-brand-beige overflow-hidden flex items-center justify-center relative">
      <div className="container mx-auto px-6 h-full flex flex-col md:flex-row items-center">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 relative h-[300px] flex items-center mt-20 md:mt-0">
          
          <div ref={el => textRefs.current[0] = el} className="absolute inset-0 flex flex-col justify-center">
            <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mb-6 text-brand-green">
              <Smartphone size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">The World of Plants, In Your Pocket.</h2>
            <p className="text-lg text-brand-dark/70 font-sans max-w-md">Browse our entire curated collection natively on your mobile device with our award-winning app.</p>
          </div>

          <div ref={el => textRefs.current[1] = el} className="absolute inset-0 flex flex-col justify-center opacity-0 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-brand-terracotta/10 flex items-center justify-center mb-6 text-brand-terracotta">
              <ShoppingBag size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">Seamless 1-Tap Checkout.</h2>
            <p className="text-lg text-brand-dark/70 font-sans max-w-md">Found the perfect pot? Securely purchase it with Apple Pay or Google Pay in an instant.</p>
          </div>

          <div ref={el => textRefs.current[2] = el} className="absolute inset-0 flex flex-col justify-center opacity-0 pointer-events-none">
            <div className="w-12 h-12 rounded-full bg-brand-dark/10 flex items-center justify-center mb-6 text-brand-dark">
              <Truck size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-brand-dark mb-4">Track Your Delivery.</h2>
            <p className="text-lg text-brand-dark/70 font-sans max-w-md">Watch your new greenery arrive with real-time GPS tracking right to your doorstep.</p>
          </div>

        </div>

        {/* Mobile Mockup */}
        <div className="w-full md:w-1/2 h-full flex items-center justify-center relative">
          <div 
            ref={phoneRef} 
            className="relative w-[280px] h-[580px] bg-black rounded-[3rem] border-[8px] border-black shadow-2xl overflow-hidden flex-shrink-0"
          >
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50">
              <div className="w-32 h-6 bg-black rounded-b-2xl"></div>
            </div>

            {/* Screen Content Wrapper */}
            <div className="w-full h-[300%] absolute top-0 left-0 flex flex-col" ref={screenRef}>
              
              {/* Screen 1: Browse */}
              <div className="w-full h-1/3 bg-brand-beige flex flex-col p-4 pt-10">
                <div className="flex justify-between items-center mb-6">
                  <span className="font-serif font-bold text-lg">BloomPot</span>
                  <div className="w-8 h-8 rounded-full bg-brand-dark/5 flex items-center justify-center">
                    <ShoppingBag size={14} className="text-brand-dark" />
                  </div>
                </div>
                <div className="w-full aspect-square bg-white rounded-2xl overflow-hidden mb-4 relative shadow-sm">
                   <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="App preview" />
                </div>
                <h3 className="font-serif text-xl">The Terra</h3>
                <span className="font-sans text-brand-dark/60">$85</span>
              </div>

              {/* Screen 2: Checkout */}
              <div className="w-full h-1/3 bg-white flex flex-col p-4 pt-10">
                 <h3 className="font-serif text-2xl mb-6">Cart</h3>
                 <div className="flex gap-4 mb-6 pb-6 border-b border-brand-dark/10">
                    <div className="w-20 h-20 bg-brand-beige rounded-xl overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Cart item" />
                    </div>
                    <div>
                      <h4 className="font-serif">The Terra</h4>
                      <span className="text-sm text-brand-dark/60">Qty: 1</span>
                      <p className="mt-1 font-medium">$85</p>
                    </div>
                 </div>
                 <div className="mt-auto">
                   <div className="flex justify-between mb-4 font-bold">
                     <span>Total</span>
                     <span>$85</span>
                   </div>
                   <button className="w-full py-4 bg-black text-white rounded-xl font-medium flex items-center justify-center gap-2">
                     Pay with <span className="font-serif italic">Apple Pay</span>
                   </button>
                 </div>
              </div>

              {/* Screen 3: Tracking */}
              <div className="w-full h-1/3 bg-brand-green/5 flex flex-col relative overflow-hidden">
                {/* Fake map background */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400')] bg-cover bg-center"></div>
                
                <div className="mt-auto bg-white rounded-t-3xl p-6 relative z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                  <div className="w-12 h-1 bg-brand-dark/10 mx-auto rounded-full mb-6"></div>
                  <h3 className="font-serif text-xl mb-1">Arriving in 15 mins</h3>
                  <p className="text-sm text-brand-dark/60 mb-6">Your BloomPot is almost there!</p>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
                      <Truck size={20} />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">Alex M.</h4>
                      <p className="text-xs text-brand-dark/60">Eco-Courier</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MobileAppExperience;
