'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Link } from '@/navigation';
import { NavBarProps } from './NavBar.types';
import { Button } from '../Button/Button';
import { LanguageToggle } from '../LanguageToggle/LanguageToggle';
import { NavMobile } from '../NavMobile/NavMobile';
import { MagneticWrapper } from '../MagneticWrapper/MagneticWrapper';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

export const NavBar: React.FC<NavBarProps> = ({ className = '' }) => {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hasMounted, setHasMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 60);
      const docH = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(docH > 0 ? (scrollY / docH) * 100 : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('plots'), href: '/plots' },
    { label: t('amenities'), href: '/amenities' },
    { label: t('about'), href: '/about' },
    { label: t('gallery'), href: '/gallery' },
    { label: t('contact'), href: '/contact' },
  ];

  /* ── check if link is active (strip locale prefix) ── */
  const isActive = (href: string) => {
    // pathname is like /en/plots or /bn/about
    const segments = pathname.split('/').filter(Boolean);
    const pathWithoutLocale = '/' + segments.slice(1).join('/') || '/';
    return href === '/' ? pathWithoutLocale === '/' : pathWithoutLocale.startsWith(href);
  };

  /* ── Entrance animation ── */
  const navVariants = {
    hidden: { y: prefersReduced ? 0 : -100, opacity: prefersReduced ? 1 : 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const, delay: 0.1 },
    },
  };

  return (
    <>
      <motion.header
        variants={navVariants}
        initial="hidden"
        animate={hasMounted ? 'visible' : 'hidden'}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? 'glassmorphism py-3' : 'bg-transparent py-5'
        } ${className}`}
      >
        {/* ── Gold scroll-progress bar ── */}
        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 h-[2px] z-50 transition-none"
              style={{
                width: `${scrollProgress}%`,
                background: 'linear-gradient(90deg, #B8975A, #D4B07A, #B8975A)',
              }}
            />
          )}
        </AnimatePresence>

        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo with hover shimmer */}
          <Link
            href="/"
            className="relative flex items-center gap-2 focus-visible:outline-brand-gold group overflow-hidden"
          >
            <div className="relative w-36 h-10 md:w-40 md:h-11 transition-transform duration-300 group-hover:scale-[1.03]">
              <Image
                src="/images/logo.png"
                alt="ATI Housing Logo"
                fill
                priority
                className="object-contain"
              />
              {/* Logo shimmer sweep on hover */}
              <span className="absolute inset-0 logo-shimmer pointer-events-none" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-7" aria-label="Main navigation">
            {navLinks.map((link, index) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={index}
                  href={link.href}
                  className={`nav-link-elite text-[11px] font-body font-semibold uppercase tracking-[0.18em] transition-colors duration-200 focus-visible:outline-brand-gold ${
                    active
                      ? 'text-brand-gold nav-link-active'
                      : 'text-white hover:text-brand-gold'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA & Language Toggle */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <MagneticWrapper>
              <Button
                variant="primary"
                size="sm"
                href="/contact"
                className="btn-shimmer shadow-lg shadow-brand-gold/15"
              >
                {t('bookVisit')}
              </Button>
            </MagneticWrapper>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-white hover:text-brand-gold p-2 focus-visible:outline-brand-gold transition-colors duration-200"
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Prototype Warning Marquee */}
        <div className="w-full bg-red-600 text-white overflow-hidden border-t border-red-700">
          <div className="whitespace-nowrap py-1 text-xs font-medium tracking-wider flex" style={{ animation: 'marquee 25s linear infinite' }}>
            <span className="shrink-0 pl-[100%]">It&apos;s not properly built it&apos;s an prototype model type line that scrolls from right to left slowly</span>
          </div>
        </div>
      </motion.header>

      <NavMobile isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};
