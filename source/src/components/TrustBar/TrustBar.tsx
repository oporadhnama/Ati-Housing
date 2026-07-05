import React from 'react';
import { TrustBarProps } from './TrustBar.types';

// Mini icons for each trust signal
const SIGNAL_ICONS = [
  // Shield
  <svg key="shield" className="w-3.5 h-3.5 shrink-0 text-brand-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 1L3 4v5c0 4.418 3.05 8.564 7 9.93C14.95 17.564 18 13.418 18 9V4L10 1zm-1 12l-3-3 1.41-1.41L9 10.17l4.59-4.58L15 7l-6 6z" clipRule="evenodd" /></svg>,
  // Check badge
  <svg key="check" className="w-3.5 h-3.5 shrink-0 text-brand-gold" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>,
  // Star
  <svg key="star" className="w-3.5 h-3.5 shrink-0 text-brand-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>,
  // Home
  <svg key="home" className="w-3.5 h-3.5 shrink-0 text-brand-gold" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>,
];

export const TrustBar: React.FC<TrustBarProps> = ({ signals, className = '' }) => {
  // Duplicate signals for seamless infinite scroll
  const doubled = [...signals, ...signals];

  return (
    <section
      className={`bg-[#0b1420] py-4 border-y border-border-subtle overflow-hidden relative ${className}`}
      aria-label="Trust signals"
    >
      {/* Left/right fade masks */}
      <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-[#0b1420] to-transparent" />
      <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-[#0b1420] to-transparent" />

      {/* Scrolling track */}
      <div className="marquee-track">
        {doubled.map((signal, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-8"
          >
            {/* Icon */}
            {SIGNAL_ICONS[index % SIGNAL_ICONS.length]}

            {/* Text */}
            <span className="text-white text-[10px] md:text-[11px] font-body font-bold uppercase tracking-[0.22em] whitespace-nowrap">
              {signal}
            </span>

            {/* Gold divider dot */}
            <span className="w-1 h-1 rounded-full bg-brand-gold/40 ml-4 shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
};
