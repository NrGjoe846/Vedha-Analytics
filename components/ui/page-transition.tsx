import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const MotionDiv = motion.div as any;

interface PageTransitionProps {
  children: React.ReactNode;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  return (
    <MotionDiv
      key={location.pathname}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{
        duration: 0.4,
        ease: 'easeInOut',
      }}
    >
      {children}
    </MotionDiv>
  );
};

export const FadeTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  return (
    <MotionDiv
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </MotionDiv>
  );
};

export const SlideTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  return (
    <MotionDiv
      key={location.pathname}
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
      }}
    >
      {children}
    </MotionDiv>
  );
};

export const ScaleTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const location = useLocation();

  return (
    <MotionDiv
      key={location.pathname}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.1, opacity: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
    >
      {children}
    </MotionDiv>
  );
};
