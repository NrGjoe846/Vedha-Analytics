import React from 'react';
import { cn } from '../../lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  animation = 'pulse',
  className,
  ...props
}) => {
  const variantClasses = {
    text: 'h-4 w-full rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%]',
    none: '',
  };

  return (
    <div
      className={cn(
        'bg-white/10',
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      role="status"
      aria-label="Loading..."
      {...props}
    />
  );
};

export const TextSkeleton: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className,
}) => {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, idx) => (
        <Skeleton
          key={idx}
          variant="text"
          className={idx === lines - 1 ? 'w-4/5' : 'w-full'}
        />
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn('glass-panel p-6 rounded-2xl border border-white/10', className)}>
      <div className="flex items-start gap-4">
        <Skeleton variant="circular" className="w-12 h-12 shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <TextSkeleton lines={2} />
        </div>
      </div>
    </div>
  );
};

export const TeamMemberSkeleton: React.FC = () => {
  return (
    <div className="h-[420px] glass-panel rounded-2xl overflow-hidden border border-white/10">
      <Skeleton className="w-full h-full" animation="wave" />
      <div className="absolute bottom-0 left-0 w-full p-6 space-y-2 bg-gradient-to-t from-[#030712] to-transparent">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
  );
};
