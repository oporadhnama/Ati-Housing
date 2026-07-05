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
import { SearchModal } from '../SearchModal/SearchModal';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Search } from 'lucide-react';

export const NavBar: React.FC<NavBarProps> = ({ className = '' }) => {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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

        {/* ── Top Contact Bar ── */}
        <div className={`hidden md:flex justify-center items-center w-full transition-all duration-300 ${isScrolled ? 'h-0 overflow-hidden opacity-0 mb-0' : 'h-8 opacity-100 bg-[#0b1420]/80 border-b border-brand-gold/20 mb-4'}`}>
          <div className="container mx-auto px-4 md:px-6 flex justify-between items-center text-[11px] text-white/90 font-body uppercase tracking-wider">
            <a href="mailto:hello.atisociety@gmail.com" className="flex items-center gap-2 hover:text-brand-gold transition-colors">
              <svg className="w-3.5 h-3.5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              hello.atisociety@gmail.com
            </a>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-brand-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <a href="tel:+8801805464882" className="hover:text-brand-gold transition-colors">01805464882</a>,{' '}
              <a href="tel:+8801322924833" className="hover:text-brand-gold transition-colors">01322924833</a>,{' '}
              <a href="tel:+8801333321444" className="hover:text-brand-gold transition-colors">01333321444</a>
            </div>
          </div>
        </div>

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

          {/* Desktop CTA, Language Toggle & Search */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-brand-gold focus-visible:outline-brand-gold transition-colors p-2 rounded-full hover:bg-white/5"
              aria-label="Open Search"
            >
              <Search size={18} />
            </button>
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

          {/* Mobile Search & Hamburger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-white hover:text-brand-gold p-2 focus-visible:outline-brand-gold transition-colors"
              aria-label="Open Search"
            >
              <Search size={20} />
            </button>
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
      </motion.header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <NavMobile isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        )}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
