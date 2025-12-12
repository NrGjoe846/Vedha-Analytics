import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

const MotionDiv = motion.div as any;

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'frosted' | 'premium' | 'neon';
  hover?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'default',
  hover = true,
  glow = false,
  children,
  className,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-white/[0.02] backdrop-blur-md border-white/10',
    frosted: 'bg-white/[0.05] backdrop-blur-xl border-white/20 shadow-2xl',
    premium: 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-2xl border-white/30',
    neon: 'bg-black/40 backdrop-blur-xl border-vedha-blue/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]',
  };

  const hoverStyles = hover
    ? 'hover:bg-white/[0.08] hover:border-vedha-red/30 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] hover:-translate-y-1'
    : '';

  const glowStyles = glow
    ? 'shadow-[0_0_40px_rgba(59,130,246,0.2),0_0_80px_rgba(239,68,68,0.1)]'
    : '';

  return (
    <MotionDiv
      className={cn(
        'border rounded-2xl transition-all duration-500',
        variantStyles[variant],
        hoverStyles,
        glowStyles,
        className
      )}
      whileHover={hover ? { scale: 1.02 } : {}}
      {...props}
    >
      {children}
    </MotionDiv>
  );
};

export const GlassPanel: React.FC<GlassCardProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white/[0.02] backdrop-blur-lg border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:bg-white/[0.05] hover:border-white/20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export const GlassButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
}> = ({
  variant = 'primary',
  size = 'md',
  glow = false,
  children,
  className,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-gradient-to-r from-vedha-blue/80 to-vedha-red/80 hover:from-vedha-blue hover:to-vedha-red text-white border-transparent',
    secondary: 'bg-white/10 hover:bg-white/20 text-white border-white/20',
    ghost: 'bg-transparent hover:bg-white/10 text-gray-300 hover:text-white border-white/10',
  };

  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const glowStyles = glow
    ? 'shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.4)]'
    : '';

  return (
    <motion.button
      className={cn(
        'relative backdrop-blur-md border rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-vedha-blue focus:ring-offset-2 focus:ring-offset-[#030712]',
        variantStyles[variant],
        sizeStyles[size],
        glowStyles,
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export const GlassInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  return (
    <input
      className={cn(
        'w-full bg-black/40 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-vedha-blue focus:ring-2 focus:ring-vedha-blue/20 transition-all',
        className
      )}
      {...props}
    />
  );
};
