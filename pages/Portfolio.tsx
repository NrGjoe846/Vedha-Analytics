import React, { useState } from 'react';
import { generateProjectInsight } from '../services/gemini';
import { ProjectItem } from '../types';
import { Loader2 } from 'lucide-react';

const projects: ProjectItem[] = [
  {
    id: '1',
    title: 'Smart City Traffic Control',
    category: 'Government',
    summary: 'Centralized AI dashboard for managing traffic signals across 500 intersections.',
    impact: 'Reduced congestion by 30%',
    imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    title: 'Agri-Tech Crop Prediction',
    category: 'AI',
    summary: 'Machine learning model predicting crop yields based on satellite weather data.',
    impact: 'Aided 10,000+ farmers',
    imageUrl: 'https://images.unsplash.com/photo-1625246333195-f8196ba02926?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '3',
    title: 'Secure Health Record System',
    category: 'Software',
    summary: 'Blockchain-enabled electronic health record system for a state government.',
    impact: '100% data integrity',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '4',
    title: 'Municipal Tax Portal',
    category: 'Web',
    summary: 'High-traffic portal for property tax payments and civic services.',
    impact: '$50M processed annually',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800'
  }
];

const Portfolio: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [aiInsights, setAiInsights] = useState<Record<string, string>>({});
  const [loadingInsight, setLoadingInsight] = useState<string | null>(null);

  const filters = ['All', 'Government', 'AI', 'Software', 'Web'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const handleGenerateInsight = async (project: ProjectItem) => {
    if (aiInsights[project.id]) return;
    
    setLoadingInsight(project.id);
    const insight = await generateProjectInsight(project.title, project.category);
    setAiInsights(prev => ({ ...prev, [project.id]: insight }));
    setLoadingInsight(null);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-[#030712]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Featured Projects</h1>
          <p className="text-gray-400 mb-8">Showcasing our impact across industries and sectors.</p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeFilter === filter
                    ? 'bg-vedha-blue text-white shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group relative rounded-xl overflow-hidden glass-panel border border-white/10 hover:border-vedha-purple/50 transition-all duration-500">
              {/* Image */}
              <div className="h-72 overflow-hidden relative">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent opacity-90"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded border border-white/10 text-xs font-bold text-vedha-blue uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 relative -mt-10">
                <h3 className="text-2xl font-bold font-display text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-6 font-light">{project.summary}</p>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-4">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wider block mb-1">Impact</span>
                    <p className="text-vedha-purple font-semibold">{project.impact}</p>
                  </div>
                  
                  {/* AI Interaction */}
                  <div className="text-right">
                    {!aiInsights[project.id] && !loadingInsight && (
                      <button 
                        onClick={() => handleGenerateInsight(project)}
                        className="text-xs flex items-center gap-2 text-white hover:text-vedha-blue transition-colors px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-vedha-blue animate-pulse"></span>
                        Generate AI Insight
                      </button>
                    )}
                    {loadingInsight === project.id && (
                      <span className="text-xs text-gray-500 flex items-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin" /> Analyzing...
                      </span>
                    )}
                  </div>
                </div>

                {/* AI Generated Insight Box */}
                {aiInsights[project.id] && (
                  <div className="mt-4 p-4 bg-gradient-to-r from-vedha-blue/10 to-transparent border-l-2 border-vedha-blue rounded-r-lg animate-fade-in">
                    <p className="text-xs text-gray-300 italic">
                      " {aiInsights[project.id]} "
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;