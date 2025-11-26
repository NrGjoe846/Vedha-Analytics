"use client";

import React, { forwardRef, useImperativeHandle, useMemo } from "react";
import { motion, AnimatePresence, Transition } from "framer-motion";
import { cn } from "../../lib/utils";

export interface RotatingTextProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  texts: string[];
  transition?: Transition;
  initial?: any;
  animate?: any;
  exit?: any;
  animatePresenceMode?: "sync" | "wait" | "popLayout";
  staggerDuration?: number;
  rotationInterval?: number;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
  staggerFrom?: "first" | "last" | "center" | number | "random";
}

export interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      staggerDuration = 0,
      rotationInterval = 2000,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      staggerFrom = "first",
      ...props
    },
    ref
  ) => {
    const [index, setIndex] = React.useState(0);

    useImperativeHandle(ref, () => ({
      next: () => setIndex((prev) => (prev + 1) % texts.length),
      previous: () =>
        setIndex((prev) => (prev - 1 + texts.length) % texts.length),
      jumpTo: (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        setIndex(validIndex);
      },
      reset: () => setIndex(0),
    }));

    React.useEffect(() => {
      if (!rotationInterval) return;
      const intervalId = setInterval(() => {
        setIndex((prev) => (prev + 1) % texts.length);
      }, rotationInterval);
      return () => clearInterval(intervalId);
    }, [rotationInterval, texts.length]);

    const elements = useMemo(() => {
      const currentText = texts[index];
      // Treat the whole string as one block for rotation if we aren't splitting by word
      // For this specific UI requirement (rotating full phrases like "Technology", "AI Solutions"),
      // we usually want to animate the whole word/phrase.
      // However, the component supports splitting. Let's wrap the text in a motion span.
      
      return (
        <motion.span
          className={cn("inline-block whitespace-nowrap", elementLevelClassName)}
          initial={initial}
          animate={animate}
          exit={exit}
          transition={transition}
        >
          {currentText}
        </motion.span>
      );
    }, [
      index,
      texts,
      initial,
      animate,
      exit,
      transition,
      elementLevelClassName,
    ]);

    return (
      <motion.span
        className={cn(
          "flex flex-wrap whitespace-pre-wrap relative overflow-hidden",
          mainClassName
        )}
        {...props as any}
      >
        <AnimatePresence mode={animatePresenceMode} initial={false}>
          <motion.div
            key={index}
            className={cn(
              "flex flex-wrap whitespace-pre-wrap relative",
              splitLevelClassName
            )}
          >
            {elements}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    );
  }
);

RotatingText.displayName = "RotatingText";
export default RotatingText;