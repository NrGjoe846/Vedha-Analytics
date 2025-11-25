import React, { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

interface CounterProps {
  value: number;
  suffix?: string;
  label: string;
}

export const ImpactCounter: React.FC<CounterProps> = ({ value, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const incrementTime = 20;
      const step = end / (duration / incrementTime);

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center p-6 glass-panel rounded-2xl border border-white/5 hover:border-vedha-blue/30 transition-all group">
      <div className="text-4xl md:text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 group-hover:from-vedha-blue group-hover:to-vedha-purple transition-all mb-2">
        {count}{suffix}
      </div>
      <div className="text-sm text-gray-500 uppercase tracking-widest font-semibold">{label}</div>
    </div>
  );
};
