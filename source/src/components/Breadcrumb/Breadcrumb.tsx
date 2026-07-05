import React from 'react';
import { Link } from '@/navigation';
import { BreadcrumbProps } from './Breadcrumb.types';

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  // Generate JSON-LD BreadcrumbList markup
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `https://www.atihousing.com${item.href}` : undefined,
    })),
  };

  return (
    <>
      <nav className={`text-xs font-body ${className}`} aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="inline-flex items-center">
                {index > 0 && (
                  <span className="mx-2 text-text-muted select-none" aria-hidden="true">
                    /
                  </span>
                )}
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="text-text-muted hover:text-brand-gold font-medium uppercase tracking-wider transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className="text-brand-gold font-bold uppercase tracking-wider"
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
    </>
  );
};
