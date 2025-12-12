import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { cn } from '../../lib/utils';

const MotionDiv = motion.div as any;

interface AnimatedStatProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: number;
  icon?: React.ReactNode;
  color?: 'blue' | 'red' | 'green' | 'purple';
  className?: string;
}

export const AnimatedStat: React.FC<AnimatedStatProps> = ({
  value,
  label,
  suffix = '',
  prefix = '',
  trend,
  trendValue,
  icon,
  color = 'blue',
  className,
}) => {
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

  const colorStyles = {
    blue: 'from-vedha-blue/20 to-vedha-blue/5 border-vedha-blue/30 text-vedha-blue',
    red: 'from-vedha-red/20 to-vedha-red/5 border-vedha-red/30 text-vedha-red',
    green: 'from-green-500/20 to-green-500/5 border-green-500/30 text-green-500',
    purple: 'from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-500',
  };

  const trendIcons = {
    up: <TrendingUp className="w-4 h-4 text-green-500" />,
    down: <TrendingDown className="w-4 h-4 text-red-500" />,
    neutral: <Activity className="w-4 h-4 text-gray-500" />,
  };

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className={cn(
        'relative p-6 rounded-2xl border backdrop-blur-md bg-gradient-to-br overflow-hidden group hover:-translate-y-1 transition-transform duration-300',
        colorStyles[color],
        className
      )}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">
        {icon && (
          <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit">
            {icon}
          </div>
        )}

        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold font-display text-white">
            {prefix}{count.toLocaleString()}{suffix}
          </span>
          {trend && trendValue !== undefined && (
            <span className="flex items-center gap-1 text-sm">
              {trendIcons[trend]}
              <span className={trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : 'text-gray-500'}>
                {trendValue}%
              </span>
            </span>
          )}
        </div>

        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">
          {label}
        </p>
      </div>
    </MotionDiv>
  );
};

interface StatsGridProps {
  stats: Array<AnimatedStatProps>;
  columns?: 2 | 3 | 4;
  className?: string;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  stats,
  columns = 4,
  className,
}) => {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={cn(`grid ${gridCols[columns]} gap-6`, className)}>
      {stats.map((stat, index) => (
        <AnimatedStat key={index} {...stat} />
      ))}
    </div>
  );
};

export const CircularProgress: React.FC<{
  value: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  color?: string;
}> = ({
  value,
  size = 120,
  strokeWidth = 8,
  label,
  color = '#3b82f6',
}) => {
  const [progress, setProgress] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

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
          setProgress(end);
          clearInterval(timer);
        } else {
          setProgress(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-white">{Math.round(progress)}%</span>
        {label && <span className="text-xs text-gray-400 mt-1">{label}</span>}
      </div>
    </div>
  );
};
