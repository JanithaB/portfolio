import React from 'react';
import { NavLink, SocialLink, Skill, Project, ExperienceItem } from './types';

export const NAV_LINKS: NavLink[] = [
  { id: 'home', name: 'Home', href: '#home' },
  { id: 'about', name: 'About', href: '#about' },
  { id: 'experience', name: 'Experience', href: '#experience' },
  { id: 'projects', name: 'Projects', href: '#projects' },
  { id: 'contact', name: 'Contact', href: '#contact' },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    iconPath: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.087-.744.084-.729.084-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.304.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.118-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    href: 'https://github.com/JanithaB',
  },
  {
    name: 'LinkedIn',
    iconPath: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
    href: 'https://linkedin.com/in/jb-rathnayake',
  },
  {
    name: 'HackerRank',
    iconPath: 'M0 0v24h24V0H0zm9.95 8.002h1.805c.061 0 .111.05.111.111v7.767c0 .061-.05.111-.11.111H9.95a.111.111 0 01-.111-.11v-2.87H7.894v2.87c0 .06-.05.11-.11.11H5.976a.11.11 0 01-.11-.11V8.112c0-.06.05-.11.11-.11h1.806c.061 0 .11.05.11.11v2.869H9.84v-2.87c0-.06.05-.11.11-.11zm2.999 0h5.778c.06 0 .111.05.111.11v.372a.11.11 0 01-.11.111h-4.44v1.46h4.056c.06 0 .11.05.11.11v.37a.11.11 0 01-.11.112h-4.055v1.569h4.44c.06 0 .11.05.11.111v.372a.11.11 0 01-.11.111h-5.778a.11.11 0 01-.11-.11V8.112c0-.06.05-.11.11-.11z',
    href: 'https://www.hackerrank.com/profile/jbrathnayake98',
  },
];

