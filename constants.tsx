import { NavLink, SocialLink, Skill, Project, ExperienceItem } from '@/types';

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
  { 
    name: 'C++', 
    iconPath: 'https://img.icons8.com/ios-filled/50/c-plus-plus-logo.png'
  },
  { 
    name: 'Python', 
    iconPath: 'https://img.icons8.com/ios-filled/50/python.png'
  },
  { 
    name: 'Java', 
    iconPath: 'https://img.icons8.com/ios/50/java-coffee-cup-logo--v1.png'
  },
  { 
    name: 'JavaScript', 
    iconPath: 'https://img.icons8.com/ios/50/javascript--v1.png'
  },
  { 
    name: 'Arduino', 
    iconPath: 'https://img.icons8.com/ios-filled/50/arduino.png'
  },
  { 
    name: 'Linux', 
    iconPath: 'https://img.icons8.com/ios-filled/50/linux.png'
  },
  { 
    name: 'Nginx', 
    iconPath: 'https://img.icons8.com/external-tal-revivo-bold-tal-revivo/48/external-nginx-accelerates-content-and-application-delivery-improves-security-logo-bold-tal-revivo.png'
  },
  { 
    name: 'AWS', 
    iconPath: 'https://img.icons8.com/windows/64/amazon-web-services.png'
  },
  { 
    name: 'SQLite', 
    iconPath: 'https://img.icons8.com/ios-filled/50/sqlite.png'
  },
  { 
    name: 'Spring Boot', 
    iconPath: 'https://img.icons8.com/officel/80/spring-logo.png'
  },
  { 
    name: 'TensorFlow', 
    iconPath: 'https://img.icons8.com/color/48/tensorflow.png'
  },
  { 
    name: 'MCP', 
    iconPath: 'https://img.icons8.com/fluency/48/model-context-protocol.png'
  },
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
    id: '5',
    title: 'FabNest3D',
    description: 'Full-stack e-commerce platform for 3D fabrication services. Designed and developed the frontend, backend, and admin dashboard. Deployed on AWS EC2 with PostgreSQL database.',
    imageUrl: '/project/fabnest3d.jpg',
    technologies: ['Next.js', 'PostgreSQL', 'AWS EC2', 'TypeScript'],
    githubLink: 'https://github.com/JanithaB/fabnest3d',
    liveDemoLink: 'https://fabnest3d.com',
    category: 'E-Commerce Platforms',
  },
  {
    id: '6',
    title: 'Haritha Saviya',
    description: 'Complete e-commerce solution with custom frontend and backend. Features include product management, order processing, and admin dashboard. Hosted on AWS EC2 with MongoDB database.',
    imageUrl: '/project/harithasaviya.jpg',
    technologies: ['Next.js', 'MongoDB', 'AWS EC2', 'TypeScript'],
    githubLink: 'https://github.com/HarithaSaviya/Website',
    liveDemoLink: 'https://harithasaviya.lk',
    category: 'E-Commerce Platforms',
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
