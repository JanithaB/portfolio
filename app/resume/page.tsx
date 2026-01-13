'use client';

import React from 'react';
import Link from 'next/link';

export default function ResumePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      {/* Mobile Button Bar - Sticky at top */}
      <div className="print:hidden sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 md:hidden">
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 bg-slate-800 text-teal-300 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-slate-700 transition-colors border border-teal-300 touch-manipulation flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back</span>
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-teal-300 text-slate-900 px-4 py-2.5 rounded-lg font-semibold text-sm hover:bg-teal-400 transition-colors shadow-lg touch-manipulation flex-shrink-0"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Desktop Buttons - Fixed positioning */}
      <div className="print:hidden hidden md:block fixed top-20 right-6 z-50">
        <button
          onClick={handlePrint}
          className="bg-teal-300 text-slate-900 px-6 py-3 rounded-lg font-semibold text-base hover:bg-teal-400 transition-colors shadow-lg touch-manipulation"
        >
          Print / Save as PDF
        </button>
      </div>

      <div className="print:hidden hidden md:block fixed top-20 left-6 z-50">
        <Link
          href="/"
          className="bg-slate-800 text-teal-300 px-6 py-3 rounded-lg font-semibold text-base hover:bg-slate-700 transition-colors border border-teal-300 touch-manipulation"
        >
          ← Back to Portfolio
        </Link>
      </div>

      {/* Resume Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 md:py-20 print:py-8">
        <div className="bg-slate-800 rounded-lg p-4 sm:p-6 md:p-8 print:p-6 print:bg-transparent print:rounded-none shadow-xl print:shadow-none">
          {/* Header */}
          <header className="mb-6 md:mb-8 print:mb-6 border-b border-slate-700 pb-4 md:pb-6 print:pb-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl print:text-3xl font-bold text-teal-300 mb-2">Janitha Rathnayake</h1>
            {/* <p className="text-xl print:text-lg text-slate-300 mb-4">Systems Engineer</p> */}
            <div className="flex flex-wrap gap-2 sm:gap-4 print:gap-2 text-xs sm:text-sm text-slate-400">
              <a href="mailto:jbrathnayake98@gmail.com" className="flex items-center gap-2 hover:text-teal-300 print:text-slate-600 transition-colors">
                <svg className="w-4 h-4 text-teal-300 print:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                jbrathnayake98@gmail.com
              </a>
              <span className="text-slate-600 hidden print:inline">•</span>
              <a href="https://linkedin.com/in/jb-rathnayake" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-teal-300 print:text-slate-600 transition-colors">
                <svg className="w-4 h-4 text-teal-300 print:text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                in/Janitha Rathnayake
              </a>
              <span className="text-slate-600 hidden print:inline">•</span>
              <a href="https://github.com/JanithaB" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-teal-300 print:text-slate-600 transition-colors">
                <svg className="w-4 h-4 text-teal-300 print:text-slate-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.729.084-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.304.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.118-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                JanithaB
              </a>
              {/* <span className="text-slate-600 hidden print:inline">•</span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-300 print:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +94710641718
              </span>
              <span className="text-slate-600 hidden print:inline">•</span> */}
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-300 print:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Kurunegala
              </span>
            </div>
          </header>

          {/* Professional Experience */}
          <section className="mb-6 md:mb-8 print:mb-6">
            <h2 className="text-xl sm:text-2xl print:text-xl font-bold text-teal-300 mb-3 md:mb-4 print:mb-3 border-b border-slate-700 pb-2">
              Professional Experience
            </h2>
            
            <div className="mb-4 md:mb-6 print:mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                <div>
                  <h3 className="text-base sm:text-lg print:text-base font-semibold text-slate-100">Electronic Engineer</h3>
                  <p className="text-teal-300 text-xs sm:text-sm">Vega Innovations (Pvt) Ltd</p>
                </div>
                <span className="text-slate-400 text-xs sm:text-sm print:text-xs">01/2025 – Present</span>
              </div>
              <p className="text-slate-400 text-sm mb-2 print:text-xs">Maradana, Colombo</p>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm print:text-xs ml-4">
                <li>Managed and maintained AWS EC2 infrastructure, DNS/domain configurations.</li>
                <li>Deployed and maintained production MCP servers and backend services.</li>
                <li>Operated Linux/UNIX and NVIDIA Jetson platforms supporting production ML and edge AI systems.</li>
                <li>Designed and implemented MQTT-based edge-to-backend data pipelines for reliable communication.</li>
                <li>Deployed n8n workflows on Docker to automate AI and data processes, and built AI agents using MCP-Use with LangChain integration.</li>
                <li>Streamlined workflows and defined best practices for system monitoring and maintenance.</li>
              </ul>
            </div>

            <div className="mb-4 md:mb-6 print:mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                <div>
                  <h3 className="text-base sm:text-lg print:text-base font-semibold text-slate-100">Research Engineering Intern</h3>
                  <p className="text-teal-300 text-xs sm:text-sm">SLIOT Design & Innovation Laboratory</p>
                </div>
                <span className="text-slate-400 text-xs sm:text-sm print:text-xs">08/2023 – 10/2023</span>
              </div>
              <p className="text-slate-400 text-sm mb-2 print:text-xs">University of Moratuwa, Katubedda, Moratuwa</p>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm print:text-xs ml-4">
                <li>Developed and trained CNN models for sensor-based data analysis.</li>
                <li>Collected and processed experimental data from TENG devices.</li>
                <li>Assisted in sensor design and prototyping.</li>
                <li>Contributed to technical documentation and research papers.</li>
              </ul>
            </div>

            <div className="mb-4 md:mb-6 print:mb-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                <div>
                  <h3 className="text-base sm:text-lg print:text-base font-semibold text-slate-100">Engineering Trainee</h3>
                  <p className="text-teal-300 text-xs sm:text-sm">Sri Lanka Telecom</p>
                </div>
                <span className="text-slate-400 text-xs sm:text-sm print:text-xs">05/2022 – 08/2022</span>
              </div>
              <p className="text-slate-400 text-sm mb-2 print:text-xs">OPMC - Kurunegala</p>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm print:text-xs ml-4">
                <li>Gained hands-on experience in Switching, Transmission, and Planning divisions.</li>
                <li>Worked in ADSL, NC (Network Configuration), and Maintenance divisions.</li>
              </ul>
            </div>
          </section>

          {/* Education */}
          <section className="mb-6 md:mb-8 print:mb-6">
            <h2 className="text-xl sm:text-2xl print:text-xl font-bold text-teal-300 mb-3 md:mb-4 print:mb-3 border-b border-slate-700 pb-2">
              Education
            </h2>
            
            <div className="mb-3 md:mb-4 print:mb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                <div>
                  <h3 className="text-base sm:text-lg print:text-base font-semibold text-slate-100">B.Sc (Hons) in Electrical & Electronics Engineering</h3>
                  <p className="text-teal-300 text-xs sm:text-sm">University of Peradeniya</p>
                </div>
                <span className="text-slate-400 text-xs sm:text-sm print:text-xs">12/2019 – 08/2024</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm print:text-xs ml-4">
                <li>GPA: 3.2/4.0</li>
                <li>Coursework: AI & ML, Communication Systems, Programming & Networking</li>
              </ul>
            </div>

            <div className="mb-3 md:mb-4 print:mb-3">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-1 sm:gap-0">
                <div>
                  <h3 className="text-base sm:text-lg print:text-base font-semibold text-slate-100">G.C.E Advanced Level Examination (Physical Sciences)</h3>
                  <p className="text-teal-300 text-xs sm:text-sm">Maliyadeva College</p>
                </div>
                <span className="text-slate-400 text-xs sm:text-sm print:text-xs">07/2015 – 08/2017</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 text-sm print:text-xs ml-4">
                <li>All &apos;A&apos; passes for Combined Mathematics, Physics & Chemistry</li>
                <li>Z-Score: 1.8146</li>
              </ul>
            </div>
          </section>

          {/* Skills */}
          <section className="mb-6 md:mb-8 print:mb-6">
            <h2 className="text-xl sm:text-2xl print:text-xl font-bold text-teal-300 mb-3 md:mb-4 print:mb-3 border-b border-slate-700 pb-2">
              Skills
            </h2>
            <div className="grid md:grid-cols-2 gap-4 print:gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-2 print:text-xs">Technical Fields</h3>
                <p className="text-slate-400 text-sm print:text-xs">AI & ML, Networking, IoT, Edge AI, Automation</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-2 print:text-xs">Programming Languages</h3>
                <p className="text-slate-400 text-sm print:text-xs">Python, C/C++, Java, JavaScript (Beginner)</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-2 print:text-xs">Version Control</h3>
                <p className="text-slate-400 text-sm print:text-xs">Git and Github</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-2 print:text-xs">Operating Systems</h3>
                <p className="text-slate-400 text-sm print:text-xs">Ubuntu, CentOS, Kali Linux, DietPi, Raspbian, Windows</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-2 print:text-xs">Developer Tools</h3>
                <p className="text-slate-400 text-sm print:text-xs">Visual Studio Code, IntelliJ IDEA, Cursor</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-2 print:text-xs">Other</h3>
                <ul className="text-slate-400 text-sm print:text-xs space-y-1">
                  <li>• AWS & Cloud: EC2, Route 53; configured DNS for multiple domains.</li>
                  <li>• Networking & Security: Nginx reverse proxy for load balancing, secure IoT integrations, firewall management.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Certificates */}
          <section className="mb-6 md:mb-8 print:mb-6">
            <h2 className="text-xl sm:text-2xl print:text-xl font-bold text-teal-300 mb-3 md:mb-4 print:mb-3 border-b border-slate-700 pb-2">
              Certificates
            </h2>
            <div className="space-y-3 print:space-y-2">
              <div className="flex justify-between items-start border-b border-slate-700 pb-2 print:pb-1">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100 print:text-xs">Python Data Structures</h3>
                  <p className="text-slate-400 text-xs print:text-[10px]">University of Michigan - Coursera</p>
                </div>
                <span className="text-slate-500 text-xs print:text-[10px]">Nov 2020</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-700 pb-2 print:pb-1">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100 print:text-xs">Neural Networks and Deep Learning</h3>
                  <p className="text-slate-400 text-xs print:text-[10px]">DeepLearning.AI - Coursera</p>
                </div>
                <span className="text-slate-500 text-xs print:text-[10px]">May 2022</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-700 pb-2 print:pb-1">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100 print:text-xs">Learning Verilog for FPGA Development</h3>
                  <p className="text-slate-400 text-xs print:text-[10px]">LinkedIn</p>
                </div>
              </div>
              <div className="flex justify-between items-start border-b border-slate-700 pb-2 print:pb-1">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100 print:text-xs">Learning FPGA Development</h3>
                  <p className="text-slate-400 text-xs print:text-[10px]">LinkedIn</p>
                </div>
              </div>
              <div className="flex justify-between items-start border-b border-slate-700 pb-2 print:pb-1">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100 print:text-xs">Getting Started with RISC-V</h3>
                  <p className="text-slate-400 text-xs print:text-[10px]">LinkedIn</p>
                </div>
              </div>
              <div className="flex justify-between items-start border-b border-slate-700 pb-2 print:pb-1">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100 print:text-xs">Introduction to the Internet of Things and Embedded Systems</h3>
                  <p className="text-slate-400 text-xs print:text-[10px]">Coursera</p>
                </div>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section className="mb-6 md:mb-8 print:mb-6">
            <h2 className="text-xl sm:text-2xl print:text-xl font-bold text-teal-300 mb-3 md:mb-4 print:mb-3 border-b border-slate-700 pb-2">
              Projects
            </h2>
            
            <div className="mb-3 md:mb-4 print:mb-3">
              <h3 className="text-base sm:text-lg print:text-base font-semibold text-slate-100 mb-1">Mentoring Platform Microservices with Spring Boot</h3>
              <p className="text-slate-400 text-sm print:text-xs italic mb-2">Ongoing</p>
              <p className="text-slate-300 text-sm print:text-xs mb-2">
                Built backend services for a mentoring platform with Java Spring Boot, microservices, and MVC; handled user registration, session scheduling, and mentor-mentee matching.
              </p>
              <p className="text-teal-300 text-xs print:text-[10px]">
                <strong>Technologies:</strong> Java | Spring Boot | Microservices | MVC
              </p>
            </div>

            <div className="mb-3 md:mb-4 print:mb-3">
              <h3 className="text-base sm:text-lg print:text-base font-semibold text-slate-100 mb-1">Spiking Neuron Architecture for Information Processing</h3>
              <p className="text-slate-300 text-sm print:text-xs mb-2">
                Implemented an efficient gradient descent approach in neural networks, optimizing training and computational cost; analyzed performance and potential improvements.
              </p>
              <p className="text-teal-300 text-xs print:text-[10px]">
                <strong>Technologies:</strong> Python | SNNTorch | PyTorch
              </p>
            </div>

            <div className="mb-3 md:mb-4 print:mb-3">
              <h3 className="text-base sm:text-lg print:text-base font-semibold text-slate-100 mb-1">Person Identification using Gait Pattern</h3>
              <p className="text-slate-300 text-sm print:text-xs mb-2">
                Built TENG sensors to capture gait data and trained a CNN model for analysis. Developed a Python GUI application to collect and manage gait data.
              </p>
              <p className="text-teal-300 text-xs print:text-[10px]">
                <strong>Technologies:</strong> Arduino | Python | CNN | TENG
              </p>
            </div>
          </section>

          {/* Other Experiences */}
          <section className="mb-6 md:mb-8 print:mb-6">
            <h2 className="text-xl sm:text-2xl print:text-xl font-bold text-teal-300 mb-3 md:mb-4 print:mb-3 border-b border-slate-700 pb-2">
              Other Experiences
            </h2>
            <div className="space-y-3 print:space-y-2">
              <div className="flex justify-between items-start border-b border-slate-700 pb-2 print:pb-1">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100 print:text-xs">Chair Person</h3>
                  <p className="text-slate-400 text-xs print:text-[10px]">IEEE PES Peradeniya Students&apos; Chapter, University of Peradeniya</p>
                </div>
                <span className="text-slate-500 text-xs print:text-[10px]">07/2023 – 09/2024</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-700 pb-2 print:pb-1">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100 print:text-xs">Vice Chair</h3>
                  <p className="text-slate-400 text-xs print:text-[10px]">IEEE PES Peradeniya Students&apos; Chapter, University of Peradeniya</p>
                </div>
                <span className="text-slate-500 text-xs print:text-[10px]">05/2022 – 07/2023</span>
              </div>
              <div className="flex justify-between items-start border-b border-slate-700 pb-2 print:pb-1">
                <div>
                  <h3 className="text-sm font-semibold text-slate-100 print:text-xs">Volunteer</h3>
                  <p className="text-slate-400 text-xs print:text-[10px]">IEEE PES Peradeniya Students&apos; Chapter, University of Peradeniya</p>
                </div>
                <span className="text-slate-500 text-xs print:text-[10px]">01/2022 – 05/2022</span>
              </div>
              <div className="text-slate-300 text-sm print:text-xs space-y-1 mt-2">
                <p>• Participated in IEEE PES APPEFC 2023 held in Chiang Mai, Thailand, alongside the IEEE R10 Chapter Chair meeting.</p>
                <p>• Currently volunteering in Professional Activities IEEE PES SL Chapter</p>
              </div>
            </div>
          </section>

          {/* Languages */}
          <section className="mb-6 md:mb-8 print:mb-6">
            <h2 className="text-xl sm:text-2xl print:text-xl font-bold text-teal-300 mb-3 md:mb-4 print:mb-3 border-b border-slate-700 pb-2">
              Languages
            </h2>
            <div className="flex gap-4 print:gap-2 text-slate-300 text-sm print:text-xs">
              <span>• English</span>
              <span>• Sinhala</span>
            </div>
          </section>
          
        </div>
      </div>
    </div>
  );
}