export const SKILLS: Skill[] = [
  { name: 'C', iconPath: 'M16.017 19.723v-4.377h2.33v1.626h.027c.312-.938 1.15-1.534 2.026-1.534 2.205 0 2.91 1.138 2.91 2.646v3.639h-2.33v-3.317c0-.715-.244-1.198-.85-1.198-.703 0-1.102.476-1.102 1.198v3.317h-2.33zm-6.905-4.377h2.327v8.754H9.112v-8.754zm-.09-4.2c.773 0 1.375-.61 1.375-1.35 0-.742-.602-1.352-1.375-1.352-.773 0-1.375.61-1.375 1.351 0 .741.602 1.351 1.375 1.351z' },
  { name: 'Python', iconPath: 'M14.5 0h-5L7 3.75v5L2.5 12.5v5L0 20.5V24h24v-3.5L14.5 14v-5L10 3.75V0zm.5 2.25l3.5 3.5v5l5 5-3.5 3.5-5-5-5 5-3.5-3.5 5-5v-5l3.5-3.5z' },
  { name: 'Java', iconPath: 'M8.851 18.56s-.908.602-2.141.602c-1.235 0-2.164-.602-2.9-1.806-.736-1.203-.736-2.607 0-4.009.736-1.404 1.869-2.106 3.104-2.106.602 0 1.235.1 1.869.301-.602-1.505.733-3.107 2.141-4.009-2.141-1.806-5.672-1.505-7.413.602-1.74 2.106-1.74 5.412 0 7.518 1.741 2.104 4.673 2.406 7.414.602 1.269-.904 1.735-2.106 1.869-3.107h-4.672v-2.106h7.414c.134.3.201.602.268.904.803 3.107-.134 6.011-2.141 8.115-1.069 1.203-2.407 2.005-3.743 2.406zM16.447 11.755c.736-1.203 1.869-1.806 3.104-1.806 1.235 0 2.164.602 2.9 1.806.736 1.203.736 2.607 0 4.009-.736 1.404-1.869 2.106-3.104 2.106-1.235 0-2.164-.602-2.9-1.806-.737-1.203-.737-2.607 0-4.009zm3.104 4.813c.602 0 1.235-.1 1.869-.301-.134 1.505-.936 3.107-2.341 4.009 2.141 1.806 5.672 1.505 7.413-.602 1.74-2.106 1.74-5.412 0-7.518-1.741-2.104-4.673-2.406-7.414-.602-1.269.904-1.735 2.106-1.869 3.107h4.672v2.106h-7.414c-.134-.3-.201-.602-.268-.904-.803-3.107.134-6.011 2.141-8.115 1.069-1.203 2.407-2.005 3.743-2.406.908-.3 2.141-.3 2.141-.3s-.908-.602-2.141-.602c-1.235 0-2.164.602-2.9 1.806-.736 1.203-.736 2.607 0 4.009.736 1.404 1.869 2.106 3.104 2.106z' },
  { name: 'JavaScript', iconPath: 'M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12 1.92.69 2.86 1.155 3.16 1.58 4.185 4.65 3.405 7.12-.575 1.83-2.354 3.435-4.93 3.83-.506.09-1.65.15-2.4-.255-.42-.24-.72-.525-.96-.9-.72-1.08-.855-2.565-.48-4.335 0 0 .495.405 1.35.78 1.44.585 2.295.96 3.675.96 2.16 0 3.15-.96 3.6-1.86.315-.39.42-.87.42-1.38-.015-.99-.75-1.755-1.65-1.935-.39-.09-1.35-.105-1.95.06-.21.03-.48.08-.63.16-.45.24-.78.525-.96.9-.18.405-.315.9-.42 1.44-.42 2.58-.24 4.05.42 5.4.42.84 1.26 1.44 2.46 1.65 1.5.315 3.15.105 4.2-.75 1.08-.87 1.815-2.205 1.95-3.84.015-.39.015-.675-.015-.99z' },
  { name: 'Arduino', iconPath: 'M11.981 0C5.678 0 .5 5.178.5 11.481c0 5.197 3.158 9.643 7.643 11.488.279.103.636.22.915.22.279 0 .636-.117.915-.22C14.342 21.124 17.5 16.678 17.5 11.481 17.5 5.178 12.322 0 6.019 0h5.962zM6.019 2.5h5.962c4.97 0 9.019 4.049 9.019 9.019 0 4.412-3.294 8.206-7.643 9.643-.636.22-1.251.22-1.887 0C7.313 19.725 4.019 15.931 4.019 11.519c0-4.97 4.049-9.019 9.019-9.019z' },
  { name: 'Linux', iconPath: 'M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.066-1.583 2.525-1.583 4.244 0 1.127.698 2.056 1.583 4.244.885 1.188 1.05 1.928 1.05 3.02 0 .65.065 5.965 3.17 6.298.26.02.515.02.775.02 4.904 0 7.17-4.807 7.17-6.298 0-1.092.3-1.953 1.05-3.02.885-1.188 1.583-2.117 1.583-4.244 0-1.719-.698-3.178-1.583-4.244-.75-1.067-1.05-1.928-1.05-3.02.065-1.491-1.056-5.965-3.17-6.298C12.819.008 12.659 0 12.504 0zm-.87 2.093c.25-.02.5-.02.745-.02s.495 0 .745.02c2.542.2 2.542 3.214 2.542 4.427 0 .65-.08 1.17-.23 1.755-.08.325-.18.585-.18.975 0 .585.1 1.17.18 1.755.15.585.23 1.105.23 1.755 0 1.213 0 4.227-2.542 4.427-.25.02-.5.02-.745.02s-.495 0-.745-.02c-2.542-.2-2.542-3.214-2.542-4.427 0-.65.08-1.17.23-1.755.08-.325.18-.65.18-1.17 0-.52-.1-.845-.18-1.17-.15-.585-.23-1.105-.23-1.755 0-1.213 0-4.227 2.542-4.427z' },
  { name: 'MQTT', iconPath: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c.6 0 1.08.48 1.08 1.08v5.52c0 .6-.48 1.08-1.08 1.08H6.432c-.6 0-1.08-.48-1.08-1.08V9.24c0-.6.48-1.08 1.08-1.08h11.136z' },
  { name: 'FastAPI', iconPath: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 6h3v12h-3V6zm6 0h3v12h-3V6z' },
  { name: 'SQLite', iconPath: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 6h3v12h-3V6zm6 0h3v12h-3V6z' },
  { name: 'Spring Boot', iconPath: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 6h3v12h-3V6zm6 0h3v12h-3V6z' },
  { name: 'TensorFlow', iconPath: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 6h3v12h-3V6zm6 0h3v12h-3V6z' },
  { name: 'Keras', iconPath: 'M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-1.5 6h3v12h-3V6zm6 0h3v12h-3V6z' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Person-Identification-Tribo-Sensor',
    description: 'Explore TENG Sensor Person Identification: Innovative tech for security, access control, and more. Get involved in the future of recognition tech!',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    technologies: ['Python', 'Jupyter Notebook', 'Machine Learning'],
    githubLink: 'https://github.com/JanithaB/Person-Identification-Tribo-Sensor',
  },
  {
    id: '2',
    title: 'Gen_AI',
    description: 'Generative AI projects and experiments using modern AI/ML frameworks.',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1000',
    technologies: ['Python', 'Jupyter Notebook', 'AI/ML'],
    githubLink: 'https://github.com/JanithaB/Gen_AI',
  },
  {
    id: '3',
    title: 'hdlbits-solutions',
    description: 'Solutions for HDLBits digital design problems implemented in Verilog.',
    imageUrl: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=1000',
    technologies: ['Verilog', 'Digital Design'],
    githubLink: 'https://github.com/JanithaB/hdlbits-solutions',
  },
  {
    id: '4',
    title: 'fabnest3d',
    description: '3D fabrication and nesting application built with TypeScript.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    technologies: ['TypeScript', '3D', 'Fabrication'],
    githubLink: 'https://github.com/JanithaB/fabnest3d',
  },
];

export const EXPERIENCE: ExperienceItem[] = [
  {
    company: 'IoT & Edge Computing Projects',
    role: 'Systems Engineer',
    period: 'Present',
    description: [
      'Built production-level IoT gateways using Java with serial communication, MQTT data publishing, local SQLite storage, and multi-threaded processing.',
      'Designed MQTT-based edge-to-backend data pipelines for sensor data ingestion and backend processing.',
      'Worked with NVIDIA Jetson platforms to run ML models for real-world edge applications.',
      'Developed FastAPI backend services, including custom OAuth2 authorization servers with role- and scope-based access control.',
    ],
  },
  {
    company: 'Backend & API Development',
    role: 'Backend Engineer',
    period: 'Present',
    description: [
      'Implemented refresh tokens and multi-audience token validation in OAuth2 systems.',
      'Built MCP-compatible servers using the Model Context Protocol Python SDK.',
      'Created AI agents using mcp-use with LangChain integration.',
      'Designed dashboards and APIs for node-based monitoring systems communicating over MQTT.',
    ],
  },
  {
    company: 'DevOps & Infrastructure',
    role: 'DevOps Engineer',
    period: 'Present',
    description: [
      'Deployed and maintained backend services on Linux-based servers.',
      'Managed HTTP APIs using Spring Boot for production systems.',
      'Optimized data pipelines for real-time sensor data processing.',
    ],
  },
];
