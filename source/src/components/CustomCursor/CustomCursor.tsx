'use client';

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleHoverStart = () => setIsHovering(true);
    const handleHoverEnd = () => setIsHovering(false);

    window.addEventListener('mousemove', updateMousePosition);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .interactive');
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleHoverStart);
      el.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleHoverStart);
        el.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [isVisible]);

  if (typeof window === 'undefined') return null;

  const variants: Variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
      backgroundColor: 'transparent',
      border: '1px solid rgba(184, 151, 90, 0.8)',
      transition: { type: 'spring', mass: 0.5, stiffness: 150, damping: 20 }
    },
    hover: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      scale: 1.5,
      backgroundColor: 'rgba(184, 151, 90, 0.1)',
      border: '1px solid rgba(184, 151, 90, 0.4)',
      transition: { type: 'spring', mass: 0.5, stiffness: 150, damping: 20 }
    }
  };

  const dotVariants: Variants = {
    default: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 1,
      transition: { type: 'spring', mass: 0.1, stiffness: 300, damping: 20 }
    },
    hover: {
      x: mousePosition.x - 4,
      y: mousePosition.y - 4,
      scale: 0,
      transition: { type: 'spring', mass: 0.1, stiffness: 300, damping: 20 }
    }
  };

  return (
    <>
      {/* Outer Circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        variants={variants}
        animate={isHovering ? 'hover' : 'default'}
        initial="default"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-gold pointer-events-none z-[10000] hidden md:block"
        variants={dotVariants}
        animate={isHovering ? 'hover' : 'default'}
        initial="default"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
};
