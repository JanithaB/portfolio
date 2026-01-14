'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/constants';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getHref = (href: string) => {
    // If it's a hash link and we're not on the home page, prepend '/'
    if (href.startsWith('#') && pathname !== '/') {
      return `/${href}`;
    }
    return href;
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg py-3 md:py-4' : 'bg-slate-900/80 md:bg-transparent py-4 md:py-6'}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="text-2xl md:text-3xl font-bold text-teal-300 tracking-tighter touch-manipulation">JR.</a>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.id} 
              href={getHref(link.href)} 
              className="text-sm font-medium text-slate-200 hover:text-teal-300 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-teal-300 p-2 -mr-2 touch-manipulation transition-transform duration-300" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12"
                className="transition-opacity duration-300"
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16"
                className="transition-opacity duration-300"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          menuOpen ? 'opacity-100 visible mt-16' : 'opacity-0 invisible'
        }`}
        onClick={() => setMenuOpen(false)}
      />
      <div className={`md:hidden absolute top-full left-0 w-full bg-slate-800 shadow-xl py-6 flex flex-col items-center space-y-6 z-50 transition-all duration-300 ease-in-out ${
        menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        {NAV_LINKS.map((link, index) => (
          <a 
            key={link.id} 
            href={getHref(link.href)} 
            className="text-lg text-slate-200 hover:text-teal-300 transition-all touch-manipulation py-2"
            style={{
              transitionDelay: menuOpen ? `${index * 50}ms` : '0ms',
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(-10px)',
            }}
            onClick={() => setMenuOpen(false)}
          >
            {link.name}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;