'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeaderProps } from './SectionHeader.types';

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  subtitle,
  darkBg = false,
  className = '',
}) => {
  const prefersReduced = useReducedMotion();

  const fadeUp = {
    hidden: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 14 },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  const ruleVariant = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.55,
        delay: 0.1,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.div
      className={`max-w-3xl mx-auto text-center mb-14 md:mb-18 ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {eyebrow && (
        <motion.div
          variants={fadeUp}
          custom={0}
          className="flex items-center justify-center gap-3 mb-3"
        >
          {/* Diamond accent */}
          <span className="gold-dot-diamond opacity-70" />
          <span className="text-[10px] md:text-[11px] font-body font-bold uppercase tracking-[0.3em] text-brand-gold">
            {eyebrow}
          </span>
          <span className="gold-dot-diamond opacity-70" />
        </motion.div>
      )}

      {/* Animated gold rule — grows from center */}
      {eyebrow && (
        <div className="flex justify-center mb-4">
          <motion.span
            variants={ruleVariant}
            className="block h-[2px] w-12 origin-left bg-gradient-to-r from-brand-gold via-brand-gold-light to-transparent rounded-full"
          />
        </div>
      )}

      <motion.h2
        variants={fadeUp}
        custom={0.15}
        className={`text-3xl sm:text-4xl md:text-5xl font-display font-bold leading-tight tracking-tight ${
          darkBg ? 'text-white' : 'text-brand-navy'
        }`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          variants={fadeUp}
          custom={0.25}
          className={`mt-5 text-sm md:text-base font-body leading-relaxed max-w-2xl mx-auto ${
            darkBg ? 'text-gray-300' : 'text-text-muted'
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
};
