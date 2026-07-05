'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AmenityGridProps } from './AmenityGrid.types';
import { AmenityItem } from '../AmenityItem/AmenityItem';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export const AmenityGrid: React.FC<AmenityGridProps> = ({
  amenities,
  expanded = false,
  className = '',
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ${className}`}
    >
      {amenities.map((amenity, i) => (
        <motion.div key={i} variants={itemVariants}>
          <AmenityItem {...amenity} expanded={expanded} />
        </motion.div>
      ))}
    </motion.div>
  );
};
