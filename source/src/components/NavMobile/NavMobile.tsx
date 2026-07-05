'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { NavMobileProps } from './NavMobile.types';
import { X } from 'lucide-react';
import { Button } from '../Button/Button';

import { LanguageToggle } from '../LanguageToggle/LanguageToggle';

import { motion } from 'framer-motion';

export const NavMobile: React.FC<NavMobileProps> = ({
  isOpen,
  onClose,
  className = '',
}) => {
  const t = useTranslations('Nav');

  // Disable scroll when mobile drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { label: t('plots'), href: '/plots' },
    { label: t('amenities'), href: '/amenities' },
    { label: t('about'), href: '/about' },
    { label: t('gallery'), href: '/gallery' },
    { label: t('contact'), href: '/contact' },
  ];

  return (
    <motion.div
      initial={{ x: '100%', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      id="mobile-navigation-drawer"
      className={`fixed inset-0 z-50 bg-brand-navy/95 backdrop-blur-md flex flex-col justify-between p-6 ${className}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <Link href="/" onClick={onClose} className="relative w-32 h-9">
          <Image
            src="/images/logo.svg"
            alt="ATI Housing Logo"
            fill
            className="object-contain filter brightness-0 invert"
          />
        </Link>
        <button
          onClick={onClose}
          className="text-white hover:text-brand-gold p-2 focus-visible:outline-brand-gold"
          aria-label="Close navigation menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Nav List */}
      <nav className="flex flex-col items-center justify-center space-y-6 my-auto" aria-label="Mobile navigation">
        {navLinks.map((link, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.08, ease: 'easeOut' }}
          >
            <Link
              href={link.href}
              onClick={onClose}
              className="text-white hover:text-brand-gold font-display text-3xl font-bold tracking-wide transition-colors duration-200 focus-visible:outline-brand-gold"
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
      </nav>

      {/* Footer CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, ease: 'easeOut' }}
        className="w-full flex flex-col space-y-5 items-center"
      >
        <LanguageToggle className="border-white/20 bg-white/5 !text-white text-opacity-100" />
        <Button variant="primary" size="lg" href="/contact" onClick={onClose} className="w-full shadow-lg shadow-brand-gold/20">
          {t('bookVisit')}
        </Button>
        <p className="text-gray-400 text-center text-xs tracking-wider font-body">
          ATI MODEL TOWN · KERANIGANJ
        </p>
      </motion.div>
    </motion.div>
  );
};
