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
          className="md:hidden text-teal-300 p-2 -mr-2 touch-manipulation" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-sm mt-16"
            onClick={() => setMenuOpen(false)}
          />
          <div className="md:hidden absolute top-full left-0 w-full bg-slate-800 shadow-xl py-6 flex flex-col items-center space-y-6 z-50">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.id} 
              href={getHref(link.href)} 
                className="text-lg text-slate-200 hover:text-teal-300 transition-colors touch-manipulation py-2"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;