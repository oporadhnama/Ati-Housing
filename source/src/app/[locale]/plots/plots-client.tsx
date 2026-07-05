'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { SearchFilterBar, PlotGrid, BrochureDownloadButton } from '@/components';
import { SearchFilters } from '@/components/SearchFilterBar/SearchFilterBar.types';
import { PlotCardProps } from '@/components/PlotCard/PlotCard.types';

export default function PlotsPageClient({ initialPlots }: { initialPlots: PlotCardProps[] }) {
  const t = useTranslations('Plots');
  const searchParams = useSearchParams();
  const [filteredPlots, setFilteredPlots] = useState<PlotCardProps[]>(initialPlots);

  const type = searchParams.get('type') || '';
  const size = searchParams.get('size') || '';
  const purpose = searchParams.get('purpose') || '';

  const handleFilter = useCallback((filters: SearchFilters) => {
    let result = [...initialPlots];

    // 1. Filter by Plot Type
    if (filters.type) {
      result = result.filter(plot => {
        // Match general -> General Residential Plots, avenue -> Avenue Residential Plots, etc.
        const titleLower = plot.title.toLowerCase();
        if (filters.type === 'general') return titleLower.includes('general');
        if (filters.type === 'avenue') return titleLower.includes('avenue');
        if (filters.type === 'commercial') return titleLower.includes('commercial');
        if (filters.type === 'hospital') return titleLower.includes('hospital') || titleLower.includes('institutional');
        return true;
      });
    }

    // 2. Filter by Size
    if (filters.size) {
      result = result.filter(plot => {
        // e.g. "3 Katha", "5 Katha" matches the sizes string (e.g. "3, 5, 7.5, and 10 Katha")
        const sizesStr = plot.sizes.toLowerCase();
        if (filters.size === '1.5-acres') {
          return sizesStr.includes('acre') || sizesStr.includes('একর');
        }
        return sizesStr.includes(filters.size);
      });
    }

    // 3. Filter by Purpose
    if (filters.purpose) {
      result = result.filter(plot => {
        const tagLower = plot.tag.toLowerCase();
        // maps 'residential' -> tag 'residential' / 'আবাসিক'
        if (filters.purpose === 'residential') return tagLower.includes('res') || tagLower.includes('আবাসিক') || tagLower.includes('prem') || tagLower.includes('প্রিমিয়াম');
        if (filters.purpose === 'commercial') return tagLower.includes('com') || tagLower.includes('বাণিজ্যিক');
        if (filters.purpose === 'institutional') return tagLower.includes('inst') || tagLower.includes('প্রাতিষ্ঠানিক');
        return true;
      });
    }

    setFilteredPlots(result);
  }, [initialPlots]);

  useEffect(() => {
    handleFilter({ type, size, purpose });
  }, [type, size, purpose, handleFilter]);

  return (
    <>
      {/* Search Filter bar */}
      <SearchFilterBar onFilter={handleFilter} isSticky noBorderBottom />

      {/* Main List container */}
      <section className="py-16 bg-surface-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left: Plot Cards list */}
            <div className="lg:col-span-8 flex flex-col">
              <PlotGrid plots={filteredPlots} expanded={true} />
            </div>

            {/* Right: Sticky Sidebar Callout */}
            <div className="lg:col-span-4 lg:sticky lg:top-48 bg-surface-cream border border-border-subtle p-6 md:p-8 rounded-none">
              <h3 className="font-display font-bold text-brand-navy text-xl tracking-tight mb-3">
                {t('customLayout')}
              </h3>
              <p className="text-text-primary text-xs leading-relaxed mb-6">
                {t('customText')}
              </p>

              <div className="flex flex-col gap-4 border-t border-border-subtle pt-6">
                {/* PDF download button */}
                <BrochureDownloadButton label={t('downloadBrochure')} className="w-full" />

                {/* Secondary Request Price CTA */}
                <a
                  href="/contact?type=custom"
                  className="inline-flex items-center justify-center font-body font-semibold tracking-wide uppercase px-6 py-3 text-xs border border-brand-navy hover:bg-brand-navy hover:text-white text-brand-navy bg-transparent transition-all duration-200 rounded-sm text-center"
                >
                  {t('requestPrice')}
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
