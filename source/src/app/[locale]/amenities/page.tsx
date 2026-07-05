import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { NavBar, PageHero, AmenityGrid, CTABand, Footer, SectionHeader } from '@/components';

export async function generateMetadata() {
  return {
    title: 'Amenities | Ati Model Town',
    description: 'Explore schools, hospitals, mosques, and parks in Ati Model Town.',
  };
}

export default function AmenitiesPage() {
  const t = useTranslations('Amenities');
  const tNav = useTranslations('Nav');
  const tcb = useTranslations('CtaBand');

  // Breadcrumbs items
  const breadcrumbs = [
    { label: tNav('home'), href: '/' },
    { label: t('title') },
  ];

  // Raw expanded lists of 8 amenities with 3-bullet features lists
  const amenitiesData = [
    {
      icon: 'school',
      name: t('school.title'),
      description: t('school.description'),
      features: t.raw('school.features') as string[],
    },
    {
      icon: 'hospital',
      name: t('hospital.title'),
      description: t('hospital.description'),
      features: t.raw('hospital.features') as string[],
    },
    {
      icon: 'mall',
      name: t('mall.title'),
      description: t('mall.description'),
      features: t.raw('mall.features') as string[],
    },
    {
      icon: 'mosque',
      name: t('mosque.title'),
      description: t('mosque.description'),
      features: t.raw('mosque.features') as string[],
    },
    {
      icon: 'park',
      name: t('park.title'),
      description: t('park.description'),
      features: t.raw('park.features') as string[],
    },
    {
      icon: 'community',
      name: t('community.title'),
      description: t('community.description'),
      features: t.raw('community.features') as string[],
    },
    {
      icon: 'club',
      name: t('club.title'),
      description: t('club.description'),
      features: t.raw('club.features') as string[],
    },
    {
      icon: 'roads',
      name: t('roads.title'),
      description: t('roads.description'),
      features: t.raw('roads.features') as string[],
    },
  ];

  // 3 lifestyle strip images
  const lifestyleImages = [
    { src: '/images/gallery/gallery-club-1.webp', alt: 'Sports Club Gymnasium' },
    { src: '/images/gallery/gallery-community-center-1.webp', alt: 'Central Banquet Hall' },
    { src: '/images/gallery/gallery-park-1.webp', alt: 'Green Park walking pathway' },
  ];

  return (
    <>
      <NavBar />
      
      <main className="flex-grow">
        {/* Short page hero */}
        <PageHero
          title={t('title')}
          breadcrumbs={breadcrumbs}
          backgroundImage="/images/hero/hero-community-park.webp"
        />

        {/* Intro Prose section */}
        <section className="py-16 bg-surface-white">
          <div className="container mx-auto px-4 md:px-6 text-center max-w-3xl">
            <h2 className="font-display font-bold text-brand-navy text-2xl md:text-3xl tracking-tight mb-4 uppercase">
              {t('lifestyleHeadline') || 'Life at Ati Model Town'}
            </h2>
            <p className="font-body text-text-muted text-sm md:text-base leading-relaxed">
              {t('introText') || 'Ati Model Town is designed as a self-sustaining planned community.'}
            </p>
          </div>
        </section>

        {/* Dynamic Expanded Grid */}
        <section className="py-16 md:py-20 bg-surface-cream border-t border-border-subtle">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeader
              eyebrow="Detailed Specifications"
              title="Civic & Infrastructure Projects"
              subtitle="Every amenity is fully operational and constructed under modern capital layouts."
            />
            <AmenityGrid amenities={amenitiesData} expanded={true} />
          </div>
        </section>

        {/* Lifestyle image strip */}
        <section className="py-16 bg-surface-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <h3 className="font-display font-bold text-brand-navy text-xl uppercase tracking-wider mb-2">
                {t('lifestyleHeadline')}
              </h3>
              <p className="text-xs text-text-muted font-body leading-relaxed">
                {t('lifestyleText')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {lifestyleImages.map((img, i) => (
                <div key={i} className="relative aspect-[4/3] overflow-hidden border border-border-subtle group">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-4 left-4 bg-brand-navy bg-opacity-80 px-4 py-1.5 border border-border-subtle z-10 text-[10px] text-white uppercase tracking-wider font-semibold">
                    {img.alt}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <CTABand
          heading={tcb('headline')}
          subheading={tcb('subline')}
          buttonLabel={tcb('btnLabel')}
          href="/contact"
        />
      </main>

      <Footer />
    </>
  );
}
