import React from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { NavBar, PageHero, StatCounter, CTABand, Footer, SectionHeader, AboutCollage, TeamGrid } from '@/components';
import { Scale, Award, Users } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'About Us | Ati Model Town',
    description: 'Read the story, values, and legal approvals of ATI Society since 2010.',
  };
}

export default function AboutPage() {
  const t = useTranslations('About');
  const tNav = useTranslations('Nav');
  const tStats = useTranslations('Stats');
  const tcb = useTranslations('CtaBand');

  // Breadcrumbs items
  const breadcrumbs = [
    { label: tNav('home'), href: '/' },
    { label: t('title') },
  ];

  // Raw values list
  const valuesData = [
    {
      icon: <Scale className="w-6 h-6 text-brand-gold" />,
      title: t('valueTransparencyTitle'),
      description: t('valueTransparencyText'),
    },
    {
      icon: <Award className="w-6 h-6 text-brand-gold" />,
      title: t('valueQualityTitle'),
      description: t('valueQualityText'),
    },
    {
      icon: <Users className="w-6 h-6 text-brand-gold" />,
      title: t('valueCommunityTitle'),
      description: t('valueCommunityText'),
    },
  ];

  // Stats definition
  const statsData = [
    { value: parseInt(tStats('years.number')), suffix: '+', label: tStats('years.label') },
    { value: parseInt(tStats('plots.number')), suffix: '+', label: tStats('plots.label') },
    { value: parseInt(tStats('roads.number')), suffix: 'ft', label: tStats('roads.label') },
    { value: parseInt(tStats('families.number')), suffix: '+', label: tStats('families.label') },
  ];

  return (
    <>
      <NavBar />
      
      <main className="flex-grow">
        {/* Short page hero */}
        <PageHero
          title={t('title')}
          breadcrumbs={breadcrumbs}
          backgroundImage="/images/bg/breadcrumb-bg.webp"
        />

        {/* Company story prose block with interactive collage */}
        <section className="py-16 md:py-24 bg-surface-white overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Story Prose */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-[11px] font-body font-bold uppercase tracking-[0.2em] text-brand-gold">
                    Our Background
                  </span>
                  <h2 className="mt-2 text-3xl md:text-5xl font-display font-bold text-brand-navy leading-tight">
                    {t('storyHeadline')}
                  </h2>
                </div>
                <p className="font-body text-text-primary text-sm md:text-base leading-relaxed text-justify">
                  {t('storyText')}
                </p>
              </div>
              
              {/* Right Column: Overlapping Collage */}
              <div className="lg:col-span-6 w-full">
                <AboutCollage />
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic count-up stats row with background overlay */}
        <section className="py-16 bg-brand-navy border-y border-border-subtle relative overflow-hidden">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/bg/counter-1-bg.webp"
              alt="Stats BG texture"
              fill
              className="object-cover opacity-10 filter grayscale"
            />
            <div className="absolute inset-0 bg-brand-navy bg-opacity-95" />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statsData.map((stat, i) => (
                <StatCounter
                  key={i}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  className="items-center" // Centered counters layout
                />
              ))}
            </div>
          </div>
        </section>

        {/* Core Values cards grid */}
        <section className="py-16 md:py-24 bg-surface-cream">
          <div className="container mx-auto px-4 md:px-6">
            <SectionHeader
              eyebrow="Our Pillars"
              title={t('valuesHeadline') || 'Our Core Values'}
              subtitle="The driving principles that define how we build communities and maintain legal transparency."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {valuesData.map((val, i) => (
                <div
                  key={i}
                  className="bg-surface-white p-6 border border-border-subtle hover:border-brand-gold transition-all duration-300 rounded-none flex flex-col items-center text-center"
                >
                  <div className="w-12 h-12 bg-brand-navy flex items-center justify-center rounded-sm mb-4">
                    {val.icon}
                  </div>
                  <h3 className="font-display font-bold text-brand-navy text-lg tracking-tight mb-2">
                    {val.title}
                  </h3>
                  <p className="text-text-muted text-xs leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Legal/Compliance callout box */}
        <section className="py-16 bg-surface-white">
          <div className="container mx-auto px-4 md:px-6 max-w-4xl">
            <div className="bg-brand-navy text-white p-8 md:p-12 border-l-4 border-brand-gold rounded-none relative overflow-hidden">
              {/* Geometric subtle corner decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold bg-opacity-5 rounded-bl-full pointer-events-none" />
              
              <div className="relative z-10">
                <span className="text-[10px] font-body font-bold uppercase tracking-[0.2em] text-brand-gold block mb-2">
                  Official Verification
                </span>
                <h3 className="font-display font-bold text-2xl md:text-3xl leading-tight mb-4 text-white">
                  {t('complianceHeadline')}
                </h3>
                <p className="font-body text-gray-300 text-xs md:text-sm leading-relaxed text-justify">
                  {t('complianceText')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership & Team directory Section */}
        <section className="py-16 md:py-24 bg-surface-cream border-t border-border-subtle relative overflow-hidden">
          {/* Background Shape Overlay */}
          <div className="absolute left-0 bottom-0 w-[300px] h-[300px] pointer-events-none opacity-5 z-0">
            <Image
              src="/images/shape/team-bg-pattern.webp"
              alt="Team background pattern"
              fill
              className="object-contain"
            />
          </div>

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <SectionHeader
              eyebrow={t('team.eyebrow')}
              title={t('team.title')}
              subtitle={t('team.subtitle')}
            />
            <TeamGrid />
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
