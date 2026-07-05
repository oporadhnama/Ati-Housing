import React from 'react';
import Image from 'next/image';
import { PageHeroProps } from './PageHero.types';
import { Breadcrumb } from '../Breadcrumb/Breadcrumb';

export const PageHero: React.FC<PageHeroProps> = ({
  title,
  breadcrumbs,
  backgroundImage,
  className = '',
}) => {
  return (
    <section className={`relative bg-brand-navy overflow-hidden min-h-[250px] md:min-h-[320px] flex items-center pt-28 pb-12 md:pt-36 md:pb-16 ${className}`}>
      {/* Background Image with Overlay */}
      {backgroundImage ? (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 hero-overlay-gradient z-10" />
        </div>
      ) : (
        /* Geometric Background Accent */
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute -top-16 -left-16 w-96 h-96 rounded-full border-[8px] border-brand-gold" />
          <div className="absolute -bottom-24 -right-24 w-128 h-128 rounded-full border-[32px] border-brand-gold" />
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-20 text-center md:text-left">
        <div className="max-w-4xl">
          <h1 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight leading-tight">
            {title}
          </h1>
          <div className="mt-4 flex items-center justify-center md:justify-start">
            <Breadcrumb items={breadcrumbs} className="text-gray-300" />
          </div>
        </div>
      </div>

      {/* Decorative Gold Accent Bar at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-gold via-brand-gold-light to-brand-gold z-30" />
    </section>
  );
};
