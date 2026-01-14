'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/constants';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

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
      {mounted && menuOpen && createPortal(
        <>
          <div 
            className="md:hidden fixed inset-0 bg-slate-900/30 backdrop-blur-lg transition-opacity duration-300 z-[60]"
            style={{
              WebkitBackdropFilter: 'blur(16px)',
              backdropFilter: 'blur(16px)',
            }}
            onClick={() => setMenuOpen(false)}
          />
          <div className="md:hidden fixed top-16 left-0 w-full py-6 px-4 z-[70] transition-all duration-300 ease-in-out">
            <div className="max-w-sm mx-auto">
              <ul className="w-full flex flex-col gap-2">
                {NAV_LINKS.map((link, index) => {
                  const getIcon = () => {
                    switch(link.id) {
                      case 'home':
                        return (
                          <svg stroke="currentColor" className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        );
                      case 'about':
                        return (
                          <svg stroke="currentColor" className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        );
                      case 'experience':
                        return (
                          <svg stroke="currentColor" className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        );
                      case 'projects':
                        return (
                          <svg stroke="currentColor" className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        );
                      case 'contact':
                        return (
                          <svg stroke="currentColor" className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        );
                      case 'blog':
                        return (
                          <svg stroke="currentColor" className="w-6 h-6" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        );
                      default:
                        return null;
                    }
                  };

                  return (
                    <li
                      key={link.id}
                      className="flex items-center cursor-pointer w-full whitespace-nowrap"
                      style={{
                        animation: `fadeIn 0.3s ease-out ${index * 50}ms forwards`,
                        opacity: 0,
                        transform: 'translateY(-10px)',
                      }}
                    >
                      <a
                        href={getHref(link.href)}
                        className="group flex items-center justify-center w-full gap-4 p-4 font-semibold rounded-full text-slate-200 hover:bg-teal-300/10 hover:shadow-inner focus:bg-gradient-to-r focus:from-teal-400 focus:to-teal-600 focus:text-white transition-all ease-linear touch-manipulation"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="group-focus:text-white group-focus:stroke-white">
                          {getIcon()}
                        </span>
                        {link.name}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </>,
        document.body
      )}
    </nav>
  );
};

export default Navbar;