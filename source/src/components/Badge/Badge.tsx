import React from 'react';
import { BadgeProps } from './Badge.types';

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = 'gold',
  className = '',
}) => {
  const baseStyles = 'inline-block text-[11px] font-body font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px]';
  const variantStyles = {
    gold: 'bg-brand-gold bg-opacity-10 text-brand-gold border border-brand-gold border-opacity-20',
    navy: 'bg-brand-navy text-white',
    cream: 'bg-surface-cream text-brand-navy border border-border-subtle',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {text}
    </span>
  );
};
