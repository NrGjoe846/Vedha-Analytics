import React from 'react';
import { Search, MousePointerClick, Share2, FileText, Mail, Layout, TrendingUp, ShieldAlert, ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

const services: ServiceItem[] = [
  {
    id: 'seo',
    title: 'Search Engine Optimization (SEO)',
    description: 'We engineer dominance in search rankings through technical precision, authoritative backlinking, and semantic content strategies.',
    icon: 'Search',
    features: ['Technical & On-Page Optimization', 'Strategic Link Building', 'Local SEO Dominance']
  },
  {
    id: 'ppc',
    title: 'Pay-Per-Click Advertising',
    description: 'Maximize ROI with algorithmically optimized ad spend across Google, Bing, and social ecosystems to drive instant, high-intent traffic.',
    icon: 'MousePointerClick',
    features: ['Google Ads (Search/Shopping)', 'Social Media Ad Campaigns', 'Retargeting Architectures']
  },
  {
    id: 'smm',
    title: 'Social Media Marketing',
    description: 'Cultivate a loyal digital community and elevate brand equity through trend-responsive content and strategic influencer alliances.',
    icon: 'Share2',
    features: ['Influencer Strategy', 'Community Management', 'Cross-Platform Growth']
  },
  {
    id: 'content',
    title: 'Content Marketing Ecosystems',
    description: 'Distribute high-impact intellectual property—from whitepapers to video assets—that establishes industry authority and trust.',
    icon: 'FileText',
    features: ['Thought Leadership Articles', 'Video Production', 'Interactive Case Studies']
  },
  {
    id: 'email',
    title: 'Automated Retention Marketing',
    description: 'Leverage behavioral data to deploy hyper-personalized drip campaigns that nurture leads and maximize customer lifetime value.',
    icon: 'Mail',
    features: ['List Segmentation', 'Automated Workflows', 'Personalized Messaging']
  },
  {
    id: 'webdev',
    title: 'Premium Web Development',
    description: 'Merge aesthetics with performance using cutting-edge frameworks like React and Next.js for a superior, high-converting user journey.',
    icon: 'Layout',
    features: ['Custom UI/UX Design', 'E-commerce Solutions', 'Mobile-First Architecture']
  },
  {
    id: 'analytics',
    title: 'Advanced Analytics & CRO',
    description: 'Transform raw data into strategic intelligence with rigorous A/B testing and visualization to decode behavior and optimize funnels.',
    icon: 'TrendingUp',
    features: ['Conversion Rate Optimization', 'Custom Data Dashboards', 'ROI Tracking']
  },
  {
    id: 'orm',
    title: 'Online Reputation Management',
    description: 'Proactively monitor and sanitize your digital footprint to ensure brand resilience and a pristine, trustworthy public image.',
    icon: 'ShieldAlert',
    features: ['Brand Mention Monitoring', 'Crisis Communication', 'Review Management']
  }
];

const Services: React.FC = () => {
  const getIcon = (name: string) => {
    const className = "w-6 h-6";
    switch (name) {
      case 'Search': return <Search className={className} />;
      case 'MousePointerClick': return <MousePointerClick className={className} />;
      case 'Share2': return <Share2 className={className} />;
      case 'FileText': return <FileText className={className} />;
      case 'Mail': return <Mail className={className} />;
      case 'Layout': return <Layout className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'ShieldAlert': return <ShieldAlert className={className} />;
      default: return <Layout className={className} />;
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Digital Excellence Services</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Comprehensive digital solutions designed to elevate your brand authority and accelerate business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div key={service.id} className="glass-panel rounded-2xl p-8 hover:bg-white/5 transition-all duration-300 group border border-white/5 hover:border-vedha-purple/50 relative overflow-hidden flex flex-col h-full hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-vedha-blue/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:bg-vedha-purple/20 transition-colors duration-500"></div>

              <div className="mb-6 p-3 bg-white/5 rounded-lg w-fit group-hover:scale-110 transition-transform duration-300 group-hover:bg-vedha-blue/20 group-hover:text-vedha-blue">
                {getIcon(service.icon)}
              </div>
              
              <h3 className="text-xl font-bold font-display text-white mb-3 min-h-[3.5rem] flex items-center group-hover:text-vedha-blue transition-colors">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed text-sm flex-grow font-light">
                {service.description}
              </p>

              <div className="space-y-3 mb-8">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
                    <div className="min-w-[4px] h-[4px] rounded-full bg-vedha-purple mt-1.5 mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Premium</span>
                <button className="text-vedha-blue group-hover:text-vedha-purple text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1 group-hover:gap-2">
                  Explore <ArrowRight size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;