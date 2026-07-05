import React from 'react';
import { useTranslations } from 'next-intl';
import {
  NavBar,
  HeroSection,
  TrustBar,
  SearchFilterBar,
  PlotGrid,
  AmenityGrid,
  WhyATISection,
  TestimonialGrid,
  CTABand,
  ContactForm,
  MapEmbed,
  Footer,
  WhatsAppFAB,
  SectionHeader,
  RevealOnScroll,
} from '@/components';

export async function generateMetadata() {
  return {
    title: 'Home - Premium RAJUK-Approved Plots',
    description: 'Invest in RAJUK-approved residential and commercial plots in Keraniganj, Dhaka. Built by ATI Society.',
  };
}

export default function HomePage() {
  const t = useTranslations();

  // 1. Hero CTA buttons
  const heroCTAs = [
    { label: t('Hero.ctaPlots'), href: '/plots', variant: 'primary' as const },
    { label: t('Hero.ctaVisit'), href: '/contact', variant: 'ghost' as const },
  ];

  // 2. Hero stats
  const heroStats = [
    { value: t('Stats.years.number') + '+', label: t('Stats.years.label') },
    { value: t('Stats.plots.number') + '+', label: t('Stats.plots.label') },
    { value: t('Stats.roads.number') + 'ft', label: t('Stats.roads.label') },
    { value: t('Stats.families.number') + '+', label: t('Stats.families.label') },
  ];

  // 2b. Hero slides — 5 per-slide texts synchronized with 5 BG images
  const heroSlides = (t.raw('Hero.slides') as { headline: string; subheadline: string }[]) ?? [];

  // 3. Trust signals list
  const trustSignals = t.raw('TrustBar.signals') as string[];


  // 4. Plot cards list (4 types)
  const plotsData = [
    {
      tag: t('Plots.general.tag'),
      title: t('Plots.general.title'),
      sizes: t('Plots.general.sizes'),
      description: t('Plots.general.description'),
      href: '/plots#general',
      image: '/images/plots/plot-general.webp',
    },
    {
      tag: t('Plots.avenue.tag'),
      title: t('Plots.avenue.title'),
      sizes: t('Plots.avenue.sizes'),
      description: t('Plots.avenue.description'),
      href: '/plots#avenue',
      image: '/images/plots/plot-avenue.webp',
    },
    {
      tag: t('Plots.commercial.tag'),
      title: t('Plots.commercial.title'),
      sizes: t('Plots.commercial.sizes'),
      description: t('Plots.commercial.description'),
      href: '/plots#commercial',
      image: '/images/plots/plot-commercial.webp',
    },
    {
      tag: t('Plots.hospital.tag'),
      title: t('Plots.hospital.title'),
      sizes: t('Plots.hospital.sizes'),
      description: t('Plots.hospital.description'),
      href: '/plots#hospital',
      image: '/images/plots/plot-hospital.webp',
    },
  ];

  // 5. Amenities list (8 types)
  const amenitiesData = [
    { icon: 'school', name: t('Amenities.school.title'), description: t('Amenities.school.description') },
    { icon: 'hospital', name: t('Amenities.hospital.title'), description: t('Amenities.hospital.description') },
    { icon: 'mall', name: t('Amenities.mall.title'), description: t('Amenities.mall.description') },
    { icon: 'mosque', name: t('Amenities.mosque.title'), description: t('Amenities.mosque.description') },
    { icon: 'park', name: t('Amenities.park.title'), description: t('Amenities.park.description') },
    { icon: 'community', name: t('Amenities.community.title'), description: t('Amenities.community.description') },
    { icon: 'club', name: t('Amenities.club.title'), description: t('Amenities.club.description') },
    { icon: 'roads', name: t('Amenities.roads.title'), description: t('Amenities.roads.description') },
  ];

  // 6. Why ATI points
  const whyPoints = t.raw('WhyAti.points') as { title: string; text: string }[];

  // 7. Why ATI stats (mapped from original stats)
  const whyStats = [
    { value: t('Stats.years.number') + '+', label: t('Stats.years.label') },
    { value: t('Stats.plots.number') + '+', label: t('Stats.plots.label') },
    { value: t('Stats.roads.number') + 'ft', label: t('Stats.roads.label') },
    { value: t('Stats.families.number') + '+', label: t('Stats.families.label') },
  ];

  // 8. Testimonials list with ratings
  const testimonialsData = [
    {
      quote: t('Testimonials.items.0.quote'),
      author: t('Testimonials.items.0.author'),
      role: t('Testimonials.items.0.role'),
      initials: t('Testimonials.items.0.initials'),
      image: '/images/testimonial/testi_1_1.webp',
      rating: 4.7,
    },
    {
      quote: t('Testimonials.items.1.quote'),
      author: t('Testimonials.items.1.author'),
      role: t('Testimonials.items.1.role'),
      initials: t('Testimonials.items.1.initials'),
      image: '/images/testimonial/testi_1_2.webp',
      rating: 4.9,
    },
    {
      quote: t('Testimonials.items.2.quote'),
      author: t('Testimonials.items.2.author'),
      role: t('Testimonials.items.2.role'),
      initials: t('Testimonials.items.2.initials'),
      image: '/images/testimonial/testi_1_3.webp',
      rating: 4.8,
    },
  ];

  return (
    <>
      <NavBar />

      <main className="flex-grow">
        {/* Hero */}
        <HeroSection
          heading={t('Hero.headline')}
          subheading={t('Hero.subheadline')}
          ctas={heroCTAs}
          slides={heroSlides}
          backgroundImage={[
            '/images/hero/hero-aerial-ati-model-town.webp',
            '/images/hero/hero-land-plots.webp',
            '/images/hero/hero-community-park.webp',
            '/images/hero/hero-school-institute.webp',
            '/images/hero/hero-street-view-1.webp',
          ]}
          stats={heroStats}
        />

        {/* Trust signals strip */}
        <TrustBar signals={trustSignals} />

        {/* Search bar placeholder (non-sticky home treatment) */}
        <RevealOnScroll variant="fade">
          <div className="bg-surface-cream py-4">
            <SearchFilterBar noBorderBottom />
          </div>
        </RevealOnScroll>

        {/* Plots listing */}
        <section className="py-16 md:py-24 bg-surface-white">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeader
              eyebrow="Listing Categories"
              title={t('Plots.headline')}
              subtitle={t('Plots.subline')}
            />
            <PlotGrid plots={plotsData} />
          </div>
        </section>

        {/* Amenities listing */}
        <section className="py-16 md:py-24 bg-surface-cream">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeader
              eyebrow="Civic Features"
              title={t('Amenities.headline')}
              subtitle={t('Amenities.subline')}
            />
            <AmenityGrid amenities={amenitiesData} />
          </div>
        </section>

        {/* Why Choose ATI split section */}
        <RevealOnScroll delay={0.05}>
          <WhyATISection
            heading={t('WhyAti.headline')}
            features={whyPoints}
            stats={whyStats}
          />
        </RevealOnScroll>

        {/* Testimonials — dark section for glassmorphism cards */}
        <section className="py-20 md:py-28 bg-[#0b1420] relative overflow-hidden">
          {/* Radial glow decoration */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] rounded-full bg-brand-gold/4 blur-3xl" />
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <SectionHeader
              eyebrow="Resident Reviews"
              title={t('Testimonials.headline')}
              darkBg
            />
            <TestimonialGrid testimonials={testimonialsData} />
          </div>
        </section>

        {/* Call To Action Band */}
        <CTABand
          heading={t('CtaBand.headline')}
          subheading={t('CtaBand.subline')}
          buttonLabel={t('CtaBand.btnLabel')}
          href="/contact"
        />

        {/* Contact and Map panel */}
        <section className="py-16 md:py-24 bg-surface-cream">
          <div className="container mx-auto px-4 md:px-6">
            <RevealOnScroll delay={0.05}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
                {/* Form card left */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <ContactForm />
                </div>
                {/* Map panel right */}
                <div className="lg:col-span-5 flex flex-col h-full min-h-[350px]">
                  <MapEmbed title={t('Contact.mapTitle')} className="h-full w-full" />
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Action WhatsApp */}
      <WhatsAppFAB phoneNumber="8801805464882" message="Hello, I am interested in Ati Model Town plots." />
    </>
  );
}
