import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 md:py-24 text-center max-w-2xl mx-auto px-4">
      <p className="text-teal-300 font-mono text-sm md:text-lg mb-2 md:mb-4">04. What&apos;s Next?</p>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-100 mb-4 md:mb-6 leading-tight">Get In Touch</h2>
      <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-12 leading-relaxed">
        Although I&apos;m not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
      </p>
      <a 
        href="mailto:jbrathnayake98@gmail.com" 
        className="inline-block border border-teal-300 text-teal-300 px-6 py-3 md:px-8 md:py-4 rounded text-base md:text-lg hover:bg-teal-300/10 transition-colors touch-manipulation"
      >
        Say Hello
      </a>
    </section>
  );
};

export default Contact;