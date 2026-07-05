'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { FooterProps } from './Footer.types';
import { FooterNav } from '../FooterNav/FooterNav';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* ── Social Icon SVGs ── */
const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);
const Youtube = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);
const WhatsApp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.488 1.459 5.407 1.46h.007c5.908 0 10.718-4.811 10.722-10.722.003-2.864-1.111-5.556-3.14-7.589C17.616 1.27 14.928.156 12.01.156c-5.905 0-10.718 4.811-10.722 10.723-.001 1.914.502 3.79 1.462 5.4l-.993 3.634 3.712-.975z" />
  </svg>
);

const SOCIALS = [
  { label: 'Facebook', icon: Facebook, href: 'https://www.facebook.com/profile.php?id=61563133283536' },
  { label: 'Instagram', icon: Instagram, href: 'https://www.instagram.com/amaderati' },
  { label: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@AtiSociety' },
  { label: 'WhatsApp', icon: WhatsApp, href: 'https://wa.me/8801322924833' },
];

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const t = useTranslations('Footer');
  const tn = useTranslations('Nav');
  const tp = useTranslations('Plots');
  const prefersReduced = useReducedMotion();

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const footerColumns = [
    {
      title: t('colLinks'),
      links: [
        { label: tn('plots'), href: '/plots' },
        { label: tn('amenities'), href: '/amenities' },
        { label: tn('about'), href: '/about' },
        { label: tn('gallery'), href: '/gallery' },
        { label: tn('contact'), href: '/contact' },
      ],
    },
    {
      title: t('colPlots'),
      links: [
        { label: tp('general.title'), href: '/plots#general' },
        { label: tp('avenue.title'), href: '/plots#avenue' },
        { label: tp('commercial.title'), href: '/plots#commercial' },
        { label: tp('hospital.title'), href: '/plots#hospital' },
      ],
    },
    {
      title: t('colContact'),
      links: [
        { label: 'Ati Model Town, Keraniganj', href: '/contact' },
        { label: 'Sales: 01805-464882', href: 'tel:+8801805464882' },
        { label: 'Sales: 01322-924833', href: 'tel:+8801322924833' },
        { label: 'hello.atisociety@gmail.com', href: 'mailto:hello.atisociety@gmail.com' },
      ],
    },
  ];

  return (
    <footer className={`relative bg-[#0b1420] text-white border-t-0 pt-0 pb-0 overflow-hidden ${className}`}>

      {/* ── Gold gradient top border ── */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-brand-gold to-transparent" />

      {/* ── Section pattern background ── */}
      <div className="section-pattern-bg absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative z-10 pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-6">

          {/* Main top Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">

            {/* Logo and Tagline Column */}
            <div className="lg:col-span-4 flex flex-col space-y-6">
              <Link href="/" className="relative w-44 h-12 block">
                <Image
                  src="/images/logo.svg"
                  alt="ATI Housing Logo"
                  fill
                  className="object-contain filter brightness-0 invert"
                />
              </Link>
              <p className="text-gray-400 text-xs md:text-sm font-body leading-relaxed max-w-sm">
                {t('tagline')}
              </p>

              {/* Contact quick-info */}
              <div className="space-y-2 border-t border-white/5 pt-4">
                <a href="tel:+8801805464882" className="flex items-center gap-2 text-xs text-gray-400 hover:text-brand-gold transition-colors duration-200 group">
                  <span className="text-brand-gold group-hover:scale-110 transition-transform">📞</span>
                  01805-464882
                </a>
                <a href="mailto:hello.atisociety@gmail.com" className="flex items-center gap-2 text-xs text-gray-400 hover:text-brand-gold transition-colors duration-200 group">
                  <span className="text-brand-gold group-hover:scale-110 transition-transform">✉️</span>
                  hello.atisociety@gmail.com
                </a>
                <a href="https://maps.app.goo.gl/JGppEahtbh2bjkWC9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-gray-400 hover:text-brand-gold transition-colors duration-200 group">
                  <span className="text-brand-gold group-hover:scale-110 transition-transform">📍</span>
                  Ati Model Town, Dhaka 1312
                </a>
              </div>

              {/* Social Icons row */}
              <div className="flex items-center space-x-3 pt-1">
                {SOCIALS.map(({ label, icon: Icon, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${label} page`}
                    className="group relative flex items-center justify-center w-9 h-9 border border-white/10 hover:border-brand-gold/50 hover:bg-brand-gold/8 transition-all duration-300 rounded-sm focus-visible:outline-brand-gold"
                  >
                    <Icon className="w-4 h-4 text-gray-400 group-hover:text-brand-gold transition-colors duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation links (3 columns) */}
            <div className="lg:col-span-8">
              <FooterNav columns={footerColumns} />
            </div>

          </div>

          {/* Trust badges row */}
          <div className="flex flex-wrap justify-center gap-6 py-6 border-t border-white/5 border-b border-white/5 mb-8">
            {[
              { icon: '🏛️', label: 'RAJUK Approved' },
              { icon: '📅', label: '16+ Years Trusted' },
              { icon: '🏡', label: '1,400+ Plots Sold' },
              { icon: '⭐', label: '25k+ Reviews' },
              { icon: '👨‍👩‍👧', label: '98% Happy Customers' },
            ].map(({ icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-gray-500 font-body uppercase tracking-wider">
                <span className="text-base">{icon}</span>
                {label}
              </div>
            ))}
          </div>

          {/* Bottom copyright & details bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-xs font-body text-center md:text-left">
              {t('copyright')}
            </p>
            <div className="flex items-center gap-6 text-gray-500 text-xs font-body">
              <Link href="/about" className="hover:text-brand-gold transition-colors duration-200 focus-visible:outline-brand-gold">
                Privacy Policy
              </Link>
              <Link href="/contact" className="hover:text-brand-gold transition-colors duration-200 focus-visible:outline-brand-gold">
                Office Map
              </Link>
              <span className="text-gray-600">·</span>
              <span>Built with ❤️ by Dots IT</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Back to Top button ── */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={prefersReduced ? {} : { opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReduced ? {} : { opacity: 0, scale: 0.6, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 w-10 h-10 flex items-center justify-center bg-brand-gold hover:bg-brand-gold-dark text-brand-navy rounded-full shadow-lg shadow-brand-gold/25 transition-colors duration-200 focus-visible:outline-white"
            aria-label="Back to top"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};
