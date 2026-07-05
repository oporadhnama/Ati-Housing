'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { NavMobileProps } from './NavMobile.types';
import { X } from 'lucide-react';
import { Button } from '../Button/Button';

import { LanguageToggle } from '../LanguageToggle/LanguageToggle';

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

  if (!isOpen) return null;

  return (
    <div
      id="mobile-navigation-drawer"
      className={`fixed inset-0 z-50 bg-brand-navy flex flex-col justify-between p-6 transition-all duration-300 ${className}`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      {/* Header row */}
      <div className="flex items-center justify-between animate-fade-in">
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
          <Link
            key={index}
            href={link.href}
            onClick={onClose}
            className="text-white hover:text-brand-gold font-display text-2xl font-bold tracking-wide transition-colors duration-200 focus-visible:outline-brand-gold"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Footer CTA */}
      <div className="w-full flex flex-col space-y-5 items-center">
        <LanguageToggle className="border-white/20 bg-white/5 !text-white text-opacity-100" />
        <Button variant="primary" size="lg" href="/contact" onClick={onClose} className="w-full">
          {t('bookVisit')}
        </Button>
        <p className="text-gray-400 text-center text-xs tracking-wider font-body">
          ATI MODEL TOWN · KERANIGANJ
        </p>
      </div>
    </div>
  );
};
