import React, { useState, useEffect } from 'react';
import { generateTagline, generateTeamBio, generateMissionInsight, generateTimelineInsight, generateTestimonialSummary } from '../services/gemini';
import { TimelineEvent, TeamMember, Testimonial } from '../types';
import { Target, Lightbulb, Users, Globe, ArrowRight, Activity, X, Loader2, Calendar, ChevronRight, MessageSquareQuote, Star, BarChart3, Fingerprint, BrainCircuit, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

const timelineEvents: TimelineEvent[] = [
  { year: '2018', title: 'Foundation', description: 'Vedha Analytics was established with a vision to revolutionize Indian GovTech and Political Strategy.' },
  { year: '2020', title: 'First Major Campaign', description: 'Successfully managed data analytics for a state-level election, optimizing voter outreach.' },
  { year: '2022', title: 'AI Research Lab', description: 'Launched dedicated R&D wing for generative AI models tailored for Indic languages and sentiment analysis.' },
  { year: '2023', title: 'National Recognition', description: 'Awarded "Top GovTech Startup" by Ministry of Electronics & IT.' },
  { year: '2024', title: 'Global Expansion', description: 'Started operations in SEA region with specialized efficient-compute models.' },
];

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Arjun Mehta', role: 'CEO & Lead Strategist', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400', socials: {} },
  { id: '2', name: 'Dr. Priya Rao', role: 'Chief Data Scientist', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', socials: {} },
  { id: '3', name: 'Vikram Singh', role: 'Head of Field Intelligence', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400', socials: {} },
];

const testimonials: Testimonial[] = [
  { 
    id: 't1', 
    clientName: 'Rajiv Kumar', 
    company: 'State Election Commission', 
    text: 'Vedha Analytics completely transformed our voter engagement protocols. Their AI models improved outreach efficiency by 30% within three months.',
    outcome: 'Optimized voter engagement by 30%'
  },
  { 
    id: 't2', 
    clientName: 'Sarah Jenkins', 
    company: 'Global Policy Institute', 
    text: 'The secure data systems developed by Vedha are state-of-the-art. It handles millions of records with zero latency and impeccable security compliance.',
    outcome: '100% data security & compliance'
  },
  { 
    id: 't3', 
    clientName: 'Amit Desai', 
    company: 'National Party HQ', 
    text: 'Their predictive analytics dashboard allowed us to foresee constituency trends with 90% accuracy. The team is professional, proactive, and technically superior.',
    outcome: '90% prediction accuracy achieved'
  }
];

const clientLogos = ['SmartCity Mission', 'GovTech India', 'Ministry of IT', 'FinServe Global', 'HealthPlus', 'InfraBuild', 'Digital India', 'CyberSecure'];

const About: React.FC = () => {
  const [tagline, setTagline] = useState('Innovating India Through Technology');
  const [missionInsight, setMissionInsight] = useState('');
  const [bioContent, setBioContent] = useState<Record<string, string>>({});
  
  // Timeline State
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [timelineInsight, setTimelineInsight] = useState<string>('');
  const [loadingTimeline, setLoadingTimeline] = useState(false);

  // Testimonial State
  const [testimonialSummaries, setTestimonialSummaries] = useState<Record<string, string>>({});

  // Scroll State for Sticky CTA
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    generateTagline().then(setTagline);
    generateMissionInsight().then(setMissionInsight);

    // Generate summaries for testimonials on load
    testimonials.forEach(async (t) => {
        const summary = await generateTestimonialSummary(t.company, t.text);
        setTestimonialSummaries(prev => ({ ...prev, [t.id]: summary }));
    });

    const handleScroll = () => {
      // Show sticky CTA after scrolling past 500px
      if (window.scrollY > 500) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTeamHover = async (member: TeamMember) => {
    if (!bioContent[member.id]) {
      const bio = await generateTeamBio(member.name, member.role);
      setBioContent(prev => ({ ...prev, [member.id]: bio }));
    }
  };

  const handleTimelineClick = async (event: TimelineEvent) => {
    setSelectedEvent(event);
    setTimelineInsight('');
    setLoadingTimeline(true);
    const insight = await generateTimelineInsight(event.year, event.title);
    setTimelineInsight(insight);
    setLoadingTimeline(false);
  };

  return (
    <div className="w-full pt-20 relative">
      
      {/* Sticky Bottom CTA */}
      <div className={`fixed bottom-0 left-0 w-full z-40 transform transition-transform duration-500 ease-in-out ${showStickyCTA ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="bg-[#030712]/90 backdrop-blur-xl border-t border-vedha-purple/30 p-4 shadow-[0_-5px_20px_rgba(217,70,239,0.1)]">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-white font-display font-bold text-lg">Ready to decode the future?</h3>
              <p className="text-gray-400 text-xs hidden md:block">Our strategists are ready to design your next campaign breakthrough.</p>
            </div>
            <Link to="/contact" className="px-6 py-2.5 bg-gradient-to-r from-vedha-blue to-vedha-purple text-white font-bold text-sm rounded-full shadow-[0_0_15px_rgba(217,70,239,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all flex items-center gap-2">
              Request Consultation <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* Timeline Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="glass-panel w-full max-w-lg rounded-2xl p-8 relative border border-vedha-blue/50 shadow-[0_0_50px_rgba(59,130,246,0.2)]">
            <button 
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="mb-2 inline-block px-3 py-1 rounded bg-vedha-blue/10 text-vedha-blue font-bold text-sm border border-vedha-blue/20">
              {selectedEvent.year}
            </div>
            <h3 className="text-3xl font-display font-bold text-white mb-4">{selectedEvent.title}</h3>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {selectedEvent.description}
            </p>
            
            <div className="pt-6 border-t border-white/10">
              <h4 className="text-sm font-semibold text-vedha-purple uppercase tracking-wider mb-2 flex items-center gap-2">
                <Activity size={14} /> AI Context
              </h4>
              {loadingTimeline ? (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <Loader2 className="animate-spin" size={14} /> Analyzing historical data...
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">
                  "{timelineInsight}"
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[#030712]">
           {/* Abstract Neon Grid Background */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-vedha-purple/10 to-transparent"></div>
           <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-vedha-blue/10 to-transparent blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="inline-block px-4 py-1 rounded-full border border-vedha-purple/30 bg-vedha-purple/10 text-vedha-purple text-xs font-bold uppercase tracking-wider animate-pulse-slow">
                    Political Intelligence & Strategy
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                    Decoding <span className="neon-gradient-text">Democracy</span>
                </h1>
                <p className="text-xl text-gray-400 font-light max-w-lg">
                    Transforming ground realities into actionable intelligence for leaders of tomorrow.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <button className="px-8 py-3 bg-vedha-blue text-white font-semibold rounded-lg hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                        Explore Strategy
                    </button>
                    <button className="px-8 py-3 glass-panel text-white font-semibold rounded-lg hover:bg-white/10 transition-all">
                        Meet The Team
                    </button>
                </div>
            </div>

            {/* 3D Visual Placeholder */}
            <div className="h-[400px] w-full relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-vedha-blue/20 to-vedha-purple/20 rounded-2xl blur-xl animate-pulse-slow"></div>
                <div className="relative h-full w-full glass-panel rounded-2xl overflow-hidden border border-white/10 flex items-center justify-center">
                    {/* Placeholder for Spline - CSS representation */}
                    <div className="relative w-48 h-48 animate-float">
                        <div className="absolute inset-0 border-4 border-vedha-blue rounded-full opacity-50 animate-[spin_10s_linear_infinite]"></div>
                        <div className="absolute inset-4 border-4 border-vedha-purple rounded-full opacity-50 animate-[spin_15s_linear_infinite_reverse]"></div>
                        <div className="absolute inset-8 border-4 border-white rounded-full opacity-20 animate-[spin_20s_linear_infinite]"></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Activity className="w-16 h-16 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* NEW MAIN BLOCK: Who We Are */}
      <section className="py-20 bg-[#02050c] relative">
         <div className="max-w-5xl mx-auto px-6">
            <div className="glass-panel p-8 md:p-14 rounded-3xl border border-vedha-blue/20 shadow-[0_0_60px_rgba(59,130,246,0.15)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-vedha-blue/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                
                <h2 className="text-sm font-bold text-vedha-blue uppercase tracking-widest mb-6 flex items-center gap-3">
                   <span className="w-10 h-0.5 bg-vedha-blue"></span> Who We Are
                </h2>
                
                <p className="text-xl md:text-2xl text-white leading-relaxed font-light mb-8">
                    <span className="font-semibold text-vedha-purple">Vedha Analytics Pvt. Ltd.</span> is a next-generation political analytics and strategy company built to decode voter behaviour, analyse ground realities, and provide data-driven solutions for political parties, leaders, and public-policy organisations.
                </p>
                
                <p className="text-lg text-gray-400 leading-relaxed font-light">
                    We combine <span className="text-white font-medium">technology, field intelligence, data science, and human insight</span> to deliver actionable strategies that create real electoral impact.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-10 border-t border-white/10">
                   {[
                      { icon: <BrainCircuit className="w-6 h-6 text-vedha-blue" />, label: "Technology" },
                      { icon: <Map className="w-6 h-6 text-vedha-purple" />, label: "Field Intel" },
                      { icon: <BarChart3 className="w-6 h-6 text-pink-500" />, label: "Data Science" },
                      { icon: <Fingerprint className="w-6 h-6 text-cyan-400" />, label: "Human Insight" }
                   ].map((item, idx) => (
                      <div key={idx} className="flex flex-col items-center text-center gap-3 group">
                         <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                            {item.icon}
                         </div>
                         <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{item.label}</span>
                      </div>
                   ))}
                </div>
            </div>
         </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 bg-[#02050c] relative">
          <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Our Journey</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-vedha-blue to-vedha-purple mx-auto rounded-full"></div>
                  <p className="mt-4 text-gray-500 text-sm">Tap on a milestone to view details</p>
              </div>

              {/* Desktop Vertical Layout */}
              <div className="hidden md:block relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-vedha-blue via-vedha-purple to-transparent opacity-30"></div>
                  <div className="space-y-12">
                      {timelineEvents.map((event, index) => (
                          <div 
                            key={index} 
                            className={`flex items-center justify-between w-full cursor-pointer group ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
                            onClick={() => handleTimelineClick(event)}
                          >
                              <div className="w-5/12"></div>
                              <div className="z-10 bg-[#030712] border-2 border-vedha-purple rounded-full p-2 shadow-[0_0_10px_rgba(217,70,239,0.5)] group-hover:scale-125 transition-transform duration-300">
                                  <div className="w-3 h-3 bg-white rounded-full"></div>
                              </div>
                              <div className="w-5/12 glass-panel p-6 rounded-xl border border-white/10 group-hover:border-vedha-blue group-hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 transform group-hover:-translate-y-1">
                                  <span className="text-vedha-blue font-display font-bold text-xl block mb-2">{event.year}</span>
                                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-vedha-purple transition-colors">{event.title}</h3>
                                  <p className="text-gray-400 text-sm line-clamp-2">{event.description}</p>
                                  <div className="mt-2 text-xs text-vedha-silver flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    Read More <ChevronRight size={12} />
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>

              {/* Mobile Horizontal Swipe Layout */}
              <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory space-x-4 pb-8 -mx-4 px-4 scrollbar-hide">
                  {timelineEvents.map((event, index) => (
                    <div 
                      key={index} 
                      onClick={() => handleTimelineClick(event)}
                      className="snap-center shrink-0 w-[85vw] glass-panel p-6 rounded-xl border border-white/10 active:scale-95 transition-transform duration-200"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 rounded-full bg-vedha-blue/10 text-vedha-blue font-bold text-sm border border-vedha-blue/20">{event.year}</span>
                        <Calendar size={16} className="text-gray-500" />
                      </div>
                      <h3 className="text-white font-bold text-xl mb-2">{event.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-3">{event.description}</p>
                      <div className="mt-4 pt-4 border-t border-white/5 text-xs text-center text-vedha-purple font-medium uppercase tracking-wider">
                        Tap for Details
                      </div>
                    </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Mission & Vision - Split Screen */}
      <section className="py-24 bg-[#030712] relative overflow-hidden">
          <div className="absolute inset-0 bg-vedha-blue/5 skew-y-3 transform origin-bottom-left"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-panel p-10 rounded-2xl border-l-4 border-vedha-blue hover:translate-y-[-5px] transition-transform">
                      <div className="w-12 h-12 bg-vedha-blue/20 rounded-lg flex items-center justify-center mb-6">
                          <Target className="w-6 h-6 text-vedha-blue" />
                      </div>
                      <h3 className="text-2xl font-display font-bold text-white mb-4">Our Mission</h3>
                      <p className="text-gray-400 leading-relaxed">
                          To democratize access to advanced technology for Indian enterprises and government bodies, ensuring efficiency, transparency, and scalability in every solution we deploy.
                      </p>
                  </div>

                  <div className="glass-panel p-10 rounded-2xl border-l-4 border-vedha-purple hover:translate-y-[-5px] transition-transform">
                      <div className="w-12 h-12 bg-vedha-purple/20 rounded-lg flex items-center justify-center mb-6">
                          <Lightbulb className="w-6 h-6 text-vedha-purple" />
                      </div>
                      <h3 className="text-2xl font-display font-bold text-white mb-4">Our Vision</h3>
                      <p className="text-gray-400 leading-relaxed mb-4">
                          To be the global benchmark for responsible AI and digital governance.
                      </p>
                      {missionInsight && (
                          <div className="mt-4 p-4 bg-white/5 rounded-lg border border-vedha-purple/20">
                              <p className="text-xs text-vedha-purple italic flex gap-2">
                                  <span className="font-bold">AI Insight:</span> "{missionInsight}"
                              </p>
                          </div>
                      )}
                  </div>
              </div>
          </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-[#02050c]">
          <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Leadership</h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">Guided by visionaries with deep expertise in AI, Public Policy, and Software Engineering.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {teamMembers.map((member, index) => (
                      <div 
                        key={member.id} 
                        className={`group relative h-[420px] rounded-2xl overflow-hidden cursor-pointer border border-transparent transition-all duration-500 ${
                            index % 2 === 0 
                                ? 'hover:border-vedha-blue hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]' 
                                : 'hover:border-vedha-purple hover:shadow-[0_0_30px_rgba(217,70,239,0.3)]'
                        }`}
                        onMouseEnter={() => handleTeamHover(member)}
                      >
                          <img 
                            src={member.imageUrl} 
                            alt={member.name} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0" 
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent opacity-90"></div>
                          
                          <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                              <div className={`inline-block px-2 py-0.5 mb-2 rounded text-xs font-bold uppercase tracking-wider border opacity-0 group-hover:opacity-100 transition-opacity ${
                                index % 2 === 0 
                                    ? 'bg-vedha-blue/20 text-vedha-blue border-vedha-blue/30' 
                                    : 'bg-vedha-purple/20 text-vedha-purple border-vedha-purple/30'
                              }`}>
                                Leadership
                              </div>
                              <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
                              <p className={`font-medium mb-3 ${index % 2 === 0 ? 'text-vedha-blue' : 'text-vedha-purple'}`}>{member.role}</p>
                              
                              <div className="max-h-0 opacity-0 group-hover:max-h-[200px] group-hover:opacity-100 overflow-hidden transition-all duration-700 ease-in-out">
                                  <div className="pt-3 border-t border-white/20">
                                    <p className="text-sm text-gray-200 leading-relaxed font-light transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 animate-fade-in-up">
                                        {bioContent[member.id] || (
                                          <span className="flex items-center gap-2 text-gray-400">
                                            <Loader2 className="animate-spin w-3 h-3" /> AI generating bio...
                                          </span>
                                        )}
                                    </p>
                                  </div>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* CSR & Impact */}
      <section className="py-20 border-t border-white/5 bg-[#030712]">
          <div className="max-w-7xl mx-auto px-4">
              <div className="glass-panel rounded-3xl p-12 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-vedha-purple/10 rounded-full blur-[100px] pointer-events-none"></div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                      <div>
                          <h2 className="text-3xl font-display font-bold text-white mb-6">Social Impact & CSR</h2>
                          <p className="text-gray-400 mb-8 leading-relaxed">
                              We believe technology is a force for good. Our initiatives span digital literacy camps, open-source tools for NGOs, and pro-bono consulting for public health data systems.
                          </p>
                          <div className="grid grid-cols-3 gap-6">
                              {[
                                  { label: 'Lives Impacted', val: '1M+' },
                                  { label: 'NGOs Supported', val: '50+' },
                                  { label: 'Pro-bono Hours', val: '500+' },
                              ].map((stat, i) => (
                                  <div key={i}>
                                      <div className="text-2xl font-bold text-vedha-purple mb-1">{stat.val}</div>
                                      <div className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</div>
                                  </div>
                              ))}
                          </div>
                      </div>
                      <div className="relative h-64 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden hover:border-vedha-blue/30 transition-colors">
                          {/* Map Visualization Placeholder */}
                          <div className="absolute inset-0 bg-[#020617]">
                              <div className="w-full h-full opacity-30" style={{backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
                          </div>
                          <div className="relative z-10 text-center">
                              <Globe className="w-12 h-12 text-vedha-blue mx-auto mb-2 animate-pulse" />
                              <span className="text-white font-display text-sm">Pan-India Presence</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* Testimonials Section with Logo Marquee */}
      <section className="py-24 bg-[#02050c] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Client Success Stories</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-vedha-blue to-vedha-purple mx-auto rounded-full"></div>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory space-x-6 pb-8 -mx-4 px-4 custom-scrollbar">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="snap-center shrink-0 w-[90vw] md:w-[400px] glass-panel p-8 rounded-2xl border border-white/10 hover:border-vedha-purple/40 transition-all duration-300 relative group">
                        <div className="absolute -top-4 -right-4 w-12 h-12 bg-vedha-blue/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                            <MessageSquareQuote className="w-6 h-6 text-vedha-blue" />
                        </div>
                        
                        <div className="mb-6">
                            <h4 className="text-xl font-bold text-white">{testimonial.company}</h4>
                            <p className="text-sm text-gray-400">{testimonial.clientName}</p>
                            <div className="flex gap-1 mt-2">
                                {[1,2,3,4,5].map(star => <Star key={star} size={12} className="fill-vedha-purple text-vedha-purple" />)}
                            </div>
                        </div>

                        <p className="text-gray-300 italic mb-6 leading-relaxed">"{testimonial.text}"</p>

                        <div className="pt-4 border-t border-white/10">
                             <div className="flex items-start gap-2">
                                <Activity className="w-4 h-4 text-vedha-blue mt-0.5" />
                                <div>
                                    <span className="text-xs text-gray-500 uppercase tracking-wider block">AI Generated Impact Summary</span>
                                    {testimonialSummaries[testimonial.id] ? (
                                        <p className="text-vedha-blue font-semibold text-sm animate-fade-in">{testimonialSummaries[testimonial.id]}</p>
                                    ) : (
                                        <div className="h-4 w-32 bg-white/10 rounded animate-pulse mt-1"></div>
                                    )}
                                </div>
                             </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Infinite Logo Marquee */}
            <div className="mt-20 pt-10 border-t border-white/5 relative w-full">
                {/* Gradient Masks */}
                <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-[#02050c] to-transparent z-10 pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-[#02050c] to-transparent z-10 pointer-events-none"></div>
                
                <p className="text-center text-xs font-semibold text-gray-500 uppercase tracking-[0.2em] mb-10">Trusted By Industry Leaders</p>

                <div className="flex w-full overflow-hidden group">
                    <div className="flex gap-16 animate-scroll whitespace-nowrap hover:[animation-play-state:paused] py-4">
                        {/* Tripling the list to ensure smooth seamless loop on wider screens */}
                        {[...clientLogos, ...clientLogos, ...clientLogos].map((logo, i) => (
                            <div key={i} className="flex-shrink-0 flex items-center justify-center">
                                <span className="text-2xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-gray-500 to-gray-700 hover:from-vedha-blue hover:to-vedha-purple transition-all duration-300 uppercase tracking-widest cursor-default transform hover:scale-110">
                                    {logo}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CTA Section (Original static CTA, kept for layout balance) */}
      <section className="py-24 text-center pb-32">
          <h2 className="text-4xl font-display font-bold text-white mb-6">Ready to innovate with us?</h2>
          <Link to="/contact" className="inline-block px-10 py-4 bg-white text-[#030712] font-bold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Partner With Vedha
          </Link>
      </section>
    </div>
  );
};

export default About;