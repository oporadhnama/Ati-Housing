'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** 'up' slides from below (default), 'fade' is pure opacity only */
  variant?: 'up' | 'fade';
}

/**
 * RevealOnScroll — Universal scroll-triggered entrance wrapper.
 *
 * Wraps any section or element. When it enters the viewport, the content
 * fades in and optionally slides up. Uses Framer Motion's whileInView
 * with once:true so it only plays once per page load (no re-trigger on scroll up).
 *
 * Fully respects prefers-reduced-motion: animations are disabled for users
 * who have requested reduced motion in their OS settings.
 */
export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  delay = 0,
  className = '',
  variant = 'up',
}) => {
  const prefersReduced = useReducedMotion();

  const variants = {
    hidden: {
      opacity: prefersReduced ? 1 : 0,
      y: prefersReduced ? 0 : variant === 'up' ? 18 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReduced ? 0 : 0.65,
        delay: prefersReduced ? 0 : delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
