import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '../components/ui/hero-section';
import { ParallaxSection } from '../components/ui/parallax-scroll';
import { Activity, ShieldCheck, Database, Code, ArrowRight } from 'lucide-react';

const MotionDiv = motion.div as any;

const Home: React.FC = () => {
  const capabilities = [
    {
      title: 'GovTech Solutions',
      icon: <ShieldCheck className="h-8 w-8 text-vedha-red" />,
      desc: 'Secure, scalable systems for public sector transformation.',
      color: 'vedha-red'
    },
    {
      title: 'AI & Analytics',
      icon: <Activity className="h-8 w-8 text-vedha-blue" />,
      desc: 'Predictive modeling and data-driven decision making.',
      color: 'vedha-blue'
    },
    {
      title: 'Big Data',
      icon: <Database className="h-8 w-8 text-pink-500" />,
      desc: 'Handling petabyte-scale data infrastructure.',
      color: 'pink-500'
    },
    {
      title: 'Custom Software',
      icon: <Code className="h-8 w-8 text-cyan-400" />,
      desc: 'Tailored enterprise applications for complex workflows.',
      color: 'cyan-400'
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  return (
    <main className="w-full">
      <HeroSection />

      <section className="py-24 bg-[#02050c] relative overflow-hidden" aria-labelledby="capabilities-heading">
        <ParallaxSection speed={0.3} className="absolute top-0 right-0 w-96 h-96 bg-vedha-blue/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 id="capabilities-heading" className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Core Competencies
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-vedha-blue to-vedha-red mx-auto rounded-full" aria-hidden="true"></div>
          </div>

          <MotionDiv
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {capabilities.map((item, idx) => (
              <MotionDiv
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass-panel p-8 rounded-2xl transition-all duration-300 group border-t border-white/5 hover:border-t-vedha-red/50 relative overflow-hidden focus-within:ring-2 focus-within:ring-vedha-blue"
                role="article"
                aria-labelledby={`capability-${idx}`}
                tabIndex={0}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-vedha-blue/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>

                <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:bg-white/10 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-300 group-hover:scale-110" aria-hidden="true">
                  {item.icon}
                </div>
                <h3 id={`capability-${idx}`} className="text-xl font-bold text-white mb-3 font-display group-hover:text-vedha-blue transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>
                <div className="flex items-center text-xs text-vedha-red opacity-0 group-hover:opacity-100 transition-opacity font-semibold">
                  Learn more <ArrowRight size={12} className="ml-1" />
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>
        </div>
      </section>

      <section className="py-20 border-y border-white/5 bg-[#030712]/50 relative overflow-hidden" aria-label="Technology showcase">
        <ParallaxSection speed={-0.2} className="absolute bottom-0 left-0 w-96 h-96 bg-vedha-red/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-10">
            Driving Digital Excellence
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {['Secure Infrastructure', 'Cloud Native', 'AI Driven', 'Future Ready'].map((name, i) => (
              <MotionDiv
                key={i}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="text-xl md:text-2xl font-display font-bold text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-vedha-blue hover:to-vedha-red transition-all cursor-default border border-white/10 px-6 py-3 rounded-lg bg-white/5 hover:border-vedha-blue/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] focus:outline-none focus:ring-2 focus:ring-vedha-blue"
                tabIndex={0}
                role="button"
                aria-label={`${name} technology`}
              >
                {name}
              </MotionDiv>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
