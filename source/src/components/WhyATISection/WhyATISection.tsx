import React from 'react';
import Image from 'next/image';
import { WhyATISectionProps } from './WhyATISection.types';
import { StatCounter } from '../StatCounter/StatCounter';

const FEATURE_ICONS = ['🏛️', '🏗️', '🛡️', '🔗'];

export const WhyATISection: React.FC<WhyATISectionProps> = ({
  heading,
  subheading,
  features,
  stats,
  className = '',
}) => {
  return (
    <section className={`w-full overflow-hidden ${className}`}>
      <div className="flex flex-col lg:flex-row min-h-[560px]">

        {/* ── Left Pane: Stats — Dark Cinematic ── */}
        <div className="w-full lg:w-5/12 bg-[#0b1420] flex flex-col justify-center px-6 py-14 md:px-12 lg:px-16 relative overflow-hidden">
          {/* Background image with deep overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/bg/counter-1-bg.webp"
              alt="Background texture"
              fill
              className="object-cover opacity-10 grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#0b1420] via-brand-navy/80 to-[#0b1420]" />
          </div>

          {/* Decorative gold ring */}
          <div className="absolute -right-20 top-1/4 w-80 h-80 rounded-full border-[24px] border-brand-gold/8 pointer-events-none z-10" />
          <div className="absolute -right-8 top-1/3 w-48 h-48 rounded-full border-[12px] border-brand-gold/5 pointer-events-none z-10" />

          <div className="relative z-20 max-w-md mx-auto lg:mx-0">
            {/* Label */}
            <div className="flex items-center gap-3 mb-8">
              <span className="gold-dot-diamond" />
              <span className="text-[10px] font-body font-bold uppercase tracking-[0.3em] text-brand-gold">
                ATI Society in Numbers
              </span>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12">
              {stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="stat-glow text-4xl md:text-5xl font-display font-bold text-brand-gold leading-none mb-2">
                    <StatCounter
                      value={parseInt(stat.value)}
                      suffix={stat.value.replace(/[0-9]/g, '')}
                      label=""
                      delay={i * 0.15}
                    />
                  </span>
                  <span className="text-[10px] font-body text-white/50 uppercase tracking-[0.2em]">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom accent */}
            <div className="mt-10 h-px bg-gradient-to-r from-brand-gold/40 via-brand-gold/15 to-transparent" />
          </div>
        </div>

        {/* ── Right Pane: Features — Cream with Pattern ── */}
        <div className="w-full lg:w-7/12 bg-surface-cream section-pattern-bg flex flex-col justify-center px-6 py-14 md:px-12 lg:px-16 relative overflow-hidden">
          {/* Corner decor */}
          <div className="absolute right-0 bottom-0 w-56 h-56 pointer-events-none opacity-10 z-0">
            <Image
              src="/images/shape/what-we-do-3-bg.webp"
              alt=""
              fill
              className="object-contain"
            />
          </div>

          <div className="max-w-2xl relative z-10">
            {/* Section header */}
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="gold-dot-diamond" />
                <span className="text-[10px] font-body font-bold uppercase tracking-[0.3em] text-brand-gold">
                  Key Benefits
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <span className="section-gold-rule" />
              </div>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-display font-bold leading-tight text-brand-navy">
                {heading}
              </h2>
              {subheading && (
                <p className="mt-4 text-sm font-body text-text-muted leading-relaxed max-w-lg">
                  {subheading}
                </p>
              )}
            </div>

            {/* Feature cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {features.map((feat, i) => (
                <div
                  key={i}
                  className="card-elite group bg-surface-white border border-border-subtle rounded-none p-5 flex items-start gap-4"
                >
                  {/* Icon with gradient background */}
                  <div className="w-12 h-12 shrink-0 flex items-center justify-center rounded-sm bg-gradient-to-br from-brand-navy to-brand-navy/80 border border-brand-gold/20 text-xl">
                    {FEATURE_ICONS[i] ?? '✦'}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-brand-navy text-base tracking-tight mb-1 group-hover:text-brand-gold-dark transition-colors duration-300">
                      {feat.title}
                    </h3>
                    <p className="text-text-muted text-[11px] leading-relaxed">
                      {feat.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
