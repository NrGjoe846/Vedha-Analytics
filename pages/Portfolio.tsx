import React, { useState } from 'react';
import { Map, BarChart2, Users, Target, ShieldCheck, ClipboardCheck, ArrowRight, CheckCircle2, XCircle, Send } from 'lucide-react';
import { PoliticalServiceCard } from '../components/ui/political-service-card';
import { ImpactCounter } from '../components/ui/impact-counter';
import { LampContainer } from '../components/ui/lamp';
import { motion } from 'framer-motion';

const Portfolio: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', phone: '', email: '' });
  const [submitted, setSubmitted] = useState(false);

  const services = [
    {
      id: '1',
      title: 'Constituency Intelligence',
      icon: <Map className="w-6 h-6" />,
      subServices: ['Booth-level voter profiling', 'Trend tracking (5-year pattern)', 'Opponent strategy mapping', 'Ground mood & issue analysis']
    },
    {
      id: '2',
      title: 'Digital Political Analytics',
      icon: <BarChart2 className="w-6 h-6" />,
      subServices: ['Social media sentiment tracking', 'Narrative heatmaps', 'Misinformation monitoring', 'Engagement analysis']
    },
    {
      id: '3',
      title: 'Field Research & Surveys',
      icon: <Users className="w-6 h-6" />,
      subServices: ['Door-to-door surveys', 'Telephonic and digital polling', 'Community opinion reports', 'Youth & women voter insights']
    },
    {
      id: '4',
      title: 'Campaign Strategy Consulting',
      icon: <Target className="w-6 h-6" />,
      subServices: ['Message & narrative development', 'Influencer mapping', 'Micro-targeted content plan', 'War-room support']
    },
    {
      id: '5',
      title: 'Candidate Performance Eval',
      icon: <ShieldCheck className="w-6 h-6" />,
      subServices: ['Public rating score', 'Governance scorecard', 'Constituency service evaluation', 'Reputation analysis']
    },
    {
      id: '6',
      title: 'Poll-Day Management',
      icon: <ClipboardCheck className="w-6 h-6" />,
      subServices: ['Voter mobilisation models', 'Booth-level turnout prediction', 'Booth agent analytics']
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#030712] overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <LampContainer className="min-h-[60vh] md:min-h-[70vh]">
        <motion.div
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="text-center"
        >
            <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-vedha-purple/30 bg-vedha-purple/10 text-vedha-purple text-xs font-bold tracking-widest uppercase animate-pulse-slow">
                Veth Analytics Pvt. Ltd.
            </div>
            <h1 className="mt-2 bg-gradient-to-br from-white to-gray-400 py-4 bg-clip-text text-4xl md:text-7xl font-display font-bold tracking-tight text-transparent">
                Political Intelligence <br /> & Strategic Insight
            </h1>
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto font-light text-lg leading-relaxed">
                We combine technology, field intelligence, data science, and human insight to deliver actionable strategies that create real electoral impact.
            </p>
            <div className="mt-8 flex justify-center gap-4">
                <a href="#services" className="px-8 py-3 bg-vedha-blue text-white font-bold rounded-full hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    Explore Services
                </a>
                <a href="#contact-module" className="px-8 py-3 bg-white/5 text-white font-bold rounded-full hover:bg-white/10 border border-white/10 transition-all">
                    Book Consultation
                </a>
            </div>
        </motion.div>
      </LampContainer>

      {/* 2. SERVICES MATRIX */}
      <section id="services" className="py-24 relative z-10 -mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-16">
                <h2 className="text-3xl font-display font-bold text-white mb-4">Core Strategic Pillars</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-vedha-blue to-vedha-purple rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                    <PoliticalServiceCard 
                        key={service.id}
                        {...service}
                    />
                ))}
            </div>
        </div>
      </section>

      {/* 3. IMPACT SUMMARY */}
      <section className="py-20 bg-white/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <ImpactCounter value={50} suffix="+" label="Campaigns Managed" />
                <ImpactCounter value={10} suffix="M+" label="Voters Profiled" />
                <ImpactCounter value={95} suffix="%" label="Prediction Accuracy" />
                <ImpactCounter value={24} suffix="/7" label="War Room Support" />
            </div>
        </div>
      </section>

      {/* 4. COMPARISON GRID: Why Choose Veth */}
      <section className="py-24 bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-display font-bold text-white mb-4">The Intelligence Advantage</h2>
                <p className="text-gray-400">Why leading political figures choose data over guesswork.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Traditional */}
                <div className="p-8 rounded-3xl border border-white/5 bg-white/[0.02]">
                    <h3 className="text-xl font-bold text-gray-500 mb-6 flex items-center gap-2">
                        <XCircle className="text-red-500/50" /> Traditional Politics
                    </h3>
                    <ul className="space-y-4 text-gray-500">
                        <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-2"></span> Reliance on 'gut feeling' and hearsay</li>
                        <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-2"></span> Scattered, unverified field reports</li>
                        <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-2"></span> Reactive crisis management</li>
                        <li className="flex gap-3"><span className="w-1.5 h-1.5 bg-gray-700 rounded-full mt-2"></span> Generic messaging for all voters</li>
                    </ul>
                </div>

                {/* Veth Way */}
                <div className="p-8 rounded-3xl border border-vedha-blue/30 bg-gradient-to-br from-vedha-blue/5 to-vedha-purple/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-vedha-blue/10 rounded-full blur-3xl"></div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <CheckCircle2 className="text-vedha-blue" /> Veth Intelligence
                    </h3>
                    <ul className="space-y-4 text-gray-300">
                        <li className="flex gap-3">
                            <CheckCircle2 size={16} className="text-vedha-purple mt-1 shrink-0" />
                            <span><strong>Accuracy-first approach</strong> combining data + field reality</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle2 size={16} className="text-vedha-purple mt-1 shrink-0" />
                            <span><strong>Confidential</strong> & high-trust intelligence systems</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle2 size={16} className="text-vedha-purple mt-1 shrink-0" />
                            <span><strong>Real-time</strong> reporting & fast feedback loops</span>
                        </li>
                        <li className="flex gap-3">
                            <CheckCircle2 size={16} className="text-vedha-purple mt-1 shrink-0" />
                            <span><strong>Micro-targeted</strong> narrative setting</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
      </section>

      {/* 5. ENGAGEMENT CTA MODULE */}
      <section id="contact-module" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-vedha-blue/5"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10">
            <div className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-display font-bold text-white mb-4">Secure Your Strategy</h2>
                    <p className="text-gray-400">Confidential consultation for serious political contenders.</p>
                </div>

                {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <input 
                                type="text" 
                                placeholder="Name / Representative" 
                                required
                                value={formState.name}
                                onChange={e => setFormState({...formState, name: e.target.value})}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-vedha-blue transition-colors"
                            />
                            <input 
                                type="text" 
                                placeholder="Contact Number (Secure)" 
                                required
                                value={formState.phone}
                                onChange={e => setFormState({...formState, phone: e.target.value})}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-vedha-blue transition-colors"
                            />
                        </div>
                        <input 
                            type="email" 
                            placeholder="Official Email Address" 
                            required
                            value={formState.email}
                            onChange={e => setFormState({...formState, email: e.target.value})}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-vedha-blue transition-colors"
                        />
                        <button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-vedha-blue to-vedha-purple text-white font-bold text-lg py-5 rounded-xl hover:shadow-[0_0_30px_rgba(217,70,239,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
                        >
                            Request Briefing <Send size={20} />
                        </button>
                    </form>
                ) : (
                    <div className="text-center py-10">
                        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Request Received</h3>
                        <p className="text-gray-400">Our senior strategist will reach out via secure channel shortly.</p>
                    </div>
                )}

                <p className="text-center text-xs text-gray-600 mt-8">
                    100% Confidentiality Guaranteed. Data encrypted end-to-end.
                </p>
            </div>
        </div>
      </section>

    </div>
  );
};

export default Portfolio;
