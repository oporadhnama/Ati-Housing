'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/navigation';
import { SearchFilterBarProps, SearchFilters } from './SearchFilterBar.types';
import { Button } from '../Button/Button';

export const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  onFilter,
  isSticky = false,
  noBorderBottom = false,
  className = '',
}) => {
  const t = useTranslations('Search');
  const tp = useTranslations('Plots');
  const router = useRouter();
  
  const [filters, setFilters] = useState<SearchFilters>({
    type: '',
    size: '',
    purpose: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFilter) {
      onFilter(filters);
    } else {
      const searchParams = new URLSearchParams();
      if (filters.type) searchParams.set('type', filters.type);
      if (filters.size) searchParams.set('size', filters.size);
      if (filters.purpose) searchParams.set('purpose', filters.purpose);
      const query = searchParams.toString();
      router.push(`/plots${query ? `?${query}` : ''}`);
    }
  };

  // Static options translated or mapped
  const typeOptions = [
    { value: 'general', label: tp('general.title') },
    { value: 'avenue', label: tp('avenue.title') },
    { value: 'commercial', label: tp('commercial.title') },
    { value: 'hospital', label: tp('hospital.title') },
  ];

  const sizeOptions = [
    { value: '3', label: '3 Katha' },
    { value: '5', label: '5 Katha' },
    { value: '7.5', label: '7.5 Katha' },
    { value: '10', label: '10 Katha' },
    { value: '20', label: '20 Katha' },
    { value: '1.5-acres', label: '1.5 Acres' },
  ];

  const purposeOptions = [
    { value: 'residential', label: 'Residential' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'institutional', label: 'Institutional' },
  ];

  const stickyStyles = isSticky ? 'sticky top-16 md:top-20 z-30 shadow-md' : '';
  const borderStyles = noBorderBottom ? '' : 'border-b border-border-subtle';

  return (
    <div className={`w-full bg-surface-white py-4 md:py-6 transition-all duration-300 ${stickyStyles} ${borderStyles} ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-center gap-4">
          
          {/* Label Headline */}
          <div className="w-full lg:w-auto shrink-0 text-center lg:text-left">
            <h3 className="font-display font-bold text-brand-navy text-lg uppercase tracking-wider">
              {t('headline')}
            </h3>
          </div>

          {/* 3 columns select fields */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
            {/* Plot Type */}
            <div className="relative">
              <select
                name="type"
                value={filters.type}
                onChange={handleChange}
                className="w-full bg-surface-cream text-text-primary text-xs font-semibold uppercase tracking-wider px-4 py-3 border border-border-subtle rounded-sm appearance-none focus:outline-none focus:border-brand-gold cursor-pointer"
                aria-label={t('selectType')}
              >
                <option value="">{t('selectType')}</option>
                {typeOptions.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            {/* Plot Size */}
            <div className="relative">
              <select
                name="size"
                value={filters.size}
                onChange={handleChange}
                className="w-full bg-surface-cream text-text-primary text-xs font-semibold uppercase tracking-wider px-4 py-3 border border-border-subtle rounded-sm appearance-none focus:outline-none focus:border-brand-gold cursor-pointer"
                aria-label={t('selectSize')}
              >
                <option value="">{t('selectSize')}</option>
                {sizeOptions.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>

            {/* Purpose */}
            <div className="relative">
              <select
                name="purpose"
                value={filters.purpose}
                onChange={handleChange}
                className="w-full bg-surface-cream text-text-primary text-xs font-semibold uppercase tracking-wider px-4 py-3 border border-border-subtle rounded-sm appearance-none focus:outline-none focus:border-brand-gold cursor-pointer"
                aria-label={t('selectPurpose')}
              >
                <option value="">{t('selectPurpose')}</option>
                {purposeOptions.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <div className="w-full lg:w-auto shrink-0">
            <Button type="submit" variant="primary" className="w-full md:px-8 py-3">
              {t('btnSearch')}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};
