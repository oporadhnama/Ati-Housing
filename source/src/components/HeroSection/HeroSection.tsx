'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { HeroSectionProps } from './HeroSection.types';
import { Button } from '../Button/Button';

/* ── Ambient particle data (static so no hydration mismatch) ── */
const PARTICLES = [
  { id: 1,  x: '8%',   y: '20%', size: 2.5, dur: 8,  delay: 0 },
  { id: 2,  x: '18%',  y: '65%', size: 1.5, dur: 11, delay: 1.2 },
  { id: 3,  x: '28%',  y: '35%', size: 2,   dur: 9,  delay: 0.5 },
  { id: 4,  x: '38%',  y: '80%', size: 1,   dur: 13, delay: 2.1 },
  { id: 5,  x: '52%',  y: '15%', size: 2,   dur: 7,  delay: 0.8 },
  { id: 6,  x: '62%',  y: '55%', size: 1.5, dur: 10, delay: 1.7 },
  { id: 7,  x: '72%',  y: '30%', size: 3,   dur: 12, delay: 0.3 },
  { id: 8,  x: '82%',  y: '70%', size: 1.5, dur: 8,  delay: 2.5 },
  { id: 9,  x: '90%',  y: '45%', size: 2,   dur: 9,  delay: 1.0 },
  { id: 10, x: '45%',  y: '88%', size: 1,   dur: 14, delay: 0.6 },
  { id: 11, x: '5%',   y: '50%', size: 2,   dur: 10, delay: 3.0 },
  { id: 12, x: '95%',  y: '20%', size: 1.5, dur: 7,  delay: 1.5 },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  heading,
  subheading,
  ctas,
  backgroundImage,
  slides = [],
  stats = [],
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const bgImages = React.useMemo(() => {
    return Array.isArray(backgroundImage) ? backgroundImage : [backgroundImage];
  }, [backgroundImage]);

  const [bgIndex, setBgIndex] = React.useState(0);
  const [isAutoplay, setIsAutoplay] = React.useState(true);
  const [slideProgress, setSlideProgress] = React.useState(0);
  const SLIDE_DURATION = 6000; // ms

  /* ── Slide auto-advance + progress bar ── */
  React.useEffect(() => {
    if (!isAutoplay || bgImages.length <= 1 || prefersReducedMotion) return;

    setSlideProgress(0);
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      setSlideProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
    };

    const rafInterval = setInterval(tick, 50);

    const slideTimer = setTimeout(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, SLIDE_DURATION);

    return () => {
      clearInterval(rafInterval);
      clearTimeout(slideTimer);
    };
  }, [bgImages, isAutoplay, bgIndex, prefersReducedMotion]);

  /* ── Parallax mouse effect ── */
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const sectionRef = React.useRef<HTMLElement>(null);

  const handleMouseMove = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18; // ±9px
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10; // ±5px
    setMousePos({ x, y });
  }, [prefersReducedMotion]);

  const handleMouseLeave = React.useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  // Current slide text — falls back to static heading/subheading
  const currentSlide = slides[bgIndex] ?? { headline: heading, subheadline: subheading };

  // Transition configs
  const textTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const };

  const bgTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 1.6, ease: 'easeInOut' as const };

  const containerVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
  };

  const handleDotClick = (index: number) => {
    setIsAutoplay(false);
    setBgIndex(index);
    setSlideProgress(0);
    setTimeout(() => setIsAutoplay(true), 12000);
  };

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-[100svh] flex items-center bg-brand-navy text-white overflow-hidden ${className}`}
      aria-label="Hero section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ─── Ambient Particles ─── */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
          {PARTICLES.map((p) => (
            <span
              key={p.id}
              className="hero-particle"
              style={{
                left: p.x,
                top: p.y,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animationDuration: `${p.dur}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* ─── Background Slideshow with Ken Burns + Parallax ─── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={`bg-${bgIndex}`}
            initial={prefersReducedMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={prefersReducedMotion ? {} : { opacity: 0 }}
            transition={bgTransition}
            className="absolute inset-0 w-full h-full"
          >
            {/* Ken Burns Scale + Parallax offset */}
            <motion.div
              className="absolute inset-[-20px]"  /* extra padding so parallax doesn't show edges */
              initial={prefersReducedMotion ? {} : { scale: 1.08 }}
              animate={{
                scale: 1,
                x: mousePos.x,
                y: mousePos.y,
              }}
              transition={{
                scale: { duration: 7, ease: 'easeOut' },
                x: { duration: 0.8, ease: 'easeOut' },
                y: { duration: 0.8, ease: 'easeOut' },
              }}
            >
              <Image
                src={bgImages[bgIndex]}
                alt={`Ati Model Town — Slide ${bgIndex + 1}`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic multi-layer gradient */}
        <div className="absolute inset-0 hero-overlay-gradient z-10 pointer-events-none" />
        {/* Extra side vignette */}
        <div
          className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_20%,_rgba(25,43,69,0.7)_100%)] md:bg-[radial-gradient(ellipse_at_70%_50%,_transparent_40%,_rgba(25,43,69,0.55)_100%)]"
        />
      </div>

      {/* ─── Content Area ─── */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 pt-24 pb-16 md:pt-36 md:pb-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Estd Badge with pulsing ring */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-7">
            <span className="relative inline-flex items-center gap-2 text-[10px] font-body font-bold uppercase tracking-[0.3em] text-brand-gold border border-brand-gold/30 bg-brand-gold/8 px-4 py-2 rounded-sm backdrop-blur-sm">
              {/* Pulse ring */}
              <span className="absolute inset-0 rounded-sm border border-brand-gold/40 animate-ping opacity-30 pointer-events-none" />
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              ATI SOCIETY · ESTD 2010
            </span>
          </motion.div>

          {/* ─── Per-Slide Animated Text ─── */}
          <AnimatePresence mode="wait">
            <motion.div key={`text-${bgIndex}`} className="mb-8">
              {/* Main Headline */}
              <motion.h1
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 28, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: -18, filter: 'blur(6px)' }}
                transition={textTransition}
                className="text-3xl sm:text-4xl md:text-[4.25rem] xl:text-[5rem] font-display font-bold leading-[1.04] tracking-tight text-white mb-5"
              >
                {currentSlide.headline}
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? {} : { opacity: 0, y: -12 }}
                transition={{ ...textTransition, delay: 0.08 }}
                className="text-base sm:text-lg md:text-xl font-body text-white/75 max-w-2xl leading-relaxed text-balance"
              >
                {currentSlide.subheadline}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Row */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-14">
            {ctas.map((cta, index) => (
              <Button
                key={index}
                variant={cta.variant}
                href={cta.href}
                size="lg"
                className={
                  cta.variant === 'ghost'
                    ? 'text-white hover:bg-white/10 border border-white/30 backdrop-blur-sm'
                    : 'shadow-xl shadow-brand-gold/20 btn-shimmer'
                }
              >
                {cta.label}
              </Button>
            ))}
          </motion.div>

          {/* Hero Stats Row */}
          {stats.length > 0 && (
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10 max-w-3xl"
            >
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-display font-bold text-brand-gold drop-shadow-sm">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-body text-white/50 uppercase tracking-widest mt-1.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* ─── Slide Progress Bar (bottom center) ─── */}
        {bgImages.length > 1 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30">
            {/* Progress bar track */}
            <div className="flex items-center gap-3 mb-3 justify-center">
              {bgImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === bgIndex ? 'true' : 'false'}
                  className="focus-visible:outline-brand-gold focus:outline-none"
                >
                  <span
                    className={`block rounded-full transition-all duration-500 ${
                      i === bgIndex
                        ? 'w-8 h-2 bg-brand-gold shadow-lg shadow-brand-gold/40'
                        : 'w-2 h-2 bg-white/30 hover:bg-white/60'
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Thin progress bar under dots */}
            {!prefersReducedMotion && (
              <div className="w-32 h-[2px] bg-white/10 rounded-full mx-auto overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand-gold to-brand-gold-light rounded-full transition-none"
                  style={{ width: `${slideProgress}%` }}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom fade-to-page */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0b1420] to-transparent z-25 pointer-events-none" />
    </section>
  );
};
