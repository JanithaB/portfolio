'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { PROJECTS } from '@/constants';

const Projects: React.FC = () => {
  const regularProjects = PROJECTS.filter(p => !p.category);
  const ecommerceProjects = PROJECTS.filter(p => p.category === 'E-Commerce Platforms');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleCardClick = (projectId: string) => {
    setExpandedCard(expandedCard === projectId ? null : projectId);
  };

  const handleCloseExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedCard(null);
  };

  return (
    <section id="projects" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="flex items-center mb-8 md:mb-12">
        <span className="text-teal-300 font-mono text-base md:text-xl mr-2 md:mr-4">03.</span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-100">Some Things I&apos;ve Built</h2>
        <div className="h-[1px] bg-slate-700 flex-grow ml-2 md:ml-4"></div>
      </div>

      {/* E-Commerce Platforms Section */}
      {ecommerceProjects.length > 0 && (
        <div className="mb-16 md:mb-24">
          <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-6 md:mb-8">E-Commerce Platforms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {ecommerceProjects.map((project) => {
              return (
                <div key={project.id} className="relative">
                  <div 
                    className="group relative rounded-lg bg-slate-800 overflow-hidden cursor-pointer h-full transition-all duration-300 hover:scale-105"
                    onClick={() => handleCardClick(project.id)}
                  >
                    <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-t-lg">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover transition-all duration-500 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-teal-900/30 group-hover:bg-transparent transition-colors"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Popup Modal */}
      {expandedCard && (() => {
        const project = ecommerceProjects.find(p => p.id === expandedCard);
        if (!project) return null;
        
        return (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={handleCloseExpanded}
          >
            <div 
              className="relative bg-slate-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto z-50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleCloseExpanded}
                className="absolute top-4 right-4 text-slate-300 hover:text-teal-300 transition-colors z-10 bg-slate-700 rounded-full p-2 hover:bg-slate-600"
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-t-lg">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-6 md:p-8">
                <div className="flex flex-col justify-between min-h-[300px]">
                  <div>
                    <h4 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">{project.title}</h4>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-6">{project.description}</p>
                    <ul className="flex flex-wrap gap-2 text-slate-400 font-mono text-sm md:text-base mb-6">
                      {project.technologies.map(tech => (
                        <li key={tech} className="px-3 py-1.5 bg-slate-700 rounded">{tech}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex gap-4 items-center">
                    <a 
                      href={project.githubLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      aria-label="GitHub Link" 
                      className="text-slate-300 hover:text-teal-300 transition-colors touch-manipulation p-2 bg-slate-700 rounded-lg hover:bg-slate-600"
                    >
                      <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.729.084-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.304.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.118-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                    {project.liveDemoLink && (
                      <a 
                        href={project.liveDemoLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        aria-label="Live Demo Link" 
                        className="text-slate-300 hover:text-teal-300 transition-colors touch-manipulation p-2 bg-slate-700 rounded-lg hover:bg-slate-600"
                      >
                        <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Regular Projects Section */}
      <div className="space-y-16 md:space-y-24">
        {regularProjects.map((project, index) => (
          <div key={project.id} className="grid md:grid-cols-12 gap-6 md:gap-8 items-center">
            {/* Image Side */}
            <div className={`md:col-span-7 relative group ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
               <div className="relative rounded bg-teal-500/50 overflow-hidden cursor-pointer">
                 <Image 
                   src={project.imageUrl} 
                   alt={project.title} 
                   width={800}
                   height={400}
                   className="w-full object-cover grayscale mix-blend-multiply hover:mix-blend-normal hover:grayscale-0 transition-all duration-500 min-h-[200px] md:min-h-[300px]" 
                 />
                 <div className="absolute inset-0 bg-teal-900/30 group-hover:bg-transparent transition-colors"></div>
               </div>
            </div>

            {/* Content Side */}
            <div className={`md:col-span-5 relative z-10 text-left ${index % 2 !== 0 ? 'md:order-1 md:text-left' : 'md:text-right'}`}>
              <p className="text-teal-300 font-mono text-xs md:text-sm mb-2">Featured Project</p>
              <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-4 md:mb-6 hover:text-teal-300 transition-colors">
                <a href={project.liveDemoLink || project.githubLink} target="_blank" rel="noopener noreferrer" className="touch-manipulation">{project.title}</a>
              </h3>
              
              <div className="bg-slate-800 p-4 md:p-6 rounded shadow-xl text-slate-400 text-sm md:text-base leading-relaxed mb-4 md:mb-6 hover:shadow-2xl transition-shadow">
                {project.description}
              </div>

              <ul className={`flex flex-wrap gap-2 md:gap-4 text-slate-400 font-mono text-xs mb-6 md:mb-8 justify-start ${index % 2 !== 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                {project.technologies.map(tech => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>

              <div className={`flex gap-4 items-center justify-start ${index % 2 !== 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" aria-label="GitHub Link" className="text-slate-300 hover:text-teal-300 transition-colors touch-manipulation p-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.729.084-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.304.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.118-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
                {project.liveDemoLink && (
                  <a href={project.liveDemoLink} target="_blank" rel="noopener noreferrer" aria-label="External Link" className="text-slate-300 hover:text-teal-300 transition-colors touch-manipulation p-1">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                     </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
