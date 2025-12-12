import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { cn } from '../../lib/utils';

interface VideoBackgroundProps {
  videoUrl?: string;
  poster?: string;
  overlay?: 'dark' | 'gradient' | 'none';
  overlayOpacity?: number;
  children?: React.ReactNode;
  className?: string;
  controls?: boolean;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99790-large.mp4',
  poster,
  overlay = 'gradient',
  overlayOpacity = 0.7,
  children,
  className,
  controls = false,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const overlayStyles = {
    dark: `bg-black/[${overlayOpacity}]`,
    gradient: 'bg-gradient-to-b from-[#030712]/90 via-[#030712]/70 to-[#030712]',
    none: '',
  };

  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted={isMuted}
        playsInline
        poster={poster}
      >
        <source src={videoUrl} type="video/mp4" />
      </video>

      <div className={cn('absolute inset-0', overlayStyles[overlay])} />

      {controls && (
        <div className="absolute bottom-8 right-8 flex gap-3 z-10">
          <button
            onClick={togglePlay}
            className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={toggleMute}
            className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full hover:bg-white/20 transition-all"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      )}

      {children && (
        <div className="relative z-10 h-full">
          {children}
        </div>
      )}
    </div>
  );
};

export const AnimatedGradientBackground: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <div className={cn('relative w-full h-full overflow-hidden', className)}>
      <div className="absolute inset-0 bg-[#030712]">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-vedha-blue/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-vedha-red/15 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s', animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: '4s', animationDuration: '10s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      {children && (
        <div className="relative z-10 h-full">
          {children}
        </div>
      )}
    </div>
  );
};
