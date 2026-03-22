import React from 'react';
import { Instagram, Twitter, Facebook, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-brand-beige w-full pt-20 pb-10">
      <div className="container mx-auto px-6">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-12">
          
          {/* Logo & Description */}
          <div className="w-full md:w-1/3">
            <h2 className="text-3xl font-serif mb-6 text-white">BloomPot Mobile</h2>
            <p className="font-sans text-brand-beige/60 max-w-sm leading-relaxed">
              Curating the world's finest terracotta and ceramic flower pots for the modern home. Accessible entirely through our award-winning mobile experience.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/3 flex justify-between md:justify-around">
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-lg text-white mb-2">Shop</h4>
              {['All Products', 'Terracotta', 'Ceramic', 'New Arrivals'].map((link, i) => (
                <a key={i} href="#" className="font-sans text-sm text-brand-beige/60 hover:text-brand-beige transition-colors w-max relative group">
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-beige transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
            
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-lg text-white mb-2">Company</h4>
              {['About Us', 'Sustainability', 'Journal', 'Contact'].map((link, i) => (
                <a key={i} href="#" className="font-sans text-sm text-brand-beige/60 hover:text-brand-beige transition-colors w-max relative group">
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-beige transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="w-full md:w-1/3 flex flex-col gap-4">
            <h4 className="font-serif text-lg text-white mb-2">Stay Planted</h4>
            <p className="font-sans text-sm text-brand-beige/60 mb-4">Subscribe for early access to new collections and exclusive discounts.</p>
            <form className="relative w-full max-w-sm" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent border-b border-brand-beige/30 py-3 pr-12 font-sans text-sm text-brand-beige focus:outline-none focus:border-brand-beige transition-colors placeholder:text-brand-beige/30"
              />
              <button 
                type="submit" 
                className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-brand-beige/60 hover:text-white transition-colors group"
              >
                <ArrowUpRight size={18} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-brand-beige/10 mb-10"></div>

        {/* Bottom Section */}
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-6">
          <p className="font-sans text-xs text-brand-beige/40">
            &copy; {new Date().getFullYear()} BloomPot Mobile. All rights reserved.
          </p>
          
          {/* Socials */}
          <div className="flex gap-6">
            <a href="#" className="text-brand-beige/60 hover:text-white transition-colors group">
              <Instagram size={20} className="transform group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="text-brand-beige/60 hover:text-white transition-colors group">
              <Twitter size={20} className="transform group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="text-brand-beige/60 hover:text-white transition-colors group">
              <Facebook size={20} className="transform group-hover:scale-110 transition-transform" />
            </a>
          </div>
          
          {/* Legal */}
          <div className="flex gap-6 font-sans text-xs text-brand-beige/40">
            <a href="#" className="hover:text-brand-beige transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-beige transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
