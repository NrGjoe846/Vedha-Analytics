import React from 'react';
import { motion } from 'framer-motion';
import { HeroSection } from '../components/ui/hero-section';
import { ParallaxSection } from '../components/ui/parallax-scroll';
import { GlassCard } from '../components/ui/glass-card';
import { AnimatedStat, StatsGrid, CircularProgress } from '../components/ui/animated-stats';
import { ImageGallery } from '../components/ui/image-gallery';
import { AnimatedGradientBackground } from '../components/ui/video-background';
import { Activity, ShieldCheck, Database, Code, ArrowRight, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const MotionDiv = motion.div as any;

const Home: React.FC = () => {
  const capabilities = [
    {
      title: 'GovTech Solutions',
      icon: <ShieldCheck className="h-8 w-8" />,
      desc: 'Secure, scalable systems for public sector transformation.',
      color: 'vedha-red'
    },
    {
      title: 'AI & Analytics',
      icon: <Activity className="h-8 w-8" />,
      desc: 'Predictive modeling and data-driven decision making.',
      color: 'vedha-blue'
    },
    {
      title: 'Big Data',
      icon: <Database className="h-8 w-8" />,
      desc: 'Handling petabyte-scale data infrastructure.',
      color: 'pink-500'
    },
    {
      title: 'Custom Software',
      icon: <Code className="h-8 w-8" />,
      desc: 'Tailored enterprise applications for complex workflows.',
      color: 'cyan-400'
    },
  ];

  const stats = [
    {
      value: 150,
      suffix: '+',
      label: 'Projects Delivered',
      icon: <Sparkles className="w-6 h-6 text-vedha-blue" />,
      color: 'blue' as const,
      trend: 'up' as const,
      trendValue: 23,
    },
    {
      value: 50,
      suffix: 'M+',
      label: 'Data Points Processed',
      icon: <TrendingUp className="w-6 h-6 text-vedha-red" />,
      color: 'red' as const,
      trend: 'up' as const,
      trendValue: 45,
    },
    {
      value: 98,
      suffix: '%',
      label: 'Client Satisfaction',
      icon: <Users className="w-6 h-6 text-green-500" />,
      color: 'green' as const,
      trend: 'up' as const,
      trendValue: 5,
    },
    {
      value: 24,
      suffix: '/7',
      label: 'System Uptime',
      icon: <Zap className="w-6 h-6 text-purple-500" />,
      color: 'purple' as const,
      trend: 'neutral' as const,
    },
  ];

  const galleryImages = [
    {
      src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
      alt: 'Global data visualization and analytics dashboard',
      caption: 'Global Data Analytics Platform',
    },
    {
      src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      alt: 'Modern server infrastructure and cloud computing',
      caption: 'Cloud Infrastructure Solutions',
    },
    {
      src: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&q=80&w=800',
      alt: 'AI and machine learning visualization',
      caption: 'AI-Powered Decision Making',
    },
    {
      src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
      alt: 'Collaborative team working on digital solutions',
      caption: 'Collaborative Innovation',
    },
    {
      src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      alt: 'Business analytics and data visualization',
      caption: 'Business Intelligence',
    },
    {
      src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800',
      alt: 'Advanced technology and digital transformation',
      caption: 'Digital Transformation',
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
              <GlassCard
                key={idx}
                variant="frosted"
                hover={true}
                glow={false}
                className="p-8 group"
                role="article"
                aria-labelledby={`capability-${idx}`}
                tabIndex={0}
              >
                <MotionDiv variants={itemVariants} className="h-full flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-vedha-blue/10 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>

                  <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:bg-white/10 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all duration-300 group-hover:scale-110 text-vedha-blue" aria-hidden="true">
                    {item.icon}
                  </div>
                  <h3 id={`capability-${idx}`} className="text-xl font-bold text-white mb-3 font-display group-hover:text-vedha-blue transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                    {item.desc}
                  </p>
                  <div className="flex items-center text-xs text-vedha-red opacity-0 group-hover:opacity-100 transition-opacity font-semibold mt-auto">
                    Learn more <ArrowRight size={12} className="ml-1" />
                  </div>
                </MotionDiv>
              </GlassCard>
            ))}
          </MotionDiv>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden bg-[#030712]/50" aria-label="Performance metrics">
        <ParallaxSection speed={-0.2} className="absolute bottom-0 left-0 w-96 h-96 bg-vedha-red/5 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Measurable Impact
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Real-world results that demonstrate our commitment to excellence and innovation.
            </p>
          </div>

          <StatsGrid stats={stats} columns={4} />
        </div>
      </section>

      <section className="py-24 bg-[#02050c] relative overflow-hidden" aria-label="Success metrics visualization">
        <AnimatedGradientBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Excellence in Execution
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-vedha-blue to-vedha-red mx-auto rounded-full mb-6"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="flex flex-col items-center">
              <CircularProgress value={99} size={140} color="#3b82f6" label="Uptime" />
            </div>
            <div className="flex flex-col items-center">
              <CircularProgress value={95} size={140} color="#ef4444" label="Accuracy" />
            </div>
            <div className="flex flex-col items-center">
              <CircularProgress value={98} size={140} color="#10b981" label="Satisfaction" />
            </div>
            <div className="flex flex-col items-center">
              <CircularProgress value={92} size={140} color="#8b5cf6" label="Efficiency" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#030712] relative overflow-hidden" aria-label="Project showcase">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Transformative Solutions
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explore our portfolio of cutting-edge projects that drive digital transformation.
            </p>
          </div>

          <ImageGallery images={galleryImages} columns={3} />
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

      <section className="py-24 bg-[#02050c] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-vedha-blue/5 via-transparent to-vedha-red/5"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
            Ready to Transform Your Vision?
          </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Partner with us to leverage cutting-edge technology and drive measurable business outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-10 py-4 bg-gradient-to-r from-vedha-blue to-vedha-red text-white font-bold rounded-full hover:shadow-[0_0_40px_rgba(239,68,68,0.4)] transition-all transform hover:-translate-y-1"
            >
              Start Your Project
            </Link>
            <Link
              to="/projects"
              className="px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-full hover:bg-white/20 transition-all"
            >
              View Case Studies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
