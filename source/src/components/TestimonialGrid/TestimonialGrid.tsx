'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TestimonialGridProps } from './TestimonialGrid.types';
import { TestimonialCard } from '../TestimonialCard/TestimonialCard';

export const TestimonialGrid: React.FC<TestimonialGridProps> = ({
  testimonials,
  className = '',
}) => {
  const prefersReduced = useReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReduced ? 0 : 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: prefersReduced ? 1 : 0,
      y: prefersReduced ? 0 : 24,
      filter: prefersReduced ? 'none' : 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {testimonials.map((testimonial, i) => (
        <motion.div key={i} variants={cardVariants}>
          <TestimonialCard {...testimonial} />
        </motion.div>
      ))}
    </motion.div>
  );
};
