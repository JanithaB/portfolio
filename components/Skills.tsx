import React from 'react';
import Image from 'next/image';
import { SKILLS } from '@/constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-16 md:py-24">
       <div className="flex items-center mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-100">Other Skills & Tools</h2>
        <div className="h-[1px] bg-slate-700 flex-grow ml-2 md:ml-4"></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {SKILLS.map((skill) => {
          const isSvg = skill.iconPath.includes('.svg');
          
          return (
            <div key={skill.name} className="flex flex-col items-center bg-slate-800 p-4 md:p-6 rounded hover:translate-y-[-5px] transition-transform touch-manipulation">
              {isSvg ? (
                <img 
                  src={skill.iconPath} 
                  alt={skill.name}
                  className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4"
                  style={{ 
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <Image
                  src={skill.iconPath}
                  alt={skill.name}
                  width={48}
                  height={48}
                  className="w-10 h-10 md:w-12 md:h-12 mb-3 md:mb-4"
                  style={{ 
                    filter: 'brightness(0) saturate(100%) invert(79%) sepia(67%) saturate(1352%) hue-rotate(142deg) brightness(95%) contrast(86%)',
                    objectFit: 'contain'
                  }}
                  unoptimized
                />
              )}
              <span className="text-slate-300 font-mono text-xs md:text-sm text-center">{skill.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;