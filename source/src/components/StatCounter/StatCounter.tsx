'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { StatCounterProps } from './StatCounter.types';

export const StatCounter: React.FC<StatCounterProps> = ({
  value,
  suffix = '',
  label,
  className = '',
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();
  const [count, setCount] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setCount(value);
      setFinished(true);
      return;
    }

    if (!isInView) return;

    const startDelay = setTimeout(() => {
      let startTime: number | null = null;
      const duration = 1600;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);

        // Ease out cubic
        const easeProgress = 1 - Math.pow(1 - percentage, 3);
        setCount(Math.floor(easeProgress * value));

        if (percentage < 1) {
          requestAnimationFrame(animate);
        } else {
          setFinished(true);
        }
      };

      requestAnimationFrame(animate);
    }, delay * 1000);

    return () => clearTimeout(startDelay);
  }, [isInView, value, prefersReducedMotion, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`flex flex-col text-center md:text-left ${className}`}
    >
      {/* Number with shimmer-finish effect */}
      <span
        className={`stat-glow text-3xl md:text-5xl font-display font-bold text-brand-gold tracking-tight leading-none transition-all duration-300 ${
          finished ? 'stat-finished' : ''
        }`}
      >
        {count.toLocaleString()}
        {suffix}
      </span>
      {label && (
        <span className="text-[10px] md:text-xs font-body text-gray-400 uppercase tracking-[0.18em] mt-2">
          {label}
        </span>
      )}
    </motion.div>
  );
};
