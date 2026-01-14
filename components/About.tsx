import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="flex items-center mb-6 sm:mb-8 md:mb-12">
        <span className="text-teal-300 font-mono text-sm sm:text-base md:text-xl mr-2 sm:mr-3 md:mr-4">01.</span>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-100">About Me</h2>
        <div className="h-[1px] bg-slate-700 flex-grow ml-2 sm:ml-3 md:ml-4"></div>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 sm:gap-8 md:gap-12">
        <div className="md:col-span-2 text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed sm:leading-relaxed space-y-3 sm:space-y-4 order-2 md:order-1 text-justify md:text-left">
          <p>
            Hello! My name is <b>Janitha</b> and I&apos;m an Electrical & Electronics Engineer passionate about IoT, Edge Computing, and Backend Systems. I specialize in building production-level systems that bridge the gap between hardware and software.
          </p>
          <p>
            I have hands-on experience with IoT gateways, edge devices, and backend integrations. I&apos;ve built production-level IoT gateways using Java with serial communication, MQTT data publishing, local SQLite storage, and multi-threaded processing. I&apos;ve also worked with NVIDIA Jetson platforms to run ML models for real-world edge applications.
          </p>
          <p>
            Here are a few technologies I&apos;ve been working with recently:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 font-mono text-xs sm:text-sm mt-3 sm:mt-4">
            {['C', 'Python', 'Java', 'JavaScript', 'Arduino', 'NVIDIA Jetson', 'Linux', 'MQTT', 'FastAPI', 'SQLite', 'Spring Boot', 'TensorFlow'].map((tech) => (
              <li key={tech} className="flex items-center">
                <span className="text-teal-300 mr-1.5 sm:mr-2 text-xs sm:text-sm">▹</span> <span className="break-words">{tech}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="relative group mx-auto md:mx-0 w-full max-w-[200px] sm:max-w-[250px] md:max-w-xs order-1 md:order-2 mb-6 sm:mb-8 md:mb-0">
          <div className="absolute inset-0 border-2 border-teal-300 rounded translate-x-2 translate-y-2 sm:translate-x-3 sm:translate-y-3 md:translate-x-4 md:translate-y-4 group-hover:translate-x-1.5 group-hover:translate-y-1.5 sm:group-hover:translate-x-2 sm:group-hover:translate-y-2 transition-transform"></div>
          <div className="relative bg-teal-500 rounded overflow-hidden w-full aspect-[3/4]">
             <Image 
               src="/portfolio_image_03.jpeg" 
               alt="Janitha Rathnayake" 
               width={300}
               height={400}
               className="grayscale hover:grayscale-0 transition-all duration-300 mix-blend-multiply hover:mix-blend-normal opacity-80 hover:opacity-100 w-full h-full object-cover object-center" 
               style={{ objectFit: 'cover' }}
             />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;