'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { GalleryGridProps } from './GalleryGrid.types';
import { Lightbox } from '../Lightbox/Lightbox';

export const GalleryGrid: React.FC<GalleryGridProps> = ({
  images,
  className = '',
}) => {
  const t = useTranslations('Gallery');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  // Map sector categories to localized labels and custom illustrations from assetsmap.md
  const categories = [
    { id: 'all', label: t('sectors.all'), icon: null },
    { id: 'club', label: t('sectors.club'), icon: '/images/features/Club.webp' },
    { id: 'community', label: t('sectors.community'), icon: '/images/features/ConventionHall.webp' },
    { id: 'mosque', label: t('sectors.mosque'), icon: '/images/features/Mosque.webp' },
    { id: 'hospital', label: t('sectors.hospital'), icon: '/images/features/Hospital.webp' },
    { id: 'school', label: t('sectors.school'), icon: '/images/features/EducationalInstitue.webp' },
    { id: 'graveyard', label: t('sectors.graveyard'), icon: '/images/features/Cemetery.webp' },
    { id: 'park', label: t('sectors.park'), icon: '/images/features/Park.webp' },
    { id: 'residence', label: t('sectors.residence'), icon: '/images/features/ResidentialArea.webp' },
    { id: 'mall', label: t('sectors.mall'), icon: '/images/features/ShoppingMall.webp' },
  ];

  const filteredImages = images.filter(img => {
    if (activeTab === 'all') return true;
    return img.category === activeTab;
  });

  const handlePrev = () => {
    if (selectedIdx !== null) {
      setSelectedIdx(prev => (prev === 0 ? filteredImages.length - 1 : (prev ?? 0) - 1));
    }
  };

  const handleNext = () => {
    if (selectedIdx !== null) {
      setSelectedIdx(prev => (prev === filteredImages.length - 1 ? 0 : (prev ?? 0) + 1));
    }
  };

  // Generate thumbnail filenames (suffix -thumb) for grid views
  const getThumbSrc = (src: string): string => {
    const ext = src.substring(src.lastIndexOf('.'));
    const base = src.substring(0, src.lastIndexOf('.'));
    return `${base}-thumb${ext}`;
  };

  return (
    <div className={`w-full ${className}`}>
      
      {/* Category Tabs (Visual Cards scrollable on mobile) */}
      <div 
        className="w-full overflow-x-auto pb-6 mb-10 md:mb-12 border-b border-border-subtle"
        style={{
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        }}
      >
        <div className="flex items-center justify-start lg:justify-center gap-4 min-w-max px-4">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveTab(cat.id);
                setSelectedIdx(null); // Reset open states
              }}
              className={`flex flex-col items-center justify-center shrink-0 w-28 h-28 md:w-32 md:h-32 p-3 text-center border transition-all duration-300 rounded-sm focus-visible:outline-brand-gold group cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-brand-navy border-brand-gold text-white shadow-card ring-1 ring-brand-gold ring-opacity-50'
                  : 'bg-surface-cream bg-opacity-50 border-border-subtle hover:border-brand-gold text-brand-navy hover:bg-white'
              }`}
            >
              {cat.icon ? (
                <div className="relative w-10 h-10 mb-2 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={cat.icon}
                    alt={cat.label}
                    fill
                    className={`object-contain ${
                      activeTab === cat.id ? 'filter brightness-0 invert' : ''
                    }`}
                  />
                </div>
              ) : (
                /* All Sectors grid icon */
                <div className={`w-10 h-10 flex items-center justify-center mb-2 rounded-full transition-transform duration-300 group-hover:scale-110 ${
                  activeTab === 'all' ? 'bg-brand-gold bg-opacity-20' : 'bg-brand-navy bg-opacity-5'
                }`}>
                  <svg className={`w-5 h-5 ${activeTab === 'all' ? 'text-brand-gold' : 'text-brand-navy'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </div>
              )}
              
              <span className={`text-[10px] md:text-xs font-body font-bold uppercase tracking-wider block transition-colors leading-tight ${
                activeTab === cat.id ? 'text-white' : 'text-brand-navy'
              }`}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Masonry Layout Grid */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-16 text-text-muted text-sm font-body bg-surface-cream border border-border-subtle max-w-md mx-auto">
          {t('emptyState')}
        </div>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className="break-inside-avoid bg-surface-white border border-border-subtle hover:border-brand-gold hover:shadow-card transition-all duration-300 rounded-none overflow-hidden cursor-pointer group"
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[4/3] sm:aspect-auto overflow-hidden">
                <Image
                  src={getThumbSrc(img.src)} // Load resized thumbnails for fast loading in grids
                  alt={img.alt}
                  width={600}
                  height={450}
                  className="object-cover w-full h-auto transition-transform duration-500 group-hover:scale-105"
                />
                
                {/* Hover overlay badge */}
                <div className="absolute inset-0 bg-brand-navy bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                  <span className="text-white text-xs font-semibold uppercase tracking-wider px-4 py-2 border border-white border-opacity-40 bg-brand-navy bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Zoom Image
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal Link */}
      {selectedIdx !== null && filteredImages[selectedIdx] && (
        <Lightbox
          src={filteredImages[selectedIdx].src} // Load high-res full image in Lightbox
          alt={filteredImages[selectedIdx].alt}
          isOpen={selectedIdx !== null}
          onClose={() => setSelectedIdx(null)}
          onPrev={filteredImages.length > 1 ? handlePrev : undefined}
          onNext={filteredImages.length > 1 ? handleNext : undefined}
        />
      )}

    </div>
  );
};
