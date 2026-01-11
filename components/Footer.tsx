import React from 'react';
import { SOCIAL_LINKS } from '@/constants';

const Footer: React.FC = () => {
  return (
    <footer className="py-8 text-center bg-slate-900">
      <div className="flex justify-center space-x-8 mb-6 md:hidden">
        {SOCIAL_LINKS.map(link => (
          <a key={link.name} href={link.href} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-teal-300">
             <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
               <path d={link.iconPath} />
             </svg>
          </a>
        ))}
      </div>
      <div className="font-mono text-xs text-slate-500">
        <p>Built with React & Tailwind CSS</p>
        <p className="mt-2">© {new Date().getFullYear()} Janitha Rathnayake</p>
      </div>
    </footer>
  );
};

export default Footer;