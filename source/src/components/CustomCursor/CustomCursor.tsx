'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring physics for outer ring
  const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 300, mass: 0.5 });
  const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 300, mass: 0.5 });

  // Spring physics for inner dot (faster)
  const dotXSpring = useSpring(cursorX, { damping: 30, stiffness: 700, mass: 0.1 });
  const dotYSpring = useSpring(cursorY, { damping: 30, stiffness: 700, mass: 0.1 });

  useEffect(() => {
    // Check if device is a touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
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
  }, [isVisible, cursorX, cursorY]);

  if (typeof window === 'undefined' || isTouchDevice) return null;

  return (
    <>
      {/* Outer Circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{ 
          x: cursorXSpring, 
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.5 : 1,
          backgroundColor: isHovering ? 'rgba(184, 151, 90, 0.1)' : 'transparent',
          border: isHovering ? '1px solid rgba(184, 151, 90, 0.4)' : '1px solid rgba(184, 151, 90, 0.8)'
        }}
        transition={{ type: 'spring', mass: 0.5, stiffness: 150, damping: 20 }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-gold pointer-events-none z-[10000] hidden md:block"
        style={{ 
          x: dotXSpring, 
          y: dotYSpring,
          translateX: '-50%',
          translateY: '-50%'
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 0 : 1
        }}
        transition={{ type: 'spring', mass: 0.1, stiffness: 300, damping: 20 }}
      />
    </>
  );
};
