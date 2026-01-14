export interface NavLink {
  id: string;
  name: string;
  href: string;
}

export interface SocialLink {
  name: string;
  iconPath: string; // SVG path or a simple identifier
  href: string;
}

export interface Skill {
  name: string;
  iconPath: string; // SVG path for the skill icon
}

export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubLink: string;
  liveDemoLink?: string;
  category?: string;
}

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string[];
}
