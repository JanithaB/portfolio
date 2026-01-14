import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-start pt-24 md:pt-20 pb-12 md:pb-0">
      <span className="text-teal-300 font-mono mb-2 md:mb-4 text-sm md:text-lg">Hi, my name is</span>
      <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-100 mb-2 md:mb-4 leading-tight">
        Janitha Rathnayake.
      </h1>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-400 mb-4 md:mb-6 leading-tight">
        I build IoT, Edge Computing & Backend Systems.
      </h2>
      <p className="max-w-lg text-slate-400 text-base md:text-lg leading-relaxed mb-8 md:mb-10">
        I&apos;m an Electrical & Electronics Engineer specializing in IoT gateways, edge devices, and backend integrations. Currently, I&apos;m learning <span className="text-teal-300">CCNA / Java / JavaScript</span> and working on production-level systems.
      </p>
      <a 
        href="#projects" 
        className="border border-teal-300 text-teal-300 px-6 py-3 md:px-8 md:py-4 rounded text-base md:text-lg hover:bg-teal-300/10 transition-all touch-manipulation"
      >
        Check out my work!
      </a>
    </section>
  );
};

export default Hero;