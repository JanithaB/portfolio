import React from 'react';
import { SKILLS } from '@/constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24">
       <div className="flex items-center mb-12">
        <h2 className="text-3xl font-bold text-slate-100">Other Skills & Tools</h2>
        <div className="h-[1px] bg-slate-700 flex-grow ml-4"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {SKILLS.map((skill) => (
          <div key={skill.name} className="flex flex-col items-center bg-slate-800 p-6 rounded hover:translate-y-[-5px] transition-transform">
             <svg className="w-12 h-12 text-teal-300 mb-4" viewBox="0 0 24 24" fill="currentColor">
               <path d={skill.iconPath} />
             </svg>
             <span className="text-slate-300 font-mono text-sm">{skill.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;