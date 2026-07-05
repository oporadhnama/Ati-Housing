import React from 'react';
import { useTranslations } from 'next-intl';
import { NavBar, PageHero, GalleryGrid, Footer } from '@/components';

export async function generateMetadata() {
  return {
    title: 'Gallery | Ati Model Town',
    description: 'View high-resolution photos of Ati Model Town master plan and amenities.',
  };
}

export default function GalleryPage() {
  const t = useTranslations('Gallery');
  const tNav = useTranslations('Nav');
  const tPlots = useTranslations('Plots');

  // Breadcrumbs items
  const breadcrumbs = [
    { label: tNav('home'), href: '/' },
    { label: t('title') },
  ];

  // List of all processed images with categories and alt texts
  const galleryImages = [
    {
      src: '/images/gallery/gallery-residential-area-1.webp',
      alt: tPlots('general.title'),
      category: 'residence',
    },
    {
      src: '/images/gallery/gallery-residential-area-2.webp',
      alt: 'Plots & Roads Phase 2 Layout',
      category: 'residence',
    },
    {
      src: '/images/gallery/gallery-club-1.webp',
      alt: 'Sports Club gym block',
      category: 'club',
    },
    {
      src: '/images/gallery/gallery-club-2.webp',
      alt: 'Community playground field',
      category: 'club',
    },
    {
      src: '/images/gallery/gallery-community-center-1.webp',
      alt: 'Ati Model Town Community Center exterior',
      category: 'community',
    },
    {
      src: '/images/gallery/gallery-community-center-2.webp',
      alt: 'Community Center banquet halls',
      category: 'community',
    },
    {
      src: '/images/gallery/gallery-educational-institute-1.webp',
      alt: 'High school compound',
      category: 'school',
    },
    {
      src: '/images/gallery/gallery-educational-institute-2.webp',
      alt: 'School playground area',
      category: 'school',
    },
    {
      src: '/images/gallery/gallery-educational-institute-3.webp',
      alt: 'Primary educational building',
      category: 'school',
    },
    {
      src: '/images/gallery/gallery-graveyard-1.webp',
      alt: 'Reserved community graveyard layout',
      category: 'graveyard',
    },
    {
      src: '/images/gallery/gallery-graveyard-2.webp',
      alt: 'Reserved graveyard green spacing',
      category: 'graveyard',
    },
    {
      src: '/images/gallery/gallery-hospital-1.webp',
      alt: 'ATI Specialized Hospital 1.5-acre block',
      category: 'hospital',
    },
    {
      src: '/images/gallery/gallery-hospital-2.webp',
      alt: 'Hospital parking & outpatient clinics',
      category: 'hospital',
    },
    {
      src: '/images/gallery/gallery-mosque-1.webp',
      alt: 'Ati Central Mosque front view',
      category: 'mosque',
    },
    {
      src: '/images/gallery/gallery-mosque-2.webp',
      alt: 'Central Mosque domes and minarets',
      category: 'mosque',
    },
    {
      src: '/images/gallery/gallery-park-1.webp',
      alt: 'Central park walking trails',
      category: 'park',
    },
    {
      src: '/images/gallery/gallery-park-2.webp',
      alt: 'Park green play area',
      category: 'park',
    },
    {
      src: '/images/gallery/gallery-shopping-mall-1.webp',
      alt: 'Shopping Mall retail block',
      category: 'mall',
    },
    {
      src: '/images/gallery/gallery-shopping-mall-2.webp',
      alt: 'Shopping Mall food court & parking',
      category: 'mall',
    },
  ];

  return (
    <>
      <NavBar />
      
      <main className="flex-grow">
        {/* Page Hero banner */}
        <PageHero
          title={t('title')}
          breadcrumbs={breadcrumbs}
          backgroundImage="/images/bg/breadcrumb-bg.webp"
        />

        {/* Gallery Grid filter container */}
        <section className="py-16 md:py-24 bg-surface-white">
          <div className="container mx-auto px-4 md:px-6">
            <GalleryGrid images={galleryImages} />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
