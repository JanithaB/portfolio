import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 text-center max-w-2xl mx-auto">
      <p className="text-teal-300 font-mono text-lg mb-4">04. What's Next?</p>
      <h2 className="text-5xl font-bold text-slate-100 mb-6">Get In Touch</h2>
      <p className="text-slate-400 text-lg mb-12">
        Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
      </p>
      <a 
        href="mailto:jbrathnayake98@gmail.com" 
        className="inline-block border border-teal-300 text-teal-300 px-8 py-4 rounded text-lg hover:bg-teal-300/10 transition-colors"
      >
        Say Hello
      </a>
    </section>
  );
};

export default Contact;