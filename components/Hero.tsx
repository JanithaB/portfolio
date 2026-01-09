import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center items-start pt-20">
      <span className="text-teal-300 font-mono mb-4 text-lg">Hi, my name is</span>
      <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-4">
        Janitha Rathnayake.
      </h1>
      <h2 className="text-4xl md:text-6xl font-bold text-slate-400 mb-6">
        I build IoT, Edge Computing & Backend Systems.
      </h2>
      <p className="max-w-lg text-slate-400 text-lg leading-relaxed mb-10">
        I'm an Electrical & Electronics Engineer specializing in IoT gateways, edge devices, and backend integrations. Currently, I'm learning <span className="text-teal-300">CCNA / Java / JavaScript</span> and working on production-level systems.
      </p>
      <a 
        href="#projects" 
        className="border border-teal-300 text-teal-300 px-8 py-4 rounded text-lg hover:bg-teal-300/10 transition-all"
      >
        Check out my work!
      </a>
    </section>
  );
};

export default Hero;