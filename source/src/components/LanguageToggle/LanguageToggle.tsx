'use client';

import React from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import { LanguageToggleProps } from './LanguageToggle.types';

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ className = '' }) => {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = (locale: 'en' | 'bn') => {
    if (locale !== currentLocale) {
      router.push(pathname, { locale });
    }
  };

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-[3px] border border-border-subtle bg-black/5 dark:bg-white/5 ${className}`}
      aria-label="Change language"
      role="navigation"
    >
      <button
        onClick={() => toggleLocale('en')}
        className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-[2px] transition-all duration-200 focus-visible:outline-brand-gold ${
          currentLocale === 'en'
            ? 'bg-brand-gold text-white shadow-sm'
            : 'text-current opacity-60 hover:opacity-100 hover:text-brand-gold bg-transparent'
        }`}
        aria-label="Switch to English"
        lang="en"
      >
        EN
      </button>
      <button
        onClick={() => toggleLocale('bn')}
        className={`px-3 py-1.5 text-[10px] font-bold rounded-[2px] transition-all duration-200 focus-visible:outline-brand-gold ${
          currentLocale === 'bn'
            ? 'bg-brand-gold text-white shadow-sm font-bangla'
            : 'text-current opacity-60 hover:opacity-100 hover:text-brand-gold bg-transparent font-bangla'
        }`}
        aria-label="Switch to Bangla"
        lang="bn"
      >
        বাংলা
      </button>
    </div>
  );
};
