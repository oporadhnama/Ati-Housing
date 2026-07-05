import React from 'react';
import { useTranslations } from 'next-intl';
import { NavBar, PageHero, ContactForm, MapEmbed, Footer } from '@/components';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export async function generateMetadata() {
  return {
    title: 'Contact Us | Ati Model Town',
    description: 'Speak with sales agents or find our office location map.',
  };
}

export default function ContactPage() {
  const t = useTranslations('Contact');
  const tNav = useTranslations('Nav');

  // Breadcrumbs items
  const breadcrumbs = [
    { label: tNav('home'), href: '/' },
    { label: t('title') },
  ];

  const whatsappNumber = "8801805464882";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hello,%20I%20have%20an%20inquiry%20about%20Ati%20Model%20Town%20plots.`;

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

        {/* 2-column contact section */}
        <section className="py-16 md:py-24 bg-surface-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Contact details */}
              <div className="lg:col-span-5 flex flex-col space-y-8 lg:sticky lg:top-32">
                <div>
                  <span className="text-[11px] font-body font-bold uppercase tracking-[0.2em] text-brand-gold">
                    Get In Touch
                  </span>
                  <h2 className="mt-2 text-3xl md:text-4xl font-display font-bold text-brand-navy leading-tight">
                    {t('detailsHeadline') || 'Get in Touch Today'}
                  </h2>
                  <p className="mt-4 text-xs md:text-sm font-body text-text-muted leading-relaxed">
                    {t('detailsSubline') || 'Speak directly with our relationship managers or schedule a private tour of the project.'}
                  </p>
                </div>

                {/* Info block items */}
                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-surface-cream flex items-center justify-center shrink-0 border border-border-subtle rounded-sm">
                      <MapPin className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-brand-navy text-xs uppercase tracking-wider mb-1">
                        {t('addressLabel') || 'Address'}
                      </h4>
                      <p className="text-xs text-text-primary font-body">
                        {t('addressValue')}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-surface-cream flex items-center justify-center shrink-0 border border-border-subtle rounded-sm">
                      <Phone className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-brand-navy text-xs uppercase tracking-wider mb-1">
                        {t('callUs') || 'Call Support'}
                      </h4>
                      <p className="text-xs text-text-primary font-body space-y-1">
                        <a href="tel:+8801805464882" className="hover:text-brand-gold block transition-colors">
                          +88 01805-464882
                        </a>
                        <a href="tel:+8801322924833" className="hover:text-brand-gold block transition-colors">
                          +88 01322-924833
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-surface-cream flex items-center justify-center shrink-0 border border-border-subtle rounded-sm">
                      <Mail className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-brand-navy text-xs uppercase tracking-wider mb-1">
                        {t('emailUs') || 'Email Enquiries'}
                      </h4>
                      <a
                        href="mailto:hello.atisociety@gmail.com"
                        className="text-xs text-text-primary font-body hover:text-brand-gold transition-colors"
                      >
                        hello.atisociety@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-surface-cream flex items-center justify-center shrink-0 border border-border-subtle rounded-sm">
                      <Clock className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-brand-navy text-xs uppercase tracking-wider mb-1">
                        {t('hoursLabel') || 'Office Hours'}
                      </h4>
                      <p className="text-xs text-text-primary font-body">
                        {t('hoursValue')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Chat link */}
                <div className="pt-4 border-t border-border-subtle">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center font-body font-semibold tracking-wide uppercase px-6 py-3.5 text-xs bg-[#25D366] hover:bg-[#20ba5a] text-white transition-all duration-200 rounded-sm gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    {t('whatsappCta') || 'Message us on WhatsApp'}
                  </a>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <ContactForm />
              </div>

            </div>
          </div>
        </section>

        {/* Full-width Map embed */}
        <section className="w-full h-[450px]">
          <MapEmbed title={t('mapTitle') || 'Ati Model Town map'} className="h-full w-full border-0" />
        </section>
      </main>

      <Footer />
    </>
  );
}
