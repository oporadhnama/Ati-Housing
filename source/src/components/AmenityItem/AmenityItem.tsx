'use client';

import React from 'react';
import { AmenityItemProps } from './AmenityItem.types';
import {
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Trees,
  Users,
  Dumbbell,
  Milestone,
} from 'lucide-react';

export const AmenityItem: React.FC<AmenityItemProps> = ({
  icon,
  name,
  description,
  features = [],
  expanded = false,
  className = '',
}) => {
  // Map icon strings to React nodes
  const renderIcon = () => {
    const iconClass = "w-6 h-6 text-brand-gold transition-transform duration-300 group-hover:scale-110";
    switch (icon.toLowerCase()) {
      case 'school':
        return <GraduationCap className={iconClass} />;
      case 'hospital':
        return <HeartPulse className={iconClass} />;
      case 'mall':
        return <ShoppingBag className={iconClass} />;
      case 'park':
        return <Trees className={iconClass} />;
      case 'community':
        return <Users className={iconClass} />;
      case 'club':
        return <Dumbbell className={iconClass} />;
      case 'roads':
        return <Milestone className={iconClass} />;
      case 'mosque':
        return (
          <svg
            className="w-6 h-6 stroke-brand-gold fill-none transition-transform duration-300 group-hover:scale-110"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2v3M12 5a3.5 3.5 0 0 0-3.5 3.5v2h7V8.5A3.5 3.5 0 0 0 12 5z" />
            <path d="M5 22h14M3 22v-8a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v8M17 22v-8a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v8" />
            <path d="M8 22v-6a2 2 0 0 1 4 0v6M12 22v-6" />
          </svg>
        );
      default:
        return <Users className={iconClass} />;
    }
  };

  if (expanded) {
    return (
      <div
        className={`group relative p-6 bg-surface-white border border-border-subtle overflow-hidden flex flex-col justify-between transition-all duration-300
          hover:border-brand-gold hover:shadow-[0_4px_24px_rgba(184,151,90,0.10)] ${className}`}
      >
        {/* Gold left-border accent that slides in on hover */}
        <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand-gold to-brand-gold-dark scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-400 ease-out" />

        <div>
          {/* Icon Header */}
          <div className="w-12 h-12 bg-brand-navy flex items-center justify-center rounded-sm mb-4 transition-colors duration-300 group-hover:bg-gradient-to-br group-hover:from-brand-navy group-hover:to-[#2a4a70]">
            {renderIcon()}
          </div>
          <h3 className="font-display font-bold text-brand-navy text-xl tracking-tight mb-2 group-hover:text-brand-gold-dark transition-colors duration-300">
            {name}
          </h3>
          <p className="text-text-muted text-xs leading-relaxed mb-4">
            {description}
          </p>

          {/* Bullet specifications list */}
          {features.length > 0 && (
            <ul className="space-y-2 border-t border-border-subtle pt-4 text-xs text-text-primary">
              {features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="gold-dot-diamond w-1.5 h-1.5 shrink-0 mt-1 opacity-80" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  // Standard simple tile
  return (
    <div
      className={`card-elite group relative p-6 bg-surface-white border border-border-subtle rounded-sm flex items-start gap-4 overflow-hidden ${className}`}
    >
      {/* Gold left-border accent that slides in on hover */}
      <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-brand-gold to-brand-gold-dark scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-400 ease-out" />

      {/* Icon with gradient bg */}
      <div className="w-12 h-12 bg-gradient-to-br from-brand-navy to-[#233a5a] flex items-center justify-center shrink-0 rounded-sm border border-brand-gold/15 shadow-sm transition-all duration-300 group-hover:shadow-[0_0_16px_rgba(184,151,90,0.20)]">
        {renderIcon()}
      </div>

      {/* Text */}
      <div>
        <h3 className="font-display font-bold text-brand-navy text-lg tracking-tight mb-1 group-hover:text-brand-gold-dark transition-colors duration-300">
          {name}
        </h3>
        <p className="text-text-muted text-xs leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
