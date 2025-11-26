import React from 'react';
import { HeroSection } from '../components/ui/hero-section';
import { Activity, ShieldCheck, Database, Code } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <div className="w-full">
      {/* New Hero Section */}
      <HeroSection />

      {/* Capabilities Preview */}
      <section className="py-24 bg-[#02050c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Core Competencies</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-vedha-blue to-vedha-purple mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'GovTech Solutions', icon: <ShieldCheck className="h-8 w-8 text-vedha-purple" />, desc: 'Secure, scalable systems for public sector transformation.' },
              { title: 'AI & Analytics', icon: <Activity className="h-8 w-8 text-vedha-blue" />, desc: 'Predictive modeling and data-driven decision making.' },
              { title: 'Big Data', icon: <Database className="h-8 w-8 text-pink-500" />, desc: 'Handling petabyte-scale data infrastructure.' },
              { title: 'Custom Software', icon: <Code className="h-8 w-8 text-cyan-400" />, desc: 'Tailored enterprise applications for complex workflows.' },
            ].map((item, idx) => (
              <div key={idx} className="glass-panel p-8 rounded-2xl hover:translate-y-[-10px] transition-transform duration-300 group border-t border-white/5 hover:border-t-vedha-purple/50">
                <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:bg-white/10 group-hover:shadow-[0_0_20px_rgba(217,70,239,0.2)] transition-all">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 font-display">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 border-y border-white/5 bg-[#030712]/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-10">Driving Digital Excellence</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {/* Styled Text Placeholders for logos */}
            {['Secure Infrastructure', 'Cloud Native', 'AI Driven', 'Future Ready'].map((name, i) => (
              <div key={i} className="text-xl md:text-2xl font-display font-bold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-vedha-blue hover:to-vedha-purple transition-all cursor-default border border-white/10 px-6 py-3 rounded-lg bg-white/5">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;