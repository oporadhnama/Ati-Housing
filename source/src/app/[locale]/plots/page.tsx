import React from 'react';
import { useTranslations } from 'next-intl';
import { NavBar, PageHero, CTABand, Footer } from '@/components';
import PlotsPageClient from './plots-client';

export async function generateMetadata() {
  return {
    title: 'Available Plots | Ati Model Town',
    description: 'Browse residential and commercial plots for sale in Dhaka Keraniganj.',
  };
}

export default function PlotsPage() {
  const t = useTranslations('Plots');
  const tNav = useTranslations('Nav');
  const tcb = useTranslations('CtaBand');

  // Breadcrumbs items
  const breadcrumbs = [
    { label: tNav('home'), href: '/' },
    { label: t('title') },
  ];

  // Raw initial list of 4 plot cards (with full specifications lists)
  const initialPlots = [
    {
      tag: t('general.tag') || 'Residential',
      title: t('general.title'),
      sizes: t('general.sizes'),
      description: t('general.description'),
      href: '#general',
      image: '/images/plots/plot-general.webp',
      features: t.raw('general.features') as string[],
    },
    {
      tag: t('avenue.tag') || 'Premium',
      title: t('avenue.title'),
      sizes: t('avenue.sizes'),
      description: t('avenue.description'),
      href: '#avenue',
      image: '/images/plots/plot-avenue.webp',
      features: t.raw('avenue.features') as string[],
    },
    {
      tag: t('commercial.tag') || 'Commercial',
      title: t('commercial.title'),
      sizes: t('commercial.sizes'),
      description: t('commercial.description'),
      href: '#commercial',
      image: '/images/plots/plot-commercial.webp',
      features: t.raw('commercial.features') as string[],
    },
    {
      tag: t('hospital.tag') || 'Institutional',
      title: t('hospital.title'),
      sizes: t('hospital.sizes'),
      description: t('hospital.description'),
      href: '#hospital',
      image: '/images/plots/plot-hospital.webp',
      features: t.raw('hospital.features') as string[],
    },
  ];

  return (
    <>
      <NavBar />
      
      <main className="flex-grow">
        {/* Short page hero */}
        <PageHero
          title={t('title')}
          breadcrumbs={breadcrumbs}
          backgroundImage="/images/hero/hero-land-plots.webp"
        />

        {/* Client Side Filter Grid & Brochure download widget */}
        <PlotsPageClient initialPlots={initialPlots} />

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
