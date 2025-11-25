import React, { useState, useEffect } from 'react';
import { generateTagline, generateTeamBio, generateMissionInsight } from '../services/gemini';
import { TimelineEvent, TeamMember } from '../types';
import { Target, Lightbulb, Users, Globe, ArrowRight, Activity, Award, Briefcase } from 'lucide-react';

const timelineEvents: TimelineEvent[] = [
  { year: '2018', title: 'Foundation', description: 'Vedha Analytics was established with a vision to revolutionize Indian GovTech.' },
  { year: '2020', title: 'First Gov Project', description: 'Successfully deployed a traffic management AI for a Tier-1 Smart City.' },
  { year: '2022', title: 'AI Research Lab', description: 'Launched dedicated R&D wing for generative AI models tailored for Indic languages.' },
  { year: '2023', title: 'National Recognition', description: 'Awarded "Top GovTech Startup" by Ministry of Electronics & IT.' },
  { year: '2024', title: 'Global Expansion', description: 'Started operations in SEA region with specialized efficient-compute models.' },
];

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Arjun Mehta', role: 'CEO & Founder', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400', socials: {} },
  { id: '2', name: 'Dr. Priya Rao', role: 'Chief AI Scientist', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', socials: {} },
  { id: '3', name: 'Vikram Singh', role: 'Head of GovTech', imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400', socials: {} },
];

const About: React.FC = () => {
  const [tagline, setTagline] = useState('Innovating India Through Technology');
  const [missionInsight, setMissionInsight] = useState('');
  const [activeTeamBio, setActiveTeamBio] = useState<string | null>(null);
  const [bioContent, setBioContent] = useState<Record<string, string>>({});

  useEffect(() => {
    generateTagline().then(setTagline);
    generateMissionInsight().then(setMissionInsight);
  }, []);

  const handleTeamHover = async (member: TeamMember) => {
    setActiveTeamBio(member.id);
    if (!bioContent[member.id]) {
      const bio = await generateTeamBio(member.name, member.role);
      setBioContent(prev => ({ ...prev, [member.id]: bio }));
    }
  };

  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[#030712]">
           {/* Abstract Neon Grid Background */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
           <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-vedha-purple/10 to-transparent"></div>
           <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-vedha-blue/10 to-transparent blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="inline-block px-4 py-1 rounded-full border border-vedha-purple/30 bg-vedha-purple/10 text-vedha-purple text-xs font-bold uppercase tracking-wider animate-pulse-slow">
                    About Vedha Analytics
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight">
                    Engineering <span className="neon-gradient-text">The Future</span>
                </h1>
                <p className="text-xl text-gray-400 font-light max-w-lg">
                    "{tagline}"
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <button className="px-8 py-3 bg-vedha-blue text-white font-semibold rounded-lg hover:bg-blue-600 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                        Explore Our Vision
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

      {/* Timeline Section */}
      <section className="py-24 bg-[#02050c] relative">
          <div className="max-w-6xl mx-auto px-4">
              <div className="text-center mb-16">
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Our Journey</h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-vedha-blue to-vedha-purple mx-auto rounded-full"></div>
              </div>

              <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-vedha-blue via-vedha-purple to-transparent opacity-30"></div>

                  <div className="space-y-12">
                      {timelineEvents.map((event, index) => (
                          <div key={index} className={`flex items-center justify-between w-full ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                              <div className="w-5/12"></div>
                              <div className="z-10 bg-[#030712] border-2 border-vedha-purple rounded-full p-2 shadow-[0_0_10px_rgba(217,70,239,0.5)]">
                                  <div className="w-3 h-3 bg-white rounded-full"></div>
                              </div>
                              <div className="w-5/12 glass-panel p-6 rounded-xl border border-white/10 hover:border-vedha-blue/50 transition-all duration-300 group">
                                  <span className="text-vedha-blue font-display font-bold text-xl block mb-2">{event.year}</span>
                                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-vedha-purple transition-colors">{event.title}</h3>
                                  <p className="text-gray-400 text-sm">{event.description}</p>
                              </div>
                          </div>
                      ))}
                  </div>
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
                  {teamMembers.map((member) => (
                      <div 
                        key={member.id} 
                        className="group relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
                        onMouseEnter={() => handleTeamHover(member)}
                      >
                          <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-90"></div>
                          
                          <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-300">
                              <h3 className="text-xl font-bold text-white">{member.name}</h3>
                              <p className="text-vedha-blue font-medium mb-2">{member.role}</p>
                              
                              <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-500">
                                  <p className="text-sm text-gray-300 mt-2 border-t border-white/20 pt-2">
                                      {bioContent[member.id] || "Retrieving AI bio..."}
                                  </p>
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
                      <div className="relative h-64 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
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

      {/* CTA */}
      <section className="py-24 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-6">Ready to innovate with us?</h2>
          <button className="px-10 py-4 bg-white text-[#030712] font-bold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              Partner With Vedha
          </button>
      </section>
    </div>
  );
};

export default About;