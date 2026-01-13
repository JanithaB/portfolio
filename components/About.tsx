import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24">
      <div className="flex items-center mb-8 md:mb-12">
        <span className="text-teal-300 font-mono text-base md:text-xl mr-2 md:mr-4">01.</span>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-100">About Me</h2>
        <div className="h-[1px] bg-slate-700 flex-grow ml-2 md:ml-4"></div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-2 text-slate-400 text-base md:text-lg leading-relaxed space-y-4 order-2 md:order-1">
          <p>
            Hello! My name is Janitha and I'm an Electrical & Electronics Engineer passionate about IoT, Edge Computing, and Backend Systems. I specialize in building production-level systems that bridge the gap between hardware and software.
          </p>
          <p>
            I have hands-on experience with IoT gateways, edge devices, and backend integrations. I've built production-level IoT gateways using Java with serial communication, MQTT data publishing, local SQLite storage, and multi-threaded processing. I've also worked with NVIDIA Jetson platforms to run ML models for real-world edge applications.
          </p>
          <p>
            Here are a few technologies I've been working with recently:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-sm mt-4">
            {['C', 'Python', 'Java', 'JavaScript', 'Arduino', 'NVIDIA Jetson', 'Linux', 'MQTT', 'FastAPI', 'SQLite', 'Spring Boot', 'TensorFlow'].map((tech) => (
              <li key={tech} className="flex items-center">
                <span className="text-teal-300 mr-2">▹</span> {tech}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="relative group mx-auto md:mx-0 max-w-[250px] sm:max-w-xs order-1 md:order-2 mb-8 md:mb-0">
          <div className="absolute inset-0 border-2 border-teal-300 rounded translate-x-3 translate-y-3 md:translate-x-4 md:translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform"></div>
          <div className="relative bg-teal-500 rounded overflow-hidden w-full aspect-square">
             <Image 
               src="/profile.jpeg" 
               alt="Janitha Rathnayake" 
               width={300}
               height={300}
               className="grayscale hover:grayscale-0 transition-all duration-300 mix-blend-multiply hover:mix-blend-normal opacity-80 hover:opacity-100 w-full h-full object-cover" 
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;