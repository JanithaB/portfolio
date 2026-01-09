import React, { useState } from 'react';
import { EXPERIENCE } from '../constants';

const Experience: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="experience" className="py-24">
      <div className="flex items-center mb-12">
        <span className="text-teal-300 font-mono text-xl mr-4">02.</span>
        <h2 className="text-3xl font-bold text-slate-100">Where I've Worked</h2>
        <div className="h-[1px] bg-slate-700 flex-grow ml-4"></div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Tab List */}
        <div className="flex md:flex-col overflow-x-auto md:w-48 border-b md:border-b-0 md:border-l border-slate-700">
          {EXPERIENCE.map((job, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-4 py-3 text-left font-mono text-sm whitespace-nowrap transition-all duration-200 border-l-2 -ml-[2px] ${
                activeTab === index 
                  ? 'text-teal-300 border-teal-300 bg-teal-300/10' 
                  : 'text-slate-400 border-transparent hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {job.company}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 min-h-[300px]">
          <h3 className="text-2xl font-bold text-slate-100 mb-1">
            {EXPERIENCE[activeTab].role} <span className="text-teal-300">@ {EXPERIENCE[activeTab].company}</span>
          </h3>
          <p className="font-mono text-slate-400 text-sm mb-6">{EXPERIENCE[activeTab].period}</p>
          <ul className="space-y-4">
            {EXPERIENCE[activeTab].description.map((item, i) => (
              <li key={i} className="flex items-start text-slate-400">
                <span className="text-teal-300 mr-3 mt-1.5">▹</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;