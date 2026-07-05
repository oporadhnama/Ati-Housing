'use client';

import React from 'react';
import Image from 'next/image';
import { PlotCardProps } from './PlotCard.types';
import { Button } from '../Button/Button';
import { Check, ArrowRight } from 'lucide-react';

/* ── Tag Ribbon — angled gold badge in the top-left corner ── */
const TagRibbon: React.FC<{ text: string }> = ({ text }) => (
  <div className="absolute top-0 left-0 z-10 overflow-hidden w-28 h-28 pointer-events-none">
    <div
      className="absolute -left-7 top-5 w-32 py-1.5 text-center font-body font-bold text-[9px] uppercase tracking-widest text-white shadow-md"
      style={{
        background: 'linear-gradient(135deg, #B8975A 0%, #8C6E3C 100%)',
        transform: 'rotate(-45deg)',
      }}
    >
      {text}
    </div>
  </div>
);

/* ── Sizes as pill chips ── */
const SizeChips: React.FC<{ sizes: string }> = ({ sizes }) => {
  const chips = sizes
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((chip, i) => (
        <span
          key={i}
          className="inline-block px-2.5 py-0.5 text-[9px] font-body font-bold uppercase tracking-wider border border-brand-gold/50 text-brand-gold-dark bg-brand-gold/5 rounded-sm transition-colors duration-200 hover:bg-brand-gold/15"
        >
          {chip}
        </span>
      ))}
    </div>
  );
};

export const PlotCard: React.FC<PlotCardProps> = ({
  tag,
  title,
  sizes,
  description,
  href,
  image,
  features = [],
  expanded = false,
  className = '',
}) => {
  if (expanded) {
    return (
      <div
        className={`card-elite flex flex-col lg:flex-row bg-surface-white border border-border-subtle rounded-sm overflow-hidden ${className}`}
      >
        {/* Left: Image */}
        <div className="relative w-full lg:w-2/5 min-h-[260px] lg:min-h-full aspect-[4/3] lg:aspect-auto overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
          {/* Ribbon badge */}
          <TagRibbon text={tag} />
        </div>

        {/* Right: Content */}
        <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
          <div>
            <h3 className="font-display font-bold text-brand-navy text-2xl md:text-3xl tracking-tight mb-3">
              {title}
            </h3>
            <p className="text-text-muted text-sm leading-relaxed mb-5">{description}</p>

            {/* Sizes as pill chips */}
            <div className="mb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-navy block mb-2">
                Available Sizes:
              </span>
              <SizeChips sizes={sizes} />
            </div>

            {/* Feature list */}
            {features.length > 0 && (
              <div className="mb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-navy block mb-3">
                  Key Specifications:
                </span>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-text-primary">
                      <Check className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-5 border-t border-border-subtle mt-4">
            <Button
              variant="primary"
              size="md"
              href={`/contact?type=${encodeURIComponent(title.toLowerCase())}`}
              className="w-full sm:w-auto btn-shimmer"
            >
              Request Pricing Details
            </Button>
            <Button
              variant="secondary"
              size="md"
              href="/api/brochure"
              className="w-full sm:w-auto"
            >
              Download Brochure
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ── Standard vertical grid card ──
  return (
    <div
      className={`card-elite group flex flex-col bg-surface-white border border-border-subtle rounded-sm overflow-hidden ${className}`}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        />
        {/* Gradient reveal on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-brand-navy/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Angled ribbon badge (replaces flat badge) */}
        <TagRibbon text={tag} />

        {/* "View Details" arrow CTA that slides in from bottom on hover */}
        <div className="absolute inset-0 flex items-end pb-5 justify-center z-20 opacity-0 group-hover:opacity-100 transition-all duration-400 translate-y-3 group-hover:translate-y-0">
          <span className="flex items-center gap-1.5 text-xs font-body font-semibold text-white uppercase tracking-widest border-b border-brand-gold/70 pb-0.5">
            View Details
            <ArrowRight className="w-3.5 h-3.5 text-brand-gold animate-[slide-right_0.4s_ease] group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-display font-bold text-brand-navy text-xl tracking-tight mb-2 group-hover:text-brand-gold-dark transition-colors duration-300">
            {title}
          </h3>
          <p className="text-text-muted text-xs leading-relaxed line-clamp-3 mb-4">{description}</p>

          {/* Size chips */}
          <div className="border-t border-border-subtle pt-3 mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-navy block mb-2">
              Sizes:
            </span>
            <SizeChips sizes={sizes} />
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          href={href}
          className="w-full group-hover:border-brand-gold group-hover:text-brand-navy transition-all duration-300"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};
