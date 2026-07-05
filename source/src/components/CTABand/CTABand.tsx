'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { CTABandProps } from './CTABand.types';
import { Button } from '../Button/Button';

export const CTABand: React.FC<CTABandProps> = ({
  heading,
  subheading,
  buttonLabel,
  href,
  className = '',
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <section
      className={`relative text-white py-20 md:py-28 overflow-hidden ${className}`}
      aria-label="Call to action"
    >
      {/* ── Background Image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero/hero_bg_1_5.webp"
          alt="ATI Society community"
          fill
          className="object-cover"
        />
        {/* Dark navy overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/96 via-brand-navy/88 to-brand-navy/75" />
        {/* Bottom edge */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
        {/* Grain texture overlay */}
        <div className="absolute inset-0 cta-grain-overlay opacity-[0.035] pointer-events-none" />
      </div>

      {/* ── Diagonal shimmer decorations ── */}
      <div className="cta-diagonal-shimmer" style={{ left: '10%' }} />
      <div className="cta-diagonal-shimmer" style={{ left: '40%', animationDelay: '2s' }} />
      <div className="cta-diagonal-shimmer" style={{ left: '70%', animationDelay: '3.5s' }} />

      {/* ── Ambient gold dot particles ── */}
      {!prefersReduced && (
        <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
          {[
            { x: '12%', y: '25%', s: 2.5, d: 7 }, { x: '28%', y: '70%', s: 1.5, d: 11 },
            { x: '48%', y: '18%', s: 2,   d: 9 }, { x: '65%', y: '80%', s: 1,   d: 13 },
            { x: '80%', y: '35%', s: 2,   d: 8 }, { x: '92%', y: '60%', s: 1.5, d: 10 },
          ].map((p, i) => (
            <span
              key={i}
              className="cta-particle"
              style={{
                left: p.x, top: p.y,
                width: `${p.s}px`, height: `${p.s}px`,
                animationDuration: `${p.d}s`,
                animationDelay: `${i * 0.8}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* ── Gold corner accents ── */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-brand-gold/30 pointer-events-none z-10" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-brand-gold/30 pointer-events-none z-10" />

      {/* ── Radial glow ── */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-brand-gold/5 blur-3xl" />
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
          }}
        >
          {/* Urgency badge */}
          <motion.div
            variants={{
              hidden: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            {/* Pulsing live dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-[10px] font-body font-bold uppercase tracking-[0.3em] text-red-400">
              Limited Plots Remaining
            </span>
          </motion.div>

          {/* Eyebrow gold diamonds */}
          <motion.div
            variants={{
              hidden: { opacity: prefersReduced ? 1 : 0 },
              visible: { opacity: 1, transition: { duration: 0.4 } },
            }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <span className="gold-dot-diamond" />
            <span className="text-[10px] font-body font-bold uppercase tracking-[0.3em] text-brand-gold">
              Exclusive Opportunity
            </span>
            <span className="gold-dot-diamond" />
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={{
              hidden: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="text-2xl sm:text-3xl md:text-5xl font-display font-bold leading-tight tracking-tight mb-5"
          >
            <span className="text-brand-gold">{heading.split(' ').slice(0, 3).join(' ')}</span>{' '}
            <span>{heading.split(' ').slice(3).join(' ')}</span>
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 14 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="text-sm md:text-base font-body text-white/65 leading-relaxed mb-10 max-w-2xl mx-auto"
          >
            {subheading}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: prefersReduced ? 1 : 0, y: prefersReduced ? 0 : 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
            }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              variant="primary"
              size="lg"
              href={href}
              className="btn-shimmer shadow-xl shadow-brand-gold/20"
            >
              {buttonLabel}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              href="tel:+8801805464882"
              className="text-white hover:bg-white/10 border border-white/25 backdrop-blur-sm"
            >
              📞 Call Us Now
            </Button>
          </motion.div>

          {/* Trust line */}
          <motion.p
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { duration: 0.4, delay: 0.3 } },
            }}
            className="mt-8 text-[10px] text-white/35 font-body uppercase tracking-widest"
          >
            16+ Years of Trust · RAJUK Approved · 1400+ Plots Transferred
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
