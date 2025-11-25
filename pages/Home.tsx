import React, { useEffect, useState } from 'react';
import { generateTagline } from '../services/gemini';
import { ArrowRight, Activity, ShieldCheck, Database, Code } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [tagline, setTagline] = useState<string>("Innovating India Through Technology");
  const [loadingTagline, setLoadingTagline] = useState(true);

  useEffect(() => {
    const fetchTagline = async () => {
      const generated = await generateTagline();
      setTagline(generated);
      setLoadingTagline(false);
    };
    fetchTagline();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-[#030712]">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-vedha-blue/10 rounded-full blur-[128px] animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-vedha-purple/10 rounded-full blur-[128px] animate-pulse-slow"></div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-vedha-blue/30 bg-vedha-blue/10 text-vedha-blue text-xs font-bold tracking-widest uppercase animate-fade-in-up shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            Powered by Gemini 3 Intelligence
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-extrabold text-white mb-6 leading-tight tracking-tight">
            Next-Gen <span className="text-transparent bg-clip-text bg-gradient-to-r from-vedha-blue to-vedha-purple">Digital</span> <br />
            Transformation
          </h1>

          <div className="h-20 flex items-center justify-center mb-8">
            {loadingTagline ? (
               <div className="h-2 w-32 bg-white/10 rounded animate-pulse"></div>
            ) : (
              <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto animate-fade-in">
                "{tagline}"
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact" className="px-8 py-4 bg-white text-[#030712] font-bold rounded-lg hover:bg-gray-200 transition-all transform hover:scale-105 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Request Proposal <ArrowRight size={20} />
            </Link>
            <Link to="/about" className="px-8 py-4 glass-panel text-white font-medium rounded-lg hover:bg-white/10 hover:border-vedha-purple/50 transition-all flex items-center gap-2">
              Our Vision
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-gray-600 flex justify-center p-1">
             <div className="w-1 h-3 bg-vedha-purple rounded-full animate-scroll"></div>
          </div>
        </div>
      </section>

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
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-10">Trusted by Leading Institutions</p>
          <div className="flex flex-wrap justify-center gap-16 opacity-40 hover:opacity-100 transition-opacity duration-500">
            {/* Styled Text Placeholders for logos */}
            {['Ministry of IT', 'Smart City Mission', 'Digital India', 'Tech Corp Global'].map((name, i) => (
              <div key={i} className="text-2xl font-display font-bold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-vedha-blue hover:to-vedha-purple transition-all cursor-default">
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