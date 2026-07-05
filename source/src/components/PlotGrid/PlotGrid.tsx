'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { PlotGridProps } from './PlotGrid.types';
import { PlotCard } from '../PlotCard/PlotCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const PlotGrid: React.FC<PlotGridProps> = ({
  plots,
  expanded = false,
  className = '',
}) => {
  if (plots.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-surface-cream border border-border-subtle max-w-xl mx-auto rounded-sm">
        <svg
          className="w-12 h-12 text-brand-gold mx-auto mb-4 stroke-1.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="font-display font-bold text-brand-navy text-lg uppercase tracking-wider mb-2">
          No Plots Found
        </h3>
        <p className="text-xs text-text-muted font-body leading-relaxed max-w-sm mx-auto">
          No properties match your filter preferences. Please reset your search choices or contact our relationship desk for offline listings.
        </p>
      </div>
    );
  }

  if (expanded) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className={`flex flex-col gap-8 ${className}`}
      >
        {plots.map((plot, i) => (
          <motion.div key={i} variants={cardVariants}>
            <PlotCard {...plot} expanded={true} />
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {plots.map((plot, i) => (
        <motion.div key={i} variants={cardVariants}>
          <PlotCard {...plot} expanded={false} />
        </motion.div>
      ))}
    </motion.div>
  );
};
