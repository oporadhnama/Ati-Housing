import React from 'react';
import { Link } from '@/navigation';
import { FooterNavProps } from './FooterNav.types';

export const FooterNav: React.FC<FooterNavProps> = ({ columns, className = '' }) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 gap-8 ${className}`}>
      {columns.map((col, i) => (
        <div key={i} className="flex flex-col">
          <h4 className="font-display font-bold text-white text-xs uppercase tracking-[0.2em] mb-4">
            {col.title}
          </h4>
          <ul className="space-y-2.5">
            {col.links.map((link, j) => (
              <li key={j}>
                <Link
                  href={link.href}
                  className="text-gray-400 hover:text-brand-gold font-body text-xs transition-colors duration-200 focus-visible:outline-brand-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
