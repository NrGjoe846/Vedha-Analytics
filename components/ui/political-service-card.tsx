import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowRight, Loader2, Info } from 'lucide-react';
import { generatePoliticalInsight } from '../../services/gemini';

const MotionDiv = motion.div as any;

interface ServiceProps {
  id: string;
  title: string;
  subServices: string[];
  icon: React.ReactNode;
}

export const PoliticalServiceCard: React.FC<ServiceProps> = ({ id, title, subServices, icon }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleExpand = async () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && !insight) {
      setLoading(true);
      const generatedInsight = await generatePoliticalInsight(title);
      setInsight(generatedInsight);
      setLoading(false);
    }
  };

  return (
    <MotionDiv 
      layout
      className={`glass-panel rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 ${isExpanded ? 'bg-white/5 border-vedha-blue/50 shadow-[0_0_30px_rgba(59,130,246,0.15)]' : 'hover:border-vedha-red/30'}`}
    >
      <div 
        onClick={handleExpand}
        className="p-6 cursor-pointer flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-xl transition-colors duration-300 ${isExpanded ? 'bg-vedha-blue/20 text-vedha-blue' : 'bg-white/5 text-gray-400 group-hover:text-white'}`}>
            {icon}
          </div>
          <h3 className={`text-lg md:text-xl font-display font-bold transition-colors ${isExpanded ? 'text-white' : 'text-gray-200'}`}>
            {title}
          </h3>
        </div>
        <MotionDiv
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className={`w-5 h-5 ${isExpanded ? 'text-vedha-blue' : 'text-gray-500'}`} />
        </MotionDiv>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <MotionDiv
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-6 pb-6 pt-0 border-t border-white/5 mx-6 mt-2">
               {/* AI Insight */}
               <div className="mb-6 mt-4 p-4 bg-gradient-to-r from-vedha-blue/10 to-transparent rounded-r-lg border-l-2 border-vedha-blue flex gap-3 items-start">
                  <Info className="w-4 h-4 text-vedha-blue shrink-0 mt-1" />
                  {loading ? (
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <Loader2 className="w-3 h-3 animate-spin" /> Analyzing strategic value...
                    </div>
                  ) : (
                    <p className="text-sm text-gray-300 italic">"{insight}"</p>
                  )}
               </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {subServices.map((sub, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors p-2 rounded hover:bg-white/5">
                    <ArrowRight className="w-3 h-3 text-vedha-red" />
                    {sub}
                  </div>
                ))}
              </div>
            </div>
          </MotionDiv>
        )}
      </AnimatePresence>
    </MotionDiv>
  );
};