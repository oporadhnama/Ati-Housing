'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AboutCollageProps } from './AboutCollage.types';

export const AboutCollage: React.FC<AboutCollageProps> = ({ className = '' }) => {
  const images = [
    {
      src: '/images/about/about-1-middle.webp',
      alt: 'ATI Housing Core Infrastructure',
      className: 'absolute top-[15%] left-[23%] w-[54%] h-[70%] z-20 shadow-2xl border-4 border-white',
      hoverScale: 1.03,
    },
    {
      src: '/images/about/about-1-left-1.webp',
      alt: 'ATI Model Town Site Preparation',
      className: 'absolute top-[5%] left-[0%] w-[33%] h-[38%] z-10 shadow-lg border-2 border-white',
      hoverScale: 1.05,
    },
    {
      src: '/images/about/about-1-left-2.webp',
      alt: 'ATI Model Town Roads Construction',
      className: 'absolute bottom-[5%] left-[3%] w-[33%] h-[38%] z-30 shadow-lg border-2 border-white',
      hoverScale: 1.05,
    },
    {
      src: '/images/about/about-1-right-1.webp',
      alt: 'ATI Society Green Spaces',
      className: 'absolute top-[0%] right-[0%] w-[33%] h-[38%] z-10 shadow-lg border-2 border-white',
      hoverScale: 1.05,
    },
    {
      src: '/images/about/about-1-right-2.webp',
      alt: 'ATI Model Town Completed Facilities',
      className: 'absolute bottom-[10%] right-[3%] w-[33%] h-[38%] z-30 shadow-lg border-2 border-white',
      hoverScale: 1.05,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.div
      className={`relative min-h-[400px] sm:min-h-[500px] md:min-h-[550px] w-full ${className}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {images.map((img, index) => (
        <motion.div
          key={index}
          className={`${img.className} overflow-hidden bg-gray-100 group transition-shadow duration-300 hover:shadow-2xl`}
          variants={itemVariants}
          whileHover={{ scale: img.hoverScale, zIndex: 40 }}
        >
          <div className="relative w-full h-full">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={index === 0}
            />
            {/* Subtle premium dark gradient overlay on hover */}
            <div className="absolute inset-0 bg-brand-navy opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
