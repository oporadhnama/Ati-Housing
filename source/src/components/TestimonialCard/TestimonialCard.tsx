'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { TestimonialCardProps } from './TestimonialCard.types';

interface ExtendedTestimonialCardProps extends TestimonialCardProps {
  rating?: number;
}

/* ── Animated Star Rating ── */
const AnimatedStarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReduced = useReducedMotion();

  return (
    <div ref={ref} className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= Math.floor(rating);
        const partial = !filled && star <= rating;
        return (
          <motion.svg
            key={star}
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.4 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.35,
              delay: prefersReduced ? 0 : 0.1 + star * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`w-3.5 h-3.5 ${filled || partial ? 'text-brand-gold' : 'text-white/15'}`}
            fill={filled ? 'currentColor' : partial ? 'url(#partial)' : 'none'}
            stroke="currentColor"
            strokeWidth="1"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>
        );
      })}
      <span className="ml-1.5 text-[10px] font-bold text-brand-gold/90 font-body">{rating.toFixed(1)}</span>
    </div>
  );
};

export const TestimonialCard: React.FC<ExtendedTestimonialCardProps> = ({
  quote,
  author,
  role,
  initials,
  image,
  rating = 4.8,
  className = '',
}) => {
  return (
    <div
      className={`testimonial-glass group relative overflow-hidden rounded-none p-6 md:p-7 flex flex-col justify-between transition-all duration-400 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(184,151,90,0.18)] ${className}`}
    >
      {/* ── Giant decorative quote watermark ── */}
      <div className="absolute top-0 right-0 pointer-events-none select-none overflow-hidden">
        <svg
          className="w-24 h-24 text-brand-gold/8 fill-current translate-x-4 -translate-y-4"
          viewBox="0 0 24 24"
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.154c-2.433.914-3.996 3.635-3.996 5.846h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* ── Animated Star Rating ── */}
      <div className="mb-4">
        <AnimatedStarRating rating={rating} />
      </div>

      {/* ── Quote Text ── */}
      <div className="mb-6 flex-1">
        <p className="text-xs md:text-sm font-body text-white/85 italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      {/* ── Divider ── */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent mb-4 group-hover:via-brand-gold/50 transition-all duration-500" />

      {/* ── Author Row ── */}
      <div className="flex items-center gap-3">
        {/* Avatar with pulsing gold ring */}
        <div className="relative w-11 h-11 shrink-0">
          {/* Pulsing ring decoration */}
          <span className="absolute inset-[-3px] rounded-full border border-brand-gold/40 animate-ping opacity-0 group-hover:opacity-60 pointer-events-none transition-opacity duration-500" />
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-brand-gold/40 shadow-[0_0_12px_rgba(184,151,90,0.25)]">
            {image ? (
              <Image
                src={image}
                alt={author}
                fill
                sizes="44px"
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-navy to-brand-navy/60 flex items-center justify-center">
                <span className="text-xs font-bold text-brand-gold tracking-wider font-display">
                  {initials}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Name & Role */}
        <div className="flex flex-col">
          <span className="text-sm font-display font-bold text-white leading-snug">
            {author}
          </span>
          <span className="text-[10px] font-body text-brand-gold/70 tracking-wide">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
};
